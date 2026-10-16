import {POB_HISTORICAL_BATCH05,POB_HISTORICAL_BATCH05_SUMMARY} from "./pobHistoricalBatch05";
import {POB_HISTORICAL_BATCH04} from "./pobHistoricalBatch04";
import {POB_HISTORICAL_BATCH03} from "./pobHistoricalBatch03";
import {POB_HISTORICAL_P2_BATCH01} from "./pobHistoricalP2Batch01";
import {POB_HISTORICAL_P2_BATCH02} from "./pobHistoricalP2Batch02";
import {POB_SUPPLIED_ARCHIVE,POB_SOURCE_INVENTORY,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {validatePobHistoricalCandidate} from "./pobHistoricalReleaseGate";
const all=[...POB_HISTORICAL_P2_BATCH01,...POB_HISTORICAL_P2_BATCH02,
 ...POB_HISTORICAL_BATCH03,...POB_HISTORICAL_BATCH04,...POB_HISTORICAL_BATCH05];
describe("Final six historical POB Paper 1 sources and whole-archive reconciliation",()=>{
 test("batch 05 covers six PDFs, 57 source pages, with two readable paper text layers",()=>{
  expect(POB_HISTORICAL_BATCH05_SUMMARY).toEqual({
   fileCount:6,sourcePages:57,headingNumbersNotVerified:118,
   sourcesWithQuestionTextLayer:2,sourcesRequiringVisualTranscription:4,
   visuallyLocatedMissingHeadings:2,verifiedAnswerKeys:0,approvedHistoricalSimulators:0
  });
 });
 test("the last six sources match the user-supplied inventory and SHA-256 format",()=>{
  for(const row of POB_HISTORICAL_BATCH05){
   const source=POB_SUPPLIED_ARCHIVE.find(p=>p.id===row.id);
   expect(source).toBeDefined();
   expect(row.filename).toBe(source.filename);
   expect(row.sourcePages).toBe(source.pages);
   expect(row.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
   expect(row.simulatorReady).toBe(false);
   expect(validatePobHistoricalCandidate(row).ready).toBe(false);
  }
 });
 test("2020 January omitted text-layer headings 22 and 41 exist visually on pages 4 and 6",()=>{
  const p=POB_HISTORICAL_BATCH05.find(p=>p.id==="POB-P1-2020-JAN");
  expect(p.textLayerQuestionCues).toBe(58);
  expect(p.visuallyRecoveredHeadingPages).toEqual({22:4,41:6});
  expect(p.questionTranscriptionVerified).toBe(false);
 });
 test("2023 January has 60 sequential heading cues but no validated answers",()=>{
  const p=POB_HISTORICAL_BATCH05.find(p=>p.id==="POB-P1-2023-JAN");
  expect(p.textLayerQuestionCues).toBe(60);
  expect(p.answerKeyVerified).toBe(false);
  expect(p.visuallyLocatedOptionLabels).toEqual({56:8,57:8,58:9});
  expect(p.answerChoicesVerified).toBe(false);
 });
 test("no wrong-paper source or missing Paper 1 gets hidden by source counts",()=>{
  const mislabelled=all.filter(p=>p.sourcePaperMismatch);
  expect(mislabelled.map(p=>p.id)).toEqual(["POB-P1-2019-MJ"]);
  expect(POB_SOURCE_INVENTORY.mislabeledPaper1Sources).toBe(1);
  expect(all.filter(p=>p.paper===1).length).toBe(21);
  expect(all.filter(p=>p.paper===1&&!p.sourcePaperMismatch).length).toBe(20);
 });
 test("all 46 original filenames are accounted for exactly once: 468 pages",()=>{
  const ids=all.map(p=>p.id);
  expect(ids).toHaveLength(46);
  expect(new Set(ids).size).toBe(46);
  expect(new Set(ids)).toEqual(new Set(POB_SUPPLIED_ARCHIVE.map(p=>p.id)));
  expect(all.reduce((n,p)=>n+p.sourcePages,0)).toBe(468);
  expect(pobReleasedHistoricalPapers()).toEqual([]);
 });
});
