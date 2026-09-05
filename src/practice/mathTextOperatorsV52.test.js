import { formatMathHtml } from "./MathText";

describe("MathText comparison operators V5.2", () => {
  test("normalizes ASCII comparison shortcuts before HTML escaping", () => {
    expect(formatMathHtml("x <= 4")).toContain("x ≤ 4");
    expect(formatMathHtml("y >= -2")).toContain("y ≥ -2");
    expect(formatMathHtml("a != b")).toContain("a ≠ b");
    expect(formatMathHtml("x <= 4")).not.toContain("&lt;=");
  });

  test("still escapes genuine less-than and greater-than text safely", () => {
    expect(formatMathHtml("x < 4")).toContain("x &lt; 4");
    expect(formatMathHtml("x > 4")).toContain("x &gt; 4");
  });
});
