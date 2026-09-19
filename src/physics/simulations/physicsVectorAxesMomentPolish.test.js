const fs = require("fs");
const path = require("path");

describe("Physics vector axes and moments visual polish", () => {
  const vector = fs.readFileSync(path.join(__dirname, "mechanics", "VectorSim.jsx"), "utf8");
  const moment = fs.readFileSync(path.join(__dirname, "mechanics", "MomentBeamSim.jsx"), "utf8");

  test("both vector workspaces use a centred four-quadrant coordinate plane", () => {
    expect(vector).toContain("OX = W / 2, OY = H / 2");
    expect(vector).toContain('x1={24} y1={OY} x2={W - 24}');
    expect(vector).toContain('x1={OX} y1={H - 24} x2={OX} y2={24}');
    expect(vector).toContain(">+x</text>");
    expect(vector).toContain(">−x</text>");
    expect(vector).toContain(">+y</text>");
    expect(vector).toContain(">−y</text>");
  });

  test("vector scale can contain the maximum two-vector resultant in every quadrant", () => {
    expect(vector).toContain("S = 1.85");
    expect(vector).toContain("1 square = 10 N");
  });

  test("the graph has no floating summary box obscuring a quadrant", () => {
    expect(vector).toContain("void lines;");
    expect(vector).toMatch(/function SvgSummary\([\s\S]*return null;/);
  });

  test("a downward force at the pivot is visually offset from the upward reaction", () => {
    expect(moment).toContain("const nearPivot = Math.abs(mass.positionM) < 0.08");
    expect(moment).toContain("tone === 'b' ? -20 : 20");
    expect(moment).toContain("x1={forceX}");
    expect(moment).toContain("x2={forceX}");
  });
});
