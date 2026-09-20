import {
  CANDIDATE_STRATEGY_ID,
  CHAMPION_STRATEGY_ID,
  boundedOutcomeWeight,
  championLearningStrategy,
  confidenceBandForStrategySample,
  normalizeLearningStrategyAssignment,
  strategyAdjustmentForCandidate,
  strategyMetadata,
} from "./learningStrategyV3";

describe("SPARK Learning Strategy V3", () => {
  test("falls back to the champion when no assignment exists", () => {
    expect(championLearningStrategy().strategyId).toBe(CHAMPION_STRATEGY_ID);
    expect(normalizeLearningStrategyAssignment({ strategy_id:"unknown" }).strategyId).toBe(CHAMPION_STRATEGY_ID);
  });

  test("champion leaves candidate ranking unchanged", () => {
    const result = strategyAdjustmentForCandidate(
      { actionType:"flashcards", exactTarget:true },
      { retentionRisk:0.8, daysSincePractice:30, modelConfidencePercent:20 },
      { strategy_id:CHAMPION_STRATEGY_ID }
    );
    expect(result.adjustment).toBe(0);
  });

  test("retention candidate applies only a bounded ranking adjustment", () => {
    const result = strategyAdjustmentForCandidate(
      { actionType:"flashcards", exactTarget:true },
      { retentionRisk:0.8, daysSincePractice:30, modelConfidencePercent:70 },
      { strategy_id:CANDIDATE_STRATEGY_ID }
    );
    expect(result.adjustment).toBeGreaterThan(0);
    expect(result.adjustment).toBeLessThanOrEqual(8);
  });

  test("candidate gives extra weight to low-confidence baseline evidence", () => {
    const result = strategyAdjustmentForCandidate(
      { actionType:"baseline", exactTarget:true },
      { retentionRisk:0.1, daysSincePractice:1, modelConfidencePercent:20 },
      { strategy_id:CANDIDATE_STRATEGY_ID }
    );
    expect(result.adjustment).toBeGreaterThan(1);
  });

  test("strategy metadata is explicit and audit-friendly", () => {
    const metadata = strategyMetadata({
      assignment_id:"assignment-1",
      strategy_id:CANDIDATE_STRATEGY_ID,
      cohort_bucket:7,
    });
    expect(metadata.strategy_id).toBe(CANDIDATE_STRATEGY_ID);
    expect(metadata.assignment_id).toBe("assignment-1");
    expect(metadata.experiment_id).toBe("next-best-action-v3");
  });

  test("small outcome samples do not steer ranking", () => {
    expect(boundedOutcomeWeight({
      completedCount:8,
      averageOutcomeDelta:40,
      completionRate:90,
    }).adjustment).toBe(0);
  });

  test("larger outcome samples are shrunk and bounded", () => {
    const result = boundedOutcomeWeight({
      completedCount:80,
      averageOutcomeDelta:20,
      completionRate:80,
    });
    expect(result.adjustment).toBeGreaterThan(0);
    expect(result.adjustment).toBeLessThanOrEqual(4);
  });

  test("confidence bands are conservative", () => {
    expect(confidenceBandForStrategySample(11)).toBe("insufficient");
    expect(confidenceBandForStrategySample(20)).toBe("early");
    expect(confidenceBandForStrategySample(50)).toBe("moderate");
    expect(confidenceBandForStrategySample(100)).toBe("strong");
  });
});