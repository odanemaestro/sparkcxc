function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function legacyAttemptKey(paperType, result) {
  const completedAt = result?.completedAt || result?.completed_at || "unknown";
  const score = safeNumber(result?.score, 0);
  const marker = paperType === "paper1" ? (result?.templatePaper || "paper1") : "paper2";
  return `${paperType}:${completedAt}:${marker}:${score}`;
}

export function paper1ResultToAttempt(result) {
  if (!result?.completedAt) return null;
  const score = safeNumber(result.score, 0);
  const maxScore = 60;
  const answeredCount = result.answeredCount != null
    ? safeNumber(result.answeredCount, 0)
    : result.unanswered != null
      ? maxScore - safeNumber(result.unanswered, 0)
      : null;

  return {
    attempt_key: result.id || legacyAttemptKey("paper1", result),
    paper_type: "paper1",
    score,
    max_score: maxScore,
    percent: result.percent != null ? safeNumber(result.percent, 0) : Math.round((score / maxScore) * 100),
    completed_at: result.completedAt,
    duration_seconds: safeNumber(result.usedSeconds, 0),
    timed_out: Boolean(result.timedOut),
    answered_count: answeredCount == null ? null : Math.max(0, Math.min(maxScore, answeredCount)),
    total_questions: 60,
    correct_count: result.correct != null ? safeNumber(result.correct, score) : score,
    metadata: {
      template_paper: result.templatePaper || null,
      question_ids: Array.isArray(result.questionIds) ? result.questionIds : [],
    },
  };
}

export function paper2ResultToAttempt(result) {
  if (!result?.completedAt) return null;
  const score = safeNumber(result.score, 0);
  const maxScore = 100;

  return {
    attempt_key: result.id || legacyAttemptKey("paper2", result),
    paper_type: "paper2",
    score,
    max_score: maxScore,
    percent: result.percent != null ? safeNumber(result.percent, 0) : Math.round((score / maxScore) * 100),
    completed_at: result.completedAt,
    duration_seconds: safeNumber(result.usedSeconds, 0),
    timed_out: Boolean(result.timedOut),
    answered_count: result.completedCount == null ? null : safeNumber(result.completedCount, 0),
    total_questions: 10,
    correct_count: safeNumber(result.correctParts, 0),
    metadata: {
      answered_parts: safeNumber(result.answeredParts, 0),
      correct_parts: safeNumber(result.correctParts, 0),
      total_parts: safeNumber(result.totalParts, 0),
      question_ids: Array.isArray(result.questionIds) ? result.questionIds : [],
    },
  };
}

export async function savePracticeExamAttempt({ supabase, userId, attempt }) {
  if (!supabase || !userId || !attempt) return { skipped: true };
  return supabase
    .from("practice_exam_attempts")
    .upsert(
      { ...attempt, user_id: userId },
      { onConflict: "user_id,attempt_key", ignoreDuplicates: true }
    );
}

export async function syncLocalPracticeResults({ supabase, userId, paper1Results = [], paper2Results = [] }) {
  if (!supabase || !userId) return { skipped: true };
  const attempts = [
    ...paper1Results.map(paper1ResultToAttempt),
    ...paper2Results.map(paper2ResultToAttempt),
  ].filter(Boolean);

  if (!attempts.length) return { synced: 0 };

  const rows = attempts.map(attempt => ({ ...attempt, user_id: userId }));
  const { error } = await supabase
    .from("practice_exam_attempts")
    .upsert(rows, { onConflict: "user_id,attempt_key", ignoreDuplicates: true });

  if (error) throw error;
  return { synced: rows.length };
}
