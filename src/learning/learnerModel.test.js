import {
  buildLearnerModelProfile,
  flashcardEvidenceForRating,
  normalizeLearnerState,
  recommendationForMastery,
} from "./learnerModel";

describe("SPARK learner model", () => {
  test("normalizes mastery, confidence, trend and misconception evidence", () => {
    const state = normalizeLearnerState({
      skill: "Trigonometric ratios",
      mastery_probability: 0.46,
      confidence: 0.81,
      evidence_count: 12,
      trend_score: -0.04,
      misconception_counts: { "TRIG::RATIO": 4, "TRIG::ANGLE": 1 },
      misconception_labels: { "TRIG::RATIO": "Wrong ratio selection" },
      last_practised_at: new Date().toISOString(),
    });
    expect(state.mastery).toBe(46);
    expect(state.confidenceLabel).toBe("High");
    expect(state.trendLabel).toBe("Needs attention");
    expect(state.commonError.label).toBe("Wrong ratio selection");
  });

  test("prioritizes weak, confident learner states ahead of mastered skills", () => {
    const profile = buildLearnerModelProfile([
      { skill: "Algebra", mastery_probability: 0.42, confidence: 0.85, evidence_count: 10, trend_score: -0.02 },
      { skill: "Sets", mastery_probability: 0.91, confidence: 0.90, evidence_count: 10, trend_score: 0.01 },
    ]);
    expect(profile.focus.skill).toBe("Algebra");
    expect(profile.weakSkillSignals[0]).toEqual({ skill: "Algebra", score: 42 });
    expect(profile.prioritySkills.some(item => item.skill === "Sets")).toBe(false);
  });

  test("keeps flashcards as lower-weight evidence than scored questions", () => {
    expect(flashcardEvidenceForRating("again")).toEqual({ correct: false, weight: 0.40, helpUsed: false });
    expect(flashcardEvidenceForRating("easy")).toEqual({ correct: true, weight: 0.40, helpUsed: false });
  });

  test("does not overstate low-confidence mastery", () => {
    expect(recommendationForMastery(0.8, 0.1)).toMatch(/baseline/i);
  });
});
