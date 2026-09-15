const fs = require("fs");
const path = require("path");

function findOwner(source, phrase) {
  const phraseIndex = source.toLowerCase().indexOf(phrase.toLowerCase());
  if (phraseIndex < 0) return null;

  const candidates = [
    { open: "<button", close: "</button>" },
    { open: "<Btn", close: "</Btn>" },
    { open: "<a", close: "</a>" },
  ];

  let best = null;
  for (const candidate of candidates) {
    const start = source.lastIndexOf(candidate.open, phraseIndex);
    if (start < 0 || phraseIndex - start > 1800) continue;

    const openEnd = source.indexOf(">", start);
    if (openEnd < 0 || openEnd > phraseIndex) continue;

    if (source.slice(openEnd + 1, phraseIndex).includes(candidate.close)) continue;

    const closeIndex = source.indexOf(candidate.close, phraseIndex);
    if (closeIndex < 0 || closeIndex - phraseIndex > 1800) continue;

    if (!best || start > best.start) best = { start, openEnd };
  }

  return best;
}

describe("Adaptive Practice green CTA V2.5.9.2", () => {
  test("Open adaptive practice belongs to a practice-primary interactive control", () => {
    const source = fs.readFileSync(
      path.join(__dirname, "practice", "PracticeHub.jsx"),
      "utf8"
    );

    const owner = findOwner(source, "Open adaptive practice");
    expect(owner).not.toBeNull();

    const openingTag = source.slice(owner.start, owner.openEnd + 1);
    expect(openingTag).toMatch(/\bpractice-primary\b/);
    expect(openingTag).not.toMatch(/\bpractice-secondary\b/);
  });

  test("practice-primary remains mapped to the SPARK green token", () => {
    const css = fs.readFileSync(
      path.join(__dirname, "sparkStudyPracticeButtonsV259.css"),
      "utf8"
    );

    expect(css).toMatch(
      /\.practice-primary[\s\S]*?background:\s*var\(--spark-btn-green\)\s*!important/
    );
  });
});
