import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {
 evaluateMathNumberStatementsV2 as grade,
 NUMBER_STATEMENT_SOURCES_V2
} from "./mathNumberStatementsV2";

const sources=[
 {id:"p2-q7-v6",target:71,index:7,factor:"(n+10)(n-7)=0"},
 {id:"p2-q7-v7",target:131,index:10,factor:"(n+13)(n-10)=0"}
];
const mark=(f,partId,answer="",working="")=>grade({
 questionId:f.id,partId,response:{answer,working}
});
describe.each(sources)("Mathematics source Q7 number-statement calibration",fixture=>{
 const paper=PAPER2_QUESTION_BANK.find(q=>q.question_id===fixture.id);
 test("assembled source has original statements and 2/2/4/2 marks",()=>{
  expect(paper).toBeDefined();
  expect(paper.marks).toBe(10);
  expect(paper.parts.map(p=>[p.id,p.marks])).toEqual([
   ["a",2],["b",2],["c",4],["d",2]
  ]);
  expect(paper.parts.find(p=>p.id==="a").answer).toContain("5 × 7 + 6 = 41");
  expect(paper.parts.find(p=>p.id==="b").answer).toContain("10 × 12 + 11 = 131");
  expect(paper.parts.find(p=>p.id==="c").answer).toContain("n^2 + 3n + 1");
  expect(paper.parts.find(p=>p.id==="d").answer).toBe(String(fixture.index));
  expect(NUMBER_STATEMENT_SOURCES_V2[fixture.id]).toEqual({
   target:fixture.target,index:fixture.index
  });
 });
 test("fifth statement recognises source expressions and their result",()=>{
  for(const statement of ["5 × 7 + 6 = 41","5x7+6=41","5(7)+6=41","35+6=41"]){
   const r=mark(fixture,"a",statement);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
   expect(r.publishable).toBe(false);
  }
 });
 test("tenth statement recognises source expressions and their result",()=>{
  for(const statement of ["10 × 12 + 11 = 131","10x12+11=131","10(12)+11=131","120+11=131"]){
   const r=mark(fixture,"b",statement);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
   expect(r.publishable).toBe(false);
  }
 });
 test("a correct final value alone cannot invent the statement working",()=>{
  const a=mark(fixture,"a","41");
  const b=mark(fixture,"b","131");
  expect(a.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  expect(b.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
 });
 test("a correct calculation placed in working can support method separately",()=>{
  const a=mark(fixture,"a","41","5 × 7 + 6 = 41");
  const b=mark(fixture,"b","131","10 × 12 + 11 = 131");
  expect(a.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(b.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 });
 test("correct statement with wrong arithmetic receives only method proposal",()=>{
  const a=mark(fixture,"a","5 × 7 + 6 = 40");
  const b=mark(fixture,"b","10 × 12 + 11 = 132");
  expect(a.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
  expect(b.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
 });
 test("a fabricated equality cannot earn final credit",()=>{
  for(const bad of ["0=41","5*7+7=41","1=41","5*7+6=41 or 42"]){
   const result=mark(fixture,"a",bad);
   expect(result.criteria[1].candidateMarks).toBeNull();
  }
 });
 test("source nth expression, intermediate expansion and simplified polynomial yield four marks",()=>{
  const full="n(n+2)+(n+1)=n^2+2n+n+1=n^2+3n+1";
  const r=mark(fixture,"c",full);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1,1]);
  expect(r.suggestedMarks).toBe(4);
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
  expect(r.publishable).toBe(false);
 });
 test("source accepts the unexpanded formula as evidence but not invented expansion marks",()=>{
  for(const formula of ["n(n+2)+(n+1)","n*(n+2)+(n+1)","n(n+2)+n+1"]){
   const r=mark(fixture,"c",formula);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,null,null]);
   expect(r.unresolvedMarks).toBe(2);
  }
 });
 test("only the first product is one supported step, not full nth statement",()=>{
  const r=mark(fixture,"c","n(n+2)");
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null,null,null]);
 });
 test("a correct final simplified formula alone is accuracy only",()=>{
  for(const answer of ["n^2+3n+1","3n+n^2+1","n^2+1+3n","n^2+3*n+1"]){
   const r=mark(fixture,"c",answer);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,null,1]);
  }
 });
 test("the uncollected expansion is intermediate method evidence only",()=>{
  for(const response of ["n^2+2n+n+1","n^2+n+2n+1"]){
   const r=mark(fixture,"c",response);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1,null]);
  }
 });
 test("unsupported final formulas, including equivalent but unexpanded, remain unresolved",()=>{
  for(const response of ["n*(n+3)+1","n^2+4n+1","n^2+2n+n+1","n^2+3n","n^2+3n+1 or 4n"]){
   expect(mark(fixture,"c",response).criteria[3].candidateMarks).toBeNull();
  }
 });
 test("candidate can show a complete proof across answer and working fields",()=>{
  const r=mark(fixture,"c","3n+n^2+1","n(n+2)+(n+1)\nn^2+2n+n+1");
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1,1]);
 });
 test("target equation and correct positive index yield separate reverse marks",()=>{
  const working="n^2+3n+1="+fixture.target;
  const r=mark(fixture,"d","n="+fixture.index,working);
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  const factored=mark(fixture,"d",String(fixture.index),fixture.factor);
  expect(factored.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
 });
 test("different accepted index formats do not require invisible working",()=>{
  for(const response of [
   String(fixture.index),"n = "+fixture.index,
   "the "+fixture.index+"th statement"
  ]){
   const r=mark(fixture,"d",response);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  }
 });
 test("wrong target equation or negative root cannot claim full reverse result",()=>{
  const wrong=mark(fixture,"d",String(fixture.index),"n^2+3n+1="+(fixture.target+1));
  expect(wrong.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  for(const bad of ["-"+(fixture.index+3),"0","-1",fixture.index+" or "+(fixture.index+1),"Infinity"]){
   expect(mark(fixture,"d",bad).criteria[1].candidateMarks).toBeNull();
  }
 });
 test("every empty response remains bounded and completely unresolved",()=>{
  for(const part of paper.parts){
   const r=mark(fixture,part.id);
   expect(r.suggestedMarks).toBe(0);
   expect(r.unresolvedMarks).toBe(part.marks);
   expect(r.criteria.reduce((s,c)=>s+c.maxMarks,0)).toBe(part.marks);
   expect(r.publishable).toBe(false);
   expect(r.authority).toBe("advisory");
  }
 });
});
test("unknown source, historical papers and foreign part IDs are rejected",()=>{
 for(const args of [
  {questionId:"p2-q7-v5",partId:"a"},
  {questionId:"p2-q7-v8",partId:"c"},
  {questionId:"p2-q7-v6",partId:"e"},
  {questionId:"CSEC-2019-Q7",partId:"b"}
 ])expect(()=>grade({...args,response:{answer:"41"}})).toThrow(/Uncalibrated/);
});
