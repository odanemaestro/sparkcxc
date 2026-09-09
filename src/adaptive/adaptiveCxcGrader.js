// ============================================================================
// SPARK V5.6.1 - Adaptive Practice grading adapter
//
// Adaptive Practice now delegates correctness to the same canonical CXC
// grading gateway used by the Paper 2 marking core. No separate short-answer
// correctness rules live here.
// ============================================================================
import { adaptQuestionToCxcPart, gradeCanonicalResponse } from "../grading/answerIntelligence";

export function adaptiveQuestionUsesWorking(question) {
  try {
    return (adaptQuestionToCxcPart(question).criteria || []).some(criterion => criterion.kind === "M");
  } catch {
    return Number(question?.marks || 1) > 1;
  }
}

export function gradeAdaptiveResponse(question, response = {}) {
  return gradeCanonicalResponse(question, response);
}
