import {FNH_P1_2015_TRANSCRIPTION_DRAFT} from "./fnhHistorical2015Paper1Draft";
import {FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
describe("2015 historical FNH Paper 1 source transcription release gate",()=>{
 test("all original sixty questions, options and source pages are present",()=>{
  const items=FNH_P1_2015_TRANSCRIPTION_DRAFT;
  expect(items).toHaveLength(60);
  expect(items.map(row=>row.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(items.every(row=>row.sourceChecked&&row.options.length===4)).toBe(true);
  expect(items.every(row=>row.sourcePage>=1&&row.sourcePage<=8)).toBe(true);
 });
 test("source completeness does not imply official answer-key approval",()=>{
  const source=FNH_SUPPLIED_ARCHIVE.find(row=>row.id==="FNH-P1-2015-MJ");
  const progress=FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.find(row=>row.year===2015);
  expect(source.transcribedQuestionCount).toBe(60);
  expect(progress).toMatchObject({questions:60,sourceComplete:true,keysComplete:false,ready:false});
  expect(itemsMissingKeys()).toBeGreaterThan(0);
  expect(fnhHistoricalSimulatorReady(source.id)).toBeNull();
 });
});
function itemsMissingKeys(){return FNH_P1_2015_TRANSCRIPTION_DRAFT.filter(x=>!x.proposedAnswer).length;}
