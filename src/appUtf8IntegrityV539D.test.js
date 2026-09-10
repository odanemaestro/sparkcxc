const fs = require("fs");
const path = require("path");

describe("SPARK V5.3.9D UTF-8 source integrity", () => {
  const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
  const subjectDetail = fs.readFileSync(path.join(__dirname, "components", "learning", "SubjectProgressDetail.jsx"), "utf8");
  const allSubjects = fs.readFileSync(path.join(__dirname, "components", "learning", "AllSubjectsProgress.jsx"), "utf8");
  const enrollment = fs.readFileSync(path.join(__dirname, "components", "learning", "StudentSubjectEnrollment.jsx"), "utf8");

  test("common mojibake sequences are absent from App.js", () => {
    ["Â·", "Â°", "â†’", "âœ", "ðŸ"].forEach(token => {
      expect(app).not.toContain(token);
    });
  });

  test("dashboard and subject actions use the intended UTF-8 text and SVG drill-in icon", () => {
    expect(app).toContain("Continue studying");
    expect(app).toContain("spark-dashboard-card-action-icon");
    expect(app).toContain('viewBox="0 0 20 20"');
    expect(app).toContain('d="M6 14L14 6M8 6h6v6"');
    [app, subjectDetail, allSubjects, enrollment].forEach(source => expect(source).not.toContain('spark-dashboard-card-action-icon\" aria-hidden=\"true\">↗'));
    expect(enrollment).toContain("Open subject");
    expect(enrollment).toContain(" · ");
  });
});
