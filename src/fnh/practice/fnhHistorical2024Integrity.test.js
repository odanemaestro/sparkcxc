import {FNH_HISTORICAL_P2_2024 as paper} from "../data/fnhHistorical2024Paper2";
import {fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {fnhSelfAssessmentTotal} from "./fnhPaper2Marking";
import fs from "fs";
import path from "path";
describe("2024 source-checked Technical Proficiency Paper2",()=>{
 test("all six original questions total sixteen marks and original time is verified",()=>{
  expect(paper).toMatchObject({year:2024,maximumMarks:96,writingMinutes:150,sourceTimeVerified:true,qualification:"Technical Proficiency"});
  expect(paper.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6]);
  expect(paper.questions.map(q=>q.items.reduce((n,x)=>n+x.marks,0))).toEqual([16,16,16,16,16,16]);
  expect(paper.questions.flatMap(q=>q.items).every(x=>x.modelPoints.length>=x.marks)).toBe(true);
 });
 test("preserves original Table 1 gaps instead of substituting the answers on the exam page",()=>{
  const q2=paper.questions[1];expect(q2.diagramId).toBe("nutrients-table-2024");
  expect(q2.items[0].prompt).toMatch(/scurvy/i);
  expect(q2.items[0].prompt).toMatch(/heart disease/i);
  const src=fs.readFileSync(path.join(__dirname,"FnhHistoricalDiagram.jsx"),"utf8");
  expect(src).toContain('type==="nutrients-table-2024"');
  expect(src).toContain("Table 1: Nutrients and health-related conditions");
 });
 test("references are not preassigned official grades and release is source gated",()=>{
  expect(fnhSelfAssessmentTotal(paper.questions,{},{})).toMatchObject({checked:0,maximum:96});
  expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(6);
  expect(paper.questions[5].items.map(x=>x.prompt).join(" ")).toMatch(/Swiss roll/);
 });
});
