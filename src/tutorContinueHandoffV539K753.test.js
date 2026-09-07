const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

describe("SPARK V5.3.9K7.5.3 Tutor Continue handoff", () => {
  test("uses the exact current general signup duplicate-email gate", () => {
    expect(app).toContain("data: signupEmailAlreadyRegistered,");
    expect(app).toContain('supabase.rpc("spark_email_registered"');
    expect(app).toContain("if (signupEmailAlreadyRegistered === true)");
  });

  test("Tutor Continue happens only after the duplicate-email rejection", () => {
    const authStart = app.indexOf("function AuthView(");
    const authEnd = app.indexOf("\nfunction ", authStart + 20);
    const authBlock = app.slice(authStart, authEnd);

    const rpc = authBlock.indexOf('supabase.rpc("spark_email_registered"');
    const reject = authBlock.indexOf("if (signupEmailAlreadyRegistered === true)");
    const handoff = authBlock.indexOf("SPARK_K753_TUTOR_CONTINUE");

    expect(rpc).toBeGreaterThan(-1);
    expect(reject).toBeGreaterThan(rpc);
    expect(handoff).toBeGreaterThan(reject);
  });

  test("Tutor password is validated before opening the application", () => {
    expect(app).toContain("const tutorPasswordError = validatePassword(password);");
    expect(app).toContain("if (tutorPasswordError) throw new Error(tutorPasswordError);");
  });

  test("Tutor signup details are page-lifetime memory only", () => {
    expect(app).toContain("SPARK_K753_TUTOR_SIGNUP_MEMORY_HANDOFF");
    expect(app).toContain("let sparkPendingTutorSignupSeed = null;");
    expect(app).not.toMatch(/localStorage\.setItem\([^)]*sparkPendingTutorSignupSeed/i);
    expect(app).not.toMatch(/sessionStorage\.setItem\([^)]*sparkPendingTutorSignupSeed/i);
  });

  test("validated anonymous Tutor can render BecomeTutorView", () => {
    expect(app).toContain("(session || readSparkPendingTutorSignupSeed()) ? (");
    expect(app).toContain('key="become-tutor-auth-gate"');
  });

  test("Tutor application receives the signup seed", () => {
    expect(app).toContain("SPARK_K753_TUTOR_FORM_SEED");
    expect(app).toContain("name: readSparkPendingTutorSignupSeed().name");
    expect(app).toContain("email: readSparkPendingTutorSignupSeed().email");
    expect(app).toContain("password: readSparkPendingTutorSignupSeed().password");
  });

  test("password-bearing seed is cleared after Auth user creation", () => {
    const tutorStart = app.indexOf("function BecomeTutorView(");
    const uid = app.indexOf("uid = newTutorUser?.id;", tutorStart);
    const clear = app.indexOf("SPARK_K753_CLEAR_TUTOR_SIGNUP_SEED_AFTER_AUTH", uid);
    expect(uid).toBeGreaterThan(tutorStart);
    expect(clear).toBeGreaterThan(uid);
  });

  test("K7.5 verification and approval protections remain installed", () => {
    expect(app).toContain("SPARK V5.3.9K7.5 tutor verification route handoff");
    expect(app).toContain("if (!data.session || !newTutorUser?.email_confirmed_at)");
    expect(app).toContain("SPARK_K75_TUTOR_DASHBOARD_APPROVAL_GATE");
  });
});
