// ============================================================================
// SPARK Dynamic Subject Platform V1
//
// Database-backed subject metadata is layered on top of the current built-in
// implementations. Existing Mathematics, Physics and IT implementations remain
// authoritative for their specialist screens while the catalog becomes the
// single discovery/configuration source for future subjects.
// ============================================================================

const DEFAULT_CAPABILITIES = Object.freeze({
  study:false,
  practice:false,
  flashcards:false,
  progress:true,
  paper1:false,
  paper2:false,
  adaptive:false,
  structured:false,
  labs:false,
  sba:false,
});

const DEFAULT_ROUTES = Object.freeze({
  study:null,
  practice:null,
  flashcards:null,
  progress:"/dashboard/progress",
});

export function subjectIdFromValue(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeCatalogSubject(row = {}) {
  const id = subjectIdFromValue(row.id || row.subject_id);
  if (!id) return null;

  const capabilities = {
    ...DEFAULT_CAPABILITIES,
    ...(row.capabilities && typeof row.capabilities === "object" ? row.capabilities : {}),
  };
  const routes = {
    ...DEFAULT_ROUTES,
    ...(row.routes && typeof row.routes === "object" ? row.routes : {}),
  };

  return {
    id,
    name:String(row.name || row.title || id).trim(),
    shortName:String(row.short_name || row.shortName || row.name || id).trim(),
    qualification:String(row.qualification || "CSEC").trim(),
    mark:String(row.mark || "").trim() || id.slice(0, 2).toUpperCase(),
    description:String(row.description || "").trim(),
    enabled:row.enabled !== false,
    status:String(row.status || "draft").trim().toLowerCase(),
    sortOrder:Number(row.sort_order ?? row.sortOrder ?? 100),
    implementation:String(row.implementation || "generic").trim().toLowerCase(),
    studyView:String(row.study_view || row.studyView || "study").trim(),
    capabilities,
    routes,
    stats:row.stats && typeof row.stats === "object" ? row.stats : {},
    learningConfig:row.learning_config && typeof row.learning_config === "object"
      ? row.learning_config
      : row.learningConfig && typeof row.learningConfig === "object"
        ? row.learningConfig
        : {},
    manifestVersion:Number(row.manifest_version ?? row.manifestVersion ?? 1),
    updatedAt:row.updated_at || row.updatedAt || null,
    source:row.source || "catalog",
  };
}

export function catalogRowFromSubject(subject = {}) {
  const normalized = normalizeCatalogSubject({
    ...subject,
    status:subject.status || (subject.enabled === false ? "draft" : "live"),
    implementation:subject.implementation || "builtin",
  });
  if (!normalized) return null;

  return {
    id:normalized.id,
    name:normalized.name,
    short_name:normalized.shortName,
    qualification:normalized.qualification,
    mark:normalized.mark,
    description:normalized.description,
    enabled:normalized.enabled,
    status:normalized.status,
    sort_order:normalized.sortOrder,
    implementation:normalized.implementation,
    study_view:normalized.studyView,
    capabilities:normalized.capabilities,
    routes:normalized.routes,
    stats:normalized.stats,
    learning_config:normalized.learningConfig,
    manifest_version:normalized.manifestVersion,
  };
}

export function mergeSubjectCatalog(baseSubjects = [], catalogRows = []) {
  const merged = new Map();

  (baseSubjects || []).forEach(subject => {
    const normalized = normalizeCatalogSubject({
      ...subject,
      status:subject.status || (subject.enabled === false ? "draft" : "live"),
      implementation:subject.implementation || "builtin",
      source:"builtin",
    });
    if (normalized) merged.set(normalized.id, normalized);
  });

  (catalogRows || []).forEach(row => {
    const rowId = subjectIdFromValue(row?.id || row?.subject_id);
    if (!rowId) return;

    const base = merged.get(rowId);
    const rowCapabilities =
      row?.capabilities && typeof row.capabilities === "object"
        ? row.capabilities
        : {};
    const rowRoutes =
      row?.routes && typeof row.routes === "object"
        ? row.routes
        : {};
    const rowStats =
      row?.stats && typeof row.stats === "object"
        ? row.stats
        : {};
    const rowLearningConfig =
      row?.learning_config && typeof row.learning_config === "object"
        ? row.learning_config
        : row?.learningConfig && typeof row.learningConfig === "object"
          ? row.learningConfig
          : {};

    const catalog = normalizeCatalogSubject({
      ...(base || {}),
      ...(row || {}),
      id:rowId,
      capabilities:{
        ...(base?.capabilities || DEFAULT_CAPABILITIES),
        ...rowCapabilities,
      },
      routes:{
        ...(base?.routes || DEFAULT_ROUTES),
        ...rowRoutes,
      },
      stats:{
        ...(base?.stats || {}),
        ...rowStats,
      },
      learningConfig:{
        ...(base?.learningConfig || {}),
        ...rowLearningConfig,
      },
      source:base ? "builtin+catalog" : "catalog",
    });

    if (catalog) merged.set(catalog.id, catalog);
  });

  return [...merged.values()]
    .filter(Boolean)
    .sort((a,b) => (a.sortOrder - b.sortOrder) || a.name.localeCompare(b.name));
}

export function runtimeSubjectCatalog(baseSubjects = [], catalogRows = [], { catalogAvailable = false } = {}) {
  if (!catalogAvailable) {
    return publicCatalogSubjects(mergeSubjectCatalog(baseSubjects, []));
  }

  const liveRows = publicCatalogSubjects(
    (catalogRows || []).map(normalizeCatalogSubject).filter(Boolean)
  );
  const publishedIds = new Set(liveRows.map(subject => subject.id));

  return publicCatalogSubjects(
    mergeSubjectCatalog(baseSubjects, liveRows)
  ).filter(subject => publishedIds.has(subject.id));
}

export function publicCatalogSubjects(subjects = []) {
  return (subjects || []).filter(subject =>
    subject &&
    subject.enabled !== false &&
    String(subject.status || "live").toLowerCase() === "live"
  );
}

export async function loadSubjectCatalog({ supabase } = {}) {
  if (!supabase?.rpc) return { data:[], error:null, skipped:true };
  try {
    const { data, error } = await supabase.rpc("spark_get_subject_catalog");
    if (error && ["PGRST202","42883","42P01"].includes(error.code)) {
      return { data:[], error:null, unavailable:true };
    }
    return { data:(data || []).map(normalizeCatalogSubject).filter(Boolean), error };
  } catch (error) {
    return { data:[], error };
  }
}

export async function syncSubjectManifest({ supabase, subjects = [] } = {}) {
  if (!supabase?.rpc) return { data:null, error:null, skipped:true };
  const payload = (subjects || []).map(catalogRowFromSubject).filter(Boolean);
  try {
    return await supabase.rpc("spark_admin_sync_subject_catalog", {
      p_subjects:payload,
    });
  } catch (error) {
    return { data:null, error };
  }
}