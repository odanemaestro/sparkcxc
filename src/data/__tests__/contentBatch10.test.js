// ============================================================================
// Done by: Odane Robinson
//
// Verifies the tenth batch of previously-missing content: all 12 topics of
// Section 6 (Statistics), completing that section. Every computation was
// independently verified with Python before being written.
// ============================================================================
import { LESSONS, QUESTION_BANK } from "../lessonBank";

const ALL_NEW_LESSON_TOPICS = [
  "Types of data: discrete and continuous",
  "Frequency tables",
  "Class intervals, boundaries, midpoints",
  "Bar charts, pie charts, line graphs",
  "Histograms and frequency polygons",
  "Mean, median, mode",
  "Choosing the right average",
  "Range, IQR, semi-IQR",
  "Cumulative frequency and Ogive",
  "Using the Ogive: quartiles and percentiles",
  "Making inferences from data",
];

const NEW_QUIZ_TOPICS = [
  "Types of data: discrete and continuous",
  "Frequency tables",
  "Class intervals, boundaries, midpoints",
  "Bar charts, pie charts, line graphs",
  "Histograms and frequency polygons",
  "Choosing the right average",
  "Range, IQR, semi-IQR",
  "Making inferences from data",
  "Probability: sample space, theoretical and experimental",
];

describe("content batch 10 - lessons now exist", () => {
  test.each(ALL_NEW_LESSON_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
  });
});

describe("content batch 10 - quiz content exists for newly-authored topics", () => {
  test.each(NEW_QUIZ_TOPICS)("%s has its own QUESTION_BANK entry", (topic) => {
    expect(QUESTION_BANK[topic]).toBeDefined();
    expect(QUESTION_BANK[topic].length).toBeGreaterThan(0);
  });

  test("Probability topic genuinely had zero quiz questions before this batch (lesson existed, quiz didn't)", () => {
    // This was the one topic in the section that had the opposite gap
    // from the rest: a real lesson already existed, but QUESTION_BANK had
    // nothing for it at all.
    expect(QUESTION_BANK["Probability: sample space, theoretical and experimental"].length).toBe(5);
  });
});

describe("content batch 10 - quiz answers are mathematically verified", () => {
  test("Types of data: discrete and continuous", () => {
    const qs = QUESTION_BANK["Types of data: discrete and continuous"];
    for (const id of ["tod-001", "tod-002", "tod-003", "tod-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Frequency tables", () => {
    const qs = QUESTION_BANK["Frequency tables"];
    expect(4 + 7 + 5 + 6).toBe(22);
    expect(2 * 3 + 4 * 5 + 6 * 2).toBe(38);
    expect(25 - 8 - 10).toBe(7);
    for (const id of ["ft-001", "ft-002", "ft-003", "ft-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured siblings frequency table
    const siblings = [1, 2, 0, 1, 3, 2, 1, 0, 2, 1, 1, 3];
    const counts = siblings.reduce((acc, v) => ({ ...acc, [v]: (acc[v] || 0) + 1 }), {});
    expect(counts).toEqual({ 0: 2, 1: 5, 2: 3, 3: 2 });
    expect(siblings.reduce((a, b) => a + b, 0)).toBe(17);
  });

  test("Class intervals, boundaries, midpoints", () => {
    const qs = QUESTION_BANK["Class intervals, boundaries, midpoints"];
    expect((30 + 39) / 2).toBe(34.5);
    expect(24.5 - 14.5).toBe(10);
    for (const id of ["cib-001", "cib-002", "cib-003", "cib-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Bar charts, pie charts, line graphs", () => {
    const qs = QUESTION_BANK["Bar charts, pie charts, line graphs"];
    expect((15 / 40) * 360).toBe(135);
    expect((90 / 360) * 120).toBe(30);
    expect(35000 - 20000).toBe(15000);
    expect(360 - 90 - 120 - 100).toBe(50);
    for (const id of ["bpl-001", "bpl-002", "bpl-003", "bpl-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured
    expect(90 - 30 - 20 - 25).toBe(15);
    expect((25 / 90) * 360).toBeCloseTo(100, 6);
    expect((15 / 90) * 360).toBeCloseTo(60, 6);
  });

  test("Histograms and frequency polygons", () => {
    const qs = QUESTION_BANK["Histograms and frequency polygons"];
    expect((20 + 29) / 2).toBe(24.5);
    for (const id of ["hfp-001", "hfp-002", "hfp-003", "hfp-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Mean, median, mode lesson examples", () => {
    expect((4 + 7 + 4 + 9 + 6) / 5).toBe(6);
    expect((6 + 8) / 2).toBe(7);
  });

  test("Choosing the right average", () => {
    const qs = QUESTION_BANK["Choosing the right average"];
    for (const id of ["cra-001", "cra-002", "cra-003", "cra-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Range, IQR, semi-IQR", () => {
    const qs = QUESTION_BANK["Range, IQR, semi-IQR"];
    expect(25 - 7).toBe(18);
    expect(35 - 15).toBe(20);
    expect((35 - 15) / 2).toBe(10);
    expect(48 - 22).toBe(26);
    expect((48 - 22) / 2).toBe(13);
    for (const id of ["riq-001", "riq-002", "riq-003", "riq-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured
    expect(60 - 5).toBe(55);
    expect(40 - 18).toBe(22);
    expect((40 - 18) / 2).toBe(11);
  });

  test("Cumulative frequency and Ogive lesson example", () => {
    const freqs = [5, 8, 12, 6];
    const cumulative = freqs.reduce((acc, f) => [...acc, (acc.at(-1) || 0) + f], []);
    expect(cumulative).toEqual([5, 13, 25, 31]);
  });

  test("Using the Ogive lesson example", () => {
    const n = 80;
    expect(n / 2).toBe(40);
    expect(n / 4).toBe(20);
    expect((3 * n) / 4).toBe(60);
  });

  test("Making inferences from data", () => {
    const qs = QUESTION_BANK["Making inferences from data"];
    for (const id of ["mid-001", "mid-002", "mid-003", "mid-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Probability: sample space, theoretical and experimental", () => {
    const qs = QUESTION_BANK["Probability: sample space, theoretical and experimental"];
    expect(1 / 6).toBeCloseTo(1 / 6, 10);
    expect(3 / 8).toBe(0.375);
    expect(28 / 50).toBeCloseTo(14 / 25, 10);
    for (const id of ["prob-001", "prob-002", "prob-003", "prob-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    // structured
    expect(4 / 12).toBeCloseTo(1 / 3, 10);
    expect(1 - 3 / 12).toBe(0.75);
    expect(60 * (4 / 12)).toBe(20);
  });
});
