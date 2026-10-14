import {FNH_SUPPLIED_ARCHIVE,FNH_ARCHIVE_SUMMARY,fnhHistoricalPaperFormat,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
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
   validSubjectDocuments:33,
   unverifiedPaper1YearSources:0
  });
 });
 test("2014 user-confirmed year is accepted for browsing but not scored examination",()=>{
  const source=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2014-MJ");
  expect(source).toMatchObject({sourceYearVerified:true,
    sourceYearVerificationMethod:"user-confirmed-2026-10-14",verifiedQuestionCount:0});
  expect(fnhHistoricalSimulatorReady(source.id)).toBeNull();
 });
 test("Paper 1 format labels verified timings only where a cover was checked",()=>{
  expect(fnhHistoricalPaperFormat("FNH-P1-2016-MJ")).toMatchObject({
    durationMinutes:75,sourceTimeVerified:true,qualification:"General Proficiency"});
  expect(fnhHistoricalPaperFormat("FNH-P1-2019-MJ")).toMatchObject({
    durationMinutes:90,sourceTimeVerified:true,qualification:"Technical Proficiency"});
  expect(fnhHistoricalPaperFormat("FNH-P1-2026-MJ")).toMatchObject({
    durationMinutes:90,sourceTimeVerified:true,qualification:"Technical Proficiency"});
  expect(fnhHistoricalPaperFormat("FNH-P1-2018-MJ")).toMatchObject({
    sourceTimeVerified:false});
  expect(fnhHistoricalPaperFormat("FNH-P1-2005-MJ")).toMatchObject({
    sourceTimeVerified:false,durationMinutes:null});
 });
});
