import {auditPobCompleteHistoricalAuthoring} from "./pobHistoricalAll46AuthoringAudit";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";

describe("46 original historical POB source files full SPARK answer/rubric authorship",()=>{
 test("all four source-approved batches account for 20 Paper 1 and 26 Paper 2 files",()=>{
  const x=auditPobCompleteHistoricalAuthoring();
  expect(x.valid).toBe(true);
  expect(x.issues).toEqual([]);
  expect(x.sourceCount).toBe(46);
  expect(x.originalPdfCount).toBe(46);
  expect(POB_SUPPLIED_ARCHIVE).toHaveLength(46);
  expect(x.historicalPaper1Count).toBe(20);
  expect(x.historicalPaper2Count).toBe(26);
  expect(x.historicalPaper2RubricSources).toBe(26);
  expect(x.lastPaperId).toBe("POB-P2-2026-JAN");
  expect(x.lastPaperAuthoredPartCount).toBe(32);
  expect(x.lastPaperOfferedMarks).toBe(100);
 });
 test("2018 missing original Q53–Q57 cannot be counted as fully authored MCQs",()=>{
  const x=auditPobCompleteHistoricalAuthoring();
  expect(x.offeredMcqQuestionSlots).toBe(1200);
  expect(x.authoredSourceBackedMcqAnswers).toBe(1195);
  expect(x.missingOriginalMcqCount).toBe(5);
  expect(x.incompleteOriginalSourceFiles).toBe(1);
  expect(x.knownSourceMissing[0]).toMatchObject({
   id:"POB-P1-2018-MJ",missingOriginalQuestionNumbers:[53,54,55,56,57],
   liveScoringApproved:false
  });
 });
 test("authoring is not production grading; no student scores released",()=>{
  const x=auditPobCompleteHistoricalAuthoring();
  expect(x.academicAnswerAdjudicationComplete).toBe(false);
  expect(x.secureSemanticScoringCalibrated).toBe(false);
  expect(x.liveScoringReleased).toBe(0);
  expect(x.officialCxcKeyStatus).toContain("not a CXC-certified answer key");
  expect(pobReleasedHistoricalPapers()).toEqual([]);
 });
});
