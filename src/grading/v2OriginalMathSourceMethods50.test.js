import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {SOURCE_METHODS_50_IDS,gradeOriginalSourceMethod50} from "./v2OriginalMathSourceMethods50";
import {mathematicsSourceMethods50Fixtures} from "./v2Fixtures/mathematicsSourceMethods50";
const ctx=id=>{
 const [qid,pid]=id.split("::");
 const part=PAPER2_QUESTION_BANK.find(q=>q.question_id===qid)?.parts.find(p=>p.id===pid);
 if(!part)throw Error("Missing assembled source: "+id);
 const source={answer:part.answer,solution:part.solution,
 criteria:Array.from({length:part.marks},(_,i)=>({
 code:i===part.marks-1?"A1":"M"+(i+1),kind:i===part.marks-1?"A":"M",marks:1,
 check:{type:"manual-verification",evidence:"Original source method and result criterion "+id+" "+i}
 }))};
 return {criterionId:id,part,source};
};
test("exactly fifty distinct source question parts",()=>{
 expect(SOURCE_METHODS_50_IDS).toHaveLength(50);
 expect(new Set(SOURCE_METHODS_50_IDS).size).toBe(50);
});
describe.each(SOURCE_METHODS_50_IDS)("Math source methods %s",id=>{
 const params=ctx(id);
 const grade=response=>gradeOriginalSourceMethod50({...params,response});
 test("full, equivalent, method marks, zero, contradictory and provisional cases",()=>{
 const fixtures=mathematicsSourceMethods50Fixtures({
  criterion:{id,sourceMarking:params.source},part:params.part,maxMarks:params.part.marks
 });
 expect(fixtures.kind).toBe("structured");
 for(const item of fixtures.fixtures){
  const result=grade(item.response);
  if(item.mustAbstain){expect(result?.resolved).toBe(false);continue;}
  expect(result).toMatchObject({marks:item.expect,resolved:true});
 }
 });
 test("source drift, rubric alteration and invalid objects abstain",()=>{
 const response={answer:params.part.answer,working:params.part.solution};
 expect(gradeOriginalSourceMethod50({...params,source:{...params.source,answer:"altered"},response})).toBeNull();
 expect(gradeOriginalSourceMethod50({...params,source:{...params.source,criteria:params.source.criteria.slice(1)},response})).toBeNull();
 expect(grade({...response,unsupported:true})).toBeNull();
 expect(grade({answer:Infinity,working:params.part.solution})).toBeNull();
 expect(grade({...response,working:[]})).toBeNull();
 });
});
test("no source cohort leaking to an unapproved criterion",()=>{
 const x=ctx(SOURCE_METHODS_50_IDS[0]);
 expect(gradeOriginalSourceMethod50({...x,criterionId:"p2-q10-v1::c",
  response:{answer:x.part.answer,working:x.part.solution}})).toBeNull();
});
