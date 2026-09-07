// SPARK V5.3.9K7.5.5
// Password-free browser handoff for Tutor email verification.
//
// Stages:
//   pre_application   Account exists, email must be verified before the application opens.
//   submit_application Legacy K7.5 handoff for an application completed before verification.
//
// No password, application answers, or secrets are stored here.

const KEY = "spark_tutor_verification_handoff_v1";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const VALID_STAGES = new Set(["pre_application", "submit_application"]);

function normaliseEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normaliseStage(value) {
  // Existing K7.5 records had no stage. Treat them as the legacy
  // submit-after-verification flow so an in-flight applicant is not stranded.
  return VALID_STAGES.has(value) ? value : "submit_application";
}

export function saveTutorVerificationHandoff({ email, userId, stage = "submit_application" }) {
  try {
    const cleanEmail = normaliseEmail(email);
    if (!cleanEmail || !userId) return false;

    localStorage.setItem(KEY, JSON.stringify({
      email: cleanEmail,
      userId: String(userId),
      stage: normaliseStage(stage),
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
      stage: normaliseStage(parsed.stage),
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
    // Nothing actionable if browser storage is unavailable.
  }
}

export function tutorVerificationHandoffMatchesUser(handoff, user) {
  if (!handoff || !user) return false;

  const sameId = String(handoff.userId || "") === String(user.id || "");
  const sameEmail = normaliseEmail(handoff.email) === normaliseEmail(user.email);
  return Boolean(sameId && sameEmail);
}
