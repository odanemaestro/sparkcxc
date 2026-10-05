import { integratedScienceStudyStructure } from "../integratedScience/data/integratedScienceStudyCourse";
// ============================================================================
// SPARK Generic Subject Learner Shell V2
//
// Loads learner-safe structure for a live database-backed subject.
// Draft and disabled subjects stay protected by the database.
// ============================================================================

const MISSING_OBJECT_CODES = new Set(["PGRST202","42P01","42883"]);

const clean = value => String(value ?? "").trim();
const cleanId = value => clean(value).toLowerCase();

function objectValue(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

export function normalizeGenericSection(row = {}) {
  const id = clean(row.section_id ?? row.id);
  if (!id) return null;
  return {
    id,
    subjectId:cleanId(row.subject_id),
    title:clean(row.title) || id,
    description:clean(row.description),
    sortOrder:Number(row.sort_order ?? row.sortOrder ?? 100),
    enabled:row.enabled !== false,
    metadata:objectValue(row.metadata),
  };
}

export function normalizeGenericTopic(row = {}) {
  const id = clean(row.topic_id ?? row.id);
  if (!id) return null;
  return {
    id,
    subjectId:cleanId(row.subject_id),
    sectionId:clean(row.section_id ?? row.sectionId),
    title:clean(row.title) || id,
    description:clean(row.description),
    sortOrder:Number(row.sort_order ?? row.sortOrder ?? 100),
    enabled:row.enabled !== false,
    metadata:objectValue(row.metadata),
  };
}

export function normalizeGenericActivity(row = {}) {
  const key = clean(row.activity_key ?? row.activityKey);
  if (!key) return null;
  return {
    key,
    subjectId:cleanId(row.subject_id),
    type:clean(row.activity_type ?? row.activityType).toLowerCase(),
    sectionId:clean(row.section_id ?? row.sectionId),
    topicId:clean(row.topic_id ?? row.topicId),
    title:clean(row.title) || key,
    route:clean(row.route),
    evidenceWeight:row.evidence_weight == null ? null : Number(row.evidence_weight),
    enabled:row.enabled !== false,
    metadata:objectValue(row.metadata),
  };
}

export function buildGenericSubjectStructure({
  sections = [],
  topics = [],
  activities = [],
} = {}) {
  const normalizedSections = (sections || [])
    .map(normalizeGenericSection)
    .filter(item => item && item.enabled)
    .sort((a,b) => (a.sortOrder - b.sortOrder) || a.title.localeCompare(b.title));

  const normalizedTopics = (topics || [])
    .map(normalizeGenericTopic)
    .filter(item => item && item.enabled)
    .sort((a,b) => (a.sortOrder - b.sortOrder) || a.title.localeCompare(b.title));

  const normalizedActivities = (activities || [])
    .map(normalizeGenericActivity)
    .filter(item => item && item.enabled)
    .sort((a,b) => a.title.localeCompare(b.title));

  const sectionIds = new Set(normalizedSections.map(section => section.id));
  const grouped = normalizedSections.map(section => ({
    ...section,
    topics:normalizedTopics.filter(topic => topic.sectionId === section.id),
  }));

  const unassignedTopics = normalizedTopics.filter(
    topic => !topic.sectionId || !sectionIds.has(topic.sectionId)
  );

  return {
    sections:grouped,
    topics:normalizedTopics,
    activities:normalizedActivities,
    unassignedTopics,
    sectionCount:grouped.length,
    topicCount:normalizedTopics.length,
  };
}

function completeIntegratedScienceStructure(remoteStructure) {
  const local=buildGenericSubjectStructure(integratedScienceStudyStructure());
  if(!remoteStructure) return local;

  const legacyTopicData=(remoteStructure.topics || []).filter(topic=>
    /^m1-t1-/i.test(String(topic.id || ""))
  );
  if(!legacyTopicData.length) return local;

  const legacyLessons=legacyTopicData
    .map(topic=>topic?.metadata?.lesson)
    .filter(lesson=>lesson && typeof lesson==="object");
  const inheritedDiagrams=legacyLessons.flatMap(lesson=>Array.isArray(lesson.interactiveDiagrams)?lesson.interactiveDiagrams:[]);
  const inheritedModels=legacyLessons.flatMap(lesson=>Array.isArray(lesson.interactiveModels)?lesson.interactiveModels:[]);

  const topics=local.topics.map(topic=>{
    if(topic.id!=="is-m1-t1-units-of-life") return topic;
    const lesson={...(topic.metadata?.lesson || {})};
    if(inheritedDiagrams.length) lesson.interactiveDiagrams=inheritedDiagrams;
    if(inheritedModels.length) lesson.interactiveModels=inheritedModels;
    return {...topic,metadata:{...topic.metadata,lesson}};
  });

  return buildGenericSubjectStructure({
    sections:local.sections,
    topics,
    activities:remoteStructure.activities || [],
  });
}

function structureFromRpc(data) {
  if (!data || typeof data !== "object") return null;
  return buildGenericSubjectStructure({
    sections:Array.isArray(data.sections) ? data.sections : [],
    topics:Array.isArray(data.topics) ? data.topics : [],
    activities:Array.isArray(data.activities) ? data.activities : [],
  });
}

export async function loadGenericSubjectStructure({ supabase, subjectId } = {}) {
  const id = cleanId(subjectId);
  if (!supabase || !id) {
    return { data:buildGenericSubjectStructure(), error:null, skipped:true };
  }

  if (typeof supabase.rpc === "function") {
    try {
      const rpc = await supabase.rpc("spark_get_subject_learning_structure", {
        p_subject_id:id,
      });

      if (!rpc?.error) {
        const remote=structureFromRpc(rpc?.data) || buildGenericSubjectStructure();
        return {
          data:id==="integrated-science" ? completeIntegratedScienceStructure(remote) : remote,
          error:null,
          source:id==="integrated-science" ? "rpc+integrated-science-full-course" : "rpc",
          unavailable:rpc?.data == null,
        };
      }

      if (!MISSING_OBJECT_CODES.has(rpc.error.code)) {
        return { data:null, error:rpc.error, source:"rpc" };
      }
    } catch (error) {
      if (!MISSING_OBJECT_CODES.has(error?.code)) {
        return { data:null, error, source:"rpc" };
      }
    }
  }

  try {
    const [sectionsResult, topicsResult, activitiesResult] = await Promise.all([
      supabase.from("spark_subject_sections")
        .select("subject_id,section_id,title,description,sort_order,enabled,metadata")
        .eq("subject_id", id)
        .eq("enabled", true)
        .order("sort_order", { ascending:true })
        .order("title", { ascending:true }),
      supabase.from("spark_subject_topics")
        .select("subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata")
        .eq("subject_id", id)
        .eq("enabled", true)
        .order("sort_order", { ascending:true })
        .order("title", { ascending:true }),
      supabase.from("spark_subject_activity_catalog")
        .select("subject_id,activity_key,activity_type,section_id,topic_id,title,route,evidence_weight,enabled,metadata")
        .eq("subject_id", id)
        .eq("enabled", true),
    ]);

    const error = sectionsResult.error || topicsResult.error || activitiesResult.error || null;
    if (error) return { data:null, error, source:"tables" };

    const remote=buildGenericSubjectStructure({
      sections:sectionsResult.data || [],
      topics:topicsResult.data || [],
      activities:activitiesResult.data || [],
    });
    return {
      data:id==="integrated-science" ? completeIntegratedScienceStructure(remote) : remote,
      error:null,
      source:id==="integrated-science" ? "tables+integrated-science-full-course" : "tables",
    };
  } catch (error) {
    return { data:null, error, source:"tables" };
  }
}