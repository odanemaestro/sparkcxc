const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
const migration = fs.readFileSync(
  path.join(root, "supabase", "migrations", "20260907011500_signup_email_exists.sql"),
  "utf8"
);

describe("SPARK V5.3.9J3 reliable duplicate signup email check", () => {
  test("checks registration before calling Supabase signUp", () => {
    const check = app.indexOf('supabase.rpc("spark_email_registered"');
    const signup = app.indexOf("supabase.auth.signUp({", check);
    expect(check).toBeGreaterThan(-1);
    expect(signup).toBeGreaterThan(check);
  });

  test("shows the requested friendly existing-account message", () => {
    expect(app).toContain("An account already exists with this email. Log in instead or use Forgot password.");
    expect(app).toContain("if (emailRegistered === true)");
  });

  test("migration checks auth.users without exposing user records", () => {
    expect(migration).toContain("create or replace function public.spark_email_registered");
    expect(migration).toContain("returns boolean");
    expect(migration).toContain("from auth.users");
    expect(migration).toContain("grant execute on function public.spark_email_registered(text) to anon, authenticated");
  });
});
