import fs from "fs";
import path from "path";
import { formatMathHtml } from "./practice/MathText";

describe("SPARK V5.5.2 flashcard mathematics", () => {
  test("renders Unicode negative indices and a powered denominator as mathematical structure", () => {
    const html = formatMathHtml("a⁻ⁿ = 1/aⁿ, for a ≠ 0.");
    expect(html).toContain("<sup>−n</sup>");
    expect(html).toContain('class="frac"');
    expect(html).toContain("a<sup>n</sup>");
    expect(html).toContain("≠");
  });

  test("renders coordinate subscripts and a gradient as a stacked fraction", () => {
    const html = formatMathHtml("m = (y₂ − y₁)/(x₂ − x₁).");
    expect(html).toContain('class="frac"');
    expect(html).toContain("y<sub>2</sub>");
    expect(html).toContain("x<sub>1</sub>");
  });

  test("keeps unsafe markup escaped while formatting mathematics", () => {
    const html = formatMathHtml("<script>alert(1)</script> and x²");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("x<sup>2</sup>");
  });
});

describe("SPARK V5.5.2 dashboard polish integration", () => {
  const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

  test("flashcards route both question and answer through MathText", () => {
    const source = read("components/learning/FlashcardsPanel.jsx");
    expect(source).toContain('import MathText from "../../practice/MathText"');
    expect(source).toContain('className="spark-flashcard-question spark-flashcard-math"');
    expect(source).toContain('className="spark-flashcard-answer spark-flashcard-math"');
  });

  test("student and parent overview cards use the slanted-arrow drill-in action", () => {
    const student = read("components/learning/StudentOverviewIntelligence.jsx");
    const parent = read("components/learning/ParentOverviewIntelligence.jsx");
    expect(student).toContain("spark-dashboard-card-action-icon");
    expect(student).toContain("↗");
    expect(parent).toContain("spark-dashboard-card-action-icon");
    expect(parent).toContain("↗");
  });

  test("dashboard CSS includes polished card, flashcard and accessible focus states", () => {
    const css = read("learningIntelligence.css");
    expect(css).toContain("V5.5.2 — mathematical flashcards + dashboard interaction polish");
    expect(css).toContain(".spark-dashboard-card-action-icon");
    expect(css).toContain(".spark-flashcard-question.spark-math-prose");
    expect(css).toContain(":focus-visible");
  });
});
