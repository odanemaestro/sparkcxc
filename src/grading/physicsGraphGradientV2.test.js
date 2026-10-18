import physics from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import {evaluatePhysicsGraphGradient,evaluatePhysicsGraphPressure} from "./physicsGraphGradientV2";
const q=physics.questions[0],c=q.parts.find(p=>p.id==="c"),d=q.parts.find(p=>p.id==="d");
test("source has 2/1/1 gradient and 1/1/1 pressure mark allocations",()=>{
 expect(c.criteria.map(x=>[x.code,x.kind,x.marks]))
  .toEqual([["M1","M",2],["A1","A",1],["B1","B",1]]);
 expect(d.criteria.map(x=>[x.code,x.kind,x.marks]))
  .toEqual([["M1","M",1],["M2","M",1],["A1","A",1]]);
 expect(c.markerNote).toMatch(/kPa\/cm⁻³/);
 expect(d.markerNote).toMatch(/Follow through/);
});
test("the drawn-triangle method mark remains unresolved even for exact gradient",()=>{
 const r=evaluatePhysicsGraphGradient({response:{answer:"gradient = 2400 kPa cm³"}});
 expect(r.suggestedMarks).toBe(2);
 expect(r.unresolvedMarks).toBe(2);
 expect(r.criteria[0].candidateMarks).toBeNull();
 expect(r.publishable).toBe(false);
});
test("both source-approved gradient units are recognised",()=>{
 for(const answer of ["2400 kPa cm³","2400 kPa/cm⁻³","2.4 × 10³ kPa cm³"]){
  const r=evaluatePhysicsGraphGradient({response:{answer}});
  expect(r.criteria[1].candidateMarks).toBe(1);
  expect(r.criteria[2].candidateMarks).toBe(1);
 }
});
test("graph's plotted scale of 24 is not mistaken for physical gradient 2400",()=>{
 const r=evaluatePhysicsGraphGradient({response:{answer:"24 kPa cm³"}});
 expect(r.criteria[1].candidateMarks).toBeNull();
});
test("gradient without correct units can receive A1, but not B1",()=>{
 const r=evaluatePhysicsGraphGradient({response:{answer:"2400"}});
 expect(r.suggestedMarks).toBe(1);
 expect(r.criteria[2].candidateMarks).toBeNull();
});
test("source pressure range accepts boundaries but never invents graph-read M2",()=>{
 for(const value of [128,133,138]){
  const r=evaluatePhysicsGraphPressure({response:{answer:value+" kPa",working:"1/18=0.0556"}});
  expect(r.suggestedMarks).toBe(2);
  expect(r.criteria[1].candidateMarks).toBeNull();
 }
});
test("calculation-only alternative gives M1 and A1, not M2",()=>{
 const r=evaluatePhysicsGraphPressure({response:{answer:"133 kPa",working:"2400 / 18 = 133.3"}});
 expect(r.suggestedMarks).toBe(2);
 expect(r.unresolvedMarks).toBe(1);
});
test("follow-through from student's earlier wrong but unit-bearing gradient",()=>{
 const r=evaluatePhysicsGraphPressure({
  response:{answer:"116.7 kPa",working:"2100/18=116.7"},
  previousGradientResponse:{answer:"2100 kPa cm³"}
 });
 expect(r.criteria[0].candidateMarks).toBe(1);
 expect(r.criteria[2].candidateMarks).toBe(1);
 expect(r.criteria[2].reason).toBe("supported-earlier-gradient-follow-through");
 expect(r.criteria[1].candidateMarks).toBeNull();
});
test("unitless previous gradient and unsupported pressure units block A1",()=>{
 const a=evaluatePhysicsGraphPressure({response:{answer:"116.7 kPa"},
  previousGradientResponse:{answer:"2100"}});
 expect(a.criteria[2].candidateMarks).toBeNull();
 const b=evaluatePhysicsGraphPressure({response:{answer:"133 Pa",working:"1/18=0.0556"}});
 expect(b.criteria[2].candidateMarks).toBeNull();
});
test("no working only identifies A1 and ambiguous answers remain unresolved",()=>{
 const r=evaluatePhysicsGraphPressure({response:{answer:"133 kPa"}});
 expect(r.suggestedMarks).toBe(1);
 const a=evaluatePhysicsGraphPressure({response:{answer:"133 kPa or 120 kPa"}});
 expect(a.criteria[2].candidateMarks).toBeNull();
 expect(a.publishable).toBe(false);
});
