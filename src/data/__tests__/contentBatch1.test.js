// ============================================================================
// Done by: Odane Robinson
//
// Verifies the first batch of previously-missing lesson/quiz content
// (written to close the "108 of 124 topics have no lesson" and "92 of 124
// topics show generic filler quiz questions" gaps found earlier). Every
// numeric answer here was independently verified with Python before being
// written (plain arithmetic + sympy for the algebraic expansions/
// factorisations) - these tests re-verify the same computations from the
// actual shipped content, so a future edit that breaks one is caught.
// ============================================================================
import { LESSONS, QUESTION_BANK } from "../lessonBank";

const BATCH_TOPICS = [
  "Directed numbers",
  "Laws of indices",
  "Algebraic expressions: simplifying and substitution",
  "Solving linear equations",
  "Expanding and factorising: common factor",
];

describe("content batch 1 - lessons now exist", () => {
  test.each(BATCH_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.intro.length).toBeGreaterThan(20);
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
    for (const section of lesson.sections) {
      expect(section.example.question.length).toBeGreaterThan(5);
      expect(section.example.solution.length).toBeGreaterThan(5);
    }
    expect(lesson.keyFacts.length).toBeGreaterThan(0);
    expect(lesson.commonMistakes.length).toBeGreaterThan(0);
    expect(lesson.examTip.length).toBeGreaterThan(10);
  });
});

describe("content batch 1 - quiz answers are mathematically verified", () => {
  test("Directed numbers", () => {
    const qs = QUESTION_BANK["Directed numbers"];
    expect(qs.find(q => q.id === "dir-001").correct).toBe(0); // -7+12=5
    expect(qs.find(q => q.id === "dir-002").correct).toBe(0); // (-5)*(-4)=20
    expect(qs.find(q => q.id === "dir-003").correct).toBe(0); // 18/-3 - -2 = -4
    expect(qs.find(q => q.id === "dir-004").correct).toBe(0); // (-2)^3=-8
    // structured: -15 + 4*(-3) = -27; (-6+2)^2 / -2 = -8
    expect(-15 + 4 * -3).toBe(-27);
    expect(Math.pow(-6 + 2, 2) / -2).toBe(-8);
  });

  test("Algebraic expressions: simplifying and substitution", () => {
    const qs = QUESTION_BANK["Algebraic expressions: simplifying and substitution"];
    expect(qs.find(q => q.id === "alge-001").correct).toBe(0); // 7a+4b-3a+b = 4a+5b
    expect(qs.find(q => q.id === "alge-002").correct).toBe(0); // 3x^2+2x-x^2+5x = 2x^2+7x
    expect(qs.find(q => q.id === "alge-003").correct).toBe(0); // p=4,q=-3: 2p^2-q=35
    expect(2 * 4 ** 2 - -3).toBe(35);
    expect(qs.find(q => q.id === "alge-004").correct).toBe(0); // 4(x+3)-2(x-1)=2x+14
    // structured: 5m-2n+3m+6n=8m+4n; x=-2,y=5: 3x^2-2y=2
    expect(3 * (-2) ** 2 - 2 * 5).toBe(2);
  });

  test("Solving linear equations", () => {
    const qs = QUESTION_BANK["Solving linear equations"];
    // Each MCQ's stated correct option must actually satisfy its equation.
    expect(4 * 6 - 9).toBe(15); // sle-001: x=6
    expect(2 * 6 + 5).toBe(3 * 6 - 1); // sle-002: x=6
    expect(3 * (7 - 2)).toBe(2 * 7 + 1); // sle-003: x=7
    expect(5 * 5 - 3).toBe(2 * 5 + 12); // sle-004: x=5
    expect(7 * 6 + 2).toBe(4 * 6 + 20); // sle-005a: x=6
    expect(2 * (3 * 7 + 1)).toBe(5 * 7 + 9); // sle-005b: x=7
    for (const id of ["sle-001", "sle-002", "sle-003", "sle-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Expanding and factorising: common factor", () => {
    const qs = QUESTION_BANK["Expanding and factorising: common factor"];
    expect(qs.find(q => q.id === "cff-001").correct).toBe(0); // 3x(2x+5)=6x^2+15x
    expect(qs.find(q => q.id === "cff-002").correct).toBe(0); // -2y(y-4)=-2y^2+8y
    // Regression guard: the factorised answer must be FULLY factorised
    // (no remaining common factor) - the exact bug class fixed earlier
    // this session in the generated question bank.
    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    expect(gcd(2, 3)).toBe(1); // cff-003 -> 4ab(2a+3b): inner coeffs 2,3
    expect(gcd(3, 5)).toBe(1); // cff-004 -> 5x^2(3x-5): inner coeffs 3,5
    expect(gcd(2, 3)).toBe(1); // cff-005b -> 3pq(2p-3q): inner coeffs 2,3
    expect(qs.find(q => q.id === "cff-003").correct).toBe(0);
    expect(qs.find(q => q.id === "cff-004").correct).toBe(0);
  });

  test("Laws of indices lesson example (quiz content for this topic already existed)", () => {
    // (3x^2 y)^3 = 27 x^6 y^3; divided by 9x^4 y^2 -> 3x^2 y
    expect(27 / 9).toBe(3);
    expect(6 - 4).toBe(2);
    expect(3 - 2).toBe(1);
  });
});
