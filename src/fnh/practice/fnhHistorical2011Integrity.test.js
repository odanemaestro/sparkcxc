import {FNH_HISTORICAL_P2_2011 as paper} from "../data/fnhHistorical2011Paper2";
import {fnhHistorical2011ExamStructure} from "./FnhHistorical2011Paper2Exam";
import {fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {fnhPartMarkingScheme} from "./fnhPaper2Marking";
describe("2011 scanned FNH Food and Nutrition Paper 2 visual source check",()=>{
 test("retains scanned cover's three-plus-two 80-mark format",()=>{
  expect(paper).toMatchObject({year:2011,qualification:"General Proficiency",readingMinutes:10,writingMinutes:120,maximumMarks:80,sectionACompulsory:[1,2,3],sectionBChoose:2,sectionBAvailable:[4,5,6,7]});
  expect(paper.questions.map(q=>q.section)).toEqual(["A","A","A","B","B","B","B"]);
  expect(paper.questions.map(q=>q.items.reduce((n,p)=>n+p.marks,0))).toEqual([16,16,16,16,16,16,16]);
 });
 test("preserves the kitchen layout SVG and 48-biscuit scaling",()=>{
  const q=paper.questions[6];
  expect(q.diagramId).toBe("kitchen-layout-2011");
  expect(q.items.find(p=>p.id==="d").prompt).toMatch(/225 g/);
  expect(q.items.find(p=>p.id==="d").modelPoints.join(" ")).toMatch(/450 g/);
  expect(q.items.find(p=>p.id==="d").modelPoints.join(" ")).toMatch(/200 g/);
 });
 test("all seven questions have specific model answers, never an automatic official mark",()=>{
  paper.questions.flatMap(q=>q.items).forEach(p=>{
    expect(p.marks).toBeGreaterThan(0);
    expect(fnhPartMarkingScheme(p).maximum).toBe(p.marks);
    expect(p.modelPoints.length).toBeGreaterThanOrEqual(p.marks);
  });
 });
 test("selection and archive release remain constrained",()=>{
  const s=fnhHistorical2011ExamStructure([5,7]);
  expect(s.paperQuestions.map(q=>q.number)).toEqual([1,2,3,5,7]);
  expect(s.totalPotentialMarks).toBe(80);
  expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(7);
 });
});
