import { checkAnswer } from "../lib/answerCheck";
import { gradeAdaptiveResponse } from "./adaptiveCxcGrader";

describe("SPARK V5.3.4C final-answer notation", () => {
  const fractionQuestion = {
    id: "VAR-00865",
    marks: 2,
    question: "Calculate 7/12 − 2/4.",
    answer: "1/12",
    worked_solution: "A common denominator is 12. Convert to 7/12 − 6/12, giving 1/12 = 1/12.",
  };

  test("accepts a leading equals sign in a final numeric answer", () => {
    expect(checkAnswer("= 1/12", "1/12")).toBe("correct");
  });

  test("accepts common final-answer labels as harmless presentation", () => {
    expect(checkAnswer("Answer = 2/24", "1/12")).toBe("correct");
    expect(checkAnswer("Final answer: 0.5", "1/2")).toBe("correct");
  });

  test("the reported Adaptive fractions case auto-grades at full marks", () => {
    const result = gradeAdaptiveResponse(fractionQuestion, {
      working: "7/12 - 2/4\n= 7/12 - 6/12\n= 1/12",
      answer: "= 1/12",
    });
    expect(result.status).toBe("correct");
    expect(result.marks).toBe(2);
    expect(result.of).toBe(2);
    expect(result.needsSelfAssessment).toBe(false);
  });

  test("a wrong final value stays wrong rather than becoming uncertain", () => {
    const result = gradeAdaptiveResponse(fractionQuestion, {
      working: "7/12 - 2/4\n= 7/12 - 6/12",
      answer: "= 1/6",
    });
    expect(result.status).toBe("incorrect");
    expect(result.marks).toBeLessThan(2);
    expect(result.needsSelfAssessment).toBe(false);
  });

  test("true unsupported free text still keeps the self-check fallback", () => {
    expect(checkAnswer("Because the diagram is symmetrical", "A valid geometric explanation")).toBe("uncertain");
  });
});
