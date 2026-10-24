import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {ORIGINAL_RESIDUAL_48_IDS,gradeOriginalMathResidual48} from "./v2OriginalMathResidual48";
import {mathematicsOriginalResidual48Fixtures} from "./v2Fixtures/mathematicsOriginalResidual48";
const ctx=id=>{
 const [questionId,partId]=id.split("::");
 const part=PAPER2_QUESTION_BANK.find(q=>q.question_id===questionId)?.parts.find(p=>p.id===partId);
 if(!part)throw Error("Unknown Mathematics source "+id);
 const criteria=Array.from({length:part.marks},(_,i)=>{
  const last=i===part.marks-1,kind=last?"A":"M";
  return {code:kind+(last?1:i+1),kind,marks:1,check:{type:"manual-verification"}};
 });
 return {criterionId:id,part,source:{answer:part.answer,solution:part.solution,criteria}};
};
test("residual original cohort contains exactly 48 unique parts",()=>{
 expect(ORIGINAL_RESIDUAL_48_IDS).toHaveLength(48);
 expect(new Set(ORIGINAL_RESIDUAL_48_IDS).size).toBe(48);
});
describe.each(ORIGINAL_RESIDUAL_48_IDS)("Mathematics residual source %s",id=>{
 const c=ctx(id),grade=response=>gradeOriginalMathResidual48({...c,response});
 test("source full, partial, blank, competing and unknown methods",()=>{
  const fixture=mathematicsOriginalResidual48Fixtures({
   criterion:{id,sourceMarking:c.source},part:c.part,maxMarks:c.part.marks});
  expect(fixture.kind).toBe("structured");
  expect(fixture.fixtures).toHaveLength(12);
  for(const f of fixture.fixtures){
   const result=grade(f.response);
   if(f.mustAbstain){
    expect(result).toMatchObject({resolved:false});
    continue;
   }
   if(typeof f.expect==="number")
    expect(result).toMatchObject({resolved:true,marks:f.expect});
   else {
    expect(result?.resolved).toBe(true);
    expect(result.marks).toBeGreaterThanOrEqual(f.expect.min);
    expect(result.marks).toBeLessThanOrEqual(f.expect.max);
   }
  }
 });
 test("untrusted source drift and response fields never receive authoritative marks",()=>{
  const canonical={answer:c.part.answer,working:c.part.solution};
  expect(gradeOriginalMathResidual48({...c,source:{...c.source,answer:"altered"},response:canonical}))
   .toBeNull();
  expect(gradeOriginalMathResidual48({...c,source:{...c.source,criteria:[]},response:canonical}))
   .toBeNull();
  expect(grade({...canonical,untrusted:"yes"})).toMatchObject({resolved:false});
  expect(grade({answer:2,working:c.part.solution})).toMatchObject({resolved:false});
  expect(grade({answer:c.part.answer,working:[]})).toMatchObject({resolved:false});
 });
});
test("unregistered question is never given residual authority",()=>{
 const c=ctx(ORIGINAL_RESIDUAL_48_IDS[0]);
 expect(gradeOriginalMathResidual48({...c,criterionId:"p2-q10-v9::z",
  response:{answer:c.part.answer,working:c.part.solution}})).toBeNull();
});

test.each([["p2-q8-v1::d","20"],["p2-q8-v2::d","23"]])(
 "source y-axis intercept %s respects equivalent typed working",(id,y)=>{
 const c=ctx(id);
 expect(gradeOriginalMathResidual48({...c,response:{answer:"(0,"+y+")",working:"f(0) = "+y}}))
   .toMatchObject({marks:2,resolved:true});
 expect(gradeOriginalMathResidual48({...c,response:{answer:"("+y+",0)",working:"f(0) = "+y}}))
   .not.toMatchObject({marks:2,resolved:true});
});
