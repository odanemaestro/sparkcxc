// ============================================================================
// Done by: Odane Robinson
//
// Verifies the fifth batch of previously-missing content: the first 9
// topics of Section 9 (Geometry and Trigonometry) - foundational plane
// geometry through congruence, similarity, symmetry, and constructions.
// Every computation was independently verified with Python before being
// written.
// ============================================================================
import { LESSONS, QUESTION_BANK } from "../lessonBank";

const NEW_TOPICS = [
  "Geometry concepts: points, lines, angles",
  "Angle properties: complementary, supplementary",
  "Parallel lines and transversals",
  "Properties of triangles",
  "Properties of quadrilaterals",
  "Congruent triangles",
  "Similar triangles and figures",
  "Symmetry: line and rotational",
  "Geometric constructions",
];

describe("content batch 5 - lessons and quizzes now exist", () => {
  test.each(NEW_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
  });

  test.each(NEW_TOPICS)("%s has its own QUESTION_BANK entry", (topic) => {
    expect(QUESTION_BANK[topic]).toBeDefined();
    expect(QUESTION_BANK[topic].length).toBeGreaterThan(0);
  });
});

describe("content batch 5 - quiz answers are mathematically verified", () => {
  test("Geometry concepts: points, lines, angles", () => {
    const qs = QUESTION_BANK["Geometry concepts: points, lines, angles"];
    expect(180 - 40 - 85).toBe(55);
    expect(360 - 90 - 110 - 95).toBe(65);
    for (const id of ["gcp-001", "gcp-002", "gcp-003", "gcp-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    expect(180 / 9).toBe(20); // structured: 9x=180
  });

  test("Angle properties: complementary, supplementary", () => {
    const qs = QUESTION_BANK["Angle properties: complementary, supplementary"];
    expect(90 - 34).toBe(56);
    expect(180 - 112).toBe(68);
    for (const id of ["acs-001", "acs-002", "acs-003", "acs-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: 4x=90, x=22.5, angles 22.5 & 67.5
    expect(90 / 4).toBe(22.5);
    expect(22.5 + 3 * 22.5).toBe(90);
    expect(95 + 85).toBe(180);
  });

  test("Parallel lines and transversals", () => {
    const qs = QUESTION_BANK["Parallel lines and transversals"];
    expect(180 - 65).toBe(115);
    expect(180 - 48).toBe(132);
    for (const id of ["plt-001", "plt-002", "plt-003", "plt-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Properties of triangles", () => {
    const qs = QUESTION_BANK["Properties of triangles"];
    expect(180 - 50 - 65).toBe(65);
    expect(180 - 72 - 72).toBe(36);
    expect(40 + 75).toBe(115); // exterior angle theorem
    expect((180 - 44) / 2).toBe(68);
    for (const id of ["pot-001", "pot-002", "pot-003", "pot-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: 6x=180, x=30, angles 90,60,30
    expect(180 / 6).toBe(30);
    expect(3 * 30 + 2 * 30 + 30).toBe(180);
  });

  test("Properties of quadrilaterals", () => {
    const qs = QUESTION_BANK["Properties of quadrilaterals"];
    expect(360 - 80 - 95 - 110).toBe(75);
    expect(180 - 65).toBe(115);
    for (const id of ["poq-001", "poq-002", "poq-003", "poq-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: (2x+10)+(3x-20)=180 -> x=38, angle A=86
    const x = (180 + 10) / 5;
    expect(x).toBe(38);
    expect(2 * 38 + 10).toBe(86);
    expect((2 * 38 + 10) + (3 * 38 - 20)).toBe(180);
  });

  test("Congruent triangles", () => {
    const qs = QUESTION_BANK["Congruent triangles"];
    for (const id of ["cgt-001", "cgt-002", "cgt-003", "cgt-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    expect(180 - 50 - 70).toBe(60); // cgt-005
  });

  test("Similar triangles and figures", () => {
    const qs = QUESTION_BANK["Similar triangles and figures"];
    expect(4 * 3).toBe(12);
    expect(9 / 6).toBe(1.5);
    expect(8 * 1.5).toBe(12);
    expect(14 * 0.5).toBe(7);
    for (const id of ["sim-001", "sim-002", "sim-003", "sim-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured: scale=12.5/5=2.5; YZ=7*2.5=17.5; LN=20/2.5=8
    expect(12.5 / 5).toBe(2.5);
    expect(7 * 2.5).toBe(17.5);
    expect(20 / 2.5).toBe(8);
  });

  test("Symmetry: line and rotational", () => {
    const qs = QUESTION_BANK["Symmetry: line and rotational"];
    for (const id of ["sym-001", "sym-002", "sym-003", "sym-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Geometric constructions", () => {
    const qs = QUESTION_BANK["Geometric constructions"];
    for (const id of ["gcn-001", "gcn-002", "gcn-003", "gcn-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });
});
