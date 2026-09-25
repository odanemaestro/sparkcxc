const fs = require("fs");
const path = require("path");

const panel = fs.readFileSync(path.join(__dirname, "components", "learning", "LearnerIntelligencePanel.jsx"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "components", "learning", "learnerIntelligencePanel.css"), "utf8");

describe("SPARK learner intelligence duration numerals V1", () => {
  test("activity durations keep Atkinson for the UI but use conventional zero glyphs for minute values", () => {
    expect(panel).toContain('className="spark-li-duration-number">{primary.expectedMinutes}</span>-minute activity');
    expect(panel).toContain('className="spark-li-duration-number">{recommendation.expectedMinutes}</span>&nbsp;min');
    expect(css).toContain(".spark-li-duration-number");
    expect(css).toContain('font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif');
    expect(css).toContain(".spark-li-target-meta>span{");
    expect(css).toContain(".spark-li-target-meta .spark-li-duration-number{");
    expect(css).not.toContain(".spark-li-target-meta span{");
  });

  test("learner intelligence UI has no known mojibake placeholders", () => {
    expect(panel).not.toContain("â€”");
    expect(panel).not.toContain("Openingâ€¦");
    expect(panel).toContain('"Opening..."');
    expect(panel).toContain('"N/A"');
  });
});
