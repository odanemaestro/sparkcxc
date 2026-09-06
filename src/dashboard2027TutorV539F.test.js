const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

test("tutor overview stat cards are neutral like the student dashboard", () => {
  const start = app.indexOf('[[' + '"Upcoming sessions"');
  expect(start).toBeGreaterThan(-1);
  const block = app.slice(start, start + 1200);
  expect(block).toContain('className="tutor-dashboard-stat-card"');
  expect(block).not.toContain("borderTop:`3px solid ${accent}`");
  expect(block).not.toContain("T.purpleLight");
  expect(block).not.toContain("T.amberLight");
  expect(block).not.toContain("T.emeraldLight");
});

test("student and parent exam queries load metadata so 2027 attempts can be identified", () => {
  const matches = app.match(/practice_exam_attempts[\s\S]{0,180}correct_count,metadata/g) || [];
  expect(matches.length).toBeGreaterThanOrEqual(2);
});

test("parent dashboard separates 2027 Practice results and learning activity", () => {
  expect(app).toContain("const paper2027Attempts = examAttempts.filter(isCsec2027ExamAttempt);");
  expect(app).toContain("2027 <strong>{paper2027Attempts.length}</strong>");
  expect(app).toContain("csec2027ExamLabel(attempt)");
  expect(app).toContain('item?.metadata?.format === "2027"');
  expect(app).toContain('label: "2027 Practice"');
});
