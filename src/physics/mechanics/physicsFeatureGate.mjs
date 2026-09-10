// Controls whether CSEC Physics is available throughout SPARK.
// Physics is enabled only when the dedicated production feature flag
// is explicitly set to "true".
export function physicsEnabled(env = {}) {
  return String(env.REACT_APP_ENABLE_PHYSICS || "")
    .trim()
    .toLowerCase() === "true";
}

// Kept for compatibility with the existing App.js import.
export function physicsSectionAEnabled(env = {}) {
  return physicsEnabled(env);
}

export function physicsRouteVisibility(env = {}) {
  const enabled = physicsEnabled(env);

  return {
    subjectVisible: enabled,
    sectionAVisible: enabled,
    legacyA1Preview: enabled,
  };
}