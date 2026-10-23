import { POA_PRINTED_PAPERS, hasCompletePoaText } from "./poaPrintedPapers";
import { getPoaHistoricalPaper } from "./poaHistoricalPapers";

test.each(Object.entries(POA_PRINTED_PAPERS))("%s preserves every question, native table and printed choice", (id, questions) => {
    const paper = getPoaHistoricalPaper(id);
    expect(hasCompletePoaText(paper)).toBe(true);
    expect(questions.map((q) => q.number)).toEqual(paper.questions.map((q) => q.number));
    for (const question of questions) {
      expect(question.blocks.length).toBeGreaterThan(0);
      if (id.startsWith("poa-1-")) expect(question.options).toHaveLength(question.sourceIncomplete ? 0 : 4);
      for (const block of [...question.blocks, ...(question.options || []).flatMap((o) => o.blocks || [])]) {
        if (block.type === "table") expect(block.rows.every((row) => row.length === block.columns.length)).toBe(true);
      }
    }
});
test("January 2025 preserves journal distractors and values that OCR can misread", () => {
  const paper = POA_PRINTED_PAPERS["poa-1-2025-jan"];
  expect(paper).toHaveLength(60);
  expect(paper[35].blocks.find((b) => b.type === "table").rows[2]).toEqual(["New machine", "3 000"]);
  expect(paper[30].options[2].blocks[0].rows).toContainEqual(["Credit cash account", "", "1 250"]);
  expect(paper[34].options[3].blocks[0].rows[1][0]).toBe("Credit profit and loss");
});
test("the January 2026 transcription preserves five printed 20-mark questions and original trial-balance columns", () => {
  const paper = POA_PRINTED_PAPERS["poa-2-2026-jan"];
  expect(paper).toHaveLength(5);
  for (const question of paper) expect(question.blocks.reduce((n, b) => n + (b.marks || 0), 0)).toBe(20);
  const trial = paper[4].blocks.find((b) => b.type === "table" && b.caption.includes("Trial Balance"));
  expect(trial.rows[0]).toEqual(["Bank charges and interest", "32 000", ""]);
  expect(trial.rows.at(-1)).toEqual(["", "$905 000", "$905 000"]);
});
