import { getExamPerformanceStatus } from "./examPerformance";

describe("getExamPerformanceStatus", () => {
  test.each([
    [0, "needs-attention", "Needs attention"],
    [39, "needs-attention", "Needs attention"],
    [40, "developing", "Developing"],
    [59, "developing", "Developing"],
    [60, "satisfactory", "Satisfactory"],
    [79, "satisfactory", "Satisfactory"],
    [80, "strong", "Strong"],
    [100, "strong", "Strong"],
  ])("classifies %s%% correctly", (percent, key, label) => {
    expect(getExamPerformanceStatus(percent)).toEqual({ key, label });
  });

  test("treats invalid values as zero", () => {
    expect(getExamPerformanceStatus("not-a-number").key).toBe("needs-attention");
  });
});
