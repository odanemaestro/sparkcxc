const fs = require("fs");
const path = require("path");

describe("SPARK V5.3.6D navigator and profile tooltip polish", () => {
  const exam = fs.readFileSync(path.join(__dirname, "practice", "Paper2027ModuleExam.jsx"), "utf8");
  const practiceCss = fs.readFileSync(path.join(__dirname, "practice", "practiceExam.css"), "utf8");
  const theme = fs.readFileSync(path.join(__dirname, "theme.css"), "utf8");

  test("2027 module question buttons reuse the Paper 2 navigator button system", () => {
    expect(exam).toContain('className="paper-nav-grid paper2-nav-grid paper2027-nav-grid"');
    expect(exam).toContain('className="paper-nav-grid paper2-nav-grid paper2027-drawer-grid"');
    expect(exam).toContain('completeSet.has(question.question_id) ? "answered " : ""');
    expect(exam).not.toContain('completeSet.has(question.question_id) ? "complete " : ""');
    expect(practiceCss).toContain("SPARK 2027 NAVIGATOR PARITY V5.3.6D");
    expect(practiceCss).toContain("aspect-ratio:1!important");
  });

  test("profile-photo tooltip stays readable in dark mode", () => {
    expect(theme).toContain("SPARK PROFILE TOOLTIP DARK-MODE POLISH V5.3.6D");
    expect(theme).toContain("background:var(--spark-surface-navy, #0b1f3a)");
    expect(theme).toContain('html[data-theme="dark"] .profile-photo-trigger::after');
    expect(theme).toContain("background:#0A1830");
    expect(theme).toContain("color:#F8FBFF");
  });
});
