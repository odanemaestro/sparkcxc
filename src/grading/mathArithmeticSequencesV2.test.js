import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {
 evaluateMathArithmeticSequencesV2 as mark,
 ARITHMETIC_SEQUENCE_SOURCES_V2
} from "./mathArithmeticSequencesV2";

const fixtures=[
 {id:"p2-q7-v8",a:7,d:4,term:12,value:51,count:20,sum:900,target:79,index:19,offset:3},
 {id:"p2-q7-v9",a:13,d:5,term:16,value:88,count:18,sum:999,target:98,index:18,offset:8},
 {id:"p2-q7-v10",a:5,d:7,term:14,value:96,count:15,sum:810,target:138,index:20,offset:-2}
];
const by=(source,partId,answer="",working="")=>mark({
 questionId:source.id,partId,response:{answer,working}
});
const signed=n=>n<0?String(n):"+"+n;
describe.each(fixtures)("SPARK source Q7 arithmetic sequences",s=>{
 const paper=PAPER2_QUESTION_BANK.find(q=>q.question_id===s.id);
 const nth=s.d+"n"+signed(s.offset);
 const fullNth="T_n = a + (n-1)d; T_n = "+s.a+" + (n-1)("+s.d+")";
 const termWorking=s.a+"+("+s.term+"-1)("+s.d+")="+s.value;
 const sumWorking="S_"+s.count+"=("+s.count+"/2)[2("+s.a+")+("+s.count+"-1)("+s.d+")]="+s.sum;
 const reverseWorking=nth+"="+s.target+";n="+s.index;
 const last=s.a+(s.count-1)*s.d;
 test("assembled source retains correct marks, operands and model answers",()=>{
  expect(paper).toBeDefined();
  expect(paper.marks).toBe(10);
  expect(paper.parts.map(p=>[p.id,p.marks])).toEqual([
   ["a",1],["b",3],["c",2],["d",2],["e",2]]);
  expect(paper.stem).toContain([s.a,s.a+s.d,s.a+2*s.d,s.a+3*s.d].join(", "));
  expect(paper.parts.find(p=>p.id==="b").answer.replace(/\s+/g,"")).toBe(nth);
  expect(paper.parts.find(p=>p.id==="c").answer).toBe(String(s.value));
  expect(paper.parts.find(p=>p.id==="d").answer).toBe(String(s.sum));
  expect(paper.parts.find(p=>p.id==="e").answer).toContain(String(s.index));
  expect(ARITHMETIC_SEQUENCE_SOURCES_V2[s.id]).toMatchObject({
   a:s.a,d:s.d,term:s.term,value:s.value,count:s.count,
   sum:s.sum,target:s.target,index:s.index
  });
 });
 test("correct common difference is one candidate, without other inferred marks",()=>{
  expect(by(s,"a",String(s.d)).criteria.map(c=>c.candidateMarks)).toEqual([1]);
  expect(by(s,"a",String(s.d+1)).criteria.map(c=>c.candidateMarks)).toEqual([null]);
  expect(by(s,"a",s.d+" or "+(s.d+1)).suggestedMarks).toBe(0);
 });
 test("general and substituted nth-term working yield three advisory candidates",()=>{
  const r=by(s,"b",nth,fullNth);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
  expect(r.publishable).toBe(false);
  expect(r.authority).toBe("advisory");
 });
 test("equivalent simplified an+b forms are acceptable in either order",()=>{
  for(const expression of [nth,s.offset+signed(s.d)+"n",s.d+"*n"+signed(s.offset),
   "T_n = "+nth]){
   const r=by(s,"b",expression);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
  }
 });
 test("a correct nth-term alone cannot invent method marks",()=>{
  const r=by(s,"b",nth);
  expect(r.suggestedMarks).toBe(1);
  expect(r.unresolvedMarks).toBe(2);
 });
 test("unexpanded, wrong and ambiguous nth-term finals never receive A1",()=>{
  const cases=[
   s.a+"+(n-1)"+s.d,
   s.d+"n"+signed(s.offset+1),
   nth+" or 2n+1",
   "n="+s.index,
   "4n+3=4n+3"
  ];
  for(const answer of cases){
   expect(by(s,"b",answer).criteria[2].candidateMarks).toBeNull();
  }
 });
 test("formula and substitution are independent of a wrong final",()=>{
  const r=by(s,"b",s.d+"n"+signed(s.offset+1),fullNth);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,null]);
 });
 test("only explicit later-term substitution earns M1",()=>{
  const r=by(s,"c",String(s.value),termWorking);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(by(s,"c",String(s.value)).criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
  expect(by(s,"c",String(s.value+1),termWorking).criteria.map(c=>c.candidateMarks))
   .toEqual([1,null]);
 });
 test("incorrect later-term substitution or unrelated numbers cannot earn M1",()=>{
  for(const working of [
   s.a+"+("+s.term+"-2)("+s.d+")",
   "I used "+s.a+" "+s.term+" "+s.d,
   (s.a+1)+"+("+s.term+"-1)("+s.d+")"
  ])expect(by(s,"c",String(s.value),working).criteria[0].candidateMarks).toBeNull();
 });
 test("source arithmetic sum substitution and correct final earn two candidates",()=>{
  const r=by(s,"d",String(s.sum),sumWorking);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.publishable).toBe(false);
 });
 test("first-plus-last arithmetic-sum formula is an alternative method",()=>{
  const alternative="("+s.count+"/2)*("+s.a+"+"+last+")="+s.sum;
  const r=by(s,"d",String(s.sum),alternative);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 });
 test("a correct sum with no working earns accuracy but no assumed method",()=>{
  expect(by(s,"d",String(s.sum)).criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  expect(by(s,"d",String(s.sum+1),sumWorking).criteria.map(c=>c.candidateMarks))
   .toEqual([1,null]);
 });
 test("incorrect term count is not accepted as the sum method",()=>{
  const wrong="("+ (s.count+1) +"/2)*("+s.a+"+"+last+")";
  const r=by(s,"d",String(s.sum),wrong);
  expect(r.criteria[0].candidateMarks).toBeNull();
 });
 test("reverse term equation and source index each get one candidate",()=>{
  for(const response of [String(s.index),"n="+s.index,s.index+"th term","the "+s.index+"th term"]){
   const r=by(s,"e",response,reverseWorking);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
   expect(r.publishable).toBe(false);
  }
 });
 test("correct reverse result alone does not invent equation working",()=>{
  expect(by(s,"e",String(s.index)).criteria.map(c=>c.candidateMarks))
   .toEqual([null,1]);
  expect(by(s,"e",String(s.index+1),reverseWorking).criteria.map(c=>c.candidateMarks))
   .toEqual([1,null]);
 });
 test("wrong target value or competing indices are not sufficient for full credit",()=>{
  const wrong=nth+"="+(s.target+1);
  expect(by(s,"e",String(s.index),wrong).criteria[0].candidateMarks).toBeNull();
  for(const bad of [s.index+" or "+(s.index+1),"-"+s.index,"0","Infinity"]){
   expect(by(s,"e",bad).criteria[1].candidateMarks).toBeNull();
  }
 });
 test("unanswered parts remain unresolved and sum to the source ceiling",()=>{
  for(const part of paper.parts){
   const r=by(s,part.id);
   expect(r.suggestedMarks).toBe(0);
   expect(r.criteria.reduce((sum,c)=>sum+c.maxMarks,0)).toBe(part.marks);
   expect(r.suggestedMarks+r.unresolvedMarks).toBe(part.marks);
   expect(r.publishable).toBe(false);
  }
 });
});
test("unsupported sources and part IDs cannot activate advisory calibration",()=>{
 for(const args of [
  {questionId:"p2-q7-v7",partId:"b"},
  {questionId:"p2-q7-v11",partId:"d"},
  {questionId:"p2-q7-v8",partId:"f"},
  {questionId:"P2-2019-JAN-Q7",partId:"a"}
 ]){
  expect(()=>mark({...args,response:{answer:"4n+3"}})).toThrow(/Uncalibrated/);
 }
});
