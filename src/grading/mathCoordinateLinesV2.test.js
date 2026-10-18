import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathCoordinateLinesV2 as evaluate} from "./mathCoordinateLinesV2";

const cases=[
 {id:"p2-q4-v4",p:[-2,7],q:[4,-5],gradient:-2,gradientAnswer:"-12/6",
  mid:[1,1],length:13.42,line:"y=-2x+3",alternative:"y=-2.0x+3.0",
  pointSlope:"y-7=-2(x+2)",squares:"sqrt(6^2+12^2)",simplified:"sqrt(180)"},
 {id:"p2-q4-v5",p:[-3,1],q:[5,7],gradient:0.75,gradientAnswer:"6/8",
  mid:[1,4],length:10,line:"y=3x/4+13/4",alternative:"y=(3/4)x+3.25",
  pointSlope:"y-1=3/4(x+3)",squares:"sqrt(8^2+6^2)",simplified:"sqrt(100)"},
 {id:"p2-q4-v6",p:[1,-4],q:[7,8],gradient:2,gradientAnswer:"12/6",
  mid:[4,2],length:13.42,line:"y=2x-6",alternative:"y=2.0x-6.0",
  pointSlope:"y+4=2(x-1)",squares:"sqrt(6^2+12^2)",simplified:"sqrt(180)"}
];
const check=(f,partId,response,previousResponses={})=>
 evaluate({questionId:f.id,partId,response,previousResponses});
describe.each(cases)("SPARK Mathematics Q4 coordinate-line source calibration",f=>{
 const question=PAPER2_QUESTION_BANK.find(q=>q.question_id===f.id);
 test("the assembled bank fixes the four source-specific marks and answers",()=>{
  expect(question).toBeDefined();
  expect(question.parts.map(p=>[p.id,p.marks])).toEqual([
   ["a",2],["b",2],["c",2],["d",3]
  ]);
  expect(question.stem).toContain("P("+f.p.join(", ")+")");
  expect(question.stem).toContain("Q("+f.q.join(", ")+")");
  expect(question.parts[0].solution).toMatch(/Gradient/i);
  expect(question.parts[1].answer).toBe("("+f.mid.join(", ")+")");
  expect(Number(question.parts[2].answer)).toBe(f.length);
  expect(question.parts[3].requiredForm).toBe("slope_intercept");
 });
 test("correct gradient difference and final fraction produce two candidate marks",()=>{
  const r=check(f,"a",{answer:f.gradientAnswer,
   working:f.gradientAnswer+" = "+String(f.gradient)});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  expect(r.publishable).toBe(false);
  expect(r.rubricAllocation).toBe("proposed-from-worked-solution");
 });
 test("correct fractional or decimal gradient alone supplies accuracy only",()=>{
  for(const answer of [String(f.gradient),f.gradientAnswer]){
   const r=check(f,"a",{answer});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
  }
 });
 test("incorrect sign and false denominator do not receive A1",()=>{
  for(const answer of [String(-f.gradient),String(f.gradient+1),"7/0","-","NaN"]){
   expect(check(f,"a",{answer}).criteria[1].candidateMarks).toBeNull();
  }
 });
 test("midpoint coordinates are independently supported by a single clear pair",()=>{
  const correct=check(f,"b",{answer:"("+f.mid.join(", ")+")"});
  expect(correct.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  const first=check(f,"b",{answer:"("+f.mid[0]+", 99)"});
  expect(first.criteria.map(c=>c.candidateMarks)).toEqual([1,null]);
  const second=check(f,"b",{answer:"(99, "+f.mid[1]+")"});
  expect(second.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
 });
 test("unlabelled, reversed or ambiguous coordinate outputs fail closed",()=>{
  for(const answer of [
   f.mid.join(" and "),"("+f.mid.join(",")+") or (4,4)",
   "(x="+f.mid[0]+", y="+f.mid[1]+")","(1,1), (2,2)"
  ]){
   expect(check(f,"b",{answer}).suggestedMarks).toBe(0);
  }
 });
 test("distance squares and two-decimal result give two candidates",()=>{
  const r=check(f,"c",{answer:f.length.toFixed(2)+" units",
   working:f.squares});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1]);
  const simpler=check(f,"c",{answer:f.length.toFixed(2),
   working:f.simplified});
  expect(simpler.suggestedMarks).toBe(2);
 });
 test("correct length with no calculation does not fabricate method credit",()=>{
  const r=check(f,"c",{answer:f.length.toFixed(2)});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
 });
 test("two-decimal requirement blocks overprecise, coarse and wrong lengths",()=>{
  for(const answer of [String(f.length),f.length.toFixed(3),
   String(f.length+1),f.length.toFixed(2)+" cm"]){
   if(answer===f.length.toFixed(2))continue;
   expect(check(f,"c",{answer}).criteria[1].candidateMarks).toBeNull();
  }
 });
 test("both source-specified slope-intercept forms are correct",()=>{
  for(const answer of [f.line,f.alternative]){
   const r=check(f,"d",{answer,working:"m="+f.gradient+";"+f.pointSlope});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
   expect(r.suggestedMarks).toBe(3);
   expect(r.publishable).toBe(false);
  }
 });
 test("correct slope-intercept result alone earns only final accuracy",()=>{
  const r=check(f,"d",{answer:f.line});
  expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
 });
 test("correct point-slope working with incorrect final preserves partial method",()=>{
  const r=check(f,"d",{answer:"y=99x+99",working:f.pointSlope});
  expect(r.criteria[1].candidateMarks).toBe(1);
  expect(r.criteria[2].candidateMarks).toBeNull();
 });
 test("general-form equation and unsafe or conflicting expressions are not slope-intercept answers",()=>{
  for(const answer of [
   "2x+y-3=0","y=2x+3 or y=-2x+3","y="+f.gradient+"x+bad",
   "y="+f.gradient+"x+999","y=1/0x+3"
  ]){
   expect(check(f,"d",{answer}).criteria[2].candidateMarks).toBeNull();
  }
 });
 test("all source parts are bounded and cannot publish marks",()=>{
  for(const part of question.parts){
   const r=check(f,part.id,{answer:""});
   expect(r.criteria.reduce((s,c)=>s+c.maxMarks,0)).toBe(part.marks);
   expect(r.publishable).toBe(false);
   expect(r.authority).toBe("advisory");
   expect(r.suggestedMarks+r.unresolvedMarks).toBe(part.marks);
  }
 });
});
test("unsupported question and part IDs never activate calibration",()=>{
 for(const args of [
  {questionId:"p2-q4-v7",partId:"a"},
  {questionId:"p2-q4-v4",partId:"e"},
  {questionId:"p2-q4-v10",partId:"d"}
 ]){
  expect(()=>evaluate({...args,response:{answer:"2"}})).toThrow(/Unsupported/);
 }
});
