import {POB_HISTORICAL_BATCH04,POB_HISTORICAL_BATCH04_SUMMARY} from "./pobHistoricalBatch04";
import {POB_HISTORICAL_BATCH03} from "./pobHistoricalBatch03";
import {POB_HISTORICAL_P2_BATCH01} from "./pobHistoricalP2Batch01";
import {POB_HISTORICAL_P2_BATCH02} from "./pobHistoricalP2Batch02";
import {POB_SUPPLIED_ARCHIVE,POB_SOURCE_INVENTORY,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {validatePobHistoricalCandidate} from "./pobHistoricalReleaseGate";

describe("POB historical Paper 1 batch 04 source QA",()=>{
 test("exactly ten named sources, with 93 pages but nine genuine Paper 1 copies",()=>{
  expect(POB_HISTORICAL_BATCH04_SUMMARY).toEqual({
   fileCount:10,genuinePaper1Sources:9,mislabelledPaper2Sources:1,
   sourcePages:93,genuinePaper1Pages:78,textReadablePaper1Sources:7,
   unverifiedNumberHints:282,readyForSimulator:0
  });
  expect(new Set(POB_HISTORICAL_BATCH04.map(p=>p.id)).size).toBe(10);
 });
 test("every fingerprint matches a source in the original named-file inventory",()=>{
  for(const paper of POB_HISTORICAL_BATCH04){
   const src=POB_SUPPLIED_ARCHIVE.find(row=>row.id===paper.id);
   expect(src).toBeDefined();
   expect(paper.filename).toBe(src.filename);
   expect(paper.sourcePages).toBe(src.pages);
   expect(paper.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
  }
 });
 test("2019 P1 filename contains Paper 02, so the archive must quarantine it",()=>{
  const p=POB_HISTORICAL_BATCH04.find(row=>row.year===2019);
  expect(p.filename).toBe("CSEC_Principles_of_Business_P1_2019_MJ.pdf");
  expect(p.paper).toBe(2);
  expect(p.paperPrintedOnCover).toBe(2);
  expect(p.printedTestCode).toBe("01240020");
  expect(p.sourcePaperMismatch).toBe(false);
  expect(p.reclassifiedFromPaper1).toBe(true);
  expect(p.sourceStatus).toBe("reclassified-as-alternate-paper02");
  const archive=POB_SUPPLIED_ARCHIVE.find(row=>row.id===p.id);
  expect(archive.reclassifiedFromPaper1).toBe(true);
  expect(archive.paper).toBe(2);
  expect(archive.coverPaperNumber).toBe(2);
  expect(POB_SOURCE_INVENTORY.mislabeledPaper1Sources).toBe(1);
  expect(validatePobHistoricalCandidate({...p,sourceFilename:p.filename}).ready).toBe(false);
  expect(p.id).toBe("POB-P2-2019-MJ-ALT");
 });
 test("2014 rotation and genuinely scanned sources remain incomplete",()=>{
  const year=y=>POB_HISTORICAL_BATCH04.find(p=>p.year===y);
  expect(year(2014).sourceRotations).toContain(180);
  expect(year(2014).sourceStatus).toBe("text-layer-page-column-draft");
  expect(year(2016).sourceStatus).toBe("visual-transcription-required");
  expect(year(2018).sourceStatus).toBe("visual-transcription-required");
  expect(year(2019).sourceTextChars).toBe(0);
 });
 test("batch 04 does not duplicate prior paper IDs and leaves only six source filenames",()=>{
  const all=[...POB_HISTORICAL_P2_BATCH01,...POB_HISTORICAL_P2_BATCH02,
    ...POB_HISTORICAL_BATCH03,...POB_HISTORICAL_BATCH04];
  const ids=new Set(all.map(p=>p.id));
  expect(ids.size).toBe(40);
  expect(all.reduce((sum,p)=>sum+(p.sourcePages||0),0)).toBe(411);
  expect(POB_SUPPLIED_ARCHIVE.length-ids.size).toBe(6);
  expect(pobReleasedHistoricalPapers()).toEqual([]);
 });
 test("even otherwise passing QA cannot release a mislabeled paper",()=>{
  const candidate={
   paper:1,paperPrintedOnCover:2,sourcePaperMismatch:true,
   sourceFilename:"mislabelled.pdf",sourceAuthenticityVerified:true,
   visualPageVerified:true,questionTranscriptionVerified:true,
   answerKeyVerified:true,markingSchemeVerified:true,
   syllabusEraVerified:true,assessmentQAComplete:true
  };
  const check=validatePobHistoricalCandidate(candidate);
  expect(check.ready).toBe(false);
  expect(check.issues.some(issue=>issue.includes("conflicts"))).toBe(true);
 });
});
