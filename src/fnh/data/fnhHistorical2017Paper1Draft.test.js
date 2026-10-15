import {FNH_P1_2017_TRANSCRIPTION_DRAFT as items} from "./fnhHistorical2017Paper1Draft";
import {FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
describe("2017 Technical Proficiency FNH historical Paper1 integrity",()=>{
 test("source cover and all sixty items retain original exam properties",()=>{
  expect(FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2017-MJ")).toMatchObject({
   durationMinutes:90,sourceQuestionsExpected:60,transcribedQuestionCount:60,qualification:"Technical Proficiency"});
  expect(items).toHaveLength(60);
  expect(items.map(x=>x.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(items.every(x=>x.sourceChecked&&x.options.length===4&&new Set(x.options).size===4)).toBe(true);
  expect(new Set(items.map(x=>x.stem)).size).toBe(60);
 });
 test("exact source diagram positions and shared-answer questions are retained",()=>{
  expect(items.find(x=>x.number===25)?.diagramId).toBe("place-setting-2017");
  expect(items.find(x=>x.number===52)?.diagramId).toBe("kitchen-u-layout-2017");
  expect(items.find(x=>x.number===56)?.options).toEqual(items.find(x=>x.number===57)?.options);
  expect(items.find(x=>x.number===29)?.options).toEqual(items.find(x=>x.number===30)?.options);
 });
 test("ambiguous keys remain disabled until source review",()=>{
  expect(items.every(q=>q.proposedAnswer===null||/^[ABCD]$/.test(q.proposedAnswer))).toBe(true);
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.find(x=>x.year===2017))
    .toMatchObject({questions:60,sourceComplete:true,keysComplete:false,ready:false});
  expect(fnhHistoricalSimulatorReady("FNH-P1-2017-MJ")).toBeNull();
 });
});
