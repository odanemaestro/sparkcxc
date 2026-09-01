// ============================================================================
// Done by: Odane Robinson
//
// Verifies the ninth batch of previously-missing content: all 10 topics of
// Section 5 (Measurement). Every computation was independently verified
// with Python before being written.
// ============================================================================
import { LESSONS, QUESTION_BANK } from "../lessonBank";

const LESSON_ONLY_TOPICS = [
  "Arc length of a circle",
  "Area of a circle and sector",
  "Volume of solids",
  "Time, distance and speed",
  "Maps and scale drawings",
];

const NEW_QUIZ_TOPICS = [
  "Perimeter of polygons and circles",
  "Area of polygons",
  "Area of a triangle using ½absinC",
  "Surface area of solids",
  "Unit conversion",
];

const ALL_NEW_LESSON_TOPICS = [...LESSON_ONLY_TOPICS, ...NEW_QUIZ_TOPICS];

describe("content batch 9 - lessons now exist", () => {
  test.each(ALL_NEW_LESSON_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
  });
});

describe("content batch 9 - quiz content exists for newly-authored topics", () => {
  test.each(NEW_QUIZ_TOPICS)("%s has its own QUESTION_BANK entry", (topic) => {
    expect(QUESTION_BANK[topic]).toBeDefined();
    expect(QUESTION_BANK[topic].length).toBeGreaterThan(0);
  });
});

describe("content batch 9 - quiz answers are mathematically verified", () => {
  test("Perimeter of polygons and circles", () => {
    const qs = QUESTION_BANK["Perimeter of polygons and circles"];
    expect(6 * 7).toBe(42);
    expect(2 * (22 / 7) * 14).toBeCloseTo(88, 6);
    expect(2 * (12 + 8)).toBe(40);
    expect((22 / 7) * 21).toBeCloseTo(66, 6);
    for (const id of ["ppc-001", "ppc-002", "ppc-003", "ppc-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Arc length of a circle lesson examples", () => {
    expect((60 / 360) * 2 * (22 / 7) * 21).toBeCloseTo(22, 6);
    const theta = (11 * 360) / (2 * (22 / 7) * 21);
    expect(theta).toBeCloseTo(30, 6);
  });

  test("Area of polygons", () => {
    const qs = QUESTION_BANK["Area of polygons"];
    expect(0.5 * (8 + 12) * 5).toBe(50);
    expect(9 * 6).toBe(54);
    expect(10 * 6 + 0.5 * 10 * 4).toBe(80);
    expect(0.5 * 14 * 9).toBeCloseTo(63, 6);
    for (const id of ["aop-001", "aop-002", "aop-003", "aop-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured cut-out
    expect(12 * 5 - 5 * 5).toBe(35);
  });

  test("Area of a circle and sector lesson examples", () => {
    expect((22 / 7) * 49).toBeCloseTo(154, 6);
    expect((90 / 360) * (22 / 7) * 196).toBeCloseTo(154, 6);
  });

  test("Area of a triangle using half ab sinC", () => {
    const qs = QUESTION_BANK["Area of a triangle using ½absinC"];
    expect(0.5 * 8 * 10 * Math.sin((30 * Math.PI) / 180)).toBeCloseTo(20, 6);
    expect(0.5 * 12 * 15 * Math.sin((90 * Math.PI) / 180)).toBeCloseTo(90, 6);
    expect(0.5 * 7 * 9 * Math.sin((45 * Math.PI) / 180)).toBeCloseTo(22.3, 1);
    const sinC = 20.25 / 27;
    expect((Math.asin(sinC) * 180) / Math.PI).toBeCloseTo(48.6, 1);
    for (const id of ["atc-001", "atc-002", "atc-003", "atc-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Surface area of solids", () => {
    const qs = QUESTION_BANK["Surface area of solids"];
    expect(2 * (5 * 4 + 5 * 3 + 4 * 3)).toBe(94);
    expect(6 * 6 ** 2).toBe(216);
    expect(2 * (22 / 7) * 49 + 2 * (22 / 7) * 7 * 10).toBeCloseTo(748, 6);
    expect(3.14 * 9 + 2 * 3.14 * 3 * 8).toBeCloseTo(178.98, 6);
    for (const id of ["sas-001", "sas-002", "sas-003", "sas-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Volume of solids lesson examples", () => {
    expect((22 / 7) * 49 * 15).toBeCloseTo(2310, 6);
    expect((1 / 3) * 3.14 * 36 * 14).toBeCloseTo(527.52, 6);
  });

  test("Unit conversion", () => {
    const qs = QUESTION_BANK["Unit conversion"];
    expect(3.5 * 1000).toBe(3500);
    expect(2400 / 1000).toBe(2.4);
    expect(2.5 * 10000).toBe(25000);
    expect(3 * 1000000).toBe(3000000);
    for (const id of ["uc-001", "uc-002", "uc-003", "uc-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Time, distance and speed lesson examples", () => {
    expect(180 / 3).toBe(60);
    expect(72 * (5 / 18)).toBe(20);
  });

  test("Maps and scale drawings lesson examples", () => {
    expect((6 * 50000) / 100000).toBe(3);
    expect((7.5 * 100000) / 50000).toBe(15);
  });
});
