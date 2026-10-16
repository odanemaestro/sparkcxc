import {gradePobArithmeticPart,POB_DETERMINISTIC_ARITHMETIC_KEYS} from "./pobArithmeticMarks";
import {reviewPobPaper2} from "./pobRubricReview";
import {buildTrustedAssessment} from "../../grading/serverAssessment";
import {POB_PAPER2_ORIGINAL_01} from "./pobPaper2Original";
const Q="POB-SPARK-P2-ORIGINAL-01-Q";
const K=name=>Q+name;
const attempt=responses=>({
 subject_id:"principles-of-business",paper:"02",status:"submitted",
 bank_version:POB_PAPER2_ORIGINAL_01.id,metadata:{paper_id:POB_PAPER2_ORIGINAL_01.id},
 response_snapshot:responses
});
describe("Mark-by-mark arithmetic scoring in SPARK original POB Paper 2",()=>{
 test("four arithmetic parts carry 13 distinct evidence-only rubric marks",()=>{
  expect(POB_DETERMINISTIC_ARITHMETIC_KEYS).toEqual([K("3:a"),K("3:c"),K("5:a"),K("5:b")]);
  const answers={
   [K("3:a")]:"Labour productivity is output per labour hour. 300 / 10 = 30 bottles per labour hour.",
   [K("3:c")]:"Selling price J$250; variable cost J$130; 250 - 130 = 120. Contribution helps cover fixed costs.",
   [K("5:a")]:"Revenue J$850,000, cost of sales J$470,000. 850,000 - 470,000 = 380,000 gross profit.",
   [K("5:b")]:"Gross profit J$380,000, operating expenses J$260,000. 380,000 - 260,000 = 120,000."
  };
  const expected=[3,4,3,3];
  const result=Object.entries(answers).map(([key,value],i)=>{
   const row=gradePobArithmeticPart(key,value);
   expect(row).toMatchObject({marks:expected[i],maxMarks:expected[i],reliable:true});
   expect(row.criterionMarks).toEqual(Array(expected[i]).fill(1));
   return row.marks;
  });
  expect(result.reduce((a,b)=>a+b,0)).toBe(13);
  const marker=buildTrustedAssessment(attempt(answers));
  expect(marker.deterministicScore).toBe(13);
  expect(marker.items).toHaveLength(0);
  const review=reviewPobPaper2(answers);
  expect(review.confirmedMarks).toBe(13);
  expect(review.unresolvedParts).toBe(0);
  expect(review.assessedMarks).toBe(13);
 });
 test("partial credit is per criterion, not right-number-only or keyword-only",()=>{
  expect(gradePobArithmeticPart(K("3:a"),"300 / 10 = 30 bottles per labour hour").criterionMarks).toEqual([0,1,1]);
  expect(gradePobArithmeticPart(K("3:a"),"Labour productivity is output per labour hour. 300 / 10 = 25 bottles per hour.").criterionMarks).toEqual([1,1,0]);
  expect(gradePobArithmeticPart(K("3:c"),"Selling price J$250 and variable cost J$130. The contribution helps cover fixed costs.").criterionMarks).toEqual([1,1,0,1]);
  expect(gradePobArithmeticPart(K("5:a"),"Revenue J$850,000. The cost of sales J$470,000.").criterionMarks).toEqual([1,1,0]);
  expect(gradePobArithmeticPart(K("5:b"),"Operating expenses J$260,000, gross profit J$380,000. 380,000 + 260,000 = 120,000").criterionMarks).toEqual([1,1,0]);
 });
 test("unsupported calculations and empty responses never generate marks",()=>{
  expect(gradePobArithmeticPart(K("1:e"),"Perfect solution")).toBeNull();
  expect(gradePobArithmeticPart(K("3:a"),"")).toMatchObject({marks:0,criterionMarks:[0,0,0]});
  expect(gradePobArithmeticPart(K("5:a"),"Net sales J$8500000. Cost of sales J$470,000.").criterionMarks).toEqual([0,1,0]);
 });
 test("server and client agree on partial arithmetic criteria without double-grading",()=>{
  const answers={[K("3:a")]:"Labour productivity is output per labour hour. 300 / 10 = 30 bottles per labour hour.",[K("1:e")]:"A company can raise finance from investors but costs more to register."};
  const marker=buildTrustedAssessment(attempt(answers));
  const review=reviewPobPaper2(answers);
  expect(marker.deterministicScore).toBe(3);
  expect(marker.items).toHaveLength(4);
  expect(marker.items.map(item=>item.id)).toEqual([1,2,3,4].map(i=>K("1:e")+":criterion-"+i));
  expect(marker.items.reduce((n,item)=>n+item.maxMarks,0)).toBe(7);
  expect(review.confirmedMarks).toBe(3);
  expect(review.unresolvedParts).toBe(1);
  expect(review.assessedMarks).toBeNull();
  const row=review.questions[2].parts[0];
  expect(row.status).toBe("graded-arithmetic");
  expect(row.criteria.map(c=>c.assessedMarks)).toEqual([1,1,1]);
 });
});
