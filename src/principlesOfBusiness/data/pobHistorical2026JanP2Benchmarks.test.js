import {
 POB_JAN_2026_P2_BENCHMARK_CASES,validatePobJan2026BenchmarkFixtures
} from "./pobHistorical2026JanP2Benchmarks";
import {buildPob2026JanHistoricalCalibrationPack} from "./pobHistorical2026JanP2CalibrationPack";
import {buildTrustedAssessment} from "../../grading/serverAssessment";

const PAPER="POB-P2-2026-JAN";
const toKey=part=>PAPER+":Q"+part.replace(": ",":").replace(":",":");

describe("January 2026 Paper 2 internal semantic calibration fixtures",()=>{
 test("all examples have source-backed mark boundaries and unique IDs",()=>{
  expect(validatePobJan2026BenchmarkFixtures()).toMatchObject({
   valid:true,issues:[],caseCount:20,reviewed:false,liveScoringApproved:false
  });
  expect(new Set(POB_JAN_2026_P2_BENCHMARK_CASES.map(c=>c.id)).size).toBe(20);
 });
 test("sample both accepted equivalents and negative answers for the same part",()=>{
  const forPart=part=>POB_JAN_2026_P2_BENCHMARK_CASES.filter(c=>c.part===part);
  expect(forPart("2:a.i").map(c=>c.id)).toEqual(expect.arrayContaining([
   "banking-collateral-full","banking-collateral-paraphrase",
   "banking-collateral-partial","banking-collateral-wrong",
   "banking-collateral-contradiction","role-injection"
  ]));
  expect(forPart("4:a.ii").some(c=>c.id==="marketing-mix-duplicate")).toBe(true);
  expect(forPart("1:e.ii").some(c=>c.id==="linked-ethics-unrelated")).toBe(true);
  expect(forPart("3:a.iii").some(c=>c.id==="linked-natural-resources-mismatch")).toBe(true);
 });
 test("case responses use source-owned marking criteria and retain answer dependencies",()=>{
  for(const c of POB_JAN_2026_P2_BENCHMARK_CASES){
   const responseMap=Object.fromEntries(Object.entries(c.responses)
    .map(([part,response])=>[toKey(part),response]));
   const pack=buildPob2026JanHistoricalCalibrationPack({responses:responseMap});
   expect(pack).toMatchObject({benchmarkOnly:true,productionEligible:false,deterministicScore:0,maxMarks:100});
   expect(pack.responses).not.toHaveProperty("score");
   if(c.id==="linked-ethics-correct"){
    expect(pack.items.find(i=>i.id===toKey(c.part)).responseKeys).toEqual([
     toKey("1:e.ii"),toKey("1:e.i")
    ]);
   }
   if(c.id==="linked-natural-resources-correct"){
    expect(pack.items.find(i=>i.id===toKey(c.part)).responseKeys).toEqual([
     toKey("3:a.iii"),toKey("3:a.ii")
    ]);
   }
  }
 });
 test("rejects impossible and falsified expected scores",()=>{
  const first=POB_JAN_2026_P2_BENCHMARK_CASES[0];
  expect(validatePobJan2026BenchmarkFixtures([{...first,max:100}]).valid).toBe(false);
  expect(validatePobJan2026BenchmarkFixtures([first,first]).valid).toBe(false);
  expect(validatePobJan2026BenchmarkFixtures([{...first,part:"9:z"}]).valid).toBe(false);
 });
 test("fixture benchmarks do not enable authenticated production grading",()=>{
  const candidate={status:"submitted",subject_id:"principles-of-business",paper:"02",
   bank_version:"pob-historical-2026-jan-p2-v1",
   metadata:{paper_id:PAPER,liveScoringApproved:true,calibrationPassed:true},
   response_snapshot:{[toKey("2:a.i")]:"Property pledged for a loan."}};
  expect(()=>buildTrustedAssessment(candidate)).toThrow("unsupported_bank_version");
 });
});
