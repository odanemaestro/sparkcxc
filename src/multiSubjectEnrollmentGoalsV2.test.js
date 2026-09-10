const fs = require("fs");
const path = require("path");
const {
  buildOverallGoalMetric,
  buildSubjectDashboardSummaries,
  buildRecentSubjectActivity,
} = require("./subjects/subjectProgress");

const root = __dirname;
const app = fs.readFileSync(path.join(root, "App.js"), "utf8");
const registry = fs.readFileSync(path.join(root, "subjects", "subjectRegistry.js"), "utf8");
const enrollment = fs.readFileSync(path.join(root, "components", "learning", "StudentSubjectEnrollment.jsx"), "utf8");
const goal = fs.readFileSync(path.join(root, "components", "learning", "StudentGoalCard.jsx"), "utf8");
const parentGoal = fs.readFileSync(path.join(root, "components", "learning", "ParentSubjectGoalCard.jsx"), "utf8");
const parentIntelligence = fs.readFileSync(path.join(root, "components", "learning", "ParentOverviewIntelligence.jsx"), "utf8");
const allSubjects = fs.readFileSync(path.join(root, "components", "learning", "AllSubjectsProgress.jsx"), "utf8");
const css = fs.readFileSync(path.join(root, "learningIntelligence.css"), "utf8");
const migration = fs.readFileSync(path.join(root, "..", "supabase", "migrations", "20260910_spark_subject_enrollment_goals_v2.sql"), "utf8");
const verifySql = fs.readFileSync(path.join(root, "..", "supabase", "verify_spark_subject_enrollment_goals_v2.sql"), "utf8");

describe("SPARK RC2 subject enrollment and general goal", () => {
  test("students manage My Subjects and dashboards are built from enrolled subjects", () => {
    expect(app).toContain('{k:"subjects",icon:"subjects",label:"My subjects"}');
    expect(app).toContain("spark_student_subject_enrollments");
    expect(app).toContain('supabase.rpc("spark_set_subject_enrollment"');
    expect(app).toContain("studentEnrolledSubjects");
    expect(app).toContain("parentEnrolledSubjects");
    expect(enrollment).toContain("Choose what you want to study");
    expect(enrollment).toContain("Your dashboard, progress, flashcards and reports are built from the subjects you enroll in.");
    expect(registry).toContain("subjectsForEnrollmentIds");
  });

  test("explicit enrollment prevents old progress from silently reappearing after a subject is left", () => {
    const subjects = [{ id:"mathematics", name:"CSEC Mathematics", shortName:"Mathematics", enabled:true, stats:{topics:10} }];
    const rows = [{ subject_id:"physics", activity_type:"topic_quiz", activity_key:"quiz:A1", topic_id:"A1", percent:90, attempt_count:1 }];
    const summaries = buildSubjectDashboardSummaries({
      subjects,
      mathematics:{ done:0, totalTopics:10, learningSummary:{} },
      subjectProgressRows:rows,
      discoverFromProgress:false,
    });
    expect(summaries.map(item => item.id)).toEqual(["mathematics"]);
  });

  test("legacy fallback may still discover recorded subjects before enrollment migration is available", () => {
    const rows = [{ subject_id:"chemistry", activity_type:"topic_quiz", activity_key:"quiz:C1", topic_id:"C1", percent:75, attempt_count:1 }];
    const summaries = buildSubjectDashboardSummaries({ subjects:[], subjectProgressRows:rows, discoverFromProgress:true });
    expect(summaries.map(item => item.id)).toContain("chemistry");
  });

  test("recent activity is restricted to enrolled subjects", () => {
    const rows = [
      { id:"1", subject_id:"physics", activity_key:"quiz:A1", title:"Physics", occurred_at:"2026-09-09T12:00:00Z" },
      { id:"2", subject_id:"chemistry", activity_key:"quiz:C1", title:"Chemistry", occurred_at:"2026-09-09T13:00:00Z" },
    ];
    const activity = buildRecentSubjectActivity({
      subjectProgressRows:rows,
      mathematicsMilestones:[],
      subjects:[{id:"physics",shortName:"Physics"}],
    });
    expect(activity).toHaveLength(1);
    expect(activity[0].subjectId).toBe("physics");
  });

  test("overall goal gives each participating subject equal weight regardless of attempt volume", () => {
    const metric = buildOverallGoalMetric([
      { id:"mathematics", shortName:"Mathematics", progress:{ practiceAttempts:120, practiceAverage:80 } },
      { id:"physics", shortName:"Physics", progress:{ practiceAttempts:4, practiceAverage:60 } },
      { id:"chemistry", shortName:"Chemistry", progress:{ practiceAttempts:0, practiceAverage:100 } },
    ]);
    expect(metric.value).toBe(70);
    expect(metric.subjectCount).toBe(2);
    expect(metric.contributors.map(item => item.subjectId)).toEqual(["mathematics","physics"]);
  });

  test("student Set Goal is dashboard-wide and not subject-specific", () => {
    expect(app).toContain("<StudentGoalCard");
    expect(goal).toContain("Set an overall learning target");
    expect(goal).toContain("Target overall performance");
    expect(goal).toContain("Reach ${value}% overall in SPARK");
    expect(goal).not.toContain("p_subject_id");
    expect(goal).not.toContain("Target Mathematics average");
    expect(parentGoal.toLowerCase()).toContain("overall learning goal");
    expect(parentGoal).not.toContain("p_subject_id");
    expect(parentIntelligence).not.toContain("spark-parent-goal-card");
  });

  test("dashboard language clearly reflects enrollment and recent activity", () => {
    expect(app).toContain("Enrolled subjects");
    expect(allSubjects).toContain("Enrolled subjects");
    expect(parentIntelligence).toContain("Based on recent learning activity");
    expect(parentIntelligence).not.toContain("Based on accumulated learning evidence");
    expect(css).toMatch(/\.spark-model-explainer\{[\s\S]*white-space:nowrap/);
  });

  test("migration does not assume every existing student takes Mathematics", () => {
    expect(migration).toContain("mathematics_participants as");
    expect(migration).toContain("select user_id as student_id from public.lesson_progress");
    expect(migration).toContain("select user_id from public.csec_question_attempts");
    expect(migration).not.toContain("select p.id, 'mathematics', 'active'");
    expect(migration).not.toMatch(/after insert on public\.profiles[\s\S]*mathematics/i);
  });

  test("leaving a subject preserves progress and the general goal", () => {
    const setEnrollmentBlock = migration.match(/create or replace function public\.spark_set_subject_enrollment[\s\S]*?revoke all on function public\.spark_set_subject_enrollment/)?.[0] || "";
    expect(setEnrollmentBlock).toContain("Saved learning progress and the student's general SPARK goal are retained");
    expect(setEnrollmentBlock).not.toContain("update public.spark_student_goals");
    expect(setEnrollmentBlock).not.toContain("delete from public.spark_subject_progress");
  });

  test("database keeps one general active goal and generic goal notifications", () => {
    expect(migration).toContain("one active goal per");
    expect(migration).toContain("spark_student_goals_one_active_idx");
    expect(migration).not.toContain("add column if not exists subject_id");
    expect(migration).toContain("suggested an overall learning goal of");
    expect(migration).toContain("Reach ' || v_suggestion.target_percent::text || '% overall in SPARK");
    expect(migration).toContain("accepted your overall learning goal suggestion");
    expect(verifySql).toContain("single active goal index retained");
    expect(verifySql).toContain("active goal titles are general");
  });

  test("enrollment access is student-owned, approved-parent readable and realtime", () => {
    expect(migration).toContain('create policy "Students view own subject enrollments"');
    expect(migration).toContain('create policy "Parents view linked child subject enrollments"');
    expect(migration).toContain("psl.status = 'approved'");
    expect(migration).toContain("spark_set_subject_enrollment(text,boolean)");
    expect(migration).toContain("alter publication supabase_realtime add table public.spark_student_subject_enrollments");
  });
});
