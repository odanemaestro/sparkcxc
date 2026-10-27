import { getNativeStudentLayout, NATIVE_FOCUSED_VIEWS } from "./nativeStudentLayout";

describe("native student shell navigation policy", () => {
  test("removes global website header on every native student screen", () => {
    for (const view of ["home", "dashboard", "study", "practice", "tutors", "about", "lesson", "practice-math", "generic-study"]) {
      const state = getNativeStudentLayout({ native: true, signedIn: true, role: "student", view });
      expect(state.hideWebsiteHeader).toBe(true);
      expect(state.student).toBe(true);
    }
  });

  test("uses bottom app navigation for hubs and secondary screens", () => {
    for (const view of ["home", "dashboard", "study", "practice", "tutors", "about", "privacy"]) {
      expect(getNativeStudentLayout({ native: true, signedIn: true, role: "student", view }).showBottomTabs).toBe(true);
    }
  });

  test("does not overlay bottom tabs on exam or lesson workspaces", () => {
    for (const view of NATIVE_FOCUSED_VIEWS) {
      expect(getNativeStudentLayout({ native: true, signedIn: true, role: "student", view }).showBottomTabs).toBe(false);
    }
  });

  test("does not alter the website, public session, or other account roles", () => {
    for (const options of [
      { native: false, signedIn: true, role: "student", view: "dashboard" },
      { native: true, signedIn: false, role: null, view: "home" },
      { native: true, signedIn: true, role: "parent", view: "dashboard" },
      { native: true, signedIn: true, role: "tutor", view: "dashboard" },
    ]) {
      const state = getNativeStudentLayout(options);
      expect(state.hideWebsiteHeader).toBe(false);
      expect(state.showBottomTabs).toBe(false);
    }
  });
});
