import {FNH_HISTORICAL_P2_2022 as paper} from "../data/fnhHistorical2022Paper2";
import {fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {fnhSelfAssessmentTotal} from "./fnhPaper2Marking";
describe("2022 FNH Paper 2, source has no cover page",()=>{
  test("all six compulsory questions have accurate 16-mark part totals",()=>{
    expect(paper).toMatchObject({year:2022,maximumMarks:96,qualification:"Technical Proficiency",sourceTimeVerified:false});
    expect(paper.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6]);
    expect(paper.questions.map(q=>q.items.reduce((sum,p)=>sum+p.marks,0))).toEqual([16,16,16,16,16,16]);
    expect(paper.questions.flatMap(q=>q.items).every(p=>p.modelPoints.length>=p.marks)).toBe(true);
  });
  test("keeps distinctive source questions and explanations",()=>{
    const q2=paper.questions[1],q6=paper.questions[5];
    expect(q2.items.map(x=>x.prompt).join(" ")).toMatch(/anaemic adolescent/);
    expect(q6.items.map(x=>x.prompt).join(" ")).toMatch(/external cuisine/);
    expect(q6.items.map(x=>x.prompt).join(" ")).toMatch(/Bulk shopping/);
    expect(fnhSelfAssessmentTotal(paper.questions,{},{})).toMatchObject({checked:0,maximum:96});
  });
  test("marks exactly six source questions and records cover uncertainty",()=>{
    expect(fnhHistoricalSimulatorReady(paper.id)).toMatchObject({verifiedQuestionCount:6,sourceTimeVerified:false,simulatorReady:true});
  });
});
