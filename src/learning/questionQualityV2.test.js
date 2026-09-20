import { classifyObservedQuestionDifficulty } from "./questionQualityV2";

describe("SPARK observed question quality", () => {
  test("does not flag low-sample observations", () => {
    expect(classifyObservedQuestionDifficulty({ attemptCount:9, successRate:0.1, authoredDifficulty:"easy" }).flag).toBeNull();
  });

  test("flags a strong authored-versus-observed difficulty mismatch for review", () => {
    const result = classifyObservedQuestionDifficulty({ attemptCount:60, successRate:0.18, authoredDifficulty:"easy" });
    expect(result.observed).toBe("hard");
    expect(result.confidence).toBe("high");
    expect(result.flag.type).toBe("difficulty_mismatch");
  });

  test("never contains automatic answer or marking mutation logic", () => {
    const source = require("fs").readFileSync(require("path").join(__dirname, "questionQualityV2.js"), "utf8");
    expect(source).not.toMatch(/correct_answer\s*=|answer_key\s*=|mark_scheme\s*=/i);
    expect(source).toMatch(/never change/i);
  });
});