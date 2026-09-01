// ============================================================================
// Done by: Odane Robinson
//
// Regression guard for the "Application submitted!" persisting after
// refresh bug. The actual defect lived in the interaction between two
// lines in App.js's BecomeTutorView: an explicit clearTutorApplicationDraft()
// call, immediately followed by setStep(4) - which triggered the
// autosave `useEffect` (watching `step`) to fire again on the very next
// render and immediately re-save the draft with step:4, undoing the
// clear a moment later.
//
// The module-level tests in tutorApplicationDraft.test.js already prove
// the fixed behavior of the underlying save/load functions. This test
// additionally scans App.js's actual source for the specific guard that
// prevents the effect from ever calling saveTutorApplicationDraft with
// step >= 4 again, so a future edit that accidentally removes the guard
// (even while leaving the module functions themselves untouched) is
// caught here rather than shipping the same bug a second time.
// ============================================================================
import fs from "fs";
import path from "path";

const APP_JS_SOURCE = fs.readFileSync(path.join(__dirname, "../../App.js"), "utf8");

describe("BecomeTutorView's autosave effect must never persist step >= 4 as a draft", () => {
  test("the autosave useEffect body checks step before calling saveTutorApplicationDraft", () => {
    // Locate the autosave effect specifically (the one whose dependency
    // array is exactly [step, form, phoneCountry, phoneLocal]) rather than
    // matching some unrelated effect elsewhere in this large file.
    const effectMatch = APP_JS_SOURCE.match(
      /React\.useEffect\(\(\) => \{([\s\S]*?)\}, \[step, form, phoneCountry, phoneLocal\]\);/
    );
    expect(effectMatch).not.toBeNull();
    const effectBody = effectMatch[1];
    expect(effectBody).toMatch(/step\s*>=\s*4/);
    expect(effectBody).toMatch(/clearTutorApplicationDraft\(\)/);
  });

  test("the guard appears before the unconditional save call within that effect, not after", () => {
    const effectMatch = APP_JS_SOURCE.match(
      /React\.useEffect\(\(\) => \{([\s\S]*?)\}, \[step, form, phoneCountry, phoneLocal\]\);/
    );
    const effectBody = effectMatch[1];
    const guardIndex = effectBody.search(/step\s*>=\s*4/);
    const saveIndex = effectBody.indexOf("saveTutorApplicationDraft({ step, form, phoneCountry, phoneLocal })");
    expect(guardIndex).toBeGreaterThan(-1);
    expect(saveIndex).toBeGreaterThan(-1);
    expect(guardIndex).toBeLessThan(saveIndex);
  });
});
