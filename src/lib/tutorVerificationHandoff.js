// SPARK V5.3.9K7.5
// Safe browser-side handoff for an email/password tutor application that was
// completed before Supabase email verification created an authenticated session.
//
// No password or secret is stored here. The application form itself is already
// persisted by tutorApplicationDraft.js, which deliberately strips passwords.

const KEY = "spark_tutor_verification_handoff_v1";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function normaliseEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function saveTutorVerificationHandoff({ email, userId }) {
  try {
    const cleanEmail = normaliseEmail(email);
    if (!cleanEmail || !userId) return false;
    localStorage.setItem(KEY, JSON.stringify({
      email: cleanEmail,
      userId: String(userId),
      createdAt: Date.now(),
    }));
    return true;
  } catch {
    return false;
  }
}

export function loadTutorVerificationHandoff() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!normaliseEmail(parsed.email) || !parsed.userId) {
      clearTutorVerificationHandoff();
      return null;
    }
    if (!Number.isFinite(parsed.createdAt) || Date.now() - parsed.createdAt > MAX_AGE_MS) {
      clearTutorVerificationHandoff();
      return null;
    }
    return {
      email: normaliseEmail(parsed.email),
      userId: String(parsed.userId),
      createdAt: parsed.createdAt,
    };
  } catch {
    clearTutorVerificationHandoff();
    return null;
  }
}

export function clearTutorVerificationHandoff() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing actionable if storage is unavailable.
  }
}

export function tutorVerificationHandoffMatchesUser(handoff, user) {
  if (!handoff || !user) return false;
  const sameId = String(handoff.userId || "") === String(user.id || "");
  const sameEmail = normaliseEmail(handoff.email) === normaliseEmail(user.email);
  return Boolean(sameId && sameEmail);
}
