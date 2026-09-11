const fs = require("fs");
const path = require("path");

describe("MathText fraction power typography V11.4", () => {
  const css = fs.readFileSync(path.join(__dirname, "practice", "mathText.css"), "utf8");

  test("powered denominators get extra clearance below the fraction bar", () => {
    expect(css).toContain(".spark-math .frac .fden{\n  padding-top:.34em;");
  });

  test("denominator superscripts use a lower explicit rise than ordinary superscripts", () => {
    expect(css).toContain(".spark-math .frac .fden sup{\n  vertical-align:.42em;");
  });

  test("numerator and denominator superscript positioning are controlled separately", () => {
    expect(css).toContain(".spark-math .frac .fnum sup{\n  vertical-align:.56em;");
    expect(css).toContain(".spark-math .frac .fden sup{\n  vertical-align:.42em;");
  });
});
