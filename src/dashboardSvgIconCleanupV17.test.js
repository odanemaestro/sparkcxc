import fs from "fs";
import path from "path";
import { dashboardAchievementMeta } from "./components/learning/dashboardAchievementMeta";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("Dashboard SVG icon cleanup V17", () => {
  test("known milestone emojis become SVG icon metadata", () => {
    expect(dashboardAchievementMeta("🔥 Consistency Builder")).toEqual({
      title:"Consistency Builder",
      icon:"consistency",
    });
    expect(dashboardAchievementMeta("🏁 Exam Challenger")).toEqual({
      title:"Exam Challenger",
      icon:"challenge",
    });
    expect(dashboardAchievementMeta("📚 Lesson Builder")).toEqual({
      title:"Lesson Builder",
      icon:"lessonBuilder",
    });
  });

  test("shared Icon library contains the new milestone SVGs", () => {
    const icons = read("components/ui/Icon.jsx");
    expect(icons).toContain("consistency:");
    expect(icons).toContain("challenge:");
    expect(icons).toContain("lessonBuilder:");
  });

  test("dashboard renderers use milestone SVG metadata", () => {
    const overview = read("components/learning/StudentOverviewIntelligence.jsx");
    const support = read("components/learning/StudentDashboardSupportCards.jsx");
    expect(overview).toContain("dashboardAchievementMeta");
    expect(support).toContain("dashboardAchievementMeta");
    expect(overview).toContain("spark-achievement-svg");
    expect(support).toContain("spark-achievement-svg");
  });

  test("booking confirmation uses the shared calendar SVG instead of emoji", () => {
    const app = read("App.js");
    expect(app).toContain('className="booking-summary-icon"');
    expect(app).toContain('<Icon name="calendar" size={18}/>');
    expect(app).not.toContain("📅 {bookingTutor.name}");
  });
});
