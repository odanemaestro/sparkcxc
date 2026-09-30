const fs = require("fs");
const path = require("path");

function source(...parts) {
  return fs.readFileSync(path.join(__dirname, ...parts), "utf8");
}

describe("SPARK shared flashcard experience", () => {
  const mathematics = source("components", "learning", "FlashcardsPanel.jsx");
  const physics = source("physics", "mechanics", "components", "PhysicsMechanicsSupportPanels.jsx");
  const informationTechnology = source("informationTechnology", "components", "InformationTechnologyFlashcardsPanel.jsx");
  const generic = source("subjects", "GenericSubjectFlashcardsPanel.jsx");
  const socialStudies = source("socialStudies", "components", "SocialStudiesFlashcardsPanel.jsx");
  const genericCss = source("subjects", "genericSubjectFlashcards.css");

  const swipePanels = [
    ["Mathematics", mathematics],
    ["Physics", physics],
    ["Information Technology", informationTechnology],
    ["Generic subjects", generic],
    ["Social Studies", socialStudies],
  ];

  test.each(swipePanels)("%s flashcards support pointer swipe navigation", (_name, code) => {
    expect(code).toContain("setPointerCapture");
    expect(code).toContain("pointerId");
    expect(code).toContain("velocity");
    expect(code).toMatch(/Math\.abs\(rawDelta\)\s*>\s*64/);
    expect(code).toMatch(/Math\.abs\([^)]*velocity[^)]*\)\s*>\s*0\.45/);
    expect(code).toContain("onPointerDown");
    expect(code).toContain("onPointerMove");
    expect(code).toContain("onPointerUp");
    expect(code).toContain("onPointerCancel");
  });

  test("generic flashcards preserve vertical page scrolling while allowing horizontal swipes", () => {
    expect(genericCss).toContain("touch-action:pan-y");
    expect(genericCss).toContain("is-dragging");
    expect(genericCss).toContain("is-settling");
    expect(genericCss).toContain("@media(pointer:coarse)");
  });

  test("Social Studies uses the shared flashcard theme instead of its old standalone card theme", () => {
    expect(socialStudies).toContain('import "../../subjects/genericSubjectFlashcards.css"');
    expect(socialStudies).toContain('className="spark-generic-flashcards"');
    expect(socialStudies).toContain("spark-generic-flashcards-summary");
    expect(socialStudies).toContain("spark-generic-flashcards-sections");
    expect(socialStudies).toContain("spark-generic-flashcard-progress-row");
    expect(socialStudies).toContain("spark-generic-flashcard-stage");
    expect(socialStudies).toContain("spark-generic-flashcard");
    expect(socialStudies).toContain("spark-generic-flashcard-nav");
    expect(socialStudies).not.toContain('className="ss-flashcard ');
  });

  test("the shared flashcard theme uses common SPARK tokens and button roles", () => {
    expect(genericCss).toContain("var(--spark-paper)");
    expect(genericCss).toContain("var(--spark-ink)");
    expect(genericCss).toContain("var(--spark-text-muted)");
    expect(genericCss).toContain("var(--spark-teal)");
    expect(genericCss).toContain("var(--spark-teal-light)");
    expect(genericCss).toContain("var(--spark-surface-navy");
    expect(genericCss).toContain(".spark-generic-flashcard-nav button:last-child");
  });

  test("Integrated Science receives swipe through the generic subject flashcard panel", () => {
    const app = source("App.js");
    expect(app).toContain("GenericSubjectFlashcardsPanel");
    expect(app).toContain("subject={activeFlashcardSubject}");
  });
});
