import {
  IT_OBJECTIVE_QUESTIONS,
  buildInformationTechnologyObjectiveFlashcards,
} from "./components/itFlashcardBank";
import coverage from "./course/itObjectiveCoverage.json";
import fs from "fs";
import path from "path";

describe("IT flashcard questions and all-subject flashcard routing", () => {
  test("all 63 IT objectives have a unique natural question", () => {
    expect(coverage).toHaveLength(63);
    expect(Object.keys(IT_OBJECTIVE_QUESTIONS)).toHaveLength(63);

    const cards = buildInformationTechnologyObjectiveFlashcards();
    expect(cards).toHaveLength(63);

    for (const card of cards) {
      expect(card.front.endsWith("?")).toBe(true);
      expect(card.front).not.toMatch(/complete CSEC response/i);
      expect(card.front).not.toMatch(/what must be done to satisfy this objective/i);
    }

    expect(new Set(cards.map(card => card.front)).size).toBe(63);
  });

  test("language-level objective is written as a meaningful student question", () => {
    expect(IT_OBJECTIVE_QUESTIONS["Distinguish language levels"]).toBe(
      "What are the differences between the main levels of programming languages?"
    );
  });

  test("the duplicated objective subtitle is removed from the card face", () => {
    const panel = fs.readFileSync(
      path.join(__dirname, "components", "InformationTechnologyFlashcardsPanel.jsx"),
      "utf8"
    );
    expect(panel).not.toContain('className="it-fc-objective-title"');
  });

  test("Mathematics, Physics and IT each have a nested Flashcards route", () => {
    const app = fs.readFileSync(path.join(__dirname, "..", "App.js"), "utf8");
    expect(app).toContain("function flashcardSubjectFromBrowserHash()");
    expect(app).toContain("function writeFlashcardSubjectToBrowserHash");
    expect(app).toContain('"mathematics"');
    expect(app).toContain('"physics"');
    expect(app).toContain('"information-technology"');
    expect(app).toContain('useState(() => flashcardSubjectFromBrowserHash())');
    expect(app).toContain('setFlashcardSubject(normalized === "flashcards" ? flashcardSubjectFromBrowserHash() : null)');
    expect(app).toContain("setFlashcardSubjectRoute(subject.id)");
    expect(app).toContain("setFlashcardSubjectRoute(null)");
  });

  test("nested flashcard route format is dashboard/flashcards/subject", () => {
    const app = fs.readFileSync(path.join(__dirname, "..", "App.js"), "utf8");
    expect(app).toContain('/dashboard/flashcards/${safeSubject}');
    expect(app).toContain('"/dashboard/flashcards"');
  });
});
