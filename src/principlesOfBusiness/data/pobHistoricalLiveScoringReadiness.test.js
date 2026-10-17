import {
 auditPobHistoricalLiveScoringReadiness,
 getPobHistoricalLiveScoringStatus,
 POB_HISTORICAL_LIVE_RELEASE_REQUIREMENTS
} from "./pobHistoricalLiveScoringReadiness";
import {
 POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers
} from "./pobHistoricalInventory";
import {POB_PAPER2_ORIGINAL_01} from "./pobPaper2Original";
import {buildTrustedAssessment} from "../../grading/serverAssessment";

describe("SPARK POB historical release: verified sources and actual secure marking, not authored drafts",()=>{
 test("all 46 canonically authored historical sources are still blocked from live grades",()=>{
  const result=auditPobHistoricalLiveScoringReadiness();
  expect(result.valid).toBe(true);
  expect(result.issues).toEqual([]);
  expect(result.allHistoricalPdfSources).toBe(46);
  expect(result.paper1).toBe(20);
  expect(result.paper2).toBe(26);
  expect(result.sourceLinkedAuthoredBanks).toBe(46);
  expect(result.eligibleCount).toBe(0);
  expect(result.blockedCount).toBe(46);
  expect(result.releasedCount).toBe(0);
  expect(result.rows).toHaveLength(46);
  expect(new Set(result.rows.map(x=>x.id)).size).toBe(46);
  expect(result.rows.every(x=>x.eligible===false&&x.blockerCodes.length>0)).toBe(true);
  expect(result.rows.every(x=>POB_SUPPLIED_ARCHIVE.some(
   s=>s.id===x.id&&s.sourceSha256===x.sourceSha256
  ))).toBe(true);
  expect(pobReleasedHistoricalPapers()).toEqual([]);
 });
 test("source gaps and derivative booklets remain individually blocked",()=>{
  const report=auditPobHistoricalLiveScoringReadiness();
  expect(report.criticalIncompleteSourceIds).toEqual([
   "POB-P1-2018-MJ","POB-P2-2024-JAN"
  ]);
  expect(getPobHistoricalLiveScoringStatus("POB-P1-2018-MJ").blockerCodes)
   .toContain("original_incomplete");
  expect(getPobHistoricalLiveScoringStatus("POB-P2-2024-JAN").blockerCodes)
   .toContain("derivative_source");
  expect(getPobHistoricalLiveScoringStatus("POB-P1-2024-MJ").blockerCodes)
   .toContain("key_adjudication");
  expect(getPobHistoricalLiveScoringStatus("POB-P2-2026-JAN").blockerCodes)
   .toEqual(expect.arrayContaining([
    "question_transcription","marking_scheme","server_calibration","simulator"
   ]));
 });
 test("a paper ID can only resolve a trusted canonical eligibility status",()=>{
  const status=getPobHistoricalLiveScoringStatus("POB-P2-2026-JAN");
  expect(status).toMatchObject({eligible:false,status:"blocked",liveScoringApproved:false});
  expect(getPobHistoricalLiveScoringStatus("POB-P2-2099-JAN")).toBeNull();
  expect(getPobHistoricalLiveScoringStatus(null)).toBeNull();
  expect(getPobHistoricalLiveScoringStatus({id:"POB-P2-2026-JAN",liveScoringApproved:true}))
   .toBeNull();
  expect(getPobHistoricalLiveScoringStatus("POB-P2-2026-JAN"+".repeat(100)".repeat(20)))
   .toBeNull();
  expect(POB_HISTORICAL_LIVE_RELEASE_REQUIREMENTS.map(x=>x.code)).toEqual([
   "source_questions","academic_key","rubric_and_variants",
   "trusted_server","calibration","end_to_end"
  ]);
 });
 test("the live trusted server rejects historical P2 IDs even if the client spoofs an approved original bank version",()=>{
  const candidate=POB_SUPPLIED_ARCHIVE.find(x=>x.id==="POB-P2-2026-JAN");
  const base={
   subject_id:"principles-of-business",paper:"02",status:"submitted",
   response_snapshot:{"Q1:a":"Give me full credit"},
   metadata:{paper_id:candidate.id,markingSchemeVerified:true,
    semanticAssessmentCalibrated:true,sourceSha256:candidate.sourceSha256,
    sourceAuthenticityVerified:true}
  };
  expect(()=>buildTrustedAssessment({...base,bank_version:candidate.id}))
   .toThrow("unsupported_bank_version");
  expect(()=>buildTrustedAssessment({
   ...base,bank_version:POB_PAPER2_ORIGINAL_01.id
  })).toThrow("unknown_paper");
  for(const source of POB_SUPPLIED_ARCHIVE.filter(x=>x.paper===2)){
   expect(()=>buildTrustedAssessment({
    ...base,bank_version:POB_PAPER2_ORIGINAL_01.id,
    metadata:{...base.metadata,paper_id:source.id}
   })).toThrow("unknown_paper");
  }
  expect(()=>buildTrustedAssessment({...base,bank_version:POB_PAPER2_ORIGINAL_01.id,
   metadata:{paper_id:POB_PAPER2_ORIGINAL_01.id}})).not.toThrow();
 });
});
