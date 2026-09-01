// ============================================================================
// Done by: Odane Robinson
// Regression tests for the topic-alias bug reported directly by the user:
// clicking "Take practice quiz" on "Circle theorems: cyclic quadrilaterals"
// (and 91 other syllabus topics - 74% of the syllabus) silently showed a
// hardcoded 2-question generic filler instead of real content, because
// QUESTION_BANK's ~38 combined topic names rarely exactly matched the 124
// granular syllabus topic names used for navigation.
// ============================================================================
import { QUESTION_BANK, TOPIC_ALIASES, SYLLABUS_SECTIONS, getQuizQuestionsForTopic } from "../lessonBank";

describe("getQuizQuestionsForTopic - the reported bug, fixed", () => {
  test("the exact topic the user reported now returns real questions, not a content gap", () => {
    const { questions, isContentGap } = getQuizQuestionsForTopic("Circle theorems: cyclic quadrilaterals");
    expect(isContentGap).toBe(false);
    expect(questions.length).toBeGreaterThan(0);
    // Must be the REAL circle-theorem questions, not the old generic filler.
    expect(questions.some(q => q.id?.startsWith("gen-"))).toBe(false);
  });

  test("every aliased topic resolves to real, non-empty question content", () => {
    for (const [granularTopic, canonicalTopic] of Object.entries(TOPIC_ALIASES)) {
      const { questions, isContentGap } = getQuizQuestionsForTopic(granularTopic);
      expect(isContentGap).toBe(false);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions).toEqual(QUESTION_BANK[canonicalTopic]);
    }
  });

  test("every alias target actually exists in QUESTION_BANK (no typo'd canonical names)", () => {
    for (const canonicalTopic of Object.values(TOPIC_ALIASES)) {
      expect(QUESTION_BANK[canonicalTopic]).toBeDefined();
      expect(QUESTION_BANK[canonicalTopic].length).toBeGreaterThan(0);
    }
  });

  test("a topic with a genuine content gap is honestly reported as one", () => {
    // Rather than hardcode one topic's name (which kept going stale as
    // more content batches filled gaps in - "Congruent triangles" then
    // "Angles of elevation and depression" both had to be swapped out
    // after gaining real content), find whatever syllabus topic currently
    // has neither a direct QUESTION_BANK entry nor an alias, and confirm
    // it's honestly reported as a gap rather than silently matching
    // something unrelated. Skips (rather than fails) once every topic is
    // eventually covered - a good problem to have.
    const allTopics = SYLLABUS_SECTIONS.flatMap(s => s.topics);
    const genuineGap = allTopics.find(t => !QUESTION_BANK[t] && !TOPIC_ALIASES[t]);
    if (!genuineGap) {
      console.warn("Every syllabus topic now has quiz content - nothing left to test here.");
      return;
    }
    const { questions, isContentGap } = getQuizQuestionsForTopic(genuineGap);
    expect(isContentGap).toBe(true);
    expect(questions).toEqual([]);
  });

  test("a topic with a direct exact match doesn't need the alias map at all", () => {
    const { questions, isContentGap } = getQuizQuestionsForTopic("Pythagoras' theorem");
    expect(isContentGap).toBe(false);
    expect(questions.length).toBeGreaterThan(0);
  });
});
