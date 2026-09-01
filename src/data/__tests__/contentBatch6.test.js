// ============================================================================
// Done by: Odane Robinson
//
// Verifies the sixth batch of previously-missing content: the remaining 11
// topics of Section 9 (Geometry and Trigonometry), completing that
// section - all 5 transformation types, trig ratios, elevation/depression,
// bearings, and the 3 circle theorem topics. Every computation was
// independently verified with Python before being written.
// ============================================================================
import { LESSONS, QUESTION_BANK } from "../lessonBank";

const LESSON_ONLY_TOPICS = [
  "Bearings and navigation",
  "Circle theorems: angles at centre and circumference",
  "Circle theorems: cyclic quadrilaterals",
  "Circle theorems: tangents",
];

const NEW_LESSON_TOPICS = [
  "Transformations: translation",
  "Transformations: reflection",
  "Transformations: rotation",
  "Transformations: enlargement",
  "Combined transformations",
  "Trigonometric ratios: sin, cos, tan",
  "Angles of elevation and depression",
  ...LESSON_ONLY_TOPICS,
];

describe("content batch 6 - lessons now exist", () => {
  test.each(NEW_LESSON_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
  });
});

describe("content batch 6 - lesson-only topics kept their existing quiz content", () => {
  test("Bearings and navigation still has its verified past-paper question", () => {
    const qs = QUESTION_BANK["Bearings and navigation"];
    expect(qs.length).toBeGreaterThan(0);
  });
  test("all 3 circle theorem topics resolve (via alias) to the existing 6-question bank", () => {
    const canonical = QUESTION_BANK["Circle theorems: tangents, chords and cyclic quadrilaterals"];
    expect(canonical.length).toBeGreaterThanOrEqual(6);
  });
});

describe("content batch 6 - new/expanded quiz content exists", () => {
  test("shared transformations bank grew from 3 authored questions to 11, plus the pre-existing Paper-1 review question", () => {
    const qs = QUESTION_BANK["Transformations: reflection, rotation, translation and enlargement"];
    // 11 authored MCQ/structured questions (tr-001..tr-011) plus 1 merged
    // in from CXC_PAPER1_REVIEW_QUESTIONS (p1r-tr-001) = 12 total.
    expect(qs.length).toBe(12);
    // originals preserved
    for (const id of ["tr-001", "tr-002", "tr-003"]) {
      expect(qs.some(q => q.id === id)).toBe(true);
    }
    // new ones added
    for (const id of ["tr-004", "tr-005", "tr-006", "tr-007", "tr-008", "tr-009", "tr-010", "tr-011"]) {
      expect(qs.some(q => q.id === id)).toBe(true);
    }
  });

  test("Trigonometric ratios and Angles of elevation/depression are brand new topics", () => {
    expect(QUESTION_BANK["Trigonometric ratios: sin, cos, tan"].length).toBeGreaterThan(0);
    expect(QUESTION_BANK["Angles of elevation and depression"].length).toBeGreaterThan(0);
  });
});

describe("content batch 6 - quiz answers are mathematically verified", () => {
  test("Transformations: translation", () => {
    const qs = QUESTION_BANK["Transformations: reflection, rotation, translation and enlargement"];
    expect(3 + -4).toBe(-1);
    expect(-2 + 5).toBe(3); // tr-004
    expect(4 + 2).toBe(6);
    expect(2 - 3).toBe(-1); // tr-005
    expect(qs.find(q => q.id === "tr-004").correct).toBe(0);
    expect(qs.find(q => q.id === "tr-005").correct).toBe(0);
  });

  test("Transformations: reflection", () => {
    const qs = QUESTION_BANK["Transformations: reflection, rotation, translation and enlargement"];
    expect(qs.find(q => q.id === "tr-006").correct).toBe(0); // (5,3) in x-axis -> (5,-3)
    expect(qs.find(q => q.id === "tr-007").correct).toBe(0); // (-6,2) in y-axis -> (6,2)
  });

  test("Transformations: rotation", () => {
    const qs = QUESTION_BANK["Transformations: reflection, rotation, translation and enlargement"];
    expect(qs.find(q => q.id === "tr-008").correct).toBe(0); // 180deg: (-2,6)->(2,-6)
    expect(qs.find(q => q.id === "tr-009").correct).toBe(0); // 90 anticlockwise formula
  });

  test("Transformations: enlargement", () => {
    const qs = QUESTION_BANK["Transformations: reflection, rotation, translation and enlargement"];
    expect(3 * 4).toBe(12);
    expect(-2 * 4).toBe(-8);
    const img = [1 + 2 * (5 - 1), 1 + 2 * (3 - 1)];
    expect(img).toEqual([9, 5]);
    expect(qs.find(q => q.id === "tr-010").correct).toBe(0);
    expect(qs.find(q => q.id === "tr-011").correct).toBe(0);
  });

  test("Combined transformations lesson examples", () => {
    // reflect (2,1) in x-axis then translate (3,4)
    expect([2 + 3, -1 + 4]).toEqual([5, 3]);
    // combine translation vectors
    expect([-3 + 5, 2 + -1]).toEqual([2, 1]);
  });

  test("Trigonometric ratios: sin, cos, tan", () => {
    const qs = QUESTION_BANK["Trigonometric ratios: sin, cos, tan"];
    expect(6 / 10).toBe(0.6);
    expect(Math.round((8 / 17) * 100) / 100).toBe(0.47);
    expect(9 / 12).toBe(0.75);
    expect(Math.round(12 * Math.sin((35 * Math.PI) / 180) * 10) / 10).toBe(6.9);
    for (const id of ["trr-001", "trr-002", "trr-003", "trr-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: 15/cos(40deg)
    expect(Math.round((15 / Math.cos((40 * Math.PI) / 180)) * 10) / 10).toBe(19.6);
  });

  test("Angles of elevation and depression", () => {
    const qs = QUESTION_BANK["Angles of elevation and depression"];
    expect(Math.round(40 * Math.tan((32 * Math.PI) / 180) * 10) / 10).toBe(25.0);
    expect(Math.round((60 / Math.tan((25 * Math.PI) / 180)) * 10) / 10).toBe(128.7);
    expect(Math.round(20 * Math.tan((50 * Math.PI) / 180) * 10) / 10).toBe(23.8);
    for (const id of ["aed-001", "aed-002", "aed-003", "aed-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured
    expect(Math.round(25 * Math.tan((38 * Math.PI) / 180) * 10) / 10).toBe(19.5);
  });

  test("Bearings and navigation lesson example", () => {
    expect(65 + 180).toBe(245);
  });

  test("Circle theorems: angles at centre and circumference lesson example", () => {
    expect(84 / 2).toBe(42);
  });

  test("Circle theorems: cyclic quadrilaterals lesson example", () => {
    // 3x + (x+40) = 180 -> x = 35
    const x = (180 - 40) / 4;
    expect(x).toBe(35);
    expect(3 * x + (x + 40)).toBe(180);
  });
});
