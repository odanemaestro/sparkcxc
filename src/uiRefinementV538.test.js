import fs from "fs";
import path from "path";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK V5.3.8 UI refinement", () => {
  test("dashboard navigation uses the shared SVG icon system instead of emoji", () => {
    const app = read("App.js");
    const icon = read("components/ui/Icon.jsx");
    expect(app).toContain('import Icon from "./components/ui/Icon"');
    expect(app).toContain('{k:"overview",icon:"overview",label:"Overview"}');
    expect(app).toContain('<Icon name={item.icon} />');
    expect(icon).toContain('aria-hidden="true"');
    expect(icon).toContain('focusable="false"');
  });

  test("progress keeps the true percentage while guaranteeing a visible nonzero sliver", () => {
    const progress = read("components/ui/ProgressBar.jsx");
    expect(progress).toContain('width:`${pct}%`');
    expect(progress).toContain('minWidth:safeValue > 0 ? 6 : 0');
    expect(progress).not.toContain("displayPct");
    expect(progress).toContain('role="progressbar"');
  });

  test("practice cards use scan-friendly metadata lines instead of routine pills", () => {
    const hub = read("practice/PracticeHub.jsx");
    expect((hub.match(/practice-specs-line/g) || []).length).toBeGreaterThanOrEqual(3);
    expect(hub).toContain("practice-feature-specs-line");
    expect(hub).toContain("Conceptual Knowledge");
    expect(hub).toContain("Algorithmic Knowledge");
  });

  test("question-selection trust panel is theme-aware and uses divider stats", () => {
    const css = read("practice/practiceExam.css");
    expect(css).toContain("SPARK UI REFINEMENT V5.3.8");
    expect(css).toContain("background:var(--spark-paper,#fff)");
    expect(css).toContain("practice-integrity-stats-four>div:first-child{border-left:0}");
    expect(css).toContain("font-size:30px");
  });

  test("home demo options expose mouse and keyboard affordance and softer orbs", () => {
    const app = read("App.js");
    const global = read("components/ui/GlobalStyles.jsx");
    expect(app).toContain('role="button" tabIndex={demoAnswer === null ? 0 : -1}');
    expect(global).toContain(".demo-option:hover,.demo-option:focus-visible");
    expect(global).toContain("filter:blur(80px)");
    expect(global).toContain("opacity:.28");
  });

  test("family code has an explicit copy action", () => {
    const app = read("App.js");
    expect(app).toContain('navigator.clipboard.writeText(familyCode)');
    expect(app).toContain('Family code copied');
    expect(app).toContain('>Copy code</Btn>');
  });

  test("ghost buttons have a visible resting border and fill", () => {
    const btn = read("components/ui/Btn.jsx");
    expect(btn).toContain('"rgba(255,255,255,.12)"');
    expect(btn).toContain('1.5px solid rgba(255,255,255');
  });

  test("student stat cards use the same neutral tile treatment as the dashboard", () => {
    const app = read("App.js");
    const start = app.indexOf('className="student-dashboard-stats-grid"');
    const end = app.indexOf('className="student-overview-course-card"', start);
    const studentStats = app.slice(start, end);
    expect(studentStats).toContain('className="student-dashboard-stat-card"');
    expect(studentStats).not.toContain('borderTop:`3px solid ${accent}`');
  });
});
