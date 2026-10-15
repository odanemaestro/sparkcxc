import { readLabWorkspace } from "../labs/models/workspacePersistence.mjs";

const LAB_BY_COMPONENT = { database: "database", spreadsheet: "spreadsheet", word: "word", web: "web", programming: "programming" };
const MAX_SNAPSHOT_CHARS = 70000;
const MAX_VERSIONS = 3;
export function sbaEvidenceKey(userId, projectId, componentId) {
  const safe = value => String(value || "guest").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 90);
  if (!Object.hasOwn(LAB_BY_COMPONENT, componentId)) return null;
  return "spark:it:sba-evidence:v1:" + [safe(userId), safe(projectId), safe(componentId)].join(":");
}
export function readSbaEvidence(userId, projectId, componentId, storage = globalThis.localStorage) {
  const key = sbaEvidenceKey(userId, projectId, componentId);
  if (!key) return [];
  try {
    const raw = storage.getItem(key);
    if (!raw || raw.length > MAX_SNAPSHOT_CHARS * MAX_VERSIONS + 2000) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(item => item && typeof item === "object" && item.snapshot).slice(0, MAX_VERSIONS) : [];
  } catch { return []; }
}
export function captureSbaEvidence(userId, projectId, componentId, storage = globalThis.localStorage, recordedAt = new Date().toISOString()) {
  const labId = LAB_BY_COMPONENT[componentId];
  if (!labId) return { ok: false, error: "Unknown SBA component." };
  const snapshot = readLabWorkspace(userId, labId, null, storage);
  if (!snapshot || !Object.keys(snapshot).length) return { ok: false, error: "Open the corresponding Studio and save some work first." };
  const payload = JSON.stringify(snapshot);
  if (payload.length > MAX_SNAPSHOT_CHARS) return { ok: false, error: "This Studio draft is too large for a local SBA snapshot. Export it from the Studio first." };
  const previous = readSbaEvidence(userId, projectId, componentId, storage);
  const version = Math.max(0, ...previous.map(item => Number(item.version) || 0)) + 1;
  const item = { version, recordedAt, labId, snapshot };
  const next = [item, ...previous].slice(0, MAX_VERSIONS);
  try { storage.setItem(sbaEvidenceKey(userId, projectId, componentId), JSON.stringify(next)); }
  catch { return { ok: false, error: "Local storage is unavailable or full. Export your draft before leaving." }; }
  return { ok: true, item, versions: next };
}
export function exportSbaEvidence(userId, projectId, componentId, storage = globalThis.localStorage) {
  const versions = readSbaEvidence(userId, projectId, componentId, storage);
  return JSON.stringify({
    format: "spark-it-sba-evidence-v1", projectId, componentId,
    notice: "Student practice snapshot. Not an official SBA submission, mark or certification.",
    versions
  }, null, 2);
}
