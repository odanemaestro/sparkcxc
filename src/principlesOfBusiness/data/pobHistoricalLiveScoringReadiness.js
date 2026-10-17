// Historical POB grading release audit.
// This reads the canonical, repository-owned source manifest exclusively.
// DO NOT decide release from an attempt payload, a client-supplied boolean,
// a SHA-256 source match alone, or an authored answer/rubric draft.
// Academic certificates and real server benchmarking are still outstanding.
import {
 POB_SUPPLIED_ARCHIVE,isPobHistoricalPaperFullyVerified,pobReleasedHistoricalPapers
} from "./pobHistoricalInventory";
import {POB_HISTORICAL_SCORING_BATCHES} from "./pobHistoricalScoringBatches";
import {auditPobCompleteHistoricalAuthoring} from "./pobHistoricalAll46AuthoringAudit";

export const POB_HISTORICAL_LIVE_RELEASE_REQUIREMENTS=Object.freeze([
 Object.freeze({
  code:"source_questions",
  description:"Transcribe every original question, all options, diagrams and page positions, and verify the complete candidate-facing simulation against the source PDF."
 }),
 Object.freeze({
  code:"academic_key",
  description:"Adjudicate each correct option or written criterion against source evidence; resolve defective, ambiguous and missing questions without penalising students."
 }),
 Object.freeze({
  code:"rubric_and_variants",
  description:"Verify original Paper 2 marks, compulsory and optional questions, fair alternative correct ideas, part caps and legitimate error carried forward."
 }),
 Object.freeze({
  code:"trusted_server",
  description:"Register the exact authenticated historical bank version in the trusted server marking bundle; reject altered IDs, rubrics, response snapshots and client authority."
 }),
 Object.freeze({
  code:"calibration",
  description:"Demonstrate production-equivalent grading on internally adjudicated full/partial/blank/contradictory/alternative/prompt-injection benchmarks and record false-credit and missed-credit rates."
 }),
 Object.freeze({
  code:"end_to_end",
  description:"Verify authenticated attempts, safe retries, persisted scores, result-review parity, accessibility, device layouts, uncertainty handling and secure production configuration."
 })
]);

const BLOCKER=Object.freeze({
  original_incomplete:"Original PDF lacks five numbered questions (May/June 2018 P1 Q53–57); these may not be invented or marked wrong.",
  derivative_source:"The supplied January 2024 P2 is a two-page derivative transcription, not a fully verified printed source booklet.",
  source_mismatch:"Archive source identity, paper type or source SHA-256 failed the canonical supplied-PDF check.",
  question_transcription:"Complete source wording, diagrams, every option and student-facing examination have not been verified.",
  key_adjudication:"The correct-answer key has not passed item-level academic/source adjudication.",
  marking_scheme:"Each historic Paper 2 source rubric/alternate response has not been authenticated and academically checked.",
  simulator:"No student simulator has been source-verified and approved for this historical sitting.",
  academic_qa:"Whole-paper assessment, disputed answer handling, marking parity and alternate-answer checks are incomplete.",
  server_calibration:"A secure server-side historical bank and production-equivalent grading calibration are not certified.",
  source_audit:"Full source/answer authorship audit does not pass its structural checks."
});
export const POB_HISTORICAL_LIVE_RELEASE_BLOCKERS=BLOCKER;

function inspectCanonicalSource(source,firstBatch,authoredAuditValid){
 const blockers=[];
 if(source.id==="POB-P1-2018-MJ")blockers.push("original_incomplete");
 const listed=firstBatch.find(x=>x.id===source.id);
 if(listed?.sourceForm==="derivative-transcription")blockers.push("derivative_source");
 if(!source.sourceSha256||source.sourcePaperMismatch!==false||!source.filename||
    !POB_HISTORICAL_SCORING_BATCHES.flat().some(p=>p.id===source.id&&
      p.filename===source.filename&&p.sourceSha256===source.sourceSha256&&p.paper===source.paper))
  blockers.push("source_mismatch");
 if(source.transcriptionStatus!=="verified"||source.sourceAuthenticityVerified!==true)
  blockers.push("question_transcription");
 if(source.answerKeyStatus!=="verified")blockers.push("key_adjudication");
 if(source.paper===2&&source.markingSchemeStatus!=="verified")blockers.push("marking_scheme");
 if(source.simulatorReady!==true)blockers.push("simulator");
 if(source.assessmentQAComplete!==true)blockers.push("academic_qa");
 if(source.secureAssessmentCalibrated!==true)blockers.push("server_calibration");
 if(!authoredAuditValid)blockers.push("source_audit");
 const eligible=isPobHistoricalPaperFullyVerified(source)&&blockers.length===0;
 if(eligible!== (blockers.length===0))
  blockers.push("source_mismatch");
 return Object.freeze({
  id:source.id,paper:source.paper,year:source.year,sitting:source.sitting,
  sourceSha256:source.sourceSha256,
  status:eligible?"eligible_for_live_scoring":"blocked",
  eligible,
  blockerCodes:Object.freeze([...new Set(blockers)]),
  // Read-only academic readiness, not a user-editable release switch.
  liveScoringApproved:eligible
 });
}

export function auditPobHistoricalLiveScoringReadiness(){
 const authored=auditPobCompleteHistoricalAuthoring();
 const [firstBatch]=POB_HISTORICAL_SCORING_BATCHES;
 const rows=POB_SUPPLIED_ARCHIVE.map(source=>inspectCanonicalSource(source,firstBatch,authored.valid));
 const eligible=rows.filter(r=>r.eligible),blocked=rows.filter(r=>!r.eligible);
 const actualReleased=pobReleasedHistoricalPapers();
 const issues=[];
 if(rows.length!==46||new Set(rows.map(x=>x.id)).size!==46)
  issues.push("Missing or repeated source IDs in release readiness report.");
 if(eligible.length!==actualReleased.length||
    actualReleased.some(x=>!eligible.some(r=>r.id===x.id)))
  issues.push("Readiness must agree with authoritative release manifest.");
 if(!authored.valid)issues.push("Existing historic authoring coverage audit is failing.");
 return Object.freeze({
  valid:issues.length===0,
  issues:Object.freeze(issues),
  allHistoricalPdfSources:rows.length,
  paper1:rows.filter(x=>x.paper===1).length,
  paper2:rows.filter(x=>x.paper===2).length,
  sourceLinkedAuthoredBanks:authored.sourceCount,
  releasedCount:actualReleased.length,
  eligibleCount:eligible.length,blockedCount:blocked.length,
  criticalIncompleteSourceIds:Object.freeze(rows.filter(r=>
    r.blockerCodes.includes("original_incomplete")||
    r.blockerCodes.includes("derivative_source")).map(r=>r.id)),
  rows:Object.freeze(rows)
 });
}

// This lookup never accepts or merges caller-provided paper metadata.
// A learner's attempt cannot vouch for its own rubric, SHA or calibration.
export function getPobHistoricalLiveScoringStatus(paperId){
 if(typeof paperId!=="string"||paperId.length>64)return null;
 return auditPobHistoricalLiveScoringReadiness().rows.find(r=>r.id===paperId)||null;
}
