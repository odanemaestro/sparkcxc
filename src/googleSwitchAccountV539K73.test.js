const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

describe("SPARK V5.3.9K7.3 Google account switching", () => {
  test("Use a different Google account has a dedicated handler", () => {
    expect(app).toContain("const useDifferentGoogleAccount = async () =>");
    expect(app).toContain("onSignOut={useDifferentGoogleAccount}");
  });

  test("switching account signs out the provisional Google session", () => {
    const start = app.indexOf("const useDifferentGoogleAccount = async () =>");
    const end = app.indexOf("const handleLogout", start);
    const block = app.slice(start, end);
    expect(block).toContain("await supabase.auth.signOut()");
  });

  test("the user is kept on login instead of being left on Home", () => {
    const start = app.indexOf("const useDifferentGoogleAccount = async () =>");
    const end = app.indexOf("const handleLogout", start);
    const block = app.slice(start, end);
    expect(block).toContain('setView("login", { replace: true })');
  });

  test("a fresh server-side Google login attempt is created", () => {
    const start = app.indexOf("const useDifferentGoogleAccount = async () =>");
    const end = app.indexOf("const handleLogout", start);
    const block = app.slice(start, end);
    expect(block).toContain('"spark_begin_google_oauth_attempt"');
    expect(block).toContain('{ p_mode: "login", p_role: null }');
  });

  test("Google is explicitly asked to show the account chooser", () => {
    expect(app).toContain('queryParams: { prompt: "select_account" }');
  });
});
