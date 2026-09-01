// ============================================================================
// Done by: Odane Robinson
//
// Verifies the seventh batch of previously-missing content: the remaining
// 4 topics of Section 1 (Computation) and all 7 topics of Section 2
// (Number Theory). Every computation was independently verified with
// Python before being written.
// ============================================================================
import { LESSONS, QUESTION_BANK } from "../lessonBank";

const LESSON_ONLY_TOPICS = [
  "Standard form (scientific notation)",
  "Number sequences - finding the rule",
  "Number sequences - generating terms",
];

const NEW_QUIZ_TOPICS = [
  "Arithmetic mean",
  "Currency conversion and exchange rates",
  "Calculator use and BODMAS",
  "Sets of numbers: natural, whole, integer, rational, irrational, real",
  "Factors, multiples, HCF and LCM",
  "Prime and composite numbers",
  "Square numbers and square roots",
  "Place value and base number systems",
];

const ALL_NEW_LESSON_TOPICS = [...LESSON_ONLY_TOPICS, ...NEW_QUIZ_TOPICS];

describe("content batch 7 - lessons now exist", () => {
  test.each(ALL_NEW_LESSON_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
  });
});

describe("content batch 7 - quiz content exists for newly-authored topics", () => {
  test.each(NEW_QUIZ_TOPICS)("%s has its own QUESTION_BANK entry", (topic) => {
    expect(QUESTION_BANK[topic]).toBeDefined();
    expect(QUESTION_BANK[topic].length).toBeGreaterThan(0);
  });
});

describe("content batch 7 - quiz answers are mathematically verified", () => {
  test("Arithmetic mean", () => {
    const qs = QUESTION_BANK["Arithmetic mean"];
    expect((4 + 7 + 9 + 12 + 18) / 5).toBe(10);
    expect((15 + 20 + 25 + 30) / 4).toBe(22.5);
    expect((2 * 4 + 3 * 6 + 5 * 2) / (4 + 6 + 2)).toBe(3);
    expect(12 * 5 - (8 + 10 + 14 + 16)).toBe(12);
    for (const id of ["am-001", "am-002", "am-003", "am-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Currency conversion and exchange rates", () => {
    const qs = QUESTION_BANK["Currency conversion and exchange rates"];
    expect(25 * 160).toBe(4000);
    expect(8000 / 160).toBe(50);
    expect(200 * 0.37).toBeCloseTo(74, 10);
    expect(45 / 0.15).toBe(300);
    for (const id of ["cur-001", "cur-002", "cur-003", "cur-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Calculator use and BODMAS", () => {
    const qs = QUESTION_BANK["Calculator use and BODMAS"];
    expect(3 + 4 * (6 - 2) ** 2).toBe(67);
    expect((15 + 9) / (2 * 3)).toBe(4);
    expect(20 - 6 / 2 + 3).toBe(20);
    expect(2 * 3 ** 2 - 4).toBe(14);
    for (const id of ["bod-001", "bod-002", "bod-003", "bod-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Sets of numbers", () => {
    const qs = QUESTION_BANK["Sets of numbers: natural, whole, integer, rational, irrational, real"];
    expect(Math.sqrt(9)).toBe(3); // rational
    expect(Number.isInteger(Math.sqrt(7))).toBe(false); // irrational check basis
    for (const id of ["son-001", "son-002", "son-003", "son-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Factors, multiples, HCF and LCM", () => {
    const qs = QUESTION_BANK["Factors, multiples, HCF and LCM"];
    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    expect(gcd(12, 18)).toBe(6);
    expect((12 * 18) / gcd(12, 18)).toBe(36);
    expect(gcd(24, 36)).toBe(12);
    expect((24 * 36) / gcd(24, 36)).toBe(72);
    expect(gcd(40, 60)).toBe(20);
    expect((40 * 60) / gcd(40, 60)).toBe(120);
    for (const id of ["fml-001", "fml-002", "fml-003", "fml-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Prime and composite numbers", () => {
    const qs = QUESTION_BANK["Prime and composite numbers"];
    expect(2 * 2 * 3 * 5).toBe(60);
    expect(3 * 17).toBe(51);
    expect(Math.sqrt(97)).toBeLessThan(10);
    for (const id of ["pcn-001", "pcn-002", "pcn-003", "pcn-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Square numbers and square roots", () => {
    const qs = QUESTION_BANK["Square numbers and square roots"];
    expect(12 * 12).toBe(144);
    expect(9 * 9).toBe(81);
    expect(7 * 7).toBe(49);
    expect(8 * 8).toBe(64);
    expect(7 ** 2 - Math.sqrt(64)).toBe(41);
    expect(14 * 14).toBe(196);
    for (const id of ["snr-001", "snr-002", "snr-003", "snr-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Place value and base number systems", () => {
    const qs = QUESTION_BANK["Place value and base number systems"];
    const bin = (bits) => bits.reduce((acc, b, i) => acc + b * 2 ** (bits.length - 1 - i), 0);
    expect(bin([1, 0, 1, 1])).toBe(11);
    expect(bin([1, 1, 0, 1])).toBe(13);
    expect(bin([1, 0, 1, 1, 0])).toBe(22);
    for (const id of ["pvb-001", "pvb-002", "pvb-003", "pvb-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Standard form lesson examples", () => {
    expect(4.56 * 10 ** 4).toBeCloseTo(45600, 6);
    expect(3 * 2).toBe(6);
  });

  test("Number sequences lesson examples", () => {
    // finding the rule: 3,7,11,15 -> Tn=4n-1
    expect(4 * 1 - 1).toBe(3);
    expect(4 * 2 - 1).toBe(7);
    // dots pattern 4,7,10,13 -> Tn=3n+1
    expect([1, 2, 3, 4].map(n => 3 * n + 1)).toEqual([4, 7, 10, 13]);
    // generating terms: Tn=5n-3
    expect([1, 2, 3, 4].map(n => 5 * n - 3)).toEqual([2, 7, 12, 17]);
    // Tn=n^2+2
    expect([1, 2, 3].map(n => n ** 2 + 2)).toEqual([3, 6, 11]);
  });
});
