const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("consultant student dashboard merged redesign", () => {
  test("student overview uses consultant hierarchy while preserving all functional sections", () => {
    const app = read("App.js");
    const start = app.indexOf('{sec === "overview" && !isTutor && (');
    const end = app.indexOf('{sec === "sessions" && isTutor', start);
    const overview = app.slice(start, end);

    expect(overview).toContain("spark-student-home");
    expect(overview).toContain("<StudentNextStepCard");
    expect(overview).toContain("<SparkOfTheWeekSpotlight");
    expect(overview).toContain('variant="home"');
    expect(overview).toContain("<StudentDashboardSupportCards");
    expect(overview).toContain("<StudentGoalCard");
    expect(overview).not.toContain('variant="details"');
    expect(overview).toContain("<SparkOfTheWeekSpotlight");
    expect(overview).toContain("ssh-family");
    expect(overview).not.toContain("student-dashboard-stats-grid");
    expect(overview).not.toContain("student-mobile-quick-actions");
  });

  test("weekly spotlight shares one rewards load and opens the preserved modal leaderboard", () => {
    const app = read("App.js");
    const rewards = read("components/rewards/SparkRewardsPanel.jsx");
    const spotlight = read("components/rewards/SparkOfTheWeekSpotlight.jsx");
    expect(app).toContain("useSparkRewardsDashboard");
    expect(app).toContain("rewards={studentRewards}");
    expect(spotlight).toContain("Weekly leaders");
    expect(spotlight).toContain("This week's badges");
    expect(spotlight).toContain("lifetime points");
    expect(spotlight).toContain("spark-weekly-leaders-modal");
    expect(rewards).toContain("<Modal");
    expect(rewards).toContain('className="spark-weekly-leaders-modal"');
    expect(rewards).not.toContain("scrollIntoView");
  });

  test("subjects use attention-first status words, specific recommendations and keep full actions", () => {
    const subject = read("components/learning/SubjectDashboardOverview.jsx");
    const model = read("learning/studentHomeModel.js");
    expect(subject).toContain("sortSubjectsForHome");
    expect(subject).toContain("recommendationDisplay");
    expect(subject).toContain("Needs attention");
    expect(subject).toContain("practice average");
    expect(subject).toContain("Next focus");
    expect(subject).toContain("Practise");
    expect(subject).toContain("View progress");
    expect(subject).not.toContain('"Build on your latest work."');
    expect(model).toContain("specificActionTitle");
    expect(model).toContain("recommendationDisplay");
  });

  test("support information stays grouped and stacked at narrow and tablet widths", () => {
    const support = read("components/learning/StudentDashboardSupportCards.jsx");
    const css = read("sparkStudentHomeV1.css");
    expect(support).toContain("UPCOMING TUTORING");
    expect(support).toContain("FLASHCARDS");
    expect(support).toContain("RECENT ACHIEVEMENTS");
    expect(css).toContain(".ssh-aside{grid-template-columns:1fr}");
    expect(css).toContain("@media(max-width:1279px)");
  });

  test("names weakest areas across every enrolled subject through one shared helper", () => {
    const model = read("learning/studentHomeModel.js");
    expect(model).toContain("focusAreaFromIntelligence");
    expect(model).toContain("intelligence?.prioritySkills");
    expect(model).toContain("intelligence?.states");
    expect(model).toContain('"Practise " + focusArea');
    expect(model).toContain('" needs more work."');
  });

  test("merged design keeps responsive light and dark treatment", () => {
    const css = read("sparkStudentHomeV1.css");
    expect(css).toContain("html[data-theme=\"dark\"] .spark-student-home");
    expect(css).toContain("@media(max-width:820px)");
    expect(css).toContain("@media(max-width:700px)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  });
});
