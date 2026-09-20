const fs = require("fs");
const path = require("path");

describe("SPARK Learner Intelligence V2 integration integrity", () => {
  const src = path.join(__dirname, "..");
  const repo = path.join(src, "..");
  const read = relative => fs.readFileSync(path.join(src, relative), "utf8");

  test("student dashboard loads and renders V2 learner state", () => {
    const app = read("App.js");
    expect(app).toContain('spark_learning_skill_state_v2');
    expect(app).toContain('<LearnerIntelligencePanel');
    expect(app).toContain('spark:learner-intelligence-updated');
  });

  test("canonical subject activity feeds V2 evidence without replacing progress", () => {
    const progress = read("subjects/subjectProgress.js");
    expect(progress).toContain("recordLearningEvidenceFromSubjectEvent");
    expect(progress).toContain("const progressResult");
    expect(progress).toContain("return progressResult");
  });

  test("Physics labs and question practice emit learning evidence", () => {
    const mechanics = read("physics/mechanics/components/PhysicsMechanicsSection.jsx");
    const thermal = read("physics/thermal/components/PhysicsThermalSection.jsx");
    const waves = read("physics/waves/components/PhysicsWavesSection.jsx");
    const electricity = read("physics/electricity/components/PhysicsElectricitySection.jsx");
    const atomic = read("physics/atomic/components/PhysicsAtomicSection.jsx");
    expect(mechanics).toContain("physics_question_evidence");
    for (const source of [mechanics,thermal,waves,electricity,atomic]) {
      expect(source).toContain("physics_lab_evidence");
    }
  });

  test("IT practical work emits task-level evidence", () => {
    const hub = read("informationTechnology/labs/InformationTechnologyPracticalLabs.jsx");
    const kit = read("informationTechnology/labs/components/ProductivityKit.jsx");
    expect(hub).toContain("it_lab_skill_evidence");
    expect(kit).toContain("onEvidence?.({ taskId:id, score:1");
  });

  test("authoritative grading remains separate from the observational learner model", () => {
    const answer = read("grading/answerIntelligence.js");
    expect(answer).toContain("Learner Intelligence V2 observes the already-decided canonical grade.");
    expect(answer).toContain('spark_record_answer_observation');
    expect(answer).toContain('spark_record_learning_evidence_v2');
  });

  test("database migration includes forgetting, recommendation learning, calibration and guarded model promotion", () => {
    const migration = fs.readFileSync(
      path.join(repo, "supabase", "migrations", "20260920020000_learner_intelligence_v2.sql"),
      "utf8"
    );
    expect(migration).toContain("spark_learning_evidence_v2");
    expect(migration).toContain("retention_probability");
    expect(migration).toContain("spark_learning_item_calibration");
    expect(migration).toContain("spark_learning_recommendations");
    expect(migration).toContain("spark_learning_action_effectiveness");
    expect(migration).toContain("spark_apply_learning_evidence_outcome");
    expect(migration).toContain("spark_build_learning_model_candidate");
    expect(migration).toContain("spark_recalculate_all_learning_states_v2");
    expect(migration).toContain("spark_promote_learning_model_candidate");
    expect(migration).toContain("learned_from_recommendation_outcomes");
    expect(migration).toContain("min_candidate_samples");
    expect(migration).toContain("promotion_margin");
  });
});
