import { PAPER2_QUESTION_BANK_V2 } from "./paper2QuestionBankV2";
import { buildCanonicalPaper2Response, gradeRichPaper2Part, isPaper2PartComplete } from "./paper2RichGrader";

describe("Paper 2 fillable tables V5.2.2", () => {
  const tableParts = PAPER2_QUESTION_BANK_V2.flatMap(question =>
    question.parts.filter(part => part.responseSchema?.type === "table").map(part => ({ question, part }))
  );

  test("upgrades every identified table-completion part", () => {
    expect(tableParts).toHaveLength(15);
    const blankCount = tableParts.reduce((sum, item) => sum + Number(item.part.responseSchema.blankCount || 0), 0);
    expect(blankCount).toBe(59);
  });

  test("Figure 4 is answered in its table rather than a single ordered-list box", () => {
    const question = PAPER2_QUESTION_BANK_V2.find(item => item.question_id === "p2-q7-v4");
    const part = question.parts.find(item => item.id === "a");
    expect(part.responseSchema.type).toBe("table");
    expect(part.responseSchema.blankCount).toBe(3);
    expect(part.responseSchema.rows[3].slice(1).map(cell => cell.answer)).toEqual(["4", "5", "9"]);
  });

  test("canonical table responses are complete and receive full marks", () => {
    tableParts.forEach(({ part }) => {
      const response = buildCanonicalPaper2Response(part);
      expect(isPaper2PartComplete(part, response)).toBe(true);
      const result = gradeRichPaper2Part(response, part);
      expect(result.correct).toBe(true);
      expect(result.marks).toBe(part.marks);
    });
  });

  test("partially correct tables receive integer partial credit where marks allow it", () => {
    const question = PAPER2_QUESTION_BANK_V2.find(item => item.question_id === "p2-q7-v4");
    const part = question.parts.find(item => item.id === "a");
    const response = buildCanonicalPaper2Response(part);
    response.cells.r3c3 = "999";
    const result = gradeRichPaper2Part(response, part);
    expect(result.status).toBe("partial");
    expect(result.marks).toBe(1);
  });
});
