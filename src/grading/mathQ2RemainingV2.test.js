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
