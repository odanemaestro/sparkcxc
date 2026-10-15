import {FNH_HISTORICAL_P2_2019 as paper} from "../data/fnhHistorical2019Paper2";
import {fnhHistoricalPaperFormat,fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {fnhPartMarkingScheme,fnhSelfAssessmentTotal} from "./fnhPaper2Marking";
describe("2019 Technical Proficiency Food Nutrition and Health Paper2",()=>{
 test("preserves six compulsory 16-mark questions and 150-minute duration",()=>{
  expect(paper).toMatchObject({year:2019,qualification:"Technical Proficiency",writingMinutes:150,maximumMarks:96});
  expect(paper.questions.map(q=>q.items.reduce((sum,p)=>sum+p.marks,0))).toEqual([16,16,16,16,16,16]);
  expect(fnhHistoricalPaperFormat(paper.id)).toMatchObject({questionsAnswered:6,totalMarks:96,durationMinutes:150});
 });
 test("retains source assessments, cheese processing table, and athlete menu table",()=>{
  expect(paper.questions[0].items.find(p=>p.id==="a-ii").prompt).toMatch(/FOUR types/);
  expect(paper.questions[2].items.find(p=>p.id==="b-ii").prompt).toMatch(/THREE factors/);
  expect(paper.questions[3].items.find(p=>p.id==="c").modelPoints.join(" ")).toMatch(/Pasteurisation/);
 });
 test("every written part provides bounded marking points, without inventing an awarded grade",()=>{
  paper.questions.flatMap(q=>q.items).forEach(p=>expect(fnhPartMarkingScheme(p).points.length).toBeGreaterThanOrEqual(p.marks));
  expect(fnhSelfAssessmentTotal(paper.questions,{},{})).toMatchObject({checked:0,maximum:96});
  expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(6);
 });
});
