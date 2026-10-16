import {POB_HISTORICAL_P2_BATCH02,POB_HISTORICAL_P2_BATCH02_SUMMARY} from "./pobHistoricalP2Batch02";
import {POB_HISTORICAL_P2_BATCH01} from "./pobHistoricalP2Batch01";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {validatePobHistoricalCandidate} from "./pobHistoricalReleaseGate";

describe("second historical POB Paper 2 batch (exactly ten sources)",()=>{
 test("10 unique papers, 78 pages, 21 segmented question bodies",()=>{
  expect(POB_HISTORICAL_P2_BATCH02_SUMMARY).toEqual({
   paperCount:10,pages:78,segmentedQuestionDrafts:21,
   awaitingVisualTranscription:7,released:0
  });
  expect(new Set(POB_HISTORICAL_P2_BATCH02.map(p=>p.id)).size).toBe(10);
 });
 test("source hashes, filenames, pages match the supplied archive inventory",()=>{
  for(const paper of POB_HISTORICAL_P2_BATCH02){
   const src=POB_SUPPLIED_ARCHIVE.find(p=>p.id===paper.id);
   expect(src).toBeDefined();
   expect(src.filename).toBe(paper.filename);
   expect(src.pages).toBe(paper.sourcePages);
   expect(paper.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
   expect(paper.transcriptionDraftPath).toContain(paper.id+".json");
  }
 });
 test("the 21 text-layer question blocks have all mark tokens but no verified answer keys",()=>{
  const parsed=POB_HISTORICAL_P2_BATCH02.filter(p=>p.questionCountExtracted===7);
  expect(parsed.map(p=>p.year)).toEqual([2009,2010,2011]);
  parsed.forEach(p=>expect(p.questionMarkTokensFromText).toEqual(Array(7).fill(20)));
 });
 test("the seven scanned or partial-text sources are not falsely declared transcribed",()=>{
  const scanned=POB_HISTORICAL_P2_BATCH02.filter(p=>p.questionCountExtracted===0);
  expect(scanned).toHaveLength(7);
  expect(scanned.every(p=>p.extractionStatus==="visual-transcription-required")).toBe(true);
 });
 test("the two ten-paper batches do not overlap",()=>{
  const earlier=new Set(POB_HISTORICAL_P2_BATCH01.map(p=>p.id));
  expect(POB_HISTORICAL_P2_BATCH02.some(p=>earlier.has(p.id))).toBe(false);
  expect(POB_HISTORICAL_P2_BATCH02.length+POB_HISTORICAL_P2_BATCH01.length).toBe(20);
 });
 test("no historical batch 02 entry can bypass the complete release gate",()=>{
  expect(pobReleasedHistoricalPapers()).toEqual([]);
  for(const paper of POB_HISTORICAL_P2_BATCH02){
   expect(paper.simulatorReady).toBe(false);
   expect(paper.questionTranscriptionVerified).toBe(false);
   expect(paper.answerKeyVerified).toBe(false);
   expect(paper.markingSchemeVerified).toBe(false);
   expect(validatePobHistoricalCandidate(paper).ready).toBe(false);
  }
 });
});
