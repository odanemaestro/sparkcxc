import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathIndicesRectangleV2 as mark} from "./mathIndicesRectangleV2";
const cases=[
 {id:"p2-q2-v1",a:"3x^2y^1",b:"4x^3y^4",product:"12x^5y^5",
  monomial:"2xy^3",perimeter:"8w+8",perimeterAlt:"8+8w",width:4.5,length:17.5},
 {id:"p2-q2-v2",a:"5x^3y^2",b:"3x^2y^3",product:"15x^5y^5",
  monomial:"3x^2y^2",perimeter:"6w+10",perimeterAlt:"10+6w",width:6,length:17},
 {id:"p2-q2-v3",a:"4x^4y^3",b:"6x^2y^2",product:"24x^6y^5",
  monomial:"3x^3y",perimeter:"10w+6",perimeterAlt:"6+10w",width:5,length:23}
];
const check=(f,partId,answer="",working="")=>mark({
 questionId:f.id,partId,response:{answer,working}
});
describe.each(cases)("Math Q2 source index laws and rectangle measurements",f=>{
 const q=PAPER2_QUESTION_BANK.find(entry=>entry.question_id===f.id);
 test("verified assembled source has exact index and rectangle allocations",()=>{
  expect(q).toBeDefined();
  expect(q.marks).toBe(9);
  expect(q.parts.map(p=>[p.id,p.marks])).toEqual([
   ["a",2],["b1",2],["b2",2],["c1",1],["c2",2]
  ]);
  expect(q.parts.find(p=>p.id==="a").answer.replace(/\s+/g,"")).toBe(f.monomial);
  expect(q.parts.find(p=>p.id==="c1").answer.replace(/\s+/g,"")).toBe(f.perimeter);
  const qC2=q.parts.find(p=>p.id==="c2").answer;
  expect(qC2).toContain(String(f.width));
  expect(qC2).toContain(String(f.length));
 });
 test("correct numerator index-law working and final monomial give two candidates",()=>{
  for(const working of [
   "("+f.a+")("+f.b+") = "+f.product,
   f.a+"*"+f.b+"="+f.product,
   f.b+"*"+f.a+"="+f.product
  ]){
   const result=check(f,"a",f.monomial,working);
   expect(result.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
   expect(result.publishable).toBe(false);
   expect(result.rubricAllocation).toBe("proposed-from-worked-solution");
  }
 });
 test("correct simplified answer without working earns only accuracy evidence",()=>{
  const result=check(f,"a",f.monomial);
  expect(result.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
 });
 test("intermediate correct multiplication with wrong final earns method only",()=>{
  const result=check(f,"a","wrong",f.a+"*"+f.b+"="+f.product);
  expect(result.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
 });
 test("bare intermediate numerator does not count as multiplying indices",()=>{
  expect(check(f,"a",f.monomial,f.product).criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
 });
 test("missing multiplication and wrong intermediate exponents cannot earn M1",()=>{
  for(const working of ["The answer is "+f.product,
   f.a+"*"+f.b+"="+f.product+"0", "x^2+y^2=0"]){
   expect(check(f,"a",f.monomial,working).criteria[0].candidateMarks).toBeNull();
  }
 });
 test("wrong coefficient, unsimplified unit exponent and ambiguity reject monomial",()=>{
  for(const raw of [
   "99"+f.monomial,f.monomial+" or 7",f.monomial+" +1",
   f.monomial.replace(/x(?:\^(\d+))?/,(_,p)=>"x^"+(p||1)),
   ""
  ]){
   expect(check(f,"a",raw).criteria[1].candidateMarks).toBeNull();
  }
 });
 test("perimeter accepts equivalent simplified expressions, including reordered terms",()=>{
  for(const value of [f.perimeter,f.perimeterAlt,"P = "+f.perimeter]){
   const r=check(f,"c1",value);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1]);
   expect(r.unresolvedMarks).toBe(0);
  }
 });
 test("unsimplified or wrong expressions do not meet required simplest form",()=>{
  for(const value of ["2(w+3w+4)",f.perimeter+" or "+f.perimeterAlt,"0",""]){
   expect(check(f,"c1",value).suggestedMarks).toBe(0);
  }
 });
 test("width and length in either specified accepted order give two marks",()=>{
  for(const answer of [
   f.width+", "+f.length,
   f.length+", "+f.width,
   "width "+f.width+" cm, length "+f.length+" cm",
   "length = "+f.length+" cm; width = "+f.width+" cm"
  ]){
   const r=check(f,"c2",answer);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
   expect(r.suggestedMarks).toBe(2);
  }
 });
 test("explicitly labelled single correct dimension is only partial credit",()=>{
  expect(check(f,"c2","width "+f.width+" cm").criteria.map(c=>c.candidateMarks))
   .toEqual([1,null]);
  expect(check(f,"c2","length "+f.length+" cm").criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
 });
 test("incorrect labelled length does not contaminate a correct width",()=>{
  const r=check(f,"c2","width "+f.width+" cm, length 999 cm");
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
 });
 test("one ambiguous bare number or duplicates never earn two marks",()=>{
  for(const text of [
   String(f.width),f.width+" or "+f.length,
   "width "+f.width+" cm; width "+f.width+" cm",
   "none",
   f.width+", "+f.width
  ]){
   const r=check(f,"c2",text);
   expect(r.suggestedMarks).toBeLessThan(2);
  }
 });
 test("each part is bounded by original mark allocations and nonpublishable",()=>{
  for(const partId of ["a","c1","c2"]){
   const r=check(f,partId);
   expect(r.suggestedMarks).toBe(0);
   expect(r.unresolvedMarks).toBe(q.parts.find(p=>p.id===partId).marks);
   expect(r.authority).toBe("advisory");
   expect(r.publishable).toBe(false);
  }
 });
});
test("unsupported source IDs and foreign parts fail closed",()=>{
 for(const [questionId,partId] of [["p2-q2-v4","a"],["p2-q2-v2","b2"],["p2-q2-v9","c2"]]){
  expect(()=>mark({questionId,partId,response:{answer:"3x^2y^2"}})).toThrow(/Uncalibrated/);
 }
});
