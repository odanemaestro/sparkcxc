import {FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS,fnhPaper1ArchiveReadiness} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
describe("FNH Paper 01 historical archive coverage and release safety",()=>{
 test("all valid supplied FNH Paper 01 sources are recorded with their real question count",()=>{
  const rows=FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS;
  expect(rows).toHaveLength(16);
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
  expect(a).toMatchObject({total:16,ready:0,inProgress:15,pending:16});
 });
 test("the fake 2021 FNH source is not counted as a real FNH question transcription",()=>{
  const r=FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.find(x=>x.year===2021);
  const inventory=FNH_SUPPLIED_ARCHIVE.find(x=>x.id===r.id);
  expect(inventory.sourceIdentityVerified).toBe(false);
  expect(inventory.actualSourceSubject).toBe("Spanish");
  expect(r).toMatchObject({questions:0,reportedTranscribed:0,ready:false});
 });
});
