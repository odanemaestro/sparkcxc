import {reconcileMarkingCriteria,auditMarkingV2Release} from "./markingReconciliationV2";

const criteria=[{id:"q1.a",maxMarks:2},{id:"q1.b",maxMarks:1}];
const vote=(criterionId,decision,marks,method,authority="trusted-rule")=>({
  criterionId,decision,marks,method,authority,
  evidenceRefs:["answer:q1","rubric:v1"]
});
test("independent rule agreement verifies awarded and rejected criteria",()=>{
  const evidence=[
    vote("q1.a","award",2,"exact-rubric"),vote("q1.a","award",2,"numeric-check"),
    vote("q1.b","deny",0,"pattern-check"),vote("q1.b","deny",0,"concept-check")
  ];
  const result=reconcileMarkingCriteria({criteria,evidence});
  expect(result.canPublishFinalScore).toBe(true);
  expect(result.confirmedMarks).toBe(2);
  expect(result.unresolvedMarks).toBe(0);
  expect(auditMarkingV2Release({reconciliation:result,expectedMaxMarks:3,
    rubricVersion:"v1",serverRubricVersion:"v1"})).toEqual({
      canPublish:true,issues:[],score:2
    });
});
test("single pass and semantic-only marks cannot certify final result",()=>{
  const evidence=[vote("q1.a","award",2,"semantic","model"),vote("q1.b","deny",0,"rule1")];
  const result=reconcileMarkingCriteria({criteria,evidence});
  expect(result.canPublishFinalScore).toBe(false);
  expect(result.unresolvedMarks).toBe(3);
  expect(auditMarkingV2Release({reconciliation:result,expectedMaxMarks:3,
    rubricVersion:"v1",serverRubricVersion:"v1"}).score).toBeNull();
});
test("conflicting trusted methods cannot be counted as verified",()=>{
  const result=reconcileMarkingCriteria({criteria:[criteria[0]],evidence:[
    vote("q1.a","award",2,"one"),vote("q1.a","award",2,"two"),
    vote("q1.a","deny",0,"three")
  ]});
  expect(result.parts[0].reason).toBe("conflicting-evidence");
  expect(result.confirmedMarks).toBe(0);
  expect(result.unresolvedMarks).toBe(2);
});
test("duplicate criterion IDs and invalid marks reject input",()=>{
  expect(()=>reconcileMarkingCriteria({criteria:[criteria[0],criteria[0]]})).toThrow();
  const result=reconcileMarkingCriteria({criteria:[criteria[0]],evidence:[
    vote("q1.a","award",3,"one"),vote("q1.a","award",3,"two")
  ]});
  expect(result.canPublishFinalScore).toBe(false);
});
test("wrong rubric blocks release even when marks reconcile",()=>{
  const result=reconcileMarkingCriteria({criteria:[criteria[0]],evidence:[
    vote("q1.a","award",2,"one"),vote("q1.a","award",2,"two")
  ]});
  expect(auditMarkingV2Release({reconciliation:result,expectedMaxMarks:2,
    rubricVersion:"v0",serverRubricVersion:"v1"}).issues).toContain("rubric-version-mismatch");
});
