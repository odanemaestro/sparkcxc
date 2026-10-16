/** @jest-environment jsdom */
import {POB_HISTORICAL_2023_JAN_P1_Q01_10 as draft} from "./pobHistorical2023JanP1Q01to10Draft";
import {validatePobHistoricalPaper1} from "./pobHistoricalMcqReleaseGate";
describe("January 2023 historical POB P1 ten-item transcription check",()=>{
 test("10 genuine Q1–10 with four visually checked choices and source page references",()=>{
  expect(draft.questions).toHaveLength(10);
  expect(draft.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6,7,8,9,10]);
  expect(draft.questions.map(q=>q.sourcePdfPage)).toEqual([2,2,2,2,2,2,2,2,3,3]);
  expect(draft.questions.every(q=>q.options.length===4&&q.questionWordingVisuallyCompared&&q.answerChoicesVisuallyCompared)).toBe(true);
  expect(draft.questions[5].stem).toContain("III. documented evidence");
  expect(draft.questions[9].stem).toContain("manager’s nephew");
  expect(draft.questions[9].options[0]).toBe("unfair practices");
 });
 test("never publish historical papers whose answer key was not supplied",()=>{
  expect(draft.simulatorReady).toBe(false);
  expect(draft.answerKeyVerified).toBe(false);
  expect(draft.questions.every(q=>q.answer===null&&!q.answerSourceVerified&&!q.simulatorReady)).toBe(true);
  expect(validatePobHistoricalPaper1({...draft,sourceFilename:draft.filename,sourcePageCount:9,
    sourceAuthenticityVerified:false,visualPageVerified:false,
    questionTranscriptionVerified:false,answerKeyVerified:false,
    markingSchemeVerified:false,syllabusEraVerified:false,
    assessmentQAComplete:false,questions:draft.questions}).ready).toBe(false);
 });
});
