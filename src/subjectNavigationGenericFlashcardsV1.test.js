const fs = require("fs");
const path = require("path");

function source(...parts) {
  return fs.readFileSync(path.join(__dirname, ...parts), "utf8");
}

describe("SPARK subject navigation and generic flashcards V1", () => {
  const app = source("App.js");
  const progressDetail = source("components", "learning", "SubjectProgressDetail.jsx");
  const genericFlashcards = source("subjects", "GenericSubjectFlashcardsPanel.jsx");
  const selection = source("subjects", "SubjectSelectionView.jsx");
  const nextBestAction = source("learning", "nextBestActionV2.js");
  const migration = source(
    "..",
    "supabase",
    "migrations",
    "20260925010000_integrated_science_flashcards.sql"
  );

  test("subject progress Open subject does not depend on a recommendation payload", () => {
    expect(progressDetail).toContain("onOpenSubject(subject)");
    expect(app).toContain("if (!recommendation)");
    expect(app).toContain("openSubject(subject)");
  });

  test("flashcard routes accept safe dynamic subject ids", () => {
    expect(app).toContain("function normalizeFlashcardSubjectId");
    expect(app).toContain("/^[a-z0-9][a-z0-9-]*$/");
    expect(app).not.toContain("const FLASHCARD_ROUTE_SUBJECTS");
    expect(app).toContain("GenericSubjectFlashcardsPanel");
  });

  test("only Mathematics uses the Mathematics flashcard panel", () => {
    expect(app).toContain('flashcardSubject === "mathematics"');
    expect(app).toContain("subject={activeFlashcardSubject}");
    expect(app).toContain("!flashcardSubject || !activeFlashcardSubject");
  });

  test("generic subject flashcards use published lesson content and canonical progress", () => {
    expect(genericFlashcards).toContain("buildGenericSubjectFlashcards");
    expect(genericFlashcards).toContain("lesson.flashcards");
    expect(genericFlashcards).toContain("lesson.keyPoints");
    expect(genericFlashcards).toContain("interactiveDiagrams");
    expect(genericFlashcards).toContain('activityType: "flashcard_review"');
    expect(genericFlashcards).toContain("recordSubjectActivity");
    expect(genericFlashcards).toContain("setPointerCapture");
    expect(genericFlashcards).toContain('event.key === "ArrowLeft"');
    expect(genericFlashcards).toContain('event.key === "ArrowRight"');
  });

  test("Integrated Science explicitly advertises working study and flashcard routes", () => {
    expect(migration).toContain("where id = 'integrated-science'");
    expect(migration).toContain("'{study}'");
    expect(migration).toContain("'{flashcards}'");
    expect(migration).toContain("/study/integrated-science");
    expect(migration).toContain("/dashboard/flashcards/integrated-science");
    expect(selection).toContain("Review cards built from this subject's published SPARK lessons");
  });

  test("generic flashcard recommendations open the dashboard flashcard route", () => {
    expect(nextBestAction).toContain('actionType === "flashcards"');
    expect(nextBestAction).toContain('special:"dashboard-flashcards"');
    expect(nextBestAction).toContain('/dashboard/flashcards/');
  });
});
