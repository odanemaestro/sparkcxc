import { englishAPaper2Sets, buildEnglishAPaper2 } from "../data/englishAPaper2Bank";
import { gradeEnglishAPaper2, gradeEnglishAPaper2Response } from "./englishAPaper2Grader";

describe("SPARK English A Paper 02 comprehensive grader", () => {
  test("grades a complete paper to a 120-mark scale with module breakdowns", () => {
    const paper=buildEnglishAPaper2("EA-P2-A");
    const creative=paper.tasks.find(task=>task.choiceGroup==="M2-creative");
    const answers={};
    paper.tasks.filter(task=>!task.choiceGroup||task.id===creative.id).forEach(task=>{
      answers[task.id]=(
        "This response addresses the task clearly. Because the issue affects the community, " +
        "the writer explains relevant information and gives an example. However, another view " +
        "is considered before a sensible conclusion is reached. The response is organised into " +
        "clear sentences and paragraphs. Finally, the main idea is restated with a practical recommendation. "
      ).repeat(8);
    });
    const result=gradeEnglishAPaper2(paper,answers,creative.id);
    expect(result.maxScore).toBe(120);
    expect(result.modules).toHaveLength(3);
    expect(result.modules.map(row=>row.max)).toEqual([40,40,40]);
    expect(result.score).toBeGreaterThan(0);
    expect(result.score).toBeLessThanOrEqual(120);
  });

  test("returns transparent scoring dimensions and feedback", () => {
    const task=englishAPaper2Sets[0].tasks[0];
    const response="Community gardens provide food, support learning, connect generations and strengthen neighbourhoods. Successful gardens need water, suitable soil, maintenance, clear responsibilities and plans for challenges such as theft or changing volunteer interest.";
    const result=gradeEnglishAPaper2Response(task,response);
    expect(result.maxMarks).toBe(10);
    expect(result.dimensions.length).toBeGreaterThanOrEqual(4);
    expect(result.feedback.length).toBeGreaterThan(0);
    expect(result.confidence).toBeTruthy();
  });

  test("does not award marks to a blank response", () => {
    const task=englishAPaper2Sets[0].tasks[0];
    expect(gradeEnglishAPaper2Response(task,"").score).toBe(0);
  });
});
