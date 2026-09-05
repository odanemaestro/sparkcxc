import { formatMathHtml } from "./MathText";

describe("MathText negative exponents V5.3", () => {
  test("renders keyboard and typographic minus signs inside superscripts", () => {
    expect(formatMathHtml("3 × 10^4")).toContain("10<sup>4</sup>");
    expect(formatMathHtml("2 × 10^-7")).toContain("10<sup>−7</sup>");
    expect(formatMathHtml("2 × 10^−7")).toContain("10<sup>−7</sup>");
    expect(formatMathHtml("2 × 10^–7")).toContain("10<sup>−7</sup>");
    expect(formatMathHtml("2 × 10^—7")).toContain("10<sup>−7</sup>");
  });

  test("removes the caret from complete standard-form expressions", () => {
    const html = formatMathHtml("(3 × 10^4) × (2 × 10^−7) = 6 × 10^−3");
    expect(html).toContain("10<sup>4</sup>");
    expect(html).toContain("10<sup>−7</sup>");
    expect(html).toContain("10<sup>−3</sup>");
    expect(html).not.toContain("10^");
  });

  test("handles multi-digit negative exponents", () => {
    expect(formatMathHtml("6 × 10^−28")).toContain("10<sup>−28</sup>");
  });
});
