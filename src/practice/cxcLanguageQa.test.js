import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";

describe("Paper 2 CXC language and structure QA", () => {
  test("has ten rebuilt variants at each of the ten positions after the V5.2 quality rebuild", () => {
    expect(PAPER2_QUESTION_BANK).toHaveLength(100);
    for (let position = 1; position <= 10; position += 1) {
      expect(PAPER2_QUESTION_BANK.filter(question => question.question_number === position)).toHaveLength(10);
    }
  });

  test("has unique question ids", () => {
    const ids = PAPER2_QUESTION_BANK.map(question => question.question_id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("keeps platform answer-entry syntax out of visible exam prompts", () => {
    for (const question of PAPER2_QUESTION_BANK) {
      expect(question.stem).not.toMatch(/answer the following questions/i);
      for (const part of question.parts) {
        expect(part.prompt).not.toMatch(/enter the four (?:matrix )?entries row by row/i);
        expect(part.prompt).not.toMatch(/give your answer as an ordered pair/i);
      }
    }
  });

  test("classifies Paper 2 content as SPARK CXC-style", () => {
    for (const question of PAPER2_QUESTION_BANK) {
      expect(question.content_class).toBe("SPARK_CXC_STYLE");
    }
  });
});
