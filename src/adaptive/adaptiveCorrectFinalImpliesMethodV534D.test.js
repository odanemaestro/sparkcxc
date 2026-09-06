import { gradeAdaptiveResponse } from "./adaptiveCxcGrader";

describe("SPARK Adaptive V5.3.4D correct-final credit", () => {
  const question = {
    id: "fraction-calc",
    marks: 2,
    question: "Calculate 3/6 + 6/3.",
    answer: "5/2",
    worked_solution: "A common denominator is 6. Convert to 3/6 + 12/6, giving 15/6 = 5/2.",
  };

  test.each(["5/2", "= 2 1/2", "2.5"])("accepts %s as a complete correct answer", answer => {
    const result = gradeAdaptiveResponse(question, { answer, working: "" });
    expect(result.status).toBe("correct");
    expect(result.marks).toBe(2);
    expect(result.of).toBe(2);
    expect(result.criteria.every(line => line.awarded)).toBe(true);
  });

  test("does not invent full credit for an incorrect final answer", () => {
    const result = gradeAdaptiveResponse(question, { answer: "3", working: "" });
    expect(result.marks).toBeLessThan(2);
    expect(result.status).not.toBe("correct");
  });

  test("still requires method evidence when the question explicitly says show all working", () => {
    const result = gradeAdaptiveResponse(
      { ...question, question: "Calculate 3/6 + 6/3. Show all working." },
      { answer: "= 2 1/2", working: "" }
    );
    expect(result.marks).toBeLessThan(2);
    expect(result.status).not.toBe("correct");
  });
});
