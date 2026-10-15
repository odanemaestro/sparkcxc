import {fnhWorkedSupplement,FNH_P2_WORKED_SUPPLEMENTS} from "./fnhPaper2WorkedAnswerSupplements";
import {FNH_HISTORICAL_P2_2026} from "./fnhHistorical2026Paper2";

describe("2026 Paper 2 supplementary worked-answer mapping",()=>{
  it("maps all reviewed Q1 and Q2 parts without mismatched IDs",()=>{
    const questions=FNH_HISTORICAL_P2_2026.questions.filter(q=>[1,2].includes(q.number));
    expect(questions).toHaveLength(2);
    for(const q of questions){
      const expectedIds=q.items.map(part=>part.id).sort();
      const suppliedIds=Object.keys(FNH_P2_WORKED_SUPPLEMENTS[2026][q.number]).sort();
      expect(suppliedIds).toEqual(expectedIds);
      for(const part of q.items){
        const help=fnhWorkedSupplement(2026,q.number,part.id);
        expect(typeof help).toBe("string");
        expect(help.length).toBeGreaterThan(25);
        expect(part.marks).toBeGreaterThan(0);
      }
    }
  });
  it("does not substitute answers for another year or paper part",()=>{
    expect(fnhWorkedSupplement(2024,1,"a")).toBeNull();
    expect(fnhWorkedSupplement(2026,3,"a")).toBeNull();
    expect(fnhWorkedSupplement(2026,1,"missing")).toBeNull();
  });
});
