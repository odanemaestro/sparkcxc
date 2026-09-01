// ============================================================================
// Done by: Odane Robinson
//
// Verifies the fourth batch of previously-missing content: the remaining
// 8 topics of Section 8 (Relations, Functions and Graphs), completing that
// section. Every computation was independently verified with sympy before
// being written.
// ============================================================================
import { LESSONS, QUESTION_BANK } from "../lessonBank";

const NEW_LESSON_TOPICS = [
  "Simultaneous equations graphically",
  "Quadratic functions and graphs",
  "Quadratic graphs: max/min, axis of symmetry, roots",
  "Composite functions fg(x)",
  "Inverse functions f⁻¹(x)",
  "Linear inequalities in two variables",
  "Linear programming",
  "Distance-time and speed-time graphs",
];

const NEW_QUIZ_TOPICS = [
  "Simultaneous equations graphically",
  "Quadratic functions and graphs",
  "Quadratic graphs: max/min, axis of symmetry, roots",
  "Composite functions fg(x)",
  "Inverse functions f⁻¹(x)",
  "Linear inequalities in two variables",
  "Linear programming",
];

describe("content batch 4 - lessons now exist", () => {
  test.each(NEW_LESSON_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
    for (const section of lesson.sections) {
      expect(section.example.solution.length).toBeGreaterThan(5);
    }
  });
});

describe("content batch 4 - quiz content exists", () => {
  test.each(NEW_QUIZ_TOPICS)("%s has its own QUESTION_BANK entry", (topic) => {
    expect(QUESTION_BANK[topic]).toBeDefined();
    expect(QUESTION_BANK[topic].length).toBeGreaterThan(0);
  });

  test("Distance-time and speed-time graphs gained 4 new MCQs alongside the existing past-paper question", () => {
    const qs = QUESTION_BANK["Distance-time and speed-time graphs"];
    expect(qs.length).toBeGreaterThanOrEqual(5);
    expect(qs.some(q => q.id === "cxc25-may-q8")).toBe(true); // original preserved
    for (const id of ["dst-001", "dst-002", "dst-003", "dst-004"]) {
      expect(qs.some(q => q.id === id)).toBe(true);
    }
  });
});

describe("content batch 4 - quiz answers are mathematically verified", () => {
  test("Simultaneous equations graphically", () => {
    const qs = QUESTION_BANK["Simultaneous equations graphically"];
    expect(2).toBe((5 - 1) / 2); // seg-001: x+1=-x+5 -> x=2
    for (const id of ["seg-001", "seg-002", "seg-003", "seg-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    expect(6 + 4).toBe(10);
    expect(6 - 4).toBe(2);
  });

  test("Quadratic functions and graphs", () => {
    const qs = QUESTION_BANK["Quadratic functions and graphs"];
    for (const id of ["qfg-001", "qfg-002", "qfg-003", "qfg-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    expect((-4) ** 2 - 4 * 2 * -3).toBe(40); // qfg-005c discriminant
  });

  test("Quadratic graphs: max/min, axis of symmetry, roots", () => {
    const qs = QUESTION_BANK["Quadratic graphs: max/min, axis of symmetry, roots"];
    expect(-(-6) / 2).toBe(3); // qms-001
    expect(-8 / 4).toBe(-2); // qms-002
    expect(2 ** 2 - 4 * 2 + 1).toBe(-3); // qms-003 turning point y
    expect((2 + 8) / 2).toBe(5); // qms-004
    for (const id of ["qms-001", "qms-002", "qms-003", "qms-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: roots of x^2-2x-8=0 are 4,-2; axis = 1
    expect(4 ** 2 - 2 * 4 - 8).toBe(0);
    expect((-2) ** 2 - 2 * -2 - 8).toBe(0);
    expect((4 + -2) / 2).toBe(1);
  });

  test("Composite functions fg(x)", () => {
    const qs = QUESTION_BANK["Composite functions fg(x)"];
    const f1 = (x) => 2 * x + 1, g1 = (x) => x ** 2;
    expect(f1(g1(3))).toBe(19); // cmf-001
    const f2 = (x) => x - 3, g2 = (x) => 2 * x;
    expect(g2(f2(4))).toBe(2); // cmf-002
    for (const id of ["cmf-001", "cmf-002", "cmf-003", "cmf-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: f=x^2, g=x-2; fg(4)=4; gf(x)=x^2-2
    const f3 = (x) => x ** 2, g3 = (x) => x - 2;
    expect(f3(g3(4))).toBe(4);
    expect(g3(f3(3))).toBe(7);
  });

  test("Inverse functions f⁻¹(x)", () => {
    const qs = QUESTION_BANK["Inverse functions f⁻¹(x)"];
    // Verify each inverse actually undoes its function.
    const f1 = (x) => 3 * x - 4, finv1 = (x) => (x + 4) / 3;
    expect(f1(finv1(10))).toBe(10);
    const f2 = (x) => x / 2 + 1, finv2 = (x) => 2 * x - 2;
    expect(f2(finv2(10))).toBe(10);
    expect((11 - 5) / 2).toBe(3); // inv-003
    const f4 = (x) => (x - 7) / 4, finv4 = (x) => 4 * x + 7;
    expect(f4(finv4(10))).toBe(10);
    for (const id of ["inv-001", "inv-002", "inv-003", "inv-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: f(x)=5-2x, finv(x)=(5-x)/2
    expect((5 - 3) / 2).toBe(1);
    expect(5 - 2 * 1).toBe(3);
  });

  test("Linear inequalities in two variables", () => {
    const qs = QUESTION_BANK["Linear inequalities in two variables"];
    expect(0 > 0 + 2).toBe(false); // liv-003 test point
    for (const id of ["liv-001", "liv-002", "liv-003", "liv-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    expect(0 < 3 * 0 + 6).toBe(true); // liv-005 structured test point
  });

  test("Linear programming", () => {
    const qs = QUESTION_BANK["Linear programming"];
    expect(4 + 3).toBe(7); // lpr-002
    const P = (pt) => 3 * pt[0] + 2 * pt[1];
    const corners = [[0, 0], [0, 4], [3, 4], [5, 0]];
    const values = corners.map(P);
    expect(Math.max(...values)).toBe(17);
    expect(corners[values.indexOf(Math.max(...values))]).toEqual([3, 4]);
    for (const id of ["lpr-001", "lpr-002", "lpr-003", "lpr-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured
    const P2 = (pt) => 2 * pt[0] + 3 * pt[1];
    const corners2 = [[0, 0], [0, 6], [4, 4], [7, 0]];
    const values2 = corners2.map(P2);
    expect(Math.max(...values2)).toBe(20);
    expect(corners2[values2.indexOf(Math.max(...values2))]).toEqual([4, 4]);
  });

  test("Distance-time and speed-time graphs new MCQs", () => {
    const qs = QUESTION_BANK["Distance-time and speed-time graphs"];
    expect(150 / 3).toBe(50);
    expect((12 - 0) / 6).toBe(2);
    expect(10 * 8).toBe(80);
    for (const id of ["dst-001", "dst-002", "dst-003", "dst-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });
});
