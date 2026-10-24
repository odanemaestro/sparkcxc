import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {THREE_MARK_NUMERIC_IDS,gradeThreeMarkNumericSource as grade} from "./v2OriginalMathThreeMarkNumeric";
import {mathematicsThreeMarkNumericFixtures as fixtures} from "./v2Fixtures/mathematicsThreeMarkNumeric";
const partFor=id=>{
 const [qid,pid]=id.split("::");
 return PAPER2_QUESTION_BANK.find(q=>q.question_id===qid)?.parts.find(p=>p.id===pid);
};
const sourceFor=part=>({answer:part.answer,solution:part.solution,
 criteria:["M1","M2","A1"].map((code,i)=>({code,kind:i===2?"A":"M",marks:1,
  check:{type:"manual-verification",evidence:"Source-verified numeric criterion "+code}}))});
test("fifty unique original three-mark criteria",()=>{
 expect(THREE_MARK_NUMERIC_IDS).toHaveLength(50);
 expect(new Set(THREE_MARK_NUMERIC_IDS).size).toBe(50);
});
describe.each(THREE_MARK_NUMERIC_IDS)("Mathematics source MMA %s",id=>{
 const part=partFor(id);
 test("source structure and full partial incorrect alternative fixtures",()=>{
  expect(part).toBeDefined(); expect(part.marks).toBe(3);
  const source=sourceFor(part), set=fixtures({criterion:{id,sourceMarking:source},part,maxMarks:3});
  expect(set.kind).toBe("structured");
  for(const f of set.fixtures){
   const result=grade({criterionId:id,source,part,response:f.response});
   if(f.mustAbstain){
    if(f.response?.working===""&&f.response?.answer===part.answer)
     expect(result).toMatchObject({marks:1,resolved:false});
    else expect(result).toBeNull();
    continue;
   }
   expect(result).toMatchObject({marks:f.expect,resolved:true});
  }
 });
 test("source drift, invalid method and foreign response abstain",()=>{
  const source=sourceFor(part), response={answer:part.answer,working:part.solution};
  expect(grade({criterionId:id,part,source:{...source,solution:"changed"},response})).toBeNull();
  expect(grade({criterionId:id,part,source:{...source,criteria:source.criteria.slice(1)},response})).toBeNull();
  expect(grade({criterionId:id,part:{...part,marks:4},source,response})).toBeNull();
  expect(grade({criterionId:id,part,source,response:{...response,extra:"untrusted"}})).toBeNull();
  expect(grade({criterionId:id,part,source,response:{answer:Infinity,working:part.solution}})).toBeNull();
  expect(grade({criterionId:id,part,source,response:{answer:part.answer,working:"unknown"}})).toBeNull();
 });
});
test("correct reduced mixed number is provisional without method, authoritative with source proof",()=>{
 const id="p2-q1-v2::a",part=partFor(id),source=sourceFor(part);
 expect(grade({criterionId:id,source,part,response:{answer:"1 4/5",working:""}}))
  .toMatchObject({marks:1,resolved:false});
 expect(grade({criterionId:id,source,part,response:{answer:"1 4/5",working:part.solution}}))
  .toMatchObject({marks:3,resolved:true});
 expect(grade({criterionId:id,source,part,response:{answer:"1 8/10",working:part.solution}}))
  .toMatchObject({marks:2,resolved:true});
});
test("unreduced fraction earns no accuracy even for an integer source answer",()=>{
 const id="p2-q1-v1::a",part=partFor(id),source=sourceFor(part);
 expect(grade({criterionId:id,source,part,response:{answer:"14/2",working:""}}))
  .toMatchObject({marks:0,resolved:true});
 expect(grade({criterionId:id,source,part,response:{answer:"14/2",working:part.solution}}))
  .toMatchObject({marks:2,resolved:true});
});
test("other parts receive no unverified authority",()=>{
 const part=partFor(THREE_MARK_NUMERIC_IDS[0]);
 expect(grade({criterionId:"p2-q1-v1::z",part,source:sourceFor(part),response:{answer:part.answer,working:part.solution}})).toBeNull();
});
