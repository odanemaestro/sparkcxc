import {FNH_P1_2005_TRANSCRIPTION_DRAFT as oldPaper} from "./fnhHistorical2005Paper1Draft";
import {FNH_P1_2014_TRANSCRIPTION_DRAFT as labelled2014} from "./fnhHistorical2014Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
import {fnhHistoricalPaper1Reader} from "./fnhHistoricalPaper1ReleaseGate";

const normalized=text=>String(text||"").toLowerCase().replace(/[^a-z0-9]/g,"");

describe("2014 FNH Paper 01 year-provenance source audit",()=>{
 test("user-confirmed 2014 year retains source repeats and no unofficial scoring",()=>{
  const oldMap=new Map(oldPaper.map(row=>[row.number,normalized(row.stem)]));
  const matching=labelled2014.filter(row=>oldMap.has(row.number)&&
   normalized(row.stem).length>18&&normalized(row.stem)===oldMap.get(row.number));
  expect(oldPaper).toHaveLength(53);
  expect(labelled2014).toHaveLength(60);
  expect(matching).toHaveLength(45);
  const source=FNH_SUPPLIED_ARCHIVE.find(row=>row.id==="FNH-P1-2014-MJ");
  expect(source).toMatchObject({
   sourceYearVerified:true,sourceYearVerificationMethod:"user-confirmed-2026-10-14",
   reviewStatus:"requires-question-and-key-verification",
   transcribedQuestionCount:60,verifiedQuestionCount:0
  });
  expect(source.sourceQualityNote).toMatch(/2005/);
  expect(fnhHistoricalPaper1Reader(source.id)?.questions).toHaveLength(60);
  expect(fnhHistoricalPaper1Reader(source.id)?.scored).toBe(false);
  expect(fnhHistoricalSimulatorReady(source.id)).toBeNull();
 });
 test("a user-confirmed historical year is separate from a proven wrong-subject 2021 PDF",()=>{
  const old=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2014-MJ");
  const incorrect=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2021-MJ");
  expect(old.sourceIdentityVerified).not.toBe(false);
  expect(old.sourceYearVerified).toBe(true);
  expect(old.sourceYearVerificationMethod).toBe("user-confirmed-2026-10-14");
  expect(incorrect).toBeUndefined();
  expect(FNH_SUPPLIED_ARCHIVE.some(row=>row.year===2021&&row.paper===1)).toBe(false);
 });
});
