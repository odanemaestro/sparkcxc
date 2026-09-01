// ============================================================================
// Done by: Odane Robinson
// Run with: node scripts/diagram-kit/index.test.js
// Plain Node + assert rather than Jest, since this toolkit intentionally
// lives outside src/ (it's a build-time/authoring tool, not app code) and
// Create React App's Jest config only looks under src/ by default.
// ============================================================================
const assert = require("assert");
const {
  polarPoint, distance, midpoint, perpendicularOffset,
  angleBisectorPoint, angleBetween, labelOverlapsLine,
} = require("./index");

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok - ${name}`);
  } catch (e) {
    console.error(`  FAIL - ${name}\n    ${e.message}`);
    process.exitCode = 1;
  }
}

console.log("polarPoint");
test("straight up (0 deg) decreases y, keeps x", () => {
  const p = polarPoint({ x: 100, y: 100 }, 0, 50);
  assert.ok(Math.abs(p.x - 100) < 1e-9);
  assert.ok(Math.abs(p.y - 50) < 1e-9);
});
test("90 deg (right) increases x, keeps y", () => {
  const p = polarPoint({ x: 100, y: 100 }, 90, 50);
  assert.ok(Math.abs(p.x - 150) < 1e-9);
  assert.ok(Math.abs(p.y - 100) < 1e-9);
});
test("length is preserved regardless of angle", () => {
  const origin = { x: 0, y: 0 };
  for (const angle of [0, 37, 90, 145, 270]) {
    const p = polarPoint(origin, angle, 30);
    assert.ok(Math.abs(distance(origin, p) - 30) < 1e-9, `angle ${angle}`);
  }
});

console.log("angleBetween / angleBisectorPoint");
test("angleBetween reports the true angle for a known right angle", () => {
  const v = { x: 0, y: 0 };
  const p1 = { x: 10, y: 0 };
  const p2 = { x: 0, y: -10 };
  assert.ok(Math.abs(angleBetween(v, p1, p2) - 90) < 1e-6);
});
test("this is exactly how jan_q6_cheese.svg's 18-degree wedge was verified", () => {
  // Reproduces the actual check from this session: OA and OB should be
  // equal length with an 18 degree angle between them (the original had
  // roughly a 70 degree angle and unequal radii).
  const O = { x: 450, y: 100 };
  const A = polarPoint(O, -9, 230);
  const B = polarPoint(O, 9, 230);
  assert.ok(Math.abs(distance(O, A) - 230) < 1e-9);
  assert.ok(Math.abs(distance(O, B) - 230) < 1e-9);
  assert.ok(Math.abs(angleBetween(O, A, B) - 18) < 1e-6);
});
test("bisector point sits at equal angle from both rays", () => {
  const v = { x: 0, y: 0 };
  const p1 = { x: 10, y: 0 };
  const p2 = { x: 0, y: 10 };
  const bis = angleBisectorPoint(v, p1, p2, 5);
  const a1 = angleBetween(v, p1, bis);
  const a2 = angleBetween(v, p2, bis);
  assert.ok(Math.abs(a1 - a2) < 1e-6, `${a1} vs ${a2}`);
});

console.log("perpendicularOffset");
test("offset point is perpendicular to the line, on the side away from `away`", () => {
  const a = { x: 0, y: 0 };
  const b = { x: 10, y: 0 };
  const away = { x: 5, y: 10 }; // "interior" is above the line
  const off = perpendicularOffset(a, b, 4, away);
  // Should be offset to the opposite side from `away` (below the line).
  assert.ok(off.y < 0, "expected the offset point on the opposite side from `away`");
  assert.ok(Math.abs(off.x - 5) < 1e-9, "should stay centered over the midpoint in x");
});
test("this is exactly how the may_q6_semicircle.svg '15 m' label fix was computed", () => {
  const O = { x: 450, y: 430 };
  const P = { x: 347.4, y: 148.1 };
  const Q = { x: 552.6, y: 148.1 };
  const label = perpendicularOffset(O, P, 30, Q);
  // Regression check against the exact fix applied in that file.
  assert.ok(Math.abs(label.x - 370.5) < 0.5);
  assert.ok(Math.abs(label.y - 299.3) < 0.5);
});

console.log("labelOverlapsLine");
test("detects a label that sits directly on a line (the jan_q10_vector.svg '6z' bug)", () => {
  const O = { x: 170, y: 420 };
  const M = { x: 520, y: 90 };
  const buggyLabel = { text: "6z", x: 335, y: 255, fontSize: 18, anchor: "start" };
  assert.strictEqual(labelOverlapsLine(buggyLabel, O, M), true);
});
test("does not flag a label that was moved clear of the line", () => {
  const O = { x: 170, y: 420 };
  const M = { x: 520, y: 90 };
  const fixedLabel = { text: "6z", x: 362, y: 273, fontSize: 18, anchor: "middle" };
  assert.strictEqual(labelOverlapsLine(fixedLabel, O, M), false);
});
test("does not flag a label far from a line's domain entirely", () => {
  const a = { x: 0, y: 0 };
  const b = { x: 10, y: 10 };
  const label = { text: "x", x: 1000, y: 1000, fontSize: 14, anchor: "start" };
  assert.strictEqual(labelOverlapsLine(label, a, b), false);
});

console.log(`\n${passed} test(s) passed.`);
if (process.exitCode) {
  console.error("Some tests FAILED - see above.");
  process.exit(1);
}
