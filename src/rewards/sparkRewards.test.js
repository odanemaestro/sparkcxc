import { rewardLevelForPoints, weeklyAchievementBadges, weeklyScoreBreakdown } from "./sparkRewards";

test("maps lifetime points to stable SPARK levels", () => {
  expect(rewardLevelForPoints(0).name).toBe("Starter");
  expect(rewardLevelForPoints(600).name).toBe("Rising SPARK");
  expect(rewardLevelForPoints(2199).name).toBe("Scholar");
  expect(rewardLevelForPoints(4000).name).toBe("SPARK Master");
});

test("weekly badges reward varied learning behaviour", () => {
  const badges = weeklyAchievementBadges({
    study_days: 4,
    skills_improved: 2,
    question_attempts: 20,
    correct_questions: 18,
    exams_completed: 1,
  }).map(item => item.key);
  expect(badges).toContain("consistency");
  expect(badges).toContain("improvement");
  expect(badges).toContain("practice");
  expect(badges).toContain("exam");
});

test("weekly score breakdown preserves the 100 point cap", () => {
  const rows = weeklyScoreBreakdown({
    consistency_points: 25,
    improvement_points: 25,
    practice_points: 20,
    lesson_points: 15,
    exam_points: 10,
    flashcard_points: 5,
  });
  expect(rows.reduce((sum, row) => sum + row[2], 0)).toBe(100);
  expect(rows.reduce((sum, row) => sum + row[1], 0)).toBe(100);
});
