const fs = require("fs");
const path = require("path");

const src = path.join(__dirname);
const read = (name) => fs.readFileSync(path.join(src, name), "utf8");

describe("SPARK V5.3.8C mobile dashboard and dark-mode polish", () => {
  test("student overview stat cards keep one neutral tile treatment", () => {
    const app = read("App.js");
    const start = app.indexOf('className="student-dashboard-stats-grid"');
    const end = app.indexOf('className="student-overview-course-card"', start);
    const studentStats = app.slice(start, end);
    expect(studentStats).toContain('className="student-dashboard-stat-card"');
    expect(studentStats).not.toContain('borderTop:`3px solid ${accent}`');
  });

  test("dashboard tab fade is driven by real remaining overflow", () => {
    const app = read("App.js");
    const css = read("responsive.css");
    expect(app).toContain("dashSidebarRef");
    expect(app).toContain("dashTabsHaveMore");
    expect(app).toContain("el.scrollLeft + el.clientWidth >= el.scrollWidth - 4");
    expect(css).toContain(".dash-sidebar.dash-tabs-more");
    expect(css).toContain("mask-image:linear-gradient");
  });

  test("phone overview remains compact and safe-area aware", () => {
    const app = read("App.js");
    const css = read("responsive.css");
    expect(app).toContain('className="student-dashboard-stats-grid"');
    expect(css).toContain("grid-template-columns:repeat(2,minmax(0,1fr))!important");
    expect(css).toContain("env(safe-area-inset-bottom, 0px)");
    expect(css).toContain(".student-overview-course-card button");
    expect(css).toContain(".family-code-actions");
  });

  test("dark neutral surfaces are lifted without changing the deep exam paper background", () => {
    const theme = read("theme.css");
    expect(theme).toContain("--spark-bg:#0A1626");
    expect(theme).toContain("--spark-paper:#102239");
    expect(theme).toContain("--spark-paper-raised:#142A45");
    expect(theme).toContain("--paper-bg:#07111F");
  });
});
