import {FNH_HISTORICAL_P2_2013 as paper} from "../data/fnhHistorical2013Paper2";
import {fnhHistorical2013ExamStructure} from "./FnhHistorical2013Paper2Exam";
import {fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
describe("May/June 2013 Food and Nutrition Paper2 from supplied image scans",()=>{
 test("preserves three compulsory plus two optional historical format",()=>{
  expect(paper).toMatchObject({year:2013,maximumMarks:80,writingMinutes:120,readingMinutes:10,sectionBChoose:2});
  expect(paper.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6,7]);
  expect(paper.questions.map(q=>q.items.reduce((sum,p)=>sum+p.marks,0))).toEqual([16,16,16,16,16,16,16]);
  const selected=fnhHistorical2013ExamStructure([4,6]);
  expect(selected.paperQuestions.map(q=>q.number)).toEqual([1,2,3,4,6]);
  expect(selected.totalPotentialMarks).toBe(80);
 });
 test("retains the source green-bean ice crystal figure and both content tables",()=>{
  expect(paper.questions[1].diagramId).toBe("green-bean-cells-2013");
  expect(paper.questions[3].items.some(x=>x.prompt.includes("sweet corn"))).toBe(true);
  expect(paper.questions[4].items.some(x=>x.prompt.includes("accident"))).toBe(true);
 });
 test("preserves the 1000 slice calculation and evidence-based marking points",()=>{
  const p=paper.questions[6].items.find(item=>item.id==="c-ii");
  expect(p).toMatchObject({marks:2});
  expect(p.modelPoints.join(" ")).toMatch(/42 pounds/);
  expect(paper.questions.flatMap(q=>q.items).every(item=>item.modelPoints.length>=item.marks)).toBe(true);
  expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(7);
 });
});
