import {auditAdjudicationEvidence,adjudicateMarkingEvidence} from "./markingAdjudicationV2";
const criteria=[{id:"a",maxMarks:2}];
const evidence=(method,run,decision="award",marks=2)=>({
 criterionId:"a",decision,marks,method,graderRunId:run,
 authority:"trusted-rule",evidenceRefs:["rubric:a","response:a"]
});
test("two different runs reconcile evidence but never authorize publication",()=>{
 const r=adjudicateMarkingEvidence({criteria,evidence:[evidence("exact","run1"),evidence("math","run2")]});
 expect(r.reconciliation.confirmedMarks).toBe(2);
 expect(r.reviewQueue).toEqual([]);
 expect(r.canPublish).toBe(false);
});
test("duplicate grader run fails independent verification",()=>{
 const r=adjudicateMarkingEvidence({criteria,evidence:[evidence("exact","same"),evidence("math","same")]});
 expect(r.issues).toContain("reused-grader-run");
});
test("conflicts go to the automated review queue",()=>{
 const r=adjudicateMarkingEvidence({criteria,evidence:[evidence("exact","run1"),evidence("math","run2","deny",0)]});
 expect(r.reviewQueue[0].reason).toBe("conflicting-evidence");
 expect(r.reconciliation.unresolvedMarks).toBe(2);
});
test("unknown criterion and missing runs fail closed",()=>{
 expect(auditAdjudicationEvidence({criteria,evidence:[{...evidence("exact","run1"),criterionId:"b"}]}).issues).toContain("unknown-criterion");
 expect(auditAdjudicationEvidence({criteria,evidence:[evidence("exact","")]}).issues).toContain("missing-grader-run");
});
test("duplicate or contradictory method decisions are rejected",()=>{
 const r=auditAdjudicationEvidence({criteria,evidence:[evidence("exact","run1"),evidence("exact","run1","deny",0)]});
 expect(r.issues).toContain("duplicate-method-decision");
});
