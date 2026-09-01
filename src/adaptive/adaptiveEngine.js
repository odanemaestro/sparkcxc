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
export function selectAdaptiveQuestion(questions, {
  skill, preferredDifficulty, attemptedIds = new Set()
} = {}) {
  let pool = questions.filter(q =>
    (!skill || q.subtopic === skill) &&
    (!preferredDifficulty || q.difficulty === preferredDifficulty)
  );

  const fresh = pool.filter(q => !attemptedIds.has(q.id));
  if (fresh.length) pool = fresh;
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}

// Builds one practice session: first targets the weakest skills (from
// recommendSkills) at a difficulty matched to current mastery level, then
// tops up with any remaining questions until `count` is reached or the
// bank is exhausted. Guards against duplicate questions in the same session.
export function buildAdaptiveSession(questions, skillStats, { count = 10 } = {}) {
  const recommendations = recommendSkills(skillStats, Math.min(3, Object.keys(skillStats).length));
  const candidates = [];

  for (const item of recommendations) {
    const difficulty =
      item.level === "Mastered" ? "Hard" :
      item.level === "Strong" ? "Medium" : "Easy";

    const q = selectAdaptiveQuestion(questions, {
      skill: item.skill,
      preferredDifficulty: difficulty
    });
    if (q) candidates.push(q);
  }

  while (candidates.length < count && questions.length) {
    const q = selectAdaptiveQuestion(questions, {});
    if (!q || candidates.some(x => x.id === q.id)) break;
    candidates.push(q);
  }

  return candidates.slice(0, count);
}
