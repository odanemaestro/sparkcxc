import {auditPaper2SourceBank} from "./paper2SourceBankAudit";
import {CHEMISTRY_PAPER2_PRACTICE_SETS} from "../chemistry/data/chemistryPaper2Bank";
import {PHYSICS_PAPER2_PAPERS} from "../physics/paper2/physicsPaper2Bank";
import {FNH_PAPER2_ORIGINAL_SET_ONE} from "../fnh/data/fnhPaper2Bank";
import {FNH_PAPER2_ORIGINAL_SET_TWO} from "../fnh/data/fnhPaper2SetTwo";
import itData from "../informationTechnology/practice/itPaper2Data.json";
import {SOCIAL_STUDIES_PAPER2,SOCIAL_STUDIES_PAPER2_TOTAL_MARKS} from "../socialStudies/data/socialStudiesExamBank";

const papers=[
 ...CHEMISTRY_PAPER2_PRACTICE_SETS.map(p=>["chemistry",p.id,p.questions,100]),
 ...PHYSICS_PAPER2_PAPERS.map(p=>["physics",p.paper_id,p.questions,100]),
 ["food-nutrition-and-health","FNH-original-01",FNH_PAPER2_ORIGINAL_SET_ONE,96],
 ["food-nutrition-and-health","FNH-original-02",FNH_PAPER2_ORIGINAL_SET_TWO,96],
 ...itData.papers.map(p=>["information-technology",p.id,p.questions,itData.format.marks]),
 ["social-studies","social-studies-original",SOCIAL_STUDIES_PAPER2,SOCIAL_STUDIES_PAPER2_TOTAL_MARKS],
];

test.each(papers)("%s / %s: source question and paper marks reconcile", (subjectId,paperId,questions,marks)=>{
 const report=auditPaper2SourceBank({subjectId,paperId,questions,expectedPaperMarks:marks});
 expect(report.critical).toEqual([]);
 expect(report.sourceStructureValid).toBe(true);
 expect(report.totalMarks).toBe(marks);
 expect(report.parts).toBeGreaterThan(0);
});
test("cross-course audit does not confuse mark-allocation integrity with complete written rubrics",()=>{
 const reports=papers.map(([subjectId,paperId,questions,expectedPaperMarks])=>
   auditPaper2SourceBank({subjectId,paperId,questions,expectedPaperMarks}));
 expect(reports).toHaveLength(22);
 expect(reports.every(row=>row.sourceStructureValid)).toBe(true);
 expect(reports.reduce((sum,row)=>sum+row.questions,0)).toBeGreaterThan(90);
 // Source questions can have correct totals while one scheme point still
 // describes several independently awarded marks.
 expect(reports.some(row=>row.rubricReviewRequired)).toBe(true);
 expect(reports.some(row=>row.warnings.some(w=>w.startsWith("under-specified-subcriteria:")))).toBe(true);
});
test("source audit refuses duplicate part identifiers and mismatched totals",()=>{
 const paper=[{id:"Q1",totalMarks:4,parts:[
   {id:"a",marks:2,modelPoints:["Reason one","Reason two"]},
   {id:"a",marks:1,modelPoints:["Reason three"]}
 ]}];
 const result=auditPaper2SourceBank({
  subjectId:"example",paperId:"duplicate",questions:paper,expectedPaperMarks:4
 });
 expect(result.sourceStructureValid).toBe(false);
 expect(result.critical).toContain("duplicate-part-id:Q1:a");
 expect(result.critical).toContain("question-total-mismatch:Q1");
 expect(result.critical).toContain("paper-total-mismatch");
});
test("source audit reports an incomplete multi-mark scheme as needing calibration, not an automatic zero",()=>{
 const result=auditPaper2SourceBank({subjectId:"chemistry",paperId:"fixture",
   expectedPaperMarks:4,questions:[{id:"q",totalMarks:4,
     parts:[{id:"a",marks:4,markScheme:{points:["A developed causal explanation."]}}]}]});
 expect(result.critical).toEqual([]);
 expect(result.rubricReviewRequired).toBe(true);
 expect(result.warnings).toContain("under-specified-subcriteria:q:a");
});


test("essay questions preserve separately awarded content and organisation marks",()=>{
 const essay=SOCIAL_STUDIES_PAPER2.find(q=>q.id==="ss-p2-q5");
 const report=auditPaper2SourceBank({subjectId:"social-studies",
   paperId:"essay-provenance",questions:[essay],expectedPaperMarks:22});
 expect(report.critical).toEqual([]);
 expect(report.totalMarks).toBe(22);
 expect(report.byQuestion[0].parts).toBe(2);
 expect(report.warnings).toEqual(expect.arrayContaining([
   "under-specified-subcriteria:ss-p2-q5:essay-content"
 ]));
});
