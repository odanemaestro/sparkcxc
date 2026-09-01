// ============================================================================
// Done by: Odane Robinson
//
// Every diagram bug found and fixed in public/cxc2025/*.svg this session
// (points that weren't actually on the circle they were "on", a
// "parallelogram" that was really a trapezoid, an 18-degree sector drawn
// at ~70 degrees, labels sitting directly on top of the lines they were
// meant to describe) was found and fixed the same way: compute the real
// coordinates from the actual given angles/lengths, then check text
// positions against line equations before trusting them. This module
// turns that one-off manual process into small, tested, reusable
// functions, so a future diagram can be built the same way from the
// start instead of hand-typed and eyeballed.
//
// This is plain Node/CommonJS (no React/DOM dependency) so it can run
// both in scripts (see generate-example.js) and in Jest tests.
// ============================================================================

/** Converts degrees to radians. */
function rad(deg) { return (deg * Math.PI) / 180; }

/**
 * A point at `length` from `origin`, at `angleDeg` measured clockwise from
 * straight up (0 deg = up, 90 deg = right) - i.e. compass-style, which
 * matches how CSEC diagrams describe directions (bearings, angle-from-
 * vertical constructions) far more often than standard maths convention.
 */
function polarPoint(origin, angleDeg, length) {
  const a = rad(angleDeg);
  return {
    x: origin.x + length * Math.sin(a),
    y: origin.y - length * Math.cos(a), // SVG y grows downward
  };
}

function distance(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** Midpoint of two points. */
function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/**
 * A point offset perpendicular to the line through a and b, at distance
 * `dist`, on whichever side is farther from `awayFrom`. This is the exact
 * technique used to fix every "label sitting on top of its own line" bug
 * this session (may_q6_semicircle's "15 m" labels, may_q9_bearing's
 * distance labels, jan_q10_vector's "6z" label, etc.) - instead of
 * eyeballing an offset, it's computed to guarantee which side is clear.
 */
function perpendicularOffset(a, b, dist, awayFrom) {
  const mid = midpoint(a, b);
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const perp1 = { x: -uy, y: ux };
  const perp2 = { x: uy, y: -ux };
  const side = (perp) => (awayFrom.x - mid.x) * perp.x + (awayFrom.y - mid.y) * perp.y;
  const chosen = side(perp1) > 0 ? perp2 : perp1;
  return { x: mid.x + chosen.x * dist, y: mid.y + chosen.y * dist };
}

/**
 * A point on the angle bisector at `vertex` between rays toward `p1` and
 * `p2`, at distance `dist` from the vertex. This is how every angle label
 * in this session was placed dead-center in its own wedge (e.g. the "24°"
 * label in may_q9_circle.svg, which was originally floating outside its
 * own angle's wedge entirely) instead of guessed near the vertex.
 */
function angleBisectorPoint(vertex, p1, p2, dist) {
  const u = (p) => {
    const dx = p.x - vertex.x, dy = p.y - vertex.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: dx / len, y: dy / len };
  };
  const u1 = u(p1), u2 = u(p2);
  const sum = { x: u1.x + u2.x, y: u1.y + u2.y };
  const len = Math.hypot(sum.x, sum.y) || 1;
  return { x: vertex.x + (sum.x / len) * dist, y: vertex.y + (sum.y / len) * dist };
}

/** The angle in degrees, at `vertex`, between rays toward `p1` and `p2`. */
function angleBetween(vertex, p1, p2) {
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag = Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y) || 1;
  return (Math.acos(Math.max(-1, Math.min(1, dot / mag))) * 180) / Math.PI;
}

/**
 * Estimates a text label's bounding box in SVG-pixel space from its
 * anchor point, font size, string length, and text-anchor. This is a
 * rough monospace-ish approximation (0.58 * fontSize per character) - the
 * same estimate used by hand this session to catch label/line overlaps -
 * good enough to catch real overlaps, not meant to be typographically
 * exact for every font.
 */
function estimateTextBox(text, { x, y, fontSize = 16, anchor = "start" }) {
  const width = String(text).length * fontSize * 0.58;
  const x0 = anchor === "middle" ? x - width / 2 : anchor === "end" ? x - width : x;
  const x1 = x0 + width;
  const yTop = y - fontSize * 0.8; // approx cap-height above the baseline
  const yBottom = y;
  return { x0, x1, yTop, yBottom };
}

/**
 * Checks whether the line segment a->b passes through a text label's
 * estimated bounding box - i.e. whether the label would visually overlap
 * the line. This is the exact check used throughout this session to find
 * (and then verify the fix for) every "label sitting on a line" bug.
 * Returns true if there's an overlap.
 */
function labelOverlapsLine(label, a, b, minGap = 3) {
  const box = estimateTextBox(label.text, label);
  const lo = Math.max(box.x0, Math.min(a.x, b.x));
  const hi = Math.min(box.x1, Math.max(a.x, b.x));
  if (lo > hi) return false; // label and line don't even share an x-range

  if (a.x === b.x) {
    // Vertical line: overlap depends only on whether its y-range meets the label's.
    const loY = Math.min(a.y, b.y), hiY = Math.max(a.y, b.y);
    return hiY >= box.yTop - minGap && loY <= box.yBottom + minGap;
  }

  const slope = (b.y - a.y) / (b.x - a.x);
  const sampleXs = [lo, (lo + hi) / 2, hi];
  return sampleXs.some((x) => {
    const y = a.y + slope * (x - a.x);
    return y >= box.yTop - minGap && y <= box.yBottom + minGap;
  });
}

module.exports = {
  polarPoint,
  distance,
  midpoint,
  perpendicularOffset,
  angleBisectorPoint,
  angleBetween,
  estimateTextBox,
  labelOverlapsLine,
};
