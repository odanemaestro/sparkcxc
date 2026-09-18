const COMPLETION_PREFIX = "spark-it-practical-labs-v1";
const WORKSPACE_PREFIX = "spark-it-practical-labs-workspace-v2";

function safeRead(key, fallback = {}) {
  try {
    return JSON.parse(localStorage.getItem(key) || "") || fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The canonical SPARK progress recorder still receives completed labs.
  }
}

export function completionKey(userId) {
  return `${COMPLETION_PREFIX}:${userId || "student"}`;
}

export function readLabCompletion(userId) {
  return safeRead(completionKey(userId), {});
}

export function writeLabCompletion(userId, value) {
  safeWrite(completionKey(userId), value || {});
}

export function workspaceKey(userId, labId) {
  return `${WORKSPACE_PREFIX}:${userId || "student"}:${labId}`;
}

export function readLabWorkspace(userId, labId, fallback = {}) {
  return safeRead(workspaceKey(userId, labId), fallback);
}

export function writeLabWorkspace(userId, labId, value) {
  safeWrite(workspaceKey(userId, labId), value || {});
}
