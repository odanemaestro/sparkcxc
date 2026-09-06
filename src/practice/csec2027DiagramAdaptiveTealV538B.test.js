const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), "utf8");

describe("SPARK V5.3.8B diagram and adaptive icon polish", () => {
  test("Paper C circle-theorem diagram has enough vertical viewBox room for the full circle", () => {
    const paper = JSON.parse(read("practice", "data", "csec2027", "csec-p2027-practice-C.json"));
    const part = paper.questions
      .flatMap((q) => q.parts || [])
      .find((p) => String(p.prompt || "").includes("LM is produced to P"));
    expect(part).toBeTruthy();
    expect(part.diagram.svg).toContain('viewBox="0 0 267 185"');
    expect(part.diagram.svg).not.toContain('viewBox="0 0 267 158"');
  });

  test("Adaptive Practice uses the SPARK teal icon treatment instead of purple", () => {
    const css = read("practice", "practiceExam.css");
    const theme = read("theme.css");
    expect(css).toContain('.adaptive-icon{background:var(--paper-teal);color:#fff;box-shadow:0 10px 24px rgba(13,148,136,.22);font-family:inherit;font-size:31px}');
    expect(css).not.toContain('.adaptive-icon{background:#7c5cff');
    expect(theme).toContain('html[data-theme="dark"] .adaptive-icon{background:var(--spark-teal) !important;color:#07111f !important}');
    expect(theme).not.toContain('html[data-theme="dark"] .adaptive-icon{background:var(--spark-purple)');
  });
});
