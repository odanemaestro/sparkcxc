import {FNH_P1_2004_TRANSCRIPTION_DRAFT,FNH_P1_2004_QA} from "./fnhHistorical2004Paper1Draft";
import {FNH_P1_2005_TRANSCRIPTION_DRAFT,FNH_P1_2005_QA} from "./fnhHistorical2005Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
describe("FNH source-integrity release blockers for incomplete Paper 1 scans",()=>{
  test("2004 scan does not contain shared answer choices for 46 and 47",()=>{
    const incomplete=FNH_P1_2004_TRANSCRIPTION_DRAFT.filter(x=>!x.sourceChecked);
    expect(incomplete.map(x=>x.number)).toEqual([46,47]);
    expect(incomplete.every(x=>x.options===null&&x.proposedAnswer===null)).toBe(true);
    expect(FNH_P1_2004_QA.sourceVerifiedQuestions).toBe(58);
    expect(FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2004-MJ").simulatorReady).not.toBe(true);
  });
  test("2005 supplied document ends after question 53 although 60 are required",()=>{
    const record=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2005-MJ");
    expect(record.missingSourceQuestionNumbers).toEqual([54,55,56,57,58,59,60]);
    expect(record.sourceQuestionCount).toBe(53);
    expect(FNH_P1_2005_QA.sourceContinuesAfterLastPage).toBe(true);
    expect(FNH_P1_2005_TRANSCRIPTION_DRAFT).toHaveLength(53);
    expect(record.simulatorReady).not.toBe(true);
  });
  test("no incomplete or unchecked Paper 1 is exposed as an examination",()=>{
    for(const year of [2004,2005]){
      expect(fnhHistoricalSimulatorReady(`FNH-P1-${year}-MJ`)).toBeNull();
    }
  });
});
