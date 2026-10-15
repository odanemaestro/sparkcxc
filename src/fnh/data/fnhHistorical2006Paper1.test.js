import {FNH_HISTORICAL_P1_2006,fnh2006Paper1ReviewSummary} from "./fnhHistorical2006Paper1";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
describe("May/June 2006 historical Paper1 source and answer-key gating",()=>{
 test("all 60 numbered items include four original choices and a reviewed source reference",()=>{
  expect(FNH_HISTORICAL_P1_2006).toHaveLength(60);
  expect(FNH_HISTORICAL_P1_2006.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(new Set(FNH_HISTORICAL_P1_2006.map(q=>q.id)).size).toBe(60);
  expect(FNH_HISTORICAL_P1_2006.every(q=>q.options.length===4&&q.questionTextChecked)).toBe(true);
 });
 test("both original 2006 figures retain their source question numbers",()=>{
  expect(FNH_HISTORICAL_P1_2006[33].diagramId).toBe("kitchen-layout-2006");
  expect(FNH_HISTORICAL_P1_2006[42].diagramId).toBe("caribbean-dishes-table-2006");
  expect(FNH_HISTORICAL_P1_2006[27].explanation).toMatch(/cost per gram/);
 });
 test("source ambiguities and unofficial keys prevent automatic simulated release",()=>{
  const report=fnh2006Paper1ReviewSummary();
  expect(report).toMatchObject({total:60,transcribed:60,readyForExam:false});
  expect(report.unresolvedKeys).toBeGreaterThan(0);
  expect(report.proposedKeys+report.unresolvedKeys).toBe(60);
  expect(fnhHistoricalSimulatorReady("FNH-P1-2006-MJ")).toBeNull();
  expect(FNH_SUPPLIED_ARCHIVE.find(q=>q.id==="FNH-P1-2006-MJ")).toMatchObject({
    transcribedQuestionCount:60,verifiedQuestionCount:0,answerKeyStatus:"independent-review-required"
  });
 });
});
