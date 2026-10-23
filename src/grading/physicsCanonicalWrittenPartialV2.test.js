import {physicsCanonicalWrittenPartial} from "./physicsCanonicalWrittenPartialV2";
import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";
import {CURATED_PHYSICS} from "./v2Fixtures/physicsCurated";
import p1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import p2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import p3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import p4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
const papers=[p1,p2,p3,p4];
const registered=paper=>paper.questions.flatMap(q=>q.parts.map(p=>({
 id:q.question_id+"::"+p.id,maxMarks:p.marks,
 sourceMarking:{answer:p.answer,solution:p.solution,
  modelResponse:p.modelResponse,criteria:JSON.parse(JSON.stringify(p.criteria)),
  responseType:p.responseType}
})));
test("every curated answer has its own full-paper source and exact expected submarks",()=>{
 for(const [id,fixtures] of Object.entries(CURATED_PHYSICS)){
  const paper=papers.find(p=>p.questions.some(q=>q.parts.some(part=>q.question_id+"::"+part.id===id)));
  expect(paper).toBeTruthy();
  const rows=registered(paper);
  const source=rows.find(r=>r.id===id);
  for(const f of fixtures){
   expect(f.expect).toBeGreaterThan(0);
   expect(f.expect).toBeLessThan(source.maxMarks);
   const evalResult=evaluateExistingSubjectPaper2V2({subjectId:"physics",
    paperId:paper.paper_id,criteria:rows,responses:{[id]:f.response}});
   const mark=evalResult.rows.find(row=>row.criterionId===id);
   expect({id,marks:mark.suggestedMarks,resolved:mark.resolved}).toEqual({
    id,marks:f.expect,resolved:true});
   expect(mark.method).toBe("physics-source-canonical-partial");
   for(const negative of ["It is false that "+f.response.answer,
    f.response.answer+" but none of this is correct."]){
    expect(physicsCanonicalWrittenPartial(id,{answer:negative})).toBeNull();
   }
  }
 }
});
