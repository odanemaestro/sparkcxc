export function physicsCourseProgressKey(userId){
  return `spark_physics_course_lessons_v1:${userId || 'local'}`;
}

export function readPhysicsCourseProgress(userId){
  if (typeof localStorage === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(physicsCourseProgressKey(userId)) || '{}') || {}; }
  catch { return {}; }
}

export function writePhysicsCourseProgress(userId, next){
  if (typeof localStorage === 'undefined') return next || {};
  try { localStorage.setItem(physicsCourseProgressKey(userId), JSON.stringify(next || {})); } catch { /* local progress is optional */ }
  return next || {};
}

export function setPhysicsCourseLessonCompletion(userId, progress, topicId, completed){
  const next = { ...(progress || {}), [`lesson:${topicId}`]: Boolean(completed) };
  writePhysicsCourseProgress(userId, next);
  return next;
}
