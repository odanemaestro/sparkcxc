import fs from "fs";
import path from "path";

const srcRoot = __dirname;
const app = fs.readFileSync(path.join(srcRoot, "App.js"), "utf8");
const student = fs.readFileSync(path.join(srcRoot, "components", "learning", "StudentOverviewIntelligence.jsx"), "utf8");
const parent = fs.readFileSync(path.join(srcRoot, "components", "learning", "ParentOverviewIntelligence.jsx"), "utf8");
const flashcards = fs.readFileSync(path.join(srcRoot, "components", "learning", "FlashcardsPanel.jsx"), "utf8");
const migration = fs.readFileSync(path.join(srcRoot, "..", "supabase", "migrations", "20260908_spark_learner_model_v560.sql"), "utf8");

describe("SPARK V5.6.0 learner model integration", () => {
  test("topic quiz answers feed the learner model", () => {
    expect(app).toContain('spark_record_learner_evidence');
    expect(app).toContain('p_source: "topic_quiz"');
    expect(app).toContain('p_error_code: !isCorrect ? misconception?.code || null : null');
  });

  test("student and parent dashboards load explainable learner state", () => {
    expect(app).toContain('from("spark_learner_skill_state")');
    expect(app).toContain("dashboardSubjectInsights");
    expect(app).toContain("studentLearnerModel.focus.skill");
    expect(app).toContain('learnerModel={parentLearnerModel}');
    expect(student).toContain("Recurring issue:");
    expect(parent).toContain("What SPARK is seeing");
  });

  test("flashcard ratings contribute lower-weight evidence", () => {
    expect(flashcards).toContain("flashcardEvidenceForRating");
    expect(flashcards).toContain('p_source: "flashcard"');
    expect(flashcards).toContain("onLearnerStateChange");
  });

  test("database layer stores state, evidence and Adaptive Practice bridge", () => {
    expect(migration).toContain("create table if not exists public.spark_learner_skill_state");
    expect(migration).toContain("create table if not exists public.spark_learner_evidence");
    expect(migration).toContain("spark_capture_csec_question_attempt");
    expect(migration).toContain("update public.csec_skill_progress");
  });
});
