import {FNH_P1_2019_TRANSCRIPTION_DRAFT as questions} from "./fnhHistorical2019Paper1Draft";
import {FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS,fnhHistoricalPaper1ReleaseCheck} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";

describe("2019 FNH Paper 01 transcription and key release checks",()=>{
 test("full original cover and eight question pages provide all 60 ordered records",()=>{
  const source=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2019-MJ");
  expect(source).toMatchObject({
   sourceCoverChecked:true,sourcePageCount:9,sourceQuestionCount:60,
   transcribedQuestionCount:60,durationMinutes:90,qualification:"Technical Proficiency"
  });
  expect(questions).toHaveLength(60);
  expect(questions.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(new Set(questions.map(q=>q.id)).size).toBe(60);
  expect(questions.every(q=>q.sourceChecked===true&&q.officialKeyVerified===false
    &&Array.isArray(q.options)&&q.options.length===4&&new Set(q.options).size===4
    &&q.stem.trim().length>10)).toBe(true);
  expect([...new Set(questions.map(q=>q.sourcePage))].sort((a,b)=>a-b)).toEqual([2,3,4,5,6,7,8,9]);
 });
 test("the three diagram stimulus questions and shared options preserve source numbering",()=>{
  expect(questions.filter(q=>q.diagramId).map(q=>[q.number,q.diagramId])).toEqual([
   [41,"meal-comparison-2019"],[52,"kitchen-u-shaped-2019"],[58,"luncheon-presentation-2019"]
  ]);
  expect(questions[28].options).toEqual(questions[29].options);
  expect(questions[54].options).toEqual(questions[55].options);
  for(const n of [41,52,58])expect(questions[n-1].sourceContext).toBeTruthy();
 });
 test("proposed historical answers never unlock scoring without independent evidence",()=>{
  const report=fnhHistoricalPaper1ReleaseCheck(questions);
  expect(report).toMatchObject({ready:false,questions:60,numbered:true,sourceComplete:true,keysComplete:false});
  expect(report.pendingKeyNumbers).toHaveLength(60);
  expect(questions.filter(q=>!q.proposedAnswer).map(q=>q.number))
    .toEqual([12,19,20,22,31,35,40,41,43,48,50,58]);
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.find(x=>x.year===2019))
    .toMatchObject({questions:60,reportedTranscribed:60,sourceComplete:true,ready:false});
  expect(fnhHistoricalSimulatorReady("FNH-P1-2019-MJ")).toBeNull();
 });
});
