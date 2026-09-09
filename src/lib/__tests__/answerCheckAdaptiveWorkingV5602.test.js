import fs from "fs";
import path from "path";
import { checkAnswer, checkQuestionAnswer } from "../answerCheck";

describe("SPARK V5.6.0.2 Adaptive written-answer tightening", () => {
  test("accepts a clear calculation chain whose terminal final value is correct", () => {
    const response = "f(7) = 3(7) - 4 = 17, then g(17) = 17^2 + 2 = 289 + 2 = 291";
    expect(checkAnswer(response, "291")).toBe("correct");
  });

  test("does not accept the same calculation chain when its terminal value is wrong", () => {
    const response = "f(7) = 3(7) - 4 = 17, then g(17) = 17^2 + 2 = 289 + 2 = 290";
    expect(checkAnswer(response, "291")).toBe("incorrect");
  });

  test("does not collapse a multi-root answer into only its last root", () => {
    expect(checkAnswer("x = 2 or x = 4", "x = 2 or x = 3")).toBe("incorrect");
  });

  test("auto-grades the exact composite-functions response shown during live testing", () => {
    const file = path.join(process.cwd(), "public", "question-bank", "topics", "relations-functions-sequences-functions.json");
    const bank = JSON.parse(fs.readFileSync(file, "utf8"));
    const q = bank.find(item => item.id === "SPARK-CSECQ-FUNC-001");
    const response = "f(7) = 3(7) - 4 = 17, then g(17) = 17^2 + 2 = 289 + 2 = 291";
    expect(q).toBeTruthy();
    expect(checkQuestionAnswer(response, q)).toBe("correct");
  });
});
