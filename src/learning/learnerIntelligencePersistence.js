// ============================================================================
// SPARK Learner Intelligence V2 persistence
//
// Recommendation logging is intentionally separate from grading. A failure
// here must never block a lesson, lab, test or mark from being saved.
// ============================================================================

export async function recordLearnerRecommendation({ supabase, intelligence } = {}) {
  const recommendation = intelligence?.recommendation;
  if (!supabase?.rpc || !recommendation || !intelligence?.subjectId) {
    return { data: null, error: null, skipped: true };
  }

  try {
    const { data, error } = await supabase.rpc("spark_record_learning_recommendation", {
      p_subject_id: intelligence.subjectId,
      p_skill_key: recommendation.skill || null,
      p_action_type: recommendation.actionType || "review",
      p_target_activity_type: recommendation.targetActivityType || null,
      p_title: recommendation.title || "SPARK recommendation",
      p_reason: recommendation.detail || null,
      p_baseline_mastery: recommendation.baselineMastery ?? null,
      p_baseline_readiness: recommendation.readinessPercent ?? intelligence.metrics?.readinessPercent ?? null,
      p_model_version: intelligence.version || "spark-learner-v2.0",
      p_metadata: {
        why: recommendation.why || [],
        prerequisite_risks: recommendation.prerequisiteRisks || [],
        generated_at: intelligence.generatedAt || new Date().toISOString(),
      },
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

export async function observeRecommendationOutcome({
  supabase,
  subjectId,
  activityType,
  activityKey,
  percent = null,
  metadata = {},
} = {}) {
  if (!supabase?.rpc || !subjectId || !activityType || !activityKey) {
    return { data: null, error: null, skipped: true };
  }

  try {
    const { data, error } = await supabase.rpc("spark_observe_recommendation_outcome", {
      p_subject_id: String(subjectId).toLowerCase(),
      p_activity_type: String(activityType).toLowerCase(),
      p_activity_key: String(activityKey),
      p_percent: Number.isFinite(Number(percent)) ? Number(percent) : null,
      p_metadata: metadata || {},
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}