const fs = require("fs");
const path = require("path");

const root = __dirname;
const app = fs.readFileSync(path.join(root, "App.js"), "utf8");
const practiceHub = fs.readFileSync(path.join(root, "practice", "PracticeHub.jsx"), "utf8");
const subjectProgress = fs.readFileSync(path.join(root, "subjects", "subjectProgress.js"), "utf8");
const streak = fs.readFileSync(path.join(root, "lib", "studyStreak.js"), "utf8");
const reportModal = fs.readFileSync(path.join(root, "components", "reports", "ProgressReportModal.jsx"), "utf8");
const migration = fs.readFileSync(path.join(root, "..", "supabase", "migrations", "20260910_spark_multisubject_progress_v1.sql"), "utf8");

const dashboardOverviewPath = path.join(root, "components", "learning", "SubjectDashboardOverview.jsx");
const allSubjectsPath = path.join(root, "components", "learning", "AllSubjectsProgress.jsx");
const subjectDetailPath = path.join(root, "components", "learning", "SubjectProgressDetail.jsx");
const releaseMarkerPath = path.join(root, "subjects", ".spark-multisubject-dashboard-progress-rc1.json");

describe("SPARK multi-subject dashboard and progress v1", () => {
  test("student dashboard has subject-neutral overview and progress surfaces", () => {
    expect(fs.existsSync(dashboardOverviewPath)).toBe(true);
    expect(fs.existsSync(allSubjectsPath)).toBe(true);
    expect(fs.existsSync(subjectDetailPath)).toBe(true);
    expect(fs.existsSync(releaseMarkerPath)).toBe(true);
    expect(app).toContain('import SubjectDashboardOverview from "./components/learning/SubjectDashboardOverview";');
    expect(app).toContain('import AllSubjectsProgress from "./components/learning/AllSubjectsProgress";');
    expect(app).toContain("<SubjectDashboardOverview");
    expect(app).toContain("<AllSubjectsProgress");
  });

  test("generic subject progress and immutable activity events load for students and parents", () => {
    expect((app.match(/spark_subject_progress/g) || []).length).toBeGreaterThanOrEqual(3);
    expect((app.match(/spark_subject_activity_events/g) || []).length).toBeGreaterThanOrEqual(3);
    expect(app).toContain("subjectActivityEvents");
    expect(app).toContain("childData?.subjectActivityEvents");
  });

  test("Physics Practice records subject activity through the shared recorder", () => {
    expect(practiceHub).toContain("onSubjectActivity");
    expect(practiceHub).toContain("onActivity={onSubjectActivity}");
    expect(app).toContain("onSubjectActivity={event => {");
    expect(app).toContain("recordPhysicsSubjectActivity({ supabase, event })");
  });

  test("reports use subject event history and support all-subject aggregation", () => {
    expect(subjectProgress).toContain("buildGenericSubjectProgressReport({ subject, rows = [], events = [] }");
    expect(subjectProgress).toContain("buildAllSubjectsProgressReport({ subjectSources = [], goal = null }");
    expect(subjectProgress).toContain("events: source.events || []");
    expect(reportModal).toContain("events: source?.events || []");
    expect(app).toContain("events:subjectActivityEvents");
    expect(app).toContain("events:childData?.subjectActivityEvents || []");
  });

  test("future subjects can be discovered before enrollment exists, while enrolled dashboards can disable discovery", () => {
    expect(subjectProgress).toContain("discoverFromProgress = true");
    expect(subjectProgress).toContain("discoveredIds");
    expect(subjectProgress).toContain("discoveredFromProgress: true");
    expect(subjectProgress).toContain("subjectIdLabel(id)");
    expect(app).toContain("discoverFromProgress: subjectEnrollmentAvailable !== true");
    expect(app).toContain("discoverFromProgress: childData?.subjectEnrollmentAvailable !== true");
  });

  test("one-time timeless backfills do not create fake current study days", () => {
    expect(streak).toContain("row?.metadata?.backfilled");
    expect(streak).toContain("row?.occurred_at || row?.metadata?.at");
  });

  test("database migration is subject-neutral, parent-readable, realtime and RPC-driven", () => {
    expect(migration).toMatch(/create table if not exists public\.spark_subject_progress/i);
    expect(migration).toMatch(/create table if not exists public\.spark_subject_activity_events/i);
    expect(migration).toMatch(/Parents view linked child subject progress/i);
    expect(migration).toMatch(/Parents view linked child subject activity events/i);
    expect(migration).toMatch(/psl\.status = 'approved'/i);
    expect(migration).toMatch(/alter publication supabase_realtime add table public\.spark_subject_progress/i);
    expect(migration).toMatch(/alter publication supabase_realtime add table public\.spark_subject_activity_events/i);
    expect(migration).toMatch(/create or replace function public\.spark_record_subject_progress/i);
    expect(migration).toMatch(/create or replace function public\.spark_sync_subject_progress/i);
  });

  test("cross-subject rewards do not add Physics attempts to Mathematics accuracy counts", () => {
    const questionCountsBlock = migration.match(/question_counts as \(([\s\S]*?)\),\nsubject_practice as/i)?.[1] || "";
    expect(questionCountsBlock).toMatch(/from public\.csec_question_attempts/i);
    expect(questionCountsBlock).toMatch(/correct_questions/i);
    expect(questionCountsBlock).not.toMatch(/spark_subject_activity_events/i);
    expect(migration).toMatch(/subject_practice as[\s\S]*spark_subject_activity_events/i);
  });
});
