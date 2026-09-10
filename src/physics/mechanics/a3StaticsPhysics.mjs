// SPARK Physics A3 Statics core calculations and interactive-model helpers.
// These functions contain no UI state so the same physics can drive lessons,
// interactives, tests and marking.

function finite(value, name) {
  const n = Number(value);
  if (!Number.isFinite(n)) throw new TypeError(`${name} must be finite`);
  return n;
}

export function weight(massKg, gravitationalFieldStrength = 10) {
  const m = finite(massKg, 'massKg');
  const g = finite(gravitationalFieldStrength, 'gravitationalFieldStrength');
  if (m < 0) throw new RangeError('mass cannot be negative');
  if (g < 0) throw new RangeError('gravitational field strength cannot be negative');
  return m * g;
}

export function moment(forceN, perpendicularDistanceM) {
  const f = finite(forceN, 'forceN');
  const d = finite(perpendicularDistanceM, 'perpendicularDistanceM');
  if (d < 0) throw new RangeError('perpendicular distance cannot be negative');
  return f * d;
}

// Forces are represented as { forceN, distanceM, sense }, where sense is
// 'clockwise' or 'anticlockwise'. Distances are perpendicular distances from
// the pivot to the force line of action.
export function momentBalance(forces) {
  if (!Array.isArray(forces)) throw new TypeError('forces must be an array');
  let clockwise = 0;
  let anticlockwise = 0;
  for (const row of forces) {
    const value = moment(row.forceN, row.distanceM);
    if (row.sense === 'clockwise') clockwise += value;
    else if (row.sense === 'anticlockwise') anticlockwise += value;
    else throw new RangeError(`invalid moment sense: ${row.sense}`);
  }
  const netClockwise = clockwise - anticlockwise;
  return {
    clockwise,
    anticlockwise,
    netClockwise,
    balanced: Math.abs(netClockwise) <= 1e-12,
  };
}

export function solveUnknownMomentForce({ knownMomentNm, distanceM }) {
  const t = finite(knownMomentNm, 'knownMomentNm');
  const d = finite(distanceM, 'distanceM');
  if (d <= 0) throw new RangeError('distance must be greater than zero');
  return t / d;
}

export function solveUnknownMomentDistance({ knownMomentNm, forceN }) {
  const t = finite(knownMomentNm, 'knownMomentNm');
  const f = finite(forceN, 'forceN');
  if (f === 0) throw new RangeError('force must be non-zero');
  const out = t / f;
  if (out < 0) throw new RangeError('distance cannot be negative');
  return out;
}

export function springExtension(stretchedLengthM, originalLengthM) {
  const stretched = finite(stretchedLengthM, 'stretchedLengthM');
  const original = finite(originalLengthM, 'originalLengthM');
  return stretched - original;
}

export function springConstant(forceN, extensionM) {
  const f = finite(forceN, 'forceN');
  const x = finite(extensionM, 'extensionM');
  if (x === 0) throw new RangeError('extension must be non-zero');
  return f / x;
}

export function hookeForce(springConstantNm, extensionM) {
  const k = finite(springConstantNm, 'springConstantNm');
  const x = finite(extensionM, 'extensionM');
  if (k < 0) throw new RangeError('spring constant cannot be negative');
  return k * x;
}

// A simple origin-constrained least-squares estimate of k for a force-against-
// extension graph. This is appropriate only for points selected from the
// proportional region.
export function springConstantFromProportionalPoints(points) {
  if (!Array.isArray(points) || points.length < 2) {
    throw new TypeError('at least two force-extension points are required');
  }
  let sumXF = 0;
  let sumXX = 0;
  for (const point of points) {
    const x = finite(point.extensionM, 'extensionM');
    const f = finite(point.forceN, 'forceN');
    if (x < 0 || f < 0) throw new RangeError('force-extension readings cannot be negative here');
    sumXF += x * f;
    sumXX += x * x;
  }
  if (sumXX === 0) throw new RangeError('extension readings cannot all be zero');
  return sumXF / sumXX;
}

export function lineOfActionWithinBase({ centreOfGravityX, baseLeftX, baseRightX }) {
  const x = finite(centreOfGravityX, 'centreOfGravityX');
  const left = finite(baseLeftX, 'baseLeftX');
  const right = finite(baseRightX, 'baseRightX');
  if (right <= left) throw new RangeError('baseRightX must be greater than baseLeftX');
  return x >= left && x <= right;
}

// For a rectangular block tilted through angle theta around one lower edge,
// determine whether its centre-of-gravity vertical lies inside the support
// base. The block's local centre is width/2 horizontally from the pivot and
// height/2 vertically above it before rotation.
export function rectangularBlockStability({ widthM, heightM, tiltDegrees }) {
  const w = finite(widthM, 'widthM');
  const h = finite(heightM, 'heightM');
  const theta = finite(tiltDegrees, 'tiltDegrees') * Math.PI / 180;
  if (w <= 0 || h <= 0) throw new RangeError('block dimensions must be positive');
  // Pivot is the lower right edge for positive clockwise tilt. Relative x of
  // the centre of gravity from that pivot after rotation:
  // x = -w/2 cos(theta) + h/2 sin(theta)
  const cgFromPivot = -0.5 * w * Math.cos(theta) + 0.5 * h * Math.sin(theta);
  const criticalAngleDegrees = Math.atan(w / h) * 180 / Math.PI;
  return {
    centreOfGravityFromPivotM: cgFromPivot,
    criticalAngleDegrees,
    stable: cgFromPivot <= 0,
    atThreshold: Math.abs(cgFromPivot) <= 1e-12,
  };
}

export function classifyLever({ fulcrumPosition, effortPosition, loadPosition }) {
  const f = finite(fulcrumPosition, 'fulcrumPosition');
  const e = finite(effortPosition, 'effortPosition');
  const l = finite(loadPosition, 'loadPosition');
  const between = (x, a, b) => x > Math.min(a,b) && x < Math.max(a,b);
  if (between(f, e, l)) return 'first';
  if (between(l, f, e)) return 'second';
  if (between(e, f, l)) return 'third';
  throw new RangeError('lever positions must be distinct and one point must lie between the other two');
}
