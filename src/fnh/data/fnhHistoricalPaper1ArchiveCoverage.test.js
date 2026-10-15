import {FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS,fnhPaper1ArchiveReadiness} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
describe("FNH Paper 01 historical archive coverage and release safety",()=>{
 test("all valid supplied FNH Paper 01 sources are recorded with their real question count",()=>{
  const rows=FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS;
  expect(rows).toHaveLength(15);
  const actual=rows.filter(x=>FNH_SUPPLIED_ARCHIVE.find(s=>s.id===x.id)?.sourceIdentityVerified!==false);
  expect(actual).toHaveLength(15);
  expect(actual.filter(x=>x.questions===60)).toHaveLength(14);
  expect(actual.find(x=>x.year===2005)).toMatchObject({
   questions:53,missingSourceQuestions:[54,55,56,57,58,59,60],ready:false
  });
  expect(actual.reduce((sum,x)=>sum+x.questions,0)).toBe(893);
 });
 test("every historical Paper 01 is locked until original keys pass independent verification",()=>{
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.every(x=>x.ready===false)).toBe(true);
  expect(FNH_SUPPLIED_ARCHIVE.filter(x=>x.paper===1).every(x=>fnhHistoricalSimulatorReady(x.id)===null)).toBe(true);
  const a=fnhPaper1ArchiveReadiness();
  expect(a).toMatchObject({total:15,ready:0,inProgress:15,pending:15});
 });
 test("misidentified 2021 Paper 1 is excluded entirely",()=>{
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.some(x=>x.year===2021)).toBe(false);
  expect(FNH_SUPPLIED_ARCHIVE.some(x=>x.id==="FNH-P1-2021-MJ")).toBe(false);
 });
});
