const fs = require("fs");
const path = require("path");

describe("Set goal text action wrapping", () => {
  test("keeps compact goal actions on one line", () => {
    const css = fs.readFileSync(path.join(__dirname, "index.css"), "utf8");
    expect(css).toContain("SPARK_SET_GOAL_NOWRAP_V1");
    expect(css).toMatch(/\.spark-text-action\{[^}]*white-space:nowrap;[^}]*flex-shrink:0/);
  });
});
