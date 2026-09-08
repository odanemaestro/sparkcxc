import { generateStudentProgressPdfBytes } from "./studentProgressReport";

describe("SPARK student progress PDF", () => {
  test("generates a valid two-page PDF document", () => {
    const bytes = generateStudentProgressPdfBytes({
      studentName: "Shanice Williams",
      parentName: "Parent",
      report: {
        generatedAt: "2026-09-08T12:00:00Z",
        period: { label: "Last 30 days" },
        summary: { mastery: 74, skillCount: 5, paper1Average: 78, paper1Count: 1, paper2Average: 69, paper2Count: 1, paper2027Average: 72, paper2027Count: 1, insight: "Good progress." },
        activity: { lessonsCompleted: 4, questionsAttempted: 62, questionAccuracy: 76, hasQuestionAccuracy: true, examsCompleted: 2, examAverage: 73, hasExamAverage: true, tutorSessions: 1, flashcardsReviewed: 20 },
        strongestSkills: [{ skill: "Consumer Arithmetic", score: 88 }],
        weakestSkills: [{ skill: "Trigonometry", score: 48 }],
        recommendations: ["Review Trigonometry."],
        exams: [{ label: "Paper 1", score: 47, maxScore: 60, percent: 78, completedAt: "2026-09-05T12:00:00Z" }],
        milestones: [{ title: "Algebra improved", created_at: "2026-09-06T12:00:00Z" }],
        goal: { title: "Reach 80% in CSEC Mathematics", target_percent: 80, target_date: "2026-12-15" },
        studyCircle: { active: true, group_size: 5 },
      },
    });
    const header = String.fromCharCode(...bytes.slice(0, 8));
    expect(header).toContain("%PDF-1.4");
    const raw = String.fromCharCode(...bytes);
    expect(raw).toContain("Study Circle");
    expect(raw).toContain("Active");
    expect(raw).toContain("Active - 5 students");
    expect(raw).not.toContain("Active ? 5 students");
    expect(raw).toContain("15 Dec 2026");
    expect(bytes.length).toBeGreaterThan(2000);
  });
});
