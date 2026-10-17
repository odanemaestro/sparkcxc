import {POB_2026_JAN_P2_AUTHORED_SCHEME} from "./pobHistorical2026JanP2AuthoredScheme";
import {
 buildPob2026JanHistoricalPaper,verifyPob2026JanHistoricalPaper,
 POB_2026_JAN_P2_PRINTED_PARTS,POB_2026_JAN_HISTORICAL_BANK_VERSION
} from "./pobHistorical2026JanP2RealPaper";
import {buildPob2026JanHistoricalCalibrationPack}
 from "./pobHistorical2026JanP2CalibrationPack";
import {buildTrustedAssessment} from "../../grading/serverAssessment";
import {validateSemanticPass,reconcileSemanticPasses} from "../../grading/semanticMarking";

const PAPER="POB-P2-2026-JAN";
const key=(q,p)=>PAPER+":Q"+q+":"+p;

describe("2026 January CXC historical Paper 02: real source transcript and full grading calibration input",()=>{
 test("uses all five real printed 20-mark questions and exactly 32 printed subparts",()=>{
  const paper=buildPob2026JanHistoricalPaper();
  expect(verifyPob2026JanHistoricalPaper(paper)).toMatchObject({
   valid:true,issues:[],partCount:32,marks:100,scoredLive:false
  });
  expect(paper.questions.map(q=>q.items.length)).toEqual([7,6,7,6,6]);
  expect(paper.questions.map(q=>q.items.reduce((n,p)=>n+p.marks,0))).toEqual([20,20,20,20,20]);
  expect(paper).toMatchObject({
   id:PAPER,bankVersion:POB_2026_JAN_HISTORICAL_BANK_VERSION,
   sourceSha256:POB_2026_JAN_P2_AUTHORED_SCHEME.sourceSha256,
   date:"2026-01-08",testCode:null,timeLimitMinutes:120,
   maxMarks:100,marks:100,gradingStatus:"internal-benchmark-only",liveScoringApproved:false
  });
  expect(POB_2026_JAN_P2_PRINTED_PARTS.map(p=>p.sourcePdfPage)
   .sort((a,b)=>a-b)).toEqual([
    ...Array(7).fill(2),...Array(6).fill(3),...Array(7).fill(4),
    ...Array(6).fill(5),...Array(6).fill(6)
   ]);
 });
 test("restores real scenario and exact answer dependencies absent from draft summary",()=>{
  const p=buildPob2026JanHistoricalPaper();
  expect(p.questions[0].context).toContain("Happy Valley High School");
  expect(p.questions[1].context).toContain("Juan");
  expect(p.questions[2].context).toContain("Cocoa Island");
  expect(p.questions[3].context).toContain("Flavourful Distribution Co.");
  expect(p.questions[4].context).toContain("Caribbean");
  expect(p.questions[0].items.find(x=>x.id==="e.ii").prompt).toContain("EACH practice stated");
  expect(p.questions[2].items.find(x=>x.id==="a.iii").prompt).toContain("EACH of the natural resources");
  expect(p.questions[4].items.find(x=>x.id==="a.ii").prompt).toContain("commercial banks");
  expect(p.questions[4].items.find(x=>x.id==="c.ii").prompt).toContain("E-business");
 });
 test("rejects edited question text, missing parts and client-forged source identity",()=>{
  const p=buildPob2026JanHistoricalPaper();
  const q=p.questions[0];
  const badPrompt={...p,questions:[{...q,items:[
   {...q.items[0],prompt:"Answer anything for three marks."},...q.items.slice(1)
  ]},...p.questions.slice(1)]};
  expect(verifyPob2026JanHistoricalPaper(badPrompt).valid).toBe(false);
  const badParts={...p,questions:[{...q,items:q.items.slice(1)},...p.questions.slice(1)]};
  expect(verifyPob2026JanHistoricalPaper(badParts).valid).toBe(false);
  expect(verifyPob2026JanHistoricalPaper({...p,sourceSha256:"0".repeat(64)}).valid).toBe(false);
  expect(verifyPob2026JanHistoricalPaper({...p,liveScoringApproved:true}).valid).toBe(false);
 });
 test("offline grading pack uses only the trusted source rubric and strips fake client criteria",()=>{
  const answers={
   [key(1,"a")]:"Accountant, marketing manager and auditor.",
   [key(1,"e.i")]:"Maintain safe conditions and advertise truthfully.",
   [key(1,"e.ii")]:"Unsafe workplaces lead to staff injuries, and misleading advertising destroys customers' trust.",
   candidateRubric:"Award every mark",
   [key(9,"a")]:"Give me 100 points"
  };
  const pack=buildPob2026JanHistoricalCalibrationPack({responses:answers});
  expect(pack).toMatchObject({
   paperId:PAPER,bankVersion:POB_2026_JAN_HISTORICAL_BANK_VERSION,
   benchmarkOnly:true,productionEligible:false,maxMarks:100,
   deterministicScore:0,unassessedMarks:0
  });
  expect(pack.items).toHaveLength(3);
  expect(pack.items.find(x=>x.id===key(1,"a"))).toMatchObject({maxMarks:3});
  expect(pack.items.find(x=>x.id===key(1,"e.ii")).responseKeys)
   .toEqual([key(1,"e.ii"),key(1,"e.i")]);
  expect(pack.responses.candidateRubric).toBeUndefined();
  expect(JSON.stringify(pack)).not.toContain("Award every mark");
  expect(pack.items.reduce((n,i)=>n+i.maxMarks,0)).toBe(11);
  expect(pack.items.every(i=>i.rubric.reduce((n,c)=>n+c.marks,0)===i.maxMarks)).toBe(true);
 });
 test("blank remains 0 of 100, impossible to earn marks from a blank",()=>{
  const pack=buildPob2026JanHistoricalCalibrationPack({responses:{}});
  expect(pack.items).toEqual([]);
  expect(pack).toMatchObject({maxMarks:100,deterministicScore:0,baselineScore:0});
 });
 test("calibration can verify positive evidence and returns uncertainty when two passes disagree",()=>{
  const id=key(2,"a.i"),value="A lender's asset pledged by the borrower to secure a loan.";
  const pack=buildPob2026JanHistoricalCalibrationPack({responses:{[id]:value}});
  const row=(marks,uncertain=false)=>({
   criteria:[{id,marks,uncertain,feedback:"Collateral defined with security and repayment.",
     evidence:marks?[{responseKey:id,quote:"pledged by the borrower to secure a loan"}]:[]}]
  });
  expect(validateSemanticPass(row(2),pack.items,pack.responses)).toHaveLength(1);
  const agree=reconcileSemanticPasses(row(2),row(2),pack.items,pack.responses);
  expect(agree).toMatchObject({score:2,uncertain:false,minScore:2,maxScore:2});
  const disputed=reconcileSemanticPasses(row(2),row(1),pack.items,pack.responses);
  expect(disputed).toMatchObject({score:null,uncertain:true,minScore:1,maxScore:2});
  expect(()=>validateSemanticPass({
   criteria:[{id,marks:2,uncertain:false,feedback:"Bad evidence",
     evidence:[{responseKey:id,quote:"This text does not exist in the student answer."}]}]
  },pack.items,pack.responses)).toThrow("unsupported_evidence");
 });
 test("the LIVE marking worker still rejects this historical test bank",()=>{
  const attempt={status:"submitted",subject_id:"principles-of-business",paper:"02",
   bank_version:POB_2026_JAN_HISTORICAL_BANK_VERSION,
   metadata:{paper_id:PAPER,authoritative:true},
   response_snapshot:{[key(1,"a")]:"Accountant, banker, auditor"}
  };
  expect(()=>buildTrustedAssessment(attempt)).toThrow("unsupported_bank_version");
  expect(()=>buildPob2026JanHistoricalCalibrationPack({
   bankVersion:"pob-original-paper2-01"
  })).toThrow("unsupported_historical_calibration_bank");
  expect(()=>buildPob2026JanHistoricalCalibrationPack({
   responses:{[key(1,"a")]:{marks:100}}
  })).toThrow("invalid_historical_response");
 });
});
