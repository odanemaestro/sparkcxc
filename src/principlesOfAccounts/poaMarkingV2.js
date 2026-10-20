import { POA_PAPER2_ID, poaPaper2Criteria } from "./data/poaPaper2";
import { evaluateObjectiveCriteria } from "../grading/objectiveMarkingV2";
import { reconcileMarkingCriteria } from "../grading/markingReconciliationV2";
// Accept a complete monetary response, never search prose for an expected number.
export function parseAccountingNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string" || value.length > 100) return null;
  let text = value.trim(),
    negative = false;
  if (/^\([^()]+\)$/.test(text)) {
    negative = true;
    text = text.slice(1, -1).trim();
  }
  text = text.replace(/^(?:J\$|US\$|EC\$|TT\$|BDS\$|\$)\s*/i, "");
  if (
    !/^[+-]?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(text) ||
    (negative && /^[+-]/.test(text))
  )
    return null;
  const result = Number(text.replaceAll(",", "")) * (negative ? -1 : 1);
  return Number.isFinite(result) ? result : null;
}
export function mapPoaPaper2V2(responses = {}) {
  if (!responses || typeof responses !== "object" || Array.isArray(responses))
    throw new TypeError("Invalid Accounts responses");
  const criteria = poaPaper2Criteria(),
    allowed = new Set(criteria.map((c) => c.id));
  if (Object.keys(responses).some((k) => !allowed.has(k)))
    throw new Error("Unknown Accounts response key");
  return {
    criteria,
    responses: Object.fromEntries(
      criteria.map((c) => {
        const raw = responses[c.id];
        const answer =
          raw && typeof raw === "object" && !Array.isArray(raw)
            ? raw.answer
            : raw;
        const value = parseAccountingNumber(answer);
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
  if (paperId !== POA_PAPER2_ID) throw new Error("Unknown Accounts V2 paper");
  const canonical = poaPaper2Criteria();
  if (!Array.isArray(criteria) || criteria.length !== canonical.length)
    throw new Error("Incomplete Accounts V2 rubric");
  const source = new Map(canonical.map((c) => [c.id, c])),
    seen = new Set();
  // PostgreSQL JSONB reorders object keys. Compare structure, not insertion order.
  const stable = (value) => JSON.stringify(sort(value));
  const sort = (value) =>
    Array.isArray(value)
      ? value.map(sort)
      : value && typeof value === "object"
        ? Object.fromEntries(
            Object.keys(value)
              .sort()
              .map((k) => [k, sort(value[k])]),
          )
        : value;
  for (const c of criteria) {
    const expected = source.get(c.id);
    if (
      !expected ||
      seen.has(c.id) ||
      c.maxMarks !== 1 ||
      c.sourceFormat !== expected.sourceFormat ||
      c.sourceMarking?.answer !== expected.expected ||
      stable(c.sourceMarking) !== stable(expected.sourceMarking)
    )
      throw new Error("Accounts V2 source identity mismatch");
    seen.add(c.id);
  }
  const review = reviewPoaPaper2V2(responses);
  const byId = new Map(review.evidence.map((e) => [e.criterionId, e]));
  return criteria.map((c) => ({
    criterionId: c.id,
    maxMarks: 1,
    suggestedMarks: byId.get(c.id)?.marks || 0,
    method: "poa-objective-v2",
    resolved: false,
  }));
}
