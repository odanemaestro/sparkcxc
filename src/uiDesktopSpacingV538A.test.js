const fs = require("fs");
const path = require("path");

describe("SPARK desktop dashboard spacing regression", () => {
  const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
  const responsive = fs.readFileSync(path.join(__dirname, "responsive.css"), "utf8");
  const subjectOverview = fs.readFileSync(path.join(__dirname, "components", "learning", "subjectDashboardOverview.css"), "utf8");

  test("student overview avoids duplicate stat-card surfaces", () => {
    expect(app).not.toContain('className="student-dashboard-stats-grid"');
    expect(app).not.toContain('className="student-dashboard-stat-card"');
    expect(subjectOverview).toContain(".spark-subject-overview-summary");
  });

  test("desktop subject cards keep compact spacing and the family card remains compact", () => {
    expect(app).toContain('<SubjectDashboardOverview');
    expect(app).toContain('family-code-card student-overview-family-card');
    expect(subjectOverview).toContain(".spark-subject-overview-list");
    expect(subjectOverview).toContain("grid-template-columns:minmax(190px,1.25fr)");
    expect(subjectOverview).toContain("@media(max-width:1180px)");
    expect(subjectOverview).toContain("@media(max-width:820px)");
    expect(subjectOverview).toContain("@media(max-width:520px)");
    expect(responsive).toContain('@media(min-width:821px)');
    expect(responsive).toContain('.student-overview-family-card{');
    expect(responsive).toContain('padding:17px 22px!important');
  });
});
