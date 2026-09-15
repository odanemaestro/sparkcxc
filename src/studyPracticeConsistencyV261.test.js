import {
  normalizeSparkActionText,
  classifySparkStudyPracticeAction,
} from "./studyPracticeSemanticsV261";

const fs = require("fs");
const path = require("path");

describe("SPARK Study + Practice consistency V2.6.1", () => {
  test("normalizes visual arrows without changing action wording", () => {
    expect(normalizeSparkActionText("← Back to Physics")).toBe("Back to Physics");
    expect(normalizeSparkActionText("Open Physics ↗")).toBe("Open Physics");
  });

  test.each([
    ["Open Mathematics", "", "", "forward"],
    ["Open Physics ↗", "", "", "forward"],
    ["Open adaptive practice", "practice-secondary", "", "forward"],
    ["Open Formula List", "", "", "forward"],
    ["Open full Section E study tools", "", "", "forward"],
    ["Start examination", "", "", "forward"],
    ["Resume paper", "", "", "forward"],
    ["Continue review", "", "", "forward"],
  ])("%s is a forward-learning action", (text, classes, context, expected) => {
    expect(classifySparkStudyPracticeAction(text, classes, context)).toBe(expected);
  });

  test.each([
    ["← Back to Physics", "", "", "nav"],
    ["← Back to Practice", "", "", "nav"],
    ["Physical Constants", "", "", "nav"],
    ["Formula sheet", "", "", "nav"],
    ["Change subject", "", "", "nav"],
    ["Previous", "", "", "nav"],
    ["Back", "", "Choose a subject Practice", "nav"],
  ])("%s is navigation/support", (text, classes, context, expected) => {
    expect(classifySparkStudyPracticeAction(text, classes, context)).toBe(expected);
  });

  test.each([
    ["Next question", "", "", "exam"],
    ["Submit paper", "", "", "exam"],
    ["Next", "paper-next", "", "exam"],
  ])("%s is a deliberate exam control", (text, classes, context, expected) => {
    expect(classifySparkStudyPracticeAction(text, classes, context)).toBe(expected);
  });

  test("unrelated controls are not recoloured", () => {
    expect(classifySparkStudyPracticeAction("Save profile", "settings-button", "Account settings")).toBeNull();
    expect(classifySparkStudyPracticeAction("Cancel booking", "booking-button", "My bookings")).toBeNull();
  });

  test("CSS keeps active Physics and Workbook selectors green", () => {
    const css = fs.readFileSync(
      path.join(__dirname, "sparkStudyPracticeConsistencyV261.css"),
      "utf8"
    );
    expect(css).toMatch(/\.physics-mechanics \.pm-topics \.pm-topic-btn\.active[\s\S]*background:\s*var\(--spark-v261-green\)/);
    expect(css).toContain(".pcl-shell nav button.active");
    expect(css).toMatch(/\.physics-resource-tabs button\.active[\s\S]*background:\s*var\(--spark-v261-green\)/);
    expect(css).toMatch(/\.physics-workbook-topic-list button\.active[\s\S]*background:\s*var\(--spark-v261-green\)/);
  });

  test("CSS explicitly covers legacy Back to Physics class families", () => {
    const css = fs.readFileSync(
      path.join(__dirname, "sparkStudyPracticeConsistencyV261.css"),
      "utf8"
    );
    expect(css).toContain(".physics-mechanics .pm-btn.secondary");
    expect(css).toContain(".pcl-btn.secondary");
    expect(css).toMatch(/\.pcl-btn\.secondary[\s\S]*background:\s*var\(--spark-v261-navy-soft\)/);
  });

  test("App loads V2.6.1 semantics and CSS after the V2.5.9 system", () => {
    const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
    const oldIndex = app.indexOf('import "./sparkStudyPracticeButtonsV259.css";');
    const cssIndex = app.indexOf('import "./sparkStudyPracticeConsistencyV261.css";');
    const jsIndex = app.indexOf('import "./studyPracticeSemanticsV261";');
    expect(oldIndex).toBeGreaterThanOrEqual(0);
    expect(cssIndex).toBeGreaterThan(oldIndex);
    expect(jsIndex).toBeGreaterThan(cssIndex);
  });
});
