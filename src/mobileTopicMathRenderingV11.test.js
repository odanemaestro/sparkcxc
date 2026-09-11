import fs from "fs";
import path from "path";
import { formatMathHtml } from "./practice/MathText";
import { FLASHCARDS } from "./learning/flashcards";

describe("V11 mobile topic navigation and Mathematics rendering", () => {
  test("ordinary prose slash pairs stay inline while algebraic fractions still stack", () => {
    const prose = formatMathHtml("Brackets, Orders/indices, then powers/roots and and/or statements.");
    expect(prose).toContain("Orders/indices");
    expect(prose).toContain("powers/roots");
    expect(prose).toContain("and/or");
    expect(prose).not.toContain('class="frac"');

    expect(formatMathHtml("a/b")).toContain('class="frac"');
    expect(formatMathHtml("P/V")).toContain('class="frac"');
    expect(formatMathHtml("1/aⁿ")).toContain('class="frac"');
  });

  test("order of operations and negative-index flashcards use precise copy", () => {
    const order = FLASHCARDS.find(card => card.id === "num-001");
    const negativeIndex = FLASHCARDS.find(card => card.id === "num-004");
    expect(order?.back).toBe("Brackets, Orders (indices, powers and roots), Division and Multiplication, Addition and Subtraction. Work from left to right when operations have equal priority.");
    expect(negativeIndex?.back).toContain("a⁻ⁿ = 1/aⁿ");
    expect(negativeIndex?.back).toContain("a ≠ 0 and n > 0");
    const rendered = formatMathHtml(negativeIndex?.back);
    expect(rendered).toContain("a<sup>−n</sup>");
    expect(rendered).toContain('class="frac"');
    expect(rendered).toContain("a<sup>n</sup>");
  });

  test("subject chooser uses the same SVG arrow class as My Subjects", () => {
    const source = fs.readFileSync(path.join(__dirname, "subjects", "SubjectSelectionView.jsx"), "utf8");
    expect(source).toContain('className="spark-dashboard-card-action-icon"');
    expect(source).not.toContain("spark-subject-selection-action-icon");
    expect(source).not.toContain("↗");
  });

  test("Physics topic selectors switch to a contained two-column phone grid", () => {
    const css = fs.readFileSync(path.join(__dirname, "physics", "mechanics", "components", "physicsMechanics.css"), "utf8");
    expect(css).toContain(".physics-mechanics .pm-topics:not(.pm-flashcard-topics)");
    expect(css).toContain("grid-template-columns:repeat(2,minmax(0,1fr))");
    expect(css).toContain("white-space:normal");
    expect(css).toContain("overflow-wrap:anywhere");
    expect(css).toContain("@media(max-width:760px)");
  });
});
