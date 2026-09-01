// ============================================================================
// Done by: Odane Robinson
//
// Regression guard for a serious bug found and fixed in this session:
// App.js used to contain a `COMPLETED_LESSONS` object (generic, auto-
// generated placeholder lesson content for the same 108 topics this whole
// project's content-authoring effort carefully wrote real lessons for) and
// a call `Object.assign(LESSONS, COMPLETED_LESSONS)` at module-load time.
//
// Since `LESSONS` is imported directly from data/lessonBank.js, and ES
// module imports of objects are live references to the SAME object,
// Object.assign didn't create a copy - it mutated the real, shared LESSONS
// object in place, silently overwriting every hand-verified lesson with
// generic template text every single time the app loaded, for every
// component that imports LESSONS (not just App.js).
//
// This test statically scans App.js's source for the exact patterns that
// caused this, so if anything like it is ever reintroduced, this test
// fails immediately rather than the bug going unnoticed again.
// ============================================================================
import fs from "fs";
import path from "path";

const APP_JS_SOURCE = fs.readFileSync(path.join(__dirname, "../../App.js"), "utf8");

describe("App.js must never mutate the shared LESSONS object from lessonBank.js", () => {
  test("no Object.assign targeting LESSONS", () => {
    expect(APP_JS_SOURCE).not.toMatch(/Object\.assign\s*\(\s*LESSONS\b/);
  });

  test("no direct property assignment onto LESSONS (e.g. LESSONS[x] = ... or LESSONS.x = ...)", () => {
    expect(APP_JS_SOURCE).not.toMatch(/LESSONS\s*\[[^\]]*\]\s*=(?!=)/);
    expect(APP_JS_SOURCE).not.toMatch(/LESSONS\.\w+\s*=(?!=)/);
  });

  test("no residual COMPLETED_LESSONS placeholder block", () => {
    expect(APP_JS_SOURCE).not.toMatch(/const\s+COMPLETED_LESSONS\s*=/);
  });

  test("LESSONS is only ever read from in App.js, never reassigned as a whole", () => {
    expect(APP_JS_SOURCE).not.toMatch(/(?<!\.)\bLESSONS\s*=(?!=)/);
  });
});
