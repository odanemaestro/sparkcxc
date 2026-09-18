const fs = require("fs");
const path = require("path");

describe("Information Technology navigation button consistency", () => {
  const courseCss = fs.readFileSync(path.join(__dirname, "components", "informationTechnology.css"), "utf8");
  const practiceCss = fs.readFileSync(path.join(__dirname, "practice", "informationTechnologyPractice.css"), "utf8");

  test("study Back button uses the shared light navy treatment", () => {
    expect(courseCss).toContain("SPARK IT V2.9 navigation button consistency");
    expect(courseCss).toContain(".it-back{");
    expect(courseCss).toContain("background:rgba(23,55,94,.09)");
    expect(courseCss).toContain("color:#17375e");
  });

  test("practice Back and Paper 1/Paper 2 Exit controls use the same light navy treatment", () => {
    expect(practiceCss).toContain("SPARK IT V2.9 navigation button consistency");
    expect(practiceCss).toContain(".it-practice-back,");
    expect(practiceCss).toContain(".it-exit-paper");
    expect(practiceCss).toContain("background:rgba(23,55,94,.09)");
    expect(practiceCss).toContain("color:#17375e");
  });
});
