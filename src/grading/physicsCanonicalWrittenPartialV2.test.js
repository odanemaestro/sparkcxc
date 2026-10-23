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
   if(f.cls!=="partial")continue;
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


test("PostgreSQL JSONB key reordering preserves source identity, not changed rubric content",()=>{
 const id="phy-p2-1-q3::e";
 const rows=registered(p1);
 const target=rows.find(row=>row.id===id);
 const reorder=source=>Object.fromEntries(Object.keys(source).sort().map(k=>[k,source[k]]));
 target.sourceMarking.criteria=target.sourceMarking.criteria.map(reorder);
 const answer={answer:"Solar and wind.",working:""};
 const run=()=>evaluateExistingSubjectPaper2V2({subjectId:"physics",
  paperId:p1.paper_id,criteria:rows,responses:{[id]:answer}});
 expect(run().rows.find(x=>x.criterionId===id)).toEqual(expect.objectContaining({
  suggestedMarks:2,resolved:true}));
 target.sourceMarking.criteria[0].description="falsified source criterion";
 expect(run).toThrow(/source drift/i);
});


test("14 exact incorrect source answers have definitive zero marks, not guesses",()=>{
 const wrong=Object.entries({
  "phy-p2-1-q2::bi":"0.002 m³",
  "phy-p2-1-q2::e":"The largest face gives the greatest pressure because a larger area increases pressure.",
  "phy-p2-1-q5::g":"$9.90",
  "phy-p2-2-q1::d":"g = 20 m s⁻²",
  "phy-p2-2-q2::e":"The 250 cm mark",
  "phy-p2-2-q4::e":"v = 90 cm, m = 8.0",
  "phy-p2-3-q1::d":"Current is inversely proportional to voltage; the line curves through the origin.",
  "phy-p2-3-q1::f":"The second wire has lower resistance, so its V-I graph is flatter.",
  "phy-p2-3-q6::b":"Radon has mass number 190 and atomic number 40.",
  "phy-p2-4-q1::d":"500 kg m⁻³",
  "phy-p2-4-q2::c":"45 degrees west of north",
  "phy-p2-4-q3::c":"15 °C",
  "phy-p2-4-q6::b":"Nitrogen has atomic number 10 and the beta particle has charge +1.",
  "phy-p2-4-q6::c":"1/8 of the original nuclei"
 });
 expect(wrong).toHaveLength(14);
 for(const [id,answer] of wrong){
  const paper=papers.find(p=>p.questions.some(q=>
   q.parts.some(part=>q.question_id+"::"+part.id===id)));
  const rows=registered(paper);
  const result=evaluateExistingSubjectPaper2V2({subjectId:"physics",
   paperId:paper.paper_id,criteria:rows,responses:{[id]:{answer,working:""}}});
  expect(result.rows.find(x=>x.criterionId===id)).toEqual(expect.objectContaining({
   suggestedMarks:0,resolved:true,method:"physics-source-explicit-wrong"
  }));
 }
});
test("five fully source-matched written answers resolve, but competing answers do not",()=>{
 const ids=["phy-p2-4-q1::d","phy-p2-4-q2::c","phy-p2-4-q3::c",
  "phy-p2-4-q6::c","phy-p2-4-q6::d"];
 for(const id of ids){
  const paper=p4,rows=registered(paper),part=paper.questions
   .flatMap(q=>q.parts.map(p=>({p,key:q.question_id+"::"+p.id})))
   .find(x=>x.key===id)?.p;
  expect(part).toBeTruthy();
  const evaluate=answer=>evaluateExistingSubjectPaper2V2({subjectId:"physics",
   paperId:paper.paper_id,criteria:rows,responses:{[id]:{answer}}})
   .rows.find(r=>r.criterionId===id);
  expect(evaluate(part.answer)).toEqual(expect.objectContaining({
   suggestedMarks:part.marks,resolved:true,method:"physics-source-complete-answer"
  }));
  expect(evaluate(part.answer+" or an alternative answer").method)
   .not.toBe("physics-source-complete-answer");
 }
});
