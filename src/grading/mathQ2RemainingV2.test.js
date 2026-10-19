import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathQ2RemainingV2 as grade,MATH_Q2_REMAINING_SOURCES_V2 as SOURCES} from "./mathQ2RemainingV2";
describe.each(Object.keys(SOURCES))("Q2 assembled source and advisory-only audit %s",id=>{
 const question=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
 test("preserves the complete source part and mark inventory",()=>{
  expect(question).toBeDefined();
  expect(question.marks).toBe(9);
  expect(question.parts.map(p=>p.id).sort()).toEqual(Object.keys(SOURCES[id]).sort());
  for(const part of question.parts){
   const [answer,marks]=SOURCES[id][part.id];
   expect(part.marks).toBe(marks);
   expect(part.answer).toBe(answer);
   const r=grade({questionId:id,partId:part.id});
   expect(r.suggestedMarks).toBe(0);
   expect(r.unresolvedMarks).toBe(marks);
   expect(r.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(marks);
   expect(r.publishable).toBe(false);
  }
 });
 test("source answers provide only one accuracy candidate",()=>{
  for(const part of question.parts){
   const r=grade({questionId:id,partId:part.id,response:{answer:part.answer}});
   expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,1]);
   expect(r.unresolvedMarks).toBe(part.marks-1);
  }
 });
 test("unknown and competing responses remain unresolved",()=>{
  for(const part of question.parts){
   for(const response of ["", "not sure", part.answer+" OR something else"]){
    expect(grade({questionId:id,partId:part.id,response}).suggestedMarks).toBe(0);
   }
  }
 });
});
test("rejects unknown Q2 source",()=>{
 expect(()=>grade({questionId:"p2-q2-v9",partId:"a"})).toThrow(/Uncalibrated/);
});

describe.each([
 ["p2-q2-v4","a","(x-7)/(x^2+x-2)"],
 ["p2-q2-v4","a","(x-7)/((x-1)(x+2))"],
 ["p2-q2-v5","a","(x-15)/(x^2-2x-3)"],
 ["p2-q2-v6","a","(3x-16)/((x-2)(x+3))"],
 ["p2-q2-v4","b","sqrt(3V/(πh))"],
 ["p2-q2-v7","a","13x-x^2-6"],
 ["p2-q2-v7","b","(2a+5)(2b-3)"],
 ["p2-q2-v8","a","-1x^2+5x-9"],
 ["p2-q2-v8","b","(3a+2)(2b-3)"],
 ["p2-q2-v7","c1","7 > x"],
 ["p2-q2-v8","c2","6.0"]
])("Q2 source-equivalent alternative: %s %s %s",(questionId,partId,answer)=>{
 test("accepts a verified alternative as one advisory accuracy candidate",()=>{
  const r=grade({questionId,partId,response:{answer}});
  expect(r.criteria.at(-1).candidateMarks).toBe(1);
  expect(r.suggestedMarks).toBe(1);
  expect(r.publishable).toBe(false);
  expect(r.unresolvedMarks).toBe(SOURCES[questionId][partId][1]-1);
 });
});
test("Q2 equivalent alternatives reject sign, factor, inequality and domain errors",()=>{
 for(const [questionId,partId,answer] of [
  ["p2-q2-v4","a","(x+7)/(x^2+x-2)"],
  ["p2-q2-v4","a","(x-7)/(x^2+x+2)"],
  ["p2-q2-v4","b","sqrt(3V*πh)"],
  ["p2-q2-v5","a","(x-15)/(x^2+2x-3)"],
  ["p2-q2-v6","a","(3x-16)/((x+2)(x-3))"],
  ["p2-q2-v7","a","x^2+13x-6"],
  ["p2-q2-v7","b","(2a-5)(2b-3)"],
  ["p2-q2-v8","b","(3a+2)(2b+3)"],
  ["p2-q2-v7","c1","x <= 7"],
  ["p2-q2-v8","c1","x > 7"],
  ["p2-q2-v8","c2","6 or 7"],
  ["p2-q2-v4","c","-37 or 37"]
 ]){
  const r=grade({questionId,partId,response:{answer}});
  expect(r.suggestedMarks).toBe(0);
  expect(r.unresolvedMarks).toBe(SOURCES[questionId][partId][1]);
 }
});
