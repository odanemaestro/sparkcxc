import { checkQuestionAnswer } from "../lib/answerCheck";
import { upgradePaper2Part } from "../practice/cxcMarking/adapter";
import { markPart } from "../practice/cxcMarking/markScheme";

function stringList(value) {
  if (Array.isArray(value)) return value.map(String);
  if (value == null || value === "") return [];
  return [String(value)];
}

function adaptivePart(question = {}) {
  const marks = Math.max(1, Number(question.marks || 1));
  const part = {
    id: "adaptive",
    prompt: String(question.question || ""),
    marks,
    answer: String(question.answer ?? ""),
    solution: String(question.worked_solution || ""),
    accepted: stringList(question.accepted || question.accepted_answers),
    tolerance: Number.isFinite(Number(question.tolerance)) ? Number(question.tolerance) : undefined,
    decimalPlaces: Number.isInteger(question.decimalPlaces) ? question.decimalPlaces : undefined,
    significantFigures: Number.isInteger(question.significantFigures) ? question.significantFigures : undefined,
    requiredForm: question.requiredForm,
  };
  const wrapper = {
    question_id: `adaptive:${question.id || "question"}`,
    stem: String(question.question || ""),
    marks,
    parts: [part],
  };
  return upgradePaper2Part(part, wrapper);
}

export function adaptiveQuestionUsesWorking(question) {
  try {
    return (adaptivePart(question).criteria || []).some(criterion => criterion.kind === "M");
  } catch {
    return Number(question?.marks || 1) > 1;
  }
}

export function gradeAdaptiveResponse(question, response = {}) {
  const answer = String(response.answer ?? "").trim();
  const working = String(response.working ?? "").trim();
  const marks = Math.max(1, Number(question?.marks || 1));

  if (!answer && !working) {
    return {
      status: "blank",
      correct: false,
      marks: 0,
      of: marks,
      criteria: [],
      needsSelfAssessment: false,
      selfAssessmentCorrectMarks: 0,
      feedback: "Enter your answer before checking it.",
    };
  }

  try {
    const part = adaptivePart(question);
    const result = markPart({ answer, working }, part, {});
    const canonicalStatus = checkQuestionAnswer(answer, {
      prompt: question?.question || "",
      answer: question?.answer ?? "",
      accepted: stringList(question?.accepted || question?.accepted_answers),
      answerType: question?.answerType,
      tolerance: question?.tolerance,
      decimalPlaces: question?.decimalPlaces,
      significantFigures: question?.significantFigures,
      requiredForm: question?.requiredForm,
    });

    const criteria = result.criteria || [];
    const methodLines = criteria.filter(line => line.kind === "M");
    const methodsComplete = methodLines.every(line => line.awarded);
    const needsSelfAssessment = canonicalStatus === "uncertain";
    const selfAssessmentCorrectMarks = needsSelfAssessment && methodsComplete ? result.of : result.marks;

    return {
      ...result,
      status: needsSelfAssessment ? "uncertain" : result.marks >= result.of ? "correct" : "incorrect",
      correct: !needsSelfAssessment && result.marks >= result.of,
      needsSelfAssessment,
      selfAssessmentCorrectMarks,
      canonicalStatus,
    };
  } catch (error) {
    const fallbackStatus = checkQuestionAnswer(answer, {
      prompt: question?.question || "",
      answer: question?.answer ?? "",
      accepted: stringList(question?.accepted || question?.accepted_answers),
    });
    const correct = fallbackStatus === "correct";
    return {
      status: fallbackStatus,
      correct,
      marks: correct ? marks : 0,
      of: marks,
      criteria: [],
      needsSelfAssessment: fallbackStatus === "uncertain",
      selfAssessmentCorrectMarks: marks,
      feedback: correct ? "Correct." : fallbackStatus === "uncertain" ? "Compare your answer with the worked solution." : "Not the required answer.",
      fallback: true,
      error: String(error),
    };
  }
}
