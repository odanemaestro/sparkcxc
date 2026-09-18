const fs = require("fs");
const path = require("path");

describe("Information Technology action button consistency", () => {
  const courseCss = fs.readFileSync(
    path.join(__dirname, "components", "informationTechnology.css"),
    "utf8"
  );
  const practiceCss = fs.readFileSync(
    path.join(__dirname, "practice", "informationTechnologyPractice.css"),
    "utf8"
  );

  test("Paper 01 and Paper 02 Flag question buttons use the light navy treatment", () => {
    expect(practiceCss).toContain("SPARK IT V2.11 light navy action controls");
    expect(practiceCss).toContain(".it-flag-question{");
    expect(practiceCss).toContain("background:rgba(23,55,94,.09)");
    expect(practiceCss).toContain("color:#17375e");
    expect(practiceCss).toContain(".it-flag-question.active{");
  });

  test("Study answer reveal controls use the same light navy treatment", () => {
    expect(courseCss).toContain("SPARK IT V2.11 light navy action controls");
    expect(courseCss).toContain(".it-answer-all,");
    expect(courseCss).toContain(".it-answer-toggle{");
    expect(courseCss).toContain("background:rgba(23,55,94,.09)");
    expect(courseCss).toContain("color:#17375e");
  });
});
