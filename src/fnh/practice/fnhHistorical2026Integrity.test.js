import {FNH_HISTORICAL_P2_2026 as paper} from "../data/fnhHistorical2026Paper2";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {fnhPartMarkingScheme,fnhSelfAssessmentTotal} from "./fnhPaper2Marking";
describe("May/June 2026 source-checked Food Nutrition and Health Paper2",()=>{
 test("all six compulsory source questions total 96 marks",()=>{
  expect(paper).toMatchObject({year:2026,writingMinutes:150,readingMinutes:0,maximumMarks:96,qualification:"Technical Proficiency"});
  expect(paper.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6]);
  expect(paper.questions.map(q=>q.items.reduce((sum,p)=>sum+p.marks,0))).toEqual([16,16,16,16,16,16]);
  expect(paper.questions.every(q=>!q.section)).toBe(true);
 });
 test("original 2026 question figures, menu and 2026 safety scenario are preserved",()=>{
  expect(paper.questions[0].diagramId).toBe("disease-table-2026");
  expect(paper.questions[4].diagramId).toBe("household-accidents-2026");
  expect(paper.questions[1].context).toMatch(/Gabrielle/);
  expect(paper.questions[4].context).toMatch(/Roasted Chicken in Honey Mustard Sauce/);
  expect(paper.questions[3].items.some(p=>p.prompt.includes("anti-caking"))).toBe(true);
 });
 test("specific answer points cover every allocated mark while blank answers never score",()=>{
  paper.questions.flatMap(q=>q.items).forEach(p=>{
    expect(p.modelPoints.length).toBeGreaterThanOrEqual(p.marks);
    expect(fnhPartMarkingScheme(p).maximum).toBe(p.marks);
    expect(p.explanation.length).toBeGreaterThan(25);
  });
  const summary=fnhSelfAssessmentTotal(paper.questions,{}, {});
  expect(summary).toMatchObject({maximum:96,checked:0});
  expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(6);
  expect(FNH_SUPPLIED_ARCHIVE.filter(row=>row.paper===2&&row.simulatorReady).length).toBe(18);
 });
});
