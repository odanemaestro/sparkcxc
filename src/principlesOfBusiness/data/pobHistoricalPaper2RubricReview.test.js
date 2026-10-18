import {POB_HISTORICAL_REVIEW_BANKS} from "./pobHistoricalArchiveRegistry";
import {buildPobOwnerPaper2Bank} from "./pobPaper2OwnerSourceBank";
import {reviewPobHistoricalPaper2} from "./pobHistoricalPaper2RubricReview";
import {defaultPobArchiveSelection} from "../../grading/pobArchiveExaminer";

const sources=POB_HISTORICAL_REVIEW_BANKS.filter(r=>r.paper===2)
 .map(record=>({record,paper:buildPobOwnerPaper2Bank(record.id,record.bank)}))
 .filter(entry=>entry.paper);

test("all 20 historical papers have complete independently reviewable 100-mark schemes",()=>{
 expect(sources).toHaveLength(20);
 for(const {paper} of sources){
  const selected=defaultPobArchiveSelection(paper);
  const result=reviewPobHistoricalPaper2({},paper,selected);
  expect(result.availableMarks).toBe(100);
  expect(result.assessedMarks).toBe(0);
  expect(result.unresolvedMarks).toBe(0);
  expect(result.fullyAssessed).toBe(true);
  expect(result.questions.reduce((n,q)=>n+q.availableMarks,0)).toBe(100);
  expect(result.questions.flatMap(q=>q.parts).every(p=>
   p.criteria.length&&p.criteria.reduce((n,c)=>n+c.availableMarks,0)===p.availableMarks)).toBe(true);
 }
});
test("the same complete SPARK worked answer earns its authored marks without optional AI",()=>{
 const {paper}=sources.find(({record})=>record.id==="POB-P2-2022-JAN");
 const parts=paper.questions[0].parts,part=parts[0];
 const key="Q1:"+part.id;
 const result=reviewPobHistoricalPaper2({[key]:part.modelAnswer},paper,[1,2,3,4,5]);
 expect(result.availableMarks).toBe(100);
 expect(result.confirmedMarks).toBe(part.marks);
 expect(result.assessedMarks).toBeNull();
 expect(result.unresolvedMarks).toBe(0);
 expect(result.questions[0].parts[0].status).toBe("verified-model-match");
 expect(result.questions[0].parts[0].criteria.reduce((n,c)=>n+c.assessedMarks,0)).toBe(part.marks);
});
test("valid alternative phrasing remains pending rather than being silently failed",()=>{
 const {paper}=sources.find(({record})=>record.id==="POB-P2-2022-JAN");
 const answer="I want to earn income, set my own direction, use my talents and solve local needs.";
 const result=reviewPobHistoricalPaper2({"Q1:a":answer},paper,[1,2,3,4,5]);
 expect(result.confirmedMarks).toBe(0);
 expect(result.assessedMarks).toBeNull();
 expect(result.unresolvedMarks).toBe(4);
 expect(result.questions[0].parts[0].assessedMarks).toBeNull();
 expect(result.questions[0].parts[0].status).toBe("requires-rubric-assessment");
});
test("isolated matching keywords never receive inferred marks",()=>{
 const {paper}=sources.find(({record})=>record.id==="POB-P2-2022-JAN");
 const result=reviewPobHistoricalPaper2({"Q1:a":"Profit profit profit, independence."},paper,[1,2,3,4,5]);
 expect(result.assessedMarks).toBeNull();
 expect(result.confirmedMarks).toBe(0);
 expect(result.unresolvedMarks).toBe(4);
});
test("original optional question combinations preserve a 100-mark ceiling",()=>{
 const {paper}=sources.find(({record})=>record.id==="POB-P2-2005-MJ");
 const result=reviewPobHistoricalPaper2({},paper,[1,2,3,5,7,9]);
 expect(result.availableMarks).toBe(100);
 expect(result.questions.map(q=>q.number)).toEqual([1,2,3,5,7,9]);
 expect(()=>reviewPobHistoricalPaper2({},paper,[1,2,2,5,7,9])).toThrow("invalid_selected_questions");
});
