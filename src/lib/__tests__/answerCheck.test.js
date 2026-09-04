// ============================================================================
// SPARK mathematics answer-equivalence regression tests
// ============================================================================
import {
  answerCheckOptionsForQuestion,
  checkAnswer,
  checkQuestionAnswer,
} from "../answerCheck";

describe("numeric equivalence", () => {
  test("fraction, decimal and unreduced fraction are equivalent by default", () => {
    expect(checkAnswer("0.5", "1/2")).toBe("correct");
    expect(checkAnswer("1/2", "0.5")).toBe("correct");
    expect(checkAnswer("2/4", "1/2")).toBe("correct");
    expect(checkAnswer("1 1/2", "1.5")).toBe("correct");
  });

  test("wrong numeric values remain wrong", () => {
    expect(checkAnswer("0.6", "1/2")).toBe("incorrect");
    expect(checkAnswer("-0.5", "1/2")).toBe("incorrect");
  });

  test("common student formatting is tolerated", () => {
    expect(checkAnswer("1200", "$1,200.00")).toBe("correct");
    expect(checkAnswer("45", "45°")).toBe("correct");
    expect(checkAnswer("40", "40%")).toBe("correct");
    expect(checkAnswer("0.4", "40%")).toBe("correct");
    expect(checkAnswer("2.5e3", "2500")).toBe("correct");
  });
});

describe("sets, coordinates, vectors and multiple roots", () => {
  test("sets are order independent", () => {
    expect(checkAnswer("{3, 1, 2}", "{1, 2, 3}")).toBe("correct");
    expect(checkAnswer("{1, 2}", "{1, 2, 3}")).toBe("incorrect");
  });

  test("ordered values accept common bracket styles but preserve order", () => {
    expect(checkAnswer("(3, 4)", "3,4", { answerType: "coordinate" })).toBe("correct");
    expect(checkAnswer("[3,4]", "(3, 4)", { answerType: "vector" })).toBe("correct");
    expect(checkAnswer("(4, 3)", "(3, 4)", { answerType: "coordinate" })).toBe("incorrect");
  });

  test("quadratic roots can be entered in either order", () => {
    expect(checkAnswer("x = 3 or x = 2", "x = 2 or x = 3")).toBe("correct");
    expect(checkAnswer("2,3", "x = 2 or x = 3")).toBe("correct");
    expect(checkAnswer("2,4", "x = 2 or x = 3")).toBe("incorrect");
  });
});

describe("algebraic equivalence", () => {
  test("expanded and factorised expressions can be mathematically equivalent", () => {
    expect(checkAnswer("2(x+3)", "2x+6")).toBe("correct");
    expect(checkAnswer("(x-3)(x+3)", "x^2-9")).toBe("correct");
    expect(checkAnswer("3n+2", "2+3n")).toBe("correct");
    expect(checkAnswer("x^-2", "1/x^2")).toBe("correct");
  });

  test("unicode notation is understood", () => {
    expect(checkAnswer("x²-9", "(x-3)(x+3)")).toBe("correct");
    expect(checkAnswer("2×(x+3)", "2x+6")).toBe("correct");
    expect(checkAnswer("√(x²)", "sqrt(x^2)")).toBe("correct");
  });

  test("different expressions stay incorrect", () => {
    expect(checkAnswer("2x+5", "2x+6")).toBe("incorrect");
    expect(checkAnswer("-x^2", "(-x)^2")).toBe("incorrect");
  });

  test("equivalent equations may differ by rearrangement or a non-zero scale factor", () => {
    expect(checkAnswer("y=2x+3", "2y=4x+6")).toBe("correct");
    expect(checkAnswer("2x+3y=7", "4x+6y=14")).toBe("correct");
    expect(checkAnswer("y=2x+4", "y=2x+3")).toBe("incorrect");
  });
});

describe("question instructions regulate required form", () => {
  test("factorise completely requires a factorised response", () => {
    const question = {
      answer: "8(y+3)",
      answerType: "expression",
      prompt: "Factorise completely: 8y + 24.",
    };
    expect(checkQuestionAnswer("8(y+3)", question)).toBe("correct");
    expect(checkQuestionAnswer("4(2y+6)", question)).toBe("correct");
    expect(checkQuestionAnswer("8y+24", question)).toBe("incorrect");
  });

  test("fraction in simplest form respects the requested form", () => {
    const question = {
      answer: "1/2",
      prompt: "Give your answer as a fraction in its simplest form.",
    };
    expect(checkQuestionAnswer("1/2", question)).toBe("correct");
    expect(checkQuestionAnswer("2/4", question)).toBe("incorrect");
    expect(checkQuestionAnswer("0.5", question)).toBe("incorrect");
  });

  test("y = mx + c must actually be presented in that form", () => {
    const question = {
      answer: "y=2x+3",
      answerType: "expression",
      prompt: "Give your answer in the form y = mx + c.",
    };
    expect(checkQuestionAnswer("y=3+2x", question)).toBe("correct");
    expect(checkQuestionAnswer("2y=4x+6", question)).toBe("incorrect");
  });

  test("rounding instructions infer a useful tolerance", () => {
    const options = answerCheckOptionsForQuestion({
      answer: "2.35",
      prompt: "Give your answer correct to 2 decimal places.",
    });
    expect(options.decimalPlaces).toBe(2);
    expect(checkAnswer("2.354", "2.35", options)).toBe("correct");
    expect(checkAnswer("2.36", "2.35", options)).toBe("incorrect");
  });
});

describe("accepted answer aliases and honest free-text fallback", () => {
  test("question-level accepted answers are used", () => {
    expect(checkQuestionAnswer("north east", {
      answer: "northeast",
      accepted: ["north east", "NE"],
    })).toBe("correct");
  });

  test("prose that cannot be verified stays uncertain rather than being guessed", () => {
    expect(checkAnswer(
      "The locus is a circle of radius 5 centred at the fixed point.",
      "A circle of radius 5 units centred at the fixed point."
    )).toBe("uncertain");
  });

  test("empty submissions are incorrect", () => {
    expect(checkAnswer("", "5")).toBe("incorrect");
  });
});
