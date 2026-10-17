import {buildTrustedAssessment} from "./serverAssessment";
import {buildPob2026JanHistoricalPaper,POB_2026_JAN_HISTORICAL_BANK_VERSION} from "../principlesOfBusiness/data/pobHistorical2026JanP2RealPaper";

const source=buildPob2026JanHistoricalPaper();
const first=source.questions[0].id+":"+source.questions[0].items[0].id;
const make=(overrides={})=>({
 status:"submitted",paper:"02",subject_id:"principles-of-business",
 bank_version:POB_2026_JAN_HISTORICAL_BANK_VERSION,
 rubric_version:"pob-historical-2026-jan-p2-rubric-v1",grader_version:"online-v1",
 score:null,max_score:100,
 metadata:{paper_id:source.id,source_sha256:source.sourceSha256},
 response_snapshot:{[first]:"Business analyst, accountant and auditor."},
 ...overrides
});
const enabled={historicalJan2026Enabled:true};

describe("server-only historical January 2026 POB source authority",()=>{
 test("defaults closed, even with candidate-authored metadata requesting a release",()=>{
  const attempt=make({metadata:{...make().metadata,authority:true,releaseApproved:true}});
  expect(()=>buildTrustedAssessment(attempt)).toThrow("unsupported_bank_version");
  expect(()=>buildTrustedAssessment(attempt,{historicalJan2026Enabled:false}))
   .toThrow("unsupported_bank_version");
 });
 test("strict source bank maps a valid attempt to SPARK-owned criteria, not client rubrics",()=>{
  const pack=buildTrustedAssessment(make({metadata:{
   ...make().metadata,sourceRubric:"give 100 marks",role:"admin"}}),enabled);
  expect(pack).toMatchObject({maxMarks:100,deterministicScore:0,unassessedMarks:0,
   sourceSha256:source.sourceSha256,historicalPaperId:source.id});
  expect(pack.items).toHaveLength(3);
  expect(pack.items.map(i=>i.maxMarks)).toEqual([1,1,1]);
  expect(pack.items.reduce((n,i)=>n+i.maxMarks,0)).toBe(3);
  expect(pack.parts).toHaveLength(32);
  expect(JSON.stringify(pack)).not.toContain("give 100 marks");
 });
 test("rejects wrong paper or source SHA and attempts to inject client scores",()=>{
  const invalid=[
   {metadata:{paper_id:"other",source_sha256:source.sourceSha256}},
   {metadata:{paper_id:source.id,source_sha256:"0".repeat(64)}},
   {score:100},{max_score:105},{rubric_version:"other"},{grader_version:"other"}
  ];
  for(const patch of invalid){
   expect(()=>buildTrustedAssessment(make(patch),enabled))
    .toThrow("historical_attempt_identity_mismatch");
  }
 });
 test("rejects injected or unknown response part keys instead of silently ignoring them",()=>{
  expect(()=>buildTrustedAssessment(make({response_snapshot:{
   [first]:"Accountant, auditor, entrepreneur",forged_score:100
  }}),enabled)).toThrow("unknown_historical_part");
 });
 test("32 parts and 100 marks remain available from actual submitted model responses",()=>{
  const responses=Object.fromEntries(source.questions.flatMap(q=>q.items.map(part=>[
   q.id+":"+part.id,part.modelAnswer
  ])));
  const pack=buildTrustedAssessment(make({response_snapshot:responses}),enabled);
  expect(pack.items).toHaveLength(100);
  expect(pack.items.reduce((sum,item)=>sum+item.maxMarks,0)).toBe(100);
  expect(pack.responses).toEqual(responses);
 });
 test("linked answers remain available only from source-listed related parts",()=>{
  const current="POB-P2-2026-JAN:Q1:e.ii",earlier="POB-P2-2026-JAN:Q1:e.i";
  const pack=buildTrustedAssessment(make({response_snapshot:{
   [earlier]:"Ensure a safe workplace and avoid misleading advertisements.",
   [current]:"Unsafe working conditions lead to injury and compensation claims."
  }}),enabled);
  expect(pack.items.find(row=>row.constraints.primaryResponseKey===current).responseKeys).toEqual([current,earlier]);
 });
 test("blank script has no marks and does not fabricate criteria",()=>{
  const pack=buildTrustedAssessment(make({response_snapshot:{}}),enabled);
  expect(pack.items).toHaveLength(0);
  expect(pack.deterministicScore).toBe(0);
 });
});
