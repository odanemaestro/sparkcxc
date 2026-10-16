import {POB_P2_MARKING_EVIDENCE,assessPobPartEvidence,assessPobPaper2Evidence} from "./pobAssessmentEvidence";
import {POB_PAPER2_ORIGINAL_01} from "./pobPaper2Original";
test("every one of 25 original Paper 2 parts has evidence checks",()=>{
 const keys=POB_PAPER2_ORIGINAL_01.questions.flatMap(q=>q.items.map(i=>q.id+":"+i.id));
 expect(keys).toHaveLength(25);
 expect(new Set(Object.keys(POB_P2_MARKING_EVIDENCE))).toEqual(new Set(keys));
 for(const key of keys)expect(POB_P2_MARKING_EVIDENCE[key].length).toBeGreaterThan(0);
});
test("all 100 possible marks stay unawarded for non-blank scripts",()=>{
 const responses=Object.fromEntries(POB_PAPER2_ORIGINAL_01.questions.flatMap(q=>q.items.map(i=>[q.id+":"+i.id,"The business should plan carefully."])));
 const assessment=assessPobPaper2Evidence(responses);
 expect(assessment.availableMarks).toBe(100);
 expect(assessment.assessedMarks).toBeNull();
 expect(assessment.calibrated).toBe(false);
 expect(assessment.questions.flatMap(q=>q.parts).every(p=>p.assessedMarks===null)).toBe(true);
});
test("evidence flags cannot become marks just through keyword stuffing",()=>{
 const key="POB-SPARK-P2-ORIGINAL-01-Q1:e";
 const result=assessPobPartEvidence(key,"Partnership company liability finance sauce expansion.");
 expect(result.matchedConcepts).toBeGreaterThan(0);
 expect(result.supportedMarks).toBeNull();
 expect(result.unresolved).toBe(true);
});
test("different valid concept wordings can be noticed without invented grades",()=>{
 const key="POB-SPARK-P2-ORIGINAL-01-Q2:a";
 const result=assessPobPartEvidence(key,"Managers set goals and organise the staff.");
 expect(result.matchedConcepts).toBeGreaterThan(0);
 expect(result.supportedMarks).toBeNull();
});
test("the calculation method evidence is linked but not graded",()=>{
 const x=assessPobPartEvidence("POB-SPARK-P2-ORIGINAL-01-Q3:a","300 / 10 = 30 bottles per hour");
 expect(x.calculation.expectedOperationShown).toBe(true);
 expect(x.supportedMarks).toBeNull();
});
