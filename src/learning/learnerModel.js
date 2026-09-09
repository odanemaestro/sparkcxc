const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, Number(value) || 0));

function probability(value, fallback = 0.5) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return clamp(numeric > 1 ? numeric / 100 : numeric);
}

function confidenceLabel(value) {
  const score = probability(value, 0);
  if (score >= 0.72) return "High";
  if (score >= 0.42) return "Medium";
  return "Low";
}

function trendLabel(value) {
  const score = Number(value) || 0;
  if (score >= 0.025) return "Improving";
  if (score <= -0.025) return "Needs attention";
  return "Steady";
}

function titleFromCode(code) {
  const raw = String(code || "").split("::").pop() || "";
  return raw
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

function topMisconception(counts, labels = {}) {
  const entries = Object.entries(counts || {})
    .map(([code, count]) => ({ code, count: Number(count) || 0 }))
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));
  if (!entries.length) return null;
  const first = entries[0];
  return {
    ...first,
    label: labels?.[first.code] || titleFromCode(first.code),
  };
}

export function normalizeLearnerState(row = {}) {
  const masteryProbability = probability(row.mastery_probability ?? row.mastery_score, 0.5);
  const confidenceProbability = probability(row.confidence, 0);
  const trendScore = Number(row.trend_score) || 0;
  const commonError = topMisconception(row.misconception_counts, row.misconception_labels);
  const mastery = Math.round(masteryProbability * 100);
  const confidence = Math.round(confidenceProbability * 100);
  const evidenceCount = Math.max(0, Number(row.evidence_count) || 0);
  const recencyPenalty = row.last_practised_at
    ? Math.min(18, Math.max(0, (Date.now() - new Date(row.last_practised_at).getTime()) / 86400000) * 0.35)
    : 8;
  const priorityScore = Math.round(
    (100 - mastery) * 0.68 +
    (100 - confidence) * 0.12 +
    Math.max(0, -trendScore * 100) * 0.12 +
    recencyPenalty * 0.08
  );

  return {
    skill: String(row.skill || "Unclassified skill"),
    mastery,
    masteryProbability,
    confidence,
    confidenceProbability,
    confidenceLabel: confidenceLabel(confidenceProbability),
    evidenceCount,
    trendScore,
    trendLabel: trendLabel(trendScore),
    lastPractisedAt: row.last_practised_at || null,
    lastSource: row.last_source || null,
    commonError,
    recommendation: row.recommended_action || recommendationForMastery(masteryProbability, confidenceProbability),
    priorityScore,
  };
}

export function recommendationForMastery(mastery, confidence = 0) {
  const score = probability(mastery, 0.5);
  const certainty = probability(confidence, 0);
  if (certainty < 0.2) return "Build a stronger baseline with a lesson and a short practice set.";
  if (score < 0.45) return "Review the lesson, then do targeted Adaptive Practice and related flashcards.";
  if (score < 0.60) return "Use targeted Adaptive Practice and flashcards before moving to harder questions.";
  if (score < 0.75) return "Mix targeted practice with harder questions to make the skill more reliable.";
  if (score < 0.85) return "Use spaced review and exam-style questions to strengthen consistency.";
  return "Maintain this skill with spaced review while SPARK shifts attention to weaker areas.";
}

export function buildLearnerModelProfile(rows = []) {
  const skills = (rows || []).map(normalizeLearnerState);
  const prioritySkills = [...skills]
    .filter(item => (item.evidenceCount > 0 || item.confidence > 0) && (item.mastery < 80 || item.confidence < 45 || item.trendLabel === "Needs attention"))
    .sort((a, b) => b.priorityScore - a.priorityScore || a.mastery - b.mastery)
    .slice(0, 5);
  const strongSkills = [...skills]
    .filter(item => item.mastery >= 80 && item.confidence >= 40)
    .sort((a, b) => b.mastery - a.mastery || b.confidence - a.confidence)
    .slice(0, 3);
  const focus = prioritySkills[0] || null;
  return {
    skills,
    focus,
    prioritySkills,
    strongSkills,
    weakSkillSignals: prioritySkills.map(item => ({ skill: item.skill, score: item.mastery })),
    hasEvidence: skills.some(item => item.evidenceCount > 0 || item.confidence > 0),
  };
}

export function flashcardEvidenceForRating(rating) {
  switch (rating) {
    case "again": return { correct: false, weight: 0.40, helpUsed: false };
    case "hard": return { correct: false, weight: 0.24, helpUsed: false };
    case "got_it": return { correct: true, weight: 0.32, helpUsed: false };
    case "easy": return { correct: true, weight: 0.40, helpUsed: false };
    default: return { correct: true, weight: 0.20, helpUsed: false };
  }
}

export function learnerModelWeakSkills(profile, fallback = []) {
  return profile?.hasEvidence && profile?.weakSkillSignals?.length
    ? profile.weakSkillSignals
    : fallback;
}
