import fs from "fs";
import path from "path";
import { getSparkSubjectRegistry } from "./subjects/subjectRegistry";
import { mathematicsDashboardSummary, summarizeAllSubjects } from "./subjects/subjectProgress";

describe("V10 subject-aware progress metrics", () => {
  test("Mathematics does not advertise labs while Physics does", () => {
    const subjects = getSparkSubjectRegistry({ physicsEnabled: true });
    const mathematics = subjects.find(subject => subject.id === "mathematics");
    const physics = subjects.find(subject => subject.id === "physics");
    expect(mathematics.capabilities.labs).toBe(false);
    expect(physics.capabilities.labs).toBe(true);
  });

  test("Mathematics dashboard summary carries skills tracked instead of fake lab data", () => {
    const summary = mathematicsDashboardSummary({
      done: 3,
      totalTopics: 124,
      learningSummary: { examCount: 2, questionAttemptCount: 18, skillCount: 7, overallExamAverage: 74 },
    });
    expect(summary.labsCompleted).toBe(0);
    expect(summary.skillsTracked).toBe(7);
  });

  test("All-subject summary preserves skills tracked separately from Physics labs", () => {
    const summary = summarizeAllSubjects([
      { id: "mathematics", progress: { active: true, lessonsCompleted: 1, totalTopics: 124, practiceAttempts: 4, practiceAverage: 75, checkpoints: 1, exams: 1, assessments: 1, labsCompleted: 0, skillsTracked: 6 } },
      { id: "physics", progress: { active: true, lessonsCompleted: 2, totalTopics: 25, practiceAttempts: 2, practiceAverage: 80, checkpoints: 1, exams: 0, assessments: 1, labsCompleted: 3, skillsTracked: 0 } },
    ]);
    expect(summary.skillsTracked).toBe(6);
    expect(summary.labsCompleted).toBe(3);
  });

  test("Subject overview chooses subject-specific fourth metric", () => {
    const source = fs.readFileSync(path.join(__dirname, "components/learning/SubjectDashboardOverview.jsx"), "utf8");
    expect(source).toContain('subject?.capabilities?.labs');
    expect(source).toContain('label: "skills tracked"');
    expect(source).toContain('label: "labs explored"');
    expect(source).not.toContain('<div><strong>{progress.labsCompleted || 0}</strong><span>labs explored</span></div>');
  });

  test("Subject detail and all-subject views no longer force Labs explored for Mathematics", () => {
    const detail = fs.readFileSync(path.join(__dirname, "components/learning/SubjectProgressDetail.jsx"), "utf8");
    const all = fs.readFileSync(path.join(__dirname, "components/learning/AllSubjectsProgress.jsx"), "utf8");
    expect(detail).toContain('subject?.capabilities?.labs');
    expect(detail).toContain('label: "Skills tracked"');
    expect(all).toContain('summaries.some(subject => Boolean(subject?.capabilities?.labs))');
    expect(all).toContain('label: "Skills tracked"');
  });
});
