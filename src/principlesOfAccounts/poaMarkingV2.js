import { POA_PAPER2, POA_PAPER2_ID, poaPaper2Criteria } from "./data/poaPaper2";
import { evaluateObjectiveCriteria } from "../grading/objectiveMarkingV2";
import { reconcileMarkingCriteria } from "../grading/markingReconciliationV2";
import { evaluatePoaSpecimenSourceV2 } from "./poaSpecimenMarkingV2";
import { parseAccountingNumber } from "./accountingNumber";
export { parseAccountingNumber } from "./accountingNumber";

const plainObject = (value) => value !== null && typeof value === "object" &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const checkpoints = new Map(POA_PAPER2.flatMap((q) => q.checkpoints.map((c) => [c.id, c])));
const stable = (value) => JSON.stringify(sort(value));
function sort(value) {
  return Array.isArray(value) ? value.map(sort) : plainObject(value)
    ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, sort(value[key])])) : value;
}

// Only the labelled answer line is a mark-bearing field in this original
// numeric exercise. Saved freewritten working is not a method-mark rubric.
export function parsePoaOriginalAnswer(value, checkpoint) {
  if (typeof value === "string") {
    value = value.trim();
    if (checkpoint?.label.includes("(%)")) value = value.replace(/\s*%$/, "");
    if (/ratio|number before :1/i.test(checkpoint?.label || ""))
      value = value.replace(/\s*:\s*1$/, "");
  }
  return parseAccountingNumber(value);
}
function originalAnswers(responses) {
  if (!plainObject(responses)) throw new TypeError("Invalid Accounts responses");
  if (Object.keys(responses).some((key) => !checkpoints.has(key)))
    throw new Error("Unknown Accounts response key");
  const answers = new Map();
  for (const [id, response] of Object.entries(responses)) {
    let answer = response;
    if (plainObject(response)) {
      if (Object.keys(response).some((key) => !["answer", "working"].includes(key)))
        throw new Error("Unknown Accounts answer field");
      if (response.working !== undefined &&
        (typeof response.working !== "string" || response.working.length > 200000))
        throw new TypeError("Invalid Accounts working");
      answer = response.answer;
    }
    if (answer !== undefined && answer !== null &&
      !(typeof answer === "string" && answer.length <= 200000) &&
      !(typeof answer === "number" && Number.isFinite(answer)))
      throw new TypeError("Invalid Accounts answer");
    answers.set(id, answer);
  }
  return answers;
}
export function mapPoaPaper2V2(responses = {}) {
  const answers = originalAnswers(responses), criteria = poaPaper2Criteria();
  return {
    criteria,
    responses: Object.fromEntries(
      criteria.map((c) => {
        const value = parsePoaOriginalAnswer(answers.get(c.id), checkpoints.get(c.id));
        return [c.id, value === null ? "" : String(value)];
      }),
    ),
  };
}
export function reviewPoaPaper2V2(responses = {}) {
  const mapped = mapPoaPaper2V2(responses);
  const evidence = evaluateObjectiveCriteria({
    ...mapped,
    runId: "poa-objective-v2",
  });
  // The browser may show practice diagnostics; it cannot attest or publish grades.
  const reconciliation = reconcileMarkingCriteria({
    criteria: mapped.criteria,
    evidence,
  });
  return {
    paperId: POA_PAPER2_ID,
    version: "marking-reconciliation-v2",
    evidence,
    reconciliation,
    candidateMarks: evidence.reduce((n, e) => n + e.marks, 0),
    candidateCount: evidence.length,
    canPublishFinalScore: false,
  };
}
// Called by the existing private V2 worker with its server-owned registry.
export function evaluatePoaSourceV2({ paperId, criteria, responses }) {
  if (paperId === "poa-specimen-2-2017") return evaluatePoaSpecimenSourceV2({ paperId, criteria, responses });
  if (paperId !== POA_PAPER2_ID) throw new Error("Unknown Accounts V2 paper");
  const canonical = poaPaper2Criteria();
  if (!Array.isArray(criteria) || criteria.length !== canonical.length)
    throw new Error("Incomplete Accounts V2 rubric");
  const source = new Map(canonical.map((c) => [c.id, c])),
    seen = new Set();
  // PostgreSQL JSONB reorders object keys. Every source field still must match.
  for (const c of criteria) {
    const expected = source.get(c?.id);
    if (
      !expected ||
      seen.has(c.id) ||
      stable(c) !== stable(expected)
    )
      throw new Error("Accounts V2 source identity mismatch");
    seen.add(c.id);
  }
  const answers = originalAnswers(responses);
  return criteria.map((c) => {
    const answer = answers.get(c.id), blank = answer == null || typeof answer === "string" && !answer.trim();
    const value = parsePoaOriginalAnswer(answer, checkpoints.get(c.id));
    return {
      criterionId: c.id, maxMarks: 1,
      suggestedMarks: value !== null && Math.abs(value - c.expected) <= c.tolerance ? 1 : 0,
      method: "existing-POA-original-numeric-v2",
      resolved: blank || value !== null,
      diagnostic: {
        scope: "original-one-mark-answer-checkpoint",
        reason: blank ? "blank-answer" : value === null ? "unreadable-numeric-answer" : "numeric-comparison",
        methodWorkingAssessed: false,
      },
    };
  });
}
