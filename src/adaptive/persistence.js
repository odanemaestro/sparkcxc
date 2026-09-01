// ============================================================================
// Adaptive practice - Supabase persistence layer
// Done by: Odane Robinson
//
// Thin wrappers around Supabase table writes/reads for question attempts
// and per-skill mastery. Every function guards on missing supabase/userId
// so callers can use these safely before auth has resolved, without extra
// null-checks at every call site.
// ============================================================================

// Logs a single question attempt to csec_question_attempts. Denormalizes
// topic/skill/difficulty onto the attempt row (rather than joining back to
// the question bank later) so historical analytics stay accurate even if
// a question's metadata changes after the fact.
export async function recordAttempt(supabase, {
  userId, question, correct, marksEarned = 0, timeSeconds = null,
  selectedAnswer = null, hintUsed = false
}) {
  if (!supabase || !userId || !question) return { data: null, error: null };

  return supabase.from("csec_question_attempts").insert({
    user_id: userId,
    question_id: question.id,
    skill: question.subtopic,
    topic: question.topic,
    curriculum_area: question.curriculum_area,
    difficulty: question.difficulty,
    correct,
    marks: question.marks ?? 1,
    marks_earned: marksEarned,
    time_seconds: timeSeconds,
    selected_answer: selectedAnswer,
    hint_used: hintUsed,
    attempted_at: new Date().toISOString()
  });
}

// Reads a learner's per-skill mastery rows, weakest skill first - this
// ordering matches recommendSkills() in adaptiveEngine.js so the two stay
// consistent if a caller uses the DB rows directly instead of recomputing.
export async function fetchSkillProgress(supabase, userId) {
  if (!supabase || !userId) return { data: [], error: null };
  return supabase.from("csec_skill_progress")
    .select("*").eq("user_id", userId)
    .order("mastery_score", { ascending: true });
}

// Reads a learner's attempt history, most recent first, for use in review
// screens and for recomputing skillMastery() client-side.
export async function fetchAttempts(supabase, userId) {
  if (!supabase || !userId) return { data: [], error: null };
  return supabase.from("csec_question_attempts")
    .select("question_id,skill,topic,curriculum_area,difficulty,correct,marks,marks_earned,attempted_at")
    .eq("user_id", userId)
    .order("attempted_at", { ascending: false });
}

// Writes (or updates) a learner's mastery summary for one skill. Uses
// upsert on the (user_id, skill) composite key so repeated calls after
// each new attempt update the same row instead of creating duplicates.
export async function upsertSkillProgress(supabase, {
  userId, skill, attempts, correctAttempts, masteryScore, masteryLevel
}) {
  if (!supabase || !userId || !skill) return { data: null, error: null };
  return supabase.from("csec_skill_progress").upsert({
    user_id: userId,
    skill,
    attempts,
    correct_attempts: correctAttempts,
    mastery_score: masteryScore,
    mastery_level: masteryLevel,
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id,skill" });
}
