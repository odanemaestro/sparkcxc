import { classifySparkStudyPracticeAction } from "./studyPracticeSemanticsV261";

const fs = require("fs");
const path = require("path");

describe("SPARK final UI consistency V2.6.2.3", () => {
  test("Workbook top actions use the same primary-forward semantic role", () => {
    expect(classifySparkStudyPracticeAction("Open Formula List", "", "")).toBe("forward");
    expect(
      classifySparkStudyPracticeAction("Open full Section A study tools", "", "")
    ).toBe("forward");
    expect(
      classifySparkStudyPracticeAction("Open full Section E study tools", "", "")
    ).toBe("forward");
  });

  test("dashboard Continue subject cards remain outside the recolouring system", () => {
    expect(
      classifySparkStudyPracticeAction("Continue Physics", "spark-dashboard-card-action", "")
    ).toBeNull();
    expect(
      classifySparkStudyPracticeAction("Continue Mathematics", "spark-dashboard-card-action", "")
    ).toBeNull();
  });

  test("Google auth button uses the same corner radius family as Btn", () => {
    const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
    const start = app.indexOf('className="spark-google-auth-button"');
    expect(start).toBeGreaterThanOrEqual(0);
    const block = app.slice(start, start + 700);
    expect(block).toContain("borderRadius:T.rSm");
    expect(block).not.toContain("borderRadius:999");
    expect(block).toContain('padding:"12px 24px"');
  });

  test("selected Workbook labels inherit high-contrast white text", () => {
    const css = fs.readFileSync(
      path.join(__dirname, "sparkStudyPracticeVisualPolishV2621.css"),
      "utf8"
    );
    expect(css).toContain(".physics-resource-tabs button.active *");
    expect(css).toMatch(
      /\.physics-resource-tabs button\.active \*[\s\S]*color:\s*#fff\s*!important/
    );
  });
});
