// ============================================================================
// Adaptive practice engine
// Done by: Odane Robinson
//
// Pure, side-effect-free helpers that decide what question to serve next
// based on the learner's recent accuracy. No bugs were found in the logic
// here on review - this file only adds documentation/comments for clarity.
// ============================================================================

// The three difficulty tiers the adaptive engine moves a learner through,
// in increasing order of challenge.
const LEVELS = ["Easy", "Medium", "Hard"];

// Maps a difficulty label to its position in LEVELS. Unknown/missing
// labels default to index 0 ("Easy") rather than throwing.
export function difficultyIndex(level) {
  const i = LEVELS.indexOf(level);
  return i < 0 ? 0 : i;
}

// Simple up/down-ratchet: step down a level after 2+ recent wrong answers,
// step up after 2+ recent correct answers, otherwise hold steady. Bounded
// to stay within LEVELS (Math.max/min guard the array edges).
export function chooseNextDifficulty({ current = "Easy", recentCorrect = 0, recentWrong = 0 } = {}) {
  let i = difficultyIndex(current);
  if (recentWrong >= 2) i = Math.max(0, i - 1);
  else if (recentCorrect >= 2) i = Math.min(2, i + 1);
  return LEVELS[i];
}

// Computes a 0-100 mastery score for a skill from its attempt history.
// Uses PARTIAL credit (marksEarned / marks) rather than a simple correct/
// incorrect count, so a question earning 3 of 5 marks counts as 0.6, not
// as a full miss. Falls back to a plain correct/incorrect boolean when
// marksEarned wasn't recorded for an attempt.
export function skillMastery(attempts = []) {
  if (!attempts.length) return { score: 0, level: "Not started", attempts: 0, accuracy: 0 };

  const weighted = attempts.reduce((sum, a) => {
    const marks = Number(a.marks || 1);
    const earned = Number(a.marksEarned ?? (a.correct ? marks : 0));
    return sum + (marks ? earned / marks : (a.correct ? 1 : 0));
  }, 0);

  const accuracy = weighted / attempts.length;
  let level = "Needs practice";
  if (accuracy >= .85) level = "Mastered";
  else if (accuracy >= .70) level = "Strong";
  else if (accuracy >= .50) level = "Developing";

  return { score: Math.round(accuracy * 100), level, attempts: attempts.length, accuracy };
}

// Ranks skills worst-first (lowest score, then fewest attempts as a
// tiebreaker) so the learner is steered toward what needs the most work.
export function recommendSkills(skillStats, count = 3) {
  return Object.entries(skillStats)
    .map(([skill, stats]) => ({ skill, ...stats }))
    .sort((a, b) => (a.score - b.score) || (a.attempts - b.attempts))
    .slice(0, count);
}

// Picks one question matching the requested skill/difficulty, preferring
// questions the learner hasn't attempted yet (falls back to the full pool,
// including repeats, only if every matching question has already been seen).
export function adaptiveQuestionType(question) {
  const type = String(question?.question_type || question?.response_mode || "").toLowerCase();
  if (type === "multiple_choice" || type === "mcq" || Array.isArray(question?.options)) return "multiple_choice";
  return "short_answer";
}

export function selectAdaptiveQuestion(questions, {
  skill, preferredDifficulty, preferredType, attemptedIds = new Set(), attemptedFamilies = new Set()
} = {}) {
  const matches = (q, { ignoreFamily = false, ignoreType = false } = {}) =>
    (!skill || q.subtopic === skill) &&
    (!preferredDifficulty || q.difficulty === preferredDifficulty) &&
    (ignoreType || !preferredType || adaptiveQuestionType(q) === preferredType) &&
    (ignoreFamily || !q.variant_family || !attemptedFamilies.has(q.variant_family));

  let pool = questions.filter(q => matches(q));
  if (!pool.length && attemptedFamilies.size) pool = questions.filter(q => matches(q, { ignoreFamily: true }));
  const fresh = pool.filter(q => !attemptedIds.has(q.id));
  if (fresh.length) pool = fresh;
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}

function shufflePlan(plan) {
  for (let i = plan.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [plan[i], plan[j]] = [plan[j], plan[i]];
  }
  return plan;
}

function sessionDifficultyPlan(count) {
  const easy = Math.round(count * 0.20);
  const medium = Math.round(count * 0.55);
  const hard = Math.max(0, count - easy - medium);
  return shufflePlan([
    ...Array(medium).fill("Medium"),
    ...Array(hard).fill("Hard"),
    ...Array(easy).fill("Easy"),
  ]);
}

export function sessionFormatPlan(count, skillStats = {}) {
  const scores = Object.values(skillStats)
    .map(stats => Number(stats?.score))
    .filter(Number.isFinite);
  const averageMastery = scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 60;
  const mcqShare = averageMastery >= 80 ? 0.30 : averageMastery < 50 ? 0.50 : 0.40;
  const mcqCount = Math.min(count, Math.max(0, Math.round(count * mcqShare)));
  return shufflePlan([
    ...Array(mcqCount).fill("multiple_choice"),
    ...Array(Math.max(0, count - mcqCount)).fill("short_answer"),
  ]);
}

export function buildAdaptiveSession(questions, skillStats, { count = 10 } = {}) {
  const recommendations = recommendSkills(skillStats, Math.min(4, Object.keys(skillStats).length));
  const candidates = [];
  const attemptedIds = new Set();
  const attemptedFamilies = new Set();
  const difficultyPlan = sessionDifficultyPlan(count);
  const formatPlan = sessionFormatPlan(count, skillStats);

  for (let slot = 0; slot < difficultyPlan.length; slot += 1) {
    const preferredDifficulty = difficultyPlan[slot];
    const preferredType = formatPlan[slot];
    let picked = null;

    for (let offset = 0; offset < recommendations.length && !picked; offset += 1) {
      const item = recommendations[(slot + offset) % recommendations.length];
      picked = selectAdaptiveQuestion(questions, {
        skill: item?.skill,
        preferredDifficulty,
        preferredType,
        attemptedIds,
        attemptedFamilies,
      });
    }

    if (!picked) picked = selectAdaptiveQuestion(questions, { preferredDifficulty, preferredType, attemptedIds, attemptedFamilies });
    if (!picked) picked = selectAdaptiveQuestion(questions, { preferredType, attemptedIds, attemptedFamilies });

    // If the selected topic does not yet have enough questions in the desired
    // response format, preserve difficulty/skill targeting instead of failing
    // to fill the session.
    if (!picked) {
      for (let offset = 0; offset < recommendations.length && !picked; offset += 1) {
        const item = recommendations[(slot + offset) % recommendations.length];
        picked = selectAdaptiveQuestion(questions, {
          skill: item?.skill,
          preferredDifficulty,
          attemptedIds,
          attemptedFamilies,
        });
      }
    }
    if (!picked) picked = selectAdaptiveQuestion(questions, { preferredDifficulty, attemptedIds, attemptedFamilies });
    if (!picked) picked = selectAdaptiveQuestion(questions, { attemptedIds, attemptedFamilies });
    if (!picked) break;

    candidates.push(picked);
    attemptedIds.add(picked.id);
    if (picked.variant_family) attemptedFamilies.add(picked.variant_family);
  }

  return candidates.slice(0, count);
}
