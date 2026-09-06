// ============================================================================
// geometry.js - marking ruler-and-compasses constructions.
//
// Almost no online test marks constructions at all; the question is dropped,
// or a photograph is sent to a human.  But the CXC mark scheme for a
// construction is mechanical, and it hangs on one thing above the finished
// drawing:
//
//     "construction arcs must be clearly shown"
//
// That is a mark in its own right, and it is the mark that separates a
// construction from a sketch.  So the pad records the compass arcs as data -
// centre, radius, the sweep actually drawn - and this file checks them:
//
//   * the arcs are centred where the method requires
//   * the pair of arcs that must be equal really are equal
//   * the radius is large enough for the arcs to meet
//   * the finished line or angle is accurate
//
// A candidate who measures the angle with a protractor and rules the line gets
// the accuracy mark and loses the construction mark, exactly as on paper.
//
// Angles are in degrees. Lengths are in the same units as the drawing.
// ============================================================================

const TAU = Math.PI * 2;

export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/** Angle at B in the path A-B-C, in degrees, always 0..180. */
export function angleAt(b, a, c) {
  const u = Math.atan2(a.y - b.y, a.x - b.x);
  const v = Math.atan2(c.y - b.y, c.x - b.x);
  let d = Math.abs((u - v) * 180 / Math.PI) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

/** Is the point on the arc's drawn sweep, not merely on its circle? */
function onSweep(arc, p) {
  if (arc.start === undefined || arc.end === undefined) return true;
  let a = Math.atan2(p.y - arc.cy, p.x - arc.cx) * 180 / Math.PI;
  const norm = t => ((t % 360) + 360) % 360;
  a = norm(a);
  const s = norm(arc.start);
  const e = norm(arc.end);
  const slack = 6;
  return s <= e
    ? a >= s - slack && a <= e + slack
    : a >= s - slack || a <= e + slack;
}

/** Every arc the student drew centred (within tolerance) at this point. */
export function arcsAt(arcs = [], centre, tol = 0.6) {
  return arcs.filter(a => Math.hypot(a.cx - centre.x, a.cy - centre.y) <= tol);
}

/** The two points where two circles cross, or [] if they do not. */
export function circleIntersections(a, b) {
  const d = Math.hypot(b.cx - a.cx, b.cy - a.cy);
  if (d === 0 || d > a.r + b.r || d < Math.abs(a.r - b.r)) return [];
  const x = (d * d - b.r * b.r + a.r * a.r) / (2 * d);
  const h2 = a.r * a.r - x * x;
  if (h2 < 0) return [];
  const h = Math.sqrt(h2);
  const ux = (b.cx - a.cx) / d;
  const uy = (b.cy - a.cy) / d;
  const mx = a.cx + x * ux;
  const my = a.cy + x * uy;
  return [
    { x: mx - h * uy, y: my + h * ux },
    { x: mx + h * uy, y: my - h * ux },
  ];
}

/** Distance from a point to the infinite line through a and b. */
export function pointToLine(p, a, b) {
  const len = dist(a, b);
  if (!len) return dist(p, a);
  return Math.abs((b.x - a.x) * (a.y - p.y) - (a.x - p.x) * (b.y - a.y)) / len;
}

/** Does any drawn segment lie along the line through P and Q? */
export function segmentAlong(segments = [], p, q, tol = 0.5) {
  return segments.find(s =>
    pointToLine(s.a, p, q) <= tol && pointToLine(s.b, p, q) <= tol
    && dist(s.a, s.b) > tol * 3);
}

/** Does any drawn segment join these two points? */
export function segmentJoining(segments = [], p, q, tol = 0.6) {
  return segments.find(s =>
    (dist(s.a, p) <= tol && dist(s.b, q) <= tol)
    || (dist(s.a, q) <= tol && dist(s.b, p) <= tol));
}

// ---------------------------------------------------------------------------
// the standard constructions
// ---------------------------------------------------------------------------

/**
 * Perpendicular bisector of AB.
 * Method: equal arcs from A and from B, radius more than half AB, meeting
 * above and below; the line through the two meeting points.
 */
export function checkPerpendicularBisector(work, A, B, { tol = 0.6 } = {}) {
  const half = dist(A, B) / 2;
  const fromA = arcsAt(work.arcs, A, tol);
  const fromB = arcsAt(work.arcs, B, tol);
  const pair = [];
  for (const a of fromA) {
    for (const b of fromB) {
      if (Math.abs(a.r - b.r) <= tol && a.r > half + tol * 0.2) pair.push([a, b]);
    }
  }
  const arcsShown = pair.length > 0;

  const mid = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
  const dir = { x: -(B.y - A.y), y: B.x - A.x };
  const far = { x: mid.x + dir.x, y: mid.y + dir.y };
  const line = segmentAlong(work.segments, mid, far, tol);

  const accurate = Boolean(line)
    && pointToLine(mid, line.a, line.b) <= tol
    && Math.abs(angleAt(mid, A, nearestOn(line, mid)) - 90) <= 3;

  return {
    ok: arcsShown && accurate,
    arcsShown,
    lineDrawn: Boolean(line),
    accurate,
    why: !arcsShown ? ((work.arcs || []).length
      ? "compass arcs were drawn, but they are not the required equal-radius arcs centred at A and B"
      : "the construction arcs from A and B are not shown")
      : !line ? ((work.segments || []).length
        ? "a straightedge line was drawn, but it is not the perpendicular bisector"
        : "the bisector has not been drawn")
        : !accurate ? "the line drawn is not the perpendicular bisector"
          : "correct construction",
  };
}

function nearestOn(seg, p) {
  const vx = seg.b.x - seg.a.x;
  const vy = seg.b.y - seg.a.y;
  const len2 = vx * vx + vy * vy || 1;
  const t = ((p.x - seg.a.x) * vx + (p.y - seg.a.y) * vy) / len2;
  const u = t + (Math.abs(t) < 0.5 ? 0.5 : -0.5);
  return { x: seg.a.x + u * vx, y: seg.a.y + u * vy };
}

/**
 * Bisector of the angle at V between the rays VP and VQ.
 * Method: one arc centred at V cutting both arms, then equal arcs from those
 * two crossing points, then the line from V through where they meet.
 */
export function checkAngleBisector(work, V, P, Q, { tol = 0.6 } = {}) {
  const atV = arcsAt(work.arcs, V, tol);
  const armArc = atV.find(a => a.r > tol * 2 && a.r < Math.min(dist(V, P), dist(V, Q)) + tol);
  let feetOk = false;
  let feet = null;
  if (armArc) {
    feet = [rayPoint(V, P, armArc.r), rayPoint(V, Q, armArc.r)];
    const f1 = arcsAt(work.arcs, feet[0], tol);
    const f2 = arcsAt(work.arcs, feet[1], tol);
    feetOk = f1.some(a => f2.some(b => Math.abs(a.r - b.r) <= tol));
  }

  const target = bisectorDirection(V, P, Q);
  const line = segmentAlong(work.segments, V, target, tol);
  const wanted = angleAt(V, P, Q) / 2;
  let accurate = false;
  if (line) {
    const other = dist(line.a, V) > dist(line.b, V) ? line.a : line.b;
    accurate = Math.abs(angleAt(V, P, other) - wanted) <= 2.5;
  }

  return {
    ok: Boolean(armArc) && feetOk && accurate,
    arcsShown: Boolean(armArc) && feetOk,
    lineDrawn: Boolean(line),
    accurate,
    why: !armArc ? "no arc centred at the vertex cutting both arms"
      : !feetOk ? "the two equal arcs from where that arc cuts the arms are not shown"
        : !line ? "the bisector has not been drawn"
          : !accurate ? "the line drawn does not bisect the angle"
            : "correct construction",
  };
}

function rayPoint(from, towards, r) {
  const d = dist(from, towards) || 1;
  return { x: from.x + ((towards.x - from.x) / d) * r,
           y: from.y + ((towards.y - from.y) / d) * r };
}

function bisectorDirection(V, P, Q) {
  const p = rayPoint(V, P, 1);
  const q = rayPoint(V, Q, 1);
  return { x: V.x + (p.x - V.x + q.x - V.x), y: V.y + (p.y - V.y + q.y - V.y) };
}

/**
 * An angle of 60, 90, 30 or 45 degrees constructed at V on the ray VA.
 * 60 and 90 are the two primitive constructions; 30 and 45 are those bisected,
 * so the check is the same one applied twice.
 */
export function checkConstructedAngle(work, V, A, target, { tol = 0.6 } = {}) {
  const atV = arcsAt(work.arcs, V, tol);
  const rays = (work.segments || []).filter(s =>
    dist(s.a, V) <= tol || dist(s.b, V) <= tol);
  const measured = rays.map(s => {
    const far = dist(s.a, V) > dist(s.b, V) ? s.a : s.b;
    return { seg: s, angle: angleAt(V, A, far), far };
  }).filter(r => r.angle > 1);
  const best = measured.sort((a, b) =>
    Math.abs(a.angle - target) - Math.abs(b.angle - target))[0];
  const accurate = Boolean(best) && Math.abs(best.angle - target) <= 2;

  // a 60 degree construction needs an arc from V and an equal arc from where
  // it crosses VA; a 90 needs two equal arcs either side of V on the line
  let arcsShown = atV.length > 0;
  if (atV.length) {
    const r = atV[0].r;
    const foot = rayPoint(V, A, r);
    const backFoot = rayPoint(V, { x: 2 * V.x - A.x, y: 2 * V.y - A.y }, r);
    const fromFoot = arcsAt(work.arcs, foot, tol);
    const fromBack = arcsAt(work.arcs, backFoot, tol);
    arcsShown = fromFoot.length > 0 || fromBack.length > 0;
    if (target === 90) arcsShown = fromFoot.length > 0 && fromBack.length > 0;
  }

  return {
    ok: arcsShown && accurate,
    arcsShown,
    lineDrawn: Boolean(best),
    measured: best ? Math.round(best.angle * 10) / 10 : null,
    accurate,
    why: !arcsShown ? "the construction arcs are not shown - an angle measured with a protractor earns no construction mark"
      : !best ? "no ray was drawn from the vertex"
        : !accurate ? `the angle drawn measures ${Math.round(best.angle)}°, not ${target}°`
          : "correct construction",
  };
}

/**
 * A triangle from three given sides, or two sides and the included angle.
 * spec: { A, B, sides: { AB, BC, AC } } with A and B already placed.
 */
export function checkTriangle(work, spec, { tol = 0.6, angleTol = 2 } = {}) {
  const { A, B } = spec;
  const C = (work.points || []).find(p => p.id === "C") || spec.C;
  if (!C) return { ok: false, why: "the third vertex was not placed" };

  const wanted = spec.sides || {};
  const measured = { AB: dist(A, B), BC: dist(B, C), AC: dist(A, C) };
  const lengthErrors = Object.entries(wanted)
    .filter(([k, v]) => Math.abs(measured[k] - v) > tol)
    .map(([k, v]) => `${k} measures ${measured[k].toFixed(1)} but should be ${v}`);

  const arcsFromA = arcsAt(work.arcs, A, tol);
  const arcsFromB = arcsAt(work.arcs, B, tol);
  const arcsShown = (wanted.AC ? arcsFromA.some(a => Math.abs(a.r - wanted.AC) <= tol) : true)
    && (wanted.BC ? arcsFromB.some(a => Math.abs(a.r - wanted.BC) <= tol) : true)
    && (arcsFromA.length > 0 || arcsFromB.length > 0);

  const sidesDrawn = Boolean(segmentJoining(work.segments, A, C, tol))
    && Boolean(segmentJoining(work.segments, B, C, tol));

  const angleErrors = Object.entries(spec.angles || {}).filter(([k, v]) => {
    const pts = { A: [A, B, C], B: [B, A, C], C: [C, A, B] }[k];
    return pts && Math.abs(angleAt(pts[0], pts[1], pts[2]) - v) > angleTol;
  }).map(([k, v]) => `angle ${k} should be ${v}°`);

  const accurate = lengthErrors.length === 0 && angleErrors.length === 0;
  return {
    ok: arcsShown && sidesDrawn && accurate,
    arcsShown, sidesDrawn, accurate, measured,
    why: !sidesDrawn ? "the triangle is not complete"
      : !accurate ? [...lengthErrors, ...angleErrors].join("; ")
        : !arcsShown ? "the triangle is accurate but the compass arcs locating C are not shown"
          : "correct construction",
  };
}

/** A line through P parallel to AB - marked on distance and direction. */
export function checkParallel(work, P, A, B, { tol = 0.6 } = {}) {
  const dir = { x: P.x + (B.x - A.x), y: P.y + (B.y - A.y) };
  const line = segmentAlong(work.segments, P, dir, tol);

  // Standard ruler-and-compasses parallel construction copies the angle made
  // by AB with transversal AP, leaving equal-radius arcs centred at A and P.
  const atA = arcsAt(work.arcs, A, tol);
  const atP = arcsAt(work.arcs, P, tol);
  const arcsShown = atA.some(a => atP.some(b => Math.abs(a.r - b.r) <= tol));

  let off = Infinity;
  let through = false;
  if (line) {
    const theirs = Math.atan2(line.b.y - line.a.y, line.b.x - line.a.x);
    const ref = Math.atan2(B.y - A.y, B.x - A.x);
    off = Math.abs((theirs - ref) * 180 / Math.PI) % 180;
    if (off > 90) off = 180 - off;
    through = pointToLine(P, line.a, line.b) <= tol;
  }
  const accurate = Boolean(line) && off <= 2 && through;

  return {
    ok: arcsShown && accurate,
    arcsShown,
    lineDrawn: Boolean(line),
    accurate,
    offBy: line ? off : null,
    why: !line ? "no line was drawn through the point"
      : !through ? "the line does not pass through the given point"
        : off > 2 ? "the line is " + off.toFixed(1) + "° away from being parallel"
          : !arcsShown ? "the line is parallel but the construction arcs are not shown - a line slid into place with a set square earns no construction mark"
            : "correct construction",
  };
}

/** Every construction the pad knows how to mark, by name. */
export const CONSTRUCTIONS = {
  perpendicularBisector: checkPerpendicularBisector,
  angleBisector: checkAngleBisector,
  angle: checkConstructedAngle,
  triangle: checkTriangle,
  parallel: checkParallel,
};

/**
 * Turn a construction verdict into mark-scheme criteria results.
 * CXC's usual split for a 3-mark construction is:
 *   B1 construction arcs shown
 *   B1 the required line or angle drawn
 *   B1 accurate to within tolerance
 */
export function markConstruction(work, spec) {
  const fn = CONSTRUCTIONS[spec.construction];
  if (!fn) return { marks: 0, of: spec.marks || 0, why: `unknown construction ${spec.construction}` };
  const v = fn(work, ...(spec.args || []), spec.options || {});
  const lines = [
    { code: "B1", kind: "B", description: "construction arcs clearly shown",
      awarded: Boolean(v.arcsShown),
      why: v.arcsShown ? "the required compass arcs are shown"
        : (work.arcs || []).length ? "compass arcs were drawn, but they do not match the required construction"
          : "the required compass arcs are not shown" },
    { code: "B2", kind: "B", description: "required line drawn",
      awarded: Boolean(v.lineDrawn ?? v.sidesDrawn ?? v.ok),
      why: (v.lineDrawn ?? v.sidesDrawn ?? v.ok) ? "the required line is drawn"
        : (work.segments || []).length ? "a straightedge line was drawn, but it is not the required line"
          : "the required line was not drawn" },
    { code: "B3", kind: "B", description: "accurate within tolerance",
      awarded: Boolean(v.accurate ?? v.ok),
      why: (v.accurate ?? v.ok) ? "accurate" : v.why },
  ];
  const wanted = spec.marks || 3;
  // A one-mark construction is a single holistic B mark. It should not be
  // possible to earn full credit by leaving arcs without the required line.
  if (wanted === 1) {
    const awarded = Boolean(v.ok);
    return {
      marks: awarded ? 1 : 0,
      of: 1,
      criteria: [{
        code: "B1", kind: "B", description: "complete accurate construction with the required arcs",
        awarded, marks: awarded ? 1 : 0, of: 1, why: awarded ? "correct construction" : v.why,
      }],
      why: v.why,
      detail: v,
    };
  }
  // fewer marks than criteria: keep the first ones. More marks than criteria:
  // the surplus rides on accuracy, since that is the only line that can carry
  // additional weight without inventing a new method step.
  const kept = lines.slice(0, Math.max(1, Math.min(wanted, lines.length)));
  kept.forEach(l => { l.marks = l.awarded ? 1 : 0; l.of = 1; });
  if (wanted > kept.length) {
    const last = kept[kept.length - 1];
    last.of = 1 + (wanted - kept.length);
    last.marks = last.awarded ? last.of : 0;
  }
  const marks = kept.reduce((t, l) => t + l.marks, 0);
  return { marks, of: wanted, criteria: kept, why: v.why, detail: v };
}
