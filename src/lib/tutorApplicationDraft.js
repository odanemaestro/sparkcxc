// ============================================================================
// Done by: Odane Robinson
//
// Fixes a real reported bug: the tutor application form (BecomeTutorView in
// App.js) and the login screen (AuthView) are rendered as sibling
// conditionals off the same top-level `view` state in App.js - switching
// `view` from "become-tutor" to "login" unmounts BecomeTutorView entirely,
// which destroys its local useState form data. An applicant who fills out
// the whole multi-step form, is prompted to log in before submitting, and
// then navigates to the login screen loses everything they typed; logging
// in afterwards also drops them on the dashboard, not back on the form.
//
// This module persists an in-progress application to localStorage as the
// user types, so it survives that unmount/remount cycle regardless of how
// or why the user navigated away. The password field is deliberately never
// persisted - a plaintext password has no reason to sit in localStorage,
// and the applicant has to retype it once (a small, safe cost) rather than
// risk it lingering in browser storage.
// ============================================================================

const DRAFT_KEY = "sparkv3_tutor_application_draft_v1";
const DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Saves the current in-progress application. `formValues` should be the
 * BecomeTutorView `form` state; `password` is stripped out before writing.
 * Fails silently (e.g. localStorage disabled/full/private-browsing quota) -
 * losing the autosave is far better than crashing the application flow.
 */
export function saveTutorApplicationDraft({ step, form, phoneCountry, phoneLocal }) {
  try {
    const { password, ...formWithoutPassword } = form || {};
    const draft = { step, form: formWithoutPassword, phoneCountry, phoneLocal, savedAt: Date.now() };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns the saved draft as { step, form, phoneCountry, phoneLocal }, or
 * null if there isn't one, it's corrupt/unreadable, it's older than
 * DRAFT_MAX_AGE_MS, or its step is >= 4.
 *
 * The step >= 4 check exists specifically to clean up an already-shipped
 * bug (Odane Robinson): step 4 is the "Application submitted!" success
 * screen, and an earlier version of the autosave effect saved it as if it
 * were a normal resumable step, so anyone who submitted an application
 * before this fix has that success screen sitting in their browser's
 * localStorage as a "draft" and will keep seeing it on every refresh
 * without this check - the save-side fix alone does not undo damage
 * already written to their storage.
 *
 * An indefinitely-lingering draft from a long-abandoned attempt is also
 * more likely to confuse a returning visitor than help them, so a stale
 * one is treated the same as "no draft" and quietly cleared.
 * `form` never contains a password field, by construction of
 * saveTutorApplicationDraft.
 */
export function loadTutorApplicationDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.form) return null;
    if (typeof parsed.step === "number" && parsed.step >= 4) {
      clearTutorApplicationDraft();
      return null;
    }
    if (typeof parsed.savedAt === "number" && Date.now() - parsed.savedAt > DRAFT_MAX_AGE_MS) {
      clearTutorApplicationDraft();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Removes the saved draft - call this once the application is actually submitted. */
export function clearTutorApplicationDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Nothing to do if storage is unavailable; there's nothing left to clear.
  }
}
