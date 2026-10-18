import {reconcileMarkingCriteria,auditMarkingV2Release} from "./markingReconciliationV2";
import {evaluateObjectiveCriteria} from "./objectiveMarkingV2";

const criterion=(id,maxMarks)=>({id,maxMarks});
const decision=(id,marks,method)=>({
 criterionId:id,decision:marks>0?"award":"deny",marks,method,
 authority:"trusted-rule",evidenceRefs:["fixture:response:"+id,"fixture:rubric:"+id]
});
test("independent rubric implementations can agree on an accepted alternative",()=>{
 const criteria=[criterion("q1a",2)];
 const result=reconcileMarkingCriteria({criteria,evidence:[
  decision("q1a",2,"synonym-dictionary"),decision("q1a",2,"approved-alternative-table")
 ]});
 expect(result.parts[0].awardedMarks).toBe(2);
 expect(result.parts[0].supportingMethods).toHaveLength(2);
});
test("partial credit is bounded and reconciled only when independent rules agree",()=>{
 const criteria=[criterion("q2a",4),criterion("q2b",2)];
 const evidence=[decision("q2a",2,"method-check"),decision("q2a",2,"rubric-step-check")];
 const result=reconcileMarkingCriteria({criteria,evidence});
 expect(result.confirmedMarks).toBe(2);
 expect(result.unresolvedMarks).toBe(2);
 expect(result.canPublishFinalScore).toBe(false);
 expect(auditMarkingV2Release({reconciliation:result,expectedMaxMarks:6,
  rubricVersion:"v1",serverRubricVersion:"v1"}).canPublish).toBe(false);
});
test("conflicting methods cannot grant partial credit",()=>{
 const result=reconcileMarkingCriteria({criteria:[criterion("q2a",4)],evidence:[
  decision("q2a",2,"a"),decision("q2a",2,"b"),decision("q2a",3,"c")
 ]});
 expect(result.confirmedMarks).toBe(0);
 expect(result.unresolvedMarks).toBe(4);
});
test("follow-through steps without independently validated calculations remain unresolved",()=>{
 const criteria=[criterion("method",1),criterion("followThrough",2)];
 const result=reconcileMarkingCriteria({criteria,evidence:[
  decision("method",1,"formula-rule"),decision("method",1,"method-rubric-rule"),
  {criterionId:"followThrough",decision:"award",marks:2,method:"follow-through-suggestion",
   authority:"advisory",evidenceRefs:["fixture:working"]}
 ]});
 expect(result.confirmedMarks).toBe(1);
 expect(result.parts[1].status).toBe("unresolved");
 expect(result.canPublishFinalScore).toBe(false);
});
test("same algorithm with two run IDs does not pass independent-method threshold",()=>{
 const criteria=[criterion("q3",1)];
 const votes=[decision("q3",1,"same-rule"),decision("q3",1,"same-rule")];
 expect(reconcileMarkingCriteria({criteria,evidence:votes}).canPublishFinalScore).toBe(false);
});
test("objective answer alternatives are advisory and never become trusted marks",()=>{
 const criteria=[{id:"q4",maxMarks:1,kind:"exact",acceptedValues:["reproduction","reproducing"]}];
 const candidate=evaluateObjectiveCriteria({criteria,responses:{q4:"REPRODUCING"}});
 expect(candidate).toHaveLength(1);
 expect(candidate[0].authority).toBe("advisory");
 expect(reconcileMarkingCriteria({criteria,evidence:candidate}).canPublishFinalScore).toBe(false);
});
