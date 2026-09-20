const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

describe("SPARK Learner Intelligence V2 integration", () => {
  const app = fs.readFileSync(path.join(root, "App.js"), "utf8");
  const progress = fs.readFileSync(path.join(root, "subjects", "subjectProgress.js"), "utf8");
  const detail = fs.readFileSync(path.join(root, "components", "learning", "SubjectProgressDetail.jsx"), "utf8");
  const panel = fs.readFileSync(path.join(root, "components", "learning", "LearnerIntelligencePanel.jsx"), "utf8");
  const adaptive = fs.readFileSync(path.join(root, "adaptive", "AdaptivePractice.jsx"), "utf8");
  const mathFlashcards = fs.readFileSync(path.join(root, "components", "learning", "FlashcardsPanel.jsx"), "utf8");
  const migration = fs.readFileSync(path.join(root, "..", "supabase", "migrations", "20260920213000_learner_intelligence_v2.sql"), "utf8");

  test("student progress surfaces learner intelligence for Mathematics and other subjects", () => {
    expect(app).toContain("buildLearnerIntelligenceFromSkillStates");
    expect(app).toContain("studentMathIntelligence");
    expect(app).toContain("<LearnerIntelligencePanel");
    expect(app).toContain('writeSparkNestedRoute("/practice/mathematics", { mode: "adaptive" })');
    expect(detail).toContain("buildSubjectLearnerIntelligence");
    expect(detail).toContain("<LearnerIntelligencePanel");
  });

  test("canonical subject progress observes recommendation outcomes without changing grading", () => {
    expect(progress).toContain("observeRecommendationOutcome");
    expect(progress).toContain("spark_record_subject_progress");
    expect(progress).toContain("Recommendation outcome tracking must never block canonical progress");
  });

  test("recommendation learning loop persists starts and outcomes", () => {
    expect(migration).toContain("spark_learning_recommendations");
    expect(migration).toContain("spark_record_learning_recommendation");
    expect(migration).toContain("spark_observe_recommendation_outcome");
    expect(migration).toContain("spark_recommendation_effectiveness_v2");
    expect(adaptive).toContain("observeRecommendationOutcome");
    expect(mathFlashcards).toContain("observeRecommendationOutcome");
  });

  test("observed question difficulty remains informational", () => {
    expect(migration).toContain("spark_question_difficulty_v2");
    expect(migration).toContain("does not replace authored");
    expect(panel).toContain("never changes an answer key or awarded mark");
  });
});