const STORAGE_PREFIX = 'spark_physics_section_a_progress_v2';

export function physicsMechanicsStorageKey(userId) {
  const safe = String(userId || 'guest').trim() || 'guest';
  return `${STORAGE_PREFIX}:${safe}`;
}

function resolveStorage(storage) {
  if (storage) return storage;
  try {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  } catch {}
  return null;
}

export function readPhysicsMechanicsProgress(userId, storage) {
  const target = resolveStorage(storage);
  if (!target) return {};
  try {
    const value = JSON.parse(target.getItem(physicsMechanicsStorageKey(userId)) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

export function writePhysicsMechanicsProgress(userId, progress, storage) {
  const target = resolveStorage(storage);
  if (!target) return false;
  try {
    target.setItem(physicsMechanicsStorageKey(userId), JSON.stringify(progress || {}));
    return true;
  } catch {
    return false;
  }
}

export function setPhysicsMechanicsCompletion(userId, progress, key, completed, storage) {
  const next = { ...(progress || {}), [String(key)]: Boolean(completed) };
  writePhysicsMechanicsProgress(userId, next, storage);
  return next;
}

export function physicsMechanicsProgressSummary(progress, topics, interactives) {
  const safe = progress && typeof progress === 'object' ? progress : {};
  const topicList = Array.isArray(topics) ? topics : [];
  const labs = Array.isArray(interactives) ? interactives : [];
  const lessonsCompleted = topicList.filter(topic => safe[`lesson:${topic.id}`]).length;
  const labsCompleted = labs.filter(lab => safe[`lab:${lab.id}`]).length;
  const totalActivities = topicList.length + labs.length;
  const completedActivities = lessonsCompleted + labsCompleted;
  return {
    lessonsCompleted,
    lessonsTotal: topicList.length,
    labsCompleted,
    labsTotal: labs.length,
    completedActivities,
    totalActivities,
    percentExplored: totalActivities ? Math.round(completedActivities / totalActivities * 100) : 0,
  };
}

export const PHYSICS_MECHANICS_PROGRESS_VERSION = 2;
