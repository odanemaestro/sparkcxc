// Native screen policy is independent of DOM size and browser user agent.
// A native student has exactly one persistent navigation surface: bottom tabs.
// Focused learning/exam screens use their own contextual back/exit controls.
export const NATIVE_FOCUSED_VIEWS = Object.freeze(new Set([
  "lesson",
  "physics",
  "information-technology",
  "social-studies",
  "generic-study",
  "practice-math",
  "practice-physics",
  "practice-information-technology",
  "practice-integrated-science",
  "practice-social-studies",
  "practice-english-a",
  "practice-chemistry",
  "practice-food-nutrition-and-health",
  "practice-principles-of-accounts",
  "practice-principles-of-business",
]));

export function getNativeStudentLayout({ native = false, signedIn = false, role = null, view = "home" } = {}) {
  const student = Boolean(native && signedIn && role === "student");
  return {
    student,
    hideWebsiteHeader: student,
    showBottomTabs: student && !NATIVE_FOCUSED_VIEWS.has(view),
    focused: student && NATIVE_FOCUSED_VIEWS.has(view),
  };
}
