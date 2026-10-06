const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("Study and Practice dashboard visual carryover", () => {
  test("loads the dashboard polish after the legacy button layers", () => {
    const app = read("App.js");
    const finalLayer = app.indexOf('import "./sparkFinalButtonConsistencyV2642.css";');
    const dashboardLayer = app.indexOf('import "./sparkStudyPracticeDashboardPolishV1.css";');
    expect(finalLayer).toBeGreaterThan(-1);
    expect(dashboardLayer).toBeGreaterThan(finalLayer);
  });

  test("uses dashboard navy primary, outlined navigation and teal selection states", () => {
    const css = read("sparkStudyPracticeDashboardPolishV1.css");
    expect(css).toContain("--spdp-navy:#123468");
    expect(css).toContain('[data-spark-action="forward"]');
    expect(css).toContain("background:var(--spdp-navy)!important");
    expect(css).toContain('[data-spark-action="nav"]');
    expect(css).toContain("background:var(--spdp-surface)!important");
    expect(css).toContain("background:var(--spdp-teal-soft)!important");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("preserves accessibility, mobile touch size and reduced motion", () => {
    const css = read("sparkStudyPracticeDashboardPolishV1.css");
    expect(css).toContain(":focus-visible");
    expect(css).toContain("outline:3px solid var(--spdp-focus)!important");
    expect(css).toContain("@media(max-width:680px)");
    expect(css).toContain("min-height:46px!important");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  });

  test("semantic coordinator covers common study and practice actions", () => {
    const semantics = read("studyPracticeSemanticsV261.js");
    expect(semantics).toContain("start (practice|quiz|paper|lesson)");
    expect(semantics).toContain("check answer|check my answer|mark complete");
    expect(semantics).toContain("try again|review this topic");
    expect(semantics).toContain("review answers|view results|view review|see results");
  });
});
