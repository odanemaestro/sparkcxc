import {evaluateMathDependentPartAdvisoryV2 as evaluate} from "./mathDependentPartAdvisoryV2";
import {evaluateMathQ6V2} from "./mathMensurationTrigonometryV2";
import {evaluateMathQ9V2} from "./mathCircleTrigonometryBearingsV2";
import {evaluateMathQ10V2} from "./mathMatricesVectorsV2";

test.each([
 ["p2-q6-v1","b",{answer:"160",working:"40*4=160"},{a:"40"},evaluateMathQ6V2],
 ["p2-q6-v7","b",{answer:"520",working:"26*20=520"},{a:"26"},evaluateMathQ6V2],
 ["p2-q9-v3","b",{answer:"71",working:"(9^2+14^2-14^2)/(2*9*14)=0.3214"},
  {a:"14.0"},evaluateMathQ9V2],
 ["p2-q10-v1","c",{answer:"(1/8)[[5,-3],[-1,2]]"},
  {b:"8"},evaluateMathQ10V2],
 ["p2-q10-v8","c",{answer:"(5,3)",working:"(3,1)+1/4*(8,8)=(5,3)"},
  {a:"(8,8)"},evaluateMathQ10V2]
])("Q%s: dependent advisory composition never adds follow-through to canonical marks",
 (questionId,partId,response,precedingResponses,canonical)=>{
  const input={questionId,partId,response,precedingResponses};
  const report=evaluate(input),original=canonical(input);
  expect(report.suggestedMarks).toBe(original.suggestedMarks);
  expect(report.unresolvedMarks).toBe(original.unresolvedMarks);
  expect(report.criteria).toEqual(original.criteria);
  expect(report.followThrough.suggestedMarks).toBe(1);
  expect(report.followThrough.publishable).toBe(false);
  expect(report.followThrough.additiveToScore).toBe(false);
  expect(report.publishable).toBe(false);
  expect(report.scorePublicationAllowed).toBe(false);
  expect(report.markTotalsIncludeFollowThrough).toBe(false);
 });
test("source-correct answers retain their original marking without extra FT marks",()=>{
 const input={questionId:"p2-q6-v1",partId:"b",
  response:{answer:"154",working:"38.5*4=154"},
  precedingResponses:{a:"38.5"}};
 const r=evaluate(input);
 expect(r.suggestedMarks).toBe(2);
 expect(r.followThrough.suggestedMarks).toBe(0);
 expect(r.markTotalsIncludeFollowThrough).toBe(false);
 expect(r.publishable).toBe(false);
});
test("invented sources and invalid part IDs cannot trigger dependent authority",()=>{
 for(const [questionId,partId] of [
  ["p2-q5-v1","b"],["p2-q9-v11","b"],
  ["p2-q10-v3","b2"],["p2-q6-v2","e"]
 ])expect(()=>evaluate({questionId,partId})).toThrow(/Uncalibrated/);
});
