import {POB_HISTORICAL_BATCH03,POB_HISTORICAL_BATCH03_SUMMARY} from "./pobHistoricalBatch03";
import {POB_HISTORICAL_P2_BATCH01} from "./pobHistoricalP2Batch01";
import {POB_HISTORICAL_P2_BATCH02} from "./pobHistoricalP2Batch02";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {validatePobHistoricalCandidate} from "./pobHistoricalReleaseGate";

describe("historical POB batch 03: five Paper 2 and five Paper 1 sources",()=>{
 test("contains exactly ten source-backed papers and 104 pages",()=>{
  expect(POB_HISTORICAL_BATCH03_SUMMARY).toMatchObject({
   paperCount:10,paper1:5,paper2:5,pages:104,
   paper1DistinctHeadingCandidates:237,confirmedHistoricalAnswerKeys:0,releaseEligible:0
  });
  expect(new Set(POB_HISTORICAL_BATCH03.map(p=>p.id)).size).toBe(10);
 });
 test("archive filenames and page counts agree with the known sources",()=>{
  POB_HISTORICAL_BATCH03.forEach(p=>{
   const item=POB_SUPPLIED_ARCHIVE.find(source=>source.id===p.id);
   expect(item).toBeDefined();
   expect(p.filename).toBe(item.filename);
   expect(p.sourcePages).toBe(item.pages);
   expect(p.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
  });
 });
 test("no overlap with earlier 20 historical Paper 2 sources",()=>{
  const prior=new Set([...POB_HISTORICAL_P2_BATCH01,...POB_HISTORICAL_P2_BATCH02].map(p=>p.id));
  expect(POB_HISTORICAL_BATCH03.some(p=>prior.has(p.id))).toBe(false);
  const all=[...prior,...POB_HISTORICAL_BATCH03.filter(p=>p.paper===2).map(p=>p.id)];
  expect(new Set(all).size).toBe(25);
  expect(all.length).toBe(25);
 });
 test("never treats Paper 1 heading detection as verified questions",()=>{
  const first=POB_HISTORICAL_BATCH03.filter(p=>p.paper===1);
  expect(first).toHaveLength(5);
  expect(first.every(p=>p.extractionStatus==="page-column-draft-unverified")).toBe(true);
  expect(first.every(p=>p.distinctNumberCandidates<60)).toBe(true);
  expect(first.every(p=>p.questionTranscriptionVerified===false)).toBe(true);
 });
 test("keeps January 2024 compiled draft and January 2026 Hybrid source distinct",()=>{
  const jan24=POB_HISTORICAL_BATCH03.find(p=>p.id==="POB-P2-2024-JAN");
  const jan26=POB_HISTORICAL_BATCH03.find(p=>p.id==="POB-P2-2026-JAN");
  expect(jan24.extractionStatus).toBe("compiled-source-with-previous-draft");
  expect(jan24.distinctNumberCandidates).toBe(5);
  expect(jan26.paperFormat).toBe("hybrid-supplied-copy");
  expect(jan26.extractionStatus).toBe("visual-transcription-required");
 });
 test("all ten stay blocked until each independent academic check passes",()=>{
  expect(pobReleasedHistoricalPapers()).toEqual([]);
  for(const p of POB_HISTORICAL_BATCH03){
   expect(p.answerKeyVerified).toBe(false);
   expect(p.markingSchemeVerified).toBe(false);
   expect(p.simulatorReady).toBe(false);
   expect(validatePobHistoricalCandidate(p).ready).toBe(false);
  }
 });
});
