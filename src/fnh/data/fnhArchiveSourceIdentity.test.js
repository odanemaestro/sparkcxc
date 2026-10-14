import {FNH_SUPPLIED_ARCHIVE,FNH_ARCHIVE_SUMMARY,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
import {FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS} from "./fnhHistoricalPaper1ReleaseGate";

describe("FNH supplied historical archive source identity",()=>{
 test("the misnamed 2021 Paper 01 is Spanish Paper 03 Oral from January 2023, not FNH",()=>{
  const source=FNH_SUPPLIED_ARCHIVE.find(r=>r.id==="FNH-P1-2021-MJ");
  expect(source).toMatchObject({
   sourceIdentityVerified:false,
   reviewStatus:"incorrect-subject-and-year",
   actualSourceSubject:"Spanish",
   actualSourcePaper:"Paper 03 Oral, General Proficiency",
   actualSourceSession:"January 2023",
   sourcePageCount:4,
   verifiedQuestionCount:0
  });
  expect(source.sourceQualityNote).toMatch(/not the May\/June 2021 FNH/);
  expect(fnhHistoricalSimulatorReady(source.id)).toBeNull();
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.find(r=>r.year===2021)?.ready).toBe(false);
 });
 test("archive counts separate supplied filenames from genuine FNH sources",()=>{
  expect(FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===1)).toHaveLength(16);
  expect(FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===2)).toHaveLength(18);
  expect(FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===1&&p.sourceIdentityVerified===false)).toHaveLength(1);
  expect(FNH_ARCHIVE_SUMMARY).toMatchObject({
   paper1:16,paper2:18,unique:34,
   verifiedSubjectPaper1Sources:15,
   invalidSubjectPaper1Sources:1,
   validSubjectDocuments:33
  });
 });
});
