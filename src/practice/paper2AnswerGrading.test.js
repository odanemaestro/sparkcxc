import { gradePaper2Part, getPaper2Bank } from "./paper2Engine";

describe("Paper 2 answer grading", () => {
  test("every canonical Paper 2 answer grades as correct", () => {
    getPaper2Bank().forEach(question => {
      question.parts.forEach(part => {
        expect(gradePaper2Part(part.answer, part).correct).toBe(true);
      });
    });
  });

  test("fraction and decimal equivalents are accepted when no format is required", () => {
    const part = { answer: "1/2", marks: 2, prompt: "Calculate the probability." };
    expect(gradePaper2Part("0.5", part).correct).toBe(true);
    expect(gradePaper2Part("2/4", part).correct).toBe(true);
  });

  test("explicit simplest-fraction instruction is enforced", () => {
    const part = {
      answer: "1/4",
      marks: 2,
      prompt: "Give your answer as a fraction in its simplest form.",
      requiredForm: "simplified_fraction",
    };
    expect(gradePaper2Part("1/4", part).correct).toBe(true);
    expect(gradePaper2Part("2/8", part).correct).toBe(false);
    expect(gradePaper2Part("0.25", part).correct).toBe(false);
  });

  test("factorisation checks mathematics and requested form", () => {
    const part = {
      answer: "8(y+3)",
      marks: 2,
      prompt: "Factorise completely: 8y + 24.",
      answerType: "expression",
      requiredForm: "factorised",
    };
    expect(gradePaper2Part("8(y+3)", part).correct).toBe(true);
    expect(gradePaper2Part("4(2y+6)", part).correct).toBe(true);
    expect(gradePaper2Part("8y+24", part).correct).toBe(false);
  });

  test("ordered matrix entries accept equivalent bracket formatting", () => {
    const part = {
      answer: "1,2,3,4",
      accepted: ["[[1,2],[3,4]]"],
      marks: 3,
      answerType: "ordered",
      prompt: "Enter the four entries row by row.",
    };
    expect(gradePaper2Part("[[1,2],[3,4]]", part).correct).toBe(true);
    expect(gradePaper2Part("1 2 3 4", part).correct).toBe(true);
    expect(gradePaper2Part("1,2,4,3", part).correct).toBe(false);
  });

  test("configured absolute tolerance is preserved", () => {
    const part = { answer: "2.35", marks: 2, tolerance: 0.011, prompt: "Calculate the value." };
    expect(gradePaper2Part("2.36", part).correct).toBe(true);
    expect(gradePaper2Part("2.37", part).correct).toBe(false);
  });
});
