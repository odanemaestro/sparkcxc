import { checkQuestionAnswer } from "../lib/answerCheck";

describe("Paper 2 V5.2 algebraic fraction grading", () => {
  test("does not apply numeric lowest-terms enforcement to an algebraic fraction", () => {
    const part = {
      prompt: "Express 3/(x + 2) - 2/(x - 1) as a single fraction in its simplest form.",
      answer: "(x - 7)/((x + 2)(x - 1))",
      answerType: "expression",
    };
    expect(checkQuestionAnswer("(x - 7)/((x + 2)(x - 1))", part)).toBe("correct");
  });

  test("still enforces lowest terms for an ordinary numerical fraction", () => {
    const part = { prompt: "Give your answer as a fraction in its simplest form.", answer: "3/4" };
    expect(checkQuestionAnswer("3/4", part)).toBe("correct");
    expect(checkQuestionAnswer("6/8", part)).toBe("incorrect");
  });
});
