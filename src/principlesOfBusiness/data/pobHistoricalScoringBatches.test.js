import {
 POB_HISTORICAL_SCORING_BATCHES,POB_HISTORICAL_FIRST_FIFTEEN,
 auditPobHistoricalScoringBatches,validatePobHistoricalP2Selection
} from "./pobHistoricalScoringBatches";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {assessPobHistoricalAutoScoring} from "./pobHistoricalAutoScoringGate";

describe("46 owner-authorized POB sources in 15-paper scoring QA batches",()=>{
 test("all original source fingerprints and page counts stay mapped, 15/15/15/1",()=>{
  expect(POB_HISTORICAL_SCORING_BATCHES.map(rows=>rows.length)).toEqual([15,15,15,1]);
  expect(auditPobHistoricalScoringBatches()).toEqual({
   valid:true,issues:[],total:46,batchCounts:[15,15,15,1],
   liveScoringReleased:0,firstBatchPages:159,firstBatchPagesNeedingImageReview:4,
   firstBatchLowTextPagesVisuallyResolved:4,firstBatchRemainingLowTextPagesToReview:0
  });
  const all=POB_HISTORICAL_SCORING_BATCHES.flat();
  expect(new Set(all.map(row=>row.sourceSha256)).size).toBe(46);
  expect(all.every(row=>POB_SUPPLIED_ARCHIVE.some(source=>
   source.id===row.id&&source.filename===row.filename&&
   source.sourceSha256===row.sourceSha256))).toBe(true);
  expect(pobReleasedHistoricalPapers()).toEqual([]);
 });
 test("first 15 preserve the actual exam booklet versus derivative transcription",()=>{
  const one=POB_HISTORICAL_FIRST_FIFTEEN.find(r=>r.id==="POB-P2-2024-JAN");
  expect(one).toMatchObject({
   pages:2,sourceForm:"derivative-transcription",
   fullPageVisualQA:false,liveScoringApproved:false
  });
  const jan2023=POB_HISTORICAL_FIRST_FIFTEEN.find(r=>r.id==="POB-P1-2023-JAN");
  expect(jan2023).toMatchObject({paper:1,pages:9,rule:"mcq-60"});
  expect(POB_HISTORICAL_FIRST_FIFTEEN.reduce((n,row)=>n+row.pagesNeedingImageReview,0)).toBe(4);
  expect(POB_HISTORICAL_FIRST_FIFTEEN.find(r=>r.id==="POB-P2-2022-JAN").lowTextPagesReviewed).toEqual([2,19]);
  expect(POB_HISTORICAL_FIRST_FIFTEEN.find(r=>r.id==="POB-P2-2023-JAN").lowTextPagesReviewed).toEqual([2,23]);
 });
 test("pre-2017 P2 uses three compulsory plus one of each optional pair",()=>{
  for(const id of ["POB-P2-2009-MJ","POB-P2-2014-MJ","POB-P2-2016-MJ"]){
   expect(validatePobHistoricalP2Selection(id,[1,2,3,4,6])).toEqual({
    valid:true,maximumMarks:100,issue:null
   });
   expect(validatePobHistoricalP2Selection(id,[1,2,3,5,7]).valid).toBe(true);
   for(const bad of [[1,2,3,4,5],[1,2,3,6,7],[1,2,3,4,4],[1,2,3,4,8],[1,2,3,4]]){
    expect(validatePobHistoricalP2Selection(id,bad).valid).toBe(false);
    expect(validatePobHistoricalP2Selection(id,bad).maximumMarks).toBe(0);
   }
  }
 });
 test("2017 and later exam booklets contain five compulsory 20-mark questions",()=>{
  for(const id of ["POB-P2-2017-MJ","POB-P2-2018-MJ",
   "POB-P2-2022-JAN","POB-P2-2022-MJ","POB-P2-2023-JAN"]){
   expect(validatePobHistoricalP2Selection(id,[1,2,3,4,5]).valid).toBe(true);
   expect(validatePobHistoricalP2Selection(id,[1,2,3,4,6]).valid).toBe(false);
  }
 });
 test("reviewed 2019–25 scanned Paper 2 booklets support exactly five compulsory selections",()=>{
  const ids=["POB-P2-2019-JAN","POB-P2-2019-MJ","POB-P2-2021-MJ",
   "POB-P2-2023-MJ","POB-P2-2024-MJ","POB-P2-2025-JAN"];
  for(const id of ids){
   expect(validatePobHistoricalP2Selection(id,[1,2,3,4,5]))
    .toEqual({valid:true,maximumMarks:100,issue:null});
   expect(validatePobHistoricalP2Selection(id,[1,2,3,4,6]).valid).toBe(false);
   expect(validatePobHistoricalP2Selection(id,[1,2,3,4,4]).valid).toBe(false);
  }
  // 2019 alternative duplicate is kept separately on its bespoke audited
  // rubric, and isn't accidentally whitelisted by a similar filename.
  expect(validatePobHistoricalP2Selection("POB-P2-2019-MJ-ALT",[1,2,3,4,5]).valid).toBe(false);
 });
 test("historical marking intake rejects invalid old choices and typed-only source",()=>{
  const old=POB_SUPPLIED_ARCHIVE.find(row=>row.id==="POB-P2-2014-MJ");
  const wrong=assessPobHistoricalAutoScoring({
   ...old,selectedQuestionNumbers:[1,2,3,4,5],
   questionSelectionRulesVerified:true
  },{secureServerMarkerEnabled:true,calibratedServerBenchmarkPassed:true});
  expect(wrong.issues).toEqual(expect.arrayContaining([
   expect.stringContaining("Source-based question selection is not verified")
  ]));
  const derivative=POB_SUPPLIED_ARCHIVE.find(row=>row.id==="POB-P2-2024-JAN");
  const result=assessPobHistoricalAutoScoring({
   ...derivative,selectedQuestionNumbers:[1,2,3,4,5],
   questionSelectionRulesVerified:true
  },{secureServerMarkerEnabled:true,calibratedServerBenchmarkPassed:true});
  expect(result.ready).toBe(false);
  expect(result.issues).toEqual(expect.arrayContaining([
   expect.stringContaining("derivative transcript")
  ]));
 });
 test("unknown, non-paper-2 and typed-transcript sources never pass source rules",()=>{
  for(const id of ["POB-P2-2024-JAN","POB-P1-2023-JAN","POB-P2-2099-MJ"]){
   expect(validatePobHistoricalP2Selection(id,[1,2,3,4,5]).valid).toBe(false);
  }
  expect(validatePobHistoricalP2Selection("POB-P2-2017-MJ",["1",2,3,4,5]).valid).toBe(false);
  expect(validatePobHistoricalP2Selection("POB-P2-2017-MJ",null).valid).toBe(false);
 });
});
