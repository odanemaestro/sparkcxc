// ============================================================================
// Done by: Odane Robinson
// Tests for the answer-equivalence checker that replaced exact-string-match
// grading. Every case here is a formatting variation a real student could
// plausibly type for a mathematically correct answer, or a genuinely wrong
// answer that must still be marked wrong.
// ============================================================================
import { checkAnswer } from "../answerCheck";

describe("checkAnswer - exact / fast path", () => {
  test("identical strings are correct", () => {
    expect(checkAnswer("2/15", "2/15")).toBe("correct");
  });
  test("case and whitespace differences don't matter", () => {
    expect(checkAnswer("  X = 5  ", "x = 5")).toBe("correct");
  });
});

describe("checkAnswer - fractions vs decimals", () => {
  test("equivalent fraction and decimal", () => {
    expect(checkAnswer("0.75", "3/4")).toBe("correct");
    expect(checkAnswer("3/4", "0.75")).toBe("correct");
  });
  test("13/10 equals 1.3", () => {
    expect(checkAnswer("1.3", "13/10")).toBe("correct");
  });
  test("unreduced fraction still matches its reduced form", () => {
    expect(checkAnswer("4/8", "1/2")).toBe("correct");
  });
  test("genuinely different fraction is incorrect", () => {
    expect(checkAnswer("2/3", "3/4")).toBe("incorrect");
  });
  test("negative fractions", () => {
    expect(checkAnswer("-0.5", "-1/2")).toBe("correct");
    expect(checkAnswer("1/2", "-1/2")).toBe("incorrect");
  });
});

describe("checkAnswer - variable prefixes", () => {
  test("'5' matches 'x = 5'", () => {
    expect(checkAnswer("5", "x = 5")).toBe("correct");
  });
  test("'x=5' (no spaces) matches 'x = 5'", () => {
    expect(checkAnswer("x=5", "x = 5")).toBe("correct");
  });
  test("wrong value with correct variable prefix is incorrect", () => {
    expect(checkAnswer("x = 6", "x = 5")).toBe("incorrect");
  });
});

describe("checkAnswer - currency and percentages", () => {
  test("formatted currency matches a plain number", () => {
    expect(checkAnswer("1200", "$1,200.00")).toBe("correct");
    expect(checkAnswer("$1,200.00", "1200")).toBe("correct");
  });
  test("percent symbol is stripped consistently on both sides", () => {
    expect(checkAnswer("40%", "40%")).toBe("correct");
    expect(checkAnswer("40", "40%")).toBe("correct");
  });
  test("wrong currency amount is incorrect", () => {
    expect(checkAnswer("$1,300.00", "$1,200.00")).toBe("incorrect");
  });
});

describe("checkAnswer - degrees", () => {
  test("degree symbol optional on either side", () => {
    expect(checkAnswer("45", "45°")).toBe("correct");
    expect(checkAnswer("45°", "45°")).toBe("correct");
  });
});

describe("checkAnswer - sets", () => {
  test("same elements, different order", () => {
    expect(checkAnswer("{3, 1, 2}", "{1, 2, 3}")).toBe("correct");
  });
  test("extra spacing doesn't matter", () => {
    expect(checkAnswer("{1,2,3}", "{ 1, 2, 3 }")).toBe("correct");
  });
  test("missing element is incorrect", () => {
    expect(checkAnswer("{1, 2}", "{1, 2, 3}")).toBe("incorrect");
  });
});

describe("checkAnswer - coordinate/vector tuples", () => {
  test("with or without parentheses/spacing", () => {
    expect(checkAnswer("3,4", "(3, 4)")).toBe("correct");
    expect(checkAnswer("(3,4)", "(3, 4)")).toBe("correct");
  });
  test("wrong component is incorrect", () => {
    expect(checkAnswer("(3, 5)", "(3, 4)")).toBe("incorrect");
  });
  test("negative components", () => {
    expect(checkAnswer("(-3, 4)", "(-3, 4)")).toBe("correct");
  });
});

describe("checkAnswer - multi-root quadratic answers", () => {
  test("roots given in either order", () => {
    expect(checkAnswer("x = 3 or x = 2", "x = 2 or x = 3")).toBe("correct");
  });
  test("comma-separated roots", () => {
    expect(checkAnswer("2, 3", "x = 2 or x = 3")).toBe("correct");
  });
  test("one wrong root is incorrect", () => {
    expect(checkAnswer("x = 2 or x = 4", "x = 2 or x = 3")).toBe("incorrect");
  });
});

describe("checkAnswer - uncertain fallback", () => {
  test("free-text / prose answers are uncertain, not auto-failed", () => {
    expect(checkAnswer(
      "The locus is a circle of radius 5 centred at the fixed point.",
      "A circle of radius 5 units, centred at the fixed point"
    )).toBe("uncertain");
  });
  test("empty submission is incorrect, not uncertain", () => {
    expect(checkAnswer("", "5")).toBe("incorrect");
    expect(checkAnswer("   ", "5")).toBe("incorrect");
  });
});
