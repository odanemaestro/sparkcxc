import { buildPaper2Exam, getPaper2Bank } from "./paper2Engine";

describe("Paper 2 V5.2 design-aware re-sits", () => {
  test("prefers a different question design when a used design has alternatives", () => {
    const bank = getPaper2Bank();
    const firstDesignQuestion = bank.find(question => question.question_number === 1 && question.design);
    const usedDesign = firstDesignQuestion.design;
    const usedIds = bank
      .filter(question => question.question_number === 1 && question.design === usedDesign)
      .map(question => question.question_id);

    for (let index = 0; index < 12; index += 1) {
      const exam = buildPaper2Exam({ seed: `v52-design-${index}`, previouslyUsedQuestionIds: usedIds });
      const selected = exam.questions[0];
      expect(selected.design === usedDesign).toBe(false);
    }
  });
});
