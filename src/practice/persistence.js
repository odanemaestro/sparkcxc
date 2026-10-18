import { preparePaper2ScorePublication } from "../grading/scorePublication";

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
  const rawScore=typeof result.score==="number"?result.score:null;
  const maxScore = 100;
  const release=preparePaper2ScorePublication({
    subjectId:"mathematics",paperId:"02",score:rawScore,maxScore,
    percent:result.percent,
    provenance:result.attemptProvenance,
    metadata:{
      paper:"02",paper_id:result.id||"mathematics-paper2",
      attempt_provenance:result.attemptProvenance||null,
      spark_scoring_status:result.gradingFinal===true?"verified":"rubric_review_required",
      assessed_marks:result.gradingFinal===true?rawScore:null,
      unresolved_marks:result.unassessedMarks??0,
      score_parts:result.scoreParts||[],
    },
  });
  const score=release.score;

  return {
    attempt_key: result.id || legacyAttemptKey("paper2", result),
    paper_type: "paper2",
    score,
    max_score: maxScore,
    percent: release.percent,
    completed_at: result.completedAt,
    duration_seconds: safeNumber(result.usedSeconds, 0),
    timed_out: Boolean(result.timedOut),
    answered_count: result.completedCount == null ? null : safeNumber(result.completedCount, 0),
    total_questions: 10,
    correct_count: safeNumber(result.correctParts, 0),
    metadata: {
      ...release.metadata,
      answered_parts: safeNumber(result.answeredParts, 0),
      correct_parts: safeNumber(result.correctParts, 0),
      total_parts: safeNumber(result.totalParts, 0),
      question_ids: Array.isArray(result.questionIds) ? result.questionIds : [],
    },
  };
}

export function preparePaper2PersistedAttempt(attempt){
  if(attempt?.paper_type!=="paper2")return attempt;
  const released=preparePaper2ScorePublication({
    subjectId:attempt.metadata?.attempt_provenance?.subject_id||"mathematics",
    paperId:attempt.metadata?.attempt_provenance?.paper||"02",
    score:attempt.score??attempt.metadata?.confirmed_marks??null,
    maxScore:attempt.max_score,
    percent:attempt.percent,
    metadata:attempt.metadata||{},
  });
  return {...attempt,score:released.score,percent:released.percent,
    metadata:released.metadata};
}

export async function savePracticeExamAttempt({ supabase, userId, attempt }) {
  if (!supabase || !userId || !attempt) return { skipped: true };
  // A historical/local Paper 2 attempt can enter this helper directly.
  // Re-audit the payload before writing it to the public results table.
  const next=attempt.paper_type==="paper2"?preparePaper2PersistedAttempt(attempt):attempt;
  return supabase
    .from("practice_exam_attempts")
    .upsert(
      { ...next, user_id: userId },
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

  const rows = attempts.map(attempt => ({ ...preparePaper2PersistedAttempt(attempt), user_id: userId }));
  const { error } = await supabase
    .from("practice_exam_attempts")
    .upsert(rows, { onConflict: "user_id,attempt_key", ignoreDuplicates: true });

  if (error) throw error;
  return { synced: rows.length };
}
