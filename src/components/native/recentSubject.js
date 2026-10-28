// Lightweight, device-only recall of the last native Study or Practice subject.
// Enrollment and live catalogue passed by the caller remain authoritative.
const STORAGE_PREFIX = "spark-native-last-subject-v1";
const VALID_CAPABILITIES = new Set(["study", "practice"]);
const SAFE_ID = /^[a-z0-9][a-z0-9-]*$/;

export function recentSubjectKey(userId, capability) {
  const id = String(userId || "").trim();
  if (!id || !VALID_CAPABILITIES.has(capability)) return null;
  return `${STORAGE_PREFIX}:${encodeURIComponent(id)}:${capability}`;
}

export function readRecentSubject({ userId, capability, subjects = [], storage } = {}) {
  const key = recentSubjectKey(userId, capability);
  if (!key) return null;
  try {
    const store = storage || (typeof window !== "undefined" ? window.localStorage : null);
    const id = store?.getItem(key);
    if (!id || !SAFE_ID.test(id)) return null;
    return subjects.find(subject => subject?.id === id) || null;
  } catch {
    return null; // Private browsing or restricted WebView storage.
  }
}

export function rememberRecentSubject({ userId, capability, subjectId, storage } = {}) {
  const key = recentSubjectKey(userId, capability);
  const id = String(subjectId || "").trim();
  if (!key || !SAFE_ID.test(id)) return false;
  try {
    const store = storage || (typeof window !== "undefined" ? window.localStorage : null);
    if (!store) return false;
    store.setItem(key, id);
    return true;
  } catch {
    return false;
  }
}
