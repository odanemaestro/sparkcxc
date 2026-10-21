import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";
import {physicsCuratedTableFixtures} from "./v2Fixtures/physicsCurated";
import {modelResponsesForPhysicsPaper2} from "../physics/paper2/physicsPaper2Marking";
import paper1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import paper2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import paper3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import paper4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";

// Retain the exact authored source markers. No client-supplied expectations
// and no changes to rubric totals are involved in this regression.
const papers=[paper1,paper2,paper3,paper4];
const registered=paper=>paper.questions.flatMap(q=>q.parts.map(part=>({
 id:q.question_id+"::"+part.id,
 maxMarks:part.marks,
 sourceMarking:{answer:part.answer,modelResponse:part.modelResponse,solution:part.solution,
  criteria:JSON.parse(JSON.stringify(part.criteria)),responseType:part.responseType}
})));

test("eight registered Physics tables have source-specific full, partial, incorrect and contradiction fixtures",()=>{
 let total=0;
 for(const paper of papers){
  const rows=registered(paper);
  const models=modelResponsesForPhysicsPaper2(paper);
  for(const q of paper.questions)for(const part of q.parts){
   if(part.responseType!=="table")continue;
   total++;
   const id=q.question_id+"::"+part.id;
   const model=models[id]?.table;
   const fixtures=physicsCuratedTableFixtures(id,model,part.marks);
   expect(fixtures).toHaveLength(4);
   for(const fixture of [
    {cls:"full",response:{table:model},expect:part.marks},
    ...fixtures
   ]){
    const result=evaluateExistingSubjectPaper2V2({
     subjectId:"physics",paperId:paper.paper_id,criteria:rows,
     responses:{[id]:fixture.response}
    });
    const mark=result.rows.find(x=>x.criterionId===id);
    expect(mark).toBeTruthy();
    const expected=fixture.expect;
    if(typeof expected==="number")expect(mark.suggestedMarks).toBe(expected);
    else{
     expect(mark.suggestedMarks).toBeGreaterThanOrEqual(expected.min);
     expect(mark.suggestedMarks).toBeLessThanOrEqual(expected.max);
    }
    if(fixture.cls==="full"||fixture.cls==="partial"||fixture.cls==="incorrect")
     expect(mark.resolved).toBe(true);
    if(fixture.cls==="contradiction")
     expect(mark.suggestedMarks).toBeLessThan(part.marks);
   }
  }
 }
 expect(total).toBe(8);
});
