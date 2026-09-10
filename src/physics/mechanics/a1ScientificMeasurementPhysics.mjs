// SPARK Physics A1 scientific-method and measurement helpers.
// These are pure functions so the lesson, interactives and grader can share
// one tested source of truth.

export function simplePendulumSmallAnglePeriod(lengthM, g = 9.81) {
  const l = Number(lengthM);
  const gg = Number(g);
  if (!(l > 0) || !(gg > 0)) return null;
  return 2 * Math.PI * Math.sqrt(l / gg);
}

// Finite-amplitude correction through theta^6. This avoids teaching that
// amplitude has literally no effect while staying accurate for classroom use.
export function simplePendulumPeriod(lengthM, angleDeg = 5, g = 9.81) {
  const base = simplePendulumSmallAnglePeriod(lengthM, g);
  const deg = Number(angleDeg);
  if (base === null || !Number.isFinite(deg) || Math.abs(deg) >= 90) return null;
  const theta = Math.abs(deg) * Math.PI / 180;
  const t2 = theta * theta;
  const correction = 1 + t2 / 16 + 11 * t2 * t2 / 3072 + 173 * t2 * t2 * t2 / 737280;
  return base * correction;
}

export function periodFromRepeatedTiming(totalTimeS, oscillations) {
  const t = Number(totalTimeS), n = Number(oscillations);
  return t > 0 && Number.isInteger(n) && n > 0 ? t / n : null;
}

export function density(mass, volume) {
  const m = Number(mass), v = Number(volume);
  return Number.isFinite(m) && v > 0 ? m / v : null;
}

export function displacementVolume(initialVolume, finalVolume) {
  const a = Number(initialVolume), b = Number(finalVolume);
  return Number.isFinite(a) && Number.isFinite(b) && b >= a ? b - a : null;
}

export function gradient(x1, y1, x2, y2) {
  const dx = Number(x2) - Number(x1);
  const dy = Number(y2) - Number(y1);
  return dx !== 0 && Number.isFinite(dx) && Number.isFinite(dy) ? dy / dx : null;
}

export function gFromPendulumT2VsLGradient(slope) {
  const s = Number(slope);
  return s > 0 ? (4 * Math.PI * Math.PI) / s : null;
}

export function classifyMeasurementError(kind) {
  const key = String(kind || '').trim().toLowerCase();
  if (['reaction time variation','reaction time','reading scatter','random'].includes(key)) return 'random';
  if (['zero error','calibration error','systematic'].includes(key)) return 'systematic';
  if (['parallax','parallax error'].includes(key)) return 'parallax';
  return 'unknown';
}
