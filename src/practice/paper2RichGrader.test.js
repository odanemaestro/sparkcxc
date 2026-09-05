import { gradePaper2Part } from "./paper2Engine";
import { matchesPaper2Concept } from "./paper2RichGrader";

function richPart(marks, responseSchema) {
  return { id: "p", marks, answer: "", responseSchema };
}

describe("SPARK Paper 2 rubric grading V5.1", () => {
  test("accepts equivalent CXC theorem wording rather than one exact sentence", () => {
    expect(matchesPaper2Concept("The angle between the tangent and chord equals the angle in the alternate segment.", "alternate_segment_theorem")).toBe(true);
    expect(matchesPaper2Concept("Co-interior angles on parallel lines are supplementary and total 180 degrees.", "cointerior_supplementary")).toBe(true);
    expect(matchesPaper2Concept("Vertically opposite angles are equal.", "vertically_opposite_equal")).toBe(true);
  });

  test("awards partial credit on a value-plus-reason part", () => {
    const part = richPart(3, {
      type: "fields",
      fields: [{ id: "value" }, { id: "reason", answerType: "reason" }],
      criteria: [
        { kind: "field", field: "reason", concept: "alternate_segment_theorem", marks: 2 },
        { kind: "field", field: "value", answer: "52", marks: 1 },
      ],
    });
    expect(gradePaper2Part({ value: "52", reason: "I used corresponding angles" }, part).marks).toBe(1);
    expect(gradePaper2Part({ value: "52", reason: "alternate segment theorem" }, part).marks).toBe(3);
  });

  test("grades three equivalent inequalities independently", () => {
    const part = richPart(3, {
      type: "fields",
      fields: [{ id: "a" }, { id: "b" }, { id: "c" }],
      criteria: [
        { kind: "field", field: "a", answer: "4x+y<=40", answerType: "inequality", marks: 1 },
        { kind: "field", field: "b", answer: "x>=3", answerType: "inequality", marks: 1 },
        { kind: "field", field: "c", answer: "y>=2x", answerType: "inequality", marks: 1 },
      ],
    });
    const result = gradePaper2Part({ a: "y <= 40 - 4x", b: "-x <= -3", c: "y >= 2x" }, part);
    expect(result.marks).toBe(3);
    expect(result.correct).toBe(true);
  });

  test("construction grading checks lengths, angle, closure and compass evidence", () => {
    const part = richPart(4, {
      type: "construction_triangle",
      target: { pq: 8, qr: 6, anglePqr: 60 },
      tolerance: { length: 0.25, angle: 2.5 },
      criteria: [
        { kind: "construction_base", marks: 1 },
        { kind: "construction_angle", marks: 1, requireCompassEvidence: true },
        { kind: "construction_side", marks: 1 },
        { kind: "construction_complete", marks: 1, requireCompassEvidence: true },
      ],
    });
    const q = { x: 8, y: 0 };
    const r = { x: 8 + 6 * Math.cos(2 * Math.PI / 3), y: 6 * Math.sin(2 * Math.PI / 3) };
    const response = { objects: [
      { kind: "segment", x1: 0, y1: 0, x2: 8, y2: 0 },
      { kind: "segment", x1: q.x, y1: q.y, x2: r.x, y2: r.y },
      { kind: "segment", x1: 0, y1: 0, x2: r.x, y2: r.y },
      { kind: "circle", cx: 8, cy: 0, r: 3 },
      { kind: "circle", cx: 5, cy: 0, r: 3 },
    ] };
    expect(gradePaper2Part(response, part).marks).toBe(4);
    expect(gradePaper2Part({ objects: response.objects.filter(item => item.kind !== "circle") }, part).marks).toBeLessThan(4);
  });

  test("graph grading checks axes, plotted points and the curve", () => {
    const part = richPart(3, {
      type: "graph",
      criteria: [
        { kind: "graph_axes", xStep: 1, yStep: 1, marks: 1 },
        { kind: "graph_points", points: [[-1, 0], [0, -3], [1, -4]], tolerance: [0.3, 0.3], minimumMatches: 3, marks: 1 },
        { kind: "graph_curve", minimumPoints: 3, smooth: true, marks: 1 },
      ],
    });
    const response = { axisXStep: 1, axisYStep: 1, curve: true, points: [{ x: -1, y: 0 }, { x: 0, y: -3 }, { x: 1, y: -4 }] };
    expect(gradePaper2Part(response, part).marks).toBe(3);
  });

  test("tile design grading checks both the shaded row and white-tile arrangement", () => {
    const part = richPart(2, {
      type: "tile_pattern",
      target: { shaded: 4, white: 10 },
      criteria: [{ kind: "tile_shaded_row", marks: 1 }, { kind: "tile_white_frame", marks: 1 }],
    });
    const cells = [];
    for (let x = 2; x <= 5; x += 1) cells.push({ x, y: 2, state: "shaded" }, { x, y: 1, state: "white" }, { x, y: 3, state: "white" });
    cells.push({ x: 1, y: 2, state: "white" }, { x: 6, y: 2, state: "white" });
    expect(gradePaper2Part({ cells }, part).marks).toBe(2);
  });
});
