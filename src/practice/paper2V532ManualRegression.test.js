import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";
import { gradePaper2Part } from "./paper2Engine";

const getPart = (questionId, partId) => {
  const question = PAPER2_QUESTION_BANK.find(item => item.question_id === questionId);
  if (!question) throw new Error(`Missing test question ${questionId}`);
  const part = question.parts.find(item => item.id === partId);
  if (!part) throw new Error(`Missing test part ${questionId}:${partId}`);
  return part;
};

describe("SPARK Paper 2 V5.3.2 browser-regression cases", () => {
  test("accepts equivalent expanded algebra when the required method is shown", () => {
    const part = getPart("p2-q2-v8", "a");
    const result = gradePaper2Part({
      working: [
        "(2x - 3)(x + 4) = 2x^2 + 5x - 12",
        "-3(x^2 - 1) = -3x^2 + 3",
        "2x^2 + 5x - 12 - 3x^2 + 3",
      ].join("\n"),
      answer: "5x - x^2 - 9",
    }, part);

    expect(result.marks).toBe(3);
    expect(result.criteria.map(item => [item.code, item.earned])).toEqual([
      ["M1", true], ["M2", true], ["A1", true],
    ]);
  });

  test("does not award dependent algebra accuracy marks for a lucky final answer with no working", () => {
    const part = getPart("p2-q2-v8", "a");
    const result = gradePaper2Part({ answer: "5x - x^2 - 9", working: "" }, part);
    expect(result.marks).toBe(0);
    expect(result.criteria.find(item => item.code === "A1").dependencyBlocked).toBe(true);
  });

  test("accepts an equivalent reversed strict inequality but rejects an inclusive one", () => {
    const part = getPart("p2-q2-v8", "c1");
    const working = "4x - 12 < x + 9\n3x < 21";
    expect(gradePaper2Part({ working, answer: "7 > x" }, part).marks).toBe(2);
    expect(gradePaper2Part({ working, answer: "x <= 7" }, part).marks).toBe(1);
  });

  test("grades a value plus a valid alternate-segment reason as full credit", () => {
    const part = getPart("p2-q9-v6", "a");
    const result = gradePaper2Part({
      answer: "47°, since the angle between a tangent and a chord is equal to the angle in the opposite segment.",
      working: "",
    }, part);
    expect(result.marks).toBe(3);
    expect(result.criteria.every(item => item.earned)).toBe(true);
  });

  test("a theorem value without the requested reason earns only the value credit", () => {
    const part = getPart("p2-q9-v6", "a");
    const result = gradePaper2Part({ answer: "47", working: "" }, part);
    expect(result.marks).toBe(1);
    expect(result.criteria.find(item => item.code === "B2").earned).toBe(false);
  });

  test("exposes the carried target in ECF review data", () => {
    const question = PAPER2_QUESTION_BANK.find(item => item.question_id === "p2-q1-v4");
    const b1 = question.parts.find(item => item.id === "b1");
    const b2 = question.parts.find(item => item.id === "b2");
    const first = gradePaper2Part({ working: "20/100 x 4800 = 950", answer: "950" }, b1);
    const result = gradePaper2Part({
      working: "12 x 355 = 4260\n950 + 4260 = 5210",
      answer: "5210",
    }, b2, { b1: { value: first.value, correct: first.canonicalCorrect } });

    expect(result.marks).toBe(2);
    const ecf = result.criteria.find(item => item.ecf);
    expect(ecf).toBeTruthy();
    expect(Number(ecf.ecfTarget)).toBe(5210);
  });
});
