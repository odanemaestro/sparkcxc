// Physics stays dark by default until the Section A release gate is approved.
// Keeping the gate here avoids accidental exposure from a truthy unrelated
// environment value.
export function physicsSectionAEnabled(env={}){
  return String(env.REACT_APP_ENABLE_PHYSICS_SECTION_A||'').trim().toLowerCase()==='true';
}

export function physicsA1LegacyPreviewEnabled(env={}){
  return String(env.REACT_APP_ENABLE_PHYSICS_A1||'').trim().toLowerCase()==='true';
}

export function physicsRouteVisibility(env={}){
  const sectionA=physicsSectionAEnabled(env);
  return {subjectVisible:sectionA,sectionAVisible:sectionA,legacyA1Preview:physicsA1LegacyPreviewEnabled(env)};
}
