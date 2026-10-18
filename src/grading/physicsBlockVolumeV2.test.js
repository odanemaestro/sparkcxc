import paper from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import {evaluatePhysicsBlockVolume} from "./physicsBlockVolumeV2";
const source=paper.questions[1].parts.find(p=>p.id==="bi");
test("source Physics volume question has M1/A1 and correct unit",()=>{
 expect(source.marks).toBe(2);
 expect(source.criteria.map(c=>c.code)).toEqual(["M1","A1"]);
 expect(source.criteria[1].check.value).toBe(0.001);
 expect(source.criteria[1].check.unit).toBe("m³");
});
test("converted lengths plus correct final value yields two advisory marks",()=>{
 const r=evaluatePhysicsBlockVolume({working:"0.20 × 0.10 × 0.050",answer:"0.001 m³"});
 expect(r.suggestedMarks).toBe(2);expect(r.publishable).toBe(false);
});
test("cm cubed working can be method evidence without accuracy mark",()=>{
 const r=evaluatePhysicsBlockVolume({working:"20 x 10 x 5 = 1000 cm³",answer:"1000 cm³"});
 expect(r.suggestedMarks).toBe(1);expect(r.unresolvedMarks).toBe(1);
});
test("correct numerical value without unit leaves A1 unresolved",()=>{
 const r=evaluatePhysicsBlockVolume({answer:"0.001"});
 expect(r.suggestedMarks).toBe(0);expect(r.unresolvedMarks).toBe(2);
});
test("wrong calculation is never given candidate credit",()=>{
 const r=evaluatePhysicsBlockVolume({working:"0.20 + 0.10 + 0.05",answer:"0.35 m³"});
 expect(r.suggestedMarks).toBe(0);
});
