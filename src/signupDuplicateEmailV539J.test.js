const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

describe("SPARK V5.3.9J duplicate signup email handling", () => {
  test("shows a friendly message for explicit duplicate-user signup errors", () => {
    expect(app).toMatch(/user already registered|user_already_exists|already registered/i);
    expect(app).toContain("An account already exists with this email. Log in instead or use Forgot password.");
  });

  test("detects Supabase's obfuscated existing-user signup response", () => {
    expect(app).toContain("const signupIdentities = data?.user?.identities;");
    expect(app).toContain("Array.isArray(signupIdentities)");
    expect(app).toContain("signupIdentities.length === 0");
    expect(app).toContain("const duplicateSignupEmail =");
  });

  test("blocks the normal verification-success path for duplicate responses", () => {
    const duplicateGuard = app.indexOf("if (duplicateSignupEmail)");
    const verificationWrite = app.indexOf('localStorage.setItem("spark_verification_email", cleanEmail);', duplicateGuard);
    expect(duplicateGuard).toBeGreaterThan(-1);
    expect(verificationWrite).toBeGreaterThan(duplicateGuard);
  });
});
