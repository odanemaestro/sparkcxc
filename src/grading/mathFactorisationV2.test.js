import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathFactorisationV2 as mark} from "./mathFactorisationV2";

const sources=[
 {id:"p2-q2-v1",factor:"4(m-5n)(m+5n)",swapped:"4(m+5n)(m-5n)",
  partial:"4(m^2-25n^2)",original:"4m^2-100n^2",quadratic:"(2x-3)(x+4)",
  split:"2x^2+8x-3x-12",group:"2x(x+4)-3(x+4)",expanded:"2x^2+5x-12"},
 {id:"p2-q2-v2",factor:"3(m-7n)(m+7n)",swapped:"3(m+7n)(m-7n)",
  partial:"3(m^2-49n^2)",original:"3m^2-147n^2",quadratic:"(3x-2)(x+3)",
  split:"3x^2+9x-2x-6",group:"3x(x+3)-2(x+3)",expanded:"3x^2+7x-6"}
];
describe.each(sources)("Mathematics source Q2 factorisation",entry=>{
 const evaluate=(partId,response)=>mark({questionId:entry.id,partId,response});
 test("original source requires complete factorisation and gives two marks each",()=>{
  const q=PAPER2_QUESTION_BANK.find(x=>x.question_id===entry.id);
  expect(q).toBeDefined();
  for(const partId of ["b1","b2"]){
   const part=q.parts.find(p=>p.id===partId);
   expect(part.marks).toBe(2);
   expect(part.requiredForm).toBe("factorised");
  }
  expect(q.parts.find(p=>p.id==="b1").answer.replace(/\s+/g,"")).toBe(entry.factor);
  expect(q.parts.find(p=>p.id==="b2").answer.replace(/\s+/g,"")).toBe(entry.quadratic);
 });
 test("common-factor extraction and completed difference of squares yield two advisory marks",()=>{
  const r=evaluate("b1",{working:entry.original+" = "+entry.partial,answer:entry.factor});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.publishable).toBe(false);
  expect(r.authority).toBe("advisory");
 });
 test("reversing factor order preserves final-answer candidate",()=>{
  const r=evaluate("b1",{answer:entry.swapped});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
 });
 test("stopping at a valid but incomplete factorisation earns only method candidate",()=>{
  const r=evaluate("b1",{answer:entry.partial});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
  expect(r.unresolvedMarks).toBe(1);
 });
 test("repeating the source polynomial cannot masquerade as factorisation",()=>{
  const r=evaluate("b1",{answer:entry.original,working:entry.original});
  expect(r.suggestedMarks).toBe(0);
  expect(r.unresolvedMarks).toBe(2);
 });
 test("middle-term splitting and correctly factored quadratic produce two candidates",()=>{
  const r=evaluate("b2",{working:entry.expanded+" = "+entry.split,
   answer:entry.quadratic});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 });
 test("source-approved grouping is recognised as a valid alternate partial method",()=>{
  const r=evaluate("b2",{working:entry.group,answer:entry.quadratic});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 });
 test("expanded polynomial cannot receive the completely-factorised accuracy mark",()=>{
  const r=evaluate("b2",{answer:entry.expanded});
  expect(r.criteria[1].candidateMarks).toBeNull();
 });
 test("incorrect sign cannot receive a full-answer candidate",()=>{
  const bad=entry.quadratic.replace("-","+");
  const r=evaluate("b2",{answer:bad});
  expect(r.criteria[1].candidateMarks).toBeNull();
 });
 test("unsupported source ID, made-up factor and unsafe syntax fail closed",()=>{
  expect(()=>mark({questionId:entry.id,partId:"a",response:{answer:entry.factor}})).toThrow();
  for(const raw of ["x+1",entry.partial+" or "+entry.factor,"", "sqrt(", "unknown"]){
   expect(evaluate("b1",{answer:raw}).criteria[1].candidateMarks).toBeNull();
  }
 });
});
test("source gating blocks unrelated Math questions",()=>{
 expect(()=>mark({questionId:"p2-q2-v9",partId:"b1",
  response:{answer:"4(m-5n)(m+5n)"}})).toThrow(/Unsupported/);
});
