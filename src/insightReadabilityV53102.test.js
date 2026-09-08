const fs = require("fs");
const path = require("path");

const student = fs.readFileSync(path.join(__dirname, "components", "learning", "StudentOverviewIntelligence.jsx"), "utf8");
const parent = fs.readFileSync(path.join(__dirname, "components", "learning", "ParentOverviewIntelligence.jsx"), "utf8");
const report = fs.readFileSync(path.join(__dirname, "components", "reports", "ProgressReportModal.jsx"), "utf8");
const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
const insightText = fs.readFileSync(path.join(__dirname, "components", "learning", "InsightText.jsx"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "learningIntelligence.css"), "utf8");

describe("SPARK V5.3.10.2 insight readability", () => {
  test("student and parent insight cards use the shared topic-emphasis renderer", () => {
    expect(student).toContain('<InsightText text={summary?.insight}/>');
    expect(parent).toContain('<InsightText text={summary?.insight}/>');
  });

  test("report preview uses the same readable insight treatment", () => {
    expect(report).toContain('<InsightText text={summary.insight}/>');
  });

  test("quoted syllabus topics are rendered as strong text", () => {
    expect(insightText).toContain('className="spark-insight-topic"');
    expect(insightText).toContain('/(“[^”]+”)/g');
    expect(css).toContain('.spark-insight-topic{font-weight:850;color:inherit}');
  });

  test("parent summary receives the selected child name", () => {
    expect(app).toContain('learnerName: selectedChild?.name || ""');
  });

  test("report analytics receives the displayed student name", () => {
    expect(report).toContain('buildProgressReport({ ...data, learnerName: student?.name || "" }, {');
  });
});
