import { checkAnswer } from "../lib/answerCheck";

describe("answer equivalence for CSEC inequalities", () => {
  test("accepts rearranged equivalent inequalities", () => {
    expect(checkAnswer("y <= 40 - 4x", "4x + y <= 40", { answerType: "inequality" })).toBe("correct");
    expect(checkAnswer("-x <= -3", "x >= 3", { answerType: "inequality" })).toBe("correct");
  });

  test("does not confuse strict and inclusive inequalities", () => {
    expect(checkAnswer("y > 2x", "y >= 2x", { answerType: "inequality" })).toBe("incorrect");
  });

  test("enforces completed-square form where the question requires it", () => {
    expect(checkAnswer("2(x - 3)^2 + 5", "2(x - 3)^2 + 5", { answerType: "expression", requiredForm: "completed_square" })).toBe("correct");
    expect(checkAnswer("2x^2 - 12x + 23", "2(x - 3)^2 + 5", { answerType: "expression", requiredForm: "completed_square" })).toBe("incorrect");
  });
});
