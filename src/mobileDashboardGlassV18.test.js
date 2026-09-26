import fs from "fs";
import path from "path";
import { weeklyAchievementBadges } from "./rewards/sparkRewards";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK mobile dashboard glass V18", () => {
  test("reward badges use SVG icon names instead of emoji glyphs", () => {
    const badges = weeklyAchievementBadges({
      study_days: 4,
      exams_completed: 1,
      lessons_completed: 3,
      skills_improved: 1,
      question_attempts: 20,
      correct_questions: 18,
      flashcard_reviews: 20,
    });

    expect(badges.find(item => item.key === "consistency")?.icon).toBe("consistency");
    expect(badges.find(item => item.key === "exam")?.icon).toBe("challenge");
    expect(badges.some(item => /🔥|🏁|📚/u.test(String(item.icon)))).toBe(false);
  });

  test("reward panel renders shared Icon components", () => {
    const panel = read("components/rewards/SparkRewardsPanel.jsx");
    expect(panel).toContain('import Icon from "../ui/Icon";');
    expect(panel).toContain("<Icon name={badge.icon} size={18}/>");
    expect(panel).not.toContain("{badge.icon} {badge.label}");
  });

  test("supplied flame and books artwork are dedicated SVG components", () => {
    const icons = read("components/ui/Icon.jsx");
    expect(icons).toContain("function ConsistencyFlameIcon");
    expect(icons).toContain('viewBox="0 0 128 128"');
    expect(icons).toContain("function LessonBuilderBooksIcon");
    expect(icons).toContain('viewBox="0 0 32 32"');
    expect(icons).toContain('fill="#00a6ed"');
    expect(icons).toContain('fill="#ca0b4a"');
    expect(icons).toContain('fill="#86d72f"');
  });

  test("mobile dashboard includes quick actions and active-tab centering hooks", () => {
    const app = read("App.js");
    expect(app).toContain('className="student-mobile-quick-actions"');
    expect(app).toContain('className="student-mobile-quick-label">Continue study</span>');
    expect(app).toContain('className="student-mobile-quick-label">Quick practice</span>');
    expect(app).toContain('className="student-mobile-quick-label">Flashcards</span>');
    expect(app).toContain('<Icon name="featureBook" size={19}/>');
    expect(app).toContain('aria-current={sec===item.k ? "page" : undefined}');
    expect(app).toContain('scrollIntoView({ behavior:"smooth", block:"nearest", inline:"center" })');
    expect(app).toContain('spark-nav-menu-open');
    expect(app).toContain('className="booking-session-modal"');
  });

  test("glass appearance is optional, persisted and accessibility-aware", () => {
    const hook = read("hooks/useThemeMode.js");
    const app = read("App.js");
    const css = read("mobileDashboardV18.css");

    expect(hook).toContain('GLASS_STORAGE_KEY = "spark_glass_mode"');
    expect(hook).toContain('root.dataset.glass = glassMode ? "true" : "false"');
    expect(app).toContain("Glass appearance");
    expect(app).toContain("aria-pressed={Boolean(glassMode)}");
    expect(css).toContain('html[data-glass="true"] .spark-nav');
    expect(css).toContain('html[data-glass="true"] .spark-scroll-top');
    expect(css).toContain(".notification-trigger{");
    expect(css).toContain("background:rgba(255,255,255,.08) !important");
    expect(css).toContain("border-color:rgba(255,255,255,.22) !important");
    expect(css).toContain('html[data-glass="true"] .spark-nav .notification-trigger');
    expect(css).toContain('html[data-theme="light"][data-glass="true"] .student-mobile-quick-actions .student-mobile-quick-label');
    expect(css).toContain("backdrop-filter:blur(22px) saturate(165%)");
    expect(css).toContain("env(safe-area-inset-top)");
    expect(css).toContain("@media(prefers-reduced-transparency:reduce)");
    expect(css).toContain("position:absolute !important");
    expect(css).toContain("min-height:26px !important");
    expect(css).toContain(".spark-nav-menu-open::after");
    expect(css).toContain(".dash-sidebar.dash-tabs-more::after");
    expect(css).toContain('html[data-glass="true"] .notification-drawer');
    expect(css).toContain('html[data-glass="true"] .booking-session-modal');
    expect(css).toContain("@media(min-width:701px) and (max-width:900px)");
  });

  test("mobile density rules compact rewards and keep stats in a two-column grid", () => {
    const css = read("mobileDashboardV18.css");
    expect(css).toContain(".spark-rewards-personal-main");
    expect(css).toContain("grid-template-columns:105px minmax(0,1fr) !important");
    expect(css).toContain(".spark-rewards-badges");
    expect(css).toContain("flex-wrap:nowrap !important");
    expect(css).toContain(".student-dashboard-stats-grid");
    expect(css).toContain("grid-template-columns:repeat(2,minmax(0,1fr)) !important");
    expect(css).toContain("min-height:58px");
    expect(css).toContain(".student-mobile-quick-label");
    expect(css).toContain(".student-mobile-quick-actions>.student-mobile-quick-action:first-child");
    expect(css).toContain("background:var(--spark-paper,#fff) !important");
    expect(css).toContain("scroll-snap-type:x proximity");
    expect(css).toContain("font-size:9.75px !important");
    expect(css).toContain("width:16px !important");
    expect(css).toContain("inset -34px 0 28px -24px");
  });
});


test("subject overview clamps impossible lesson totals before display", () => {
  const subjectOverview = read("components/learning/SubjectDashboardOverview.jsx");
  expect(subjectOverview).toContain("const displayCompleted = total > 0 ? Math.min(Math.max(0, completed), total)");
  expect(subjectOverview).toContain("const percent = Math.min(100, Math.max(0, rawPercent))");
  expect(subjectOverview).toContain("{displayCompleted} of {total || 0} topic lessons complete");
});


test("booking calendar and iPhone push guidance support the mobile glass pass", () => {
  const calendarCss = read("components/booking/bookingDatePicker.css");
  const pushSettings = read("components/notifications/PushNotificationSettings.jsx");
  const notificationCss = read("components/notifications/notificationCenter.css");

  expect(calendarCss).toContain('html[data-glass="true"] .booking-date-popover');
  expect(calendarCss).toContain("backdrop-filter:blur(22px) saturate(160%)");
  expect(pushSettings).toContain("Install SPARK first on iPhone");
  expect(pushSettings).toContain("Add to Home Screen");
  expect(pushSettings).toContain("push-ios-install-steps");
  expect(notificationCss).toContain(".push-ios-install-steps");
  expect(notificationCss).toContain('html[data-glass="true"] .notification-item');
});
