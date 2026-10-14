import {FNH_P1_2005_TRANSCRIPTION_DRAFT as items,FNH_P1_2005_QA as qa} from "./fnhHistorical2005Paper1Draft";
import {fnhHistoricalPaper1ReleaseCheck} from "./fnhHistoricalPaper1ReleaseGate";
describe("2005 FNH Paper1 source incomplete, never infer missing final page",()=>{
 test("supplied 7-page 2005 scan ends at Question 53 with a continuation instruction",()=>{
  expect(qa).toMatchObject({expectedQuestions:60,sourceVerifiedQuestions:53,providedPdfPages:7,lastVisibleQuestion:53,
   sourceContinuesAfterLastPage:true,missingSourceQuestionNumbers:[54,55,56,57,58,59,60],simulatorReady:false});
  expect(items.map(x=>x.number)).toEqual(Array.from({length:53},(_,i)=>i+1));
  expect(fnhHistoricalPaper1ReleaseCheck(items).ready).toBe(false);
 });
 test("visual source duplicate Q3 and Q4 is retained only in historical transcript",()=>{
  expect(qa.sourceDuplicateQuestionPair).toEqual([3,4]);
  const a=items.find(x=>x.number===3),b=items.find(x=>x.number===4);
  expect(a.stem).toBe(b.stem);
  expect(a.options).toEqual(b.options);
  expect(a.sourceChecked&&b.sourceChecked).toBe(true);
 });
 test("question 50 cannot receive an invented answer for scientifically inconsistent choices",()=>{
  expect(items.find(x=>x.number===50).proposedAnswer).toBeNull();
  expect(items.every(x=>x.officialKeyVerified===false)).toBe(true);
  expect(items.filter(x=>x.options.length!==4)).toHaveLength(0);
 });
});
