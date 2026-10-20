import { POA_SPECIMEN_PAPER2 } from "./data/poaSpecimenPaper2";
import { poaSpecimenPaper2Criteria, evaluatePoaSpecimenSourceV2 } from "./poaSpecimenMarkingV2";
import { evaluateExistingSubjectPaper2V2 } from "../grading/serverPaper2V2SubjectEngine";
const paperId = POA_SPECIMEN_PAPER2.id;
const completeFigures = () => Object.fromEntries(POA_SPECIMEN_PAPER2.questions.map((q) => [String(q.number), {
  cells: Object.fromEntries(q.numericCheckpoints.filter((c) => c.responseCell).map((c) => [c.responseCell, String(c.expected)])),
}]));
const evaluate = (responses) => evaluatePoaSpecimenSourceV2({ paperId, criteria: poaSpecimenPaper2Criteria(), responses });

test("preserves the 22 official ceilings totaling 100 without inventing official method point allocations", () => {
  const criteria = poaSpecimenPaper2Criteria();
  expect(criteria).toHaveLength(22);
  expect(criteria.reduce((n, c) => n + c.maxMarks, 0)).toBe(100);
  expect(criteria.every((c) => c.sourceMarking.part.criterionWeights === null)).toBe(true);
  expect(criteria.filter((c) => c.sourceMarking.part.finalScoreUnresolved).reduce((n, c) => n + c.maxMarks, 0)).toBe(7);
});
test("matching numbers and copied solution prose cannot publish unassessed method marks", () => {
  const responses = completeFigures();
  responses["1"].working = POA_SPECIMEN_PAPER2.questions[0].modelSolution.join(" ");
  const rows = evaluate(responses);
  expect(rows.some((r) => r.diagnostic.matchingFigures.length > 0)).toBe(true);
  expect(rows.every((r) => r.resolved === false)).toBe(true);
  const result = evaluateExistingSubjectPaper2V2({ subjectId: "principles-of-accounts", paperId, criteria: poaSpecimenPaper2Criteria(), responses });
  expect(result.unresolvedMarks).toBe(100); expect(result.canPublishFinalScore).toBe(false); expect(result.confirmedMarks).toBeNull();
});
test("wrong, partial and unusual responses affect only their bound practice diagnostics", () => {
  const q = POA_SPECIMEN_PAPER2.questions[0], point = q.numericCheckpoints[0];
  const rows = evaluate({ "1": { cells: { [point.responseCell]: String(point.expected) } } });
  expect(rows.flatMap((r) => r.diagnostic.matchingFigures)).toContain(point.id);
  expect(evaluate({ "1": { cells: { [point.responseCell]: "I reject the expected 410000" } } }).flatMap((r) => r.diagnostic.matchingFigures)).not.toContain(point.id);
  expect(evaluate({ "1": { cells: { [point.responseCell]: String(point.expected + 100) } } }).flatMap((r) => r.diagnostic.matchingFigures)).not.toContain(point.id);
});
test("source keys, rubric caps, table bindings and response cells are immutable in the private V2 adapter", () => {
  const changed = poaSpecimenPaper2Criteria(); changed[0].maxMarks++;
  expect(() => evaluatePoaSpecimenSourceV2({ paperId, criteria: changed, responses: {} })).toThrow("identity");
  const changedSource = poaSpecimenPaper2Criteria(); changedSource[0].sourceMarking.sourceSha256 = "forged";
  expect(() => evaluatePoaSpecimenSourceV2({ paperId, criteria: changedSource, responses: {} })).toThrow("identity");
  const duplicate = poaSpecimenPaper2Criteria(); duplicate[1] = duplicate[0];
  expect(() => evaluatePoaSpecimenSourceV2({ paperId, criteria: duplicate, responses: {} })).toThrow("identity");
  expect(() => evaluate({ "6": { working: "forged question" } })).toThrow("Unknown");
  expect(() => evaluate({ "1": { cells: { "forged": "100" } } })).toThrow("Unknown");
});
test("JSONB field order is accepted and a completely blank script remains a verified zero inside the server engine", () => {
  const reverse = (v) => Array.isArray(v) ? v.map(reverse) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).reverse().map(([k, x]) => [k, reverse(x)])) : v;
  expect(evaluatePoaSpecimenSourceV2({ paperId, criteria: reverse(poaSpecimenPaper2Criteria()), responses: {} })).toHaveLength(22);
  const blank = evaluateExistingSubjectPaper2V2({ subjectId: "principles-of-accounts", paperId, criteria: poaSpecimenPaper2Criteria(), responses: {} });
  expect(blank.confirmedMarks).toBe(0); expect(blank.unresolvedMarks).toBe(0);
});
