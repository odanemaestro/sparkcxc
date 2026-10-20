import { parseAccountingNumber } from "../accountingNumber";

// These comparisons explain individual figures. They never turn a collection of
// matching values into a historical question mark or replace method assessment.
export function reviewHistoricalAccountingFigures(question, response = {}) {
  return (question.numericCheckpoints || []).map((checkpoint) => {
    let raw = checkpoint.responseCell ? response.cells?.[checkpoint.responseCell] : checkpoint.responsePart ? response.parts?.[checkpoint.responsePart] : undefined;
    if (typeof raw === "string" && /%/.test(checkpoint.label)) raw = raw.trim().replace(/%$/, "").trim();
    if (typeof raw === "string" && /ratio/i.test(checkpoint.label) && /^\s*\d+(?:\.\d+)?\s*:\s*1\s*$/.test(raw)) raw = raw.split(":")[0].trim();
    const value = parseAccountingNumber(raw);
    const tolerance = Number.isFinite(checkpoint.tolerance) ? checkpoint.tolerance : 0.005;
    return { ...checkpoint, entered: typeof raw === "string" ? raw : "", value,
      matches: value !== null && Math.abs(value - checkpoint.expected) <= tolerance + 1e-9,
      canPublishFinalScore: false };
  });
}
