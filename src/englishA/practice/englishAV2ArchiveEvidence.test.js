import {englishAPaper2Sets,buildEnglishAPaper2} from "../data/englishAPaper2Bank";
import {gradeEnglishAPaper2Response} from "./englishAPaper2Grader";
import {evaluateExistingSubjectPaper2V2} from "../../grading/serverPaper2V2SubjectEngine";

test("all 42 authored English A tasks across 72 registered choice-paper entries retain source ceilings and no unwarranted V2 authority",()=>{
 expect(englishAPaper2Sets).toHaveLength(6);
 let reviewed=0;
 for(const pack of englishAPaper2Sets){
  const paper=buildEnglishAPaper2(pack.id);
  expect(paper.tasks).toHaveLength(7);
  expect(paper.requiredTaskIds).toHaveLength(6);
  for(const task of paper.tasks){
   reviewed++;
   const part={id:task.id,sourcePartId:task.id,maxMarks:task.rubric.marks,
     sourceMarking:{kind:task.kind,rubric:task.rubric}};
   const empty=evaluateExistingSubjectPaper2V2({
    subjectId:"english-a",paperId:paper.id,criteria:[part],responses:{}
   });
   expect(empty.suggestedMarks).toBe(0);
   expect(empty.maxMarks).toBe(task.rubric.marks);
   const unrelated="ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY";
   const offTopic=evaluateExistingSubjectPaper2V2({
    subjectId:"english-a",paperId:paper.id,criteria:[part],
    responses:{[task.id]:unrelated}
   });
   expect(offTopic.suggestedMarks).toBe(0);
   expect(offTopic.canPublishFinalScore).toBe(false);
   const longNoise=("ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY. ").repeat(50);
   const longResult=evaluateExistingSubjectPaper2V2({
    subjectId:"english-a",paperId:paper.id,criteria:[part],
    responses:{[task.id]:longNoise}
   });
   expect(longResult.suggestedMarks).toBeGreaterThanOrEqual(0);
   expect(longResult.suggestedMarks).toBeLessThanOrEqual(task.rubric.marks);
   expect(longResult.canPublishFinalScore).toBe(false);
   expect(longResult.unresolvedMarks).toBe(task.rubric.marks);
   const sourceEstimate=gradeEnglishAPaper2Response(task,longNoise);
   expect(sourceEstimate.score).toBeLessThanOrEqual(task.rubric.marks);
  }
 }
 expect(reviewed).toBe(42);
});
