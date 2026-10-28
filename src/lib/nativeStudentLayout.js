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

export function isNativeMathPracticeLanding(routeHash = "") {
  // Tab navigation on the subject launcher, focus-only navigation in exams.
  const match = String(routeHash).trim().match(/^#\/practice\/mathematics(?:\?([^#]*))?$/);
  if (!match) return false;
  const mode = new URLSearchParams(match[1] || "").get("mode");
  return !mode || mode === "home";
}

export function getNativeStudentLayout({ native = false, signedIn = false, role = null, view = "home", routeHash = "" } = {}) {
  const student = Boolean(native && signedIn && role === "student");
  const mathLanding = view === "practice-math" && isNativeMathPracticeLanding(routeHash);
  return {
    student,
    hideWebsiteHeader: student,
    showBottomTabs: student && (mathLanding || !NATIVE_FOCUSED_VIEWS.has(view)),
    focused: student && NATIVE_FOCUSED_VIEWS.has(view) && !mathLanding,
  };
}
