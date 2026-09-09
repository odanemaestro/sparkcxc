export const SPARK_REWARD_LEVELS = Object.freeze([
  { level: 1, name: "Starter", minPoints: 0 },
  { level: 2, name: "Learner", minPoints: 250 },
  { level: 3, name: "Rising SPARK", minPoints: 600 },
  { level: 4, name: "Scholar", minPoints: 1200 },
  { level: 5, name: "Exam Ready", minPoints: 2200 },
  { level: 6, name: "SPARK Master", minPoints: 4000 },
]);

export function rewardLevelForPoints(points) {
  const safe = Math.max(0, Number(points) || 0);
  let current = SPARK_REWARD_LEVELS[0];
  for (const level of SPARK_REWARD_LEVELS) {
    if (safe >= level.minPoints) current = level;
    else break;
  }
  const next = SPARK_REWARD_LEVELS.find(level => level.level === current.level + 1) || null;
  return {
    ...current,
    points: safe,
    next,
    pointsToNext: next ? Math.max(0, next.minPoints - safe) : 0,
    progressPercent: next
      ? Math.max(0, Math.min(100, Math.round(((safe - current.minPoints) / Math.max(1, next.minPoints - current.minPoints)) * 100)))
      : 100,
  };
}

export function weeklyAchievementBadges(metrics = {}) {
  const badges = [];
  const studyDays = Number(metrics.study_days) || 0;
  const improved = Number(metrics.skills_improved) || 0;
  const attempts = Number(metrics.question_attempts) || 0;
  const correct = Number(metrics.correct_questions) || 0;
  const exams = Number(metrics.exams_completed) || 0;
  const lessons = Number(metrics.lessons_completed) || 0;
  const flashcards = Number(metrics.flashcard_reviews) || 0;
  const accuracy = attempts > 0 ? correct / attempts : 0;

  if (studyDays >= 3) badges.push({ key: "consistency", icon: "🔥", label: "Consistency Builder" });
  if (improved >= 1) badges.push({ key: "improvement", icon: "📈", label: "Skill Climber" });
  if (attempts >= 10 && accuracy >= 0.8) badges.push({ key: "practice", icon: "🎯", label: "Practice Pro" });
  if (exams >= 1) badges.push({ key: "exam", icon: "🏁", label: "Exam Challenger" });
  if (lessons >= 2) badges.push({ key: "lesson", icon: "📚", label: "Lesson Builder" });
  if (flashcards >= 15) badges.push({ key: "flashcards", icon: "🧠", label: "Revision Champion" });
  return badges.slice(0, 4);
}

export function weeklyScoreBreakdown(metrics = {}) {
  return [
    ["Consistency", Number(metrics.consistency_points) || 0, 25],
    ["Improvement", Number(metrics.improvement_points) || 0, 25],
    ["Practice", Number(metrics.practice_points) || 0, 20],
    ["Lessons & quizzes", Number(metrics.lesson_points) || 0, 15],
    ["Exam practice", Number(metrics.exam_points) || 0, 10],
    ["Flashcards", Number(metrics.flashcard_points) || 0, 5],
  ];
}
