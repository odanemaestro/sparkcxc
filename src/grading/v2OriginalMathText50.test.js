import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {ORIGINAL_TEXT_50_IDS,gradeOriginalText50} from "./v2OriginalMathText50";
import {mathematicsOriginalText50Fixtures} from "./v2Fixtures/mathematicsOriginalText50";
const sourceOf=id=>{
 const [qid,pid]=id.split("::");
 const part=PAPER2_QUESTION_BANK.find(q=>q.question_id===qid)?.parts.find(p=>p.id===pid);
 if(!part)throw Error("No original Mathematics source for "+id);
 const B=/^(p2-q(?:2|7)-v[12]::)/.test(id);
 const single=part.marks===1;
 const source={answer:part.answer,solution:part.solution,
  criteria:Array.from({length:part.marks},(_,i)=>{
   const kind=B?"B":i===part.marks-1?"A":"M";
   const code=kind+(kind==="B"?i+1:kind==="A"?1:i+1);
   return {code,kind,marks:1,check:{type:"manual-verification",
    evidence:"Original source evidence "+id+" mark "+(i+1)}};
  })};
 return {criterionId:id,part,source};
};
test("original-source cohort is exactly fifty unique parts",()=>{
 expect(ORIGINAL_TEXT_50_IDS).toHaveLength(50);
 expect(new Set(ORIGINAL_TEXT_50_IDS).size).toBe(50);
});
describe.each(ORIGINAL_TEXT_50_IDS)("Original Mathematics response %s",id=>{
 const ctx=sourceOf(id),grade=response=>gradeOriginalText50({...ctx,response});
 test("full, partial, equivalent, contradictory, blank and unknown cases",()=>{
  const f=mathematicsOriginalText50Fixtures({criterion:{id,sourceMarking:ctx.source},
   part:ctx.part,maxMarks:ctx.part.marks});
  expect(f.kind).toBe("structured");
  for(const t of f.fixtures){
   const result=grade(t.response);
   if(t.mustAbstain){expect(result).toMatchObject({resolved:false});continue;}
   expect(result).toMatchObject({marks:t.expect,resolved:true});
  }
 });
 test("source, rubric, answer type and response alteration abstain",()=>{
  const correct={answer:ctx.part.answer,working:ctx.part.solution};
  expect(gradeOriginalText50({...ctx,source:{...ctx.source,answer:"tampered"},response:correct})).toBeNull();
  expect(gradeOriginalText50({...ctx,source:{...ctx.source,criteria:[]},response:correct})).toBeNull();
  expect(grade({...correct,extra:"untrusted"})).toBeNull();
  expect(grade({answer:Infinity,working:ctx.part.solution})).toBeNull();
  expect(grade({answer:ctx.part.answer,working:[]})).toBeNull();
 });
});
test("out-of-cohort question cannot inherit authority",()=>{
 const ctx=sourceOf(ORIGINAL_TEXT_50_IDS[0]);
 expect(gradeOriginalText50({...ctx,criterionId:"p2-q10-v1::a",
  response:{answer:ctx.part.answer,working:ctx.part.solution}})).toBeNull();
});
