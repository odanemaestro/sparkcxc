import { ENGLISH_A_LESSON_EXAMPLES, englishALessonExamples } from "./englishA/data/englishALessonExamples";

describe("SPARK English A lesson examples", () => {
  test("provides worked examples and an interactive check for every English A lesson", () => {
    const ids=Object.keys(ENGLISH_A_LESSON_EXAMPLES);
    expect(ids).toHaveLength(29);
    ids.forEach(id=>{
      const row=englishALessonExamples(id);
      expect(row.examples.length).toBeGreaterThanOrEqual(2);
      expect(row.check.prompt).toBeTruthy();
      expect(row.check.options).toHaveLength(4);
      expect(row.check.answer).toBeGreaterThanOrEqual(0);
      expect(row.check.answer).toBeLessThan(4);
      expect(row.check.feedback).toBeTruthy();
    });
  });
});
