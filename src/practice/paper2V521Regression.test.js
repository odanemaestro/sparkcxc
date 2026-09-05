import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";
import { buildCanonicalPaper2Response } from "./paper2RichGrader";
import { gradePaper2Part } from "./paper2Engine";

describe("SPARK Paper 2 V5.2.1 regression guard", () => {
  test("every question stem and part prompt obeys the visible-text contract", () => {
    expect(PAPER2_QUESTION_BANK).toHaveLength(100);
    for (const question of PAPER2_QUESTION_BANK) {
      expect(typeof question.stem).toBe("string");
      for (const part of question.parts || []) {
        expect(typeof part.prompt).toBe("string");
      }
    }
  });

  test("every canonical primitive part.answer remains accepted", () => {
    for (const question of PAPER2_QUESTION_BANK) {
      for (const part of question.parts || []) {
        expect(gradePaper2Part(part.answer, part).correct).toBe(true);
      }
    }
  });

  test("rich workspaces still earn full credit through their structured canonical response", () => {
    const richParts = PAPER2_QUESTION_BANK.flatMap(question => question.parts || []).filter(part => part.responseSchema);
    expect(richParts).toHaveLength(8);
    for (const part of richParts) {
      const response = buildCanonicalPaper2Response(part);
      const result = gradePaper2Part(response, part);
      expect(result.correct).toBe(true);
      expect(result.marks).toBe(part.marks);
    }
  });
});
