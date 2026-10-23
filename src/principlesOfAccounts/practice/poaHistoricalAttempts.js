export const historicalAttemptKey = (userId, paperId) => `spark-poa-historical-v2:${userId || "guest"}:${paperId}`;
export const historicalBankVersion = (paper) => `poa-historical-text-v1:${paper.id}`;
export const historicalRubricVersion = (paper) => `poa-historical-worked-v1:${paper.id}`;
export function freshHistoricalAttempt(paper) {
  return { version: 2, paperId: paper.id, sourceSha256: paper.sourceSha256,
    id: crypto.randomUUID(), phase: "instructions", mode: "practice", responses: {},
    flags: {}, selectedQuestions: [], index: 0, page: paper.instructionPages?.[0] || 1, deadline: null,
    serverId: null, submittedAt: null, serverSubmitted: false };
}
export function restoreHistoricalAttempt(key, paper, storage = localStorage) {
  const fresh = () => freshHistoricalAttempt(paper);
  try {
    const saved = JSON.parse(storage.getItem(key));
    const allowed = new Set(paper.questions.map((q) => String(q.number)));
    if (!saved || saved.version !== 2 || saved.paperId !== paper.id || saved.sourceSha256 !== paper.sourceSha256 ||
      !["instructions", "exam", "review"].includes(saved.phase) ||
      !["practice", "timed"].includes(saved.mode) || !saved.responses || typeof saved.responses !== "object" || Array.isArray(saved.responses) ||
      !saved.flags || typeof saved.flags !== "object" || Array.isArray(saved.flags) ||
      !Number.isInteger(saved.index) || saved.index < 0 || saved.index >= paper.questionCount ||
      !Number.isInteger(saved.page) || saved.page < 1 || saved.page > paper.pageCount ||
      !Array.isArray(saved.selectedQuestions) ||
      saved.selectedQuestions.some((n) => !Number.isInteger(n) || !allowed.has(String(n))) ||
      new Set(saved.selectedQuestions).size !== saved.selectedQuestions.length ||
      (saved.mode === "timed" && saved.phase !== "instructions" && !Number.isFinite(saved.deadline))) return fresh();
    if (Object.keys(saved.responses).some((id) => !allowed.has(id))) return fresh();
    const stringMap = (value) => value && typeof value === "object" && !Array.isArray(value) &&
      Object.values(value).every((text) => typeof text === "string" && text.length <= 200000);
    for (const response of Object.values(saved.responses)) {
      if (!response || typeof response !== "object" || Array.isArray(response) ||
        Object.keys(response).some((field) => !["answer", "working", "parts", "cells"].includes(field)) ||
        (response.answer !== undefined && typeof response.answer !== "string") ||
        (response.working !== undefined && typeof response.working !== "string") ||
        (response.parts !== undefined && !stringMap(response.parts)) ||
        (response.cells !== undefined && !stringMap(response.cells))) return fresh();
    }
    if (typeof saved.id !== "string" || (saved.serverId !== null && typeof saved.serverId !== "string") ||
      typeof saved.serverSubmitted !== "boolean") return fresh();
    return { ...fresh(), ...saved };
  } catch { return fresh(); }
}
export function answerHasContent(value) {
  if (typeof value === "string") return !!value.trim();
  if (!value || typeof value !== "object") return false;
  return Object.values(value).some(answerHasContent);
}
export function historicalChoiceIsValid(paper, selected) {
  const policy = paper.choicePolicy;
  if (!policy || policy.type === "all") return true;
  if (!Array.isArray(selected) || new Set(selected).size !== selected.length) return false;
  const compulsory = policy.compulsory || [];
  const optional = policy.from || [];
  return compulsory.every((n) => selected.includes(n)) &&
    selected.filter((n) => optional.includes(n)).length === policy.choose &&
    selected.length === compulsory.length + policy.choose;
}
export function reviewHistoricalPaper1(paper, responses) {
  const decisions = paper.questions.map((question) => {
    const response = responses[String(question.number)]?.answer;
    const worked = /^[ABCD]$/.test(question.answer || "") &&
      ["independently-worked", "source-key-verified"].includes(question.verificationStatus) &&
      question.scoringEnabled !== false && !question.sourceKeyIssue;
    return { number: question.number, worked, selected: /^[ABCD]$/.test(response || "") ? response : "",
      answer: worked ? question.answer : null, explanation: question.explanation || "A checked worked answer is not available for this item yet.",
      matches: worked && response === question.answer };
  });
  return { decisions, matching: decisions.filter((d) => d.matches).length,
    checked: decisions.filter((d) => d.worked).length, canPublishFinalScore: false };
}
export function historicalSubmissionResponses(attempt, paper) {
  // A timed expiry must preserve every answer if the student has not completed
  // their optional selection. The submission metadata flags that invalid choice;
  // it must not silently discard unselected working or award a paper total.
  const included = paper.choicePolicy?.type === "all" || !paper.choicePolicy || !historicalChoiceIsValid(paper, attempt.selectedQuestions)
    ? paper.questions.map((q) => q.number) : attempt.selectedQuestions;
  return Object.fromEntries(included.map((number) => [String(number), attempt.responses[String(number)] || {}]));
}
