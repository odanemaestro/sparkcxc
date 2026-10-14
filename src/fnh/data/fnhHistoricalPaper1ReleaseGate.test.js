import {fnhHistoricalPaper1ReleaseCheck,FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_P1_2003_TRANSCRIPTION_DRAFT} from "./fnhHistorical2003Paper1Draft";
import {FNH_P1_2004_TRANSCRIPTION_DRAFT} from "./fnhHistorical2004Paper1Draft";
describe("Historical FNH Paper1 release gate",()=>{
 test("complete original wording without independently verified keys is never treated as an examination",()=>{
  const state=fnhHistoricalPaper1ReleaseCheck(FNH_P1_2003_TRANSCRIPTION_DRAFT);
  expect(state).toMatchObject({ready:false,questions:60,numbered:true,sourceComplete:true,keysComplete:false});
  expect(state.pendingKeyNumbers).toHaveLength(60);
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.map(x=>x.year)).toHaveLength(16);
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.filter(x=>x.reportedTranscribed>0).length).toBeGreaterThanOrEqual(4);
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.every(x=>!x.ready)).toBe(true);
 });
 test("a scan missing answer options cannot be released",()=>{
  const state=fnhHistoricalPaper1ReleaseCheck(FNH_P1_2004_TRANSCRIPTION_DRAFT);
  expect(state).toMatchObject({ready:false,questions:60,numbered:true,sourceComplete:false});
  expect(state.pendingSourceNumbers).toEqual([46,47]);
 });
 test("typed notes and a Boolean approval cannot impersonate an official source key",()=>{
  const raw=FNH_P1_2003_TRANSCRIPTION_DRAFT.map(x=>({
   ...x,officialKeyVerified:true,proposedAnswer:x.proposedAnswer||"A",
   officialKeyEvidence:"Official CXC key source page 1"
  }));
  const result=fnhHistoricalPaper1ReleaseCheck(raw,{verifiedKeyEvidence:true});
  expect(result).toMatchObject({ready:false,sourceComplete:true,keysComplete:true,
   figureComplete:true,evidenceComplete:false});
  expect(result.pendingKeyNumbers).toHaveLength(60);
 });
 test("every answer needs keyed document hash, source page and two distinct reviewers",()=>{
  // Synthetic positive fixture checks the data contract only. No real CXC
  // answer keys are bundled, and production archive records all remain locked.
  const attested=FNH_P1_2003_TRANSCRIPTION_DRAFT.map(x=>{
   const key=x.proposedAnswer||"A";
   return {...x,proposedAnswer:key,officialKeyVerified:true,officialKeyEvidence:{
    sourceType:"CXC-official-answer-key",documentId:"ExampleOfficialSource-2003",
    documentSha256:"a".repeat(64),page:1,questionNumber:x.number,answer:key,
    reviewers:[{reviewerId:"checker-one",verifiedAt:"2026-10-14"},
     {reviewerId:"checker-two",verifiedAt:"2026-10-14"}]
   }};
  });
  expect(fnhHistoricalPaper1ReleaseCheck(attested).ready).toBe(false);
  expect(fnhHistoricalPaper1ReleaseCheck(attested,{verifiedKeyEvidence:true}))
    .toMatchObject({ready:true,keysComplete:true,evidenceComplete:true,figureComplete:true});
  const change=(number,patch)=>{
   const list=attested.map(x=>({...x}));
   list[number-1]={...list[number-1],...patch};
   return list;
  };
  expect(fnhHistoricalPaper1ReleaseCheck(change(8,{proposedAnswer:"AB"}),{verifiedKeyEvidence:true}).ready).toBe(false);
  expect(fnhHistoricalPaper1ReleaseCheck(change(8,{proposedAnswer:""}),{verifiedKeyEvidence:true}).ready).toBe(false);
  expect(fnhHistoricalPaper1ReleaseCheck(change(8,{officialKeyEvidence:null}),{verifiedKeyEvidence:true}).ready).toBe(false);
  expect(fnhHistoricalPaper1ReleaseCheck(change(8,{officialKeyEvidence:{
   ...attested[7].officialKeyEvidence,answer:"Z"
  }}),{verifiedKeyEvidence:true}).ready).toBe(false);
  expect(fnhHistoricalPaper1ReleaseCheck(change(8,{officialKeyEvidence:{
   ...attested[7].officialKeyEvidence,documentSha256:"not-a-hash"
  }}),{verifiedKeyEvidence:true}).ready).toBe(false);
  expect(fnhHistoricalPaper1ReleaseCheck(change(8,{officialKeyEvidence:{
   ...attested[7].officialKeyEvidence,reviewers:[
    {reviewerId:"checker-one",verifiedAt:"2026-10-14"},
    {reviewerId:"checker-one",verifiedAt:"2026-10-14"}]
  }}),{verifiedKeyEvidence:true}).ready).toBe(false);
  expect(fnhHistoricalPaper1ReleaseCheck(attested.slice(1),{verifiedKeyEvidence:true}).missingNumbers).toEqual([1]);
  expect(fnhHistoricalPaper1ReleaseCheck([...attested,attested[0]],{verifiedKeyEvidence:true}).duplicateNumbers).toEqual([1]);
 });
 test("missing figures, blank option text and duplicate choice text block release",()=>{
  const rows=FNH_P1_2003_TRANSCRIPTION_DRAFT;
  const duplicate=rows.map((x,i)=>i===5?{...x,options:[x.options[0],x.options[0],x.options[2],x.options[3]]}:x);
  expect(fnhHistoricalPaper1ReleaseCheck(duplicate).pendingSourceNumbers).toContain(6);
  const blanks=rows.map((x,i)=>i===5?{...x,options:["","B","C","D"]}:x);
  expect(fnhHistoricalPaper1ReleaseCheck(blanks).pendingSourceNumbers).toContain(6);
  const unverifiedFigure=rows.map((x,i)=>i===5?{...x,diagramId:"figure-6"}:x);
  expect(fnhHistoricalPaper1ReleaseCheck(unverifiedFigure)).toMatchObject({
   sourceComplete:true,figureComplete:false,pendingFigureNumbers:[6],ready:false
  });
 });

});
