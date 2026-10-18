import {reviewPobHistoricalPaper2,POB_HISTORICAL_RUBRIC_REVIEW_VERSION} from "./pobHistoricalPaper2RubricReview";
import {buildPobOwnerPaper2Bank} from "./pobPaper2OwnerSourceBank";
import {POB_HISTORICAL_REVIEW_BANKS} from "./pobHistoricalArchiveRegistry";
import {defaultPobArchiveSelection} from "../../grading/pobArchiveExaminer";
import {auditHistoricalWrittenRubricBank} from "../../grading/historicalRubricCompleteness";

const part=(paper,answers)=>reviewPobHistoricalPaper2(answers,paper,[1]).questions[0].parts[0];
const synthetic={
 id:"POB-P2-SOURCE-BENCH",
 questions:[{number:1,marks:3,parts:[{id:"a",marks:3,
 modelAnswer:"Skilled workers develop practical skills through training. Foreign trade expands regional sales and creates jobs.",
 criteria:[{marks:2,rule:"Explain how worker training raises ability"},
           {marks:1,rule:"Identify another benefit of trade"}]}]}]
};

test("a weighted POB criterion cannot award two marks from one recognised claim",()=>{
 const answer="Skilled workers develop practical skills through training.";
 const result=part(synthetic,{"Q1:a":answer});
 expect(result.rubricComplete).toBe(true);
 expect(result.confirmedMarks).toBe(1);
 expect(result.unresolvedMarks).toBe(2);
 expect(result.assessedMarks).toBeNull();
 expect(result.status).toBe("requires-rubric-assessment");
});
test("a literal full source answer retains credit across independently authored criteria",()=>{
 const result=part(synthetic,{"Q1:a":synthetic.questions[0].parts[0].modelAnswer});
 expect(result.confirmedMarks).toBe(3);
 expect(result.unresolvedMarks).toBe(0);
 expect(result.assessedMarks).toBe(3);
});
test("missing or mismatched POB criteria account for EVERY unresolved mark",()=>{
 const invalid={...synthetic,questions:[{number:1,marks:3,parts:[{
  id:"a",marks:3,modelAnswer:"Workers receive training.",criteria:[]}]}]};
 const result=reviewPobHistoricalPaper2({"Q1:a":"Training helps workers."},invalid,[1]);
 const scored=result.questions[0].parts[0];
 expect(scored.confirmedMarks).toBe(0);
 expect(scored.unresolvedMarks).toBe(3);
 expect(scored.assessedMarks).toBeNull();
 expect(scored.rubricComplete).toBe(false);
 expect(result.unresolvedMarks).toBe(3);
 expect(result.questions[0].unresolvedMarks).toBe(3);
 expect(result.rubricIncompleteParts).toBe(1);
 expect(result.fullyAssessed).toBe(false);
 expect(result.assessedMarks).toBeNull();
});
test("blank POB answers do not acquire invented marks even under incomplete rubrics",()=>{
 const invalid={...synthetic,questions:[{number:1,marks:3,parts:[{
  id:"a",marks:3,modelAnswer:"Workers receive training.",criteria:[]}]}]};
 const result=reviewPobHistoricalPaper2({},invalid,[1]);
 expect(result.confirmedMarks).toBe(0);
 expect(result.unresolvedMarks).toBe(0);
 expect(result.assessedMarks).toBeNull();
});
test("the 20 supplied owner-transcribed POB Paper 2 archives expose mark-level rubric gaps",()=>{
 const rows=POB_HISTORICAL_REVIEW_BANKS.filter(r=>r.paper===2)
  .map(r=>buildPobOwnerPaper2Bank(r.id,r.bank)).filter(Boolean);
 expect(rows).toHaveLength(20);
 const audits=rows.map(paper=>{
  const selection=defaultPobArchiveSelection(paper);
  return auditHistoricalWrittenRubricBank({
   subjectId:"principles-of-business",paperId:paper.id,questions:paper.questions,
   selectedQuestionIds:selection,expectedSelectedMarks:100
  });
 });
 expect(audits.every(a=>a.markStructureValid)).toBe(true);
 expect(audits.every(a=>a.selectedMarks===100)).toBe(true);
 expect(audits.some(a=>a.gaps.some(g=>g.reason==="missing-criterion-evidence"))).toBe(true);
 expect(audits.some(a=>a.gaps.some(g=>g.reason==="multi-mark-criterion-needs-subcriteria"))).toBe(true);
 expect(POB_HISTORICAL_RUBRIC_REVIEW_VERSION).toContain("v3");
});
