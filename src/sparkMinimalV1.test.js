import fs from "fs";
import path from "path";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK Minimal V1 design system", () => {
  const app = read("App.js");
  const theme = read("theme.css");
  const tokens = read("theme.js");
  const minimal = read("sparkMinimalV1.css");
  const card = read("components/ui/Card.jsx");
  const button = read("components/ui/Btn.jsx");
  const badge = read("components/ui/Badge.jsx");
  const progress = read("components/ui/ProgressBar.jsx");

  test("loads the minimal presentation layer after the legacy presentation files", () => {
    expect(app).toContain('import "./sparkMinimalV1.css";');
    expect(app.indexOf('import "./sparkMinimalV1.css";')).toBeGreaterThan(app.indexOf('import "./sparkSubjectLeaveModalV272.css";'));
  });

  test("uses neutral light and dark canvases with teal as the accent", () => {
    expect(theme).toContain("--spark-bg:#F7F7F5");
    expect(theme).toContain("--spark-paper:#FFFFFF");
    expect(theme).toContain("--spark-ink:#202124");
    expect(theme).toContain("--spark-teal:#0F8A7F");
    expect(theme).toContain("--spark-bg:#151513");
    expect(theme).toContain("--spark-paper:#1D1D1A");
    expect(theme).toContain("--spark-ink:#F1F1EF");
  });

  test("shared primitives remove decorative elevation and gradients", () => {
    expect(card).toContain('boxShadow:hover ? T.shadowSm : "none"');
    expect(button).toContain('boxShadow:"none"');
    expect(badge).toContain("borderRadius:8");
    expect(progress).toContain("background:color");
    expect(progress).not.toContain("linear-gradient");
  });

  test("uses one clean sans-serif family for body and display UI", () => {
    expect(tokens).toContain("BlinkMacSystemFont");
    expect(tokens).toContain("export const FD");
    expect(tokens).toContain("export const FB");
    expect(minimal).toContain("--spark-font-sans");
  });

  test("navigation uses quiet neutral active states instead of navy tabs", () => {
    expect(app).toContain("spark-nav-link");
    expect(app).toContain('aria-current={active ? "page" : undefined}');
    expect(minimal).toContain(".spark-nav-link.active");
    expect(minimal).toContain(".dash-nav-item[aria-current=\"page\"]");
  });

  test("dashboard metrics are consolidated into one grouped surface", () => {
    expect(minimal).toContain(".student-dashboard-stats-grid");
    expect(minimal).toContain("overflow:hidden");
    expect(minimal).toContain(".student-dashboard-stat-card");
    expect(minimal).toContain("border-radius:0!important");
  });

  test("long-form study removes nested card chrome but keeps interactive objects distinct", () => {
    expect(minimal).toContain(".spark-generic-lesson");
    expect(minimal).toContain("background:transparent!important");
    expect(minimal).toContain(".ss-panel");
    expect(minimal).toContain(".ss-interactive");
    expect(minimal).toContain("background:var(--spark-paper)!important");
  });

  test("exam paper islands stay opaque in Glass mode", () => {
    expect(minimal).toContain('html[data-glass="true"] .paper-question-card');
    expect(minimal).toContain('html[data-glass="true"] .paper2-question-card');
    expect(minimal).toContain("-webkit-backdrop-filter:none!important");
  });

  test("mobile keeps an intentional compact layout rather than shrinking desktop", () => {
    expect(minimal).toContain("@media(max-width:700px)");
    expect(minimal).toContain(".student-mobile-quick-actions");
    expect(minimal).toContain(".student-dashboard-stats-grid");
    expect(minimal).toContain(".spark-subject-overview-grid");
    expect(minimal).toContain(".home-live-stats");
  });
});
