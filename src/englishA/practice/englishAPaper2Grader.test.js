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
    const result=gradeEnglishAPaper2Response(task,response,"The writer's purpose is to explain the benefits and requirements of community gardens.");
    expect(result.maxMarks).toBe(10);
    expect(result.dimensions.map(row=>row.max)).toEqual([3,3,4]);
    expect(result.feedback.length).toBeGreaterThan(0);
    expect(result.confidence).toBeTruthy();
  });

  test("uses the 16-7-7 CXC profile split for extended responses", () => {
    const literary=englishAPaper2Sets[0].tasks.find(task=>task.kind==="literary");
    const persuasive=englishAPaper2Sets[0].tasks.find(task=>task.kind==="persuasive");
    const story=("That morning I reached the hall early. Suddenly the lights failed and everyone became silent. " +
      "I heard a chair scrape across the floor. \"Stay here,\" Maya whispered. We moved carefully toward the door. " +
      "Later, we discovered that the caretaker had tripped the main switch while repairing a socket. " +
      "In the end we laughed, but I understood how quickly fear could change a familiar place.\n\n").repeat(4);
    const argument=("I believe the proposal should be supported because it would benefit students and the wider community. " +
      "For example, a well-planned programme can improve access and safety. However, some people may argue that the cost is too high. " +
      "That concern can be addressed through a trial and careful budgeting. Therefore, the proposal deserves support.\n\n").repeat(5);
    expect(gradeEnglishAPaper2Response(literary,story).dimensions.map(row=>row.max)).toEqual([16,7,7]);
    expect(gradeEnglishAPaper2Response(persuasive,argument).dimensions.map(row=>row.max)).toEqual([16,7,7]);
  });

  test("does not award marks to a blank response", () => {
    const task=englishAPaper2Sets[0].tasks[0];
    expect(gradeEnglishAPaper2Response(task,"","").score).toBe(0);
  });
});
