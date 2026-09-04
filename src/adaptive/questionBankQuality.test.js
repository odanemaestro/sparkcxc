import { inferAdaptiveVariantFamily, isScoredAdaptiveMathQuestion, prepareAdaptiveQuestions } from "./questionBank";

describe("Adaptive Practice content quality", () => {
  test("filters meta exam-technique prompts from scored maths practice", () => {
    expect(isScoredAdaptiveMathQuestion({ question: "Should you show all working?" })).toBe(false);
    expect(isScoredAdaptiveMathQuestion({ question: "Solve 3x + 4 = 19." })).toBe(true);
  });

  test("removes exact repeated prompts at load time", () => {
    const items = [
      { id: "a", question: "A vehicle travels 240 km in 4 hours. Find its average speed.", topic: "Rates" },
      { id: "b", question: "A vehicle travels 240 km in 4 hours. Find its average speed.", topic: "Rates" },
    ];
    expect(prepareAdaptiveQuestions(items, { area: "Ratio", topic: "Rates" })).toHaveLength(1);
  });

  test("groups number-changed legacy templates into the same variant family", () => {
    const a = inferAdaptiveVariantFamily({ question: "A vehicle travels 240 km in 4 hours. Calculate its average speed.", topic: "Rates" }, "Ratio", "Rates");
    const b = inferAdaptiveVariantFamily({ question: "A vehicle travels 150 km in 2 hours. Calculate its average speed.", topic: "Rates" }, "Ratio", "Rates");
    expect(a).toBe(b);
  });

  test("preserves an explicit variant family", () => {
    expect(inferAdaptiveVariantFamily({ question: "Test", variant_family: "EXPLICIT" })).toBe("EXPLICIT");
  });
});
