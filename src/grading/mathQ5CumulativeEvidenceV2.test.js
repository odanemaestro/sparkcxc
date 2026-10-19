import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {MATH_Q5_SOURCES_V2} from "./mathStatisticsProbabilityV2";
import {inspectMathQ5CumulativeEvidenceV2 as inspect} from "./mathQ5CumulativeEvidenceV2";
import {evaluateMathQ5V2 as grade} from "./mathStatisticsProbabilityV2";

const ids=[
 ["p2-q5-v1","c"],["p2-q5-v2","c"],["p2-q5-v3","c"],
 ["p2-q5-v4","a"],["p2-q5-v5","a"],["p2-q5-v10","c"]
];
describe.each(ids)("Q5 independently evidenced cumulative entries %s %s",(id,partId)=>{
 const source=MATH_Q5_SOURCES_V2[id][partId];
 const q=PAPER2_QUESTION_BANK.find(x=>x.question_id===id);
 test("assembled learner-facing source values and mark total are immutable",()=>{
  const part=q.parts.find(p=>p.id===partId);
  expect(part).toBeDefined();
  expect(part.marks).toBe(source[1]);
  expect(part.answer.replace(/\s+/g,"")).toBe(source[0]);
  const full=inspect({questionId:id,partId,response:{answer:part.answer}});
  expect(full.matchedCells).toBe(full.entryCount);
  expect(full.sourceMarks).toBe(part.marks);
  expect(full.publishable).toBe(false);
  expect(full.additiveToScore).toBe(false);
  expect(full.markTotalsIncludeCellEvidence).toBe(false);
  expect(full.suggestedMarks).toBe(0);
  expect(full.unresolvedMarks).toBe(part.marks);
  expect(full.evidence.every(e=>e.candidateMarks===null)).toBe(true);
 });
 test("one incorrect internal cell preserves independent correct-cell observations",()=>{
  const vals=source[0].split(",");
  const wrong=[...vals];
  wrong[1]=String(Number(vals[1])+1);
  const inspected=inspect({questionId:id,partId,response:wrong.join(",")});
  expect(inspected.validColumnShape).toBe(true);
  expect(inspected.matchedCells).toBe(vals.length-1);
  expect(inspected.evidence[1].candidateMatchesSource).toBe(false);
  expect(inspected.evidence[0].candidateMatchesSource).toBe(true);
  expect(inspected.suggestedMarks).toBe(0);
  const graded=grade({questionId:id,partId,response:{answer:wrong.join(",")}});
  expect(graded.suggestedMarks).toBe(0);
 });
 test("omissions, guesses, repeated entries and labels cannot add evidence",()=>{
  const vals=source[0].split(",");
  for(const answer of [
   vals.slice(1).join(","),vals.join(",")+",999",
   "all correct",vals.map(()=>"-1").join(","),
   vals.join(",")+" or incorrect"
  ]){
   const r=inspect({questionId:id,partId,response:{answer}});
   expect(r.matchedCells).toBe(0);
   expect(r.publishable).toBe(false);
   expect(r.suggestedMarks).toBe(0);
  }
 });
});
test("invalid source or unrelated graph question cannot invoke cumulative checks",()=>{
 for(const [questionId,partId] of [
  ["p2-q5-v8","c"],["p2-q5-v4","b"],["p2-q5-v1","b"],
  ["p2-q5-v11","c"],["p2-q6-v1","a"]
 ])expect(()=>inspect({questionId,partId})).toThrow(/Uncalibrated/);
});
