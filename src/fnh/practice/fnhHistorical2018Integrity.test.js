import {FNH_HISTORICAL_P2_2018 as paper} from "../data/fnhHistorical2018Paper2";
import {fnhHistoricalPaperFormat,fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {fnhPartMarkingScheme,fnhSelfAssessmentTotal} from "./fnhPaper2Marking";
describe("2018 FNH Technical Proficiency historical Paper2 source integrity",()=>{
 test("full original 2h30 exam is six compulsory 16-mark questions",()=>{
  expect(paper).toMatchObject({year:2018,qualification:"Technical Proficiency",writingMinutes:150,maximumMarks:96});
  expect(paper.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6]);
  expect(paper.questions.map(q=>q.items.reduce((sum,p)=>sum+p.marks,0))).toEqual([16,16,16,16,16,16]);
  expect(fnhHistoricalPaperFormat(paper.id)).toMatchObject({questionsAnswered:6,totalMarks:96,durationMinutes:150});
 });
 test("all parts have marking points and special source tasks are retained",()=>{
  paper.questions.flatMap(q=>q.items).forEach(p=>{
   expect(fnhPartMarkingScheme(p).points.length).toBeGreaterThanOrEqual(p.marks);
   expect(p.prompt.length).toBeGreaterThan(15);
  });
  expect(paper.questions[5].items.find(p=>p.id==="d-i").prompt).toMatch(/label/);
  expect(paper.questions[3].items.find(p=>p.id==="c-i").prompt).toMatch(/heat transfer/i);
  expect(fnhSelfAssessmentTotal(paper.questions,{},{})).toMatchObject({maximum:96,checked:0});
 });
 test("only explicitly transcribed historical 2018 Paper2 becomes playable",()=>{
  expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(6);
 });
});
