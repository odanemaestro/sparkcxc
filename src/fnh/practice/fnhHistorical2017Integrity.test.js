import {FNH_HISTORICAL_P2_2017 as paper} from "../data/fnhHistorical2017Paper2";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalPaperFormat,fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {fnhPartMarkingScheme,fnhSelfAssessmentTotal} from "./fnhPaper2Marking";
describe("May/June 2017 FNH Technical Proficiency historical Paper 02",()=>{
  test("original examination uses six compulsory questions, each worth 16 marks",()=>{
    expect(paper).toMatchObject({
      qualification:"Technical Proficiency",year:2017,writingMinutes:150,maximumMarks:96,
    });
    expect(paper.questions).toHaveLength(6);
    expect(paper.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6]);
    expect(paper.questions.map(q=>q.items.reduce((n,p)=>n+p.marks,0))).toEqual([16,16,16,16,16,16]);
    expect(paper.questions.flatMap(q=>q.items)).toHaveLength(33);
    expect(new Set(paper.questions.map(q=>q.id)).size).toBe(6);
    expect(fnhHistoricalPaperFormat(paper.id)).toMatchObject({questionsAnswered:6,totalMarks:96,durationMinutes:150});
  });
  test("every part has usable explanatory marking points and no preassigned student score",()=>{
    const parts=paper.questions.flatMap(q=>q.items);
    parts.forEach(p=>{
      expect(p.prompt.length).toBeGreaterThan(15);
      expect(p.marks).toBeGreaterThan(0);
      expect(fnhPartMarkingScheme(p).points.length).toBeGreaterThanOrEqual(p.marks);
    });
    expect(fnhSelfAssessmentTotal(paper.questions,{},{})).toMatchObject({checked:0,maximum:96,totalParts:33});
  });
  test("no optional section B is incorrectly assigned to 2017; only verified content is available",()=>{
    expect(paper.questions.every(q=>!q.section)).toBe(true);
    expect(paper.questions.every(q=>q.items.length>=3)).toBe(true);
    expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(6);
    expect(FNH_SUPPLIED_ARCHIVE.filter(q=>q.simulatorReady).length).toBe(9);
  });
});
