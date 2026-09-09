import { checkQuestionAnswer } from "../answerCheck";

describe("SPARK V5.6.1.1 contextual quadrant aliases", () => {
  const q = {
    id: "quadrant-alias-test",
    question: "State the quadrant containing the point (-3, -1).",
    answer: "Quadrant III",
    marks: 1,
  };

  test.each([
    "3",
    "III",
    "iii",
    "Quadrant 3",
    "quadrant III",
    "3rd quadrant",
    "third quadrant",
    "third",
  ])("accepts %s as the same contextual answer", value => {
    expect(checkQuestionAnswer(value, q)).toBe("correct");
  });

  test.each(["1", "2", "4", "Quadrant II", "IV"])("rejects the wrong quadrant %s", value => {
    expect(checkQuestionAnswer(value, q)).toBe("incorrect");
  });

  test("does not turn Roman numerals into global numeric aliases", () => {
    expect(checkQuestionAnswer("3", {
      question: "Write the Roman numeral for the answer.",
      answer: "III",
    })).not.toBe("correct");
  });
});
