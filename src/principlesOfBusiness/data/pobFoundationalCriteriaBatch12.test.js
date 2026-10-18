import {getPobFoundationalTask,gradePobFoundationalPart,POB_FOUNDATIONAL_CRITERIA_VERSION} from "./pobHistoricalFoundationalCriteria";
import {reviewPobHistoricalPaper2,POB_HISTORICAL_RUBRIC_REVIEW_VERSION} from "./pobHistoricalPaper2RubricReview";
import {buildPobOwnerPaper2Bank} from "./pobPaper2OwnerSourceBank";
import {POB_HISTORICAL_REVIEW_BANKS} from "./pobHistoricalArchiveRegistry";
import {gradePobDemandPricePart} from "./pobHistoricalDemandPriceMarking";
import {gradePobDevelopedPart} from "./pobHistoricalDevelopedMarking";
const paperId="POB-P2-2005-MJ";
const archive=POB_HISTORICAL_REVIEW_BANKS.find(p=>p.id===paperId);
const bank=buildPobOwnerPaper2Bank(paperId,archive.bank);
const mark=(part,answer)=>gradePobFoundationalPart(paperId,part,answer);
const review=(number,id,answer)=>reviewPobHistoricalPaper2(
  {["Q"+number+":"+id]:answer},bank,[number]).questions[0].parts.find(p=>p.part===id);

test("calibration remains scoped to three two-mark source definitions",()=>{
 for(const part of ["Q2:a","Q2:b","Q3:a"]){
   expect(getPobFoundationalTask(paperId,part)).toBeTruthy();
   const [q,id]=part.replace("Q","").split(":");
   const source=bank.questions.find(row=>row.number===Number(q)).parts.find(row=>row.id===id);
   expect(source.marks).toBe(2);
   expect(source.criteria.map(row=>row.marks)).toEqual([1,1]);
 }
 expect(getPobFoundationalTask(paperId,"Q3:b")).toBeNull();
 expect(getPobFoundationalTask("POB-P2-2010-MJ","Q2:a")).toBeNull();
 expect(POB_HISTORICAL_RUBRIC_REVIEW_VERSION).toContain("v6");
});
test("productivity gets one mark for output-input relationship and one for usable metric",()=>{
 const full="Productivity is output produced per unit of input, such as units produced per worker hour.";
 const scored=mark("Q2:a",full);
 expect(scored.confirmedMarks).toBe(2);
 expect(scored.assessedMarks).toBe(2);
 expect(scored.rubricVersion).toBe(POB_FOUNDATIONAL_CRITERIA_VERSION);
 expect(review(2,"a",full).confirmedMarks).toBe(2);
 expect(mark("Q2:a","Productivity is the output divided by input.").confirmedMarks).toBe(2);
 expect(mark("Q2:a","Productivity measures output relative to the resources used.").confirmedMarks).toBe(1);
 expect(mark("Q2:a","Productivity is input/output.").confirmedMarks).toBe(0);
 expect(mark("Q2:a","Productivity is simply how rich the owner is.").confirmedMarks).toBe(0);
});
test("capital identifies productive resources separately from a sound example",()=>{
 const full="Capital consists of man-made resources used in production, including machinery.";
 expect(mark("Q2:b",full).confirmedMarks).toBe(2);
 expect(review(2,"b",full).assessedMarks).toBe(2);
 expect(mark("Q2:b","Capital means man-made resources used to produce goods.").confirmedMarks).toBe(1);
 expect(mark("Q2:b","Capital is money in an ordinary bank account.").confirmedMarks).toBe(0);
 expect(mark("Q2:b","Capital is not a factor of production.").confirmedMarks).toBe(0);
});
test("supply requires seller quantity as well as price and time conditions",()=>{
 const full="Supply is the amount producers are willing and able to offer for sale at a given price during a specified time period.";
 expect(mark("Q3:a",full).confirmedMarks).toBe(2);
 expect(review(3,"a",full).assessedMarks).toBe(2);
 expect(mark("Q3:a","Supply is the amount sellers are willing and able to offer for sale.").confirmedMarks).toBe(1);
 expect(mark("Q3:a","Supply is what consumers want to buy at a certain price during a week.").confirmedMarks).toBe(0);
 expect(mark("Q3:a","Supply is the goods sellers are NOT willing to offer for sale.").confirmedMarks).toBe(0);
});
test("confirmed credit is bounded and unsupported wording stays unresolved",()=>{
 const partial=review(3,"a","Supply is the amount sellers are willing and able to offer for sale.");
 expect(partial.confirmedMarks).toBe(1);
 expect(partial.unresolvedMarks).toBe(1);
 expect(partial.assessedMarks).toBeNull();
 expect(partial.subcriteriaVersion).toBe(POB_FOUNDATIONAL_CRITERIA_VERSION);
 expect(review(3,"a","").status).toBe("unanswered");
 const notRecognized=mark("Q3:a","The amount of output firms put on the market under specific market conditions.");
 expect(notRecognized.confirmedMarks).toBeLessThanOrEqual(1);
 expect(notRecognized.assessedMarks).toBeNull();
});
test("other historical developed, demand and calculation rules keep their grading semantics",()=>{
 const developed=gradePobDevelopedPart(paperId,"Q2:c","Training improves worker skills.");
 expect(developed.confirmedMarks).toBe(2);
 const prices=gradePobDemandPricePart(paperId,"Q3:d","Producers cut cheese supply so its price rises.");
 expect(prices.confirmedMarks).toBe(2);
 const result=reviewPobHistoricalPaper2({"Q2:a":"Output per worker hour."},bank,[2]);
 expect(result.confirmedMarks).toBeGreaterThanOrEqual(0);
 expect(result.confirmedMarks+result.unresolvedMarks).toBeLessThanOrEqual(result.availableMarks);
});
