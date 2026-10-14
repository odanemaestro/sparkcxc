import {FNH_HISTORICAL_P1_2003,fnh2003Paper1ReviewSummary} from "./fnhHistorical2003Paper1";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";

describe("2003 Food and Nutrition Paper 1 source-faithful transcription gate",()=>{
 test("all 60 historical questions occur once, in source order, with four choices",()=>{
  expect(FNH_HISTORICAL_P1_2003).toHaveLength(60);
  expect(FNH_HISTORICAL_P1_2003.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(new Set(FNH_HISTORICAL_P1_2003.map(q=>q.id)).size).toBe(60);
  expect(FNH_HISTORICAL_P1_2003.every(q=>q.options.length===4&&q.stem.length>15)).toBe(true);
  expect(FNH_HISTORICAL_P1_2003.every(q=>q.questionTextChecked&&q.sourcePage>=1&&q.sourcePage<=6)).toBe(true);
 });
 test("ambiguous, outdated or incomplete source answers are never silently assumed valid",()=>{
  const report=fnh2003Paper1ReviewSummary();
  expect(report).toMatchObject({total:60,transcribed:60,readyForExam:false});
  expect(report.unresolvedKeys).toBeGreaterThanOrEqual(1);
  expect(report.proposedKeys+report.unresolvedKeys).toBe(60);
  FNH_HISTORICAL_P1_2003.filter(q=>q.answer==null).forEach(q=>{
    expect(q.keyReviewStatus).toBe("unresolved-source-ambiguity");
    expect(q.explanation.length).toBeGreaterThan(40);
  });
  expect(fnhHistoricalSimulatorReady("FNH-P1-2003-MJ")).toBeNull();
  const source=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2003-MJ");
  expect(source).toMatchObject({transcribedQuestionCount:60,verifiedQuestionCount:0,answerKeyStatus:"independent-review-required"});
 });
});
