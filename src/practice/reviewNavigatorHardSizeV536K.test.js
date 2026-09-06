const fs = require("fs");
const path = require("path");

describe("SPARK V5.3.6K hard-sized review navigator", () => {
  const css = fs.readFileSync(path.join(__dirname, "practiceExam.css"), "utf8");
  const paper2 = fs.readFileSync(path.join(__dirname, "Paper2Exam.jsx"), "utf8");
  const paper2027 = fs.readFileSync(path.join(__dirname, "Paper2027ModuleExam.jsx"), "utf8");

  test("Paper 2 and 2027 review number groups use the dedicated compact class", () => {
    expect(paper2).toContain('className="paper-review-number-group"');
    expect(paper2027).toContain('className="paper-review-number-group"');
  });

  test("review number buttons have hard width and height caps", () => {
    expect(css).toContain("SPARK REVIEW NAVIGATOR HARD SIZE FIX V5.3.6K");
    expect(css).toContain(".paper2-review-nav > .paper-review-number-group > button");
    expect(css).toContain("width:46px!important");
    expect(css).toContain("height:46px!important");
    expect(css).toContain("max-width:46px!important");
    expect(css).toContain("max-height:46px!important");
  });

  test("phone review controls stay compact", () => {
    expect(css).toContain("width:42px!important");
    expect(css).toContain("height:42px!important");
  });
});
