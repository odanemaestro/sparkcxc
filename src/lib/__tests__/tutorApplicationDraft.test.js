// ============================================================================
// Done by: Odane Robinson
//
// Tests for the fix to a reported bug: an applicant who filled out the
// tutor application form, was prompted to log in before submitting, and
// navigated to the login screen lost everything they had typed, because
// BecomeTutorView and the login screen are mutually-exclusive top-level
// views in App.js - switching between them unmounts BecomeTutorView and
// destroys its local form state. These tests exercise the localStorage
// draft layer that now survives that unmount/remount cycle.
// ============================================================================
import {
  saveTutorApplicationDraft,
  loadTutorApplicationDraft,
  clearTutorApplicationDraft,
} from "../tutorApplicationDraft";

const SAMPLE_FORM = {
  name: "Andre Campbell",
  email: "andre@example.com",
  password: "super-secret-123",
  phone: "+18765550123",
  bio: "An experienced maths tutor with five years in the classroom.",
  subjects: ["Mathematics", "Physics"],
  rate: 2500,
  quals: "BSc Mathematics, UWI",
  experience: "5 years teaching CSEC Maths",
  availability: "Weekday evenings",
};

beforeEach(() => {
  localStorage.clear();
});

describe("saveTutorApplicationDraft / loadTutorApplicationDraft - the core fix", () => {
  test("a saved draft can be loaded back with the same field values (simulating navigating away and back)", () => {
    saveTutorApplicationDraft({ step: 3, form: SAMPLE_FORM, phoneCountry: "JM", phoneLocal: "555 0123" });
    const restored = loadTutorApplicationDraft();
    expect(restored).not.toBeNull();
    expect(restored.step).toBe(3);
    expect(restored.phoneCountry).toBe("JM");
    expect(restored.phoneLocal).toBe("555 0123");
    expect(restored.form.name).toBe(SAMPLE_FORM.name);
    expect(restored.form.bio).toBe(SAMPLE_FORM.bio);
    expect(restored.form.subjects).toEqual(SAMPLE_FORM.subjects);
    expect(restored.form.quals).toBe(SAMPLE_FORM.quals);
    expect(restored.form.experience).toBe(SAMPLE_FORM.experience);
    expect(restored.form.availability).toBe(SAMPLE_FORM.availability);
  });

  test("the password is NEVER persisted, even though it's part of the form passed in", () => {
    saveTutorApplicationDraft({ step: 1, form: SAMPLE_FORM, phoneCountry: "JM", phoneLocal: "5550123" });
    const rawStored = localStorage.getItem("sparkv3_tutor_application_draft_v1");
    expect(rawStored).not.toContain("super-secret-123");
    const restored = loadTutorApplicationDraft();
    expect(restored.form.password).toBeUndefined();
  });

  test("loadTutorApplicationDraft returns null when nothing has been saved", () => {
    expect(loadTutorApplicationDraft()).toBeNull();
  });

  test("clearTutorApplicationDraft removes the saved draft", () => {
    saveTutorApplicationDraft({ step: 2, form: SAMPLE_FORM, phoneCountry: "US", phoneLocal: "5551234567" });
    expect(loadTutorApplicationDraft()).not.toBeNull();
    clearTutorApplicationDraft();
    expect(loadTutorApplicationDraft()).toBeNull();
  });

  test("a corrupted/malformed entry in localStorage is treated as no draft, not a crash", () => {
    localStorage.setItem("sparkv3_tutor_application_draft_v1", "{not valid json");
    expect(() => loadTutorApplicationDraft()).not.toThrow();
    expect(loadTutorApplicationDraft()).toBeNull();
  });

  test("an entry with no `form` field is rejected as invalid", () => {
    localStorage.setItem("sparkv3_tutor_application_draft_v1", JSON.stringify({ step: 2 }));
    expect(loadTutorApplicationDraft()).toBeNull();
  });
});

describe("draft expiration", () => {
  test("a draft saved just now is restored", () => {
    saveTutorApplicationDraft({ step: 1, form: SAMPLE_FORM, phoneCountry: "JM", phoneLocal: "5550123" });
    expect(loadTutorApplicationDraft()).not.toBeNull();
  });

  test("a draft older than 7 days is treated as expired and cleared, not restored", () => {
    const eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
    const staleDraft = { step: 2, form: SAMPLE_FORM, phoneCountry: "JM", phoneLocal: "5550123", savedAt: eightDaysAgo };
    localStorage.setItem("sparkv3_tutor_application_draft_v1", JSON.stringify(staleDraft));
    expect(loadTutorApplicationDraft()).toBeNull();
    // Confirm it was actually cleared from storage, not just filtered on read.
    expect(localStorage.getItem("sparkv3_tutor_application_draft_v1")).toBeNull();
  });

  test("a draft saved 6 days ago (within the 7-day window) is still restored", () => {
    const sixDaysAgo = Date.now() - 6 * 24 * 60 * 60 * 1000;
    const recentDraft = { step: 2, form: SAMPLE_FORM, phoneCountry: "JM", phoneLocal: "5550123", savedAt: sixDaysAgo };
    localStorage.setItem("sparkv3_tutor_application_draft_v1", JSON.stringify(recentDraft));
    expect(loadTutorApplicationDraft()).not.toBeNull();
  });
});

describe("regression: step 4 (the success screen) must never be restorable as a draft", () => {
  // Bug found in production, reported directly by the user: after
  // submitting a tutor application and seeing "Application submitted!",
  // refreshing the page kept showing that same success screen forever -
  // even for what should have been a brand new visit. Root cause: the
  // autosave effect in BecomeTutorView saved unconditionally on every
  // change, including the render right after setStep(4), which re-wrote
  // the draft with step:4 immediately after the explicit
  // clearTutorApplicationDraft() call that was supposed to remove it.

  test("saveTutorApplicationDraft called with step 4 does not persist a restorable draft", () => {
    // Simulates the exact sequence that used to break: clear, then the
    // autosave effect fires once more on the step-4 render.
    clearTutorApplicationDraft();
    saveTutorApplicationDraft({ step: 4, form: SAMPLE_FORM, phoneCountry: "JM", phoneLocal: "5550123" });
    expect(loadTutorApplicationDraft()).toBeNull();
  });

  test("saveTutorApplicationDraft called with step 5+ (any post-success state) also does not persist", () => {
    saveTutorApplicationDraft({ step: 5, form: SAMPLE_FORM, phoneCountry: "JM", phoneLocal: "5550123" });
    expect(loadTutorApplicationDraft()).toBeNull();
  });

  test("an already-corrupted step:4 entry written directly to localStorage (simulating a user who hit this bug before the fix shipped) is cleaned up on load, not restored", () => {
    // This is the critical case: fixing only the save side would not help
    // anyone who already has the broken draft sitting in their browser -
    // the load side has to actively reject it too.
    const corruptedDraft = { step: 4, form: SAMPLE_FORM, phoneCountry: "JM", phoneLocal: "5550123", savedAt: Date.now() };
    localStorage.setItem("sparkv3_tutor_application_draft_v1", JSON.stringify(corruptedDraft));
    expect(loadTutorApplicationDraft()).toBeNull();
    // And it should actually be removed from storage, not just filtered
    // out on this one read - otherwise something else reading the raw key
    // directly would still see the stale success state.
    expect(localStorage.getItem("sparkv3_tutor_application_draft_v1")).toBeNull();
  });

  test("normal in-progress steps (1-3) are unaffected by this fix and still save/restore correctly", () => {
    for (const step of [1, 2, 3]) {
      localStorage.clear();
      saveTutorApplicationDraft({ step, form: SAMPLE_FORM, phoneCountry: "JM", phoneLocal: "5550123" });
      const restored = loadTutorApplicationDraft();
      expect(restored).not.toBeNull();
      expect(restored.step).toBe(step);
    }
  });
});


describe("simulated end-to-end scenario matching the bug report", () => {
  test("filling the form, 'navigating away' (new module state), and 'coming back' restores everything except the password", () => {
    // Step 1: applicant fills out the form (simulated as a plain object,
    // since the real form lives in BecomeTutorView's React state).
    let liveForm = { ...SAMPLE_FORM };
    let liveStep = 3;

    // Autosave fires on every change, exactly as the useEffect in
    // BecomeTutorView does.
    saveTutorApplicationDraft({ step: liveStep, form: liveForm, phoneCountry: "JM", phoneLocal: "5550123" });

    // Step 2: user navigates to "login" - in the real app this unmounts
    // BecomeTutorView, destroying `liveForm`/`liveStep`. We simulate that
    // by simply discarding our local variables.
    liveForm = null;
    liveStep = null;

    // Step 3: user logs in, then navigates back to "become-tutor" - a
    // fresh BecomeTutorView mounts and calls loadTutorApplicationDraft()
    // during its lazy state initializers.
    const restored = loadTutorApplicationDraft();

    expect(restored).not.toBeNull();
    expect(restored.step).toBe(3);
    expect(restored.form.bio).toBe(SAMPLE_FORM.bio);
    expect(restored.form.subjects).toEqual(SAMPLE_FORM.subjects);
    expect(restored.form.password).toBeUndefined(); // must be retyped, by design
  });
});
