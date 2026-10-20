import { POA_HISTORICAL_PAPER2_MORE_TEXT } from "./poaHistoricalPaper2MoreText";
import { getPoaHistoricalPaper2 } from "./poaHistoricalPaper2";

const questions = (id) => POA_HISTORICAL_PAPER2_MORE_TEXT[id];
const question = (id, number) => questions(id).find((q) => q.number === number);
const tables = (id, number) => question(id, number).blocks.filter((b) => b.type === "table");
const wording = (id, number) => question(id, number).blocks.map((block) => block.text || "").join(" ");

test("transcribes five complete native questions for each included historical sitting", () => {
  expect(Object.keys(POA_HISTORICAL_PAPER2_MORE_TEXT)).toEqual(expect.arrayContaining(["poa-2-2023-jan", "poa-2-2023-mj", "poa-2-2024-jan", "poa-2-2024-mj", "poa-2-2025-jan", "poa-2-2025-mj"]));
  for (const [id, records] of Object.entries(POA_HISTORICAL_PAPER2_MORE_TEXT)) {
    const paper = getPoaHistoricalPaper2(id);
    expect(records.map((q) => q.number)).toEqual([1, 2, 3, 4, 5]);
    for (const record of records) {
      const archive = paper.questions.find((q) => q.number === record.number);
      expect(record.transcriptionStatus).toBe("visually-checked");
      expect(record.sourcePages.every((page) => archive.sourcePages.includes(page))).toBe(true);
      expect(record.blocks.reduce((sum, block) => sum + (block.marks || 0), 0)).toBe(20);
      expect(record.modelSolution).toBeUndefined();
      expect(record.numericCheckpoints).toBeUndefined();
      for (const block of record.blocks) {
        expect(["paragraph", "part", "table"]).toContain(block.type);
        if (block.type === "table") {
          expect(block.columns.length).toBeGreaterThan(0);
          expect(block.rows.length).toBeGreaterThan(0);
          expect(block.rows.every((row) => row.length === block.columns.length && row.every((cell) => typeof cell === "string"))).toBe(true);
        }
      }
    }
  }
});

test("response forms have stable unique IDs and given data remains read-only", () => {
  for (const records of Object.values(POA_HISTORICAL_PAPER2_MORE_TEXT)) {
    for (const record of records) {
      const forms = record.blocks.filter((block) => block.answerSpace);
      expect(new Set(forms.map((block) => block.answerId)).size).toBe(forms.length);
      for (const form of forms) {
        expect(form.answerId).toMatch(new RegExp(`^q${record.number}(?:-|$)`));
        for (const key of form.editableCells || []) {
          const [row, column] = key.split(":").map(Number);
          expect(typeof form.rows[row][column]).toBe("string");
        }
      }
    }
  }
  expect(tables("poa-2-2025-mj", 2)[0].answerSpace).toBeUndefined();
  expect(tables("poa-2-2024-jan", 3)[0].answerSpace).toBeUndefined();
  expect(tables("poa-2-2023-mj", 2)[0].answerSpace).toBeUndefined();
});

test("January 2023 retains partly filled ledger forms and the original source's year discrepancy", () => {
  const id = "poa-2-2023-jan";
  const depreciation = tables(id, 1).find((table) => table.caption.startsWith("Provision for Depreciation"));
  expect(depreciation.rows[0]).toEqual(["", "", "", "2022 1 Jan", "Balance b/d", "28 000"]);
  expect(depreciation.answerId).toBe("q1-a-i-depreciation");
  const note = tables(id, 1).find((table) => table.caption === "Credit note");
  expect(note.rows[2][3]).toBe("$216");
  expect(note.editableCells).toEqual(["1:1", "1:3"]);
  expect(tables(id, 2).find((table) => table.caption.includes("Details for December 2023"))).toBeDefined();
  expect(wording(id, 2)).toContain("In December 2022");
  expect(tables(id, 3)[0].rows.at(-1)).toEqual(["TOTAL", "557 700", "557 700"]);
  expect(wording(id, 4)).toContain("$156 757");
  expect(tables(id, 5).find((table) => table.caption === "Year-end balances").rows).toHaveLength(12);
});

test("May/June 2023 preserves cash-book sides, manufacturing apportionments and given error ticks", () => {
  const id = "poa-2-2023-mj";
  const cashbook = tables(id, 2)[0];
  expect(cashbook.rows[0]).toEqual(["2023 1 April", "Balance b/d", "", "450", "", "2023 1 April", "Balance b/d", "", "", "5 600"]);
  expect(cashbook.rows[3].slice(0, 5)).toEqual(["12", "Booker Centre Ltd", "5 000", "", "245 000"]);
  const inputs = tables(id, 3)[0];
  expect(inputs.rows.find((row) => row[0].startsWith("Factory wages"))).toEqual(["Factory wages — 60% of the factory wages are direct and the rest are indirect.", "123 000"]);
  const effects = tables(id, 4).find((table) => table.caption === "Effect of errors");
  expect(effects.rows[0]).toEqual(["A", "", "√", "", "", "√"]);
  expect(effects.rows.slice(1).every((row) => row.slice(1).every((cell) => cell === ""))).toBe(true);
  const balances = tables(id, 5)[0];
  expect(balances.rows.find((row) => row[0] === "Short-term loans to members")).toEqual(["Short-term loans to members", "301 900", ""]);
});

test("retains January 2024's original examples, incomplete figures and bank records", () => {
  const id = "poa-2-2024-jan";
  const effects = tables(id, 1).find((table) => table.caption === "Effect on Profit");
  expect(effects.rows[0]).toEqual(["I", "", "", "76"]);
  expect(effects.rows.slice(1, 5).every((row) => row.slice(1).every((cell) => cell === ""))).toBe(true);
  const position = tables(id, 2)[0];
  expect(position.rows.find((row) => row[0] === "Non-current assets at cost")[1]).toBe("(i)");
  expect(position.rows.find((row) => row[0] === "Trade receivables")[1]).toBe("(ii)");
  const incorrect = tables(id, 3)[0];
  expect(incorrect.rows[0]).toEqual(["Balance b/d — 1 January 2023 (bank overdraft)", "4 500", "Rent expense", "7 200"]);
  const bank = tables(id, 3).find((table) => table.caption.startsWith("Bank Statement"));
  expect(bank.rows.at(-1)).toEqual(["29 Oct", "Credit transfer (donation from club member T. Bre)", "", "1 000", "5 470 Cr"]);
  expect(wording(id, 4)).toContain("$186 000");
  expect(tables(id, 5).find((table) => table.caption === "Transactions").rows[0][1]).toContain("less a trade discount of 20%");
});

test("preserves May/June 2024's bank details, share issues, production inputs and unnamed ledgers", () => {
  const id = "poa-2-2024-mj";
  expect(wording(id, 1)).toContain("bank overdraft of $1 125");
  expect(wording(id, 1)).toContain("Cheque #103 for $1 223 and cheque #107 for $830");
  const issues = tables(id, 2)[0];
  expect(issues.rows[1]).toEqual(["May 10", "100 000 8% $4 preference shares at par"]);
  const partnership = tables(id, 3).find((table) => table.caption === "Partners' balances");
  expect(partnership.rows[0]).toEqual(["Current accounts", "$11 000 Dr", "$7 300 Cr"]);
  expect(partnership.rows[5]).toEqual(["Interest on capital", "3%", "3%"]);
  expect(tables(id, 4)[0].rows.map((row) => row[1])).toEqual(["5 100", "6 300", "6 760"]);
  expect(wording(id, 4)).toContain("8 880 units");
  expect(wording(id, 4)).toContain("$33 200");
  expect(tables(id, 5)[0].rows).toHaveLength(15);
  const ledgerForms = tables(id, 5).filter((table) => table.caption === "________________");
  expect(ledgerForms).toHaveLength(18);
  expect(ledgerForms.every((table) => table.rows.every((row) => row.every((cell) => cell === "")))).toBe(true);
  expect(question(id, 5).printedMarkScope).toBe("whole-question");
});

test("preserves the scanned $8,150 opening overdraft and statement's unknown balances", () => {
  const id = "poa-2-2025-mj";
  const balances = tables(id, 1).find((block) => block.caption === "Opening balances");
  expect(balances.rows).toEqual([["Cash", "100"], ["Bank overdraft", "8 150"]]);
  const statement = tables(id, 1).find((block) => block.caption === "Statement of account");
  expect(statement.rows.map((row) => row[4])).toEqual(["520", "(i)", "(ii)", "(iii)", "(iv)"]);
  expect(statement.rows[3][3]).toBe("663");
  expect(statement.rows[4][3]).toBe("17");
  expect(wording(id, 1)).toContain("cash book on page 7");
});

test("keeps the company trial balance debit/credit columns and $'000 scale", () => {
  const trial = tables("poa-2-2025-mj", 2)[0];
  expect(trial.columns).toEqual(["", "$'000", "$'000"]);
  expect(trial.rows.find((row) => row[0].startsWith("Debentures"))).toEqual(["Debentures — 10% interest per annum (2020 to 2025)", "", "40 000"]);
  expect(trial.rows.find((row) => row[0] === "Auditor's fees")).toEqual(["Auditor's fees", "3 600", ""]);
  expect(trial.rows.find((row) => row[0] === "Premises at cost")).toEqual(["Premises at cost", "175 000", ""]);
  expect(trial.rows.find((row) => row[0] === "Accounts payable")).toEqual(["Accounts payable", "", "20 800"]);
  expect(question("poa-2-2025-mj", 3).supportingSourcePages).toEqual([6, 7, 8]);
  expect(wording("poa-2-2025-mj", 3)).toContain("your completed answers for Question 2");
});

test("contains the investment rates, original cash inflows and given reconciliation example", () => {
  const id = "poa-2-2025-mj";
  expect(tables(id, 4).find((table) => table.caption === "Investment interest rates").rows).toEqual([["1", "2.50"], ["2", "2.75"], ["3", "3.00"], ["4", "3.25"], ["5", "3.50"]]);
  const flow = tables(id, 4).find((table) => table.caption.startsWith("Simon's"));
  expect(flow.rows.slice(0, 2)).toEqual([["Cash sales", "80 000"], ["Receipts from credit customers", "56 000"]]);
  expect(flow.rows.slice(2).every((row) => row.every((cell) => cell === ""))).toBe(true);
  const differences = tables(id, 5).find((table) => table.caption === "Reconciliation differences");
  expect(differences.rows[0].slice(1)).toEqual(["", "", "−", "10 000"]);
  expect(differences.rows.slice(1).every((row) => row.slice(1).every((cell) => cell === ""))).toBe(true);
});

test("preserves January's original transaction wording and does not reveal journal names", () => {
  const transaction = tables("poa-2-2025-jan", 1)[0];
  expect(transaction.rows).toHaveLength(11);
  expect(transaction.rows.find((row) => row[0] === "19")[1]).toContain("purchased on 14 March");
  expect(transaction.rows.find((row) => row[0] === "27")[1]).toContain("less 2% cash discount");
  expect(tables("poa-2-2025-jan", 1).filter((table) => table.caption === "________________ Journal")).toHaveLength(4);
  expect(question("poa-2-2025-jan", 1).printedMarkScope).toBe("whole-question");
});

test("retains the principle letter options, stock movements and suspense-error data", () => {
  const id = "poa-2-2025-jan";
  const principles = tables(id, 2).find((table) => table.caption === "TABLE 1: ACCOUNTING PRINCIPLES");
  expect(principles.rows).toEqual([["A", "Prudence"], ["B", "True and fair view"], ["C", "Objectivity"], ["D", "Going concern"], ["E", "Accruals"]]);
  const situations = tables(id, 2).find((table) => table.caption === "Situations");
  expect(situations.rows.every((row) => row[1] === "")).toBe(true);
  const inventory = tables(id, 4).find((table) => table.caption === "Movement of air fryers");
  expect(inventory.rows.map((row) => row[2])).toEqual(["502", "125", "257", "175", "322", "200", "410"]);
  expect(wording(id, 4)).toContain("Round off all calculations to the nearest dollar.");
  const errors = tables(id, 5).find((table) => table.caption === "Errors");
  expect(errors.rows).toHaveLength(6);
  expect(errors.rows[1][1]).toContain("DEC Ltd, $1 500");
  expect(errors.rows[1][1]).toContain("DDE Ltd");
  expect(wording(id, 5)).toContain("short on the debit side by $368");
  expect(wording(id, 5)).toContain("net profit of $13 000");
});
