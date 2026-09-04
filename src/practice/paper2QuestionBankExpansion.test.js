import { PAPER2_QUESTION_BANK_EXPANSION } from "./paper2QuestionBankExpansion";

describe("Paper 2 CSEC-style expansion", () => {
  test("adds 40 questions, four for every position", () => {
    expect(PAPER2_QUESTION_BANK_EXPANSION).toHaveLength(40);
    for (let qn = 1; qn <= 10; qn += 1) {
      const items = PAPER2_QUESTION_BANK_EXPANSION.filter(q => q.question_number === qn);
      expect(items).toHaveLength(4);
      expect(items.map(q => q.question_id)).toEqual([7, 8, 9, 10].map(v => `p2-q${qn}-v${v}`));
    }
  });

  test("keeps the SPARK Paper 2 mark blueprint", () => {
    const expectedMarks = [9, 9, 9, 9, 9, 9, 10, 12, 12, 12];
    for (let qn = 1; qn <= 10; qn += 1) {
      PAPER2_QUESTION_BANK_EXPANSION.filter(q => q.question_number === qn).forEach(q => {
        expect(q.marks).toBe(expectedMarks[qn - 1]);
        expect(q.parts.reduce((sum, part) => sum + part.marks, 0)).toBe(q.marks);
      });
    }
  });
});
