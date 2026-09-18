const fs = require("fs");
const path = require("path");

describe("final Mathematics and Physics flashcard question wording", () => {
  const physicsPanel = fs.readFileSync(
    path.join(__dirname, "..", "physics", "mechanics", "components", "PhysicsMechanicsSupportPanels.jsx"),
    "utf8"
  );
  const physicsLanguage = fs.readFileSync(
    path.join(__dirname, "..", "physics", "course", "physicsFlashcardLanguage.mjs"),
    "utf8"
  );
  const mathBank = fs.readFileSync(
    path.join(__dirname, "..", "learning", "flashcards.js"),
    "utf8"
  );
  const app = fs.readFileSync(path.join(__dirname, "..", "App.js"), "utf8");

  test("Physics no longer renders terse labels such as Scalar?", () => {
    expect(physicsLanguage).toContain('"Scalar?": "What is a scalar quantity?"');
    expect(physicsLanguage).toContain('"Vector?": "What is a vector quantity?"');
    expect(physicsLanguage).toContain('"Distance vs displacement?": "What is the difference between distance and displacement?"');
    expect(physicsPanel).toContain("physicsFlashcardQuestion(current)");
    expect(physicsPanel).not.toContain("{current.front}</MathText>");
  });

  test("generated Physics objective cards are converted into meaningful questions", () => {
    expect(physicsLanguage).toContain("physicsObjectiveQuestion");
    expect(physicsLanguage).toContain("physicsObjectiveConcept");
    expect(physicsLanguage).toContain("What common mistake should you avoid when working with");
    expect(physicsLanguage).toContain("How could a CSEC Physics question test your understanding of");
  });

  test("short Mathematics prompts are phrased as complete revision questions", () => {
    expect(mathBank).toContain('front:"How is a number written in standard form?"');
    expect(mathBank).toContain('front:"How do you identify the median of a data set?"');
    expect(mathBank).toContain('front:"How do you identify the mode of a data set?"');
    expect(mathBank).toContain("What relationship does Pythagoras' theorem give for a right-angled triangle?");
    expect(mathBank).toContain('front:"How do you add two vectors using their components?"');
  });

  test("all three flashcard subjects retain direct refresh-safe routes", () => {
    expect(app).toContain("function flashcardSubjectFromBrowserHash()");
    expect(app).toContain("function writeFlashcardSubjectToBrowserHash");
    expect(app).toContain('"mathematics"');
    expect(app).toContain('"physics"');
    expect(app).toContain('"information-technology"');
    expect(app).toContain('/dashboard/flashcards/${safeSubject}');
  });
});
