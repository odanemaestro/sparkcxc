import {FNH_HISTORICAL_P2_2021 as paper} from "../data/fnhHistorical2021Paper2";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {fnhSelfAssessmentTotal} from "./fnhPaper2Marking";
import fs from "fs";
import path from "path";
describe("2021 source-scanned Technical Proficiency FNH Paper 02",()=>{
  test("retains six compulsory sixteen-mark questions and original exam duration",()=>{
    expect(paper).toMatchObject({year:2021,writingMinutes:150,maximumMarks:96,qualification:"Technical Proficiency"});
    expect(paper.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6]);
    expect(paper.questions.map(q=>q.items.reduce((sum,p)=>sum+p.marks,0))).toEqual([16,16,16,16,16,16]);
    expect(paper.questions.flatMap(q=>q.items)).toHaveLength(35);
    expect(paper.questions.every(q=>q.items.every(part=>part.modelPoints.length>=part.marks))).toBe(true);
  });
  test("both scan-only diagrams are assigned to correct questions and implemented as SVG",()=>{
    expect(paper.questions[4].diagramId).toBe("kitchen-layouts-2021");
    expect(paper.questions[5].diagramId).toBe("nutrition-labels-2021");
    const source=fs.readFileSync(path.join(__dirname,"FnhHistoricalDiagram.jsx"),"utf8");
    expect(source).toContain('type==="kitchen-layouts-2021"');
    expect(source).toContain('type==="nutrition-labels-2021"');
    expect(source).toContain('2/3 cup (55 g)');
    expect(source).toContain('1 cup (255 g)');
  });
  test("source labels preserve the material nutritional differences and spice table",()=>{
    const q=paper.questions[5];
    expect(q.items.find(i=>i.id==="d-ii").modelPoints.join(" ")).toMatch(/12 g.*55 g/);
    expect(q.items.find(i=>i.id==="d-ii").modelPoints.join(" ")).toMatch(/7 g.*255 g/);
    expect(q.items.find(i=>i.id==="e").modelPoints).toHaveLength(4);
    expect(fnhSelfAssessmentTotal(paper.questions,{},{})).toMatchObject({checked:0,maximum:96});
    expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(6);
    expect(FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===2&&p.simulatorReady).length).toBeGreaterThanOrEqual(15);
  });
});
