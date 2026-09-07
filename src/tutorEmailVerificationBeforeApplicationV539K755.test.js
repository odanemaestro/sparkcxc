const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
const helper = fs.readFileSync(path.join(__dirname, "lib", "tutorVerificationHandoff.js"), "utf8");

describe("SPARK V5.3.9K7.5.5 Tutor verification before application", () => {
  test("Tutor password signup creates the Auth account before the application", () => {
    const authStart = app.indexOf("function AuthView(");
    const authEnd = app.indexOf("\nfunction ", authStart + 20);
    const authBlock = app.slice(authStart, authEnd);

    const duplicate = authBlock.indexOf("if (signupEmailAlreadyRegistered === true)");
    const tutor = authBlock.indexOf("SPARK_K755_VERIFY_BEFORE_APPLICATION");
    const signUp = authBlock.indexOf("supabase.auth.signUp({", tutor);
    const handoff = authBlock.indexOf('stage: "pre_application"', tutor);

    expect(duplicate).toBeGreaterThan(-1);
    expect(tutor).toBeGreaterThan(duplicate);
    expect(signUp).toBeGreaterThan(tutor);
    expect(handoff).toBeGreaterThan(signUp);
  });

  test("anonymous memory seed no longer unlocks the Tutor application", () => {
    expect(app).toContain("SPARK_K755_VERIFICATION_ROUTE_GATE");
    expect(app).toContain("(session || !!loadTutorVerificationHandoff()) ? (");
    expect(app).not.toContain("(session || readSparkPendingTutorSignupSeed()) ? (");
  });

  test("verified user identity prefills the Tutor application", () => {
    expect(app).toContain('email: user?.email || "", // SPARK_K755_AUTHENTICATED_TUTOR_EMAIL');
    expect(app).toContain("SPARK_K755_OPEN_APPLICATION_AFTER_VERIFICATION");
    expect(app).toContain('handoff?.stage !== "pre_application"');
    expect(app).toContain("user.user_metadata?.name");
  });

  test("pre-application verification never triggers legacy auto-submit", () => {
    expect(app).toContain('handoff?.stage === "pre_application"');
    expect(app).toContain("SPARK V5.3.9K7.5 verified tutor auto-submit");
  });

  test("Tutor application submission requires a confirmed authenticated user", () => {
    const tutorStart = app.indexOf("function BecomeTutorView(");
    const guard = app.indexOf("SPARK_K755_SUBMISSION_REQUIRES_CONFIRMED_EMAIL", tutorStart);
    const rpc = app.indexOf('supabase.rpc("submit_tutor_application"', tutorStart);

    expect(guard).toBeGreaterThan(tutorStart);
    expect(rpc).toBeGreaterThan(guard);
    expect(app).toContain("Verify your email before submitting your tutor application.");
  });

  test("verification screen describes the new sequence", () => {
    expect(app).toContain("SPARK_K755_VERIFICATION_SCREEN_COPY");
    expect(app).toContain("Verify your email to continue");
    expect(app).toContain("verify your email before continuing to the tutor application");
  });

  test("Tutor signup CTA accurately says verification comes first", () => {
    expect(app).toContain("Verify email to continue →");
  });

  test("handoff supports pre_application and legacy submit_application stages", () => {
    expect(helper).toContain('"pre_application"');
    expect(helper).toContain('"submit_application"');
    expect(helper).toContain('stage: normaliseStage(stage)');
  });
});
