import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {evaluateMathQ8V2} from "./mathQuestion8V2";
import {evaluateMathQ8FollowThroughV2 as evaluate} from "./mathQ8LinearFollowThroughV2";
const cases=[
 ["p2-q8-v6","(6,4);(6,16);(23,4)",
  "$1390, from 23 shirts and 4 pairs of trousers","50*23+60*4=1390"],
 ["p2-q8-v7","(6,6);(6,25);(20,6)",
  "$990, from 6 tables and 25 chairs","40*6+30*25=990"]
];
describe.each(cases)("Q8 LP carried-forward source %s",(id,previous,answer,working)=>{
 const input={questionId:id,partId:"d",response:{answer,working},
  precedingResponses:{b:previous}};
 test("single earlier vertex error is a nonadditive review signal",()=>{
  const r=evaluate(input);
  const base=evaluateMathQ8V2(input);
  expect(r.suggestedMarks).toBe(base.suggestedMarks);
  expect(r.unresolvedMarks).toBe(base.unresolvedMarks);
  expect(r.criteria).toEqual(base.criteria);
  expect(r.followThrough.suggestedMarks).toBe(1);
  expect(r.followThrough.dependency).toBe("b");
  expect(r.followThrough.criteria[0].status).toBe("candidate-follow-through");
  expect(r.publishable).toBe(false);
  expect(r.scorePublicationAllowed).toBe(false);
  expect(r.followThrough.additiveToScore).toBe(false);
  expect(r.markTotalsIncludeFollowThrough).toBe(false);
 });
 test("method evidence and exact earlier vertex are both necessary",()=>{
  for(const mutated of [
   {...input,response:{answer,working:""}},
   {...input,response:{answer,working:"I did the correct calculation"}},
   {...input,response:{answer:"incorrect",working}},
   {...input,response:{answer,working:working+" or 0"}},
   {...input,precedingResponses:{}},
   {...input,precedingResponses:{b:"(6,4)"}}
  ]){
   const r=evaluate(mutated);
   expect(r.followThrough.suggestedMarks).toBe(0);
   expect(r.publishable).toBe(false);
  }
 });
 test("correct original source optimum is not a follow-through extra mark",()=>{
  const q=PAPER2_QUESTION_BANK.find(x=>x.question_id===id);
  const model=evaluate({questionId:id,partId:"d",
   response:{answer:q.parts.find(x=>x.id==="d").answer},
   precedingResponses:{b:q.parts.find(x=>x.id==="b").answer}});
  expect(model.followThrough.suggestedMarks).toBe(0);
  expect(model.markTotalsIncludeFollowThrough).toBe(false);
 });
});
test("Q8 LP review never processes another course/question or a wrong part",()=>{
 for(const [questionId,partId] of [
  ["p2-q8-v1","d"],["p2-q8-v8","b1"],["p2-q8-v6","b"],
  ["p2-q8-v10","d"],["p2-q8-v11","d"]
 ])expect(()=>evaluate({questionId,partId})).toThrow(/Uncalibrated/);
});
