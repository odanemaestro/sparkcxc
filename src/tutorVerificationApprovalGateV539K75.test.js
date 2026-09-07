const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

describe("SPARK V5.3.9K7.5 tutor verification and approval gate", () => {
  test("never calls the protected tutor RPC before a verified session exists", () => {
    const tutor = app.indexOf("function BecomeTutorView(");
    const guard = app.indexOf("if (!data.session || !newTutorUser?.email_confirmed_at)", tutor);
    const rpc = app.indexOf('supabase.rpc("submit_tutor_application"', tutor);
    expect(guard).toBeGreaterThan(tutor);
    expect(rpc).toBeGreaterThan(guard);
  });

  test("email verification creates a resumable tutor handoff", () => {
    expect(app).toContain("saveTutorVerificationHandoff({");
    expect(app).toContain("saveTutorApplicationDraft({ step: 3, form, phoneCountry, phoneLocal })");
    expect(app).toContain("Verify your email to finish your tutor application");
  });

  test("verified tutor handoff routes back and auto-submits", () => {
    expect(app).toContain("tutorVerificationHandoffMatchesUser(handoff, session.user)");
    expect(app).toContain('setView("become-tutor", { replace: true })');
    expect(app).toContain("SPARK V5.3.9K7.5 verified tutor auto-submit");
  });

  test("DashboardView treats only approved applications as full tutors", () => {
    const dashboard = app.indexOf("function DashboardView(");
    const tail = app.slice(dashboard, dashboard + 4000);
    expect(tail).toContain('const isTutor = tutorApp?.status === "approved";');
    expect(tail).not.toContain('const isTutor = profile?.role === "tutor" || tutorApp?.status === "approved";');
  });

  test("Tutor-role accounts without approval are routed to application/status instead of full dashboard", () => {
    expect(app).toContain("SPARK_K75_TUTOR_DASHBOARD_APPROVAL_GATE");
    expect(app).toContain('profile?.role === "tutor" && tutorApp?.status !== "approved"');
    expect(app).toContain("<BecomeTutorView");
  });

  test("pending copy explains approval unlock", () => {
    expect(app).toContain("Tutor dashboard tools will unlock after approval");
  });
});
