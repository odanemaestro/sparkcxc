import {FNH_P1_2007_TRANSCRIPTION_DRAFT as paper} from "./fnhHistorical2007Paper1Draft";
import {fnhHistoricalPaper1ReleaseCheck,fnhPaper1ArchiveReadiness} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";

describe("Visually transcribed May/June 2007 Paper 01 source and marking safety",()=>{
  test("all 60 questions appear in source order with four original options",()=>{
    expect(paper).toHaveLength(60);
    expect(paper.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
    expect(new Set(paper.map(q=>q.id)).size).toBe(60);
    expect(paper.every(q=>q.options.length===4&&q.sourceChecked===true)).toBe(true);
    expect(paper.every(q=>q.stem.trim().length>15&&q.explanation.trim().length>30)).toBe(true);
    expect(paper.every(q=>q.sourcePage>=1&&q.sourcePage<=8)).toBe(true);
  });
  test("source diagrams remain on their original question numbers",()=>{
    expect(paper[42].diagramId).toBe("kitchen-layout-2007");
    expect(paper[48].diagramId).toBe("place-setting-2007");
    expect(paper[2].options[0]).toMatch(/95% water/);
    expect(paper[58].stem).toMatch(/above list of dishes/);
  });
  test("unresolved answers and absent original CXC key prohibit graded historical release",()=>{
    const unresolved=paper.filter(q=>!q.proposedAnswer);
    expect(unresolved.length).toBeGreaterThanOrEqual(0);
    expect(paper.every(q=>q.officialKeyVerified===false)).toBe(true);
    expect(fnhHistoricalPaper1ReleaseCheck(paper).ready).toBe(false);
    expect(fnhHistoricalSimulatorReady("FNH-P1-2007-MJ")).toBeNull();
    expect(FNH_SUPPLIED_ARCHIVE.find(q=>q.id==="FNH-P1-2007-MJ"))
      .toMatchObject({transcribedQuestionCount:60,verifiedQuestionCount:0});
    expect(fnhPaper1ArchiveReadiness()).toMatchObject({total:15,ready:0,pending:15});
  });
});
