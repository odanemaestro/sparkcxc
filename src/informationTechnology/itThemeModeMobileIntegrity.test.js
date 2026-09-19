const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(
  path.join(__dirname, "components", "informationTechnology.css"),
  "utf8"
);

describe("Information Technology theme-mode integrity", () => {
  test("explicit SPARK dark-mode selectors remain available", () => {
    expect(css).toContain('html[data-theme="dark"] .it-subject-view');
    expect(css).toContain('body[data-theme="dark"] .it-subject-view');
  });

  test("device prefers-color-scheme cannot override an explicit SPARK light selection", () => {
    expect(css).not.toMatch(
      /@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)[\s\S]{0,300}\.it-subject-view[\s\S]{0,300}--it-page\s*:\s*#0f1720/i
    );
  });
});
