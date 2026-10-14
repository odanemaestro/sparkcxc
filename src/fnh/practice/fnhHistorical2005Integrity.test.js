import {FNH_HISTORICAL_P2_2005 as paper} from "../data/fnhHistorical2005Paper2";
import {fnhHistorical2005ExamStructure} from "./FnhHistorical2005Paper2Exam";
import {fnhPartMarkingScheme} from "./fnhPaper2Marking";
import {fnhHistoricalSimulatorReady,fnhHistoricalPaperFormat} from "../data/fnhPastPaperInventory";

describe("Source-checked historical 2005 Food and Nutrition Paper 02",()=>{
  test("the paper retains original General Proficiency format and time",()=>{
    expect(paper).toMatchObject({
      year:2005,session:"May/June",qualification:"General Proficiency",
      readingMinutes:10,writingMinutes:120,maximumMarks:80,
      sectionACompulsory:[1,2,3],sectionBAvailable:[4,5,6,7],sectionBChoose:2,
    });
    expect(paper.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6,7]);
    expect(paper.questions.map(q=>q.section)).toEqual(["A","A","A","B","B","B","B"]);
    expect(fnhHistoricalPaperFormat(paper.id).totalMarks).toBe(80);
  });
  test("all seven original question allocations total 16 each",()=>{
    expect(paper.questions.map(q=>q.items.reduce((sum,p)=>sum+p.marks,0))).toEqual([16,16,16,16,16,16,16]);
    expect(paper.questions.flatMap(q=>q.items).length).toBe(38);
    paper.questions.forEach(q=>q.items.forEach(part=>{
      expect(part.prompt.length).toBeGreaterThan(10);
      expect(fnhPartMarkingScheme(part).maximum).toBe(part.marks);
      expect(part.modelPoints.length).toBeGreaterThanOrEqual(Math.min(part.marks,2));
    }));
  });
  test("selecting exactly two optional questions produces the required five-question 80-mark examination",()=>{
    const selection=fnhHistorical2005ExamStructure([4,7]);
    expect(selection.paperQuestions.map(q=>q.number)).toEqual([1,2,3,4,7]);
    expect(selection.totalPotentialMarks).toBe(80);
    expect(selection.selectedPartB).toEqual([4,7]);
    expect(fnhHistorical2005ExamStructure([]).totalPotentialMarks).toBe(48);
    expect(fnhHistorical2005ExamStructure([100]).totalPotentialMarks).toBe(48);
    expect(fnhHistorical2005ExamStructure([5]).totalPotentialMarks).toBe(64);
  });
  test("only individually checked 2005 and 2006 sources are released for Paper 2 simulation",()=>{
    expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(7);
    expect(fnhHistoricalSimulatorReady("FNH-P2-2017-MJ")).toBeNull();
    expect(fnhHistoricalSimulatorReady("FNH-P1-2005-MJ")).toBeNull();
  });
});
