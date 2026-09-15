import { classifySparkStudyPracticeAction } from "./studyPracticeSemanticsV261";

const fs = require("fs");
const path = require("path");

describe("SPARK Study + Practice visual polish V2.6.2.1", () => {
  test("dashboard Continue subject actions retain the original text and circular-arrow treatment", () => {
    expect(
      classifySparkStudyPracticeAction("Continue Physics", "spark-dashboard-card-action", "")
    ).toBeNull();
    expect(
      classifySparkStudyPracticeAction("Continue Mathematics", "spark-dashboard-card-action", "")
    ).toBeNull();
  });

  test("other Continue learning actions still keep their forward semantic role", () => {
    expect(
      classifySparkStudyPracticeAction("Continue review", "phy-p1-primary", "")
    ).toBe("forward");
  });
  test.each([
    "Open full Section A study tools",
    "Open full Section B study tools",
    "Open full Section C study tools",
    "Open full Section D study tools",
    "Open full Section E study tools",
  ])("%s is a primary forward-learning action", text => {
    expect(classifySparkStudyPracticeAction(text, "", "")).toBe("forward");
  });

  test("primary forward actions remain solid-green semantic actions", () => {
    expect(classifySparkStudyPracticeAction("Open Formula List", "", "")).toBe("forward");
    expect(classifySparkStudyPracticeAction("Start examination", "", "")).toBe("forward");
    expect(classifySparkStudyPracticeAction("Open adaptive practice", "", "")).toBe("forward");
  });

  test("support/navigation semantics remain unchanged", () => {
    expect(classifySparkStudyPracticeAction("Back to Physics", "", "")).toBe("nav");
    expect(classifySparkStudyPracticeAction("Physical Constants", "", "")).toBe("nav");
  });

  test("visual layer contains soft-green, richer soft-navy and selected elevation", () => {
    const css = fs.readFileSync(
      path.join(__dirname, "sparkStudyPracticeVisualPolishV2621.css"),
      "utf8"
    );

    expect(css).toMatch(
      /\[data-spark-action="forward-secondary"\][\s\S]*background:\s*var\(--spark-v2621-green-soft\)/
    );
    expect(css).toContain("--spark-v2621-active-shadow:");
    expect(css).toContain("--spark-v2621-navy-soft:");
    expect(css).toContain(".physics-workbook-topic-list button.active");
  });

  test("App imports V2.6.2.1 after the V2.6.1 consistency layer", () => {
    const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
    const v261 = app.indexOf('import "./sparkStudyPracticeConsistencyV261.css";');
    const v2621 = app.indexOf('import "./sparkStudyPracticeVisualPolishV2621.css";');

    expect(v261).toBeGreaterThanOrEqual(0);
    expect(v2621).toBeGreaterThan(v261);
  });
});
