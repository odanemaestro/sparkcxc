import physics from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import {mapPhysicsPaper2} from "./paper2TechnicalAdaptersV2";
import {reconcileMarkingCriteria} from "./markingReconciliationV2";

const q=physics.questions[0];
const p=q.parts.find(part=>part.id==="a");
const id=q.question_id+"::"+p.id;

test("actual Physics Q1(a) preserves 6 marks and calculation criteria",()=>{
 expect(p.prompt).toMatch(/Complete Table 1/);
 expect(p.marks).toBe(6);
 expect(p.criteria.reduce((sum,c)=>sum+c.marks,0)).toBe(6);
 const mapped=mapPhysicsPaper2({paper:physics});
 expect(mapped.criteria.find(c=>c.id===id)).toMatchObject({maxMarks:6,criterionCount:p.criteria.length});
});

test("Physics alternative rounding remains a rubric note, not automatic unverified credit",()=>{
 expect(p.markerNote).toMatch(/Accept 8\.3, 5\.0 and 3\.3/);
 const result=reconcileMarkingCriteria({criteria:[{id,maxMarks:p.marks}],evidence:[]});
 expect(result.unresolvedMarks).toBe(6);
 expect(result.canPublishFinalScore).toBe(false);
});

test("Physics individual method and accuracy criteria cannot be collapsed into an invented award",()=>{
 expect(p.criteria.some(c=>c.kind==="M")).toBe(true);
 expect(p.criteria.every(c=>typeof c.description==="string"&&c.description.length>0)).toBe(true);
 const result=reconcileMarkingCriteria({criteria:p.criteria.map((c,i)=>({
  id:id+":"+String(c.code||i),maxMarks:c.marks
 })),evidence:[]});
 expect(result.confirmedMarks).toBe(0);
 expect(result.unresolvedMarks).toBe(p.marks);
});
