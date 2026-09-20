import { buildLearnerModelProfile, normalizeLearnerState } from "./learnerModel";
import { prerequisiteRiskForSkill } from "./prerequisiteGraph";
import { buildNextBestAction } from "./nextBestAction";
import { learningEvidenceFromSubjectEvent } from "./learningIntelligenceV2";

describe("SPARK Learner Intelligence V2 algorithms", () => {
  test("retention falls as a skill goes longer without evidence", () => {
    const recent = normalizeLearnerState({
      subject_id:"mathematics", skill:"Algebra", mastery_probability:0.8,
      model_confidence:0.8, stability_days:30,
      last_practised_at:new Date(Date.now()-2*86400000).toISOString(), evidence_count:8,
    });
    const old = normalizeLearnerState({
      subject_id:"mathematics", skill:"Algebra", mastery_probability:0.8,
      model_confidence:0.8, stability_days:30,
      last_practised_at:new Date(Date.now()-60*86400000).toISOString(), evidence_count:8,
    });
    expect(recent.retention).toBeGreaterThan(old.retention);
    expect(recent.effectiveMastery).toBeGreaterThan(old.effectiveMastery);
  });

  test("student confidence is separate from model confidence", () => {
    const state = normalizeLearnerState({
      subject_id:"mathematics", skill:"Fractions", mastery_probability:0.45,
      model_confidence:0.9, self_confidence:0.85, evidence_count:10,
      last_practised_at:new Date().toISOString(),
    });
    expect(state.modelConfidence).toBe(90);
    expect(state.studentConfidence).toBe(85);
    expect(state.confidenceBias).toBe("overconfident");
  });

  test("cross-subject prerequisite risk can identify a Mathematics blocker for Physics", () => {
    const states = [
      { subjectId:"mathematics", skill:"Algebra", effectiveMastery:40 },
      { subjectId:"physics", skill:"A4 Kinematics and Dynamics", effectiveMastery:55 },
    ];
    const result = prerequisiteRiskForSkill({
      subjectId:"physics", skill:"A4 Kinematics and Dynamics", states,
    });
    expect(result.risk).toBeGreaterThan(0);
    expect(result.weak.some(item => item.term === "algebra")).toBe(true);
  });

  test("profile produces subject readiness and priority states", () => {
    const profile = buildLearnerModelProfile([
      {
        subject_id:"physics", skill:"Physics :: B2 Thermal Expansion",
        mastery_probability:0.62, effective_mastery:0.54, model_confidence:0.74,
        retention_probability:0.87, trend_score:-0.08, evidence_count:8,
        last_practised_at:new Date().toISOString(), model_version:"li-v2.0",
      },
      {
        subject_id:"physics", skill:"Physics :: Waves",
        mastery_probability:0.84, effective_mastery:0.80, model_confidence:0.8,
        retention_probability:0.95, trend_score:0.04, evidence_count:10,
        last_practised_at:new Date().toISOString(), model_version:"li-v2.0",
      },
    ]);
    expect(profile.subjects.physics.hasEvidence).toBe(true);
    expect(profile.readinessBySubject.physics.score).toBeGreaterThan(0);
    expect(profile.subjects.physics.focus).toBeTruthy();
  });

  test("next best action explains a recurring misconception", () => {
    const profile = buildLearnerModelProfile([{
      subject_id:"mathematics", skill:"Algebra", mastery_probability:0.48,
      effective_mastery:0.46, model_confidence:0.8, retention_probability:0.95,
      misconception_counts:{sign_error:3}, misconception_labels:{sign_error:"Sign error when transposing terms"},
      evidence_count:10, last_practised_at:new Date().toISOString(), model_version:"li-v2.0",
    }]);
    const action = buildNextBestAction({ profile, subjectId:"mathematics" });
    expect(action.type).toBe("targeted_practice");
    expect(action.explanation).toMatch(/Sign error/i);
  });

  test("lesson completion is exposure evidence, not fake mastery", () => {
    const evidence = learningEvidenceFromSubjectEvent({
      type:"physics_lesson_completion", section:"B", topic:"B2", completed:true,
    });
    expect(evidence.subjectId).toBe("physics");
    expect(evidence.observedScore).toBeNull();
    expect(evidence.metadata.exposure_only).toBe(true);
  });

  test("Physics question evidence carries a scored item for difficulty calibration", () => {
    const evidence = learningEvidenceFromSubjectEvent({
      type:"physics_question_evidence", topic:"C2", itemId:"wave-q17",
      score:0, maxScore:1, difficulty:"Medium",
    });
    expect(evidence.itemId).toBe("wave-q17");
    expect(evidence.observedScore).toBe(0);
    expect(evidence.evidenceWeight).toBeGreaterThan(0.5);
  });

  test("IT practical task evidence becomes a granular skill", () => {
    const evidence = learningEvidenceFromSubjectEvent({
      type:"it_lab_skill_evidence", labId:"spreadsheet", labTitle:"Spreadsheet",
      taskId:"absolute-fill", score:1, result:"completed",
    });
    expect(evidence.subjectId).toBe("information-technology");
    expect(evidence.skill).toMatch(/Spreadsheet/);
    expect(evidence.skill).toMatch(/Absolute Fill/);
    expect(evidence.observedScore).toBe(1);
  });
});
