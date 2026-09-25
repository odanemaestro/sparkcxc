// Controls whether CSEC Physics is available throughout SPARK.
// Production remains opt-in through REACT_APP_ENABLE_PHYSICS.
// Local development defaults Physics on so npm start can exercise the
// published Physics experience without a separate shell environment variable.
export function physicsEnabled(env = {}) {
  const explicit = String(env.REACT_APP_ENABLE_PHYSICS || "")
    .trim()
    .toLowerCase();

  if (explicit === "true") return true;
  if (explicit === "false") return false;

  return String(env.NODE_ENV || "")
    .trim()
    .toLowerCase() === "development";
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
