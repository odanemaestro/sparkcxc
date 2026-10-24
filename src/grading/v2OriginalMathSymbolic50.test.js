import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {SOURCE_SYMBOLIC_50_IDS,gradeSourceSymbolic50} from "./v2OriginalMathSymbolic50";
import {mathematicsSymbolic50Fixtures} from "./v2Fixtures/mathematicsSymbolic50";
const load=id=>{
 const [qid,pid]=id.split("::");
 const part=PAPER2_QUESTION_BANK.find(q=>q.question_id===qid)?.parts.find(p=>p.id===pid);
 if(!part)throw Error("Missing source "+id);
 const source={answer:part.answer,solution:part.solution,criteria:Array.from({length:part.marks},(_,i)=>({
  code:i===part.marks-1?"A1":"M"+(i+1),kind:i===part.marks-1?"A":"M",marks:1,
  check:{type:"manual-verification",evidence:"Original source proof for "+id+" mark "+(i+1)}
 }))};
 return {criterionId:id,part,source};
};
test("fifty original source parts, 43 two marks and seven three marks",()=>{
 expect(SOURCE_SYMBOLIC_50_IDS).toHaveLength(50);
 expect(new Set(SOURCE_SYMBOLIC_50_IDS).size).toBe(50);
 expect(SOURCE_SYMBOLIC_50_IDS.filter(id=>load(id).part.marks===2)).toHaveLength(43);
 expect(SOURCE_SYMBOLIC_50_IDS.filter(id=>load(id).part.marks===3)).toHaveLength(7);
});
describe.each(SOURCE_SYMBOLIC_50_IDS)("Math original symbolic %s",id=>{
 const params=load(id);
 const grade=response=>gradeSourceSymbolic50({...params,response});
 test("source full/partial, blank, wrong, equivalent, contradictory and abstention",()=>{
  const f=mathematicsSymbolic50Fixtures({criterion:{id,sourceMarking:params.source},
   part:params.part,maxMarks:params.part.marks});
  expect(f.kind).toBe("structured");
  for(const caseItem of f.fixtures){
   const result=grade(caseItem.response);
   if(caseItem.mustAbstain){expect(result?.resolved).toBe(false);continue;}
   expect(result).toMatchObject({marks:caseItem.expect,resolved:true});
  }
 });
 test("source/rubric drift, unsupported fields and non-text abstain",()=>{
  const correct={answer:params.part.answer,working:params.part.solution};
  expect(gradeSourceSymbolic50({...params,source:{...params.source,answer:"wrong"},response:correct})).toBeNull();
  expect(gradeSourceSymbolic50({...params,source:{...params.source,criteria:[]},response:correct})).toBeNull();
  expect(grade({...correct,extra:"untrusted"})).toBeNull();
  expect(grade({answer:Infinity,working:params.part.solution})).toBeNull();
 });
});
test("unlisted original source is never implicitly authorised",()=>{
 const x=load(SOURCE_SYMBOLIC_50_IDS[0]);
 expect(gradeSourceSymbolic50({...x,criterionId:"p2-q4-v3::a1",
  response:{answer:x.part.answer,working:x.part.solution}})).toBeNull();
});
