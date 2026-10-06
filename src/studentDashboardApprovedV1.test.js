const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK student dashboard approved design V1", () => {
  test("overview preserves every current dashboard capability without duplicate progress surfaces", () => {
    const app = read("App.js");
    const start = app.indexOf('{sec === "overview" && !isTutor && (');
    const end = app.indexOf('{sec === "sessions" && isTutor', start);
    const overview = app.slice(start, end);

    expect(overview).toContain("<StudentDashboardHero");
    expect(overview).toContain("<SubjectDashboardOverview");
    expect(overview).toContain("<StudentGoalCard");
    expect(overview).toContain("<SparkRewardsPanel");
    expect(overview).toContain("<StudentDashboardSupportCards");
    expect(overview).toContain("family-request-card");
    expect(overview).toContain("student-overview-family-card");

    expect(overview).not.toContain("student-dashboard-stats-grid");
    expect(overview).not.toContain("student-dashboard-stat-card");
    expect(overview).not.toContain("student-mobile-quick-actions");
    expect(overview).not.toContain("<ProfilePhotoEditor");
  });

  test("hero provides one specific next action and scalable streak copy", () => {
    const hero = read("components/learning/StudentDashboardHero.jsx");
    expect(hero).toContain("Pick up <span>{focusTitle}</span> in {subjectLabel}");
    expect(hero).toContain("spark-dashboard-v2-primary");
    expect(hero).toContain("{streakCount} day streak");
    expect(hero).toContain("Study today to reach ");
    expect(hero).not.toContain("1 2 3 4 5 6 7 8");
  });

  test("subjects use one sorted list, neutral progress bars and a focus-next cue", () => {
    const overview = read("components/learning/SubjectDashboardOverview.jsx");
    const css = read("components/learning/subjectDashboardOverview.css");
    expect(overview).toContain("lessonPercent(a) - lessonPercent(b)");
    expect(overview).toContain("spark-subject-overview-list");
    expect(overview).toContain("Focus next");
    expect(overview).toContain("spark-subject-overview-summary");
    expect(css).toContain(".spark-subject-overview-mastery .spark-progress-bar__fill");
    expect(css).toContain("background:var(--sd-navy,var(--spark-navy,#0f2557))!important");
  });

  test("right rail prioritizes tutoring before secondary review and activity", () => {
    const support = read("components/learning/StudentDashboardSupportCards.jsx");
    const tutoring = support.indexOf("<h3>Next tutoring session</h3>");
    const flashcards = support.indexOf("<h3>Flashcards</h3>");
    const recent = support.indexOf("<h3>Recent activity</h3>");
    expect(tutoring).toBeGreaterThan(-1);
    expect(flashcards).toBeGreaterThan(tutoring);
    expect(recent).toBeGreaterThan(flashcards);
    expect(support).toContain('DashboardCardAction label="View booking"');
  });

  test("design keeps the lighter SPARK navy teal system and responsive dark mode", () => {
    const css = read("sparkStudentDashboardApprovedV1.css");
    expect(css).toContain("--sd-navy:#0f2557");
    expect(css).toContain("--sd-teal:#0d9488");
    expect(css).toContain("--sd-gold:#d99a1b");
    expect(css).toContain("background:#fbfcfe");
    expect(css).toContain('html[data-theme="dark"] .spark-dashboard-v2-shell');
    expect(css).toContain("@media(max-width:960px)");
    expect(css).toContain("@media(max-width:760px)");
    expect(css).toContain("@media(max-width:520px)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  });
});
