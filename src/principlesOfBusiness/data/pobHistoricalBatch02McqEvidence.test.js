import {inspectPobBatch02McqEvidence} from "./pobHistoricalBatch02McqEvidence";
import {POB_HISTORICAL_BATCH02_AUTHORED,POB_HISTORICAL_BATCH02_PARTIAL_SOURCE} from "./pobHistoricalBatch02AuthoredAudit";

describe("second batch POB original-paper answer dispute evidence",()=>{
 test("all fourteen MCQ sources are counted while unknown original questions stay ungraded",()=>{
  const report=inspectPobBatch02McqEvidence();
  expect(report.valid).toBe(true);
  expect(report.issues).toEqual([]);
  expect(report.paperCount).toBe(14);
  expect(report.totalAuthoredMcqItems).toBe(835);
  expect(report.sourceMissingItemCount).toBe(5);
  expect(report.productionReadyPapers).toBe(0);
  const source=report.reports.find(r=>r.paperId==="POB-P1-2018-MJ");
  expect(source).toBeDefined();
  expect(source.missingOriginalQuestionNumbers).toEqual([53,54,55,56,57]);
  expect(source.authoredItems).toBe(55);
 });
 test("authored rows, original fingerprints, and live scoring gate remain consistent",()=>{
  const report=inspectPobBatch02McqEvidence();
  const keys=[...POB_HISTORICAL_BATCH02_AUTHORED.map(([paper])=>paper),POB_HISTORICAL_BATCH02_PARTIAL_SOURCE];
  expect(keys.map(x=>x.id).sort()).toEqual(report.reports.map(r=>r.paperId).sort());
  for(const record of report.reports){
   expect(record.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
   expect(record.reliableLiveScoringReady).toBe(false);
  }
  const disputed=report.reports.filter(r=>r.academicallyDisputedNumbers.length);
  expect(disputed.length).toBeGreaterThan(0);
 });
});
