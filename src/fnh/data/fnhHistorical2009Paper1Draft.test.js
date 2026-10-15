import {FNH_P1_2009_TRANSCRIPTION_DRAFT as paper} from "./fnhHistorical2009Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
import {fnhHistoricalPaper1ReleaseCheck} from "./fnhHistoricalPaper1ReleaseGate";

describe("May/June 2009 source-transcribed Food and Nutrition Paper1",()=>{
 test("original 60 questions and all four choices retain source order",()=>{
   expect(paper).toHaveLength(60);
   expect(paper.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
   expect(new Set(paper.map(q=>q.id)).size).toBe(60);
   expect(paper.every(q=>q.sourceChecked&&q.sourcePage>=1&&q.sourcePage<=9)).toBe(true);
   expect(paper.every(q=>q.options.length===4&&q.stem.length>15)).toBe(true);
 });
 test("source diagram clues remain on correct question numbers",()=>{
   expect(paper[8].diagramId).toBe("two-menus-2009");
   expect(paper[9].diagramId).toBe("two-menus-2009");
   expect(paper[42].diagramId).toBe("kitchen-layout-2009");
   expect(paper[44].diagramId).toBe("kitchen-layout-2009");
   expect(paper[48].diagramId).toBe("local-dishes-table-2009");
   expect(paper[51].diagramId).toBe("luncheon-menu-2009");
 });
 test("missing official CXC key and source ambiguity block graded release",()=>{
   expect(paper.filter(q=>!q.proposedAnswer).length).toBeGreaterThanOrEqual(10);
   expect(paper.every(q=>q.officialKeyVerified===false)).toBe(true);
   expect(fnhHistoricalPaper1ReleaseCheck(paper).ready).toBe(false);
   expect(fnhHistoricalSimulatorReady("FNH-P1-2009-MJ")).toBeNull();
   expect(FNH_SUPPLIED_ARCHIVE.find(p=>p.id==="FNH-P1-2009-MJ")).toMatchObject({transcribedQuestionCount:60,verifiedQuestionCount:0});
 });
});
