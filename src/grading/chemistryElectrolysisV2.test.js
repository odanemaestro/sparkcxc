import {buildChemistryPaper2Set} from "../chemistry/data/chemistryPaper2Bank";
import {
 evaluateChemistryElectrolysisCharge,
 evaluateChemistryElectrolysisCopperMass
} from "./chemistryElectrolysisV2";

const a=seed=>{
 const paper=buildChemistryPaper2Set(seed);
 const q=paper.questions.find(q=>q.id==="CHEM-G"+(seed+1)+"-Q5");
 const part=q.parts.find(p=>p.label==="(b)");
 return {paper,q,part,ids:{paperId:paper.id,questionId:q.id}};
};
const refs=Array.from({length:6},(_,i)=>a(i));
const charge="time = 32.0 × 60 = 1920 s\nQ = It = 1.50 × 1920 = 2880 C";
const copper="n(e⁻) = 2880 / 96500 = 0.0298 mol\nn(Cu) = 0.0298 / 2 = 0.0149 mol\nmass = 0.0149 × 63.5 = 0.946 g";

describe.each(refs)("source Chemistry Paper 2 Q5(b) electrolysis rubric",fixture=>{
 const c=(response)=>evaluateChemistryElectrolysisCharge({...fixture.ids,response});
 const m=(response,previousChargeResponse=charge)=>
  evaluateChemistryElectrolysisCopperMass({...fixture.ids,response,previousChargeResponse});

 test("rubric retains exact charge and copper-mass marking steps",()=>{
  expect(fixture.part.items).toHaveLength(2);
  const [q,mass]=fixture.part.items;
  expect(q.label).toBe("(i)");
  expect(q.marks).toBe(2);
  expect(q.markScheme.points).toEqual([
   "time=32.0×60=1920 s (1)","Q=It=1.50×1920=2880 C (1)"
  ]);
  expect(mass.label).toBe("(ii)");
  expect(mass.marks).toBe(4);
  expect(mass.markScheme.points).toEqual([
   "moles e⁻=2880/96500=0.0298 mol (1)",
   "moles Cu=0.0298/2=0.0149 mol (1)",
   "mass=0.0149×63.5 (1)",
   "=0.946 g (1)"
  ]);
 });
 test("full source charge workings produce two advisory candidates",()=>{
  const r=c(charge);
  expect(r.criteria.map(x=>x.candidateMarks)).toEqual([1,1]);
  expect(r.suggestedMarks).toBe(2);
  expect(r.unresolvedMarks).toBe(0);
  expect(r.publishable).toBe(false);
 });
 test("charge in coulombs without time conversion retains C2 only",()=>{
  expect(c("Final answer: 2880 C").criteria.map(x=>x.candidateMarks))
   .toEqual([null,1]);
 });
 test("a correct conversion cannot grant an incorrect or unitless charge",()=>{
  for(const answer of ["2800 C","2880","2880 J","3000 C"]){
   const r=c("32.0 × 60 = 1920 s\nFinal answer: "+answer);
   expect(r.criteria.map(x=>x.candidateMarks)).toEqual([1,null]);
  }
 });
 test("copper steps and source rounded final award four advisory marks",()=>{
  const r=m(copper);
  expect(r.criteria.map(x=>x.candidateMarks)).toEqual([1,1,1,1]);
  expect(r.suggestedMarks).toBe(4);
  expect(r.unresolvedMarks).toBe(0);
  expect(r.publishable).toBe(false);
 });
 test("nearby defensible full-precision mass results are accepted",()=>{
  for(const value of ["0.946 g","0.947 g","0.948 g"]){
   const r=m(copper.replace("0.946 g",value));
   expect(r.criteria[3].candidateMarks).toBe(1);
  }
 });
 test("final copper mass alone does not imply invisible methods",()=>{
  const r=m("Final answer: 0.946 g");
  expect(r.criteria.map(x=>x.candidateMarks)).toEqual([null,null,null,1]);
  expect(r.unresolvedMarks).toBe(3);
 });
 test("one independently supported method remains partial evidence",()=>{
  const r=m("n(e⁻)=2880/96500=0.0298 mol");
  expect(r.criteria.map(x=>x.candidateMarks)).toEqual([1,null,null,null]);
 });
 test("incorrect mole ratio or mass unit cannot create final credit",()=>{
  const working="n(e)=2880/96500=0.0298 mol\nn(Cu)=0.0298/3=0.00993 mol";
  const r=m(working+"\nFinal answer: 0.630 g");
  expect(r.criteria[0].candidateMarks).toBe(1);
  expect(r.criteria[1].candidateMarks).toBeNull();
  expect(r.criteria[3].candidateMarks).toBeNull();
  expect(m(copper.replace("0.946 g","0.946 kg")).criteria[3].candidateMarks).toBeNull();
 });
 test("wrong electron division cannot earn first method mark",()=>{
  expect(m("n(e)=2880/96500=0.050 mol").criteria[0].candidateMarks).toBeNull();
 });
 test("follow-through uses only an explicit earlier charge and consistent chain",()=>{
  const previous="Final answer: 3000 C";
  const working="n(e)=3000/96500=0.03109 mol\nn(Cu)=0.03109/2=0.015545 mol\nmass=0.015545×63.5=0.987 g";
  const r=m(working,previous);
  expect(r.criteria.map(x=>x.candidateMarks)).toEqual([1,1,1,1]);
  expect(r.criteria[3].reason).toBe("candidate-follow-through");
  expect(r.publishable).toBe(false);
  const uncertain=m(working,"3000");
  expect(uncertain.criteria[3].candidateMarks).toBeNull();
 });
 test("correct source calculation remains eligible even after earlier incorrect charge",()=>{
  const r=m(copper,"Final answer: 3000 C");
  expect(r.criteria.map(x=>x.candidateMarks)).toEqual([1,1,1,1]);
 });
 test("competing finals cannot grant source or follow-through result credit",()=>{
  const ambiguous=c("Final answer: 2880 C or 3000 C");
  expect(ambiguous.criteria[1].candidateMarks).toBeNull();
  const mass=m(copper+"\nFinal answer: 0.946 g\nFinal answer: 1.000 g");
  expect(mass.criteria[3].candidateMarks).toBeNull();
 });
 test("no evidence and malformed inputs leave all marks unresolved",()=>{
  expect(c().unresolvedMarks).toBe(2);
  expect(m().unresolvedMarks).toBe(4);
  expect(m("n(e)=2880/96500=Infinity mol").criteria[0].candidateMarks).toBeNull();
 });
});
test("the examiner rejects forged source IDs and unapproved historical scripts",()=>{
 for(const args of [
  {paperId:"CHEM-P2-2023-JAN",questionId:"CHEM-G1-Q5"},
  {paperId:"CHEM-P2-PRACTICE-7",questionId:"CHEM-G7-Q5"},
  {paperId:"CHEM-P2-PRACTICE-3",questionId:"CHEM-G4-Q5"}
 ]){
  expect(()=>evaluateChemistryElectrolysisCharge({...args,response:charge})).toThrow();
  expect(()=>evaluateChemistryElectrolysisCopperMass({...args,response:copper})).toThrow();
 }
});
