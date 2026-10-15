import {FNH_P1_2018_TRANSCRIPTION_DRAFT as questions} from "./fnhHistorical2018Paper1Draft";
import {FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS,fnhHistoricalPaper1ReleaseCheck} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";

describe("2018 Technical Proficiency FNH Paper 01 scan transcription",()=>{
 test("all 60 original question numbers, options and scanned source pages are represented",()=>{
  expect(questions).toHaveLength(60);
  expect(questions.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(new Set(questions.map(q=>q.id)).size).toBe(60);
  expect(questions.every(q=>typeof q.stem==="string"&&q.stem.trim()
    &&q.options.length===4&&new Set(q.options).size===4&&q.sourceChecked===true)).toBe(true);
  expect(questions.every(q=>Number.isInteger(q.sourcePage)&&q.sourcePage>=1&&q.sourcePage<=9)).toBe(true);
  expect([...new Set(questions.map(q=>q.sourcePage))].sort((a,b)=>a-b)).toEqual([1,2,3,4,5,6,7,8,9]);
 });
 test("the six source figures are linked to their original questions",()=>{
  expect(questions.filter(q=>q.diagramId).map(q=>[q.number,q.diagramId])).toEqual([
   [12,"place-setting-2018"],
   [43,"luncheon-menu-2018"],
   [44,"kitchen-u-shaped-2018"],
   [50,"refrigerator-positions-2018"],
   [55,"luncheon-presentation-2018"],
   [60,"meal-comparison-2018"]
  ]);
  for(const n of [12,43,50,55,60])expect(questions[n-1].sourceContext).toBeTruthy();
  expect(questions[52].options).toEqual(questions[53].options);
 });
 test("no official source keys or examiner attestation exist and the exam stays locked",()=>{
  const report=fnhHistoricalPaper1ReleaseCheck(questions);
  const archive=FNH_SUPPLIED_ARCHIVE.find(r=>r.id==="FNH-P1-2018-MJ");
  const progress=FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.find(r=>r.id===archive.id);
  expect(report).toMatchObject({questions:60,numbered:true,sourceComplete:true,keysComplete:false,ready:false});
  expect(report.pendingKeyNumbers).toHaveLength(60);
  expect(questions.every(q=>q.officialKeyVerified===false)).toBe(true);
  expect(questions.every(q=>q.proposedAnswer===null||/^[ABCD]$/.test(q.proposedAnswer))).toBe(true);
  expect(archive).toMatchObject({sourceQuestionCount:60,transcribedQuestionCount:60,verifiedQuestionCount:0,sourceCoverChecked:false});
  expect(progress).toMatchObject({questions:60,reportedTranscribed:60,sourceComplete:true,ready:false});
  expect(fnhHistoricalSimulatorReady(archive.id)).toBeNull();
 });
 test("no Paper 01 item becomes an available graded examination through inventory flags",()=>{
  const raw=FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===1);
  expect(raw).toHaveLength(15);
  expect(raw.every(p=>fnhHistoricalSimulatorReady(p.id)===null)).toBe(true);
  const oldP2=FNH_SUPPLIED_ARCHIVE.find(p=>p.id==="FNH-P2-2018-MJ");
  expect(fnhHistoricalSimulatorReady(oldP2.id)?.id).toBe(oldP2.id);
 });
});
