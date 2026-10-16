import {POB_HISTORICAL_P2_BATCH01,POB_HISTORICAL_P2_BATCH01_SUMMARY} from "./pobHistoricalP2Batch01";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {validatePobHistoricalCandidate} from "./pobHistoricalReleaseGate";

describe("ten-paper historical POB Paper 2 batch 01",()=>{
 test("contains exactly 10 distinct source PDFs and 60 question bodies",()=>{
  expect(POB_HISTORICAL_P2_BATCH01_SUMMARY).toMatchObject({paperCount:10,questionBodies:60,releaseEligible:0});
  expect(new Set(POB_HISTORICAL_P2_BATCH01.map(p=>p.id)).size).toBe(10);
  expect(POB_HISTORICAL_P2_BATCH01.reduce((n,p)=>n+p.sourcePages,0)).toBe(136);
 });
 test("each record matches an existing source inventory entry and has a SHA-256 provenance ID",()=>{
  for(const paper of POB_HISTORICAL_P2_BATCH01){
   const inventory=POB_SUPPLIED_ARCHIVE.find(p=>p.id===paper.id);
   expect(inventory).toBeDefined();
   expect(inventory.pages).toBe(paper.sourcePages);
   expect(inventory.filename).toBe(paper.filename);
   expect(paper.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
   expect(paper.markTokensFromText).toHaveLength(paper.questionCount);
  }
 });
 test("preserves choice-based 2012-16 format and five compulsory 2017+ format",()=>{
  const old=POB_HISTORICAL_P2_BATCH01.filter(p=>p.year<=2016);
  const newer=POB_HISTORICAL_P2_BATCH01.filter(p=>p.year>=2017);
  expect(old).toHaveLength(5);
  expect(newer).toHaveLength(5);
  for(const paper of old){
   expect(paper.questionCount).toBe(7);
   expect(paper.examinationStructure.compulsory).toEqual([1,2,3]);
   expect(paper.examinationStructure.choices).toEqual([[4,5],[6,7]]);
  }
  for(const paper of newer){
   expect(paper.questionCount).toBe(5);
   expect(paper.examinationStructure.compulsory).toEqual([1,2,3,4,5]);
   expect(paper.examinationStructure.choices).toEqual([]);
  }
 });
 test("detects OCR-like text-layer mark anomaly without manufacturing marks",()=>{
  const q=POB_HISTORICAL_P2_BATCH01.find(p=>p.id==="POB-P2-2017-MJ");
  expect(q.textExtractionIssue).toBe(true);
  expect(q.markTokensFromText[1]).toBe(16);
  expect(POB_HISTORICAL_P2_BATCH01.filter(p=>p.textExtractionIssue)).toHaveLength(1);
 });
 test("all ten drafts stay blocked from simulator, with explicit release checks",()=>{
  expect(pobReleasedHistoricalPapers()).toEqual([]);
  for(const paper of POB_HISTORICAL_P2_BATCH01){
   expect(paper.simulatorReady).toBe(false);
   expect(paper.answerKeyVerified).toBe(false);
   expect(paper.markingSchemeVerified).toBe(false);
   expect(validatePobHistoricalCandidate(paper).ready).toBe(false);
  }
 });
});
