import {FNH_P1_2026_TRANSCRIPTION_DRAFT as rows} from "./fnhHistorical2026Paper1Draft";
import {FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS,fnhHistoricalPaper1ReleaseCheck} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
describe("2026 Technical Proficiency FNH Paper 01",()=>{
 test("2026 cover and all 60 question texts verified against the ten-page original source",()=>{
  const meta=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2026-MJ");
  expect(meta).toMatchObject({sourceCoverChecked:true,sourcePageCount:10,
   sourceQuestionCount:60,transcribedQuestionCount:60,durationMinutes:90,qualification:"Technical Proficiency"});
  expect(rows).toHaveLength(60);
  expect(rows.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(new Set(rows.map(q=>q.id)).size).toBe(60);
  expect(rows.every(q=>q.sourceChecked===true&&q.officialKeyVerified===false
    &&Array.isArray(q.options)&&q.options.length===4&&new Set(q.options).size===4
    &&typeof q.stem==="string"&&q.stem.trim().length>15)).toBe(true);
  expect([...new Set(rows.map(q=>q.sourcePage))].sort((a,b)=>a-b)).toEqual([2,3,4,5,6,7,8,9,10]);
 });
 test("source-label anomalies and six original diagrams remain traceable",()=>{
  expect(rows.filter(q=>q.diagramId).map(q=>[q.number,q.diagramId])).toEqual([
   [11,"guava-jam-label-2026"],[19,"kitchen-u-shaped-2026"],
   [37,"nutrient-types-2026"],[43,"meal-comparison-2026"],
   [48,"luncheon-presentation-2026"],[56,"nutrition-label-2026"]
  ]);
  expect(rows[10].sourceContext).toMatch(/Net Weight: 4/);
  expect(rows[55].sourceContext).toMatch(/Sodium 850 g 37%/);
  expect(rows[53].options).toEqual(rows[54].options);
 });
 test("proposed answers remain unverified, so 2026 Paper 01 is locked",()=>{
  expect(rows.every(q=>q.proposedAnswer===null||/^[ABCD]$/.test(q.proposedAnswer))).toBe(true);
  const check=fnhHistoricalPaper1ReleaseCheck(rows);
  expect(check).toMatchObject({ready:false,questions:60,numbered:true,sourceComplete:true,keysComplete:false});
  expect(check.pendingKeyNumbers).toHaveLength(60);
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.find(x=>x.year===2026))
    .toMatchObject({questions:60,reportedTranscribed:60,sourceComplete:true,ready:false});
  expect(fnhHistoricalSimulatorReady("FNH-P1-2026-MJ")).toBeNull();
 });
});
