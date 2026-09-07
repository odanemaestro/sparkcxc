const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
const migration = fs.readFileSync(
  path.join(root, "supabase", "migrations", "20260907041500_google_oauth_account_gate.sql"),
  "utf8"
);

const EXISTING =
  "An account already exists with this email. Log in instead or use Forgot password.";

describe("SPARK V5.3.9K7.2 Google OAuth account gate", () => {
  test("Google OAuth creates a server-side attempt before redirect", () => {
    const begin = app.indexOf('"spark_begin_google_oauth_attempt"');
    const oauth = app.indexOf("supabase.auth.signInWithOAuth({", begin);
    expect(begin).toBeGreaterThan(-1);
    expect(oauth).toBeGreaterThan(begin);
    expect(app.slice(begin, oauth)).toContain("p_mode: googleMode");
    expect(app.slice(begin, oauth)).toContain("p_role: googleRole");
  });

  test("Google Log in with a new identity is gated instead of silently becoming Student", () => {
    expect(app).toContain('status === "login_needs_setup"');
    expect(app).toContain("No SPARK account found");
    expect(app).toContain("Create Student account");
    expect(app).toContain("Choose another account type");
  });

  test("the alternate account-type choice includes Student Tutor and Parent", () => {
    expect(app).toContain('["student","tutor","parent"].map');
    expect(app).toContain('role === "tutor" ? "become-tutor" : "dashboard"');
  });

  test("Google Sign up with an established account returns the normal existing-account error", () => {
    expect(app).toContain('status === "existing_signup"');
    expect(app).toContain("SPARK_GOOGLE_SIGNUP_REJECT_KEY");
    expect(app).toContain(EXISTING);
  });

  test("all password signup roles run the registered-email check", () => {
    expect(app).toContain("signupEmailAlreadyRegistered");
    expect(app).toContain('supabase.rpc("spark_email_registered"');
    expect(app).toContain(EXISTING);
  });

  test("pending Google setup is checked on every restored authenticated session", () => {
    expect(app).toContain('supabase.rpc("spark_google_pending_account_status"');
    expect(app).toContain("googlePendingSetup");
  });

  test("server correlates account creation with an attempt created before OAuth", () => {
    expect(migration).toContain("spark_begin_google_oauth_attempt");
    expect(migration).toContain("v_user_created_at >= v_attempt.created_at");
    expect(migration).toContain("v_identity_count = 1");
    expect(migration).toContain("v_google_identity_count = 1");
  });

  test("provisional accounts persist until an explicit account type is completed", () => {
    expect(migration).toContain("spark_google_pending_accounts");
    expect(migration).toContain("spark_complete_google_pending_account");
    expect(migration).toContain("delete from public.spark_google_pending_accounts");
  });

  test("legacy timestamp-based K5/K6 finalizer is removed server-side", () => {
    expect(migration).toContain("drop function if exists public.spark_finalize_google_oauth_intent");
    expect(app).not.toContain("spark_finalize_google_oauth_intent");
  });
});
