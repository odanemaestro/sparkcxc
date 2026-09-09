// ============================================================================
// SPARK V5.6.1 - Canonical Grading Gateway + Answer Intelligence
//
// One source of truth for mathematical correctness across Adaptive Practice.
// The existing CXC M/A/B/ECF marker remains authoritative for typed answers.
// Answer Intelligence observes the outcome AFTER grading. It may diagnose
// error patterns and grader uncertainty, but it never changes what is correct.
// ============================================================================
import { checkQuestionAnswer } from "../lib/answerCheck";
import { upgradePaper2Part } from "../practice/cxcMarking/adapter";
import { markPart } from "../practice/cxcMarking/markScheme";

const ANSWER_INTELLIGENCE_VERSION = "cxc-canonical-v5.6.1.1";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const clean = value => String(value ?? "").trim();
const normalizeChoiceText = value => clean(value)
  .replace(/[−–—]/g, "-")
  .toLowerCase()
  .replace(/\s+/g, " ")
  .trim();

function stripChoicePrefix(value) {
  return clean(value).replace(/^\s*(?:\([A-Za-z]\)|[A-Za-z][\).:\-])\s*/, "").trim();
}

export function isMultipleChoiceQuestion(question = {}) {
  const type = clean(question.question_type || question.response_mode || question.type).toLowerCase();
  return type === "multiple_choice" || type === "mcq" || Array.isArray(question.options);
}

export function optionKey(option, index) {
  if (typeof option === "string") return LETTERS[index] || String(index + 1);
  return clean(option?.key || LETTERS[index] || String(index + 1)).toUpperCase();
}

export function optionText(option) {
  return typeof option === "string" ? option : clean(option?.text ?? option?.label ?? option?.value);
}

function optionKeyFromAnswer(answer, options) {
  const raw = clean(answer);
  if (!raw) return null;

  const keyMatch = raw.match(/^(?:option\s*)?([A-Za-z])$/i);
  if (keyMatch) {
    const candidate = keyMatch[1].toUpperCase();
    return options.some((option, index) => optionKey(option, index) === candidate) ? candidate : null;
  }

  const target = normalizeChoiceText(raw);
  const matches = options
    .map((option, index) => ({
      key: optionKey(option, index),
      full: normalizeChoiceText(optionText(option)),
      stripped: normalizeChoiceText(stripChoicePrefix(optionText(option))),
    }))
    .filter(item => item.full === target || item.stripped === target)
    .map(item => item.key);

  return new Set(matches).size === 1 ? matches[0] : null;
}

/**
 * Resolve every independently authored clue to an MCQ's correct option.
 * A conflict is a content defect, not a reason to guess.
 */
export function resolveCanonicalOption(question = {}) {
  const options = Array.isArray(question.options) ? question.options : [];
  if (!options.length) {
    return { valid: false, key: null, conflicts: [], sources: [], error: "no_options" };
  }

  const sources = [];
  const addIndex = (label, raw) => {
    if (raw === null || raw === undefined || raw === "") return;
    const index = Number(raw);
    if (Number.isInteger(index) && index >= 0 && index < options.length) {
      sources.push({ source: label, key: optionKey(options[index], index) });
    }
  };

  addIndex("correct_option_index", question.correct_option_index);
  addIndex("correctOptionIndex", question.correctOptionIndex);
  addIndex("correct_index", question.correct_index);
  if (Number.isInteger(question.correct)) addIndex("correct", question.correct);

  const flagged = options
    .map((option, index) => ({ option, index }))
    .filter(({ option }) => option && typeof option === "object" && (option.is_correct === true || option.correct === true));
  flagged.forEach(({ option, index }) => sources.push({ source: "option.is_correct", key: optionKey(option, index) }));

  const explicitKey = clean(question.correct_option_key ?? question.correctOptionKey ?? question.correct_option);
  if (explicitKey) {
    const resolved = optionKeyFromAnswer(explicitKey, options);
    if (resolved) sources.push({ source: "correct_option_key", key: resolved });
  }

  const answerResolved = optionKeyFromAnswer(question.answer, options);
  if (answerResolved) sources.push({ source: "answer", key: answerResolved });

  const keys = [...new Set(sources.map(item => item.key).filter(Boolean))];
  const conflicts = keys.length > 1 ? sources : [];
  if (keys.length !== 1) {
    return {
      valid: false,
      key: null,
      conflicts,
      sources,
      error: keys.length ? "canonical_conflict" : "canonical_unresolved",
    };
  }

  return { valid: true, key: keys[0], conflicts: [], sources, error: null };
}

export function canonicalOptionKey(question = {}) {
  return resolveCanonicalOption(question).key || "";
}

function stringList(value) {
  if (Array.isArray(value)) return value.filter(item => item !== null && item !== undefined).map(String);
  if (value === null || value === undefined || value === "") return [];
  return [String(value)];
}

function questionRequiresWorking(question = {}) {
  if (question.requireWorking === true || question.requiresWorking === true) return true;
  const prompt = clean(question.question || question.prompt || question.stem);
  return /\bshow\s+(?:all\s+|your\s+)?working\b|\bshow\s+all\s+(?:steps|calculations)\b|\bprove\b|\bshow\s+that\b|\bjustify\b|\bgive\s+(?:a\s+)?reason\b/i.test(prompt);
}

/** Convert an Adaptive short-answer record into the same part shape Paper 2 uses. */
export function adaptQuestionToCxcPart(question = {}) {
  const marks = Math.max(1, Number(question.marks || 1));
  const part = {
    id: clean(question.id) || "adaptive",
    label: question.label,
    prompt: clean(question.question || question.prompt || question.stem),
    marks,
    answer: clean(question.answer ?? question.expectedAnswer ?? question.expected_answer),
    accepted: [
      ...stringList(question.accepted),
      ...stringList(question.accepted_answers),
      ...stringList(question.answer_variants),
    ],
    answerType: question.answerType ?? question.answer_type,
    tolerance: Number.isFinite(Number(question.tolerance)) ? Number(question.tolerance) : undefined,
    decimalPlaces: Number.isInteger(question.decimalPlaces) ? question.decimalPlaces : undefined,
    significantFigures: Number.isInteger(question.significantFigures) ? question.significantFigures : undefined,
    requiredForm: question.requiredForm ?? question.required_form,
    solution: clean(question.worked_solution || question.solution || question.explanation || question.modelAnswer),
    requireWorking: questionRequiresWorking(question),
  };

  if (Array.isArray(question.criteria)) part.criteria = question.criteria;
  if (question.responseSchema) part.responseSchema = question.responseSchema;

  const wrapper = {
    question_id: `adaptive:${clean(question.id) || "question"}`,
    stem: part.prompt,
    marks,
    parts: [part],
  };
  return upgradePaper2Part(part, wrapper);
}

function checkType(spec) {
  return clean(spec?.type);
}

function specIsAuthoritative(spec) {
  const type = checkType(spec);
  if (!type || type === "sparkAnswer") return false;
  if (type === "anyOf" || type === "allOf") {
    const options = Array.isArray(spec.options) ? spec.options : [];
    return options.some(specIsAuthoritative);
  }
  return true;
}

function hasAuthoritativeCriterion(part) {
  return (part?.criteria || []).some(criterion => specIsAuthoritative(criterion?.check));
}

function scalarCanonicalAnswer(answer) {
  const raw = clean(answer);
  if (!raw || raw.includes("=") || /\bor\b/i.test(raw) || /[,;].*[,;]/.test(raw)) return false;
  const stripped = raw
    .replace(/^[$£€]\s*/, "")
    .replace(/\b(?:TT|JA|BB|EC|US|BD|G|XCD)\s*\$/gi, "")
    .replace(/,/g, "")
    .replace(/\s*(?:cm|mm|m|km|kg|g|ml|l|s|min|h|hr|hrs|degrees?|deg|units?)\s*(?:\^?[23])?\s*$/i, "")
    .replace(/[°%]\s*$/, "")
    .trim();
  return /^[+-]?(?:(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\d+\s+\d+\s*\/\s*\d+|\d+\s*\/\s*\d+)$/i.test(stripped);
}

/**
 * Extract only a terminal result from a clearly-written calculation chain.
 * This never decides correctness. The extracted value is sent back through the
 * same canonical CXC marker. It is deliberately disabled for equations, roots,
 * sets, coordinates and other multi-value answers.
 */
export function terminalCalculationCandidate(response, canonicalAnswer) {
  const raw = clean(response);
  if (!raw || !scalarCanonicalAnswer(canonicalAnswer) || /\bor\b/i.test(raw)) return null;

  const labelled = raw.match(/(?:^|[\n;])\s*(?:final\s+answer|answer|ans)\s*(?:=|:)\s*([^=\n;]+)\s*$/i);
  if (labelled) return labelled[1].trim().replace(/[.;]\s*$/, "");

  const equalsCount = (raw.match(/=/g) || []).length;
  if (equalsCount < 2) return null;
  const candidate = raw.split("=").pop().trim().replace(/[.;]\s*$/, "");
  return candidate && candidate.length <= 120 ? candidate : null;
}

function forceFullCredit(result, why) {
  const criteria = (result.criteria || []).map(line => ({
    ...line,
    awarded: true,
    marks: Number(line.of ?? line.marks ?? 0),
    dependencyBlocked: false,
    blocked: [],
    why: line.kind === "M" ? "implied by a correct final answer" : (line.why || why),
    impliedByAnswer: line.kind === "M" ? true : line.impliedByAnswer,
  }));
  return {
    ...result,
    marks: Number(result.of || 0),
    correct: true,
    canonicalCorrect: true,
    criteria,
    feedback: "Full marks.",
  };
}

function missedCriterionEvidence(result = {}) {
  const missed = (result.criteria || []).filter(line => !line.awarded);
  const first = missed[0];
  if (!first) return null;

  const why = clean(first.why).toLowerCase();
  const description = clean(first.description).toLowerCase();
  const type = checkType(first.check);

  if (first.precisionOnly || /decimal place|significant figure|precision|round/.test(why)) {
    return { code: "precision", label: "Accuracy or rounding requirement" };
  }
  if (first.unitMissing || /unit/.test(why) && /missing|required/.test(why)) {
    return { code: "unit_missing", label: "Required unit missing" };
  }
  if (first.formOnly || /factoris|factoriz|required form|simplest form|slope-intercept/.test(`${why} ${description}`)) {
    return { code: "required_form", label: "Answer not in the required form" };
  }
  if (first.kind === "M") return { code: "method", label: "Required method step not demonstrated" };
  if (["written", "reasonConcept", "prose"].includes(type) || /reason|explain|state|concept/.test(description)) {
    return { code: "concept", label: "Required mathematical idea or reason missing" };
  }
  return { code: "wrong_value", label: "Final value does not match the required result" };
}

function selectedOptionFor(question, selectedKey) {
  const options = Array.isArray(question?.options) ? question.options : [];
  return options.find((option, index) => optionKey(option, index) === clean(selectedKey).toUpperCase()) || null;
}

export function deriveAnswerEvidence(question, grade = {}, extra = {}) {
  const status = clean(grade.status || (grade.correct ? "correct" : "incorrect"));
  const selected = extra.selectedOption || selectedOptionFor(question, extra.selectedKey);
  const misconception = selected && typeof selected === "object" ? selected.misconception : null;
  const canonicalConflict = grade.canonicalConflict === true;

  let error = null;
  if (canonicalConflict) {
    error = { code: "canonical_conflict", label: "Question answer key needs review" };
  } else if (status === "uncertain") {
    error = { code: "grader_uncertain", label: "Answer format needs grader review" };
  } else if (status !== "correct" && misconception?.code) {
    error = { code: clean(misconception.code), label: clean(misconception.label || misconception.code) };
  } else if (status !== "correct") {
    error = missedCriterionEvidence(grade) || { code: "wrong_answer", label: "Answer does not match the required result" };
  }

  return {
    grader: ANSWER_INTELLIGENCE_VERSION,
    grader_confidence: status === "uncertain" || canonicalConflict ? "review" : "high",
    canonical_validated: grade.canonicalValidated === true,
    canonical_conflict: canonicalConflict,
    answer_family: isMultipleChoiceQuestion(question) ? "multiple_choice" : "typed_math",
    status,
    error_code: error?.code || null,
    error_label: error?.label || null,
    missed_criteria: (grade.criteria || []).filter(line => !line.awarded).map(line => line.code).filter(Boolean),
    earned_criteria: (grade.criteria || []).filter(line => line.awarded).map(line => line.code).filter(Boolean),
    marks_earned: Number(grade.marks || 0),
    marks_available: Number(grade.of || question?.marks || 1),
    self_assessment_required: grade.needsSelfAssessment === true,
    answer_candidate_extracted: grade.answerCandidateExtracted === true,
  };
}

export function answerEvidenceForSelfAssessment(previous = {}, wasCorrect) {
  return {
    ...previous,
    status: wasCorrect ? "correct" : "incorrect",
    grader_confidence: "self_assessed",
    self_assessment_required: false,
    self_assessed: true,
    error_code: wasCorrect ? null : "self_assessed_incorrect",
    error_label: wasCorrect ? null : "Student identified the response as incorrect",
  };
}

export function validateCanonicalQuestion(question = {}) {
  const id = clean(question.id || question.question_id || "unknown");
  const issues = [];

  if (isMultipleChoiceQuestion(question)) {
    const resolved = resolveCanonicalOption(question);
    if (!resolved.valid) issues.push(resolved.error || "canonical_unresolved");
    if (resolved.conflicts.length) issues.push("conflicting_answer_sources");
    return { id, valid: issues.length === 0, issues, canonicalKey: resolved.key, kind: "mcq" };
  }

  const canonical = clean(question.answer ?? question.expectedAnswer ?? question.expected_answer);
  if (!canonical) issues.push("missing_canonical_answer");
  if (canonical && checkQuestionAnswer(canonical, question) !== "correct") issues.push("canonical_answer_rejected");

  const accepted = [
    ...stringList(question.accepted),
    ...stringList(question.accepted_answers),
    ...stringList(question.answer_variants),
  ];
  accepted.forEach((value, index) => {
    if (checkQuestionAnswer(value, question) !== "correct") issues.push(`accepted_answer_${index}_rejected`);
  });

  return { id, valid: issues.length === 0, issues, kind: "typed" };
}

export function gradeCanonicalResponse(question = {}, response = {}) {
  const answer = clean(response.answer);
  const working = clean(response.working);
  const marks = Math.max(1, Number(question.marks || 1));

  if (!answer && !working) {
    const blank = {
      status: "blank", correct: false, marks: 0, of: marks, criteria: [],
      needsSelfAssessment: false, selfAssessmentCorrectMarks: 0,
      feedback: "Enter your answer before checking it.", canonicalValidated: false,
    };
    return { ...blank, answerEvidence: deriveAnswerEvidence(question, blank) };
  }

  if (isMultipleChoiceQuestion(question)) {
    const resolved = resolveCanonicalOption(question);
    if (!resolved.valid) {
      const uncertain = {
        status: "uncertain", correct: false, marks: 0, of: marks, criteria: [],
        needsSelfAssessment: true, selfAssessmentCorrectMarks: marks,
        canonicalValidated: false, canonicalConflict: resolved.error === "canonical_conflict",
        canonicalResolution: resolved,
        feedback: "This question's answer key needs review. Compare with the worked solution before recording your result.",
      };
      return { ...uncertain, answerEvidence: deriveAnswerEvidence(question, uncertain, { selectedKey: answer }) };
    }
    const selectedKey = answer.toUpperCase();
    const correct = selectedKey === resolved.key;
    const result = {
      status: correct ? "correct" : "incorrect",
      correct,
      marks: correct ? marks : 0,
      of: marks,
      criteria: [],
      needsSelfAssessment: false,
      selfAssessmentCorrectMarks: correct ? marks : 0,
      canonicalValidated: true,
      canonicalKey: resolved.key,
      canonicalResolution: resolved,
      feedback: correct ? "Correct." : "Not quite.",
    };
    return { ...result, answerEvidence: deriveAnswerEvidence(question, result, { selectedKey }) };
  }

  try {
    const canonicalValidation = validateCanonicalQuestion(question);
    const part = adaptQuestionToCxcPart(question);
    let result = markPart({ answer, working }, part, {});
    let answerCandidateExtracted = false;

    // If the learner used the Final answer box as a calculation line, extract a
    // scalar terminal result and submit THAT through the same CXC marker.
    if (Number(result.marks || 0) < Number(result.of || marks)) {
      const candidate = terminalCalculationCandidate(answer, question.answer);
      if (candidate && candidate !== answer) {
        const candidateResult = markPart({ answer: candidate, working: [working, answer].filter(Boolean).join("\n") }, part, {});
        if (Number(candidateResult.marks || 0) > Number(result.marks || 0)) {
          result = candidateResult;
          answerCandidateExtracted = true;
        }
      }
    }

    const canonicalStatus = checkQuestionAnswer(answer, question);
    const fullByMarker = Number(result.of || marks) > 0 && Number(result.marks || 0) >= Number(result.of || marks);
    const canonicalCorrect = canonicalStatus === "correct";

    // The current CXC marker already applies the examiner rule that a correct
    // final answer implies method unless working was explicitly demanded. This
    // fallback protects older grading-core builds without creating a second
    // mathematical comparison system.
    if (!fullByMarker && canonicalCorrect && !questionRequiresWorking(question)) {
      result = forceFullCredit({ ...result, of: Number(result.of || marks) }, "correct equivalent final answer");
    }

    const full = Number(result.of || marks) > 0 && Number(result.marks || 0) >= Number(result.of || marks);
    const partial = Number(result.marks || 0) > 0 && !full;
    const authoritative = hasAuthoritativeCriterion(part);
    const uncertain = !full && !partial && canonicalStatus === "uncertain" && !authoritative;
    const status = full ? "correct" : uncertain ? "uncertain" : "incorrect";
    const effective = {
      ...result,
      of: Number(result.of || marks),
      status,
      correct: full,
      needsSelfAssessment: uncertain,
      selfAssessmentCorrectMarks: uncertain ? Number(result.of || marks) : Number(result.marks || 0),
      canonicalStatus,
      canonicalValidated: canonicalValidation.valid,
      answerCandidateExtracted,
      grader: ANSWER_INTELLIGENCE_VERSION,
    };
    return { ...effective, answerEvidence: deriveAnswerEvidence(question, effective) };
  } catch (error) {
    // Fail safely through the existing canonical answer checker. A grading-core
    // exception must never silently turn a correct mathematical answer into a
    // wrong learner-model signal.
    const fallbackStatus = checkQuestionAnswer(answer, question);
    const correct = fallbackStatus === "correct";
    const uncertain = fallbackStatus === "uncertain";
    const fallback = {
      status: fallbackStatus,
      correct,
      marks: correct ? marks : 0,
      of: marks,
      criteria: [],
      needsSelfAssessment: uncertain,
      selfAssessmentCorrectMarks: marks,
      canonicalValidated: validateCanonicalQuestion(question).valid,
      fallback: true,
      error: clean(error),
      feedback: correct ? "Correct." : uncertain ? "Compare your answer with the worked solution." : "Not the required answer.",
      grader: ANSWER_INTELLIGENCE_VERSION,
    };
    return { ...fallback, answerEvidence: deriveAnswerEvidence(question, fallback) };
  }
}

/**
 * Observational answer model. This records patterns AFTER a grade is decided.
 * It deliberately does not feed back into the verdict for the current answer.
 */
export async function recordAnswerObservation({ supabase, userId, question, evidence, selfAssessed = false }) {
  if (!supabase || !userId || !question || !evidence) return { skipped: true };
  try {
    const { data, error } = await supabase.rpc("spark_record_answer_observation", {
      p_question_id: clean(question.id || question.question_id),
      p_skill: clean(question.subtopic || question.skill || question.topic || "CSEC Mathematics"),
      p_source: "adaptive_practice",
      p_status: clean(evidence.status || "unknown"),
      p_marks_earned: Number(evidence.marks_earned || 0),
      p_marks_available: Math.max(1, Number(evidence.marks_available || question.marks || 1)),
      p_error_code: evidence.error_code || null,
      p_error_label: evidence.error_label || null,
      p_grader: evidence.grader || ANSWER_INTELLIGENCE_VERSION,
      p_grader_confidence: evidence.grader_confidence || "review",
      p_self_assessed: Boolean(selfAssessed || evidence.self_assessed),
      p_metadata: {
        canonical_validated: Boolean(evidence.canonical_validated),
        canonical_conflict: Boolean(evidence.canonical_conflict),
        answer_family: evidence.answer_family || null,
        missed_criteria: evidence.missed_criteria || [],
        earned_criteria: evidence.earned_criteria || [],
        answer_candidate_extracted: Boolean(evidence.answer_candidate_extracted),
      },
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

export const answerIntelligenceVersion = ANSWER_INTELLIGENCE_VERSION;
