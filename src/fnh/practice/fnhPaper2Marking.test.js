import {FNH_PAPER2_ORIGINAL_SET_ONE} from "../data/fnhPaper2Bank";
import {fnhPartMarkingScheme,fnhSelfAssessmentMark,fnhSelfAssessmentTotal} from "./fnhPaper2Marking";

describe("FNH Paper 2 transparent marking assistance",()=>{
  const paper=FNH_PAPER2_ORIGINAL_SET_ONE;
  test("all 24 parts have valid mark limits and multiple acceptable marking points",()=>{
    expect(paper.flatMap(question=>question.items)).toHaveLength(24);
    paper.forEach(question=>question.items.forEach(part=>{
      const scheme=fnhPartMarkingScheme(part);
      expect(scheme.maximum).toBe(part.marks);
      expect(scheme.points.length).toBeGreaterThanOrEqual(part.marks);
      expect(new Set(scheme.points.map(item=>item.id)).size).toBe(scheme.points.length);
      expect(scheme.points.every(item=>item.text.length>15)).toBe(true);
      expect(scheme.rule).toMatch(/Award up to/);
      expect(scheme.note).toMatch(/Equivalent/);
    }));
  });
  test("a 2-mark question with 3 acceptable examples never awards more than 2 marks",()=>{
    const part=paper[1].items[0];
    expect(part.marks).toBe(2);
    expect(part.modelPoints).toHaveLength(3);
    expect(fnhSelfAssessmentMark(part,["0","1","2"])).toBe(2);
    expect(fnhSelfAssessmentMark(part,["0","0","0"])).toBe(1);
    expect(fnhSelfAssessmentMark(part,["0","bogus"])).toBe(1);
  });
  test("all parts can reach the 96-mark ceiling but cannot exceed it",()=>{
    const full={};
    paper.forEach(question=>question.items.forEach(part=>{
      full[`${question.id}:${part.id}`]=part.modelPoints.map((_,index)=>String(index));
    }));
    const report=fnhSelfAssessmentTotal(paper,full);
    expect(report).toMatchObject({maximum:96,checked:96,reviewedParts:24,totalParts:24});
    expect(report.questions.map(q=>q.maximum)).toEqual([16,16,16,16,16,16]);
    expect(report.questions.map(q=>q.checked)).toEqual([16,16,16,16,16,16]);
  });
  test("blank submissions cannot receive self-assessed marks even if all boxes are ticked",()=>{
    const full={};
    paper.forEach(q=>q.items.forEach(p=>{
      full[`${q.id}:${p.id}`]=p.modelPoints.map((_,index)=>String(index));
    }));
    const emptyResponses=fnhSelfAssessmentTotal(paper,full,{});
    expect(emptyResponses.checked).toBe(0);
    const first=`${paper[0].id}:${paper[0].items[0].id}`;
    const someResponses=fnhSelfAssessmentTotal(paper,full,{[first]:"A diet includes regular food and drink."});
    expect(someResponses.checked).toBe(2);
    expect(fnhSelfAssessmentMark(paper[0].items[0],["0","1"],"   ")).toBe(0);
  });
  test("missing answer evidence does not earn any marks by default",()=>{
    const report=fnhSelfAssessmentTotal(paper,{});
    expect(report.checked).toBe(0);
    expect(report.reviewedParts).toBe(0);
    expect(report.maximum).toBe(96);
    expect(report.totalParts).toBe(24);
  });
});
