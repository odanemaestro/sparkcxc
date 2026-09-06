const fs = require("fs");
const path = require("path");

describe("SPARK V5.3.6E investigation and profile tooltip cleanup", () => {
  const exam = fs.readFileSync(path.join(__dirname, "practice", "Paper2027ModuleExam.jsx"), "utf8");
  const theme = fs.readFileSync(path.join(__dirname, "theme.css"), "utf8");

  test("2027 question header does not repeat an Investigation badge", () => {
    expect(exam).toContain('<span>{current.topic}</span><b>{current.marks} marks</b>');
    expect(exam).not.toContain('current.question_number === 2 && <em>Investigation</em>');
  });

  test("sidebar profile tooltip is edge-safe", () => {
    expect(theme).toContain("SPARK PROFILE TOOLTIP EDGE-SAFE V5.3.6E");
    expect(theme).toContain(".dash-sidebar .profile-photo-trigger::after");
    expect(theme).toContain("left:0;");
    expect(theme).toContain("transform:translate(0,-4px)");
  });
});
