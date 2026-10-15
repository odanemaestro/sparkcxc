import {FNH_HISTORICAL_P2_2012 as paper} from "../data/fnhHistorical2012Paper2";
import {fnhHistorical2012ExamStructure} from "./FnhHistorical2012Paper2Exam";
import {fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
describe("May/June 2012 scanned Food and Nutrition Paper 2",()=>{
  test("preserves original 2012 General Proficiency marking and time",()=>{
    expect(paper).toMatchObject({year:2012,maximumMarks:80,readingMinutes:10,writingMinutes:120,
      sectionACompulsory:[1,2,3],sectionBChoose:2,sectionBAvailable:[4,5,6,7]});
    expect(paper.questions).toHaveLength(7);
    expect(paper.questions.map(q=>q.items.reduce((a,p)=>a+p.marks,0))).toEqual([16,16,16,16,16,16,16]);
  });
  test("product-comparison figures, original ingredients and oil hazard retained",()=>{
    const q=paper.questions[5];
    expect(q.diagramId).toBe("product-comparison-2012");
    expect(q.context).toMatch(/carrot extract/i);
    expect(q.items.find(x=>x.id==="d-ii").prompt).toMatch(/smoke point/i);
    expect(q.items.find(x=>x.id==="d-ii").explanation).toMatch(/Flash point/i);
  });
  test("option selection and model answer coverage",()=>{
    const selection=fnhHistorical2012ExamStructure([4,7]);
    expect(selection.paperQuestions.map(q=>q.number)).toEqual([1,2,3,4,7]);
    expect(selection.totalPotentialMarks).toBe(80);
    paper.questions.flatMap(q=>q.items).forEach(part=>{
      expect(part.modelPoints.length).toBeGreaterThanOrEqual(part.marks);
    });
    expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(7);
  });
});
