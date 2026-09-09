import { collectStudyActivityDays, computeStudyStreak, studyDayKey } from "../studyStreak";

describe("SPARK V5.6.1.2 Day Study Streak", () => {
  test("counts study across different learning surfaces once per day", () => {
    const activity = {
      lessons: [{ completed_at: new Date(2026, 8, 7, 9, 0) }],
      questionAttempts: [
        { attempted_at: new Date(2026, 8, 8, 10, 0) },
        { attempted_at: new Date(2026, 8, 8, 11, 0) },
      ],
      flashcardReviewEvents: [{ reviewed_at: new Date(2026, 8, 9, 8, 0) }],
    };
    expect(computeStudyStreak(activity, new Date(2026, 8, 9, 15, 0))).toBe(3);
  });

  test("keeps yesterday's streak alive before the student studies today", () => {
    const activity = {
      milestones: [
        { created_at: new Date(2026, 8, 7, 14, 0) },
        { created_at: new Date(2026, 8, 8, 14, 0) },
      ],
    };
    expect(computeStudyStreak(activity, new Date(2026, 8, 9, 9, 0))).toBe(2);
  });

  test("returns zero when the last study day is older than yesterday", () => {
    const activity = {
      examAttempts: [{ completed_at: new Date(2026, 8, 7, 12, 0) }],
    };
    expect(computeStudyStreak(activity, new Date(2026, 8, 9, 12, 0))).toBe(0);
  });

  test("flashcard progress is a fallback when review-event history is unavailable", () => {
    const days = collectStudyActivityDays({
      flashcardProgress: [{ last_reviewed_at: new Date(2026, 8, 9, 7, 30) }],
    });
    expect(days.has(studyDayKey(new Date(2026, 8, 9, 12, 0)))).toBe(true);
  });

  test("date-only values stay on their stated calendar day", () => {
    expect(studyDayKey("2026-09-09")).toBe("2026-09-09");
  });
});
