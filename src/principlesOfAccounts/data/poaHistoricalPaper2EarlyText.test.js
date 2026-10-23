import { POA_HISTORICAL_PAPER2_EARLY_TEXT as papers } from "./poaHistoricalPaper2EarlyText";
import { getPoaHistoricalPaper2 } from "./poaHistoricalPaper2";

const question = (year, number) => papers[`poa-2-${year}-mj`][number - 1];
const forms = (item) => item.blocks.filter((block) => block.answerSpace);

test("the seven early papers retain all 49 numbered questions and their source-page bindings", () => {
  expect(Object.keys(papers)).toEqual(Array.from({ length: 7 }, (_, i) => `poa-2-${2005 + i}-mj`));
  for (const [id, questions] of Object.entries(papers)) {
    const source = getPoaHistoricalPaper2(id);
    expect(questions.map((item) => item.number)).toEqual(source.questions.map((item) => item.number));
    for (const item of questions) {
      expect(item.transcriptionStatus).toBe("visually-checked");
      expect(item.sourcePages).toEqual(source.questions.find((q) => q.number === item.number).sourcePages);
      expect(item.blocks.length).toBeGreaterThan(0);
      for (const block of item.blocks.filter((b) => b.type === "table")) {
        expect(block.rows.every((row) => row.length === block.columns.length)).toBe(true);
      }
    }
  }
});

test("source forms expose only their blank response cells and keep unique answer identities", () => {
  const ids = [];
  for (const item of Object.values(papers).flat()) {
    for (const block of forms(item)) {
      ids.push(block.answerId);
      expect(block.editableCells.length).toBeGreaterThan(0);
      expect(new Set(block.editableCells).size).toBe(block.editableCells.length);
      for (const coordinate of block.editableCells) {
        const [row, col] = coordinate.split(":").map(Number);
        expect(["", "$", "…", "—"]).toContain(block.rows[row]?.[col]);
      }
      const fields = block.headingFields || [];
      expect(new Set(fields.map((f) => f.id)).size).toBe(fields.length);
    }
  }
  expect(new Set(ids).size).toBe(ids.length);
  expect(ids).toHaveLength(11);
});

test("printed mistakes and unusual dates remain source content instead of being replaced by solutions", () => {
  const trial2005 = question(2005, 1).blocks.find((b) => b.type === "table");
  expect(trial2005.rows).toContainEqual(["Sales", "69 039", ""]);
  expect(trial2005.rows).toContainEqual(["Purchases", "", "41 175"]);
  expect(trial2005.rows).toContainEqual(["Capital", "", ""]);
  expect(trial2005.rows.at(-1)).toEqual(["", "132 939", "83 827"]);
  expect(question(2005, 2).blocks.find((b) => b.label === "(i)").text).toContain("January 31, 2003");
  const bank2008 = question(2008, 2).blocks;
  expect(bank2008.find((b) => b.label === "(b)").text).toContain("April 2, 2007");
  expect(bank2008.find((b) => b.label === "(ii)").text).toContain("March 31, 2008");
  expect(question(2009, 3).blocks.at(-2).text).toContain("February 7, 2009");
});

test("stock forms retain their original blank grids, without filling in FIFO or LIFO results", () => {
  const fifo = forms(question(2007, 6))[0];
  expect(fifo.columns).toEqual(["Date", "Purchases — Unit", "Purchases — Price $", "Sales — Unit", "Sales — Cost $", "Balance — Unit", "Balance — Cost $"]);
  expect(fifo.rows).toHaveLength(6);
  expect(fifo.rows.flat().every((value) => value === "")).toBe(true);
  const lifo = forms(question(2010, 6))[0];
  expect(lifo.columns[4]).toBe("Sales — Sales Price (4)");
  expect(lifo.rows.flat().every((value) => value === "")).toBe(true);
  expect(lifo.editableCells).toHaveLength(48);
});

test("printed worked examples are read-only while the remaining worksheet entries are blank", () => {
  const effects = forms(question(2010, 1))[0];
  expect(effects.rows[0]).toEqual(["1", "Bank\nRent", "Rent", "Bank"]);
  expect(effects.editableCells.some((cell) => cell.startsWith("0:"))).toBe(false);
  const adjustments = forms(question(2011, 4))[0];
  expect(adjustments.rows[0]).toEqual(["1", "Advertising", "Subtract prepayment of", "$800"]);
  expect(adjustments.editableCells).toHaveLength(18);
  expect(adjustments.editableCells.some((cell) => cell.startsWith("0:"))).toBe(false);
  const partnerAllocation = forms(question(2011, 2))[0];
  expect(partnerAllocation.rows).toEqual([["January - June (50%)", "", "", "", ""], ["July - December (50%)", "", "", "", ""], ["TOTALS", "", "", "", ""]]);
});

test("marks match the printed subparts, including the unlabelled 2010 single-entry prompt", () => {
  for (const [id, questions] of Object.entries(papers)) {
    for (const item of questions) {
      const printedTotal = item.blocks.reduce((sum, block) => sum + (block.marks || 0), 0);
      expect(printedTotal).toBe(id === "poa-2-2010-mj" && item.number === 3 ? 18 : 20);
    }
  }
  expect(question(2010, 7).requiresDrawing).toBe(true);
});
