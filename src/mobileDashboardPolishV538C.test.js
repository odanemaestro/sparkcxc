const fs = require("fs");
const path = require("path");

const src = path.join(__dirname);
const read = (name) => fs.readFileSync(path.join(src, name), "utf8");

describe("SPARK V5.3.8C mobile dashboard and dark-mode polish", () => {
  test("student overview avoids duplicate stat cards", () => {
    const app = read("App.js");
    const overview = read("components/learning/SubjectDashboardOverview.jsx");
    expect(app).not.toContain('className="student-dashboard-stats-grid"');
    expect(app).not.toContain('className="student-dashboard-stat-card"');
    expect(overview).toContain('className="spark-subject-overview-summary"');
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
    const dashboardCss = read("sparkStudentDashboardApprovedV1.css");
    expect(app).toContain('className="spark-dashboard-v2-shell"');
    expect(dashboardCss).toContain("@media(max-width:760px)");
    expect(dashboardCss).toContain("grid-template-columns:1fr");
    expect(css).toContain("env(safe-area-inset-bottom, 0px)");
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
