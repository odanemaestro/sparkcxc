const fs = require("fs");
const path = require("path");

describe("SPARK desktop dashboard spacing regression", () => {
  const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
  const responsive = fs.readFileSync(path.join(__dirname, "responsive.css"), "utf8");
  const subjectOverview = fs.readFileSync(path.join(__dirname, "components", "learning", "subjectDashboardOverview.css"), "utf8");

  test("student overview stat cards use neutral dashboard tile styling", () => {
    const start = app.indexOf('className="student-dashboard-stats-grid"');
    const end = app.indexOf('className="student-overview-course-card"', start);
    const studentStats = app.slice(start, end);
    expect(studentStats).toContain('className="student-dashboard-stat-card"');
    expect(studentStats).not.toContain('borderTop:`3px solid ${accent}`');
  });

  test("desktop subject cards keep compact spacing and the family card remains compact", () => {
    expect(app).toContain('<SubjectDashboardOverview');
    expect(app).toContain('family-code-card student-overview-family-card');
    expect(subjectOverview).toContain('.spark-subject-overview-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}');
    expect(subjectOverview).toContain('.spark-subject-overview-card{display:grid;gap:13px}');
    expect(responsive).toContain('@media(min-width:821px)');
    expect(responsive).toContain('.student-overview-family-card{');
    expect(responsive).toContain('padding:17px 22px!important');
  });
});
