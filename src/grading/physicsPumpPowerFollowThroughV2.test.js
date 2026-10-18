import paper from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import {evaluatePhysicsPumpPower} from "./physicsPumpPowerFollowThroughV2";
const q=paper.questions.find(q=>q.question_number===3);
const work=q.parts.find(p=>p.id==="bi");
const power=q.parts.find(p=>p.id==="bii");

test("source power Q3(b)(ii) awards one method and one accuracy mark",()=>{
 expect(work.answer).toMatch(/10⁴ J/);
 expect(power.marks).toBe(2);
 expect(power.criteria.map(c=>[c.code,c.kind,c.marks])).toEqual([["M1","M",1],["A1","A",1]]);
 expect(power.markerNote).toMatch(/Follow through/);
 expect(power.markerNote).toMatch(/1\.5 kW/);
 expect(power.criteria[1].check.value).toBe(1500);
});
test("correct W answer and stated method produce two advisory marks",()=>{
 const r=evaluatePhysicsPumpPower({response:{answer:"1500 W",working:"power = work done / time taken"},
  priorWorkResponse:{answer:"60000 J"}});
 expect(r.suggestedMarks).toBe(2);
 expect(r.unresolvedMarks).toBe(0);
 expect(r.publishable).toBe(false);
});
test("kilowatt answer and numeric substitution are accepted",()=>{
 const r=evaluatePhysicsPumpPower({response:{answer:"1.5 kW",working:"60000 / 40"},
  priorWorkResponse:{answer:"60 kJ"}});
 expect(r.suggestedMarks).toBe(2);
});
test("scientific notation output remains an acceptable unit-bearing answer",()=>{
 const r=evaluatePhysicsPumpPower({response:{answer:"1.5 × 10³ W",working:"P=W/t"},
  priorWorkResponse:{answer:"6 × 10⁴ J"}});
 expect(r.suggestedMarks).toBe(2);
});
test("follow-through from an earlier wrong but explicit 40 kJ result",()=>{
 const r=evaluatePhysicsPumpPower({response:{answer:"1000 W",working:"40000 / 40"},
  priorWorkResponse:{answer:"40 kJ"}});
 expect(r.criteria[1].candidateMarks).toBe(1);
 expect(r.criteria[1].reason).toBe("supported-follow-through");
 expect(r.suggestedMarks).toBe(2);
});
test("unitless earlier work cannot authorize follow-through",()=>{
 const r=evaluatePhysicsPumpPower({response:{answer:"1000 W",working:"power=work/time"},
  priorWorkResponse:{answer:"40000"}});
 expect(r.criteria[1].candidateMarks).toBeNull();
 expect(r.suggestedMarks).toBe(1);
});
test("missing power unit, wrong dimension and contradictory answers remain unresolved",()=>{
 for(const answer of ["1500","1500 J","1.5 kJ","1500 W or 1000 W"]){
  const r=evaluatePhysicsPumpPower({response:{answer,working:"P=W/t"},
   priorWorkResponse:{answer:"60000 J"}});
  expect(r.criteria[1].candidateMarks).toBeNull();
 }
});
test("unsupported work expression does not claim a method mark",()=>{
 const r=evaluatePhysicsPumpPower({response:{answer:"1500 W",working:"work + time"},
  priorWorkResponse:{answer:"60000 J"}});
 expect(r.suggestedMarks).toBe(1);
 expect(r.criteria[0].candidateMarks).toBeNull();
 expect(r.authority).toBe("advisory");
});
