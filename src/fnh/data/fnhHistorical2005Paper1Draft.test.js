import {FNH_P1_2005_TRANSCRIPTION_DRAFT as items,FNH_P1_2005_QA as qa} from "./fnhHistorical2005Paper1Draft";
import {fnhHistoricalPaper1ReleaseCheck} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE} from "./fnhPastPaperInventory";
describe("2005 FNH Paper1 source incomplete, never infer missing final page",()=>{
 test("supplied 7-page 2005 scan ends at Question 53 with a continuation instruction",()=>{
  expect(qa).toMatchObject({expectedQuestions:60,sourceVerifiedQuestions:53,providedPdfPages:7,lastVisibleQuestion:53,
   sourceContinuesAfterLastPage:true,missingSourceQuestionNumbers:[54,55,56,57,58,59,60],simulatorReady:false});
  expect(items.map(x=>x.number)).toEqual(Array.from({length:53},(_,i)=>i+1));
  expect(fnhHistoricalPaper1ReleaseCheck(items).ready).toBe(false);
 });
 test("resubmitted 2005 PDF is identical and still omits Questions 54 to 60",()=>{
  const source=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2005-MJ");
  expect(source).toMatchObject({sourcePagesSupplied:7,sourceReuploadChecked:true,
   sourceLastVisibleQuestion:53,sourceSha256:"3b7bbb9d96d759717571e408ebf876af22a259d88853ffe9d018a1a6e59edc0e",
   missingSourceQuestionNumbers:[54,55,56,57,58,59,60]});
  expect(source.sourceQualityNote).toMatch(/GO ON TO THE NEXT PAGE/);
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
