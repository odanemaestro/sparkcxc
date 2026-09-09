const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "learningIntelligence.css"), "utf8");
const migration = fs.readFileSync(path.join(__dirname, "..", "supabase", "migrations", "20260908053000_learning_intelligence_reports_flashcards_goals.sql"), "utf8");
const edge = fs.readFileSync(path.join(__dirname, "..", "supabase", "functions", "send-progress-report", "index.ts"), "utf8");
const deno = fs.readFileSync(path.join(__dirname, "..", "supabase", "functions", "send-progress-report", "deno.json"), "utf8");
const flashcardPanel = fs.readFileSync(path.join(__dirname, "components", "learning", "FlashcardsPanel.jsx"), "utf8");
const parentOverview = fs.readFileSync(path.join(__dirname, "components", "learning", "ParentOverviewIntelligence.jsx"), "utf8");
const reportModal = fs.readFileSync(path.join(__dirname, "components", "reports", "ProgressReportModal.jsx"), "utf8");


describe("SPARK V5.3.10 learning intelligence integration", () => {
  test("student dashboard contains insights, reports, goals and flashcards", () => {
    expect(app).toContain("StudentOverviewIntelligence");
    expect(app).toContain('k:"flashcards",icon:"flashcards",label:"Flashcards"');
    expect(app).toContain("<FlashcardsPanel");
    expect(app).toContain("studentReportOpen");
    expect(app).toContain("studentFlashcardReviewEvents");
    expect(app).toContain("onReviewRecorded=");
    expect(app).toContain("weakSkills={learnerModelWeakSkills(studentLearnerModel, studentSummary.weakestSkills)}");
    expect(app).toContain("studentStudyCircle");
    expect(app).toContain('supabase.rpc("spark_get_study_circle_home")');
  });

  test("parent dashboard contains insight and only enables email for a confirmed Parent auth email", () => {
    expect(app).toContain("ParentOverviewIntelligence");
    expect(app).toContain("parentReportOpen");
    expect(app).toContain('canEmail={Boolean(user?.email && user?.email_confirmed_at)}');
    expect(app).toContain("flashcardReviewEvents: childData.flashcardReviewEvents || []");
  });

  test("goal notifications refresh live Student and Parent overview data", () => {
    const studentGoal = fs.readFileSync(path.join(__dirname, "components", "learning", "StudentGoalCard.jsx"), "utf8");
    expect(studentGoal).toContain('window.addEventListener("spark:dashboard-notification-target", handleGoalNotification)');
    expect(studentGoal).toContain('event?.detail?.anchor !== "student-goal"');
    expect(app).toContain('["parent-study-circle", "parent-goal"].includes(notificationTarget?.anchor)');
  });

  test("flashcard due queue stays live and receives weak-skill priorities", () => {
    expect(flashcardPanel).toContain("setInterval(() => setClock(Date.now()), 60 * 1000)");
    expect(flashcardPanel).toContain('new Date(clock)');
    expect(app).toContain("weakSkills={learnerModelWeakSkills(studentLearnerModel, studentSummary.weakestSkills)}");
  });

  test("parent goal form resets when the selected child or current goal changes", () => {
    expect(parentOverview).toContain("useEffect(() => {");
    expect(parentOverview).toContain("[child?.id, goal?.target_percent, goal?.target_date]");
  });

  test("emailed report includes goal and privacy-safe Study Circle summary", () => {
    expect(reportModal).toContain("studyCircle: report.studyCircle || null");
    expect(reportModal).toContain("goal: report.goal || null");
    expect(edge).toContain("Study Circle:");
    expect(edge).not.toContain('.eq("id", auditId).catch');
  });

  test("database migration uses student-owned RLS and secure RPC writes", () => {
    expect(migration).toContain("create table if not exists public.spark_flashcard_progress");
    expect(migration).toContain("create table if not exists public.spark_flashcard_review_events");
    expect(migration).toContain("create table if not exists public.spark_student_goals");
    expect(migration).toContain("create table if not exists public.spark_goal_suggestions");
    expect(migration).toContain('create policy "Students view own flashcard progress"');
    expect(migration).toContain("Only Student accounts can review flashcards");
    expect(migration).toContain("create or replace function public.spark_record_flashcard_review");
    expect(migration).toContain("create or replace function public.spark_suggest_goal");
    expect(migration).toContain("create or replace function public.spark_respond_goal_suggestion");
    expect(migration).toContain("Parents view linked child goals");
  });

  test("email report function rechecks role/link, confirmed email, rate limits and fixed recipient", () => {
    expect(edge).toContain("parent.email_confirmed_at");
    expect(edge).toContain('.eq("parent_id", parent.id).eq("student_id", studentId).eq("status", "approved")');
    expect(edge).toContain("Only Parent accounts can email child progress reports");
    expect(edge).toContain('admin.rpc("spark_begin_progress_report_email"');
    expect(edge).toContain("SPARK_REPORT_RATE_LIMIT_15M");
    expect(edge).toContain("SPARK_REPORT_RATE_LIMIT_24H");
    expect(edge).toContain("looksLikePdfBase64");
    expect(edge).toContain("to: [parent.email]");
    expect(migration).toContain("revoke all on public.spark_progress_report_email_log from anon, authenticated");
  });

  test("progress-report edge function has explicit Deno dependency configuration", () => {
    expect(deno).toContain('"@supabase/supabase-js"');
  });

  test("new dashboard experience is responsive", () => {
    expect(css).toContain("@media(max-width:680px)");
    expect(css).toContain(".spark-flashcard-rating{grid-template-columns:repeat(2,1fr)}");
  });
});
