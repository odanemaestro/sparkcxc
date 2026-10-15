import {FNH_P1_2008_TRANSCRIPTION_DRAFT as paper} from "./fnhHistorical2008Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
import {fnhHistoricalPaper1ReleaseCheck} from "./fnhHistoricalPaper1ReleaseGate";
describe("2008 Paper1 source transcription versus official answer-key release",()=>{
 test("all sixty source questions retain their source-page and four-option structure",()=>{
  expect(paper).toHaveLength(60);
  expect(paper.map(row=>row.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(new Set(paper.map(row=>row.id)).size).toBe(60);
  expect(paper.every(row=>row.options.length===4&&row.sourcePage>=1&&row.sourcePage<=7)).toBe(true);
 });
 test("diagram questions are mapped to original source positions",()=>{
  expect(paper[7].diagramId).toBe("place-setting-2008");
  expect(paper[42].diagramId).toBe("knife-collection-2008");
  expect(paper[49].diagramId).toBe("local-dishes-table-2008");
  expect(paper[50].diagramId).toBe("local-dishes-table-2008");
  expect(paper[49].stem).toMatch(/deficient/);
 });
 test("historical source questions cannot be graded without independent key confirmation",()=>{
  expect(paper.filter(row=>!row.proposedAnswer).length).toBeGreaterThanOrEqual(0);
  expect(paper.every(row=>row.officialKeyVerified===false)).toBe(true);
  expect(fnhHistoricalPaper1ReleaseCheck(paper).ready).toBe(false);
  expect(FNH_SUPPLIED_ARCHIVE.find(row=>row.id==="FNH-P1-2008-MJ")).toMatchObject({transcribedQuestionCount:60,verifiedQuestionCount:0});
  expect(fnhHistoricalSimulatorReady("FNH-P1-2008-MJ")).toBeNull();
 });
});
