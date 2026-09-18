const fs = require("fs");
const path = require("path");
const course = require("./course/itCourseData.json");
const coverage = require("./course/itObjectiveCoverage.json");

describe("Information Technology flashcards V2 coverage and presentation", () => {
  const bank = fs.readFileSync(path.join(__dirname, "components", "itFlashcardBank.js"), "utf8");
  const component = fs.readFileSync(path.join(__dirname, "components", "InformationTechnologyFlashcardsPanel.jsx"), "utf8");
  const css = fs.readFileSync(path.join(__dirname, "components", "informationTechnologyFlashcards.css"), "utf8");
  const registry = fs.readFileSync(path.join(__dirname, "..", "subjects", "subjectRegistry.js"), "utf8");
  const app = fs.readFileSync(path.join(__dirname, "..", "App.js"), "utf8");

  test("the current IT objective map contains exactly 63 unique syllabus objectives", () => {
    expect(coverage).toHaveLength(63);
    const keys = coverage.map(item => `${item.section}.${item.objective}`);
    expect(new Set(keys).size).toBe(63);
    expect(coverage.every(item => Number(item.topicId) > 0)).toBe(true);
  });

  test("every syllabus objective becomes exactly one detailed objective flashcard", () => {
    expect(bank).toContain("objectiveCoverage || []");
    expect(bank).toContain('id: `it-objective-${item.section}-${item.objective}`');
    expect(bank).toContain("answerPoints: Array.isArray(item.points) ? item.points : []");
    expect(coverage.every(item => Array.isArray(item.points) && item.points.length > 0)).toBe(true);

    const totalCoveragePoints = coverage.reduce((sum, item) => sum + item.points.length, 0);
    expect(totalCoveragePoints).toBe(114);
  });

  test("lesson recall contributes 52 additional cards across all 26 topics", () => {
    expect(course.topics).toHaveLength(26);
    const total = course.topics.reduce((sum, topic) => sum + (topic.quick || []).length, 0);
    expect(total).toBe(52);
    expect(bank).toContain("topic.quickAnswers");
  });

  test("objective cards retain CXC command wording and detailed answer presentation", () => {
    expect(bank).not.toContain("What should be included in a complete CSEC response?");
    expect(bank).not.toContain("What must be done to satisfy this objective?");
    expect(bank).toContain("Use the correct Information Technology terms.");
    expect(component).toContain("A complete answer should include:");
    expect(component).toContain("CSEC focus");
    expect(component).toContain("answerPoints");
  });

  test("flashcard dashboard explicitly reports complete objective coverage", () => {
    expect(component).toContain("objectives covered");
    expect(component).toContain("Syllabus objectives");
    expect(component).toContain("63 objective cards with detailed answer points");
    expect(component).toContain("52 quick-review cards from all 26 topics");
  });

  test("IT remains enabled as a flashcard-capable subject", () => {
    const start = registry.indexOf("informationTechnology: Object.freeze({");
    const end = registry.indexOf("}),", start);
    const block = registry.slice(start, end + 3);
    expect(block).toContain("flashcards: true");
  });

  test("App lazy-loads and renders the IT flashcard panel", () => {
    expect(app).toContain("InformationTechnologyFlashcardsPanel");
    expect(app).toContain('import("./informationTechnology/components/InformationTechnologyFlashcardsPanel")');
    expect(app).toContain('flashcardSubject === "information-technology"');
  });

  test("CSS covers desktop, tablet, iPad, phone and dark mode without fixed answer clipping", () => {
    expect(css).toContain("@media(min-width:768px) and (max-width:1180px)");
    expect(css).toContain("@media(max-width:820px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
    expect(css).toContain("safe-area-inset-bottom");
    expect(css).toContain("-webkit-overflow-scrolling:touch");
    expect(css).not.toContain("max-height:390px");
  });
});
