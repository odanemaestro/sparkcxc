import {FNH_P1_2014_TRANSCRIPTION_DRAFT as paper} from "./fnhHistorical2014Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
import {fnhHistoricalPaper1ReleaseCheck} from "./fnhHistoricalPaper1ReleaseGate";
describe("2014 scanned historical Paper1 source integrity and unreliable handwritten markings",()=>{
  test("all 60 original numbered questions retain four choices and page references",()=>{
    expect(paper).toHaveLength(60);
    expect(paper.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
    expect(new Set(paper.map(q=>q.id)).size).toBe(60);
    expect(paper.every(q=>q.sourceChecked&&q.options.length===4&&q.sourcePage>=1&&q.sourcePage<=8)).toBe(true);
  });
  test("the historically repeated wholewheat question is retained, not silently deduplicated",()=>{
    expect(paper[2].stem).toBe(paper[3].stem);
    expect(paper[2].number).toBe(3);
    expect(paper[3].number).toBe(4);
  });
  test("the source answer pen marks are not used for final marking",()=>{
    expect(paper[21].stem).toMatch(/pressure cooker/);
    expect(paper[21].proposedAnswer).toBe("A"); // Gasket, not source-marked safety plug
    expect(paper[23].proposedAnswer).toBe("C"); // Croutons, not source-marked toast slices
    expect(paper[58].proposedAnswer).toBeNull();
    expect(paper[59].proposedAnswer).toBeNull();
    expect(paper.every(q=>q.officialKeyVerified===false)).toBe(true);
    expect(fnhHistoricalPaper1ReleaseCheck(paper).ready).toBe(false);
    expect(fnhHistoricalSimulatorReady("FNH-P1-2014-MJ")).toBeNull();
    expect(FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2014-MJ"))
      .toMatchObject({transcribedQuestionCount:60,verifiedQuestionCount:0});
  });
  test("historical source diagrams retain their question numbers",()=>{
    expect(paper[22].diagramId).toBe("lunch-table-2014");
    expect(paper[38].diagramId).toBe("two-menus-2014");
    expect(paper[47].diagramId).toBe("food-safety-2014");
    expect(paper[56].diagramId).toBe("preschool-lunch-2014");
  });
});
