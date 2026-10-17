import {reviewPobPaper2} from "./pobRubricReview";
import {POB_PAPER2_ORIGINAL_01} from "./pobPaper2Original";
describe("POB Paper 2 100-mark rubric assessment safety",()=>{
 test("covers every criterion in all 25 parts without losing a mark",()=>{
  const result=reviewPobPaper2({});
  expect(result.questions).toHaveLength(5);
  expect(result.totalParts).toBe(25);
  expect(result.availableMarks).toBe(100);
  expect(result.questions.reduce((sum,q)=>sum+q.availableMarks,0)).toBe(100);
  result.questions.forEach((question,i)=>{
   const original=POB_PAPER2_ORIGINAL_01.questions[i];
   expect(question.parts).toHaveLength(original.items.length);
   expect(question.parts.reduce((sum,part)=>sum+part.criteria.reduce((n,c)=>n+c.availableMarks,0),0)).toBe(20);
  });
 });
 test("a blank script has zero, but an answered script never receives a guessed mark",()=>{
  const empty=reviewPobPaper2({});
  expect(empty.assessedMarks).toBe(0);
  expect(empty.markStatus).toBe("unanswered");
  const first="POB-SPARK-P2-ORIGINAL-01-Q1:a";
  const response=reviewPobPaper2({[first]:"An entrepreneur organises resources and takes risks."});
  expect(response.answeredParts).toBe(1);
  expect(response.assessedMarks).toBeNull();
  expect(response.fullyAssessed).toBe(false);
  expect(response.questions[0].parts[0].criteria[0].assessedMarks).toBeNull();
  expect(response.questions[0].parts[1].assessedMarks).toBe(0);
 });
 test("diagnostics are linked to the specific question and do not count as evidence of a mark",()=>{
  const key="POB-SPARK-P2-ORIGINAL-01-Q3:a";
  const result=reviewPobPaper2({[key]:"300 / 10 = 30 bottles per labour hour"});
  const part=result.questions[2].parts[0];
  expect(part.diagnostics.calculationEvidence.expectedOperationShown).toBe(true);
  expect(part.assessedMarks).toBeNull();
  expect(part.criteria.map(criterion=>criterion.assessedMarks)).toEqual([null,null,1]);
  expect(part.confirmedCriterionMarks).toBe(1);
  expect(result.confirmedMarks).toBe(1);
 });
 test("all original parts have human readable criteria and alternatives array",()=>{
  const result=reviewPobPaper2({});
  result.questions.flatMap(q=>q.parts).forEach(part=>{
   expect(part.criteria.length).toBeGreaterThan(0);
   part.criteria.forEach(criterion=>{
    expect(criterion.requirement.trim().length).toBeGreaterThan(0);
    expect(Array.isArray(criterion.alternatives)).toBe(true);
   });
  });
 });
});
