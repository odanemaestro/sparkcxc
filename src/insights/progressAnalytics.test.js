import { buildLearningSummary, buildProgressReport, reportPeriodDefinition } from "./progressAnalytics";

describe("SPARK learning intelligence analytics", () => {
  const now = new Date("2026-09-08T12:00:00-05:00");
  const base = {
    skills: [
      { skill: "Trigonometry", mastery_score: 48 },
      { skill: "Consumer Arithmetic", mastery_score: 88 },
      { skill: "Statistics", mastery_score: 76 },
    ],
    examAttempts: [
      { paper_type: "paper1", percent: 80, completed_at: "2026-09-05T12:00:00-05:00" },
      { paper_type: "paper2", percent: 70, completed_at: "2026-09-03T12:00:00-05:00" },
      { paper_type: "paper1", percent: 60, completed_at: "2026-08-03T12:00:00-05:00" },
    ],
    questionAttempts: [
      { correct: true, skill: "Consumer Arithmetic", attempted_at: "2026-09-07T12:00:00-05:00" },
      { correct: false, skill: "Trigonometry", attempted_at: "2026-09-07T12:05:00-05:00" },
    ],
    lessons: [{ completed_at: "2026-09-06T10:00:00-05:00" }],
    bookings: [{ session_date: "2026-09-09", start_time: "15:00:00", status: "confirmed" }],
    milestones: [{ id: "m1", title: "Consumer Arithmetic improved", created_at: "2026-09-07T12:00:00-05:00" }],
  };

  test("identifies strongest and weakest skills and current performance", () => {
    const summary = buildLearningSummary(base, now);
    expect(summary.weakestSkills[0].skill).toBe("Trigonometry");
    expect(summary.strongestSkills[0].skill).toBe("Consumer Arithmetic");
    expect(summary.paper1Average).toBe(70);
    expect(summary.paper2Average).toBe(70);
    expect(summary.questionAccuracy).toBe(50);
  });

  test("builds a useful human-readable insight with clearly quoted topics", () => {
    const summary = buildLearningSummary(base, now);
    expect(summary.insight).toContain('The topic “Consumer Arithmetic”');
    expect(summary.insight).toContain('The topic “Trigonometry”');
    expect(summary.insight).toContain("your strongest areas");
  });

  test("parent-facing insight uses the child's name instead of second-person copy", () => {
    const summary = buildLearningSummary({ ...base, learnerName: "Shanice Williams" }, now);
    expect(summary.insight).toContain('The topic “Consumer Arithmetic”');
    expect(summary.insight).toContain("Shanice Williams' strongest areas");
    expect(summary.insight).toContain("for Shanice Williams right now");
    expect(summary.insight).not.toContain("your strongest areas");
  });

  test("weekly snapshot counts activity in the current Monday-to-Sunday week", () => {
    const summary = buildLearningSummary(base, now);
    expect(summary.weekly.lessons).toBe(0);
    expect(summary.weekly.questions).toBe(2);
    expect(summary.weekly.exams).toBe(0);
    expect(summary.weekly.average).toBe(0);
  });

  test("report period can be week, month, term or custom", () => {
    expect(reportPeriodDefinition("week", now).label).toBe("This week");
    expect(reportPeriodDefinition("month", now).label).toBe("This month");
    expect(reportPeriodDefinition("term", now).label).toBe("Current term");
    expect(reportPeriodDefinition("custom", now, { start: "2026-09-01", end: "2026-09-08" }).label).toBe("1 Sep 2026 to 8 Sep 2026");
  });

  test("progress report filters activity to the selected calendar period", () => {
    const report = buildProgressReport(base, { period: "week", now });
    expect(report.activity.examsCompleted).toBe(0);
    expect(report.activity.hasExamAverage).toBe(false);
    expect(report.activity.questionsAttempted).toBe(2);
    expect(report.exams).toHaveLength(0);
  });

  test("monthly report includes September exams and exposes availability flags", () => {
    const report = buildProgressReport(base, { period: "month", now });
    expect(report.activity.examsCompleted).toBe(2);
    expect(report.activity.examAverage).toBe(75);
    expect(report.activity.hasExamAverage).toBe(true);
    expect(report.activity.hasQuestionAccuracy).toBe(true);
  });
});
