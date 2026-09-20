const fs = require("fs");
const path = require("path");

describe("Mathematics flashcard navigation consistency", () => {
  const css = fs.readFileSync(
    path.join(__dirname, "..", "..", "learningIntelligence.css"),
    "utf8"
  );

  test("Previous and Next use one shared transparent navigation treatment", () => {
    expect(css).toContain("SPARK MATH FLASHCARD NAV CONSISTENCY V2");
    expect(css).toContain(".spark-flashcard-nav > button");
    expect(css).toContain("background:transparent !important");
    expect(css).toContain("box-shadow:none !important");
  });

  test("disabled Previous remains muted without a filled outer pill", () => {
    expect(css).toContain(".spark-flashcard-nav > button:disabled");
    expect(css).toContain(".spark-flashcard-nav > button:disabled .spark-nav-arrow");
    expect(css).toContain("var(--spark-text-muted");
    expect(css).toContain("var(--spark-muted");
  });

  test("left and right controls preserve mirrored alignment", () => {
    expect(css).toContain(".spark-flashcard-nav > button:first-child");
    expect(css).toContain("justify-content:flex-start !important");
    expect(css).toContain(".spark-flashcard-nav > button:last-child");
    expect(css).toContain("justify-content:flex-end !important");
  });
});