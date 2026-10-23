/**
 * Independent recomputation of the five SPARK-authored numerical exercises.
 * Facts and arithmetic were transcribed from the question scenarios, without
 * reading their stored expected answers or calling the production marker.
 * These are one-mark answer checkpoints; no method, presentation or own-figure
 * credit was authored for them. That policy does not apply to historical CXC
 * questions or the separate syllabus specimen.
 */
export const POA_ORIGINAL_CALIBRATION_VERSION = "poa-original-independent-numeric-2026-10-22";
const C = (value, calculation) => ({ value, calculation });
const questions = [
  [
    C(120000 - 4000, "sales less returns"),
    C(70000 - 2000, "purchases less returns"),
    C(15000 + (70000 - 2000) + 3000, "opening goods plus net purchases and inward carriage"),
    C(15000 + 70000 - 2000 + 3000 - 18000, "goods available less closing inventory"),
    C(120000 - 4000 - (15000 + 70000 - 2000 + 3000 - 18000), "net revenue less goods sold"),
    C(12000 + 15000 + 4000, "rent plus wages and other expenses"),
    C(48000 - 31000, "gross profit less operating expenses"),
    C(48000 - 31000 + 1000, "operating profit plus other income"),
    C(50000 + 18000 - 6000, "opening equity plus profit less drawings"),
    C(38000 - 16000, "current assets less current liabilities"),
    C(60000 + 38000 - 16000, "total assets less current liabilities"),
    C(60000 + 38000 - 16000 - 20000, "assets less all liabilities"),
    C(48000 * 100 / 116000, "gross profit as percentage of net revenue"),
    C(18000 * 100 / 116000, "net profit as percentage of net revenue"),
    C(48000 * 100 / 68000, "gross profit as percentage of goods sold"),
    C((15000 + 18000) / 2, "mean of opening and closing inventory"),
    C(68000 / ((15000 + 18000) / 2), "cost of sales divided by mean inventory"),
    C(38000 / 16000, "current assets divided by current liabilities; 2.375 rounds to 2.38"),
    C((38000 - 18000) / 16000, "liquid current assets divided by current liabilities"),
    C(18000 * 100 / 50000, "profit as percentage of opening equity"),
  ],
  [
    C(36000 / 12, "annual payment divided by twelve months"),
    C(36000 * 3 / 12, "January to March belongs to the next year"),
    C(36000 * 9 / 12, "April to December is nine months"),
    C(21000 - 1000, "cash wages less opening accrued liability"),
    C(21000 - 1000 + 2500, "cash wages adjusted for opening and closing accruals"),
    C(2500, "closing unpaid wages in the scenario"),
    C(40000 - 2000, "receivables after writing off the bad debt"),
    C((40000 - 2000) * 0.05, "five per cent on surviving receivables"),
    C((40000 - 2000) * 0.05 - 1500, "closing allowance less opening allowance"),
    C(2000 + 1900 - 1500, "bad debt plus increase in allowance"),
    C((40000 - 2000) * 0.95, "receivables net of bad debt and five per cent allowance"),
    C(50000 - 5000, "cost less residual value"),
    C((50000 - 5000) / 5, "straight-line depreciable amount over five years"),
    C(2 * (50000 - 5000) / 5, "two full straight-line years"),
    C(50000 - 2 * 9000, "cost less two years accumulated straight-line charges"),
    C(50000 * 0.2, "first reducing-balance year"),
    C(50000 * 0.8 * 0.2, "twenty per cent on second-year opening carrying amount"),
    C(8000 - 1000 + 500, "rent received less advance plus accrued income"),
    C(1000, "advance rent received is a liability"),
    C(500, "earned uncollected rent is an asset"),
  ],
  [
    C(30000 + 20000, "sum of fixed capital accounts"),
    C(30000 / 10, "Asha capital interest at ten per cent"),
    C(20000 / 10, "Ben capital interest at ten per cent"),
    C((30000 + 20000) / 10, "combined capital interest"),
    C(10000 + 6000, "partner salaries"),
    C(500 + 300, "interest charged on drawings"),
    C(50000 + 500 + 300, "profit available before appropriations"),
    C(50000 + 800 - 16000 - 5000, "remaining profit after salary and capital interest"),
    C(29800 / (3 + 2), "value per profit share"),
    C(29800 * 3 / 5, "Asha three-fifths residual profit"),
    C(29800 * 2 / 5, "Ben two-fifths residual profit"),
    C(10000 + 3000 + 17880, "Asha salary, capital interest and residual share"),
    C(6000 + 2000 + 11920, "Ben salary, capital interest and residual share"),
    C(10000 + 3000 + 17880 - 500, "Asha allocation net of drawing interest"),
    C(6000 + 2000 + 11920 - 300, "Ben allocation net of drawing interest"),
    C(2000 + 30380 - 12000, "Asha opening current credit plus allocation less drawings"),
    C(1000 + 19620 - 9000, "Ben opening current credit plus allocation less drawings"),
    C(30000 + 2000 + 30380 - 12000, "Asha fixed capital plus closing current credit"),
    C(20000 + 1000 + 19620 - 9000, "Ben fixed capital plus closing current credit"),
    C(50000 + 3000 + 50000 - 21000, "opening fixed and current equity plus profit less drawings"),
  ],
  [
    C(5000 + 28000 + 2000, "opening raw materials plus purchases and inward carriage"),
    C(5000 + 28000 + 2000 - 6000, "raw material inputs less closing stock"),
    C(29000 + 20000, "direct material plus direct wages"),
    C(29000 + 20000 + 11000, "prime cost plus factory overhead"),
    C(29000 + 20000 + 11000 + 4000, "current factory inputs plus opening WIP"),
    C(29000 + 20000 + 11000 + 4000 - 7000, "production adjusted for closing WIP"),
    C(57000 / 3000, "completed production cost per completed unit"),
    C(8000 + 57000, "opening finished stock plus completed production"),
    C(8000 + 57000 - 10000, "finished goods available less closing finished stock"),
    C(90000 - 55000, "sales less finished goods sold"),
    C(90000 - 55000 - 12000, "gross profit less selling and administration"),
    C(6000 + 7000 + 10000, "three categories of closing inventory"),
    C(10 + 10, "units in the two separate stock-card batches"),
    C(10 * 5 + 10 * 7, "cost of the two separate batches"),
    C(10 + 10 - 12, "received units less issued units"),
    C(10 * 5 + 2 * 7, "FIFO uses all older units and two newer units"),
    C(8 * 7, "FIFO leaves eight newer units"),
    C(8 * 5, "LIFO leaves eight older units"),
    C((10 * 5 + 10 * 7) / (10 + 10), "weighted mean receipt price"),
    C(8 * ((10 * 5 + 10 * 7) / 20), "remaining units at average cost"),
  ],
  [
    C(8000 - 200, "bank charges reduce cash-book balance"),
    C(8000 - 200 + 1000, "direct credit increases adjusted cash-book balance"),
    C(8800 + 1500 - 2300, "bank has not yet paid cheques or credited lodgements"),
    C(800 + 1250, "sum of petty-cash vouchers"),
    C(5000 - 800 - 1250, "imprest less vouchers"),
    C(800 + 1250, "reimburse vouchers to restore the unchanged float"),
    C(40 * 500, "ordinary hours times hourly wage"),
    C(500 * 1.5, "time-and-a-half overtime rate"),
    C(6 * 500 * 1.5, "six overtime hours"),
    C(40 * 500 + 6 * 500 * 1.5 + 1000, "ordinary pay plus overtime and bonus"),
    C(25500 / 20, "exercise deduction at five per cent of gross"),
    C(25500 / 20 + 2500, "percentage deduction plus fixed deduction"),
    C(25500 - 25500 / 20 - 2500, "gross pay less both deductions"),
    C(12000 - 14000, "January receipts less payments"),
    C(5000 + 12000 - 14000, "January opening balance plus net flow"),
    C(5000 + 12000 - 14000 + 10000 - 15000, "February closing deficit is signed negative"),
    C(200 * 150, "planned sales quantity times unit price"),
    C(200 + 50 - 30, "sales plus desired closing finished goods less opening goods"),
    C((200 + 50 - 30) * 2, "production quantity times material kilograms per unit"),
    C((200 + 50 - 30) * 2 + 60 - 40, "production needs plus closing material target less opening materials"),
  ],
];
export const POA_ORIGINAL_INDEPENDENT_CHECKS = Object.freeze(questions.flatMap((rows, q) =>
  rows.map((row, c) => Object.freeze({ id: `POA-Q${q + 1}::${c + 1}`, ...row }))));
const checksById = new Map(POA_ORIGINAL_INDEPENDENT_CHECKS.map((c) => [c.id, c]));
const percentage = new Set(["POA-Q1::13", "POA-Q1::14", "POA-Q1::15", "POA-Q1::20"]);
const ratio = new Set(["POA-Q1::18", "POA-Q1::19"]);
const formatted = (value) => value.toLocaleString("en-US", { maximumFractionDigits: 8 });
const F = (cls, answer, expect, note, extra = {}) => ({ cls, response: { answer, working: "" }, expect, note, ...extra });

export function poaOriginalFixtures({ paperId, criterion }) {
  if (paperId !== "POA-ORIGINAL-02-01") return { blocked: "not-the-calibrated-original-accounts-paper" };
  const check = checksById.get(criterion.id);
  if (!check) return { blocked: "no-independently-recomputed-original-checkpoint" };
  const answer = String(check.value), wrong = String(check.value + 10);
  const alternatives = [formatted(check.value), `  ${check.value >= 0 ? "+" : ""}${answer}  `];
  if (percentage.has(check.id)) alternatives.push(`${formatted(check.value)}%`);
  if (ratio.has(check.id)) alternatives.push(`${formatted(check.value)} : 1`);
  if (Number.isInteger(check.value)) alternatives.push(check.value < 0 ? `($${formatted(-check.value)})` : `$${formatted(check.value)}`);
  return {
    kind: "structured", allOrNothing: true,
    ruleId: POA_ORIGINAL_CALIBRATION_VERSION,
    sourceAnswer: { answer, working: check.calculation },
    alternatives: alternatives.map((answer) => ({ answer, working: "" })),
    fixtures: [
      F("full", answer, 1, check.calculation),
      ...alternatives.map((a) => F("equivalent", a, 1, "Equivalent complete numeric notation", { mustResolve: true })),
      F("incorrect", wrong, 0, "Well-formed wrong final number", { mustResolve: true }),
      F("blank", "", 0, "Unanswered one-mark answer line"),
      F("irrelevant", "The weather is sunny.", 0, "Prose is not parsed as a number"),
      F("ceiling", `${answer} ${answer}`, 0, "Repeated answers never earn extra credit"),
      F("competing", `${answer} or ${wrong}`, 0, "Two competing numbers are left unresolved"),
      F("contradiction", `not ${answer}`, 0, "A number inside negated prose is not an answer"),
      F("keyword-list", "sales purchases capital profit", 0, "Accounting words are not numerical evidence"),
      F("working", answer, 1, "Numerical checkpoint does not award or inspect written method marks", {
        response: { answer, working: "My written method was different." }, mustResolve: true,
      }),
      F("working", wrong, 0, "Correct working cannot create an unauthored method mark", {
        response: { answer: wrong, working: check.calculation }, mustResolve: true,
      }),
      F("follow-through", wrong, 0, "Original answer-only rubric has no own-figure mark", { mustResolve: true }),
    ],
  };
}
