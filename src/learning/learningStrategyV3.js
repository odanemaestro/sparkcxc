// ============================================================================
// SPARK Learning Strategy V3
//
// Phase 3 safely compares recommendation strategies. Candidate strategies may
// change ranking by small bounded amounts, but they never change grading,
// canonical answers, marks or learner evidence.
//
// Promotion is never automatic. Strategy performance is reviewed by an admin.
// ============================================================================

export const LEARNING_LOOP_VERSION = "spark-learning-loop-v3.0";
export const LEARNING_EXPERIMENT_ID = "next-best-action-v3";

export const CHAMPION_STRATEGY_ID = "balanced-v2";
export const CANDIDATE_STRATEGY_ID = "retention-aware-v3";

const lower = value => String(value ?? "").trim().toLowerCase();
const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value) || 0));

export const BUILTIN_LEARNING_STRATEGIES = Object.freeze({
  [CHAMPION_STRATEGY_ID]: Object.freeze({
    strategyId:CHAMPION_STRATEGY_ID,
    label:"Balanced V2",
    status:"champion",
    experimentId:LEARNING_EXPERIMENT_ID,
    config:Object.freeze({
      actionBoosts:{},
      lowConfidenceBaselineBoost:0,
      retentionRiskBoost:0,
      stalePracticeBoost:0,
      exactTargetBoost:0,
      maximumAdjustment:0,
    }),
  }),
  [CANDIDATE_STRATEGY_ID]: Object.freeze({
    strategyId:CANDIDATE_STRATEGY_ID,
    label:"Retention-aware V3",
    status:"candidate",
    experimentId:LEARNING_EXPERIMENT_ID,
    config:Object.freeze({
      actionBoosts:{
        flashcards:3,
        baseline:1.5,
        targeted_practice:1,
      },
      lowConfidenceBaselineBoost:3,
      retentionRiskBoost:7,
      stalePracticeBoost:3,
      exactTargetBoost:1,
      maximumAdjustment:8,
    }),
  }),
});

export function normalizeLearningStrategyAssignment(value = {}) {
  const strategyId = String(
    value.strategy_id ||
    value.strategyId ||
    value?.strategy?.strategyId ||
    CHAMPION_STRATEGY_ID
  ).trim() || CHAMPION_STRATEGY_ID;

  const builtin = BUILTIN_LEARNING_STRATEGIES[strategyId] || BUILTIN_LEARNING_STRATEGIES[CHAMPION_STRATEGY_ID];
  const remoteConfig = value.config && typeof value.config === "object" ? value.config : {};
  const config = {
    ...builtin.config,
    ...remoteConfig,
    actionBoosts:{
      ...(builtin.config?.actionBoosts || {}),
      ...(remoteConfig.actionBoosts || {}),
    },
  };

  return {
    assignmentId:value.assignment_id || value.assignmentId || null,
    strategyId:builtin.strategyId === strategyId ? strategyId : CHAMPION_STRATEGY_ID,
    label:value.label || builtin.label,
    status:value.status || builtin.status,
    experimentId:value.experiment_id || value.experimentId || builtin.experimentId,
    cohortBucket:Number.isFinite(Number(value.cohort_bucket ?? value.cohortBucket))
      ? Number(value.cohort_bucket ?? value.cohortBucket)
      : null,
    config,
  };
}

export function championLearningStrategy() {
  return normalizeLearningStrategyAssignment(BUILTIN_LEARNING_STRATEGIES[CHAMPION_STRATEGY_ID]);
}

export function strategyAdjustmentForCandidate(candidate = {}, state = {}, assignment = {}) {
  const strategy = normalizeLearningStrategyAssignment(assignment);
  if (strategy.strategyId === CHAMPION_STRATEGY_ID) {
    return {
      strategy,
      adjustment:0,
      reasons:[],
    };
  }

  const config = strategy.config || {};
  const maxAdjustment = clamp(config.maximumAdjustment ?? 8, 0, 10);
  const actionType = lower(candidate.actionType);
  let adjustment = Number(config.actionBoosts?.[actionType] || 0);
  const reasons = [];

  if (actionType === "baseline" && Number(state.modelConfidencePercent || 0) < 35) {
    const boost = Number(config.lowConfidenceBaselineBoost || 0);
    adjustment += boost;
    if (boost) reasons.push("candidate strategy gives extra weight to low-confidence baseline evidence");
  }

  const retentionRisk = clamp(state.retentionRisk || 0, 0, 1);
  if (actionType === "flashcards" && retentionRisk >= 0.35) {
    const boost = Number(config.retentionRiskBoost || 0) * retentionRisk;
    adjustment += boost;
    if (boost) reasons.push("candidate strategy gives extra weight to retention risk");
  }

  if (
    actionType === "flashcards" &&
    Number(state.daysSincePractice || 0) >= 7
  ) {
    const boost = Number(config.stalePracticeBoost || 0);
    adjustment += boost;
    if (boost) reasons.push("candidate strategy gives extra weight to older evidence");
  }

  if (candidate.exactTarget) {
    const boost = Number(config.exactTargetBoost || 0);
    adjustment += boost;
    if (boost) reasons.push("candidate strategy slightly prefers exact activities");
  }

  adjustment = clamp(adjustment, -maxAdjustment, maxAdjustment);

  return {
    strategy,
    adjustment:Math.round(adjustment * 10) / 10,
    reasons,
  };
}

export function strategyMetadata(assignment = {}) {
  const strategy = normalizeLearningStrategyAssignment(assignment);
  return {
    strategy_id:strategy.strategyId,
    strategy_label:strategy.label,
    strategy_status:strategy.status,
    experiment_id:strategy.experimentId,
    assignment_id:strategy.assignmentId,
    cohort_bucket:strategy.cohortBucket,
    learning_loop_version:LEARNING_LOOP_VERSION,
  };
}

export function confidenceBandForStrategySample(completedCount = 0) {
  const count = Number(completedCount || 0);
  if (count < 12) return "insufficient";
  if (count < 30) return "early";
  if (count < 75) return "moderate";
  return "strong";
}

export function boundedOutcomeWeight({
  completedCount = 0,
  averageOutcomeDelta = null,
  completionRate = null,
} = {}) {
  const count = Number(completedCount || 0);
  const delta = Number(averageOutcomeDelta);
  const completion = Number(completionRate);

  if (count < 12 || !Number.isFinite(delta)) {
    return { adjustment:0, confidence:confidenceBandForStrategySample(count) };
  }

  const shrinkage = count / (count + 24);
  const shrunkDelta = delta * shrinkage;
  let adjustment = clamp(shrunkDelta * 0.18, -3, 3);

  if (Number.isFinite(completion)) {
    if (completion < 35) adjustment -= 1.5;
    if (completion >= 70) adjustment += 0.75;
  }

  return {
    adjustment:Math.round(clamp(adjustment, -4, 4) * 10) / 10,
    confidence:confidenceBandForStrategySample(count),
    shrunkDelta:Math.round(shrunkDelta * 10) / 10,
  };
}

export function strategyPerformanceSummary(row = {}) {
  const count = Number(row.completed_count || 0);
  const weight = boundedOutcomeWeight({
    completedCount:count,
    averageOutcomeDelta:row.average_outcome_delta,
    completionRate:row.completion_rate,
  });

  return {
    strategyId:row.strategy_id || "unknown",
    completedCount:count,
    completionRate:Number(row.completion_rate || 0),
    averageOutcomeDelta:row.average_outcome_delta == null ? null : Number(row.average_outcome_delta),
    adjustedOutcomeDelta:row.adjusted_outcome_delta == null ? weight.shrunkDelta ?? null : Number(row.adjusted_outcome_delta),
    confidence:row.confidence_band || weight.confidence,
    safetyFlag:row.safety_flag || null,
    eligibleForReview:Boolean(row.eligible_for_review),
  };
}