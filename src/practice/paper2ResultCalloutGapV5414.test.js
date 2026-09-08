const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(path.join(__dirname, "practiceExam.css"), "utf8");

describe("SPARK V5.4.1.4 Paper 2 result callout spacing", () => {
  test("the first profile callout has breathing room below the score hero", () => {
    expect(css).toContain(".paper2-score-hero + .paper2-profile-summary,");
    expect(css).toContain(".paper2-score-hero + .paper2-ecf-summary{margin-top:18px}");
  });

  test("profile and ECF cards retain the exact 1120px review width", () => {
    expect(css).toContain(".paper2-profile-summary{max-width:1120px;box-sizing:border-box;margin:0 auto 18px;");
    expect(css).toContain(".paper2-ecf-summary{max-width:1120px;box-sizing:border-box;margin:0 auto 18px;");
  });

  test("spacing is only applied when a callout directly follows the score hero", () => {
    expect(css).not.toContain("\n.paper2-profile-summary{margin-top:18px}");
    expect(css).not.toContain("\n.paper2-ecf-summary{margin-top:18px}");
  });
});
