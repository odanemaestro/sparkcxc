const fs = require("fs");
const path = require("path");

function sourceStimuli() {
  const root = path.join(process.cwd(), "public", "question-bank", "topics");
  const sourceBanks = new Set(["CSEC Paper 1 Original Mock A", "CSEC Paper 1 Archetype Variant Pool", "CSEC Paper 2 Derived MCQ Bank"]);
  const stimuli = [];
  for (const file of fs.readdirSync(root).filter(name => name.endsWith(".json"))) {
    const items = JSON.parse(fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, ""));
    for (const item of items) if (sourceBanks.has(item.source_bank) && item.stimulus?.svg) stimuli.push([item.id, item.stimulus.svg]);
  }
  return stimuli;
}

describe("CSEC supplied-bank SVG regression", () => {
  test("integrated supplied SVGs contain no ids or SVG marker references", () => {
    const stimuli = sourceStimuli();
    expect(stimuli.length).toBeGreaterThan(0);
    for (const [id, svg] of stimuli) {
      expect({ id, svg }).toEqual(expect.objectContaining({ id: expect.any(String) }));
      expect(svg).not.toMatch(/\bid\s*=\s*["']/i);
      expect(svg).not.toMatch(/marker-(?:end|start|mid)\s*=/i);
    }
  });
});
