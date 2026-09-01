import {
  PAPER2_QUESTION_COUNT,
  PAPER2_TEMPLATE_COUNT,
  PAPER2_TOTAL_MARKS,
  buildPaper2Exam,
  calculatePaper2Mark,
  gradePaper2Part,
  validatePaper2Exam,
} from "./paper2Engine";

test("Paper 2 bank contains 60 original structured question templates", () => {
  expect(PAPER2_TEMPLATE_COUNT).toBe(60);
});

test("Paper 2 generator always creates ten unique questions worth 100 marks", () => {
  for (let i = 0; i < 250; i += 1) {
    const exam = buildPaper2Exam({ seed: `test-${i}` });
    const validation = validatePaper2Exam(exam);
    expect(validation.valid).toBe(true);
    expect(exam.questions).toHaveLength(PAPER2_QUESTION_COUNT);
    expect(new Set(exam.questions.map(q => q.question_id)).size).toBe(PAPER2_QUESTION_COUNT);
    expect(exam.questions.reduce((sum, q) => sum + q.marks, 0)).toBe(PAPER2_TOTAL_MARKS);
  }
});

test("Paper 2 grading awards marks per auto-gradable part", () => {
  const exam = buildPaper2Exam({ seed: "grading-test" });
  const answers = {};
  exam.questions.forEach(question => {
    answers[question.question_id] = {};
    question.parts.forEach(part => { answers[question.question_id][part.id] = part.answer; });
  });
  const result = calculatePaper2Mark(answers, exam.questions);
  expect(result.score).toBe(100);
  expect(result.percent).toBe(100);
  expect(result.correctParts).toBe(result.totalParts);
});

test("Numeric grading accepts configured rounding tolerance", () => {
  expect(gradePaper2Part("12.31 cm", { answer: "12.3", marks: 2, tolerance: 0.051 }).correct).toBe(true);
});

test("Every canonical Paper 2 bank answer grades as correct", () => {
  const seen = new Set();
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const exam = buildPaper2Exam({ seed: `coverage-${attempt}`, previouslyUsedQuestionIds: [...seen] });
    exam.questions.forEach(question => {
      expect(seen.has(question.question_id)).toBe(false);
      question.parts.forEach(part => {
        expect(gradePaper2Part(part.answer, part).correct).toBe(true);
      });
      seen.add(question.question_id);
    });
  }
  expect(seen.size).toBe(60);
});
