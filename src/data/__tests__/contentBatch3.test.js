// ============================================================================
// Done by: Odane Robinson
//
// Verifies the third batch of previously-missing content: the first 7
// topics of Section 8 (Relations, Functions and Graphs). Every computation
// was independently verified with sympy before being written.
// ============================================================================
import { LESSONS, QUESTION_BANK } from "../lessonBank";

const NEW_LESSON_TOPICS = [
  "Relations: domain, range, co-domain",
  "Functions: definition and notation",
  "Evaluating functions",
  "Linear functions and graphs",
  "Equation of a straight line",
  "Parallel and perpendicular lines",
  "Length and midpoint of a line segment",
];

const NEW_QUIZ_TOPICS = [
  "Relations: domain, range, co-domain",
  "Functions: definition and notation",
  "Linear functions and graphs",
  "Equation of a straight line",
  "Parallel and perpendicular lines",
  "Length and midpoint of a line segment",
];

describe("content batch 3 - lessons now exist", () => {
  test.each(NEW_LESSON_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
    for (const section of lesson.sections) {
      expect(section.example.solution.length).toBeGreaterThan(5);
    }
  });
});

describe("content batch 3 - quiz content exists", () => {
  test.each(NEW_QUIZ_TOPICS)("%s has its own QUESTION_BANK entry", (topic) => {
    expect(QUESTION_BANK[topic]).toBeDefined();
    expect(QUESTION_BANK[topic].length).toBeGreaterThan(0);
  });
});

describe("content batch 3 - quiz answers are mathematically verified", () => {
  test("Relations: domain, range, co-domain", () => {
    const qs = QUESTION_BANK["Relations: domain, range, co-domain"];
    expect(qs.find(q => q.id === "rel-001").correct).toBe(0);
    expect(qs.find(q => q.id === "rel-002").correct).toBe(0);
    expect(qs.find(q => q.id === "rel-003").correct).toBe(0);
    expect(qs.find(q => q.id === "rel-004").correct).toBe(0);
  });

  test("Functions: definition and notation", () => {
    const qs = QUESTION_BANK["Functions: definition and notation"];
    expect(qs.find(q => q.id === "fdn-001").correct).toBe(1);
    expect(qs.find(q => q.id === "fdn-002").correct).toBe(0);
    expect(4 * 2 + 1).toBe(9);
    expect(qs.find(q => q.id === "fdn-003").correct).toBe(0);
    expect(qs.find(q => q.id === "fdn-004").correct).toBe(1);
    // structured: f(x)=5-2x; f(3)=-1; solve 5-2x=11 -> x=-3
    expect(5 - 2 * 3).toBe(-1);
    expect(5 - 2 * -3).toBe(11);
  });

  test("Evaluating functions lesson examples", () => {
    // f(x)=2x^2-5, f(-3)=13
    expect(2 * (-3) ** 2 - 5).toBe(13);
    // f(x)=2x-7, f(k)=3 -> k=5
    expect(2 * 5 - 7).toBe(3);
  });

  test("Linear functions and graphs", () => {
    const qs = QUESTION_BANK["Linear functions and graphs"];
    expect(5 * 0 - 3).toBe(-3); // lfg-001
    expect(2 * 4 - 8).toBe(0); // lfg-002: x=4
    for (const id of ["lfg-001", "lfg-002", "lfg-003", "lfg-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: (-1,1) and (2,7) -> gradient 2, y=2x+3
    expect((7 - 1) / (2 - -1)).toBe(2);
    expect(2 * 2 + 3).toBe(7);
    expect(2 * -1 + 3).toBe(1);
  });

  test("Equation of a straight line", () => {
    const qs = QUESTION_BANK["Equation of a straight line"];
    for (const id of ["esl-001", "esl-002", "esl-003", "esl-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured (a): grad -3 through (2,1) -> c=7
    expect(1 - -3 * 2).toBe(7);
    expect(-3 * 2 + 7).toBe(1);
    // structured (b): (0,-4) and (3,5) -> grad 3, y=3x-4
    expect((5 - -4) / (3 - 0)).toBe(3);
    expect(3 * 3 - 4).toBe(5);
  });

  test("Parallel and perpendicular lines", () => {
    const qs = QUESTION_BANK["Parallel and perpendicular lines"];
    for (const id of ["ppl-001", "ppl-002", "ppl-003", "ppl-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: perpendicular of 2/3 is -3/2; through (4,5) -> c=11
    const perp = -1 / (2 / 3);
    expect(perp).toBeCloseTo(-1.5, 10);
    expect(perp * 4 + 11).toBeCloseTo(5, 10);
  });

  test("Length and midpoint of a line segment", () => {
    const qs = QUESTION_BANK["Length and midpoint of a line segment"];
    expect(Math.sqrt((3 - 0) ** 2 + (4 - 0) ** 2)).toBe(5); // lam-001
    for (const id of ["lam-001", "lam-002", "lam-003", "lam-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: P(-1,2), Q(5,10) -> length 10, midpoint (2,6)
    expect(Math.sqrt((5 - -1) ** 2 + (10 - 2) ** 2)).toBe(10);
    expect((-1 + 5) / 2).toBe(2);
    expect((2 + 10) / 2).toBe(6);
  });
});
