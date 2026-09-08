import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";
import { buildPaper2Exam, validatePaper2Exam } from "./paper2Engine";
import { profileMixReport } from "./cxcMarking/profiles";

describe("SPARK V5.5.1 reasoning-pilot integration", () => {
  test("the ten funded reasoning parts improve the bank without changing any question total", () => {
    const mix = profileMixReport(PAPER2_QUESTION_BANK);
    expect(PAPER2_QUESTION_BANK).toHaveLength(160);
    expect(mix.totals.reasoning).toBe(220);
    expect(mix.share.reasoning).toBeCloseTo(0.1375, 4);
    expect(PAPER2_QUESTION_BANK.every(question =>
      (question.parts || []).reduce((sum, part) => sum + Number(part.marks || 0), 0) === Number(question.marks)
    )).toBe(true);
  });

  test("R3 keeps method credit in the perimeter part while funding the two-mark reasoning demand", () => {
    const question = PAPER2_QUESTION_BANK.find(item => item.question_id === "p2-q6-v4");
    const byId = Object.fromEntries(question.parts.map(part => [part.id, part]));
    expect(question.parts.map(part => [part.id, part.marks])).toEqual([
      ["a", 2], ["b", 3], ["c", 2], ["d", 2],
    ]);
    expect(byId.c.criteria.some(criterion => criterion.kind === "M")).toBe(true);
    expect(byId.d.criteria.reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0)).toBe(2);
    expect(byId.d.criteria.every(criterion => criterion.profile === "reasoning")).toBe(true);
  });

  test("profile weighting brings built papers close to the 30 percent reasoning target without collapsing variety", () => {
    const shares = [];
    const used = new Set();
    for (let index = 0; index < 40; index += 1) {
      const exam = buildPaper2Exam({ seed: `v551-weight-${index}` });
      expect(validatePaper2Exam(exam).valid).toBe(true);
      shares.push(profileMixReport(exam.questions).share.reasoning);
      exam.questions.forEach(question => used.add(question.question_id));
    }
    const mean = shares.reduce((sum, value) => sum + value, 0) / shares.length;
    expect(mean).toBeGreaterThanOrEqual(0.27);
    expect(mean).toBeLessThanOrEqual(0.31);
    expect(Math.min(...shares)).toBeGreaterThanOrEqual(0.24);
    expect(used.size).toBeGreaterThanOrEqual(70);
  });

  test("weighting never outranks the no-repeat tier", () => {
    const seen = new Set();
    let repeats = 0;
    for (let index = 0; index < 12; index += 1) {
      const exam = buildPaper2Exam({
        seed: `v551-repeat-${index}`,
        previouslyUsedQuestionIds: [...seen],
      });
      for (const question of exam.questions) {
        if (seen.has(question.question_id)) repeats += 1;
        seen.add(question.question_id);
      }
    }
    expect(repeats).toBe(0);
    expect(seen.size).toBe(120);
  });
});
