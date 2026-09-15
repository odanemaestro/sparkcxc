const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, "..", relative), "utf8");

describe("SPARK Study and Practice button system V2.5.9", () => {
  test("global semantic button stylesheet is loaded once from App", () => {
    const app = read("src/App.js");
    const css = read("src/sparkStudyPracticeButtonsV259.css");
    expect(app).toContain('import "./sparkStudyPracticeButtonsV259.css";');
    expect(css).toContain("SPARK STUDY + PRACTICE BUTTON SYSTEM V2.5.9");
    expect(css).toContain("--spark-btn-navy:");
    expect(css).toContain("--spark-btn-green:");
  });

  test("Mathematics practice maps forward actions to green and exam controls to navy", () => {
    const css = read("src/sparkStudyPracticeButtonsV259.css");
    expect(css).toMatch(/\.practice-primary[\s\S]*background:\s*var\(--spark-btn-green\)/);
    expect(css).toMatch(/\.paper-next[\s\S]*background:\s*var\(--spark-btn-navy\)/);
    expect(css).toMatch(/\.paper-submit-top[\s\S]*background:\s*var\(--spark-btn-navy\)/);
    expect(css).toContain(".paper-nav-grid button.current");
    expect(css).toContain(".paper-nav-grid button.answered:not(.current)");
  });

  test("Physics Paper 1 and resources follow the same semantic hierarchy", () => {
    const css = read("src/sparkStudyPracticeButtonsV259.css");
    expect(css).toContain(".phy-p1-primary");
    expect(css).toContain(".phy-p1-submit-side");
    expect(css).toContain(".phy-p1-question-nav button.active");
    expect(css).toContain(".phy-p1-question-nav button.answered:not(.active)");
    expect(css).toContain(".physics-resource-primary");
    expect(css).toContain(".physics-resource-secondary");
    expect(css).toContain(".psv-back");
  });

  test("navigation and support controls use coloured soft navy surfaces instead of plain white", () => {
    const css = read("src/sparkStudyPracticeButtonsV259.css");
    expect(css).toMatch(/\.practice-secondary[\s\S]*background:\s*var\(--spark-btn-navy-soft\)/);
    expect(css).toContain(".paper-text-button");
    expect(css).toContain(".paper2-back-control");
    expect(css).toContain(".physics-resource-back");
  });

  test("disabled, focus and reduced-motion states are explicitly covered", () => {
    const css = read("src/sparkStudyPracticeButtonsV259.css");
    expect(css).toContain("--spark-btn-disabled-bg:");
    expect(css).toContain(":focus-visible");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  test("notification heading and master toggle use concise product language", () => {
    const source = read("src/components/notifications/PushNotificationSettings.jsx");
    expect(source).toContain("<h3>Notifications</h3>");
    expect(source).toContain("<strong>Allow notifications</strong>");
    expect(source).not.toContain("<h3>Phone notifications</h3>");
    expect(source).not.toContain("<strong>Allow phone notifications</strong>");
  });
});
