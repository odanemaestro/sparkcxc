const fs = require("fs");
const path = require("path");

describe("SPARK flashcard text alignment", () => {
  const mathCss = fs.readFileSync(path.join(__dirname, "..", "learningIntelligence.css"), "utf8");
  const physicsCss = fs.readFileSync(path.join(__dirname, "..", "physics", "mechanics", "components", "physicsMechanics.css"), "utf8");
  const itCss = fs.readFileSync(path.join(__dirname, "components", "informationTechnologyFlashcards.css"), "utf8");

  test("Mathematics question and answer text use a consistent left edge", () => {
    expect(mathCss).toContain("SPARK FLASHCARD TEXT ALIGNMENT FINAL V1");
    expect(mathCss).toContain(".spark-flashcard-question,");
    expect(mathCss).toContain("text-align:left;");
  });

  test("Physics question and answer text use a consistent left edge", () => {
    expect(physicsCss).toContain("SPARK PHYSICS FLASHCARD TEXT ALIGNMENT FINAL V1");
    expect(physicsCss).toContain(".pm-flashcards-dashboard .pm-flashcard-question-text,");
    expect(physicsCss).toContain("text-align:left;");
  });

  test("Information Technology question and answer text use a consistent left edge", () => {
    expect(itCss).toContain("SPARK IT FLASHCARD TEXT ALIGNMENT FINAL V1");
    expect(itCss).toContain(".it-flashcard h2,");
    expect(itCss).toContain("justify-items:stretch;");
    expect(itCss).toContain("text-align:left;");
  });

  test("labels and reveal hints remain centred", () => {
    expect(mathCss).toContain(".spark-flashcard-label,");
    expect(physicsCss).toContain(".pm-flashcards-dashboard .pm-flashcard-side-label,");
    expect(itCss).toContain(".it-flashcard-side,");
  });
});
