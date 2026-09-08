import {
  FLASHCARDS,
  FLASHCARD_DECKS,
  getDueFlashcards,
  nextFlashcardProgress,
  recommendedDeckIdsForSkills,
} from "./flashcards";

describe("SPARK curated flashcards", () => {
  test("ships a broad CSEC Mathematics deck", () => {
    expect(FLASHCARD_DECKS).toHaveLength(8);
    expect(FLASHCARDS.length).toBeGreaterThanOrEqual(48);
    expect(new Set(FLASHCARDS.map(card => card.id)).size).toBe(FLASHCARDS.length);
  });

  test("new learners receive a manageable daily queue instead of all unseen cards", () => {
    expect(getDueFlashcards([], "all").length).toBe(12);
  });

  test("weak skills prioritize matching decks in recommended review", () => {
    const priority = recommendedDeckIdsForSkills([{ skill: "Trigonometry" }, { skill: "Algebraic Fractions" }]);
    expect(priority.slice(0, 2)).toEqual(["trig", "algebra"]);
    const due = getDueFlashcards([], "all", new Date("2026-09-08T12:00:00Z"), priority);
    expect(due[0].deck).toBe("trig");
  });

  test("got-it rating schedules a future review", () => {
    const now = new Date("2026-09-08T12:00:00Z");
    const next = nextFlashcardProgress({}, "got_it", now);
    expect(next.repetitions).toBe(1);
    expect(next.interval_days).toBe(1);
    expect(new Date(next.next_review_at).getTime()).toBeGreaterThan(now.getTime());
  });

  test("again resets repetitions and returns the card in about ten minutes", () => {
    const now = new Date("2026-09-08T12:00:00Z");
    const next = nextFlashcardProgress({ repetitions: 4, interval_days: 15, ease_factor: 2.5 }, "again", now);
    expect(next.repetitions).toBe(0);
    expect(next.interval_days).toBe(0);
    expect(new Date(next.next_review_at).getTime() - now.getTime()).toBe(10 * 60 * 1000);
  });
});
