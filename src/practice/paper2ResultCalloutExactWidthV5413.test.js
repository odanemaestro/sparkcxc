const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(path.join(__dirname, "practiceExam.css"), "utf8");

describe("SPARK V5.4.1.3 exact Paper 2 result-card width", () => {
  test("profile summary outer width exactly matches the review shell", () => {
    expect(css).toContain(".paper2-review-shell{max-width:1120px}");
    expect(css).toContain(".paper2-profile-summary{max-width:1120px;box-sizing:border-box;margin:0 auto 18px;");
  });

  test("ECF summary uses the same exact width", () => {
    expect(css).toContain(".paper2-ecf-summary{max-width:1120px;box-sizing:border-box;margin:0 auto 18px;");
  });

  test("the old 1174px workaround is gone", () => {
    expect(css).not.toContain(".paper2-profile-summary{max-width:1174px");
    expect(css).not.toContain(".paper2-ecf-summary{max-width:1174px");
  });
});
