/**
 * Independently written candidate scripts from the supplied CXC specimen key.
 *
 * These are source-audit inputs, NOT registered verification evidence. They do
 * not activate a rubric or claim that the current evaluator recognizes every
 * script. The source prints subpart caps, not per-step or own-figure marks.
 * Null expected marks deliberately preserve those unresolved decisions.
 * See docs/poa-calibration-source-audit.md for the visual source audit.
 */
export const POA_SPECIMEN_SOURCE_CASE_SCHEMA = "poa-source-candidate-v1";
export const POA_SPECIMEN_SOURCE_SHA256 = "887519842e2bd13aca20f841303ed999f05ea962350c5c7207f63ca85c9aa55f";
const table = (id, rows) => ({ cells: Object.fromEntries(rows.flatMap((row, r) => row.flatMap((value, c) => value === null ? [] : [[`${id}:${r}:${c + 1}`, String(value)]]))) });
const prose = (id, answer) => ({ parts: { [id]: answer } });
const withWorking = (response, working) => ({ ...response, working });
const source = (partId, cap, pages, response, note = "Complete source-consistent answer.") => ({
  caseId: `specimen-${partId}-full`, partId, cls: "full", questionNumber: Number(partId[0]),
  responses: { [partId[0]]: response }, expectedMarks: cap,
  authority: "candidate-from-complete-official-answer", sourceSchemePages: pages, note,
});
const candidate = (caseId, partId, cls, response, expectedMarks, authority, note) => ({
  caseId, partId, cls, questionNumber: Number(partId[0]), responses: { [partId[0]]: response },
  expectedMarks, authority, note,
});

// Every numeric amount and item here was transcribed/recomputed independently
// from pages 99-108. The code does not read evaluator output or a model answer.
export const POA_SPECIMEN_COMPLETE_SOURCE_CASES = [
  source("1a-i", 2, [99], table("1a-i", [["260000 - 86000", 174000], ["174000 - 90800", 83200]])),
  source("1a-ii", 2, [99], table("1a-ii", [["Gross profit / sales x 100 = 174000 / 260000 x 100", "66.9%"]])),
  source("1b-i", 9, [99], withWorking(table("1b-i", [
    ["Non-current assets", null, 106800],
    ["Inventory", 12000, null], ["Trade receivables", 9550, null],
    ["Cash at bank", 35000, null], ["Cash in hand", 7650, null],
    ["12000 + 9550 + 35000 + 7650", null, 64200],
    ["Current liabilities: trade payables", 17600, null],
    ["64200 - 17600", null, 46600], ["106800 + 46600", null, 153400],
    ["Opening capital", 76200, null], ["Add net profit", 83200, null],
    ["Less drawings", 6000, null], ["76200 + 83200 - 6000", null, 153400],
  ]), "R. Pierre. Classified balance sheet as at 31 March 2017, vertical format. Current assets less current liabilities give working capital; non-current assets plus working capital equal closing capital.")),
  source("1b-ii", 2, [100], table("1b-ii", [["Current assets / current liabilities = 64200 / 17600", "3.6:1"]])),
  source("1c", 5, [100], prose("1c", "The current assets cover short-term debts as they fall due. The ratio of about 3.6:1 is relatively high and can indicate idle cash or inefficient working-capital management. Ms Pierre could place some surplus cash in an interest-earning investment, while keeping enough available to meet short-term payments.")),
  source("2a", 8, [101], withWorking(table("2a", [
    ["Dec 1 Balance b/d", null, 900, 5300, null, null, null, null],
    [null, null, null, null, "Dec 1 Petty cash", null, 245, null],
    [null, null, null, null, "Dec 8 Rent", null, null, 500],
    ["Dec 9 S. Smith", 100, 900, null, null, null, null, null],
    ["Dec 15 Cash C", null, null, 400, "Dec 15 Bank C", null, 400, null],
    ["Dec 16 P. Kan", 40, null, 760, null, null, null, null],
    [null, null, null, null, "Dec 19 Drawings", null, 200, null],
    [null, null, null, null, "Dec 25 L. Lamb", 16, null, 784],
    ["Dec 31 Totals", 140, 1800, 6460, "Dec 31 Totals", 16, 1800, 6460],
    [null, null, null, null, "Dec 31 Balance c/d", null, 955, 5176],
    ["Jan 1 Balance b/d", null, 955, 5176, null, null, null, null],
  ]), "Michelle Martin, three-column cash book for December 2016. Left columns are debits and right columns are credits. Smith discount = 1000 - 900 = 100; Kan discount = 800 x 5% = 40 and cheque = 760; Lamb discount = 800 x 2% = 16 and cheque = 784. Cash balance = 900 + 900 - 245 - 400 - 200 = 955. Bank balance = 5300 + 400 + 760 - 500 - 784 = 5176.")),
  source("2b", 7, [101], withWorking(table("2b", [
    [55, "Dec 1 Balance b/d", null, null, null],
    [245, "Dec 1 Cash reimbursement", null, null, null],
    [300, "Restored float", null, null, null],
    [null, "Dec 10 Stationery", 15, 15, null],
    [null, "Dec 10 Cleaning supplies", 25.95, null, 25.95],
    [null, "Dec 12 Stationery", 52.5, 52.5, null],
    [null, "Dec 13 Paper", 9.95, 9.95, null],
    [null, "Dec 21 Stapler", 39.75, 39.75, null],
    [null, "Dec 28 Cleaning wages", 75, null, 75],
    [null, "Totals", 218.15, 117.2, 100.95],
    [null, "Dec 31 Balance c/d", 81.85, null, null],
    [81.85, "Jan 1 Balance b/d", null, null, null],
  ]), "Michelle Martin, petty cash book for December 2016. Imprest 300; reimbursement 300 - 55 = 245; payments 218.15; remaining cash 300 - 218.15 = 81.85.")),
  source("2c", 5, [102], prose("2c", "The cash column's debit balance is $955 cash in hand and the bank column's debit balance is $5,176 available at the bank. These are current assets, and this bank account is not overdrawn. Physical cash cannot have an ordinary credit balance because the business cannot spend cash it does not possess. Petty cash has a debit balance of $81.85; reimburse $218.15 to restore the $300 imprest next month.")),
  source("3a", 11, [103], withWorking(table("3a", [
    ["Opening raw materials", 150000, null], ["Purchases", 200000, null],
    ["Carriage inwards", 3000, null], ["200000 + 3000", null, 203000],
    ["150000 + 203000", null, 353000], ["Less closing raw materials", 50000, null],
    ["353000 - 50000", null, 303000], ["Direct factory wages", 40000, null],
    ["303000 + 40000", null, 343000], ["Factory repairs", 5000, null],
    ["Factory electricity", 2000, null], ["300000 x 20%", 60000, null],
    ["5000 + 2000 + 60000", null, 67000], ["343000 + 67000", null, 410000],
    ["Add opening work in progress", 10000, null], ["Less closing work in progress", 20000, null],
    ["410000 + 10000 - 20000", null, 400000],
  ]), "Jollibee Limited, manufacturing account for the year ended 31 December 2016. $410,000 is manufacturing cost before WIP adjustment, not overheads alone. Office staff wages and finished-goods inventory are excluded.")),
  source("3b", 2, [103], table("3b", [["Production cost / number of units = 400000 / 50000", 8]])),
  source("3c", 3, [104], prose("3c", "FIFO; LIFO; average cost (AVCO).")),
  source("3d", 2, [104], prose("3d", "Cash; cheque.")),
  source("3e", 2, [104], prose("3e", "Numeracy; attention to detail.")),
  source("4a", 2, [105], prose("4a", "A company has a separate legal existence from its owners. Shareholders have limited liability for the company's debts.")),
  source("4b", 4, [105], prose("4b", "Deliberately omitting financial records; pressure from management to misstate the accounts; disclosure of confidential financial information; fraudulent financial reporting.")),
  source("4c", 10, [105], withWorking(table("4c", [
    ["Cash / Bank", 950000, null], ["Ordinary Share Capital", null, 400000],
    ["10% Preference Share Capital", null, 500000], ["Debentures", null, 50000],
    ["Being ordinary shares and preference shares issued at par and debentures issued for cash.", null, null],
  ]), "Ordinary shares: 200000 x $2 = $400000; preference shares: 100000 x $5 = $500000; debentures: 500 x $100 = $50000. Total cash received = $950000. Left amount column is debit; right amount column is credit. No debenture interest rate is supplied or needed.")),
  source("4d", 4, [106], withWorking(table("4d", [
    ["Subscriptions", 20000, null, null], ["Bar takings", 15000, null, null],
    [null, null, "Bar purchases", 10000], [null, null, "Equipment", 10000],
    [null, null, null, null], ["Totals", 35000, "Totals", 35000],
    [null, null, "Balance c/d", 15000], ["Balance b/d", 15000, null, null],
  ]), "Jamrock Charity Club, receipts and payments account for the period ended 31 December 2016. Debit receipts on the left; credit payments on the right. Depreciation is noncash and is excluded. 20000 + 15000 - 10000 - 10000 = 15000 cash balance.")),
  source("5a", 2, [107], prose("5a", "QuickBooks; Microsoft Excel.")),
  source("5b", 4, [107], table("5b", [
    ["Required by law", "Authorized or requested by the employee"],
    ["Income tax", "An employee-requested credit union payment"],
  ])),
  {
    ...source("5c", 7, [107], withWorking(table("5c", [
      [3000, 3000, 3000, 3000, 3000], [3000, 4000, 7000, 8000, 22000],
      [9000000, 12000000, 21000000, 24000000, 66000000],
    ]), "Revenue is in dollars: each quarter's expected units multiplied by $3000 per unit. Annual units = 3000 + 4000 + 7000 + 8000 = 22000; annual revenue = $66000000.")),
    cls: "source-conflict", expectedMarks: null, authority: "source-conflict-unresolved",
    note: "Correct dollar arithmetic conflicts with the printed key. Requires a versioned erratum scoring policy before final marks.",
  },
  source("5d", 4, [108], prose("5d", "Executive summary; company background; operations plan; financial plan.")),
  source("5e", 3, [108], prose("5e", "Owned by its members; an elected board governs the business; formed to benefit members and the local community.")),
];

export const POA_SPECIMEN_SOURCE_EDGE_CASES = [
  candidate("specimen-profit-direct-alternative", "1a-i", "alternative", table("1a-i", [[null, null], ["260000 - 86000 - 90800", 83200]]), 2,
    "candidate-from-equivalent-source-method", "One direct calculation proves both deductions."),
  candidate("specimen-profit-arithmetic-slip", "1a-i", "partial", table("1a-i", [["260000 - 86000", 174000], ["174000 - 90800", 84200]]), null,
    "partial-allocation-not-provided", "Correct first stage and subtraction method, wrong final arithmetic. No official 1+1 split is printed."),
  candidate("specimen-profit-answer-without-working", "1a-i", "partial", table("1a-i", [[null, null], [null, 83200]]), null,
    "partial-allocation-not-provided", "Question explicitly requires working; a matching answer alone does not establish full credit."),
  candidate("specimen-gross-percentage-own-figure", "1a-ii", "own-figure", table("1a-ii", [["My gross profit is 175000. Gross profit / sales x 100 = 175000 / 260000 x 100", "67.31%"]]), null,
    "own-figure-rule-not-provided", "Correct ratio method using own incorrect gross profit. Source gives no follow-through allocation."),
  candidate("specimen-current-ratio-precision", "1b-ii", "alternative", table("1b-ii", [["64200 / 17600", "3.65:1"]]), 2,
    "candidate-from-equivalent-source-method", "Equivalent correct two-decimal rounding."),
  candidate("specimen-current-ratio-reversed", "1b-ii", "incorrect", table("1b-ii", [["Current liabilities / current assets = 17600 / 64200", "0.274:1"]]), 0,
    "candidate-wholly-incorrect-response", "Both the method and ratio direction are wrong."),
  candidate("specimen-current-ratio-unreadable", "1b-ii", "unreadable", table("1b-ii", [["My answer is hidden in this picture", "see image"]]), null,
    "insufficient-evidence", "Unreadable evidence must remain unresolved, rather than finalizing an assumed zero."),
  candidate("specimen-liquidity-contradiction", "1c", "contradiction", prose("1c", "The current ratio is high so Ms Pierre is definitely using all cash efficiently and cannot pay any short-term debts."), null,
    "semantic-contradiction-needs-review", "Correct topic words cannot override the contradictory interpretation."),
  candidate("specimen-inventory-one-method", "3c", "partial", prose("3c", "FIFO; straight-line depreciation; bank reconciliation."), 1,
    "candidate-spark-distinct-list-policy", "Only FIFO is an inventory valuation method. One-mark-per-distinct-method is a SPARK policy, not a printed allocation."),
  candidate("specimen-inventory-duplicate-alias", "3c", "partial", prose("3c", "FIFO; first in first out; AVCO."), 2,
    "candidate-spark-distinct-list-policy", "FIFO and its full name are one concept, plus AVCO."),
  candidate("specimen-inventory-full-names", "3c", "alternative", prose("3c", "First in, first out; last in, first out; weighted average cost."), 3,
    "candidate-from-equivalent-source-concepts", "Standard equivalent names for the three distinct methods."),
  candidate("specimen-payment-duplicate", "3d", "partial", prose("3d", "Cash; payment in cash."), 1,
    "candidate-spark-distinct-list-policy", "Two phrasings of one method must not count as two answers."),
  candidate("specimen-payment-alternative", "3d", "alternative", prose("3d", "A standing order; an electronic funds transfer."), 2,
    "candidate-from-equivalent-source-concepts", "Two distinct methods explicitly included in the source key."),
  candidate("specimen-accounting-skills-paraphrase", "3e", "alternative", prose("3e", "Interpreting financial figures; spotting small errors accurately."), 2,
    "candidate-from-equivalent-source-concepts", "Analysis and attention to detail expressed in ordinary language."),
  candidate("specimen-company-impossible-advantages", "4a", "incorrect", prose("4a", "The government guarantees profit; a company can never owe debts."), 0,
    "candidate-wholly-incorrect-response", "Neither is a valid company advantage."),
  candidate("specimen-journal-missing-narrative", "4c", "partial", table("4c", [
    ["Bank", 950000, null], ["Ordinary capital", null, 400000], ["Preference capital", null, 500000], ["Debentures", null, 50000],
  ]), null, "partial-allocation-not-provided", "Correct entries but required narrative is absent; no official narrative deduction is printed."),
  candidate("specimen-journal-reversed", "4c", "incorrect", table("4c", [
    ["Bank", null, 950000], ["Ordinary capital", 400000, null], ["Preference capital", 500000, null], ["Debentures", 50000, null],
    ["Being shares and debentures issued for cash.", null, null],
  ]), null, "partial-allocation-not-provided", "All debit/credit directions are wrong. Matching values or narrative cannot justify the full cap; source partial allocation is absent."),
  candidate("specimen-receipts-depreciation-as-payment", "4d", "incorrect", table("4d", [
    ["Subscriptions", 20000, null, null], ["Bar takings", 15000, null, null],
    [null, null, "Bar purchases", 10000], [null, null, "Equipment", 10000],
    [null, null, "Depreciation", 2000], ["Totals", 35000, "Totals", 35000],
    [null, null, "Balance c/d", 13000], ["Balance b/d", 13000, null, null],
  ]), null, "partial-allocation-not-provided", "Correct receipts coexist with an invalid noncash payment. Do not award full credit from the receipt total alone."),
  candidate("specimen-software-same-product-family", "5a", "partial", prose("5a", "Peachtree; Sage 50, formerly Peachtree."), 1,
    "candidate-spark-distinct-list-policy", "A renamed product is not a second distinct payroll program."),
  candidate("specimen-deductions-definitions-only", "5b", "partial", table("5b", [["Compulsory under the law", "Taken at the employee's request"]]), null,
    "partial-allocation-not-provided", "Correct distinction without examples. The key does not print a two-plus-two allocation."),
  candidate("specimen-budget-explicit-thousands", "5c", "alternative", withWorking(table("5c", [
    [3000, 3000, 3000, 3000, 3000], [3000, 4000, 7000, 8000, 22000], [9000, 12000, 21000, 24000, 66000],
  ]), "The revenue row is explicitly expressed in $000, replacing the printed dollar row unit for my answer. Unit selling price remains $3000. Therefore 3000 units x $3000 = $9000000 = 9000 in $000."), null,
  "source-conflict-unresolved", "Mathematically valid scaled presentation needs the same versioned erratum policy as the dollar answer."),
  candidate("specimen-budget-key-scale-as-dollars", "5c", "source-conflict", withWorking(table("5c", [
    [3000, 3000, 3000, 3000, 3000], [3000, 4000, 7000, 8000, 22000], [9000, 12000, 21000, 24000, 66000],
  ]), "Revenue is expressed in dollars, not thousands of dollars."), null,
  "source-conflict-unresolved", "Matches the key's numbers but contradicts units x unit price. It must not be called a correct dollar budget."),
  candidate("specimen-cooperative-universal-tax-claim", "5e", "unsupported", prose("5e", "Every cooperative everywhere is exempt from every tax."), null,
    "context-dependent-source-example", "Unsupported universal legal claim; source does not specify a jurisdiction."),
];

export const POA_SPECIMEN_SOURCE_CANDIDATE_CASES = [
  ...POA_SPECIMEN_COMPLETE_SOURCE_CASES,
  ...POA_SPECIMEN_SOURCE_EDGE_CASES,
];
