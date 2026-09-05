import {
  gradeCxcPaper2Part,
  hasPaper2CxcPartResponse,
  hasPaper2FinalAnswer,
  normalizePaper2TypedResponse,
  paper2PartUsesWorking,
  paper2ResponseSummary,
  paper2WorkingSummary,
} from "./paper2CxcGrader";
import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";

describe("Paper 2 typed working response V5.3", () => {
  test("normalizes legacy primitive responses without losing their answer", () => {
    expect(normalizePaper2TypedResponse("1/2")).toEqual({ answer: "1/2", working: "" });
    expect(normalizePaper2TypedResponse({ answer: "0.5", working: "1 / 2" })).toEqual({ answer: "0.5", working: "1 / 2" });
  });

  test("working-only is a response but not a completed typed part", () => {
    const part = PAPER2_QUESTION_BANK.find(q => q.question_id === "p2-q9-v3").parts[0];
    const response = { answer: "", working: "cosine rule" };
    expect(hasPaper2CxcPartResponse(response, part)).toBe(true);
    expect(hasPaper2FinalAnswer(response, part)).toBe(false);
  });

  test("only parts with M criteria request a Working box", () => {
    const question = PAPER2_QUESTION_BANK.find(q => q.question_id === "p2-q9-v3");
    expect(paper2PartUsesWorking(question.parts[0])).toBe(true);
    const independent = PAPER2_QUESTION_BANK.flatMap(q => q.parts).find(part => !part.responseSchema && !part.criteria.some(c => c.kind === "M"));
    expect(paper2PartUsesWorking(independent)).toBe(false);
  });

  test("review summaries keep final answer and working separate", () => {
    const part = PAPER2_QUESTION_BANK.find(q => q.question_id === "p2-q9-v3").parts[0];
    const response = { answer: "13.5", working: "cosine rule ..." };
    expect(paper2ResponseSummary(response, part)).toBe("13.5");
    expect(paper2WorkingSummary(response, part)).toBe("cosine rule ...");
  });

  test("typed model response grades through M/A/B rather than the legacy primitive shortcut", () => {
    const part = PAPER2_QUESTION_BANK.find(q => q.question_id === "p2-q9-v3").parts[0];
    const result = gradeCxcPaper2Part({ answer: part.answer, working: part.solution }, part);
    expect(result.correct).toBe(true);
    expect(result.criteria.map(item => item.code)).toEqual(["M1", "M2", "A1"]);
  });
});
