const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(path.join(__dirname, "practiceExam.css"), "utf8");

describe("SPARK V5.3.9L5 dark marking guide contrast", () => {
  test("M A B ECF legend badges are larger and bold", () => {
    expect(css).toContain(".paper2-mab-legend b{min-width:38px;height:30px");
    expect(css).toContain("font-size:13px;font-weight:900");
  });

  test("dark mode gives legend badges a high-contrast treatment", () => {
    expect(css).toContain('[data-theme="dark"] .paper2-mab-legend b{background:#d9fbf4;color:#064e49;border-color:#6ee7d2');
    expect(css).toContain("font-weight:950");
  });

  test("dark mode rubric mark codes use the same accessible contrast family", () => {
    expect(css).toContain('[data-theme="dark"] .paper2-mark-code{background:#d9fbf4;color:#064e49;border:1px solid #6ee7d2;font-weight:900}');
  });

  test("dark mode ECF badge remains easy to read", () => {
    expect(css).toContain('[data-theme="dark"] .paper2-ecf-badge{background:#d9fbf4;color:#064e49;border:1px solid #6ee7d2;font-weight:900}');
  });
});
