import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {MATH_Q5_SOURCES_V2 as SOURCES,evaluateMathQ5V2 as grade} from "./mathStatisticsProbabilityV2";

describe.each(Object.keys(SOURCES))("Q5 V2 source calibration %s",id=>{
 const q=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
 test("all four parts align with assembled 9-mark source",()=>{
  expect(q).toBeDefined();
  expect(q.question_number).toBe(5);
  expect(q.marks).toBe(9);
  expect(q.parts.map(p=>p.id)).toEqual(["a","b","c","d"]);
  for(const p of q.parts){
   const [expected,marks]=SOURCES[id][p.id];
   expect(p.marks).toBe(marks);
   if(expected!=="graph"){
    if(/^[\d.]+$/.test(expected))expect(Number(p.answer)).toBe(Number(expected));
    else if(p.answer.includes("/")||/[a-z]/i.test(expected))
     expect(p.answer.replace(/\s+/g,"").toLowerCase()).toBe(expected.replace(/\s+/g,"").toLowerCase());
    else expect(p.answer.replace(/\s/g,"")).toBe(expected);
   }
   const empty=grade({questionId:id,partId:p.id});
   expect(empty.criteria.reduce((sum,c)=>sum+c.maxMarks,0)).toBe(marks);
   expect(empty.suggestedMarks).toBe(0);
   expect(empty.unresolvedMarks).toBe(marks);
   expect(empty.publishable).toBe(false);
  }
 });
 test("supported final values are advisory only, methods stay unresolved",()=>{
  for(const p of q.parts){
   const expected=SOURCES[id][p.id][0];
   const value=expected==="graph"?"A smooth curve through the correct points":p.answer;
   const report=grade({questionId:id,partId:p.id,response:{answer:value}});
   expect(report.suggestedMarks).toBe(expected==="graph"?0:1);
   expect(report.unresolvedMarks).toBe(p.marks-report.suggestedMarks);
   expect(report.publishable).toBe(false);
  }
 });
 test("competing and incorrect answers cannot claim candidate credit",()=>{
  for(const p of q.parts){
   for(const answer of ["", "incorrect", "3 or 4", p.answer+" or incorrect"]){
    expect(grade({questionId:id,partId:p.id,response:{answer}}).suggestedMarks).toBe(0);
   }
  }
 });
});
test("source-specific exact probabilities accept equivalent simplest fractions only",()=>{
 expect(grade({questionId:"p2-q5-v8",partId:"a",response:"5/12"}).suggestedMarks).toBe(1);
 expect(grade({questionId:"p2-q5-v8",partId:"a",response:"10/24"}).suggestedMarks).toBe(0);
 expect(grade({questionId:"p2-q5-v8",partId:"c",response:"5/33"}).suggestedMarks).toBe(1);
 expect(grade({questionId:"p2-q5-v8",partId:"c",response:"5/33 or 4/33"}).suggestedMarks).toBe(0);
});
test("cumulative frequencies require ordered complete entries",()=>{
 expect(grade({questionId:"p2-q5-v2",partId:"c",response:"5,14,26,35,40"}).suggestedMarks).toBe(1);
 expect(grade({questionId:"p2-q5-v2",partId:"c",response:"40,35,26,14,5"}).suggestedMarks).toBe(0);
 expect(grade({questionId:"p2-q5-v2",partId:"c",response:"5,14,26"}).suggestedMarks).toBe(0);
});
test("graph drawing is never graded from a textual claim",()=>{
 expect(grade({questionId:"p2-q5-v4",partId:"b",response:"drawn"}).unresolvedMarks).toBe(3);
 expect(grade({questionId:"p2-q5-v5",partId:"b",response:"A correct graph"}).publishable).toBe(false);
});
test("reject unknown Q5 paper and part IDs",()=>{
 expect(()=>grade({questionId:"p2-q5-v11",partId:"a"})).toThrow(/Uncalibrated/);
 expect(()=>grade({questionId:"p2-q5-v8",partId:"e"})).toThrow(/Uncalibrated/);
});
