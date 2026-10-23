import { getPoaHistoricalPaper, POA_HISTORICAL_PAPERS } from "../data/poaHistoricalPapers";
import { freshHistoricalAttempt, restoreHistoricalAttempt, historicalAttemptKey, historicalChoiceIsValid,
  historicalSubmissionResponses, reviewHistoricalPaper1 } from "./poaHistoricalAttempts";

beforeEach(() => { localStorage.clear(); if (!crypto.randomUUID) Object.defineProperty(crypto, "randomUUID", { value: () => String(Math.random()) }); });

test("all 50 unique source papers have an answer sheet with a valid source identity and choice policy", () => {
  expect(POA_HISTORICAL_PAPERS).toHaveLength(50);
  for (const paper of POA_HISTORICAL_PAPERS) {
    expect(paper.questions.length).toBe(paper.questionCount);
    expect(paper.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(new Set(paper.questions.map((q) => q.number)).size).toBe(paper.questionCount);
    expect(paper.pageCount).toBeGreaterThan(1);
    expect(paper.durationMinutes).toBeGreaterThan(0);
    for (const question of paper.questions) {
      for (const page of question.sourcePages || (question.page ? [question.page] : [])) {
        expect(page).toBeGreaterThanOrEqual(1); expect(page).toBeLessThanOrEqual(paper.pageCount);
      }
    }
  }
  expect(getPoaHistoricalPaper("poa-2-2020-mj")).toBeNull();
  expect(getPoaHistoricalPaper("poa-1-2017-jan").questionCount).toBe(57);
  expect(getPoaHistoricalPaper("poa-1-2017-jan").expectedQuestionCount).toBe(60);
});

test("optional question selection follows the sitting's real instructions and only chosen answers are submitted", () => {
  const paper = getPoaHistoricalPaper("poa-2-2017-jan");
  expect(historicalChoiceIsValid(paper, [1, 2, 3, 4, 7])).toBe(true);
  expect(historicalChoiceIsValid(paper, [1, 2, 3, 4])).toBe(false);
  expect(historicalChoiceIsValid(paper, [1, 2, 3, 4, 4])).toBe(false);
  expect(historicalChoiceIsValid(paper, [1, 2, 3, 4, 5, 7])).toBe(false);
  const responses = { "1": { working: "compulsory" }, "4": { working: "chosen" }, "5": { working: "unused draft" } };
  expect(historicalSubmissionResponses({ responses, selectedQuestions: [1, 2, 3, 4, 7] }, paper)).toEqual({
    "1": responses["1"], "2": {}, "3": {}, "4": responses["4"], "7": {},
  });
  expect(historicalSubmissionResponses({ responses, selectedQuestions: [1, 2, 3] }, paper)["5"]).toEqual(responses["5"]);
  expect(getPoaHistoricalPaper("poa-2-2017-mj").choicePolicy.type).toBe("all");
});

test("restores the exact question, source page, flags, timer and working without leaking another student's attempt", () => {
  const paper = getPoaHistoricalPaper("poa-1-2022-jan"), key = historicalAttemptKey("student-a", paper.id);
  const saved = { ...freshHistoricalAttempt(paper), phase: "exam", mode: "timed", deadline: Date.now() + 60000, index: 22, page: 5,
    flags: { "23": true }, responses: { "23": { answer: "A", working: "An acknowledgment of debt" } } };
  localStorage.setItem(key, JSON.stringify(saved));
  expect(restoreHistoricalAttempt(key, paper)).toEqual(saved);
  expect(restoreHistoricalAttempt(historicalAttemptKey("student-b", paper.id), paper).responses).toEqual({});
  localStorage.setItem(key, JSON.stringify({ ...saved, sourceSha256: "altered" }));
  expect(restoreHistoricalAttempt(key, paper).phase).toBe("instructions");
  localStorage.setItem(key, JSON.stringify({ ...saved, responses: { "23": { answer: { invalid: true } } } }));
  expect(restoreHistoricalAttempt(key, paper).phase).toBe("instructions");
});

test("partial and missing keys never become a full-paper grade or mark blanks correct", () => {
  const paper = getPoaHistoricalPaper("poa-1-2020-jan");
  const responses = Object.fromEntries(paper.questions.filter((q) => q.answer).map((q) => [q.number, { answer: q.answer }]));
  const result = reviewHistoricalPaper1(paper, responses);
  expect(result.checked).toBe(58); expect(result.matching).toBe(58);
  expect(result.canPublishFinalScore).toBe(false);
  expect(reviewHistoricalPaper1(paper, {}).matching).toBe(0);
  expect(result.decisions.filter((d) => !d.worked)).toHaveLength(2);
});
