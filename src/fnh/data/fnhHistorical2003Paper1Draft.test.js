import {FNH_P1_2003_TRANSCRIPTION_DRAFT,FNH_P1_2003_QA} from "./fnhHistorical2003Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE} from "./fnhPastPaperInventory";
describe("Historical FNH Paper 1 release safeguard",()=>{
  test("a partial source transcription stays unavailable as a simulated exam",()=>{
    expect(FNH_P1_2003_QA).toMatchObject({expectedQuestions:60,simulatorReady:false,sourceVerifiedQuestions:7,officialKeyVerifiedQuestions:0});
    expect(FNH_P1_2003_TRANSCRIPTION_DRAFT).toHaveLength(7);
    expect(FNH_SUPPLIED_ARCHIVE.find(item=>item.id==="FNH-P1-2003-MJ")?.simulatorReady).not.toBe(true);
  });
  test("draft question choices have separate source/answer-key verification flags",()=>{
    const rows=FNH_P1_2003_TRANSCRIPTION_DRAFT;
    expect(new Set(rows.map(row=>row.number)).size).toBe(rows.length);
    rows.forEach(row=>{
      expect(row.sourceChecked).toBe(true);
      expect(row.officialKeyVerified).toBe(false);
      expect(row.options).toHaveLength(4);
      expect(new Set(row.options).size).toBe(4);
      expect("ABCD").toContain(row.proposedAnswer);
      expect(row.explanation.length).toBeGreaterThan(35);
    });
  });
});
