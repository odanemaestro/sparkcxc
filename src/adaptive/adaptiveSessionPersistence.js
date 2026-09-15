// SPARK Adaptive Practice active-session persistence V2.7.1
// Keeps one in-progress Adaptive Practice session refresh-safe on this browser.

export const ADAPTIVE_SESSION_VERSION = 1;

export function adaptiveSessionStorageKey(userId) {
  return `spark_adaptive_active_v1:${userId || "guest"}`;
}

function safeStorage(storage) {
  if (storage) return storage;
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function readAdaptiveSession(storageKey, storage) {
  const target = safeStorage(storage);
  if (!target || !storageKey) return null;
  try {
    const raw = target.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== ADAPTIVE_SESSION_VERSION) return null;
    if (!Array.isArray(parsed.questionIds) || parsed.questionIds.length === 0) return null;
    if (!parsed.selectedArea || !parsed.selectedTopic) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeAdaptiveSession(storageKey, state, storage) {
  const target = safeStorage(storage);
  if (!target || !storageKey || !state?.session?.length) return false;

  const payload = {
    version: ADAPTIVE_SESSION_VERSION,
    savedAt: Date.now(),
    selectedArea: state.selectedArea,
    selectedTopic: state.selectedTopic,
    questionIds: state.session.map(question => String(question.id)),
    index: Number.isInteger(state.index) ? state.index : 0,
    working: String(state.working || ""),
    answer: String(state.answer || ""),
    submitted: Boolean(state.submitted),
    lastCorrect: Boolean(state.lastCorrect),
    verdict: state.verdict || null,
    gradeResult: state.gradeResult || null,
    selfAssessed: Boolean(state.selfAssessed),
    score: Number(state.score || 0),
    attempts: Array.isArray(state.attempts) ? state.attempts : [],
  };

  try {
    target.setItem(storageKey, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function clearAdaptiveSession(storageKey, storage) {
  const target = safeStorage(storage);
  if (!target || !storageKey) return;
  try {
    target.removeItem(storageKey);
  } catch {
    // Storage failure must never break practice.
  }
}

export function rebuildAdaptiveSession(saved, questions) {
  if (!saved || !Array.isArray(saved.questionIds) || !Array.isArray(questions)) return null;

  const byId = new Map(questions.map(question => [String(question.id), question]));
  const session = saved.questionIds.map(id => byId.get(String(id)));

  // If the question bank changed and one of the saved questions no longer exists,
  // do not silently construct a different session.
  if (session.some(question => !question)) return null;

  const maxIndex = Math.max(0, session.length - 1);
  const index = Math.max(0, Math.min(maxIndex, Number.isInteger(saved.index) ? saved.index : 0));

  return {
    session,
    index,
    working: String(saved.working || ""),
    answer: String(saved.answer || ""),
    submitted: Boolean(saved.submitted),
    lastCorrect: Boolean(saved.lastCorrect),
    verdict: saved.verdict || null,
    gradeResult: saved.gradeResult || null,
    selfAssessed: Boolean(saved.selfAssessed),
    score: Number(saved.score || 0),
    attempts: Array.isArray(saved.attempts) ? saved.attempts : [],
  };
}
