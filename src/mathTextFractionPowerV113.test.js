import fs from "fs";
import path from "path";
import { formatMathHtml } from "./practice/MathText";

describe("MathText fraction power presentation V11.3", () => {
  test("negative-index rule keeps the denominator power inside the fraction", () => {
    const html = formatMathHtml("a⁻ⁿ = 1/aⁿ, for a ≠ 0 and n > 0.");
    expect(html).toContain("a<sup>−n</sup>");
    expect(html).toContain('<span class="frac">');
    expect(html).toContain('<span class="fnum">1</span>');
    expect(html).toContain('<span class="fden">a<sup>n</sup></span>');
  });

  test("powered numerator and denominator remain valid stacked mathematics", () => {
    const html = formatMathHtml("x²/y³");
    expect(html).toContain('<span class="frac">');
    expect(html).toContain("x<sup>2</sup>");
    expect(html).toContain("y<sup>3</sup>");
  });

  test("fraction CSS gives powered denominators clearance from the rule", () => {
    const css = fs.readFileSync(path.join(__dirname, "practice", "mathText.css"), "utf8");
    expect(css).toContain("SPARK V11.3 FRACTION POWER CLEARANCE");
    expect(css).toContain(".spark-math .frac .fden sup");
    expect(css).toContain(".spark-math .frac .fden sup{\n  vertical-align:.42em;");
    expect(css).toContain("padding-top:.34em");
  });
});
