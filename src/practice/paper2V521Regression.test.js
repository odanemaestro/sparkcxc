import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";
import { buildCanonicalPaper2Response } from "./paper2RichGrader";
import { gradePaper2Part } from "./paper2Engine";

describe("SPARK Paper 2 V5.3 regression guard", () => {
  test("keeps the combined 160-template bank structurally complete", () => {
    expect(PAPER2_QUESTION_BANK).toHaveLength(160);
    for (let position = 1; position <= 10; position += 1) {
      expect(PAPER2_QUESTION_BANK.filter(question => question.question_number === position)).toHaveLength(16);
    }
    for (const question of PAPER2_QUESTION_BANK) {
      expect(typeof question.stem).toBe("string");
      expect((question.parts || []).reduce((sum, part) => sum + Number(part.marks || 0), 0)).toBe(question.marks);
      for (const part of question.parts || []) expect(typeof part.prompt).toBe("string");
    }
  });

  test("legacy primitive canonical answers remain accepted", () => {
    for (const question of PAPER2_QUESTION_BANK) {
      for (const part of question.parts || []) {
        expect(gradePaper2Part(part.answer, part).correct).toBe(true);
      }
    }
  });

  test("all 56 structured workspaces earn full canonical credit", () => {
    const richParts = PAPER2_QUESTION_BANK
      .flatMap(question => question.parts || [])
      .filter(part => part.responseSchema);

    const countByType = richParts.reduce((counts, part) => {
      const type = part.responseSchema?.type || "unknown";
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {});

    expect(richParts).toHaveLength(56);
    expect(countByType.table).toBe(30);
    expect(countByType.graph).toBe(15);
    expect(countByType.construction_triangle).toBe(2);
    expect(countByType.construction).toBe(9);

    for (const part of richParts) {
      const response = buildCanonicalPaper2Response(part);
      const result = gradePaper2Part(response, part);
      expect(result.correct).toBe(true);
      expect(result.marks).toBe(part.marks);
    }
  });
});
