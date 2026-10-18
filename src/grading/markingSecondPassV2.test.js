import {suggestSecondPassEvidence,runMarkingSecondPass} from "./markingSecondPassV2";
const criteria=[{id:"q1",maxMarks:2,acceptedPhrases:["blood vessels widen","vasodilation"]}];
test("identifies accepted alternative terms without certifying marks",()=>{
 const result=runMarkingSecondPass({criteria,responses:{q1:"There is vasodilation and more heat is lost."}});
 expect(result.suggestions[0].matchedPhrases).toEqual(["vasodilation"]);
 expect(result.reconciliation.unresolvedMarks).toBe(2);
 expect(result.publishable).toBe(false);
});
test("possible negation remains unverified",()=>{
 const r=suggestSecondPassEvidence({criteria,responses:{q1:"There is no vasodilation."}});
 expect(r[0].flags).toContain("possible-negation");
 expect(r[0].decision).toBe("unresolved");
});
test("no phrase match is not an automatic incorrect grade",()=>{
 const r=runMarkingSecondPass({criteria,responses:{q1:"Heat escapes when the skin's vessels expand."}});
 expect(r.reconciliation.confirmedMarks).toBe(0);
 expect(r.reconciliation.unresolvedMarks).toBe(2);
});
test("distinct rule agreement remains visible but does not authorize server publication",()=>{
 const firstPassEvidence=["exact","numeric"].map(method=>({
  criterionId:"q1",decision:"award",marks:2,method,authority:"trusted-rule",evidenceRefs:["rubric:q1"]
 }));
 const r=runMarkingSecondPass({criteria,responses:{q1:"vasodilation"},firstPassEvidence});
 expect(r.reconciliation.canPublishFinalScore).toBe(true);
 expect(r.publishable).toBe(false);
});
test("reject malformed criteria",()=>{
 expect(()=>suggestSecondPassEvidence({criteria:[{id:"q1",maxMarks:1}]})).toThrow();
});
