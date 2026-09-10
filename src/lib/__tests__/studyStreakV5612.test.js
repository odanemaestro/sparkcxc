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


  test("includes subject-scoped learning activity in the study streak", () => {
    const activity = {
      subjectProgress: [
        { updated_at: new Date(2026, 8, 8, 17, 0) },
        { updated_at: new Date(2026, 8, 9, 11, 0) },
      ],
    };
    expect(computeStudyStreak(activity, new Date(2026, 8, 9, 18, 0))).toBe(2);
  });

  test("date-only values stay on their stated calendar day", () => {
    expect(studyDayKey("2026-09-09")).toBe("2026-09-09");
  });
  test("timeless subject backfills do not create a study day", () => {
    const days = collectStudyActivityDays({
      subjectProgress: [{
        subject_id: "physics",
        activity_key: "lesson:A1",
        updated_at: "2026-09-09T20:00:00.000Z",
        metadata: { backfilled: true },
      }],
    });
    expect(days.size).toBe(0);
  });

  test("dated subject events still count toward the study streak", () => {
    const days = collectStudyActivityDays({
      subjectProgress: [{
        id: 42,
        subject_id: "physics",
        activity_key: "topic_quiz:C4",
        occurred_at: "2026-09-09T20:00:00.000Z",
        metadata: { subject_id: "physics" },
      }],
    });
    expect(days.size).toBe(1);
  });

});
