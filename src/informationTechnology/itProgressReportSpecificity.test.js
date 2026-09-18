const fs = require("fs");
const path = require("path");
const { buildGenericSubjectProgressReport } = require("../subjects/subjectProgress");

const IT_SUBJECT = {
  id: "information-technology",
  name: "CSEC Information Technology",
  shortName: "Information Technology",
  stats: { topics: 26 },
};

describe("Information Technology progress report specificity", () => {
  test("empty IT report uses IT-specific metrics, insight and recommendations", () => {
    const report = buildGenericSubjectProgressReport(
      { subject: IT_SUBJECT, rows: [], events: [] },
      { period: "month", now: new Date("2026-09-18T12:00:00Z") }
    );

    expect(report.metrics).toEqual([
      { label: "Syllabus topics", value: "0/26" },
      { label: "Practical labs", value: "0/6" },
      { label: "Paper 01 average", value: "N/A" },
      { label: "Paper 02 average", value: "N/A" },
    ]);
    expect(report.assessmentLabel).toBe("Recent IT Paper 01 and Paper 02 results");
    expect(report.strongestAreaTitle).toBe("Strongest IT areas");
    expect(report.weakestAreaTitle).toBe("IT areas to strengthen");
    expect(report.summary.insight).toContain("Information Technology learning activity");
    expect(report.recommendations.join(" ")).toContain("Information Technology syllabus topic");
    expect(report.recommendations.join(" ")).toContain("SPARK Practical Lab");
  });

  test("IT report separates Paper 01 and Paper 02 averages and uses Paper 02 profile evidence", () => {
    const rows = [
      {
        subject_id: "information-technology",
        activity_key: "lesson:16",
        activity_type: "lesson",
        completed: true,
        topic_id: "16",
        title: "Spreadsheet Fundamentals",
        updated_at: "2026-09-10T10:00:00Z",
      },
      {
        subject_id: "information-technology",
        activity_key: "lab:spreadsheet",
        activity_type: "lab",
        completed: true,
        title: "Spreadsheet Lab",
        updated_at: "2026-09-11T10:00:00Z",
      },
      {
        subject_id: "information-technology",
        activity_key: "paper1:P1-A",
        activity_type: "exam",
        completed: true,
        title: "Practice Paper A",
        score: 48,
        max_score: 60,
        percent: 80,
        attempt_count: 1,
        updated_at: "2026-09-12T10:00:00Z",
        metadata: { paper_type: "paper1", event_type: "it_paper1_exam" },
      },
      {
        subject_id: "information-technology",
        activity_key: "paper2:P2-A",
        activity_type: "exam",
        completed: true,
        title: "Practice Paper A",
        score: 72,
        max_score: 90,
        percent: 80,
        attempt_count: 1,
        updated_at: "2026-09-13T10:00:00Z",
        metadata: {
          paper_type: "paper2",
          event_type: "it_paper2_exam",
          profiles: {
            Theory: 28,
            "Productivity Tools": 27,
            "Problem-Solving and Programming": 15,
          },
        },
      },
    ];

    const report = buildGenericSubjectProgressReport(
      { subject: IT_SUBJECT, rows, events: [] },
      { period: "month", now: new Date("2026-09-18T12:00:00Z") }
    );

    expect(report.metrics).toEqual([
      { label: "Syllabus topics", value: "1/26" },
      { label: "Practical labs", value: "1/6" },
      { label: "Paper 01 average", value: "80%" },
      { label: "Paper 02 average", value: "80%" },
    ]);
    expect(report.strongestSkills[0]).toEqual({ skill: "Productivity Tools", score: 90 });
    expect(report.weakestSkills.some(item => item.skill === "Problem-Solving & Programming")).toBe(true);
    expect(report.exams.map(item => item.label).join(" ")).toContain("Paper 01");
    expect(report.exams.map(item => item.label).join(" ")).toContain("Paper 02");
  });

  test("progress modal supports IT-specific strongest and improvement wording", () => {
    const modal = fs.readFileSync(
      path.join(__dirname, "..", "components", "reports", "ProgressReportModal.jsx"),
      "utf8"
    );
    expect(modal).toContain('report.strongestAreaTitle || "Strongest areas"');
    expect(modal).toContain('report.weakestAreaTitle || "Areas to improve"');
    expect(modal).toContain('report.strongestEmpty || "No mastery data yet."');
    expect(modal).toContain('report.weakestEmpty || "No priority areas recorded."');
  });
});
