const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

describe("SPARK Next Best Action V2 integration", () => {
  const app = fs.readFileSync(path.join(root, "App.js"), "utf8");
  const persistence = fs.readFileSync(path.join(root, "learning", "learnerIntelligencePersistence.js"), "utf8");
  const panel = fs.readFileSync(path.join(root, "components", "learning", "LearnerIntelligencePanel.jsx"), "utf8");
  const adaptive = fs.readFileSync(path.join(root, "adaptive", "AdaptivePractice.jsx"), "utf8");
  const flashcards = fs.readFileSync(path.join(root, "components", "learning", "FlashcardsPanel.jsx"), "utf8");
  const itView = fs.readFileSync(path.join(root, "informationTechnology", "components", "InformationTechnologySubjectView.jsx"), "utf8");
  const subjectProgress = fs.readFileSync(path.join(root, "subjects", "subjectProgress.js"), "utf8");
  const reportModal = fs.readFileSync(path.join(root, "components", "reports", "ProgressReportModal.jsx"), "utf8");
  const pdf = fs.readFileSync(path.join(root, "reports", "studentProgressReport.js"), "utf8");
  const parent = fs.readFileSync(path.join(root, "components", "learning", "ParentOverviewIntelligence.jsx"), "utf8");
  const migration = fs.readFileSync(path.join(root, "..", "supabase", "migrations", "20260920224500_next_best_action_v2.sql"), "utf8");

  test("student intelligence loads recommendation history and ranks all three subjects", () => {
    expect(app).toContain("loadLearnerRecommendationHistory");
    expect(app).toContain("loadRecommendationEffectiveness");
    expect(app).toContain("studentIntelligenceBySubject");
    expect(app).toContain("enhanceLearnerIntelligence");
    expect(app).toContain("openNextBestActionTarget");
  });

  test("Next Best Action panel exposes exact target, time, alternatives and readiness limiters", () => {
    expect(panel).toContain("NEXT BEST ACTION");
    expect(panel).toContain("Exact activity");
    expect(panel).toContain("OTHER USEFUL OPTIONS");
    expect(panel).toContain("WHAT IS LIMITING READINESS");
    expect(panel).toContain("expectedMinutes");
  });

  test("Mathematics adaptive and flashcards consume hash-routed exact targets", () => {
    expect(adaptive).toContain("readSparkHashRoute");
    expect(adaptive).toContain("requestedSkill");
    expect(adaptive).toContain("topic.skills");
    expect(flashcards).toContain("requestedDeck");
    expect(flashcards).toContain("readSparkHashRoute");
  });

  test("IT exact practice step records useful learning evidence", () => {
    expect(itView).toContain("initialStep");
    expect(itView).toMatch(/type\s*:\s*["']it_topic_practice["']/);
    expect(subjectProgress).toMatch(/type\s*===\s*["']it_topic_practice["']/);
    expect(subjectProgress).toMatch(/activityType\s*:\s*["']practice["']/);
  });

  test("progress reports and parent intelligence carry Phase 2 insight", () => {
    expect(reportModal).toContain("learnerIntelligence");
    expect(reportModal).toContain("Exam readiness");
    expect(pdf).toContain("SPARK learner intelligence");
    expect(parent).toContain("learnerIntelligence");
    expect(parent).toMatch(/NEXT BEST ACTION/i);
  });

  test("Phase 2 database functions keep aggregate learning safe and marking deterministic", () => {
    expect(migration).toContain("spark_recommendation_effectiveness_signal_v2");
    expect(migration).toContain("spark_admin_question_quality_signals_v2");
    expect(migration).toContain("completed_count >= 8");
    expect(migration).toContain("not a causal effect estimate");
    expect(migration).toContain("Never changes canonical answers");
  });

  test("recommendation persistence stores exact target metadata without becoming grading logic", () => {
    expect(persistence).toContain("recommendation_key");
    expect(persistence).toContain("target_key");
    expect(persistence).toContain("expected_minutes");
    expect(persistence).toContain("spark_record_learning_recommendation");
    expect(persistence).not.toMatch(/correct_answer\s*=|mark_scheme\s*=/i);
  });
});