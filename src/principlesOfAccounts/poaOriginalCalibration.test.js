import { POA_PAPER2, POA_PAPER2_ID, poaPaper2Criteria } from "./data/poaPaper2";
import { evaluatePoaSourceV2, mapPoaPaper2V2, parsePoaOriginalAnswer, reviewPoaPaper2V2 } from "./poaMarkingV2";
import { POA_ORIGINAL_INDEPENDENT_CHECKS, poaOriginalFixtures } from "../grading/v2Fixtures/principlesOfAccountsOriginal";

const grade = (responses = {}, criteria = poaPaper2Criteria()) =>
  evaluatePoaSourceV2({ paperId: POA_PAPER2_ID, criteria, responses });
const checks = POA_PAPER2.flatMap((q) => q.checkpoints);
const response = Object.fromEntries(POA_ORIGINAL_INDEPENDENT_CHECKS.map((c) => [c.id, { answer: String(c.value) }]));
const clone = (value) => JSON.parse(JSON.stringify(value));

test("all 100 independently recomputed values agree with the authored answer rubric within stated rounding", () => {
  expect(POA_ORIGINAL_INDEPENDENT_CHECKS).toHaveLength(100);
  expect(new Set(POA_ORIGINAL_INDEPENDENT_CHECKS.map((c) => c.id)).size).toBe(100);
  expect(POA_PAPER2).toHaveLength(5);
  for (const check of checks) {
    const independent = POA_ORIGINAL_INDEPENDENT_CHECKS.find((c) => c.id === check.id);
    expect(independent.calculation.length).toBeGreaterThan(10);
    expect(Number.isFinite(independent.value)).toBe(true);
    expect(Math.abs(independent.value - check.expected)).toBeLessThanOrEqual(check.tolerance);
  }
  const rows = grade(response);
  expect(rows).toHaveLength(100);
  expect(rows.every((row) => row.resolved && row.suggestedMarks === 1)).toBe(true);
  expect(rows.reduce((total, row) => total + row.suggestedMarks, 0)).toBe(100);
});

test("every independent criterion fixture has the expected resolved or abstaining result", () => {
  const criteria = poaPaper2Criteria();
  let cases = 0;
  for (const criterion of criteria) {
    const fixtures = poaOriginalFixtures({ paperId: POA_PAPER2_ID, criterion });
    expect(fixtures.blocked).toBeUndefined();
    for (const fixture of fixtures.fixtures) {
      const rows = grade({ [criterion.id]: fixture.response }, criteria);
      const row = rows.find((r) => r.criterionId === criterion.id);
      expect(row.suggestedMarks).toBe(fixture.expect);
      if (fixture.mustResolve || ["full", "blank"].includes(fixture.cls)) expect(row.resolved).toBe(true);
      expect(rows.every((r) => r.suggestedMarks >= 0 && r.suggestedMarks <= r.maxMarks)).toBe(true);
      cases++;
    }
  }
  expect(cases).toBeGreaterThan(1000);
});

test("blank, missing and numerically wrong answers give resolved zero without affecting other points", () => {
  expect(grade().every((row) => row.resolved && row.suggestedMarks === 0)).toBe(true);
  const partial = grade({ "POA-Q1::1": "116000", "POA-Q1::2": null, "POA-Q1::3": { answer: "1" } });
  expect(partial.every((row) => row.resolved)).toBe(true);
  expect(partial.reduce((n, row) => n + row.suggestedMarks, 0)).toBe(1);
});

test.each([
  ["POA-Q1::1", "$116,000.00", 116000],
  ["POA-Q1::1", "J$ 116,000", 116000],
  ["POA-Q1::13", "41.38 %", 41.38],
  ["POA-Q1::18", "2.375 : 1", 2.375],
  ["POA-Q1::19", "1.25:1", 1.25],
  ["POA-Q5::14", "($2,000)", -2000],
  ["POA-Q1::1", "116000%", null],
  ["POA-Q1::1", "116000:1", null],
  ["POA-Q1::13", "41.38%%", null],
  ["POA-Q1::18", "2.375:1:1", null],
  ["POA-Q1::1", "116000 or 120000", null],
  ["POA-Q1::1", "answer is 116000", null],
  ["POA-Q1::1", "116000 + 0", null],
  ["POA-Q1::1", "11,60,00", null],
  ["POA-Q1::1", "Infinity", null],
  ["POA-Q1::1", "NaN", null],
  ["POA-Q1::1", "1e309", null],
])("complete notation for %s: %s", (id, text, expected) => {
  expect(parsePoaOriginalAnswer(text, checks.find((c) => c.id === id))).toBe(expected);
});

test("unsupported prose, competing answers and calculations remain unresolved instead of a false final zero", () => {
  for (const answer of ["116000 or 120000", "sales 116000", "120000 - 4000", "NaN", "116000\n120000"]) {
    const row = grade({ "POA-Q1::1": { answer } })[0];
    expect(row.resolved).toBe(false);
    expect(row.suggestedMarks).toBe(0);
    expect(row.diagnostic.reason).toBe("unreadable-numeric-answer");
  }
});

test("source fields, ceilings, checks, identities and extra fields cannot mutate the registered original rubric", () => {
  const mutations = [
    (c) => { c[0].expected = 999; },
    (c) => { c[0].tolerance = 999999; },
    (c) => { c[0].sourceMarking.answer = 999; },
    (c) => { c[0].sourceMarking.criteria[0].check.value = 999; },
    (c) => { c[0].sourceMarking.solution = "forged"; },
    (c) => { c[0].kind = "exact"; },
    (c) => { c[0].maxMarks = 100; },
    (c) => { c[0].sourceFormat = "historical"; },
    (c) => { c[0].sourcePartId = "POA-Q5::1"; },
    (c) => { c[0].acceptedPhrases = ["anything"]; },
    (c) => { c[0].surprise = true; },
    (c) => { c[1] = clone(c[0]); },
    (c) => { c[0] = null; },
  ];
  for (const mutate of mutations) {
    const criteria = poaPaper2Criteria();
    mutate(criteria);
    expect(() => grade(response, criteria)).toThrow("identity");
  }
  expect(() => grade(response, poaPaper2Criteria().slice(1))).toThrow("Incomplete");
  const reorder = (v) => Array.isArray(v) ? v.map(reorder) : v && typeof v === "object"
    ? Object.fromEntries(Object.entries(v).reverse().map(([k, x]) => [k, reorder(x)])) : v;
  expect(grade(response, reorder(poaPaper2Criteria())).every((r) => r.resolved && r.suggestedMarks === 1)).toBe(true);
});

test.each([
  [], null, new Date(),
  { forged: "100" },
  { "POA-Q1::1": ["116000"] },
  { "POA-Q1::1": { answer: { value: 116000 } } },
  { "POA-Q1::1": { answer: "116000", suggestedMarks: 1 } },
  { "POA-Q1::1": { answer: "116000", working: [] } },
  { "POA-Q1::1": { answer: true } },
  { "POA-Q1::1": { answer: Infinity } },
  { "POA-Q1::1": { answer: NaN } },
])("malformed submission schema fails closed: %p", (responses) => {
  expect(() => grade(responses)).toThrow();
});

test("written working is preserved separately and has no invented method or own-figure mark", () => {
  const right = grade({ "POA-Q1::1": { answer: "116000", working: "No valid method here." } })[0];
  const wrong = grade({ "POA-Q1::1": { answer: "120000", working: "120000 - 4000 = 116000" } })[0];
  expect(right.suggestedMarks).toBe(1);
  expect(wrong.suggestedMarks).toBe(0);
  expect(right.diagnostic.methodWorkingAssessed).toBe(false);
  expect(wrong.diagnostic.methodWorkingAssessed).toBe(false);
  // A correct later answer earns its independent point after an earlier error.
  const rows = grade({ "POA-Q1::1": { answer: "1" }, "POA-Q1::5": { answer: "48000" } });
  expect(rows[0].suggestedMarks).toBe(0);
  expect(rows[4].suggestedMarks).toBe(1);
});

test("browser diagnostics remain advisory after server numeric calibration", () => {
  expect(mapPoaPaper2V2(response).criteria).toHaveLength(100);
  const review = reviewPoaPaper2V2(response);
  expect(review.candidateMarks).toBe(100);
  expect(review.canPublishFinalScore).toBe(false);
  expect(review.reconciliation.canPublishFinalScore).toBe(false);
});
