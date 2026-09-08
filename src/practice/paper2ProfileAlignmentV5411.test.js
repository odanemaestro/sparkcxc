const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(path.join(__dirname, "practiceExam.css"), "utf8");

describe("SPARK V5.4.1.3 Paper 2 result-callout alignment", () => {
  test("profile summary uses the exact same 1120px outer width as the review card", () => {
    expect(css).toContain(".paper2-profile-summary{max-width:1120px;box-sizing:border-box;margin:0 auto 18px;");
    expect(css).toContain(".paper2-review-shell{max-width:1120px}");
  });

  test("ECF summary uses the exact same 1120px result width", () => {
    expect(css).toContain(".paper2-ecf-summary{max-width:1120px;box-sizing:border-box;margin:0 auto 18px;");
  });

  test("mobile margins remain preserved", () => {
    expect(css).toContain(".paper2-profile-summary{margin-left:14px;margin-right:14px}");
    expect(css).toContain(".paper2-ecf-summary{margin-left:14px;margin-right:14px}");
  });
});
