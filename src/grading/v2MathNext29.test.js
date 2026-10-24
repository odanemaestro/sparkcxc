import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {MATH_NEXT_29_IDS,gradeMathNext29} from "./v2MathNext29";
const context=id=>{
 const [qid,pid]=id.split("::");
 const part=PAPER2_QUESTION_BANK.find(q=>q.question_id===qid)?.parts.find(p=>p.id===pid);
 if(!part)throw Error("Missing original source "+id);
 const marks=part.marks;
 const scheme=marks===1?[{kind:"B",code:"B1",marks:1}]:
  [{kind:"M",code:"M1",marks:1},{kind:"A",code:"A1",marks:marks-1}];
 return {criterionId:id,part,maxMarks:marks,
  source:{answer:part.answer,solution:part.solution,
   criteria:scheme.map(c=>({...c,check:{type:"manual-verification"}}))}};
};
test("29 unique original source entries",()=>{
 expect(MATH_NEXT_29_IDS).toHaveLength(29);
 expect(new Set(MATH_NEXT_29_IDS).size).toBe(29);
});
describe.each(MATH_NEXT_29_IDS)("remainder criterion %s",id=>{
 const c=context(id),grade=response=>gradeMathNext29({...c,response});
 const work=c.source.solution,ans=c.source.answer;
 test("complete, whitespace, exact source method partial, blank and unrelated",()=>{
  expect(grade({answer:ans,working:work})).toMatchObject({marks:c.maxMarks,resolved:true});
  expect(grade({answer:" "+ans+" ",working:" "+work+" "}))
   .toMatchObject({marks:c.maxMarks,resolved:true});
  const method=c.source.criteria.filter(x=>x.kind==="M").reduce((n,x)=>n+x.marks,0);
  expect(grade({answer:"banana",working:work})).toMatchObject({marks:method,resolved:true});
  expect(grade({answer:ans+" or banana",working:work}))
   .toMatchObject({marks:method,resolved:true});
  expect(grade({answer:"",working:""})).toMatchObject({marks:0,resolved:true});
  expect(grade({answer:"banana",working:""})).toMatchObject({marks:0,resolved:true});
 });
 test("source drift and unknown working must not be certified",()=>{
  const answer={answer:ans,working:work};
  expect(gradeMathNext29({...c,source:{...c.source,answer:"drift"},response:answer})).toBeNull();
  expect(gradeMathNext29({...c,source:{...c.source,criteria:[]},response:answer})).toBeNull();
  expect(grade({...answer,untrusted:"yes"})).toMatchObject({resolved:false});
  expect(grade({answer:ans,working:"another valid method"})).toMatchObject({resolved:false});
  expect(grade({answer:"banana or "+ans,working:""})).toMatchObject({resolved:false});
  expect(grade({answer:"other plausible result",working:""})).toMatchObject({resolved:false});
 });
});
test("unregistered criterion gets no source grade",()=>{
 const c=context(MATH_NEXT_29_IDS[0]);
 expect(gradeMathNext29({...c,criterionId:"unregistered",
  response:{answer:c.source.answer,working:c.source.solution}})).toBeNull();
});