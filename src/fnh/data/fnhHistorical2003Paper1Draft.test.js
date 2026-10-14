import {FNH_P1_2003_TRANSCRIPTION_DRAFT,FNH_P1_2003_QA} from "./fnhHistorical2003Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE} from "./fnhPastPaperInventory";
describe("Historical FNH Paper 1 release safeguard",()=>{
  test("a partial source transcription stays unavailable as a simulated exam",()=>{
    expect(FNH_P1_2003_QA).toMatchObject({expectedQuestions:60,simulatorReady:false,sourceVerifiedQuestions:60,officialKeyVerifiedQuestions:0});
    expect(FNH_P1_2003_TRANSCRIPTION_DRAFT).toHaveLength(60);
    expect(FNH_SUPPLIED_ARCHIVE.find(item=>item.id==="FNH-P1-2003-MJ")?.simulatorReady).not.toBe(true);
  });
  test("draft question choices have separate source/answer-key verification flags",()=>{
    const rows=FNH_P1_2003_TRANSCRIPTION_DRAFT;
    expect(new Set(rows.map(row=>row.number)).size).toBe(rows.length);
    expect(rows.map(row=>row.number).sort((a,b)=>a-b)).toEqual(Array.from({length:60},(_,i)=>i+1));
    rows.forEach(row=>{
      expect(row.sourceChecked).toBe(true);
      expect(row.officialKeyVerified).toBe(false);
      expect(row.options).toHaveLength(4);
      expect(new Set(row.options).size).toBe(4);
      expect(row.proposedAnswer===null||"ABCD".includes(row.proposedAnswer)).toBe(true);
      expect(row.explanation.length).toBeGreaterThan(35);
    });
  });
});
