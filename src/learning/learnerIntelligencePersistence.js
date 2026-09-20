// ============================================================================
// SPARK Learner Intelligence persistence
//
// Recommendation logging is intentionally separate from grading. A failure
// here must never block a lesson, lab, test or mark from being saved.
// ============================================================================

import {
  championLearningStrategy,
  normalizeLearningStrategyAssignment,
  strategyMetadata,
} from "./learningStrategyV3";

function intelligenceStrategy(intelligence = {}) {
  return normalizeLearningStrategyAssignment(
    intelligence.learningStrategy ||
    intelligence.nextBestActionPlan?.strategy ||
    championLearningStrategy()
  );
}

function safeHistoryRow(intelligence, id = null) {
  const recommendation = intelligence?.recommendation;
  if (!recommendation) return null;
  const now = new Date().toISOString();
  const strategy = intelligenceStrategy(intelligence);
  return {
    id:id || `local-${Date.now()}`,
    subject_id:recommendation.subjectId || intelligence.subjectId,
    skill_key:recommendation.skill || null,
    action_type:recommendation.actionType || "review",
    target_activity_type:recommendation.targetActivityType || null,
    title:recommendation.title || "SPARK recommendation",
    reason:recommendation.detail || null,
    baseline_mastery:recommendation.baselineMastery ?? null,
    baseline_readiness:recommendation.readinessPercent ?? intelligence.metrics?.readinessPercent ?? null,
    model_version:intelligence.version || "spark-learning-loop-v3.0",
    status:"started",
    metadata:{
      recommendation_key:recommendation.recommendationKey || null,
      target_key:recommendation.targetKey || null,
      target:recommendation.target || null,
      rank_score:recommendation.score ?? null,
      expected_minutes:recommendation.expectedMinutes ?? null,
      why:recommendation.why || [],
      prerequisite_risks:recommendation.prerequisiteRisks || [],
      phase:intelligence.nextBestActionPlan ? "learning_loop_v3" : "learner_intelligence_v2",
      generated_at:intelligence.generatedAt || now,
      ...strategyMetadata(strategy),
    },
    started_at:now,
    created_at:now,
    updated_at:now,
  };
}

export async function recordLearnerRecommendation({ supabase, intelligence } = {}) {
  const recommendation = intelligence?.recommendation;
  if (!supabase?.rpc || !recommendation || !intelligence?.subjectId) {
    return { data:null, error:null, skipped:true, historyRow:null };
  }

  const strategy = intelligenceStrategy(intelligence);
  const metadata = {
    why:recommendation.why || [],
    prerequisite_risks:recommendation.prerequisiteRisks || [],
    recommendation_key:recommendation.recommendationKey || null,
    target_key:recommendation.targetKey || null,
    target:recommendation.target || null,
    rank_score:recommendation.score ?? null,
    expected_minutes:recommendation.expectedMinutes ?? null,
    exact_target:Boolean(recommendation.exactTarget),
    phase:intelligence.nextBestActionPlan ? "learning_loop_v3" : "learner_intelligence_v2",
    generated_at:intelligence.generatedAt || new Date().toISOString(),
    ...strategyMetadata(strategy),
  };

  try {
    const { data, error } = await supabase.rpc("spark_record_learning_recommendation", {
      p_subject_id:recommendation.subjectId || intelligence.subjectId,
      p_skill_key:recommendation.skill || null,
      p_action_type:recommendation.actionType || "review",
      p_target_activity_type:recommendation.targetActivityType || null,
      p_title:recommendation.title || "SPARK recommendation",
      p_reason:recommendation.detail || null,
      p_baseline_mastery:recommendation.baselineMastery ?? null,
      p_baseline_readiness:recommendation.readinessPercent ?? intelligence.metrics?.readinessPercent ?? null,
      p_model_version:intelligence.version || "spark-learning-loop-v3.0",
      p_metadata:metadata,
    });

    return {
      data,
      error,
      historyRow:error ? null : safeHistoryRow(intelligence, data || null),
    };
  } catch (error) {
    return { data:null, error, historyRow:null };
  }
}

export async function loadLearnerRecommendationHistory({
  supabase,
  subjectId = null,
  limit = 100,
} = {}) {
  if (!supabase) return { data:[], error:null, skipped:true };

  if (supabase.rpc) {
    try {
      const result = await supabase.rpc("spark_get_learning_recommendation_history", {
        p_subject_id:subjectId || null,
        p_limit:Math.max(1, Math.min(Number(limit) || 100, 200)),
      });
      if (!result?.error && Array.isArray(result?.data)) return result;
      if (result?.error && !["PGRST202","42883"].includes(result.error.code)) return result;
    } catch {}
  }

  if (!supabase.from) return { data:[], error:null, skipped:true };
  try {
    let query = supabase
      .from("spark_learning_recommendations")
      .select("id,user_id,subject_id,skill_key,action_type,target_activity_type,title,reason,baseline_mastery,baseline_readiness,model_version,status,outcome_activity_type,outcome_activity_key,outcome_percent,outcome_metadata,metadata,started_at,completed_at,created_at,updated_at")
      .order("created_at", { ascending:false })
      .limit(Math.max(1, Math.min(Number(limit) || 100, 200)));
    if (subjectId) query = query.eq("subject_id", String(subjectId).toLowerCase());
    const { data, error } = await query;
    return { data:data || [], error };
  } catch (error) {
    return { data:[], error };
  }
}

export async function loadRecommendationEffectiveness({ supabase } = {}) {
  if (!supabase?.rpc) return { data:[], error:null, skipped:true };
  try {
    const { data, error } = await supabase.rpc("spark_recommendation_effectiveness_signal_v2");
    if (error && ["PGRST202","42883"].includes(error.code)) return { data:[], error:null, unavailable:true };
    return { data:data || [], error };
  } catch (error) {
    return { data:[], error };
  }
}

export async function loadLearningStrategyAssignments({
  supabase,
  subjectIds = [],
} = {}) {
  const ids = [...new Set((subjectIds || []).map(value => String(value || "").trim().toLowerCase()).filter(Boolean))];
  if (!ids.length) return { data:{}, error:null, skipped:true };

  const fallback = Object.fromEntries(ids.map(id => [id, championLearningStrategy()]));
  if (!supabase?.rpc) return { data:fallback, error:null, skipped:true };

  try {
    const results = await Promise.all(ids.map(async subjectId => {
      try {
        const { data, error } = await supabase.rpc("spark_get_learning_strategy_assignment", {
          p_subject_id:subjectId,
        });
        if (error) {
          if (["PGRST202","42883","42P01"].includes(error.code)) {
            return [subjectId, championLearningStrategy(), null];
          }
          return [subjectId, championLearningStrategy(), error];
        }
        const row = Array.isArray(data) ? data[0] : data;
        return [subjectId, normalizeLearningStrategyAssignment(row || {}), null];
      } catch (error) {
        return [subjectId, championLearningStrategy(), error];
      }
    }));

    const data = {};
    let firstError = null;
    results.forEach(([subjectId, assignment, error]) => {
      data[subjectId] = assignment;
      if (!firstError && error) firstError = error;
    });
    return { data, error:firstError };
  } catch (error) {
    return { data:fallback, error };
  }
}

export async function loadLearningStrategyPerformance({ supabase } = {}) {
  if (!supabase?.rpc) return { data:[], error:null, skipped:true };
  try {
    const { data, error } = await supabase.rpc("spark_learning_strategy_performance_signal_v3");
    if (error && ["PGRST202","42883","42P01"].includes(error.code)) {
      return { data:[], error:null, unavailable:true };
    }
    return { data:data || [], error };
  } catch (error) {
    return { data:[], error };
  }
}

export async function dismissLearnerRecommendation({ supabase, recommendationId } = {}) {
  if (!supabase?.rpc || !recommendationId || String(recommendationId).startsWith("local-")) {
    return { data:false, error:null, skipped:true };
  }
  try {
    const { data, error } = await supabase.rpc("spark_dismiss_learning_recommendation", {
      p_recommendation_id:recommendationId,
    });
    return { data:Boolean(data), error };
  } catch (error) {
    return { data:false, error };
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
    return { data:null, error:null, skipped:true };
  }

  try {
    const { data, error } = await supabase.rpc("spark_observe_recommendation_outcome", {
      p_subject_id:String(subjectId).toLowerCase(),
      p_activity_type:String(activityType).toLowerCase(),
      p_activity_key:String(activityKey),
      p_percent:Number.isFinite(Number(percent)) ? Number(percent) : null,
      p_metadata:metadata || {},
    });
    return { data, error };
  } catch (error) {
    return { data:null, error };
  }
}