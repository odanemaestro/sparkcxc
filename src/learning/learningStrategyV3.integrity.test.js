const fs = require("fs");
const path = require("path");

const srcRoot = path.join(__dirname, "..");
const repoRoot = path.join(srcRoot, "..");

describe("SPARK Learning Loop V3 integration", () => {
  const strategy = fs.readFileSync(path.join(__dirname, "learningStrategyV3.js"), "utf8");
  const nextBest = fs.readFileSync(path.join(__dirname, "nextBestActionV2.js"), "utf8");
  const persistence = fs.readFileSync(path.join(__dirname, "learnerIntelligencePersistence.js"), "utf8");
  const subjectProgress = fs.readFileSync(path.join(srcRoot, "subjects", "subjectProgress.js"), "utf8");
  const app = fs.readFileSync(path.join(srcRoot, "App.js"), "utf8");
  const admin = fs.readFileSync(path.join(srcRoot, "components", "admin", "LearningEngineAdminPanel.jsx"), "utf8");
  const migration = fs.readFileSync(path.join(repoRoot, "supabase", "migrations", "20260920233000_learning_loop_v3.sql"), "utf8");

  test("Next Best Action consumes a stable strategy assignment", () => {
    expect(nextBest).toContain("strategyAdjustmentForCandidate");
    expect(nextBest).toContain("strategyAssignment");
    expect(nextBest).toContain("learningStrategy");
    expect(nextBest).toContain("outcomeScope");
  });

  test("App loads strategy assignments and applies them per subject", () => {
    expect(app).toContain("loadLearningStrategyAssignments");
    expect(app).toContain("studentLearningStrategyAssignments");
    expect(app).toContain("strategyAssignment:studentLearningStrategyAssignments[subject.id]");
  });

  test("recommendations persist strategy identity for audit and evaluation", () => {
    expect(persistence).toContain("strategyMetadata");
    expect(persistence).toContain("...strategyMetadata(strategy)");
    expect(strategy).toContain("strategy_id:");
    expect(strategy).toContain("experiment_id:");
    expect(persistence).toContain("spark_get_learning_strategy_assignment");
    expect(persistence).toContain("spark_learning_strategy_performance_signal_v3");
  });

  test("subject outcomes carry topic and section scope into the matcher", () => {
    expect(subjectProgress).toContain("topic_id:");
    expect(subjectProgress).toContain("section_id:");
    expect(subjectProgress).toContain("activity_key:activityKey");
  });

  test("database keeps one active recommendation and matches intended outcome scope", () => {
    expect(migration).toContain("superseded_by_new_recommendation");
    expect(migration).toContain("spark_learning_outcome_scope_match_v3");
    expect(migration).toContain("scope_matched");
    expect(migration).toContain("created_at < now() - interval '7 days'");
  });

  test("admin-access follow-up migration uses SPARK is_admin authority", () => {
    const adminFix = fs.readFileSync(
      path.join(repoRoot, "supabase", "migrations", "20260920234500_learning_loop_v3_admin_access_fix.sql"),
      "utf8"
    );
    expect(adminFix).toContain("admin-access alignment");
    expect(adminFix).toContain("coalesce(p.is_admin,false) = true");
    expect(adminFix).not.toMatch(/p\.role\s*=\s*['"]admin['"]/i);
  });

  test("candidate strategy rollout and promotion have conservative gates", () => {
    expect(migration).toContain("least(25,coalesce(p_rollout_percent,10))");
    expect(migration).toContain("at least 30 completed recommendation outcomes");
    expect(migration).toContain("at least 7 days of observed outcomes");
    expect(migration).toContain("Candidate completion rate is too far below the champion");
    expect(migration).toContain("Candidate adjusted outcome signal is too far below the champion");
  });

  test("admin gets a visible learning-engine control surface", () => {
    expect(app).toContain("LearningEngineAdminPanel");
    expect(admin).toContain("SPARK LEARNING LOOP V3");
    expect(admin).toContain("Promote to champion");
    expect(admin).toContain("Promotion is still a manual decision");
  });

  test("learning loop never becomes grading or answer-key mutation code", () => {
    const combined = `${strategy}\n${nextBest}\n${persistence}\n${migration}`;
    expect(combined).not.toMatch(/update\s+public\.(csec_question_attempts|questions|question_bank|mark_scheme)/i);
    expect(strategy).toMatch(/never change grading/i);
    expect(migration).toMatch(/nothing here changes canonical answers/i);
  });
});