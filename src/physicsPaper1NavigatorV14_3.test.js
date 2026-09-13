const fs = require("fs");
const path = require("path");

describe("Physics Paper 1 navigator V14.3", () => {
  const root = path.resolve(__dirname);
  const exam = fs.readFileSync(path.join(root, "physics/paper1/components/PhysicsPaper1Exam.jsx"), "utf8");
  const css = fs.readFileSync(path.join(root, "physics/paper1/components/physicsPaper1.css"), "utf8");

  test("desktop navigator is on the right and mobile uses a drawer", () => {
    expect(exam).toContain("phy-p1-exam-layout");
    expect(exam).toContain("phy-p1-navigator-desktop");
    expect(exam).toContain("Question navigator");
    expect(exam).toContain("phy-p1-nav-drawer-backdrop");
    expect(css).toContain("grid-template-columns:minmax(0,1fr) 292px");
    expect(css).toContain(".phy-p1-navigator{position:sticky");
  });

  test("review back button has dedicated polished styling", () => {
    expect(exam).toContain("phy-p1-back-practice");
    expect(exam).toContain("←");
    expect(css).toContain("SPARK PHYSICS PAPER 1 NAV + BACK BUTTON POLISH V14.3");
    expect(css).toContain(".phy-p1-back-practice{display:inline-flex");
  });
});
