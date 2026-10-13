import {FNH_PAPER1_ORIGINAL_BANK,FNH_PAPER1_FORMAT,fnhMakePaper1} from "./data/fnhPaper1Bank";
import {FNH_PAPER2_ORIGINAL_SET_ONE,FNH_PAPER2_FORMAT} from "./data/fnhPaper2Bank";
import {FNH_OBJECTIVES} from "./data/fnhCourse";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalPaperFormat,fnhVerifiedArchivePaper} from "./data/fnhPastPaperInventory";
import {FNH_PRACTICAL_WORKBOOK,FNH_SBA_GUIDELINES,fnhWorkbookCoverage} from "./data/fnhPracticalWorkbook";

describe("FNH original examination and historical-format correctness",()=>{
  test("Paper 1 contains 60 unique questions and unambiguous marked answers",()=>{
    expect(FNH_PAPER1_FORMAT).toMatchObject({questions:60,minutes:90,marks:60});
    expect(FNH_PAPER1_ORIGINAL_BANK).toHaveLength(60);
    expect(new Set(FNH_PAPER1_ORIGINAL_BANK.map(row=>row.id)).size).toBe(60);
    const objectiveSet=new Set(FNH_OBJECTIVES.map(row=>row.code));
    FNH_PAPER1_ORIGINAL_BANK.forEach(row=>{
      expect(objectiveSet.has(row.objectiveCode)).toBe(true);
      expect(row.options).toHaveLength(4);
      expect(new Set(row.options).size).toBe(4);
      expect("ABCD").toContain(row.answer);
      expect(row.options["ABCD".indexOf(row.answer)].length).toBeGreaterThan(2);
      expect(row.explanation.length).toBeGreaterThanOrEqual(30);
      expect(row.origin).toBe("original");
    });
    expect(fnhMakePaper1()).toEqual(FNH_PAPER1_ORIGINAL_BANK);
    expect(FNH_PAPER1_ORIGINAL_BANK.filter(row=>row.profile==="knowledge")).toHaveLength(30);
    expect(FNH_PAPER1_ORIGINAL_BANK.filter(row=>row.profile==="use-of-knowledge")).toHaveLength(30);
  });
  test("Answer-letter distribution avoids a single predictable response position",()=>{
    const counts=[..."ABCD"].map(letter=>FNH_PAPER1_ORIGINAL_BANK.filter(row=>row.answer===letter).length);
    expect(Math.min(...counts)).toBeGreaterThan(3);
    expect(Math.max(...counts)).toBeLessThan(30);
  });
  test("Paper 2 has exactly six compulsory questions with original 6/10 profile per 16-mark question",()=>{
    expect(FNH_PAPER2_FORMAT).toMatchObject({questions:6,marksPerQuestion:16,totalMarks:96,minutes:150});
    expect(FNH_PAPER2_ORIGINAL_SET_ONE).toHaveLength(6);
    FNH_PAPER2_ORIGINAL_SET_ONE.forEach((question,i)=>{
      expect(question.number).toBe(i+1);
      expect(question.marks).toBe(16);
      expect(question.knowledgeMarks).toBe(6);
      expect(question.useOfKnowledgeMarks).toBe(10);
      expect(question.items.reduce((a,x)=>a+x.marks,0)).toBe(16);
      expect(question.items.filter(x=>x.profile==="knowledge").reduce((a,x)=>a+x.marks,0)).toBe(6);
      expect(question.items.filter(x=>x.profile==="use-of-knowledge").reduce((a,x)=>a+x.marks,0)).toBe(10);
      expect(new Set(question.items.map(x=>x.id)).size).toBe(question.items.length);
      expect(question.items.every(x=>x.prompt&&x.modelPoints.length>=2&&x.explanation.length>35)).toBe(true);
    });
  });
  test("Historically correct 2005 format cannot be confused with six-question modern FNH Paper 2",()=>{
    const old=fnhHistoricalPaperFormat("FNH-P2-2005-MJ");
    expect(old).toMatchObject({qualification:"General Proficiency",
      sectionA:{compulsory:3,marksPerQuestion:16},sectionB:{available:4,choose:2,marksPerQuestion:16},
      questionsAnswered:5,totalMarks:80,durationMinutes:120,readingMinutes:10,sourceTimeVerified:true});
    const newer=fnhHistoricalPaperFormat("FNH-P2-2017-MJ");
    expect(newer).toMatchObject({qualification:"Technical Proficiency",compulsory:6,questionsAnswered:6,totalMarks:96,durationMinutes:150});
    expect(FNH_SUPPLIED_ARCHIVE.every(row=>row.paper===1||row.paper===2)).toBe(true);
    expect(fnhVerifiedArchivePaper("FNH-P2-2005-MJ")).toBeNull();
  });
  test("SBA needs 16 practicals and 3 teacher-moderated assignments, never self-grades",()=>{
    expect(FNH_SBA_GUIDELINES).toMatchObject({minimumPracticalTasks:16,moderationAssignments:3,secondAssignmentJointAssessment:true});
    expect(fnhWorkbookCoverage()).toMatchObject({count:16,withAssessmentEvidence:16,exemplarSandwiches:9,exemplarEggs:12});
    expect(new Set(FNH_PRACTICAL_WORKBOOK.map(row=>row.id)).size).toBe(16);
    expect(FNH_PRACTICAL_WORKBOOK.every(row=>row.objectiveCode&&row.brief&&row.term&&row.evidence.length>=5)).toBe(true);
    expect(FNH_SBA_GUIDELINES.note).toMatch(/direct assessment/);
  });
});
