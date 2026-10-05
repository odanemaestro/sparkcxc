import {
  englishAPaper1Questions,
  englishAStimuli,
  englishAPaper1BlueprintSummary,
  englishAPastPaperSourceIndex,
} from "../data/englishAPaper1Bank";
import {
  buildEnglishAPaper1,
  gradeEnglishAPaper1,
  ENGLISH_A_PAPER1_DURATION_SECONDS,
} from "./englishAExamModel";

describe("SPARK English A Paper 01 V1", () => {
  test("matches the revised 60-item Paper 01 blueprint", () => {
    expect(englishAPaper1Questions).toHaveLength(60);
    expect(englishAPaper1BlueprintSummary()).toEqual([
      {module:1,title:"Informative Discourse",discrete:5,comprehension:15,total:20},
      {module:2,title:"Literary Discourse",discrete:5,comprehension:15,total:20},
      {module:3,title:"Persuasive Discourse",discrete:5,comprehension:15,total:20},
    ]);
    expect(ENGLISH_A_PAPER1_DURATION_SECONDS).toBe(90 * 60);
  });

  test("keeps every question id unique with four choices and one valid answer", () => {
    const ids = englishAPaper1Questions.map(question => question.id);
    expect(new Set(ids).size).toBe(ids.length);

    englishAPaper1Questions.forEach(question => {
      expect(Object.keys(question.options)).toEqual(["A","B","C","D"]);
      expect(["A","B","C","D"]).toContain(question.answer);
      expect(question.options[question.answer]).toBeTruthy();
      expect(question.explanation).toBeTruthy();
    });
  });

  test("uses exactly two comprehension stimuli per module", () => {
    [1,2,3].forEach(module => {
      const stimulusIds = new Set(
        englishAPaper1Questions
          .filter(question => question.module === module && question.kind === "comprehension")
          .map(question => question.stimulusId)
      );
      expect(stimulusIds.size).toBe(2);
      stimulusIds.forEach(id => expect(englishAStimuli[id]).toBeTruthy());
    });
  });

  test("builds a complete paper and grades by module", () => {
    const paper = buildEnglishAPaper1();
    expect(paper).toHaveLength(60);
    expect(paper[0].examPosition).toBe(1);
    expect(paper[59].examPosition).toBe(60);

    const answers = Object.fromEntries(paper.map(question => [question.id, question.answer]));
    const result = gradeEnglishAPaper1(paper,answers);
    expect(result.score).toBe(60);
    expect(result.percent).toBe(100);
    expect(result.modules.map(row => row.earned)).toEqual([20,20,20]);
  });

  test("keeps an audit index of every supplied source file", () => {
    expect(englishAPastPaperSourceIndex).toHaveLength(24);
    expect(new Set(englishAPastPaperSourceIndex).size).toBe(24);
  });
});
