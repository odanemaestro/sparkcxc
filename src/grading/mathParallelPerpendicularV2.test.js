import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathParallelPerpendicularV2 as grade} from "./mathParallelPerpendicularV2";

const cases=[
 {id:"p2-q4-v7",original:3,point:[6,1],parallel:"3",
  perpendicular:"-1/3",decimal:"-0.333",
  c:"y=3x-17",d:"y=-x/3+3",
  cEquivalent:"y=3.0x-17.0",dEquivalent:"y=(-1/3)x+3",
  perpendicularWorking:"m=-1/(3)",
  cWorking:"m=3; y-1=3(x-6)",
  dWorking:"m=-1/(3); y-1=(-1/3)(x-6)"
 },
 {id:"p2-q4-v8",original:-2,point:[4,1],parallel:"-2",
  perpendicular:"1/2",decimal:"0.500",
  c:"y=-2x+9",d:"y=x/2-1",
  cEquivalent:"y=-2.0x+9.0",dEquivalent:"y=(1/2)x-1",
  perpendicularWorking:"m=-1/(-2)",
  cWorking:"m=-2; y-1=-2(x-4)",
  dWorking:"m=-1/(-2); y-1=(1/2)(x-4)"
 }
];
const evaluate=(f,partId,response,previousResponses={})=>
 grade({questionId:f.id,partId,response,previousResponses});

describe.each(cases)("SPARK Paper 2 Q4 parallel/perpendicular source",f=>{
 const bank=PAPER2_QUESTION_BANK.find(q=>q.question_id===f.id);
 test("preserves actual question source, total and accepted forms",()=>{
  expect(bank).toBeDefined();
  expect(bank.parts.map(p=>[p.id,p.marks])).toEqual([
   ["a",1],["b",2],["c",3],["d",3]
  ]);
  expect(bank.marks).toBe(9);
  expect(bank.stem).toContain("("+f.point.join(", ")+")");
  expect(bank.parts[0].answer).toBe(f.parallel);
  expect(bank.parts[1].answer).toBe(f.perpendicular);
  expect(bank.parts[2].answer.replace(/\s+/g,"")).toBe(f.c);
  expect(bank.parts[3].answer.replace(/\s+/g,"")).toBe(f.d);
  expect(bank.parts[2].requiredForm).toBe("slope_intercept");
  expect(bank.parts[3].requiredForm).toBe("slope_intercept");
 });
 test("a parallel line has exactly the same gradient",()=>{
  const r=evaluate(f,"a",{answer:f.parallel});
  expect(r.suggestedMarks).toBe(1);
  expect(r.unresolvedMarks).toBe(0);
  expect(r.publishable).toBe(false);
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
  expect(evaluate(f,"a",{answer:f.perpendicular}).suggestedMarks).toBe(0);
 });
 test("perpendicular source fraction and accepted 3-decimal alternative qualify",()=>{
  for(const answer of [f.perpendicular,f.decimal]){
   const r=evaluate(f,"b",{answer,working:f.perpendicularWorking});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
   expect(r.publishable).toBe(false);
  }
 });
 test("correct perpendicular gradient alone is not assumed to prove method",()=>{
  const r=evaluate(f,"b",{answer:f.perpendicular});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
 });
 test("negative-reciprocal working can earn method credit even with wrong final",()=>{
  const r=evaluate(f,"b",{answer:"5",working:f.perpendicularWorking});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
 });
 test("positive reciprocal, false fractions, and a coarse decimal do not qualify",()=>{
  for(const answer of ["0.33","-0.33",String(-f.original),
   "1/0","3 or -1/3","1/2 or -2", "0.3333"]){
   if(answer===f.perpendicular||answer===f.decimal)continue;
   expect(evaluate(f,"b",{answer}).criteria[1].candidateMarks).toBeNull();
  }
 });
 test("correct parallel point-slope working and equation earn three candidates",()=>{
  for(const answer of [f.c,f.cEquivalent]){
   const r=evaluate(f,"c",{answer,working:f.cWorking});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
   expect(r.suggestedMarks).toBe(3);
  }
 });
 test("correct perpendicular point-slope working and equation earn three",()=>{
  for(const answer of [f.d,f.dEquivalent]){
   const r=evaluate(f,"d",{answer,working:f.dWorking});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
  }
 });
 test("unexplained correct equations award only accuracy candidate",()=>{
  for(const [partId,answer] of [["c",f.c],["d",f.d]]){
   const r=evaluate(f,partId,{answer});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
  }
 });
 test("source slope declaration without a correct point-slope substitution is partial",()=>{
  for(const [partId,answer,m] of [
   ["c","y=99x+99",f.parallel],
   ["d","y=99x+99",f.perpendicular]
  ]){
   const r=evaluate(f,partId,{answer,working:"m="+m});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null,null]);
  }
 });
 test("a valid point-slope substitution without a final line can earn M2 only",()=>{
  const r=evaluate(f,"c",{answer:"bad",
   working:f.cWorking.split("; ")[1]});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1,null]);
 });
 test("wrong point or slope does not count as the point-slope method",()=>{
  for(const [partId,working] of [
   ["c",f.cWorking.replace(/\(x-\d+\)/,"(x-99)")],
   ["d",f.dWorking.replace(/\(x-\d+\)/,"(x-99)")],
   ["c",f.cWorking.replace("y-1=","y-2=")]
  ]){
   const r=evaluate(f,partId,{answer:"wrong",working});
   expect(r.criteria[1].candidateMarks).toBeNull();
  }
 });
 test("an earlier student's erroneous gradient permits only provisional substitution ECF",()=>{
  const wrong=5;
  const working="y-1="+wrong+"(x-"+f.point[0]+")";
  const previous={a:{answer:String(wrong)},b:{answer:String(wrong)}};
  for(const partId of ["c","d"]){
   const r=evaluate(f,partId,{answer:"y=5x+10",working},previous);
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1,null]);
   expect(r.criteria[1].reason).toBe("earlier-student-gradient-follow-through");
   const noPrevious=evaluate(f,partId,{answer:"y=5x+10",working});
   expect(noPrevious.criteria[1].candidateMarks).toBeNull();
  }
 });
 test("ambiguous or malformed prior answers cannot authorise ECF",()=>{
  for(const previous of [{answer:"5 or 3"},{answer:"500000000000"},{answer:"1/0"},{answer:null}]){
   const r=evaluate(f,"d",{answer:"y=5x+10",
    working:"y-1=5(x-"+f.point[0]+")"},{b:previous});
   expect(r.criteria[1].candidateMarks).toBeNull();
  }
 });
 test("final answer must have slope-intercept form and the correct intercept",()=>{
  for(const answer of [
   "2x-y+3=0","y="+f.parallel+"x+"+f.point[1],
   "y="+f.perpendicular+"x+100",
   f.d+" or y=0","y=1/0x+1","y=2x+Infinity"
  ]){
   const r=evaluate(f,"d",{answer});
   expect(r.criteria[2].candidateMarks).toBeNull();
  }
 });
 test("all criteria are bounded, source-gated and nonpublishable",()=>{
  for(const part of bank.parts){
   const r=evaluate(f,part.id,{});
   expect(r.suggestedMarks+r.unresolvedMarks).toBe(part.marks);
   expect(r.criteria.reduce((sum,c)=>sum+c.maxMarks,0)).toBe(part.marks);
   expect(r.authority).toBe("advisory");
   expect(r.publishable).toBe(false);
  }
 });
});
test("unknown variants, unrelated parts and historic-source impersonations reject grading",()=>{
 for(const args of [
  {questionId:"p2-q4-v6",partId:"a"},
  {questionId:"p2-q4-v7",partId:"e"},
  {questionId:"p2-q4-v9",partId:"d"},
  {questionId:"P2-2019-JUN-Q4",partId:"b"}
 ]){
  expect(()=>grade({...args,response:{answer:"3"}})).toThrow(/Unsupported/);
 }
});
