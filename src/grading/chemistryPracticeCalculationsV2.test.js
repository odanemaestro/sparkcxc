import {buildChemistryPaper2Set} from "../chemistry/data/chemistryPaper2Bank";
import {evaluateChemistryPracticeCalculation} from "./chemistryPracticeCalculationsV2";

const source=(seed)=>{
 const paper=buildChemistryPaper2Set(seed);
 const q=paper.questions[0],part=q.parts[0];
 const item=part.items.find(item=>item.label==="(v)");
 return {paper,q,item,
  args:{paperId:paper.id,questionId:q.id,itemLabel:item.label}};
};
const heat=source(2),titration=source(5);
const mark=(fixture,answer="",working="")=>evaluateChemistryPracticeCalculation({
 ...fixture.args,response:{answer,working}
});
const heatSteps="q = mcΔT; 100 × 4.18 × 10.8 = 4514.4";
const titrationSteps="n(HCl)=0.00200 mol; HCl:NaOH=1:1; n(NaOH)=0.00200 mol; 0.00200 / 0.0250";

test("calibration uses the real, non-historical SPARK Chemistry source items",()=>{
 expect(heat.paper.id).toBe("CHEM-P2-PRACTICE-3");
 expect(heat.q.id).toBe("CHEM-G3-Q1");
 expect(heat.item.marks).toBe(3);
 expect(heat.item.prompt).toMatch(/100 g of solution/);
 expect(heat.item.markScheme.points).toEqual([
  "q = mcΔT (1)","= 100 × 4.18 × 10.8 (1)","= 4514 J or 4.51 kJ (1)"
 ]);
 expect(titration.paper.id).toBe("CHEM-P2-PRACTICE-6");
 expect(titration.q.id).toBe("CHEM-G6-Q1");
 expect(titration.item.marks).toBe(4);
 expect(titration.item.prompt).toMatch(/concentration of NaOH/);
 expect(titration.item.markScheme.points).toHaveLength(4);
 expect(titration.item.markScheme.points[3]).toMatch(/0\.0800 mol dm⁻³/);
});
test("calorimetry full working and joule result produce three advisory candidates",()=>{
 const r=mark(heat,"4514 J",heatSteps);
 expect(r.suggestedMarks).toBe(3);
 expect(r.unresolvedMarks).toBe(0);
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1]);
 expect(r.publishable).toBe(false);
 expect(r.authority).toBe("advisory");
});
test("calorimetry source-approved kilojoule result and human working are accepted",()=>{
 expect(mark(heat,"4.51 kJ",heatSteps).suggestedMarks).toBe(3);
});
test("correct final heat alone does not invent formula or substitution marks",()=>{
 const r=mark(heat,"4.51 kJ","");
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([null,null,1]);
 expect(r.unresolvedMarks).toBe(2);
});
test("heat method and numerical substitution can be retained without correct final units",()=>{
 for(const answer of ["4514","4.51","4514 kg","4.52 kJ"]){
  const r=mark(heat,answer,heatSteps);
  expect(r.suggestedMarks).toBe(2);
  expect(r.unresolvedMarks).toBe(1);
 }
});
test("competing numerical heat finals cannot become candidate A1",()=>{
 for(const answer of ["4514 J or 5200 J","Final answer: 4514 J\nFinal answer: 5000 J"]){
  expect(mark(heat,answer,heatSteps).criteria[2].candidateMarks).toBeNull();
 }
});
test("titration worked method and correct mol dm^-3 answer produce four advisory marks",()=>{
 const r=mark(titration,"0.0800 mol dm⁻³",titrationSteps);
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,1,1,1]);
 expect(r.suggestedMarks).toBe(4);
 expect(r.publishable).toBe(false);
});
test("titration accepts equivalent typed molarity units, not dimensionally unrelated quantities",()=>{
 for(const answer of ["0.08 mol/dm3","0.0800 mol L⁻¹","0.0800 mol/L"]){
  expect(mark(titration,answer,titrationSteps).criteria[3].candidateMarks).toBe(1);
 }
 for(const answer of ["0.08","0.08 mol","0.08 g/dm3","0.10 mol dm⁻³"]){
  expect(mark(titration,answer,titrationSteps).criteria[3].candidateMarks).toBeNull();
 }
});
test("titration alternative method evidence does not fabricate mole ratio",()=>{
 const r=mark(titration,"0.0800 mol dm⁻³",
  "0.100 × 0.02000 = 0.00200 mol; n(NaOH)=0.00200 mol");
 expect(r.criteria.map(c=>c.candidateMarks)).toEqual([1,null,1,1]);
});
test("correct final concentration without any working is not a full award",()=>{
 const r=mark(titration,"0.0800 mol dm⁻³","");
 expect(r.suggestedMarks).toBe(1);
 expect(r.unresolvedMarks).toBe(3);
});
test("ambiguous titration finals, malformed response and wrong source fail closed",()=>{
 for(const answer of ["0.0800 mol dm⁻³ or 0.1000 mol dm⁻³",
  "Final answer: 0.0800 mol dm⁻³; Final answer: 0.1000 mol dm⁻³"]){
  // Alternatives are not resolved as a single response.
  expect(mark(titration,answer,titrationSteps).criteria[3].candidateMarks).toBeNull();
 }
 expect(()=>evaluateChemistryPracticeCalculation({
  paperId:"CHEM-P2-2023-JAN",questionId:"CHEM-P2-2023-JAN-Q1",itemLabel:"(v)",
  response:{answer:"0.0800 mol dm⁻³"}})).toThrow(/Uncalibrated/);
 expect(mark(heat,"4.51 kJ",null).publishable).toBe(false);
});
