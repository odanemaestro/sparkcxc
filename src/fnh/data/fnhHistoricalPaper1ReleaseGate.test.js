import {fnhHistoricalPaper1ReleaseCheck,FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_P1_2003_TRANSCRIPTION_DRAFT} from "./fnhHistorical2003Paper1Draft";
import {FNH_P1_2004_TRANSCRIPTION_DRAFT} from "./fnhHistorical2004Paper1Draft";
describe("Historical FNH Paper1 release gate",()=>{
 test("complete original wording without independently verified keys is never treated as an examination",()=>{
  const state=fnhHistoricalPaper1ReleaseCheck(FNH_P1_2003_TRANSCRIPTION_DRAFT);
  expect(state).toMatchObject({ready:false,questions:60,numbered:true,sourceComplete:true,keysComplete:false});
  expect(state.pendingKeyNumbers).toHaveLength(60);
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.map(x=>x.year)).toEqual([2003,2004,2005]);
 });
 test("a scan missing answer options cannot be released",()=>{
  const state=fnhHistoricalPaper1ReleaseCheck(FNH_P1_2004_TRANSCRIPTION_DRAFT);
  expect(state).toMatchObject({ready:false,questions:60,numbered:true,sourceComplete:false});
  expect(state.pendingSourceNumbers).toEqual([46,47]);
 });
 test("all 60 keys, all four options and separate evidence required together",()=>{
  const clean=FNH_P1_2003_TRANSCRIPTION_DRAFT.map(x=>({...x,officialKeyVerified:true,proposedAnswer:x.proposedAnswer||"A"}));
  expect(fnhHistoricalPaper1ReleaseCheck(clean).ready).toBe(false);
  expect(fnhHistoricalPaper1ReleaseCheck(clean,{verifiedKeyEvidence:true}).ready).toBe(true);
  expect(fnhHistoricalPaper1ReleaseCheck(clean.slice(1),{verifiedKeyEvidence:true}).ready).toBe(false);
  expect(fnhHistoricalPaper1ReleaseCheck([...clean,clean[0]],{verifiedKeyEvidence:true}).ready).toBe(false);
 });
});
