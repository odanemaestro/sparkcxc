import { POA_HISTORICAL_PAPER2_ARCHIVE } from "../data/poaHistoricalPaper2";
import { POA_SPECIMEN_PAPER2 } from "../data/poaSpecimenPaper2";
import { getPoaPrintedQuestions } from "../data/poaPrintedPapers";
import { POA_SPECIMEN_METHOD_POLICY } from "./poaSpecimenMethodPolicy";
import { POA_HISTORICAL_METHODS_EARLY } from "./poaHistoricalMethodsEarly";
import { POA_HISTORICAL_METHODS_LATE } from "./poaHistoricalMethodsLate";
import { evaluatePoaMethodQuestion } from "./poaMethodEvaluator";

export const POA_METHOD_RUBRIC_VERSION = "poa-source-methods-v1";
export const POA_METHOD_EXAMINER = "existing-POA-source-methods-v1";
export const POA_METHOD_SOURCE_FORMAT = "poa-method-question-v1";
const object = (value) => value && typeof value === "object" && !Array.isArray(value);
const ordered = (value) => Array.isArray(value) ? value.map(ordered) : object(value) ?
  Object.fromEntries(Object.keys(value).filter((key) => value[key] !== undefined).sort().map((key) => [key, ordered(value[key])])) : value;
const stable = (value) => JSON.stringify(ordered(value));
const sources = [...POA_HISTORICAL_PAPER2_ARCHIVE, POA_SPECIMEN_PAPER2];
const policies = [...POA_HISTORICAL_METHODS_EARLY, ...POA_HISTORICAL_METHODS_LATE,
  ...POA_SPECIMEN_METHOD_POLICY.questions.map((question) => ({ ...question, questionNumber: question.number,
    paperId: POA_SPECIMEN_PAPER2.id, sourceSha256: POA_SPECIMEN_PAPER2.sourceSha256,
    policyVersion: POA_SPECIMEN_METHOD_POLICY.version, authority: "spark-authored",
    errata: POA_SPECIMEN_METHOD_POLICY.errata }))];
export const POA_METHOD_QUESTION_POLICIES = policies;
const byQuestion = new Map(policies.map((policy) => [`${policy.paperId}|${policy.questionNumber}`, policy]));
function combinations(values, count) {
  if (!count) return [[]];
  return values.flatMap((value, i) => combinations(values.slice(i + 1), count - 1).map((tail) => [value, ...tail]));
}
export function poaMethodChoices(paper) {
  const choice = paper.choicePolicy;
  if (!choice || choice.type === "all") return [paper.questions.map((question) => question.number)];
  return combinations(choice.from, choice.choose).map((optional) => [...choice.compulsory, ...optional].sort((a, b) => a - b));
}
export const poaMethodPaperId = (sourcePaperId, questions) => `${sourcePaperId}--q-${[...questions].sort((a,b)=>a-b).join("-")}`;
export function poaMethodCriteria(sourcePaperId, selectedQuestions) {
  const paper = sources.find((source) => source.id === sourcePaperId);
  if (!paper || !poaMethodChoices(paper).some((choice) => stable(choice) === stable(selectedQuestions))) throw new Error("Invalid Accounts question choice");
  return selectedQuestions.map((number) => {
    const policy = byQuestion.get(`${sourcePaperId}|${number}`);
    if (!policy) throw new Error(`Missing authored Accounts method policy ${sourcePaperId} question ${number}`);
    const sourceQuestion = paper.questions.find((question) => question.number === number);
    const maximum = policy.sections.reduce((sum, section) => sum + section.maxMarks, 0);
    if (maximum !== sourceQuestion.maxMarks || policy.sourceSha256 !== paper.sourceSha256 || policy.authority !== "spark-authored") throw new Error("Accounts source allocation mismatch");
    for (const section of policy.sections) {
      if (section.points.reduce((sum, point) => sum + point.marks, 0) !== section.maxMarks || section.points.some((point) => !Number.isSafeInteger(point.marks) || point.marks <= 0)) throw new Error("Accounts subpart allocation mismatch");
    }
    return { id: String(number), sourcePartId: String(number), maxMarks: maximum, sourceFormat: POA_METHOD_SOURCE_FORMAT,
      sourceMarking: { sourcePaperId, sourceSha256: paper.sourceSha256, questionNumber: number,
        selectedQuestions, authority: "spark-authored", rubricVersion: POA_METHOD_RUBRIC_VERSION,
        sourceQuestionPages: sourceQuestion.sourcePages, officialSchemeAvailable: paper.officialSchemeAvailable,
        policy } };
  });
}
export function poaMethodPapers() {
  return sources.flatMap((paper) => poaMethodChoices(paper).map((selectedQuestions) => ({
    subjectId: "principles-of-accounts", paperId: poaMethodPaperId(paper.id, selectedQuestions),
    sourcePaperId: paper.id, rubricVersion: POA_METHOD_RUBRIC_VERSION,
    expectedTotalMarks: paper.maxMarks, sourcePdfSha256: paper.sourceSha256,
    selectedQuestions, choicePolicy: paper.choicePolicy, criteria: poaMethodCriteria(paper.id, selectedQuestions),
  })));
}
export function poaMethodPaperDescriptor(paperId) {
  const at = paperId.lastIndexOf("--q-");
  if (at < 0) return null;
  const sourcePaperId = paperId.slice(0, at), selectedQuestions = paperId.slice(at + 4).split("-").map(Number);
  const source = sources.find((paper) => paper.id === sourcePaperId);
  if (!source || !poaMethodChoices(source).some((choice) => stable(choice) === stable(selectedQuestions))) return null;
  return { source, sourcePaperId, selectedQuestions, criteria: poaMethodCriteria(sourcePaperId, selectedQuestions) };
}
function allowedResponseFields(question, printedQuestion, policy) {
  const parts = new Set((question.answerSections || []).filter((section) => section.kind !== "table").map((section) => section.id));
  for (const section of policy.sections) parts.add(section.id);
  const cells = new Set((question.answerSections || []).filter((section) => section.kind === "table").flatMap((section) => section.rows.flatMap((_, r) => section.columns.slice(1).map((_, c) => `${section.id}:${r}:${c + 1}`))));
  if (printedQuestion?.requiresDrawing || printedQuestion?.blocks.some((block) => block.responseKind === "drawing")) {
    parts.add("drawing:strokes"); parts.add("drawing:notes");
  }
  for (const block of printedQuestion?.blocks || []) {
    if (!block.answerSpace || !block.answerId) continue;
    if (block.type === "cheque") for (const field of ["date", "payee", "words", "cents", "signature", "amount"]) cells.add(`${block.answerId}:${field}`);
    if (block.type === "table") block.rows.forEach((row, r) => row.forEach((cell, c) => {
      if (!block.readOnlyCells?.includes(`${r}:${c}`) && (cell === "" || block.editableCells?.includes(`${r}:${c}`))) cells.add(`${block.answerId}:${r}:${c}`);
    }));
    for (const heading of block.headingFields || []) cells.add(`${block.answerId}:heading:${heading.id}`);
  }
  return { parts, cells };
}
export function evaluatePoaMethodsV2({ paperId, criteria, responses }) {
  const descriptor = poaMethodPaperDescriptor(paperId);
  if (!descriptor || stable(criteria) !== stable(descriptor.criteria) || !object(responses)) throw new Error("Accounts method source identity mismatch");
  const selected = new Set(descriptor.selectedQuestions.map(String));
  if (Object.keys(responses).some((number) => !selected.has(number))) throw new Error("Unselected Accounts response question");
  const printed = getPoaPrintedQuestions(descriptor.sourcePaperId);
  for (const [number, response] of Object.entries(responses)) {
    const question = descriptor.source.questions.find((item) => String(item.number) === number);
    if (!object(response) || Object.keys(response).some((field) => !["working", "parts", "cells"].includes(field)) ||
      response.working !== undefined && (typeof response.working !== "string" || response.working.length > 200000)) throw new Error("Invalid Accounts method response fields");
    const allowed = allowedResponseFields(question, printed.find((item) => String(item.number) === number), byQuestion.get(`${descriptor.sourcePaperId}|${number}`));
    for (const field of ["parts", "cells"]) if (response[field] !== undefined && (!object(response[field]) ||
      Object.entries(response[field]).some(([id, text]) => !allowed[field].has(id) || typeof text !== "string" || text.length > 200000))) throw new Error("Unknown Accounts method response cell");
  }
  return criteria.map((criterion) => {
    const number = criterion.sourceMarking.questionNumber, question = descriptor.source.questions.find((item) => item.number === number);
    const result = evaluatePoaMethodQuestion({ policy: criterion.sourceMarking.policy, response: responses[String(number)] || {}, question,
      printedQuestion: printed.find((item) => item.number === number), allResponses: responses });
    return { criterionId: criterion.id, maxMarks: criterion.maxMarks, suggestedMarks: result.marks,
      method: POA_METHOD_EXAMINER, resolved: result.resolved, diagnostic: result };
  });
}
