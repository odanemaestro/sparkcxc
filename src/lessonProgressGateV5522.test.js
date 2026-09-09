import fs from "fs";
import path from "path";

describe("SPARK V5.5.2.2 mobile arrows and lesson progression", () => {
  const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

  test("dashboard drill-in arrows use SVG instead of an emoji-prone Unicode glyph", () => {
    const student = read("components/learning/StudentOverviewIntelligence.jsx");
    const parent = read("components/learning/ParentOverviewIntelligence.jsx");
    const css = read("learningIntelligence.css");
    expect(student).toContain('viewBox="0 0 20 20"');
    expect(parent).toContain('viewBox="0 0 20 20"');
    expect(student).not.toContain(">↗</span>");
    expect(parent).not.toContain(">↗</span>");
    expect(css).toContain(".spark-dashboard-card-action-icon svg");
  });

  test("future lessons remain locked until the current lesson is completed", () => {
    const app = read("App.js");
    expect(app).toContain("const canOpenTopic = (si, ti) =>");
    expect(app).toContain("onClick={() => navigateToTopic(si, ti)}");
    expect(app).toContain("disabled={!canOpenTopic(activeSectionIdx, index)}");
    expect(app).toContain("disabled={!canGoNext}");
    expect(app).toContain("Complete this lesson, or score 60% or higher on the practice quiz");
  });

  test("logged-in students unlock progression only after lesson completion is saved", () => {
    const app = read("App.js");
    const start = app.indexOf("const markTopicComplete = useCallback");
    const end = app.indexOf("const handleQuizComplete", start);
    const block = app.slice(start, end);
    expect(block).toContain("if (progressError)");
    expect(block).toContain("return true; // persisted completion");
    expect(block.lastIndexOf("markLocally();")).toBeGreaterThan(block.indexOf("if (progressError)"));
  });
});
