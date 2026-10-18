import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathFunctionsV2 as grade} from "./mathFunctionsV2";

const fixtures=[
 {id:"p2-q4-v1",a:2,b:7,t:4,s:2,k:-3,inner:1,
  single:15,comp:9,root:4,compositeMarks:2,inverseMarks:2,
  inverse:"(x-7)/2",alternative:"x/2-7/2",d:true},
 {id:"p2-q4-v2",a:3,b:-5,t:6,s:3,k:1,inner:10,
  single:13,comp:25,root:5,compositeMarks:3,inverseMarks:3,
  inverse:"(x+5)/3",alternative:"x/3+5/3",d:false},
 {id:"p2-q4-v3",a:4,b:3,t:2,s:4,k:-2,inner:14,
  single:11,comp:59,root:6,compositeMarks:3,inverseMarks:3,
  inverse:"(x-3)/4",alternative:"x/4-3/4",d:false}
];
const evaluate=(f,partId,response)=>grade({questionId:f.id,partId,response});
const signed=n=>n<0?""+n:"+"+n;
describe.each(fixtures)("Source-based Mathematics Paper 2 functions",f=>{
 const question=PAPER2_QUESTION_BANK.find(q=>q.question_id===f.id);
 const innerStep="g("+f.s+")="+f.inner;
 const outerStep="f("+f.inner+")="+f.comp;
 const inverseSteps="x="+f.a+"y"+signed(f.b)+";"+f.a+"y=x"+signed(-f.b);
 test("assembled source questions preserve their live mark allocation",()=>{
  expect(question).toBeDefined();
  expect(question.parts.map(p=>[p.id,p.marks])).toEqual([
   ["a1",1],["a2",f.compositeMarks],["b",f.inverseMarks],
   ["c",2],...(f.d?[["d",2]]:[])
  ]);
  expect(question.parts.find(p=>p.id==="a1").answer).toBe(String(f.single));
  expect(question.parts.find(p=>p.id==="a2").answer).toBe(String(f.comp));
  expect(question.parts.find(p=>p.id==="b").answer.replace(/\s+/g,"")).toBe(f.inverse);
  expect(question.parts.find(p=>p.id==="c").answer).toContain(String(f.root));
 });
 test("f(t) direct evaluation earns exactly one advisory candidate",()=>{
  const r=evaluate(f,"a1",{answer:String(f.single)});
  expect(r.suggestedMarks).toBe(1);
  expect(r.criteria).toHaveLength(1);
  expect(r.publishable).toBe(false);
  expect(evaluate(f,"a1",{answer:String(f.single+1)}).suggestedMarks).toBe(0);
 });
 test("explicit inner and outer substitutions plus correct composite retain available marks",()=>{
  const r=evaluate(f,"a2",{answer:String(f.comp),
   working:innerStep+"\n"+outerStep});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual(
   f.compositeMarks===2?[1,1]:[1,1,1]);
  expect(r.suggestedMarks).toBe(f.compositeMarks);
  expect(r.unresolvedMarks).toBe(0);
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
 });
 test("correct composite answer alone never fabricates method work",()=>{
  const r=evaluate(f,"a2",{answer:String(f.comp)});
  expect(r.suggestedMarks).toBe(1);
  expect(r.unresolvedMarks).toBe(f.compositeMarks-1);
 });
 test("only inner-function working can earn its own method evidence",()=>{
  const r=evaluate(f,"a2",{answer:String(f.comp+1),working:innerStep});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual(
   f.compositeMarks===2?[1,null]:[1,null,null]);
 });
 test("incorrect order f then g does not receive source working credit",()=>{
  const r=evaluate(f,"a2",{answer:String(f.comp+1),
   working:"f("+f.s+")="+(f.a*f.s+f.b)});
  expect(r.suggestedMarks).toBe(0);
 });
 test("the inverse accepts original and algebraically equivalent forms",()=>{
  for(const answer of [f.inverse,f.alternative,"f^-1(x) = "+f.inverse]){
   const r=evaluate(f,"b",{answer,working:inverseSteps});
   expect(r.suggestedMarks).toBe(f.inverseMarks);
   expect(r.publishable).toBe(false);
  }
 });
 test("correct inverse alone is accuracy evidence but not implied method",()=>{
  const r=evaluate(f,"b",{answer:f.inverse});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual(
   f.inverseMarks===2?[null,1]:[null,null,1]);
 });
 test("an intermediate inverse rearrangement is partial working",()=>{
  const r=evaluate(f,"b",{answer:"incorrect",
   working:"x="+f.a+"y"+signed(f.b)});
  expect(r.suggestedMarks).toBe(1);
  expect(r.unresolvedMarks).toBe(f.inverseMarks-1);
 });
 test("inverse with wrong sign, original function or unsafe expression is unresolved",()=>{
  const wrong="(x"+signed(f.b)+")/"+f.a;
  for(const answer of [wrong,f.a+"x"+signed(f.b),
   "(x+1)/0","Math.random()","x or "+f.inverse, ""]){
   expect(evaluate(f,"b",{answer}).criteria.at(-1).candidateMarks).toBeNull();
  }
 });
 test("two roots are recognised independently in reversed, labelled and ± formats",()=>{
  for(const answer of [
   f.root+" and -"+f.root,
   "-"+f.root+", "+f.root,
   "x = "+f.root+" or x = -"+f.root,
   "±"+f.root,
   "+/-"+f.root
  ]){
   const r=evaluate(f,"c",{answer});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
   expect(r.suggestedMarks).toBe(2);
  }
 });
 test("one correct root earns at most its own mark",()=>{
  for(const root of [f.root,-f.root]){
   const r=evaluate(f,"c",{answer:String(root)});
   expect(r.suggestedMarks).toBe(1);
   expect(r.unresolvedMarks).toBe(1);
  }
 });
 test("wrong roots, duplicated root and prose ambiguity are not full credit",()=>{
  for(const answer of [
   f.root+","+f.root,
   f.root+" and "+(f.root+1),
   "x="+f.root+" or maybe x=-"+f.root,
   "x^2="+(f.root*f.root)
  ])expect(evaluate(f,"c",{answer}).suggestedMarks).toBeLessThan(2);
 });
 test("all checks stay source-gated and advisory",()=>{
  for(const partId of ["a1","a2","b","c"]){
   const r=evaluate(f,partId,{});
   expect(r.publishable).toBe(false);
   expect(r.authority).toBe("advisory");
   expect(r.suggestedMarks+r.unresolvedMarks).toBe(
    question.parts.find(p=>p.id===partId).marks);
  }
 });
});
test("Q4-v1 authored reasoning checks many-to-one and no-inverse independently",()=>{
 const id=fixtures[0].id;
 const good=grade({questionId:id,partId:"d",response:{
  answer:"No, g does not have an inverse function because it is many-to-one."}});
 expect(good.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 expect(good.rubricAllocation).toBe("authored");
 for(const answer of [
  "g has no inverse function",
  "No inverse is possible"
 ]){
  const r=grade({questionId:id,partId:"d",response:{answer}});
  expect(r.criteria[0].candidateMarks).toBe(1);
  expect(r.criteria[1].candidateMarks).toBeNull();
 }
 const wrong=grade({questionId:id,partId:"d",response:{
  answer:"Yes, g has an inverse because it is many-to-one."}});
 expect(wrong.suggestedMarks).toBe(0);
});
test("unknown sources and non-existent reasoning questions fail closed",()=>{
 for(const [questionId,partId] of [
  ["p2-q4-v4","b"],["p2-q4-v2","d"],["p2-q4-v3","d"],
  ["p2-q4-v1","z"]
 ]){
  expect(()=>grade({questionId,partId,response:{answer:"9"}})).toThrow(/Uncalibrated/);
 }
});
