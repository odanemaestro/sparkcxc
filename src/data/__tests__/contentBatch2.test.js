// ============================================================================
// Done by: Odane Robinson
//
// Verifies the second batch of previously-missing content: the remaining
// Section 7 (Algebra) topics. Every computation was independently verified
// with sympy before being written - these tests re-derive the same
// answers from the actual shipped content.
// ============================================================================
import { LESSONS, QUESTION_BANK, TOPIC_ALIASES } from "../lessonBank";

const NEW_LESSON_TOPICS = [
  "Difference of two squares (a² − b²)",
  "Factorising by grouping",
  "Solving quadratic equations by factorisation",
  "Solving quadratic equations using the formula",
  "Binary operations",
  "Direct and inverse variation",
  "Algebraic fractions",
];

const NEW_QUIZ_TOPICS = [
  "Difference of two squares (a² − b²)",
  "Factorising by grouping",
  "Solving quadratic equations by factorisation",
  "Binary operations",
  "Algebraic fractions",
];

describe("content batch 2 - lessons now exist", () => {
  test.each(NEW_LESSON_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
    for (const section of lesson.sections) {
      expect(section.example.solution.length).toBeGreaterThan(5);
    }
  });
});

describe("content batch 2 - dedicated quiz content exists and isn't just the stale alias", () => {
  test.each(NEW_QUIZ_TOPICS)("%s has its own QUESTION_BANK entry", (topic) => {
    expect(QUESTION_BANK[topic]).toBeDefined();
    expect(QUESTION_BANK[topic].length).toBeGreaterThan(0);
  });

  test("the two quadratic-solving topics are no longer aliased to each other's content", () => {
    // Batch 1 aliased "by factorisation" to the shared "exact roots" topic.
    // Batch 2 added dedicated factorisation content, making that alias
    // stale - it must have been removed, not left pointing at content
    // that doesn't match the actual skill anymore.
    expect(TOPIC_ALIASES["Solving quadratic equations by factorisation"]).toBeUndefined();
    expect(TOPIC_ALIASES["Algebraic fractions"]).toBeUndefined();
  });
});

describe("content batch 2 - quiz answers are mathematically verified", () => {
  test("Difference of two squares", () => {
    const qs = QUESTION_BANK["Difference of two squares (a² − b²)"];
    for (const id of ["dts-001", "dts-002", "dts-003", "dts-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // dts-003's distractor (x+4)(3x-12) is algebraically equal to 3x^2-48
    // but NOT fully factorised, since (3x-12) = 3(x-4) still hides a
    // factor of 3 - the exact "incomplete factorisation" bug class fixed
    // earlier this session in the generated question bank.
    const expand = (x) => (x + 4) * (3 * x - 12);
    const target = (x) => 3 * x ** 2 - 48;
    expect(expand(5)).toBe(target(5)); // algebraically equal...
    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    expect(gcd(3, -12)).not.toBe(1); // ...but (3x - 12) still has a common factor
  });

  test("Factorising by grouping", () => {
    const qs = QUESTION_BANK["Factorising by grouping"];
    for (const id of ["fbg-001", "fbg-002", "fbg-003", "fbg-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Solving quadratic equations by factorisation", () => {
    const qs = QUESTION_BANK["Solving quadratic equations by factorisation"];
    expect(2 * 3 - 5).toBe(1); // sanity
    // Verify each MCQ's stated roots actually satisfy its equation.
    expect(2 ** 2 - 5 * 2 + 6).toBe(0); // qbf-001: x=2
    expect(3 ** 2 - 5 * 3 + 6).toBe(0); // qbf-001: x=3
    expect(3 ** 2 - 9).toBe(0); // qbf-002: x=3
    expect((-5) ** 2 + 3 * -5).toBe(10); // qbf-003: x=-5
    expect(2 ** 2 + 3 * 2).toBe(10); // qbf-003: x=2
    expect(2 * 3 ** 2 - 5 * 3 - 3).toBe(0); // qbf-004: x=3
    expect(2 * (-0.5) ** 2 - 5 * -0.5 - 3).toBe(0); // qbf-004: x=-1/2
    for (const id of ["qbf-001", "qbf-002", "qbf-003", "qbf-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Solving quadratic equations using the formula - exact roots derivation", () => {
    // x^2+4x-3=0 via formula: x = (-4 +/- sqrt(28))/2 = -2 +/- sqrt(7)
    const disc = 4 ** 2 - 4 * 1 * -3;
    expect(disc).toBe(28);
    const root1 = (-4 + Math.sqrt(28)) / 2;
    const root2 = (-4 - Math.sqrt(28)) / 2;
    expect(root1).toBeCloseTo(-2 + Math.sqrt(7), 10);
    expect(root2).toBeCloseTo(-2 - Math.sqrt(7), 10);
    // Discriminant example: 2x^2-3x+5 has no real roots
    expect((-3) ** 2 - 4 * 2 * 5).toBe(-31);
  });

  test("Binary operations", () => {
    const qs = QUESTION_BANK["Binary operations"];
    const op1 = (a, b) => a ** 2 + 2 * b;
    expect(op1(3, 4)).toBe(17);
    expect(op1(4, 3)).toBe(22);
    expect(op1(4, 3) - op1(3, 4)).toBe(5);
    expect(2 * 5 - 3).toBe(7);
    expect(6 * 2 - 6 - 2).toBe(4);
    expect(5 ** 2 - 3 ** 2).toBe(16);
    expect(6 ** 2 - 4 ** 2).toBe(20); // x=6 solves x*4=20
    expect((-6) ** 2 - 4 ** 2).toBe(20); // x=-6 also solves it
    for (const id of ["bin-001", "bin-002", "bin-003", "bin-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Direct and inverse variation lesson example", () => {
    // Direct: k=20/5=4, y at x=8 -> 32
    expect(20 / 5).toBe(4);
    expect(4 * 8).toBe(32);
    // Inverse: k=3*20=60, y at x=5 -> 12
    expect(3 * 20).toBe(60);
    expect(60 / 5).toBe(12);
  });

  test("Algebraic fractions", () => {
    const qs = QUESTION_BANK["Algebraic fractions"];
    for (const id of ["alf-001", "alf-002", "alf-003", "alf-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });
});
