const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("Mathematics practice Back to Practice alignment", () => {
  const paper1 = read("practice/Paper1Exam.jsx");
  const paper2 = read("practice/Paper2Exam.jsx");
  const css = read("practice/practiceExam.css");

  test("Paper 1 and Paper 2 use the same fixed-size back-arrow treatment", () => {
    const expected = '<BackArrowIcon size={16} className="paper-back-arrow-icon"/>';
    expect(paper1).toContain(expected);
    expect(paper2).toContain(expected);
  });

  test("back button icon and text share an explicit vertical rhythm", () => {
    expect(css).toContain("SPARK_MATH_BACK_BUTTON_ALIGNMENT_V1");
    expect(css).toContain(".paper-text-button>.paper-back-arrow-icon");
    expect(css).toContain("width:16px");
    expect(css).toContain("height:16px");
    expect(css).toContain(".paper-text-button>span");
    expect(css).toContain("line-height:16px");
  });
});