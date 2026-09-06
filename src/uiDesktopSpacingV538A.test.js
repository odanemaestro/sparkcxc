const fs = require("fs");
const path = require("path");

describe("SPARK desktop dashboard spacing regression", () => {
  const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
  const responsive = fs.readFileSync(path.join(__dirname, "responsive.css"), "utf8");

  test("student overview stat cards use neutral dashboard tile styling", () => {
    const start = app.indexOf('className="student-dashboard-stats-grid"');
    const end = app.indexOf('className="student-overview-course-card"', start);
    const studentStats = app.slice(start, end);
    expect(studentStats).toContain('className="student-dashboard-stat-card"');
    expect(studentStats).not.toContain('borderTop:`3px solid ${accent}`');
  });

  test("desktop-only compact spacing hooks and rules are present", () => {
    expect(app).toContain('className="student-overview-course-card"');
    expect(app).toContain('className="student-overview-progress-bar"');
    expect(app).toContain('family-code-card student-overview-family-card');
    expect(responsive).toContain('@media(min-width:821px)');
    expect(responsive).toContain('.student-overview-course-card{');
    expect(responsive).toContain('padding:18px 22px!important');
    expect(responsive).toContain('.student-overview-progress-bar{');
    expect(responsive).toContain('margin-bottom:10px!important');
    expect(responsive).toContain('.student-overview-family-card{');
    expect(responsive).toContain('padding:17px 22px!important');
  });
});
