import { formatMathHtml } from "./MathText";

describe("Paper 2 matrix notation V5.2.2", () => {
  test("renders matrices whose rows contain normal spaces", () => {
    const html = formatMathHtml("R = [[0, -1], [1, 0]]");
    expect(html).toContain('class="matrix"');
    expect((html.match(/class="mcell"/g) || []).length).toBe(4);
    expect(html).not.toContain("[[0, -1], [1, 0]]");
  });

  test("renders variable-valued transformation matrices", () => {
    const html = formatMathHtml("T = [[k, 0], [0, k]]");
    expect(html).toContain('class="matrix"');
    expect((html.match(/class="mcell"/g) || []).length).toBe(4);
  });
});
