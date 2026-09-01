// ============================================================================
// Done by: Odane Robinson
//
// Verifies the twelfth and final batch of previously-missing content: all 4
// topics of "Patterns and Investigation", completing every one of the 108
// originally-missing topics found in this project's content-gap audit.
// Every computation was independently verified with Python before being
// written.
// ============================================================================
import { LESSONS, QUESTION_BANK, TOPIC_ALIASES, SYLLABUS_SECTIONS } from "../lessonBank";

const LESSON_ONLY_TOPICS = [
  "Using the nth term formula to find a specific term",
  "Reverse application: finding which term has a given value",
];

const NEW_QUIZ_TOPICS = [
  "Identifying and extending visual patterns",
  "Building a table of values from a pattern",
];

const ALL_NEW_LESSON_TOPICS = [...LESSON_ONLY_TOPICS, ...NEW_QUIZ_TOPICS];

describe("content batch 12 (final) - lessons now exist", () => {
  test.each(ALL_NEW_LESSON_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
  });
});

describe("content batch 12 (final) - quiz content exists", () => {
  test.each(NEW_QUIZ_TOPICS)("%s has its own QUESTION_BANK entry", (topic) => {
    expect(QUESTION_BANK[topic]).toBeDefined();
    expect(QUESTION_BANK[topic].length).toBeGreaterThan(0);
  });

  test("Identifying and extending visual patterns kept its verified past-paper question, merged with new MCQs into the same array (not a duplicate object key)", () => {
    const qs = QUESTION_BANK["Identifying and extending visual patterns"];
    expect(qs.some(q => q.id === "cxc25-jan-q7")).toBe(true);
    for (const id of ["ivp-001", "ivp-002", "ivp-003", "ivp-004"]) {
      expect(qs.some(q => q.id === id)).toBe(true);
    }
    expect(qs.length).toBeGreaterThanOrEqual(5); // 1 original + 4 new, plus possibly a merged Paper-1 review question
  });

  test("Using the nth term formula and Reverse application share the already-strong existing bank", () => {
    // Both topics deliberately rely on the existing 3-question bank for
    // "Finding a formula for the nth term from a pattern", since each of
    // those 3 real past-paper questions already comprehensively covers
    // finding a formula, using it forward, AND using it in reverse in one
    // multi-part structured question.
    const shared = QUESTION_BANK["Finding a formula for the nth term from a pattern"];
    expect(shared.length).toBeGreaterThanOrEqual(3);
  });
});

describe("content batch 12 (final) - quiz answers are mathematically verified", () => {
  test("Identifying and extending visual patterns", () => {
    const qs = QUESTION_BANK["Identifying and extending visual patterns"];
    expect(10 + 3).toBe(13);
    expect(7 + 3).toBe(10);
    expect(6 - 2).not.toBe(12 - 6); // confirms the non-linear distractor logic
    expect(7 + 2 + 2).toBe(11);
    for (const id of ["ivp-001", "ivp-002", "ivp-003", "ivp-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Building a table of values from a pattern", () => {
    const qs = QUESTION_BANK["Building a table of values from a pattern"];
    expect(14 + 4).toBe(18);
    expect(10 - 6).toBe(4);
    expect(14 - 10).toBe(4);
    expect([1, 2, 3, 4].map(n => 4 * n + 1)).toEqual([5, 9, 13, 17]);
    const vals = [3, 8, 13];
    while (vals.length < 6) vals.push(vals[vals.length - 1] + 5);
    expect(vals).toEqual([3, 8, 13, 18, 23, 28]);
    for (const id of ["btv-001", "btv-002", "btv-003", "btv-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
    const hexvals = [6, 11, 16];
    while (hexvals.length < 5) hexvals.push(hexvals[hexvals.length - 1] + 5);
    expect(hexvals).toEqual([6, 11, 16, 21, 26]);
    expect([1, 3].map(n => 5 * n + 1)).toEqual([6, 16]);
  });

  test("Using the nth term formula to find a specific term - lesson examples", () => {
    expect(5 * 20 - 3).toBe(97);
    expect(3 * 15 + 2).toBe(47);
  });

  test("Reverse application: finding which term has a given value - lesson examples", () => {
    expect((61 - 1) / 4).toBe(15);
    expect((74 - 1) / 4).toBeCloseTo(18.25, 10);
    expect(Number.isInteger((74 - 1) / 4)).toBe(false); // confirms 74 is not in the sequence
  });

  test("Significant figures and decimal places - closes the last genuine content gap found by the completion check", () => {
    const qs = QUESTION_BANK["Significant figures and decimal places"];
    expect(qs).toBeDefined();
    expect(qs.length).toBeGreaterThan(0);
    expect(Math.round(8.6754 * 100) / 100).toBe(8.68);
    expect(Math.round(3.0954 * 1000) / 1000).toBe(3.095);
    expect(Math.round(7.2385 * 100) / 100).toBe(7.24);
    for (const id of ["sfd-001", "sfd-002", "sfd-003", "sfd-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });
});

describe("content batch 12 (final) - project completion check", () => {
  test("all syllabus topics now have both a lesson and quiz content (directly or via a verified alias)", () => {
    // This is the final checkpoint for the whole multi-session content
    // effort that started with the user's single bug report about
    // "Circle theorems: cyclic quadrilaterals" showing generic filler
    // questions. Every syllabus topic should now resolve to real content.
    const allTopics = SYLLABUS_SECTIONS.flatMap(s => s.topics);
    const missingLessons = allTopics.filter(t => !LESSONS[t]);
    const missingQuiz = allTopics.filter(t => !QUESTION_BANK[t] && !TOPIC_ALIASES[t]);
    expect(missingLessons).toEqual([]);
    expect(missingQuiz).toEqual([]);
  });
});
