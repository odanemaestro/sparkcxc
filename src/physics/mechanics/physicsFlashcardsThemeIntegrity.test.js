const fs = require("fs");
const path = require("path");

describe("Physics flashcards shared theme integrity", () => {
  const css = fs.readFileSync(
    path.join(__dirname, "components", "physicsMechanics.css"),
    "utf8"
  );

  test("Physics flashcards consume the shared SPARK appearance tokens", () => {
    expect(css).toContain("SPARK PHYSICS FLASHCARD SHARED THEME V1");
    expect(css).toContain("--pm-bg:var(--spark-bg");
    expect(css).toContain("--pm-card:var(--spark-paper");
    expect(css).toContain("--pm-ink:var(--spark-ink");
    expect(css).toContain("--pm-primary:var(--spark-teal");
    expect(css).toContain("background:var(--spark-bg");
  });

  test("selected Physics section and topic use the same tinted teal active treatment as other flashcard decks", () => {
    expect(css).toContain(".pm-flashcard-topics .pm-topic-btn.active");
    expect(css).toContain("background:var(--spark-teal-light");
    expect(css).toContain("border-color:var(--spark-teal");
    expect(css).toContain("color:var(--spark-teal-dark");
  });

  test("main Physics flashcard uses the shared paper and teal gradient surface", () => {
    expect(css).toContain(".pm-flashcards-dashboard .pm-flashcard-polished");
    expect(css).toContain("color-mix(in srgb,var(--spark-teal-light");
    expect(css).toContain("var(--spark-paper");
    expect(css).toContain("var(--spark-shadow-md");
  });

  test("dark Physics flashcards use shared navy surfaces instead of the legacy charcoal palette", () => {
    expect(css).toContain('html[data-theme="dark"] .pm-flashcards-dashboard');
    expect(css).toContain("var(--spark-bg,#0A1626)");
    expect(css).toContain("var(--spark-paper,#102239)");
    expect(css).toContain("var(--spark-teal-light,#123D3A)");
    expect(css).toContain("var(--spark-ink,#EAF2FF)");
  });

  test("Physics flashcard navigation follows shared teal and navy button roles", () => {
    expect(css).toContain(".pm-flashcard-nav-row .pm-btn:not(.secondary)");
    expect(css).toContain(".pm-flashcard-nav-row .pm-btn.secondary");
    expect(css).toContain("background:var(--spark-teal");
    expect(css).toContain("background:var(--spark-paper");
  });
});