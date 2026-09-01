// ============================================================================
// Done by: Odane Robinson
// Shared design tokens for the whole app - colors, shadows, radii, and the
// two font stacks. Extracted from App.js so every component (views, UI
// kit, etc.) imports the same single source of truth instead of the theme
// being buried as a module-scope const only App.js could see.
// ============================================================================
export const T = {
  ink:"#0F2557",inkSoft:"#2D3E6B",teal:"#0D9488",tealDark:"#0A7268",
  tealLight:"#CCFBF1",amber:"#D97706",amberLight:"#FEF3C7",
  emerald:"#059669",emeraldLight:"#D1FAE5",red:"#DC2626",redLight:"#FEE2E2",
  bg:"#FAFAF8",paper:"#FFFFFF",muted:"#F4F4F1",border:"#E2E8F0",
  textMuted:"#64748B",purple:"#7C3AED",purpleLight:"#F3E8FF",
  // Extended tokens for a more refined, layered look
  navyDeep:"#081A3D",navyMid:"#12305F",tealDeep:"#0A5A52",
  goldSoft:"#FCD34D",borderSoft:"#EDF1F6",
  shadowSm:"0 1px 2px rgba(15,37,87,.06)",
  shadowMd:"0 4px 14px rgba(15,37,87,.09)",
  shadowLg:"0 12px 32px rgba(15,37,87,.14)",
  shadowXl:"0 20px 60px rgba(15,37,87,.20)",
  ease:"cubic-bezier(.4,0,.2,1)",
  rSm:8,rMd:12,rLg:16,rXl:22,
};

export const FD = "'Crimson Pro', Georgia, serif";
export const FB = "'Atkinson Hyperlegible','Inter',sans-serif";
