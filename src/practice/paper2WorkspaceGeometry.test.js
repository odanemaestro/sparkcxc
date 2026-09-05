import { circleCircleIntersections, collectConstructionSnapPoints, nearestSnapPoint, segmentCircleIntersections, snapValue } from "./paper2WorkspaceGeometry";

describe("Paper 2 workspace geometry precision", () => {
  test("snaps values to the requested mathematical increment", () => {
    expect(snapValue(10.47, 0.5)).toBe(10.5);
    expect(snapValue(2.024, 0.05)).toBe(2);
    expect(snapValue(2.026, 0.05)).toBe(2.05);
  });

  test("finds the intersections of two equal compass circles", () => {
    const points = circleCircleIntersections({ cx: 0, cy: 0, r: 6 }, { cx: 6, cy: 0, r: 6 });
    expect(points).toHaveLength(2);
    expect(points[0].x).toBeCloseTo(3, 8);
    expect(Math.abs(points[0].y)).toBeCloseTo(3 * Math.sqrt(3), 8);
  });

  test("finds segment-circle intersections within the segment bounds", () => {
    const points = segmentCircleIntersections({ x1: 0, y1: 0, x2: 10, y2: 0 }, { cx: 5, cy: 0, r: 2 });
    expect(points.map(point => point.x).sort((a, b) => a - b)).toEqual([3, 7]);
  });

  test("construction snap candidates include endpoints, centres and intersections", () => {
    const candidates = collectConstructionSnapPoints([
      { kind: "segment", x1: 0, y1: 0, x2: 8, y2: 0 },
      { kind: "circle", cx: 0, cy: 0, r: 6 },
      { kind: "circle", cx: 6, cy: 0, r: 6 },
    ]);
    expect(candidates.some(point => Math.abs(point.x - 3) < 1e-8 && Math.abs(Math.abs(point.y) - 3 * Math.sqrt(3)) < 1e-8)).toBe(true);
    expect(nearestSnapPoint({ x: 3.08, y: 5.18 }, candidates, 0.25)).not.toBeNull();
  });
});
