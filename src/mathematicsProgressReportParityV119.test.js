const fs = require("fs");
const path = require("path");
const { mergeMathematicsLessonRowsForReporting } = require("./subjects/subjectProgress");
const { buildProgressReport } = require("./insights/progressAnalytics");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

describe("Mathematics progress report parity V11.9", () => {
  test("a canonical subject-progress lesson is visible to the monthly Mathematics report even without a legacy lesson row", () => {
    const lessons = mergeMathematicsLessonRowsForReporting([], [{
      subject_id: "mathematics",
      activity_key: "lesson:s1:1",
      activity_type: "lesson",
      section_id: "s1",
      topic_id: "1",
      title: "Number concepts",
      completed: true,
      first_recorded_at: "2026-09-11T14:00:00.000Z",
      updated_at: "2026-09-11T14:00:00.000Z",
      metadata: { completion_source: "manual" },
    }]);

    expect(lessons).toHaveLength(1);
    expect(lessons[0].lessons.title).toBe("Number concepts");
    expect(lessons[0].completed_at).toBe("2026-09-11T14:00:00.000Z");

    const report = buildProgressReport({ lessons }, {
      period: "month",
      now: "2026-09-11T20:00:00.000Z",
    });
    expect(report.activity.lessonsCompleted).toBe(1);
  });

  test("legacy and subject-progress copies of the same Mathematics lesson are counted once", () => {
    const lessons = mergeMathematicsLessonRowsForReporting([
      {
        id: "legacy-1",
        lesson_id: "lesson-1",
        completed: true,
        completed_at: "2026-09-11T14:00:00.000Z",
        lessons: { title: "Fractions" },
      },
    ], [
      {
        subject_id: "mathematics",
        activity_key: "lesson:s1:2",
        activity_type: "lesson",
        title: "Fractions",
        completed: true,
        first_recorded_at: "2026-09-11T14:00:01.000Z",
        updated_at: "2026-09-11T14:00:01.000Z",
      },
    ]);

    expect(lessons).toHaveLength(1);
    expect(lessons[0].id).toBe("legacy-1");
  });

  test("student and parent dashboard totals and progress reports use the same merged Mathematics lesson rows", () => {
    expect(app).toContain("const mathematicsLessonRows = mergeMathematicsLessonRowsForReporting(progressData, mergedSubjectProgressRows)");
    expect(app).toContain("lessons: mathematicsLessonRows");
    expect(app).toContain("const parentMathematicsLessonRows = mergeMathematicsLessonRowsForReporting(");
    expect(app).toContain("lessons: parentMathematicsLessonRows");
    expect(app).toContain("done: parentMathematicsLessonRows.length");
  });
});
