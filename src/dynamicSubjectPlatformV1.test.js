const fs = require("fs");
const path = require("path");

const srcRoot = __dirname;
const repoRoot = path.join(srcRoot,"..");

describe("SPARK Dynamic Subject Platform V1 foundation", () => {
  const app = fs.readFileSync(path.join(srcRoot,"App.js"),"utf8");
  const registry = fs.readFileSync(path.join(srcRoot,"subjects","subjectRegistry.js"),"utf8");
  const catalog = fs.readFileSync(path.join(srcRoot,"subjects","subjectCatalog.js"),"utf8");
  const adapter = fs.readFileSync(path.join(srcRoot,"subjects","subjectLearningAdapter.js"),"utf8");
  const subjectAdmin = fs.readFileSync(path.join(srcRoot,"components","admin","SubjectManagementPanel.jsx"),"utf8");
  const accountAdmin = fs.readFileSync(path.join(srcRoot,"components","admin","AdminAccountsPanel.jsx"),"utf8");
  const migration = fs.readFileSync(
    path.join(repoRoot,"supabase","migrations","20260920060000_dynamic_subject_platform_v1.sql"),
    "utf8"
  );

  test("dedicated admin accounts are a separate UI class", () => {
    expect(app).toContain('profile?.account_type === "admin"');
    expect(app).toContain("isDedicatedAdmin");
    expect(app).toContain('setView("admin", { replace: true })');
    expect(app).toContain("!isDedicatedAdmin && <NotificationCenter");
    expect(migration).toContain("profiles_account_type_check");
    expect(migration).toContain("spark_admin_make_dedicated_admin");
  });

  test("admin view exposes account and subject management", () => {
    expect(app).toContain("AdminAccountsPanel");
    expect(app).toContain("SubjectManagementPanel");
    expect(accountAdmin).toContain("Make dedicated admin");
    expect(subjectAdmin).toContain("Sync current SPARK manifests");
  });

  test("subject catalog is database backed but keeps built-in implementations", () => {
    expect(migration).toContain("create table if not exists public.spark_subjects");
    expect(migration).toContain("spark_subject_sections");
    expect(migration).toContain("spark_subject_topics");
    expect(migration).toContain("spark_subject_prerequisites");
    expect(migration).toContain("spark_subject_activity_catalog");
    expect(registry).toContain('implementation: "builtin"');
    expect(catalog).toContain("mergeSubjectCatalog");
  });

  test("one-click subject sync is configuration-only and admin protected", () => {
    expect(migration).toContain("spark_admin_sync_subject_catalog");
    expect(migration).toContain("spark_current_user_is_admin()");
    expect(migration).toContain("cannot execute arbitrary");
    expect(subjectAdmin).toContain("syncSubjectManifest");
  });

  test("generic subject adapter establishes a future-subject learner contract", () => {
    expect(adapter).toContain('adapterId:"generic-subject-v1"');
    expect(adapter).toContain("supportedActions");
    expect(adapter).toContain("evidencePolicy");
    expect(adapter).toContain("validateSubjectLearningCompatibility");
  });

  test("live publishing requires progress and routes for enabled learning surfaces", () => {
    expect(migration).toContain("A live subject must support progress tracking");
    expect(migration).toContain("A Study route is required before publishing this subject");
    expect(migration).toContain("A Practice route is required before publishing this subject");
  });
});