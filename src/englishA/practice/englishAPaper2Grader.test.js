import { englishAPaper2Sets, buildEnglishAPaper2 } from "../data/englishAPaper2Bank";
import { countEnglishWords, gradeEnglishAPaper2, gradeEnglishAPaper2Response } from "./englishAPaper2Grader";

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


  test("uses one word-count rule for hyphenated summary words", () => {
    const response="Phones offer useful classroom tools but also distract students and enable cheating, so neither a total ban nor unlimited use is sensible. Schools should keep phones stored unless a teacher approves them for a named task. Pupils without suitable devices must receive a school-provided alternative so no one is disadvantaged.";
    expect(countEnglishWords(response)).toBe(50);
    const task=buildEnglishAPaper2("EA-P2-B").tasks.find(item=>item.id==="EA-P2-B-M3-S");
    const result=gradeEnglishAPaper2Response(task,response,"The writer's purpose is to persuade school decision-makers to adopt a balanced phone policy.");
    expect(result.feedback).toContain("Summary word count: 50/50.");
  });

  test("recognises a developed persuasive speech instead of treating it as weakly organised", () => {
    const task=buildEnglishAPaper2("EA-P2-B").tasks.find(item=>item.id==="EA-P2-B-M3-E");
    const response=`Good evening, fellow members, and thank you for being here tonight.

I stand firmly in favour of free Wi-Fi in our public parks.

Who really uses a park? Families, joggers, pensioners, students, and young people like us who have few other places to go. Free Wi-Fi gives everyone the same chance to get online.

Think of the student who must research an assignment but has no internet at home. Think of the job seeker with an application due tonight. For them, a connection is not a luxury. It is a lifeline.

Some will say Wi-Fi will glue us to our screens and push us away from nature. I disagree. People already carry phones into parks, and free access may bring more people outdoors to study, work or join community events.

Others say it is too expensive. But partnerships can share the cost, and the gains in education and safety can outweigh the bill. In an emergency, a free connection could help someone call for help.

So let us stop treating the internet as a privilege for those who can pay. Let us build a fair, modern community where every park is open to every person.

I urge you to vote yes. Thank you.`;
    const result=gradeEnglishAPaper2Response(task,response);
    const analysing=result.dimensions.find(row=>row.id==="analysing");
    expect(analysing.score).toBeGreaterThanOrEqual(6);
    expect(result.score).toBeGreaterThanOrEqual(26);
    expect(result.feedback.join(" ")).toMatch(/opposing view and answers it/i);
    expect(result.feedback.join(" ")).toMatch(/rhetorical question/i);
  });

  test("recognises complete formal report conventions and sequencing", () => {
    const task=buildEnglishAPaper2("EA-P2-B").tasks.find(item=>item.id==="EA-P2-B-M1-E");
    const response=`REPORT ON THE SCHOOL WASTE AUDIT

To: The Principal and School Administration
From: Member, Environmental Club
Date: 5 October 2026
Subject: Findings and recommendations

1. Introduction
The Environmental Club carried out a one-week waste audit.

2. Findings
Plastic drink bottles made up 41% of visible litter. Only two recycling bins serve 900 students. Most students said they would use clearly labelled bins near the canteen and courtyard. A local company offered free weekly collection for three months.

3. Recommendations
1. Accept the free collection trial.
2. Add clearly labelled bins near the canteen and courtyard.
3. Explain the programme at assembly.
4. Repeat the audit after the trial.

4. Conclusion
The school can reduce plastic litter by improving access to recycling and reviewing the results after the trial.`;
    const result=gradeEnglishAPaper2Response(task,response);
    const analysing=result.dimensions.find(row=>row.id==="analysing");
    expect(analysing.score).toBe(7);
    expect(analysing.evidence).toEqual(expect.arrayContaining(["to:","from:","date:","subject:","numbered sections","findings","recommendations"]));
  });

  test("does not award marks to a blank response", () => {
    const task=englishAPaper2Sets[0].tasks[0];
    expect(gradeEnglishAPaper2Response(task,"","").score).toBe(0);
  });
});
