import {FNH_HISTORICAL_P1_2005,FNH_2005_P1_MISSING_SOURCE_NUMBERS,fnh2005Paper1ReviewSummary} from "./fnhHistorical2005Paper1";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
describe("2005 original Food and Nutrition Paper1 source truncation audit",()=>{
 test("only source-supplied questions 1 through 53 are present",()=>{
  expect(FNH_HISTORICAL_P1_2005).toHaveLength(53);
  expect(FNH_HISTORICAL_P1_2005.map(q=>q.number)).toEqual(Array.from({length:53},(_,i)=>i+1));
  expect(FNH_2005_P1_MISSING_SOURCE_NUMBERS).toEqual([54,55,56,57,58,59,60]);
  expect(new Set(FNH_HISTORICAL_P1_2005.map(q=>q.id)).size).toBe(53);
 });
 test("original shared-choice and visual question references are retained",()=>{
  expect(FNH_HISTORICAL_P1_2005[22].diagramId).toBe("table-setting-four-2005");
  expect(FNH_HISTORICAL_P1_2005[47].diagramId).toBe("food-safety-four-2005");
  expect(FNH_HISTORICAL_P1_2005[2].stem).toBe(FNH_HISTORICAL_P1_2005[3].stem);
  expect(FNH_HISTORICAL_P1_2005[25].options).toHaveLength(4);
  expect(FNH_HISTORICAL_P1_2005[26].options).toHaveLength(4);
 });
 test("truncated 2005 scan never appears to students as a 60-question graded historical paper",()=>{
  const summary=fnh2005Paper1ReviewSummary();
  expect(summary).toMatchObject({sourceItemCount:53,requiredItemCount:60,readyForExam:false,duplicateSourceStem:true});
  expect(summary.missing).toHaveLength(7);
  expect(summary.proposedKeys+summary.unresolved).toBe(53);
  expect(fnhHistoricalSimulatorReady("FNH-P1-2005-MJ")).toBeNull();
  expect(FNH_SUPPLIED_ARCHIVE.find(q=>q.id==="FNH-P1-2005-MJ")).toMatchObject({
    sourceCompleteness:"missing-final-seven-items",transcribedQuestionCount:53,verifiedQuestionCount:0
  });
 });
});
