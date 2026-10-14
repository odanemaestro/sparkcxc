import {FNH_P1_2004_TRANSCRIPTION_DRAFT as y2004,FNH_P1_2004_QA} from "./fnhHistorical2004Paper1Draft";
import {FNH_P1_2005_TRANSCRIPTION_DRAFT as y2005,FNH_P1_2005_QA} from "./fnhHistorical2005Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
import {fnhHistoricalPaper1Reader,fnhHistoricalPaper1ReleaseCheck} from "./fnhHistoricalPaper1ReleaseGate";

describe("2004 and 2005 FNH Paper 01 original-source and cross-year evidence",()=>{
 const missing2004=[46,47];
 const missing2005=[54,55,56,57,58,59,60];
 test("four recovered candidate choices agree with user's 2005 scan but remain unverified for 2004",()=>{
  const candidates=y2004.filter(q=>missing2004.includes(q.number));
  const shared2005=y2005.filter(q=>[52,53].includes(q.number));
  expect(candidates).toHaveLength(2);
  expect(shared2005).toHaveLength(2);
  expect(shared2005[0].options).toEqual(shared2005[1].options);
  for(const q of candidates){
   expect(q.options).toBeNull();
   expect(q.sourceChecked).toBe(false);
   expect(q.proposedAnswer).toBeNull();
   expect(q.officialKeyVerified).toBe(false);
   expect(q.crossSourceCandidateOptions).toEqual(shared2005[0].options);
   expect(q.crossSourceCandidateProvenance).toMatchObject({
    verificationStatus:"two-other-year-copies-corroborate-not-original-2004",
    inspected2004Page:6,verifiedFor2004:false
   });
   expect(q.crossSourceCandidateProvenance.sources).toHaveLength(2);
  }
  expect(FNH_P1_2004_QA).toMatchObject({sourceVerifiedQuestions:58,simulatorReady:false});
  expect(FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2004-MJ").officialExaminerReportUrl)
    .toBe("https://www.cxc.org/SiteAssets/2004SchoolReports/CSEC_2004_FoodandNutrition.pdf");
  const source=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2004-MJ");
  expect(source).toMatchObject({
   missingSourceOptionQuestionNumbers:missing2004,
   crossSourceCandidateOptionsFoundFor:missing2004,
   crossSourceCandidateOptionsVerifiedFor2004:false,
   officialExaminerReportConfirmsItemCount:true,
   officialExaminerReportIncludesPaper1QuestionsOrKeys:false,
   sourceQuestionsExpected:60,
   verifiedQuestionCount:0
  });
 });
 test("2004 source preview still blocks questions with only cross-year candidate options",()=>{
  const data=fnhHistoricalPaper1Reader("FNH-P1-2004-MJ");
  expect(data.questions).toHaveLength(58);
  expect(data.excludedNumbers).toEqual(missing2004);
  expect(data.questions.every(q=>!missing2004.includes(q.number))).toBe(true);
  expect(fnhHistoricalPaper1ReleaseCheck(y2004).ready).toBe(false);
  expect(fnhHistoricalSimulatorReady(data.id)).toBeNull();
 });
 test("CXC official 2005 examiner report verifies 60 items, but not the absent seven questions or any key",()=>{
  const source=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2005-MJ");
  expect(source).toMatchObject({
   sourcePagesSupplied:7,sourceLastVisibleQuestion:53,
   sourceQuestionsExpected:60,sourceQuestionCount:53,
   officialExaminerReportConfirmsItemCount:true,
   officialExaminerReportIncludesPaper1QuestionsOrKeys:false,
   missingSourceQuestionNumbers:missing2005,verifiedQuestionCount:0
  });
  expect(source.officialExaminerReportUrl).toBe("https://www.cxc.org/SiteAssets/2005SchoolReports/CSEC_2005_FoodandNutrition.pdf");
  expect(FNH_P1_2005_QA).toMatchObject({sourceVerifiedQuestions:53,expectedQuestions:60,
    missingSourceQuestionNumbers:missing2005,simulatorReady:false});
  expect(y2005).toHaveLength(53);
  expect(y2005[y2005.length-1].number).toBe(53);
  expect(fnhHistoricalPaper1ReleaseCheck(y2005).ready).toBe(false);
  const reader=fnhHistoricalPaper1Reader(source.id);
  expect(reader.questions).toHaveLength(53);
  expect(reader.missingSourceQuestions).toEqual(missing2005);
  expect(reader.sourceQuestionCount).toBe(60);
  expect(reader.scored).toBe(false);
  expect(reader.verifiedKeys).toBe(false);
  expect(fnhHistoricalSimulatorReady(source.id)).toBeNull();
 });
});
