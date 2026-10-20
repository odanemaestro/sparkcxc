import { POA_SPECIMEN_PAPER2 } from "./data/poaSpecimenPaper2";
import { reviewHistoricalAccountingFigures } from "./practice/poaHistoricalFeedback";

export const POA_SPECIMEN_PAPER2_RUBRIC_VERSION = `poa-historical-worked-v1:${POA_SPECIMEN_PAPER2.id}`;

// Official subpart ceilings are preserved. Unweighted requirements are guidance,
// not invented official B/A/OF points or a license to award a whole section for
// one matching numerical value. The private V2 release gates remain authoritative.
export function poaSpecimenPaper2Criteria() {
  return POA_SPECIMEN_PAPER2.questions.flatMap((question) => question.rubricSections.map((part) => ({
    id: `${POA_SPECIMEN_PAPER2.id}::${part.id}`, maxMarks: part.maxMarks,
    sourceFormat: "poa-specimen-official-subpart-v1",
    sourceMarking: {
      sourceId: POA_SPECIMEN_PAPER2.sourceId, sourceSha256: POA_SPECIMEN_PAPER2.sourceSha256,
      questionNumber: question.number, part, answerSection: question.answerSections.find((s) => s.id === part.id),
      checkpoints: question.numericCheckpoints.filter((c) => c.responseCell?.startsWith(`${part.id}:`) || c.responsePart === part.id),
      modelSolution: question.modelSolution,
      sourceIssues: POA_SPECIMEN_PAPER2.sourceIssues.filter((issue) => issue.affectedPartIds.includes(part.id)),
      authority: "source-backed-draft", reviewRequired: true,
    },
  })));
}
const object = (value) => value && typeof value === "object" && !Array.isArray(value);
const stable = (value) => JSON.stringify(sort(value));
function sort(value) {
  return Array.isArray(value) ? value.map(sort) : object(value) ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, sort(value[key])])) : value;
}
function validateResponses(responses) {
  if (!object(responses)) throw new TypeError("Invalid specimen responses");
  const questions = new Map(POA_SPECIMEN_PAPER2.questions.map((q) => [String(q.number), q]));
  for (const [number, response] of Object.entries(responses)) {
    const question = questions.get(number);
    if (!question || !object(response) || Object.keys(response).some((key) => !["working", "parts", "cells"].includes(key))) throw new Error("Unknown specimen response key");
    if (response.working !== undefined && typeof response.working !== "string") throw new Error("Invalid specimen working");
    const parts = new Set(question.answerSections.filter((s) => s.kind !== "table").map((s) => s.id));
    const cells = new Set(question.answerSections.filter((s) => s.kind === "table").flatMap((section) => section.rows.flatMap((row, r) => section.columns.slice(1).map((col, c) => `${section.id}:${r}:${c + 1}`))));
    for (const [key, allowed] of [["parts", parts], ["cells", cells]]) {
      if (response[key] === undefined) continue;
      if (!object(response[key]) || Object.entries(response[key]).some(([id, text]) => !allowed.has(id) || typeof text !== "string" || text.length > 200000)) throw new Error("Unknown specimen answer cell");
    }
  }
}
export function evaluatePoaSpecimenSourceV2({ paperId, criteria, responses }) {
  if (paperId !== POA_SPECIMEN_PAPER2.id) throw new Error("Unknown specimen V2 paper");
  const canonical = poaSpecimenPaper2Criteria(), source = new Map(canonical.map((c) => [c.id, c])), seen = new Set();
  if (!Array.isArray(criteria) || criteria.length !== canonical.length) throw new Error("Incomplete specimen V2 rubric");
  for (const criterion of criteria) {
    const expected = source.get(criterion.id);
    if (!expected || seen.has(criterion.id) || stable(criterion) !== stable(expected)) throw new Error("Specimen V2 source identity mismatch");
    seen.add(criterion.id);
  }
  validateResponses(responses);
  return criteria.map((criterion) => {
    const q = POA_SPECIMEN_PAPER2.questions.find((item) => item.number === criterion.sourceMarking.questionNumber);
    const figures = reviewHistoricalAccountingFigures(q, responses[String(q.number)]).filter((f) => f.responseCell?.startsWith(`${criterion.sourceMarking.part.id}:`) || f.responsePart === criterion.sourceMarking.part.id);
    return { criterionId: criterion.id, maxMarks: criterion.maxMarks, suggestedMarks: 0,
      method: "poa-specimen-source-v2", resolved: false,
      diagnostic: { matchingFigures: figures.filter((f) => f.matches).map((f) => f.id), checkedFigures: figures.length,
        pendingReason: criterion.sourceMarking.part.finalScoreUnresolved ? "source-conflict" : "method-and-presentation-calibration",
        sourceSchemePages: criterion.sourceMarking.part.sourceSchemePages } };
  });
}
