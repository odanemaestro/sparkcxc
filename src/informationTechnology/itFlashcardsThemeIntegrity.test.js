const fs = require("fs");
const path = require("path");

describe("Information Technology flashcards theme integrity", () => {
  const css = fs.readFileSync(
    path.join(__dirname, "components", "informationTechnologyFlashcards.css"),
    "utf8"
  );

  test("dark mode owns the full flashcard page background", () => {
    expect(css).toContain("--it-bg:#0f1928");
    expect(css).toContain("background:var(--it-bg)");
    expect(css).toContain('html[data-theme="dark"] .it-flashcards');
  });

  test("dark active controls use dark opaque surfaces instead of transparent light-page bleed-through", () => {
    expect(css).toContain("SPARK IT FLASHCARDS DARK SURFACE V1");
    expect(css).toContain("background:#17342f");
    expect(css).toContain("background:#17312f");
  });
});