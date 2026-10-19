import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathQ5V2 as grade} from "./mathStatisticsProbabilityV2";

describe.each([
 ["p2-q5-v8","b","8/12","2/3"],
 ["p2-q5-v9","b","10/15","2/3"],
 ["p2-q5-v8","c","20/132","5/33"],
 ["p2-q5-v9","c","12/210","2/35"],
 ["p2-q5-v8","d","15/132","5/44"],
 ["p2-q5-v9","d","24/210","4/35"]
])("Q5 fraction equivalence with no lowest-terms requirement: %s %s",
 (id,partId,alternate,expected)=>{
 const part=PAPER2_QUESTION_BANK.find(q=>q.question_id===id).parts.find(p=>p.id===partId);
 test("does not impose a simplest-form restriction absent from the student question",()=>{
  expect(part.prompt.toLowerCase()).not.toContain("simplest form");
  expect(part.answer).toBe(expected);
  for(const candidate of [alternate,expected]){
   const r=grade({questionId:id,partId,response:{answer:candidate}});
   expect(r.criteria.at(-1).candidateMarks).toBe(1);
   expect(r.suggestedMarks).toBe(1);
   expect(r.publishable).toBe(false);
  }
 });
 test("competing, invalid and wrong fractions remain unresolved",()=>{
  for(const candidate of [alternate+" or "+expected,"8/0","1/1","3/0","5/4"]){
   const r=grade({questionId:id,partId,response:{answer:candidate}});
   expect(r.criteria.at(-1).candidateMarks).toBeNull();
  }
 });
});
describe.each([
 ["p2-q5-v8","a","10/24"],
 ["p2-q5-v9","a","8/30"],
 ["p2-q5-v1","d","16/40"],
 ["p2-q5-v2","d","14/40"],
 ["p2-q5-v3","d","18/68"],
 ["p2-q5-v6","d","30/240"],
 ["p2-q5-v7","d","24/180"],
 ["p2-q5-v10","d","21/30"]
])("Q5 explicit lowest-terms requirement: %s %s",(id,partId,unreduced)=>{
 const part=PAPER2_QUESTION_BANK.find(q=>q.question_id===id).parts.find(p=>p.id===partId);
 test("preserves the actual published simplest-form instruction",()=>{
  expect(part.prompt.toLowerCase()).toContain("simplest form");
  expect(grade({questionId:id,partId,response:{answer:unreduced}})
   .criteria.at(-1).candidateMarks).toBeNull();
  const exact=grade({questionId:id,partId,response:{answer:part.answer}});
  expect(exact.criteria.at(-1).candidateMarks).toBe(1);
  expect(exact.publishable).toBe(false);
 });
});
