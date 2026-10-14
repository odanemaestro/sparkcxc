import {FNH_HISTORICAL_P1_2004,fnh2004Paper1ReviewSummary} from "./fnhHistorical2004Paper1";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
describe("2004 source-paper MCQ transcription and no-invalid-key gate",()=>{
 test("all sixty question identifiers preserve original sequence and source page mapping",()=>{
  const paper=FNH_HISTORICAL_P1_2004;
  expect(paper).toHaveLength(60);
  expect(paper.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(new Set(paper.map(q=>q.id)).size).toBe(60);
  expect(paper.filter(q=>q.options.length===4)).toHaveLength(58);
  expect(paper.filter(q=>q.questionTextChecked)).toHaveLength(58);
  expect(paper.every(q=>q.sourcePage>=1&&q.sourcePage<=8)).toBe(true);
 });
 test("question-dependent diagrams are linked to original source questions",()=>{
  expect(FNH_HISTORICAL_P1_2004[24].diagramId).toBe("place-setting-2004");
  expect(FNH_HISTORICAL_P1_2004[51].diagramId).toBe("kitchen-layout-2004");
  expect(FNH_HISTORICAL_P1_2004[57].diagramId).toBe("refrigerator-storage-table-2004");
 });
 test("incomplete source options and disputed health claims cannot yield official grade",()=>{
  const report=fnh2004Paper1ReviewSummary();
  expect(report).toMatchObject({total:60,transcribed:58,missingSourceOptions:2,readyForExam:false});
  expect(report.unresolvedKeys).toBeGreaterThanOrEqual(1);
  expect(report.proposedKeys+report.unresolvedKeys+report.missingSourceOptions).toBe(60);
  const missing=FNH_HISTORICAL_P1_2004.filter(q=>q.keyReviewStatus==="missing-source-options");
  expect(missing.map(q=>q.number)).toEqual([46,47]);
  expect(missing.every(q=>q.answer==null&&q.options.length===0)).toBe(true);
  expect(fnhHistoricalSimulatorReady("FNH-P1-2004-MJ")).toBeNull();
  expect(FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2004-MJ")).toMatchObject({
    sourceQuestionCount:60,transcribedQuestionCount:58,verifiedQuestionCount:0,
  });
 });
});
