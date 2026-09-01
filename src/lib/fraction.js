// ============================================================================
// Done by: Odane Robinson
// Minimal exact-rational helper used by the content QA regression tests in
// src/data/__tests__/lessonBank.test.js - just enough to parse "a/b" or
// plain integer strings and compare two fractions for exact equality after
// reducing to lowest terms. Lives outside any __tests__ folder on purpose:
// Create React App's Jest config treats every file under __tests__ as a
// test file itself (it initially lived there and Jest failed the whole
// suite with "must contain at least one test").
// ============================================================================

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}

export class Fraction {
  constructor(num, den = 1) {
    if (den === 0) throw new Error("Fraction denominator cannot be zero");
    if (den < 0) { num = -num; den = -den; }
    const g = gcd(num, den);
    this.num = num / g;
    this.den = den / g;
  }

  static parse(str) {
    const s = String(str).trim();
    const m = s.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
    if (m) return new Fraction(parseInt(m[1], 10), parseInt(m[2], 10));
    const n = Number(s);
    if (!Number.isFinite(n) || !Number.isInteger(n)) {
      throw new Error(`Fraction.parse: not an integer or "a/b" fraction: "${str}"`);
    }
    return new Fraction(n, 1);
  }

  equals(other) {
    return this.num === other.num && this.den === other.den;
  }

  toString() {
    return this.den === 1 ? String(this.num) : `${this.num}/${this.den}`;
  }
}
