import { getPoaHistoricalPaper } from "../data/poaHistoricalPapers";
import { reviewHistoricalAccountingFigures } from "./poaHistoricalFeedback";

test("compares actual answer-table cells without mining expected numbers from working", () => {
  const question = getPoaHistoricalPaper("poa-2-2026-jan").questions[0];
  const point = question.numericCheckpoints.find((c) => c.id === "1d-markup");
  const correct = reviewHistoricalAccountingFigures(question, { cells: { [point.responseCell]: "36.36%" } }).find((c) => c.id === point.id);
  expect(correct.matches).toBe(true); expect(correct.canPublishFinalScore).toBe(false);
  expect(reviewHistoricalAccountingFigures(question, { working: "36.363636" }).find((c) => c.id === point.id).matches).toBe(false);
  expect(reviewHistoricalAccountingFigures(question, { cells: { [point.responseCell]: "I think 36.36 or 42" } }).find((c) => c.id === point.id).matches).toBe(false);
  expect(reviewHistoricalAccountingFigures(question, { cells: { [point.responseCell]: "36.35" } }).find((c) => c.id === point.id).matches).toBe(false);
});

test("credit columns keep their positive amount convention and do not reverse overdraft signs", () => {
  const question = getPoaHistoricalPaper("poa-2-2025-mj").questions[4];
  const point = question.numericCheckpoints.find((c) => c.id === "5c-closing");
  expect(point.expected).toBe(13400);
  expect(reviewHistoricalAccountingFigures(question, { cells: { [point.responseCell]: "$13,400" } }).find((c) => c.id === point.id).matches).toBe(true);
  expect(reviewHistoricalAccountingFigures(question, { cells: { [point.responseCell]: "(13,400)" } }).find((c) => c.id === point.id).matches).toBe(false);
});
