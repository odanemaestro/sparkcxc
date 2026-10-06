const fs = require("fs");
const path = require("path");

describe("SPARK desktop dashboard spacing regression", () => {
  const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
  const responsive = fs.readFileSync(path.join(__dirname, "responsive.css"), "utf8");
  const subjectOverview = fs.readFileSync(path.join(__dirname, "components", "learning", "subjectDashboardOverview.css"), "utf8");

  test("student overview uses the consolidated dashboard hierarchy", () => {
    expect(app).toContain("<StudentNextStepCard");
    expect(app).toContain("<SparkOfTheWeekSpotlight");
    expect(app).not.toContain('className="student-dashboard-stat-card"');
  });

  test("desktop subject cards keep compact spacing and the family card remains compact", () => {
    expect(app).toContain('<SubjectDashboardOverview');
    expect(app).toContain('family-code-card student-overview-family-card');
    expect(subjectOverview).toContain(".spark-subject-overview-grid");
    expect(subjectOverview).toContain("grid-template-columns:repeat(2,minmax(0,1fr))");
    expect(subjectOverview).toContain("@media(min-width:1800px)");
    expect(subjectOverview).toContain("grid-template-columns:repeat(3,minmax(0,1fr))");
    expect(subjectOverview).toContain("@media(max-width:840px)");
    expect(subjectOverview).toContain("grid-template-columns:1fr");
    expect(subjectOverview).toContain(".spark-subject-overview-card");
    expect(responsive).toContain('@media(min-width:821px)');
    expect(responsive).toContain('.student-overview-family-card{');
    expect(responsive).toContain('padding:17px 22px!important');
  });
});
