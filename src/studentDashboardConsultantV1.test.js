const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("consultant student dashboard redesign V1", () => {
  test("student overview uses the new hierarchy without the old stat grid", () => {
    const app = read("App.js");
    const start = app.indexOf('{sec === "overview" && !isTutor && (');
    const end = app.indexOf('{sec === "sessions" && isTutor', start);
    const overview = app.slice(start, end);

    expect(overview).toContain("spark-consultant-dashboard");
    expect(overview).toContain("<StudentDashboardHero");
    expect(overview).toContain("<SubjectDashboardOverview");
    expect(overview).toContain("<StudentGoalCard");
    expect(overview).toContain("<SparkRewardsPanel");
    expect(overview).toContain("<StudentDashboardSupportCards");
    expect(overview).toContain("spark-consultant-family");
    expect(overview).not.toContain("student-dashboard-stats-grid");
    expect(overview).not.toContain("student-mobile-quick-actions");
    expect(overview).not.toContain("<ProfilePhotoEditor");
  });

  test("SPARK of the Week is lifted into the hero and weekly leaders open in a modal", () => {
    const hero = read("components/learning/StudentDashboardHero.jsx");
    const rewards = read("components/rewards/SparkRewardsPanel.jsx");
    expect(hero).toContain('id="spark-dashboard-weekly-highlight"');
    expect(rewards).toContain('document.getElementById("spark-dashboard-weekly-highlight")');
    expect(rewards).toContain("createPortal(weeklyHero, weeklyHighlightTarget)");
    expect(rewards).toContain("<Modal");
    expect(rewards).toContain('className="spark-weekly-leaders-modal"');
    expect(rewards).not.toContain("scrollIntoView");
    expect(rewards.match(/spark_get_rewards_dashboard/g)?.length).toBe(1);
  });

  test("subjects stay detailed but use a scan-friendly card layout", () => {
    const subject = read("components/learning/SubjectDashboardOverview.jsx");
    const css = read("components/learning/subjectDashboardOverview.css");
    expect(subject).toContain("Focus next");
    expect(subject).toContain("Lesson completion");
    expect(subject).toContain("practice");
    expect(subject).toContain("average");
    expect(subject).toContain("assessments");
    expect(subject).toContain("Recommended next");
    expect(subject).toContain("onOpenPractice");
    expect(css).toContain("grid-template-columns:repeat(2,minmax(0,1fr))");
    expect(css).toContain("@media(max-width:920px)");
  });

  test("dashboard styling supports both themes and responsive layouts", () => {
    const css = read("sparkStudentDashboardConsultantV1.css");
    expect(css).toContain("--spark-consultant-navy:#123468");
    expect(css).toContain("--spark-consultant-teal:#14b8a6");
    expect(css).toContain("--spark-consultant-gold:#d99a1b");
    expect(css).toContain('html[data-theme="dark"] .spark-consultant-dashboard');
    expect(css).toContain("@media(max-width:1080px)");
    expect(css).toContain(".spark-consultant-rail .spark-dashboard-support-grid{\n    grid-template-columns:1fr;");
    expect(css).toContain(".spark-weekly-leaders-modal-grid");
    expect(css).toContain("@media(max-width:820px)");
    expect(css).toContain("@media(max-width:520px)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  });
});
