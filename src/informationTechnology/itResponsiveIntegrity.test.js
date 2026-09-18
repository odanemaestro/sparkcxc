const fs = require("fs");
const path = require("path");

describe("Information Technology responsive layout contract", () => {
  const practiceCss = fs.readFileSync(
    path.join(__dirname, "practice", "informationTechnologyPractice.css"),
    "utf8"
  );
  const courseCssPath = path.join(__dirname, "components", "informationTechnology.css");
  const courseCss = fs.existsSync(courseCssPath) ? fs.readFileSync(courseCssPath, "utf8") : "";

  test("practice UI contains the final tablet and phone breakpoints", () => {
    expect(practiceCss).toContain("SPARK IT V2.8 final responsive polish");
    expect(practiceCss).toContain("@media (max-width:900px)");
    expect(practiceCss).toContain("@media (max-width:560px)");
    expect(practiceCss).toContain(".it-question-grid");
    expect(practiceCss).toContain(".it-fillable-response-table:not(.compact)");
  });

  test("mobile Paper 2 fillable tables become stacked answer controls", () => {
    expect(practiceCss).toContain('td:nth-child(1)::before{content:"Input"}');
    expect(practiceCss).toContain('td:nth-child(2)::before{content:"Process"}');
    expect(practiceCss).toContain('td:nth-child(3)::before{content:"Output"}');
  });

  test("course UI contains responsive lesson navigation when course CSS is present", () => {
    if (!courseCss) return;
    expect(courseCss).toContain("SPARK IT V2.8 final responsive polish");
    expect(courseCss).toContain(".it-learning-flow");
    expect(courseCss).toContain("overflow-x:auto");
  });
});
