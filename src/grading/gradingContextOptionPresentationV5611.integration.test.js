import fs from "fs";
import path from "path";
import { gradeCanonicalResponse } from "./answerIntelligence";

describe("SPARK V5.6.1.1 grading/presentation integration", () => {
  test("the unified grader accepts contextual quadrant shorthand", () => {
    const result = gradeCanonicalResponse({
      id: "quadrant-integration",
      question: "State the quadrant containing the point (-2, -2).",
      answer: "Quadrant III",
      marks: 1,
    }, { answer: "3", working: "" });

    expect(result.status).toBe("correct");
    expect(result.correct).toBe(true);
    expect(result.marks).toBe(result.of);
  });

  test("AdaptivePractice uses the presentation-only option sanitizer", () => {
    const source = fs.readFileSync(path.join(process.cwd(), "src", "adaptive", "AdaptivePractice.jsx"), "utf8");
    expect(source).toContain('import { adaptiveOptionDisplayText } from "./adaptiveOptionPresentation";');
    expect(source).toMatch(/adaptiveOptionDisplayText\s*\(/);
  });
});
