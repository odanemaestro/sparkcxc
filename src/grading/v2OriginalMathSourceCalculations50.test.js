import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {SOURCE_CALC_50_IDS,gradeSourceCalc50 as grade} from "./v2OriginalMathSourceCalculations50";
import {mathematicsSourceCalc50Fixtures} from "./v2Fixtures/mathematicsSourceCalculations50";
const ctx=id=>{
 const [qid,pid]=id.split("::");
 const part=PAPER2_QUESTION_BANK.find(q=>q.question_id===qid)?.parts.find(p=>p.id===pid);
 if(!part)throw Error("Missing original source: "+id);
 const source={answer:part.answer,solution:part.solution,
  criteria:Array.from({length:part.marks},(_,i)=>({
   code:i===part.marks-1?"A1":"M"+(i+1),
   kind:i===part.marks-1?"A":"M",marks:1,
   check:{type:"manual-verification",evidence:"Independent original source calculation mark "+(i+1)}
  }))};
 return {criterionId:id,part,source};
};
test("50 source-pinned criteria are unique, 49 two marks, one three marks",()=>{
 expect(SOURCE_CALC_50_IDS).toHaveLength(50);
 expect(new Set(SOURCE_CALC_50_IDS).size).toBe(50);
 expect(SOURCE_CALC_50_IDS.filter(id=>ctx(id).part.marks===3)).toHaveLength(1);
});
describe.each(SOURCE_CALC_50_IDS)("source numeric calculation %s",id=>{
 const {part,source}=ctx(id);
 const gradeAnswer=response=>grade({criterionId:id,part,source,response});
 test("canonical, equivalent, method-only, wrong, blank and competing",()=>{
  const set=mathematicsSourceCalc50Fixtures({criterion:{id,sourceMarking:source},part,maxMarks:part.marks});
  expect(set.kind).toBe("structured");
  for(const probe of set.fixtures){
   const result=gradeAnswer(probe.response);
   if(probe.mustAbstain){
    if(probe.cls==="incorrect")expect(result).toMatchObject({marks:0,resolved:false});
    else if(probe.response.working==="")expect(result).toMatchObject({marks:1,resolved:false});
    else expect(result).toBeNull();
    continue;
   }
   expect(result).toMatchObject({marks:probe.expect,resolved:true});
  }
 });
 test("source, rubric and evidence drift abstain",()=>{
  const response={answer:part.answer,working:part.solution};
  expect(grade({criterionId:id,part,source:{...source,solution:"different"},response})).toBeNull();
  expect(grade({criterionId:id,part,source:{...source,criteria:source.criteria.slice(1)},response})).toBeNull();
  expect(gradeAnswer({...response,guess:true})).toBeNull();
  expect(gradeAnswer({answer:Infinity,working:part.solution})).toBeNull();
  expect(gradeAnswer({...response,working:"unsupported student working"})).toBeNull();
 });
});
test("unreduced fractions and wrong precision are never awarded A1",()=>{
 let id="p2-q5-v1::d",x=ctx(id);
 expect(grade({...x,response:{answer:"16/40",working:x.part.solution}})).toMatchObject({marks:1,resolved:true});
 id="p2-q3-v1::c";x=ctx(id);
 expect(grade({...x,response:{answer:"5",working:x.part.solution}})).toMatchObject({marks:1,resolved:true});
 id="p2-q9-v1::b3";x=ctx(id);
 expect(grade({...x,response:{answer:"93",working:x.part.solution}})).toMatchObject({marks:1,resolved:true});
});
test("other sources never inherit approval",()=>{
 const x=ctx(SOURCE_CALC_50_IDS[0]);
 expect(grade({...x,criterionId:"p2-q7-v9::c",response:{answer:x.part.answer,working:x.part.solution}})).toBeNull();
});
