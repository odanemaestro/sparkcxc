import {POB_HISTORICAL_P2_2024_JAN_DRAFT as draft} from "./pobHistoricalP22024JanDraft";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
describe("January 2024 historical POB Paper 2 transcription gate",()=>{
 test("source-backed draft contains five 20-mark questions and accounts for 100 marks",()=>{
  expect(draft.questions.map(q=>q.number)).toEqual([1,2,3,4,5]);
  expect(draft.questions.map(q=>q.marks)).toEqual([20,20,20,20,20]);
  expect(draft.questions.reduce((sum,q)=>sum+q.parts.reduce((n,p)=>n+p.marks,0),0)).toBe(100);
  expect(draft.questions.every(q=>q.parts.every(p=>p.prompt.length>20))).toBe(true);
 });
 test("unverified answer keys, visual layout and grading cannot be bypassed",()=>{
  expect(draft.status).toBe("transcription-draft");
  expect(draft.visualPageVerified).toBe(false);
  expect(draft.answerKeyVerified).toBe(false);
  expect(draft.markingSchemeVerified).toBe(false);
  expect(draft.simulatorReady).toBe(false);
  expect(pobReleasedHistoricalPapers()).toEqual([]);
  const source=POB_SUPPLIED_ARCHIVE.find(row=>row.id===draft.id);
  expect(source).toBeDefined();
  expect(source.simulatorReady).toBe(false);
 });
});
