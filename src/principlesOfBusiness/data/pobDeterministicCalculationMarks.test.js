import {gradePobCalculationResultPart as grade,POB_DETERMINISTIC_CALC_KEYS} from "./pobDeterministicCalculationMarks";
import {reviewPobPaper2} from "./pobRubricReview";
const P="POB-SPARK-P2-ORIGINAL-01-Q";
describe("Strict POB Paper 2 numerical-result awards",()=>{
 test("only four explicitly permitted rubric parts can earn calculation-result marks",()=>{
  expect(POB_DETERMINISTIC_CALC_KEYS).toHaveLength(4);
  expect(grade(P+"1:a","30")).toBeNull();
  const cases=[
   [P+"3:a","300 / 10 = 30 bottles per labour hour"],
   [P+"3:c","250 - 130 = 120 per bottle"],
   [P+"5:a","850,000 - 470,000 = 380,000 gross profit"],
   [P+"5:b","380,000 - 260,000 = 120,000 net profit"]
  ];
  for(const [key,response] of cases){
   expect(grade(key,response)).toMatchObject({assessedCriterionMarks:1,criterionIndex:2,source:"strict-calculation-result-v1"});
  }
 });
 test("rejects copied results, wrong arithmetic, missing units, negation and contradictory numeric claims",()=>{
  const key=P+"3:a";
  for(const response of [
   "30 bottles per labour hour",
   "300 / 10 = 20 bottles per labour hour",
   "300 / 10 = 30",
   "300 / 10 = 30 bottles per labour hour but answer: 99",
   "The result is not 30 bottles per labour hour, 300 / 10 = 30 bottles per labour hour is wrong",
   "300 / 10 = 30 bottles per labour hour and then 45",
   "The number 300 and the number 10 give 30 bottles per labour hour"
  ])expect(grade(key,response)?.assessedCriterionMarks).not.toBe(1);
 });
 test("award remains limited to one verified result criterion, not the full 3- or 4-mark part",()=>{
  const k=P+"5:a";
  const r=reviewPobPaper2({[k]:"850,000 - 470,000 = 380,000 gross profit"});
  const p=r.questions[4].parts[0];
  expect(p.status).toBe("partially-graded-calculation");
  expect(p.assessedMarks).toBeNull();
  expect(p.confirmedCriterionMarks).toBe(1);
  expect(p.criteria.map(c=>c.assessedMarks)).toEqual([null,null,1]);
  expect(r.confirmedMarks).toBe(1);
  expect(r.assessedMarks).toBeNull();
  expect(r.unresolvedParts).toBe(1);
  expect(r.markStatus).toBe("partially-assessed");
 });
 test("confirmed marks aggregate without claiming ungraded extended-answer credit",()=>{
  const answers={
   [P+"3:a"]:"300 / 10 = 30 bottles per labour hour",
   [P+"3:c"]:"250 - 130 = 120 per bottle",
   [P+"5:a"]:"850,000 - 470,000 = 380,000 gross profit",
   [P+"5:b"]:"380,000 - 260,000 = 120,000 net profit",
   [P+"2:a"]:"planning and organising"
  };
  const r=reviewPobPaper2(answers);
  expect(r.confirmedMarks).toBe(6);
  expect(r.fullyAssessed).toBe(false);
  expect(r.assessedMarks).toBeNull();
  expect(r.unresolvedParts).toBe(4);
  expect(r.availableMarks).toBe(100);
 });
});