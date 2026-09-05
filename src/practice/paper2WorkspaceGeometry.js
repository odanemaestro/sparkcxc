export function snapValue(value, step = 0.05) {
  const n = Number(value);
  const s = Number(step);
  if (!Number.isFinite(n)) return 0;
  if (!Number.isFinite(s) || s <= 0) return n;
  const snapped = Math.round(n / s) * s;
  return Number(snapped.toFixed(8));
}

export function nearestSnapPoint(point, candidates = [], tolerance = 0.22) {
  if (!point || !Array.isArray(candidates) || !candidates.length) return null;
  let best = null;
  let bestDistance = Number(tolerance);
  for (const candidate of candidates) {
    if (!candidate) continue;
    const distance = Math.hypot(Number(point.x) - Number(candidate.x), Number(point.y) - Number(candidate.y));
    if (distance <= bestDistance) {
      bestDistance = distance;
      best = { x: Number(candidate.x), y: Number(candidate.y) };
    }
  }
  return best;
}

function segmentEndpoints(segment) {
  return [
    { x: Number(segment.x1), y: Number(segment.y1) },
    { x: Number(segment.x2), y: Number(segment.y2) },
  ];
}

export function circleCircleIntersections(a, b) {
  const x0 = Number(a.cx), y0 = Number(a.cy), r0 = Math.abs(Number(a.r));
  const x1 = Number(b.cx), y1 = Number(b.cy), r1 = Math.abs(Number(b.r));
  const dx = x1 - x0, dy = y1 - y0;
  const d = Math.hypot(dx, dy);
  if (!Number.isFinite(d) || d === 0 || d > r0 + r1 + 1e-9 || d < Math.abs(r0 - r1) - 1e-9) return [];
  const along = (r0 * r0 - r1 * r1 + d * d) / (2 * d);
  const h2 = Math.max(0, r0 * r0 - along * along);
  const h = Math.sqrt(h2);
  const xm = x0 + (along * dx) / d;
  const ym = y0 + (along * dy) / d;
  const rx = -(dy * h) / d;
  const ry = (dx * h) / d;
  const p1 = { x: xm + rx, y: ym + ry };
  if (h < 1e-9) return [p1];
  return [p1, { x: xm - rx, y: ym - ry }];
}

export function segmentCircleIntersections(segment, circle) {
  const [a, b] = segmentEndpoints(segment);
  const cx = Number(circle.cx), cy = Number(circle.cy), r = Math.abs(Number(circle.r));
  const dx = b.x - a.x, dy = b.y - a.y;
  const fx = a.x - cx, fy = a.y - cy;
  const A = dx * dx + dy * dy;
  if (A < 1e-12) return [];
  const B = 2 * (fx * dx + fy * dy);
  const C = fx * fx + fy * fy - r * r;
  const disc = B * B - 4 * A * C;
  if (disc < -1e-9) return [];
  const roots = disc <= 0 ? [-B / (2 * A)] : [(-B - Math.sqrt(disc)) / (2 * A), (-B + Math.sqrt(disc)) / (2 * A)];
  return roots
    .filter(t => t >= -1e-9 && t <= 1 + 1e-9)
    .map(t => ({ x: a.x + t * dx, y: a.y + t * dy }));
}

export function collectConstructionSnapPoints(objects = []) {
  const segments = objects.filter(item => item?.kind === "segment");
  const circles = objects.filter(item => item?.kind === "circle");
  const points = [];
  const pushUnique = point => {
    if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return;
    if (!points.some(existing => Math.hypot(existing.x - point.x, existing.y - point.y) < 1e-5)) points.push(point);
  };

  for (const segment of segments) segmentEndpoints(segment).forEach(pushUnique);
  for (const circle of circles) pushUnique({ x: Number(circle.cx), y: Number(circle.cy) });

  for (let i = 0; i < circles.length; i += 1) {
    for (let j = i + 1; j < circles.length; j += 1) circleCircleIntersections(circles[i], circles[j]).forEach(pushUnique);
  }
  for (const segment of segments) {
    for (const circle of circles) segmentCircleIntersections(segment, circle).forEach(pushUnique);
  }
  return points;
}
