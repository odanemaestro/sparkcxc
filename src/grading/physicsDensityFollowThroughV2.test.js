import physics from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import {evaluatePhysicsDensityFollowThrough} from "./physicsDensityFollowThroughV2";
const q=physics.questions.find(item=>item.question_number===2);
const volumePart=q.parts.find(p=>p.id==="bi");
const densityPart=q.parts.find(p=>p.id==="bii");

test("source Q2(b)(ii) gives one method and one accuracy mark",()=>{
 expect(volumePart.marks).toBe(2);
 expect(densityPart.marks).toBe(2);
 expect(densityPart.criteria.map(c=>[c.code,c.kind,c.marks]))
  .toEqual([["M1","M",1],["A1","A",1]]);
 expect(densityPart.markerNote).toMatch(/Follow through/);
 expect(densityPart.markerNote).toMatch(/2\.7 g cm/);
});

test("correct density and formula get two advisory candidates",()=>{
 const r=evaluatePhysicsDensityFollowThrough({
  response:{answer:"2700 kg m⁻³",working:"density = mass / volume"},
  priorVolumeResponse:{answer:"0.001 m³"}
 });
 expect(r.suggestedMarks).toBe(2);
 expect(r.unresolvedMarks).toBe(0);
 expect(r.publishable).toBe(false);
});

test("unit-converted equivalent of 2.7 g/cm³ is accepted",()=>{
 const r=evaluatePhysicsDensityFollowThrough({
  response:{answer:"2.7 g/cm³",working:"ρ = m/v"},
  priorVolumeResponse:{answer:"1000 cm³"}
 });
 expect(r.suggestedMarks).toBe(2);
});

test("scientific notation with explicit density unit remains valid",()=>{
 const r=evaluatePhysicsDensityFollowThrough({
  response:{answer:"2.7 × 10³ kg m⁻³",working:"2.7 / 0.001 = 2700"},
  priorVolumeResponse:{answer:"0.001 m³"}
 });
 expect(r.suggestedMarks).toBe(2);
});

test("follow-through awards candidate A1 for the student's earlier incorrect volume",()=>{
 const r=evaluatePhysicsDensityFollowThrough({
  response:{answer:"1350 kg/m³",working:"2.7/0.002"},
  priorVolumeResponse:{answer:"0.002 m³"}
 });
 expect(r.criteria[1]).toMatchObject({candidateMarks:1,reason:"supported-follow-through"});
 expect(r.suggestedMarks).toBe(2);
});

test("unitless prior volume cannot authorize follow-through",()=>{
 const r=evaluatePhysicsDensityFollowThrough({
  response:{answer:"1350 kg/m³",working:"density=mass/volume"},
  priorVolumeResponse:{answer:"0.002"}
 });
 expect(r.criteria[1].candidateMarks).toBeNull();
 expect(r.suggestedMarks).toBe(1);
});

test("missing and wrong final units stay unresolved",()=>{
 for(const answer of ["2700","2700 g/cm³","2.7 kg m⁻³","2700 kg"]){
  const r=evaluatePhysicsDensityFollowThrough({
   response:{answer,working:"density=mass/volume"},
   priorVolumeResponse:{answer:"0.001 m³"}
  });
  expect(r.criteria[1].candidateMarks).toBeNull();
  expect(r.publishable).toBe(false);
 }
});

test("ambiguous alternatives and unsupported expression cannot award A1",()=>{
 for(const answer of ["2700 kg/m³ or 1350 kg/m³","2.7 / 0.001","2.7e309 kg/m³"]){
  const r=evaluatePhysicsDensityFollowThrough({response:{answer},priorVolumeResponse:{answer:"0.001 m³"}});
  expect(r.criteria[1].candidateMarks).toBeNull();
 }
});

test("no convincing method does not produce an M1 candidate",()=>{
 const r=evaluatePhysicsDensityFollowThrough({response:{answer:"2700 kg/m³",working:"mass + volume"}});
 expect(r.suggestedMarks).toBe(1);
 expect(r.criteria[0].candidateMarks).toBeNull();
 expect(r.authority).toBe("advisory");
});
