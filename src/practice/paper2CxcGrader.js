import {
  gradeRichPaper2Part,
  hasPaper2PartResponse,
  paper2ResponseSummary as richResponseSummary,
} from "./paper2RichGrader";
import { markPart } from "./cxcMarking/markScheme.js";

const text = value => String(value ?? "").trim();
const isObject = value => value && typeof value === "object" && !Array.isArray(value);

export function normalizePaper2TypedResponse(value) {
  if (isObject(value) && (Object.prototype.hasOwnProperty.call(value, "answer") || Object.prototype.hasOwnProperty.call(value, "working"))) {
    return { answer: String(value.answer ?? ""), working: String(value.working ?? "") };
  }
  if (typeof value === "string" || typeof value === "number") {
    return { answer: String(value), working: "" };
  }
  return { answer: "", working: "" };
}

export function paper2PartUsesWorking(part = {}) {
  return !part.responseSchema && (part.criteria || []).some(criterion => criterion.kind === "M" || String(criterion.code || "").startsWith("M"));
}

export function hasPaper2CxcPartResponse(value, part = {}) {
  if (part.responseSchema) return hasPaper2PartResponse(value);
  const response = normalizePaper2TypedResponse(value);
  return Boolean(text(response.answer) || text(response.working));
}

export function hasPaper2FinalAnswer(value, part = {}) {
  if (part.responseSchema) return hasPaper2PartResponse(value);
  return Boolean(text(normalizePaper2TypedResponse(value).answer));
}

function normalizeRichResult(result = {}, maxMarks = 0) {
  const details = (result.criteria || []).map((criterion, index) => ({
    ...criterion,
    code: criterion.code || `B${index + 1}`,
    kind: criterion.kind || "B",
    earned: criterion.earned !== undefined ? criterion.earned : Boolean(criterion.marks),
    label: criterion.label || criterion.description || "Rubric criterion",
    marks: Number(criterion.marks || 0),
    maxMarks: Number(criterion.maxMarks ?? criterion.of ?? 0),
    why: criterion.why || "",
  }));
  return {
    ...result,
    maxMarks: Number(result.maxMarks ?? maxMarks),
    criteria: details,
    canonicalCorrect: result.correct,
    ecf: Boolean(result.ecf),
  };
}

function normalizeMabResult(result = {}, maxMarks = 0) {
  const criteria = (result.criteria || []).map(criterion => ({
    ...criterion,
    earned: Boolean(criterion.awarded),
    label: criterion.ecf
      ? "correct following through from your earlier answer"
      : criterion.why === "uses your earlier answer consistently"
        ? "uses your earlier answer consistently"
        : criterion.description || "Mark-scheme criterion",
    marks: Number(criterion.marks || 0),
    maxMarks: Number(criterion.of || 0),
  }));
  const marks = Number(result.marks || 0);
  const cap = Number(result.of ?? maxMarks);
  return {
    status: marks >= cap ? "correct" : marks > 0 ? "partial" : "incorrect",
    correct: marks >= cap,
    canonicalCorrect: result.canonicalCorrect !== undefined ? result.canonicalCorrect : marks >= cap,
    marks,
    maxMarks: cap,
    criteria,
    ecf: Boolean(result.ecf),
    value: result.value ?? null,
    feedback: result.feedback || "",
  };
}

/**
 * Grade one Paper 2 part.
 *
 * Primitive strings are treated as legacy responses so saved pre-V5.3 attempts
 * and the existing canonical-answer regression tests keep their old behaviour.
 * New typed responses are objects { answer, working } and use M/A/B marking.
 */
export function gradeCxcPaper2Part(userInput, part = {}, earlier = {}) {
  const maxMarks = Number(part.marks || 0);
  if (!hasPaper2CxcPartResponse(userInput, part)) {
    return { status: "blank", correct: false, canonicalCorrect: false, marks: 0, maxMarks, criteria: [], ecf: false, value: null, feedback: "" };
  }

  if (part.responseSchema) {
    return normalizeRichResult(gradeRichPaper2Part(userInput, part), maxMarks);
  }

  if (typeof userInput === "string" || typeof userInput === "number") {
    // Backward compatibility only. V5.3's live UI stores typed responses as an
    // object, so students taking a new paper go through the M/A/B path below.
    return normalizeRichResult(gradeRichPaper2Part(userInput, part), maxMarks);
  }

  // A Paper 2 attempt saved before V5.3 contains the old question objects,
  // which do not yet carry derived M/A/B criteria. Preserve the old grading
  // contract for that in-progress attempt instead of applying a numeric-only
  // fallback to algebraic/text answers. New exams come from the upgraded bank.
  if (!(part.criteria || []).length) {
    const legacy = normalizePaper2TypedResponse(userInput);
    return normalizeRichResult(gradeRichPaper2Part(legacy.answer, part), maxMarks);
  }

  return normalizeMabResult(markPart(normalizePaper2TypedResponse(userInput), part, earlier), maxMarks);
}

export function paper2ResponseSummary(value, part = {}) {
  if (!hasPaper2CxcPartResponse(value, part)) return "No answer";
  if (part.responseSchema) return richResponseSummary(value, part);
  return text(normalizePaper2TypedResponse(value).answer) || "No final answer";
}

export function paper2WorkingSummary(value, part = {}) {
  if (part.responseSchema) return "";
  return text(normalizePaper2TypedResponse(value).working);
}
