import {buildTrustedAssessment} from "./serverAssessment";
import {validateSemanticPass,reconcileSemanticPasses} from "./semanticMarking";
const P="POB-SPARK-P2-ORIGINAL-01-Q";
const attempt=answers=>({status:"submitted",paper:"02",subject_id:"principles-of-business",
 bank_version:"pob-original-paper2-01",metadata:{paper_id:"pob-original-paper2-01"},
 response_snapshot:answers});
describe("POB two-pass semantic marking safety on trusted rubrics",()=>{
 test("both passes must agree with an exact candidate quotation to award a written criterion",()=>{
  const id=P+"1:a",response="An entrepreneur identifies a business opportunity, organizes resources and bears risk.";
  const pack=buildTrustedAssessment(attempt({[id]:response}));
  const mk=(marks,uncertain=false)=>({criteria:[{id,marks,uncertain,feedback:"Definition reviewed.",
    evidence:marks?[{responseKey:id,quote:"organizes resources and bears risk"}]:[]}]});
  const result=reconcileSemanticPasses(mk(2),mk(2),pack.items,pack.responses);
  expect(result).toMatchObject({uncertain:false,score:2,minScore:2,maxScore:2});
  expect(result.criteria[0].status).toBe("agreed");
 });
 test("disagreement never becomes a false final paper mark",()=>{
  const id=P+"1:a",response="An entrepreneur starts a business and accepts financial risk.";
  const pack=buildTrustedAssessment(attempt({[id]:response}));
  const mk=n=>({criteria:[{id,marks:n,uncertain:false,feedback:"Reasoned assessment.",
    evidence:n?[{responseKey:id,quote:"accepts financial risk"}]:[]}]});
  const result=reconcileSemanticPasses(mk(2),mk(1),pack.items,pack.responses);
  expect(result.uncertain).toBe(true);
  expect(result.score).toBeNull();
  expect(result.minScore).toBe(1);
  expect(result.maxScore).toBe(2);
 });
 test("positive marks based on a quote absent from the student's answer are rejected",()=>{
  const id=P+"1:a";
  const pack=buildTrustedAssessment(attempt({[id]:"I would like to work in an office."}));
  expect(()=>validateSemanticPass({criteria:[{id,marks:2,uncertain:false,feedback:"False credit",
    evidence:[{responseKey:id,quote:"I bear the business risks"}]}]},pack.items,pack.responses)).toThrow("unsupported_evidence");
 });
 test("candidate cannot inject an unsupported rubric criterion or use blank work to get marks",()=>{
  const id=P+"1:a";const pack=buildTrustedAssessment(attempt({[id]:"test"}));
  expect(()=>validateSemanticPass({criteria:[{id:"invented",marks:2,uncertain:false,feedback:"",evidence:[]}]},pack.items,pack.responses)).toThrow("criterion_identity");
  expect(()=>validateSemanticPass({criteria:[{id,marks:2,uncertain:false,feedback:"Credit",evidence:[]}]},pack.items,pack.responses)).toThrow("missing_evidence");
 });
});