import {FNH_P1_2020_TRANSCRIPTION_DRAFT as rows} from "./fnhHistorical2020Paper1Draft";
import {FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS,fnhHistoricalPaper1ReleaseCheck} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";

describe("2020 FNH historical Paper 01 source transcription",()=>{
 test("the complete nine-page scan has questions 1 to 60 in sequence with four authentic options",()=>{
  expect(rows).toHaveLength(60);
  expect(rows.map(x=>x.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(new Set(rows.map(x=>x.id)).size).toBe(60);
  expect(rows.every(x=>x.sourceChecked===true&&typeof x.stem==="string"&&x.stem.trim().length>15
    &&Array.isArray(x.options)&&x.options.length===4&&new Set(x.options).size===4)).toBe(true);
  expect(rows.map(x=>x.sourcePage).filter((p,i,a)=>i===0||p!==a[i-1])).toEqual([1,2,3,4,5,6,7,8,9]);
  expect(rows.filter(x=>!x.proposedAnswer).map(x=>x.number)).toEqual([1,2,10,33,36,38,41,45,49,52,60]);
 });
 test("historical tables and illustration questions retain their original positions",()=>{
  expect(rows.filter(x=>x.diagramId).map(x=>[x.number,x.diagramId])).toEqual([
   [10,"place-setting-2020"],[21,"kitchen-u-shaped-2020"],[35,"caribbean-dishes-2020"],
   [38,"refrigerator-storage-2020"],[60,"luncheon-presentation-2020"]
  ]);
  for(const n of [10,35,38,60])expect(rows[n-1].sourceContext).toBeTruthy();
  expect(rows[27].options).toEqual(rows[28].options);
  expect(rows[52].options).toEqual(rows[53].options);
 });
 test("the official source cover and authentic key are missing, so release is blocked",()=>{
  const check=fnhHistoricalPaper1ReleaseCheck(rows);
  expect(check).toMatchObject({
   ready:false,questions:60,numbered:true,sourceComplete:true,keysComplete:false,evidenceComplete:false
  });
  expect(check.pendingKeyNumbers).toHaveLength(60);
  expect(rows.every(x=>x.officialKeyVerified===false)).toBe(true);
  const row=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2020-MJ");
  expect(row).toMatchObject({sourceCoverChecked:false,sourcePageCount:9,transcribedQuestionCount:60,verifiedQuestionCount:0});
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.find(x=>x.id===row.id))
    .toMatchObject({questions:60,sourceComplete:true,ready:false});
  expect(fnhHistoricalSimulatorReady(row.id)).toBeNull();
 });
});
