/**
 * Automated Marking V2: deterministic, criterion-level reconciliation.
 * This module NEVER turns an uncertain grading decision into final credit.
 * Model interpretations remain advisory until independently corroborated.
 */
const isNumber = value => typeof value === "number" && Number.isFinite(value);
const validMark = (value, ceiling) => isNumber(value) && value >= 0 && value <= ceiling;
const safeString = value => typeof value === "string" ? value.trim() : "";
export const MARKING_V2_VERSION = "marking-reconciliation-v2";
export const DECISIONS = Object.freeze({
  AWARD: "award", DENY: "deny", UNRESOLVED: "unresolved"
});
const allowed = new Set(Object.values(DECISIONS));

/**
 * Input:
 * criterion {id,maxMarks}
 * evidence [{criterionId,decision,marks,method,evidenceRefs,reason}]
 * 
 * A criterion is resolved only when two distinct, trusted rule-based methods
 * agree on its decision and awarded marks. Semantic AI suggestions alone do
 * not certify a result. A denial counts as 0, not as missing evidence.
 */
export function reconcileMarkingCriteria({criteria=[], evidence=[]}={}) {
  if (!Array.isArray(criteria) || !Array.isArray(evidence)) {
    throw new TypeError("Criteria and evidence must be arrays");
  }
  const ids = new Set();
  const parts = criteria.map(criterion => {
    const id = safeString(criterion?.id);
    const maxMarks = criterion?.maxMarks;
    if (!id || ids.has(id) || !isNumber(maxMarks) || maxMarks <= 0) {
      throw new TypeError("Invalid or duplicate criterion");
    }
    ids.add(id);
    const entries = evidence.filter(entry => entry?.criterionId === id);
    const acceptable = entries.filter(entry =>
      allowed.has(entry?.decision) &&
      safeString(entry?.method) &&
      Array.isArray(entry?.evidenceRefs) &&
      entry.evidenceRefs.length > 0 &&
      entry.evidenceRefs.every(ref => Boolean(safeString(ref))) &&
      validMark(entry?.marks, maxMarks) &&
      (entry.decision !== DECISIONS.DENY || entry.marks === 0) &&
      (entry.decision !== DECISIONS.UNRESOLVED || entry.marks === 0)
    );
    const trusted = acceptable.filter(entry => entry.authority === "trusted-rule");
    const decisions = new Map();
    for (const entry of trusted) {
      const key = entry.decision + ":" + entry.marks;
      if (!decisions.has(key)) decisions.set(key, new Set());
      decisions.get(key).add(entry.method.trim());
    }
    const consensus = [...decisions.entries()].filter(([key,methods]) =>
      methods.size >= 2 && !key.startsWith(DECISIONS.UNRESOLVED + ":")
    );
    const disagreement = new Set(trusted.filter(x=>x.decision!==DECISIONS.UNRESOLVED).map(x=>x.decision+":"+x.marks)).size > 1;
    const resolved = consensus.length === 1 && !disagreement;
    const winner = resolved ? trusted.find(x => x.decision + ":" + x.marks === consensus[0][0]) : null;
    return {
      id, maxMarks,
      awardedMarks: winner ? winner.marks : 0,
      unresolvedMarks: winner ? 0 : maxMarks,
      status: winner ? "verified" : "unresolved",
      reason: winner ? "independent-rule-consensus" : disagreement ? "conflicting-evidence" : "insufficient-independent-evidence",
      supportingMethods: winner ? [...consensus[0][1]].sort() : [],
      evidenceCount: acceptable.length
    };
  });
  const maxMarks = parts.reduce((sum,item)=>sum+item.maxMarks,0);
  const confirmedMarks = parts.reduce((sum,item)=>sum+item.awardedMarks,0);
  const unresolvedMarks = parts.reduce((sum,item)=>sum+item.unresolvedMarks,0);
  return {
    version: MARKING_V2_VERSION,
    parts, maxMarks, confirmedMarks, unresolvedMarks,
    canPublishFinalScore: parts.length > 0 && unresolvedMarks === 0,
    status: parts.length > 0 && unresolvedMarks === 0 ? "verified" : "requires-review"
  };
}

/** Check server-side totals and rubric identity before a publication attempt. */
export function auditMarkingV2Release({reconciliation,expectedMaxMarks,rubricVersion,serverRubricVersion}={}) {
  const issues = [];
  if (!reconciliation || reconciliation.version !== MARKING_V2_VERSION) issues.push("missing-reconciliation");
  if (!safeString(rubricVersion) || rubricVersion !== serverRubricVersion) issues.push("rubric-version-mismatch");
  if (!isNumber(expectedMaxMarks) || expectedMaxMarks <= 0 ||
      !reconciliation || reconciliation.maxMarks !== expectedMaxMarks) issues.push("total-marks-mismatch");
  if (!reconciliation?.canPublishFinalScore || reconciliation?.unresolvedMarks !== 0)
    issues.push("unresolved-credit");
  if (reconciliation && (!isNumber(reconciliation.confirmedMarks) ||
      reconciliation.confirmedMarks < 0 || reconciliation.confirmedMarks > expectedMaxMarks))
    issues.push("invalid-confirmed-marks");
  return {canPublish:issues.length===0, issues, score:issues.length===0?reconciliation.confirmedMarks:null};
}
