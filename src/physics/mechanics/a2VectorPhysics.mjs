// SPARK Physics A2 vector helpers.

export function resultantParallel(vectors) {
  if (!Array.isArray(vectors) || !vectors.length || vectors.length > 4) return null;
  const sum = vectors.reduce((s, v) => s + Number(v), 0);
  return Number.isFinite(sum) ? sum : null;
}

export function resultantPerpendicular(x, y) {
  const xx = Number(x), yy = Number(y);
  if (!Number.isFinite(xx) || !Number.isFinite(yy)) return null;
  const magnitude = Math.hypot(xx, yy);
  const angleDeg = Math.atan2(Math.abs(yy), Math.abs(xx)) * 180 / Math.PI;
  return { x: xx, y: yy, magnitude, angleDeg };
}

export function vectorComponents(magnitude, angleDegFromPositiveX) {
  const m = Number(magnitude), deg = Number(angleDegFromPositiveX);
  if (!(m >= 0) || !Number.isFinite(deg)) return null;
  const rad = deg * Math.PI / 180;
  return { x: m * Math.cos(rad), y: m * Math.sin(rad) };
}

export function resultantFromComponents(x, y) {
  const xx = Number(x), yy = Number(y);
  if (!Number.isFinite(xx) || !Number.isFinite(yy)) return null;
  const magnitude = Math.hypot(xx, yy);
  let bearingLikeAngle = Math.atan2(yy, xx) * 180 / Math.PI;
  if (bearingLikeAngle < 0) bearingLikeAngle += 360;
  return { magnitude, angleDegFromPositiveX: bearingLikeAngle };
}

export function scaleVectorLength(magnitude, unitsPerCm) {
  const m = Number(magnitude), scale = Number(unitsPerCm);
  return m >= 0 && scale > 0 ? m / scale : null;
}
