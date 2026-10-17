import {POB_SUPPLIED_ARCHIVE,POB_SOURCE_INVENTORY} from "./pobHistoricalInventory";
import {POB_HISTORICAL_SOURCE_SHA256,POB_HISTORICAL_SCORING_OWNER_APPROVAL,pobSourceSha256}
 from "./pobHistoricalScoringApproval";
import {assessPobHistoricalAutoScoring} from "./pobHistoricalAutoScoringGate";

describe("owner-approved POB historical auto-scoring intake",()=>{
 test("all and only the 46 original supplied PDFs have source-bound approval",()=>{
  const rows=POB_SUPPLIED_ARCHIVE;
  expect(rows).toHaveLength(46);
  expect(Object.keys(POB_HISTORICAL_SOURCE_SHA256)).toHaveLength(46);
  expect(new Set(rows.map(r=>r.id)).size).toBe(46);
  expect(new Set(rows.map(r=>r.filename)).size).toBe(46);
  expect(new Set(rows.map(r=>r.sourceSha256)).size).toBe(46);
  expect(POB_HISTORICAL_SCORING_OWNER_APPROVAL.sourcePdfCount).toBe(46);
  expect(POB_HISTORICAL_SCORING_OWNER_APPROVAL.enablesUnverifiedScoring).toBe(false);
  expect(POB_SOURCE_INVENTORY.ownerApprovedForFutureAutoScoring).toBe(46);
  for(const row of rows){
   expect(row.sourceSha256).toMatch(/^[0-9a-f]{64}$/);
   expect(row.sourceSha256).toBe(pobSourceSha256(row.filename));
   expect(row.ownerAutoScoringAuthorized).toBe(true);
   expect(row.ownerScoringApprovalDate).toBe("2026-10-17");
   expect(row.answerKeyStatus).toBe("not-verified");
   expect(row.simulatorReady).toBe(false);
   expect(assessPobHistoricalAutoScoring(row).ready).toBe(false);
  }
 });
 test("2019 May/June mislabeled Paper 1 is authorized under its actual Paper 2 identity",()=>{
  const mistaken=POB_SUPPLIED_ARCHIVE.find(r=>r.reclassifiedFromPaper1);
  expect(mistaken).toMatchObject({
   id:"POB-P2-2019-MJ-ALT",paper:2,filenamePaperMismatch:true,
   sourceArchivePaperLabel:1,ownerAutoScoringAuthorized:true
  });
  expect(POB_SOURCE_INVENTORY.genuinePaper1SourceCount).toBe(20);
  expect(POB_SOURCE_INVENTORY.actualPaper2SourceCount).toBe(26);
 });
 test("authorization never substitutes for key, rubric or live marking calibration",()=>{
  const firstP1=POB_SUPPLIED_ARCHIVE.find(r=>r.paper===1);
  const firstP2=POB_SUPPLIED_ARCHIVE.find(r=>r.paper===2);
  for(const row of [firstP1,firstP2]){
   const result=assessPobHistoricalAutoScoring(row,{
    secureServerMarkerEnabled:true,calibratedServerBenchmarkPassed:true
   });
   expect(result.ownerAuthorized).toBe(true);
   expect(result.ready).toBe(false);
   expect(result.issues).toContain("Answer key has not been verified.");
  }
 });
 test("source substitution, mismatched sitting and unknown IDs cannot inherit approval",()=>{
  const row=POB_SUPPLIED_ARCHIVE[0];
  const invalid=[
   {...row,id:"POB-P1-2099-MJ"},
   {...row,sourceSha256:"0".repeat(64)},
   {...row,filename:"another.pdf"},
   {...row,year:2099},
   {...row,paper:2},
   {...row,sitting:"JAN"}
  ];
  for(const tampered of invalid){
   const result=assessPobHistoricalAutoScoring(tampered,{
    secureServerMarkerEnabled:true,calibratedServerBenchmarkPassed:true
   });
   expect(result.ready).toBe(false);
   expect(result.issues.some(s=>s.includes("source")||s.includes("Source")||
     s.includes("Examination"))).toBe(true);
  }
  expect(pobSourceSha256("../another.pdf")).toBeNull();
 });
});
