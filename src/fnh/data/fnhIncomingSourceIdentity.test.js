import {FNH_QUARANTINED_INCOMING_SOURCES,fnhCheckIncomingPaperIdentity} from "./fnhIncomingSourceIdentity";
import {FNH_SUPPLIED_ARCHIVE,FNH_ARCHIVE_SUMMARY,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
import {fnhHistoricalPaper1Reader} from "./fnhHistoricalPaper1ReleaseGate";

describe("FNH incoming source identity and misnamed 2023 upload",()=>{
 test("read the actual PDF cover instead of trusting the filename",()=>{
  const source=FNH_QUARANTINED_INCOMING_SOURCES[0];
  expect(source).toMatchObject({
   suppliedFilename:"CSEC FNH P1 2023 MJ.pdf",
   expectedSubject:"Food, Nutrition and Health",
   expectedYear:2023,expectedPaper:1,
   observedSubject:"Agricultural Science",
   observedYear:2020,observedPaper:1,
   observedExamDate:"2020-06-03",
   observedCoverForm:"FORM TP 2020047",
   observedTestCode:"01203010",
   observedDurationMinutes:75,observedQuestionCount:60,
   suppliedPdfPages:10,examinedCover:true,
   pdfSha256:"7a854cc8f6d66330225494b4144abf68c267a213014920a377f49f96f297a0e7",
   reviewStatus:"rejected-wrong-subject-and-year",eligibleForFnhQuestionBank:false
  });
  const review=fnhCheckIncomingPaperIdentity(source);
  expect(review.acceptedForSourceTranscription).toBe(false);
  expect(review.eligibleForGradedRelease).toBe(false);
  expect(review.reasons).toEqual(["wrong-subject","wrong-year"]);
 });
 test("rejected PDF is never counted as an authentic FNH paper, even as an unscored exam",()=>{
  const suspect=FNH_QUARANTINED_INCOMING_SOURCES[0];
  expect(FNH_SUPPLIED_ARCHIVE.some(s=>s.sourceFilename===suspect.suppliedFilename)).toBe(false);
  expect(FNH_SUPPLIED_ARCHIVE.some(s=>s.year===2023&&s.paper===1)).toBe(false);
  expect(fnhHistoricalSimulatorReady(suspect.id)).toBeNull();
  expect(fnhHistoricalPaper1Reader(suspect.id)).toBeNull();
  expect(FNH_ARCHIVE_SUMMARY).toMatchObject({paper1:16,paper2:18,unique:34});
 });
 test("identity matching alone never authenticates a marking key",()=>{
  const src={...FNH_QUARANTINED_INCOMING_SOURCES[0],
    expectedYear:2023,observedYear:2023,
    observedSubject:"Food, Nutrition and Health"};
  expect(fnhCheckIncomingPaperIdentity(src)).toMatchObject({
   acceptedForSourceTranscription:true,eligibleForGradedRelease:false,reasons:[]
  });
  expect(fnhCheckIncomingPaperIdentity({...src,examinedCover:false}).reasons).toContain("cover-not-verified");
  expect(fnhCheckIncomingPaperIdentity({...src,observedPaper:2}).reasons).toContain("wrong-paper");
  expect(fnhCheckIncomingPaperIdentity({...src,observedSession:"January"}).reasons).toContain("wrong-session");
  expect(fnhCheckIncomingPaperIdentity({...src,pdfSha256:""}).reasons).toContain("missing-verified-file-hash");
 });
});
