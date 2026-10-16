// Repeatable release-readiness audit for the POB feature branch.
// Structural checks are necessary, not sufficient: this never certifies academic
// accuracy, historical transcription, browser QA or reliable extended-answer marks.
import {POB_OBJECTIVES,POB_TOPICS,POB_FLASHCARDS,POB_SECTIONS} from "./pobCourse";
import {POB_OBJECTIVE_DEEP_DIVES} from "./pobObjectiveDeepDives";
import {POB_PAPER1_ORIGINAL_ITEMS,validatePobPaper1Items,buildPobPaper1} from "./pobPaper1Original";
import {POB_PAPER2_ORIGINAL_01,validatePobPaper2} from "./pobPaper2Original";
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {POB_HISTORICAL_P2_BATCH01,POB_HISTORICAL_P2_BATCH01_SUMMARY} from "./pobHistoricalP2Batch01";
import {verifyPobSpecimenCheckpoint,POB_CXC_2019_SPECIMEN_P1_CHECKPOINT} from "./pobCxcSpecimenP1Checkpoint";
import {verifyPobSpecimenCheckpoint11to20,POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20} from "./pobCxcSpecimenP1Checkpoint11to20";
import {verifyPobSpecimenCheckpoint21to30,POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30} from "./pobCxcSpecimenP1Checkpoint21to30";
import {reviewPobPaper2} from "./pobRubricReview";

export function auditPobRelease({
 objectives=POB_OBJECTIVES,topics=POB_TOPICS,flashcards=POB_FLASHCARDS,
 sections=POB_SECTIONS,deepDives=POB_OBJECTIVE_DEEP_DIVES,
 paper1Items=POB_PAPER1_ORIGINAL_ITEMS,paper2=POB_PAPER2_ORIGINAL_01,
 historical=POB_SUPPLIED_ARCHIVE,subject={enabled:false,status:"draft"}
}={}){
 const issues=[];
 const requireCheck=(ok,message)=>{if(!ok)issues.push(message)};
 const objectiveCodes=objectives.map(o=>o.code);
 const objectiveSet=new Set(objectiveCodes);
 const lessonCodes=topics.flatMap(t=>t.metadata?.syllabus?.objectiveCodes||[]);
 const cardTopics=new Set(topics.map(t=>t.id));
 requireCheck(sections.length===10,"Expected 10 syllabus sections.");
 requireCheck(objectives.length===119&&objectiveSet.size===119,"119 distinct objectives required.");
 requireCheck(topics.length===42,"Expected 42 course lessons.");
 requireCheck(lessonCodes.length===119&&new Set(lessonCodes).size===119&&
   lessonCodes.every(code=>objectiveSet.has(code)),"Lesson mapping does not cover each syllabus objective exactly once.");
 requireCheck(flashcards.length===119&&flashcards.every(card=>cardTopics.has(card.topicId)),
   "Each of 119 flashcards must be attached to a real lesson.");
 const deepDiveKeys=Object.keys(deepDives);
 requireCheck(deepDiveKeys.length===119&&deepDiveKeys.every(code=>objectiveSet.has(code))&&
   objectiveCodes.every(code=>{
     const row=deepDives[code];
     return row&&String(row.walkthrough||"").length>80&&
       String(row.mistake||"").length>40&&String(row.activity||"").length>50;
   }),"Each objective must have meaningful walkthrough, misconception and activity.");
 const p1=validatePobPaper1Items(paper1Items);
 requireCheck(p1.valid,"Paper 1 item bank failed validation: "+p1.issues.join(" "));
 requireCheck(paper1Items.every(q=>objectiveSet.has(q.objectiveCode)),
   "Paper 1 contains a non-existent syllabus objective.");
 if(p1.valid){
   const selected=buildPobPaper1({items:paper1Items});
   requireCheck(selected.questions.length===60,"Paper 1 must contain exactly 60 selected items.");
 }
 const rubricReview=reviewPobPaper2({},paper2);
 requireCheck(rubricReview.totalParts===25&&rubricReview.availableMarks===100,
   "Paper 2 must account for 25 assessed parts and 100 available rubric marks.");
 const p2=validatePobPaper2(paper2);
 requireCheck(p2.valid,"Paper 2 rubrics failed validation: "+p2.issues.join(" "));
 requireCheck(paper2.origin==="spark-original"&&
   paper2.questions.every(q=>q.origin==="spark-original"),
   "The original Paper 2 must be clearly labelled SPARK-authored.");
 requireCheck(POB_HISTORICAL_P2_BATCH01_SUMMARY.paperCount===10&&
   POB_HISTORICAL_P2_BATCH01_SUMMARY.questionBodies===60&&
   POB_HISTORICAL_P2_BATCH01.every(p=>
     historical.some(h=>h.id===p.id&&h.filename===p.filename&&h.pages===p.sourcePages)&&
     !p.simulatorReady&&!p.answerKeyVerified&&!p.markingSchemeVerified),
   "The ten historical Paper 2 drafts must preserve source inventory and remain unreleased.");
 requireCheck(verifyPobSpecimenCheckpoint().valid,
   "Source-key-verified first CXC specimen checkpoint (Q1–10) must remain intact.");
 requireCheck(verifyPobSpecimenCheckpoint11to20().valid,
   "Second CXC specimen checkpoint (Q11–20) and source/answer proof required.");
 requireCheck(verifyPobSpecimenCheckpoint21to30().valid&&
   new Set([...POB_CXC_2019_SPECIMEN_P1_CHECKPOINT.questions,
     ...POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20.questions,
     ...POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30.questions].map(q=>q.id)).size===30,
   "Third CXC specimen checkpoint (Q21–30) and 30 non-overlapping source-verified questions required.");
 requireCheck(historical.some(p=>p.id==="POB-P2-2019-MJ-ALT"&&p.paper===2&&p.reclassifiedFromPaper1)&&
   !historical.some(p=>p.id==="POB-P1-2019-MJ"),
   "The mislabeled May/June 2019 source must be classified under Paper 02.");
 requireCheck(historical.every(p=>!p.simulatorReady&&p.answerKeyStatus==="not-verified"),
   "Unverified historical papers must not be released as simulator-ready.");
 requireCheck(subject.enabled===false&&subject.status==="draft",
   "POB must remain disabled and draft pending formal release approval.");
 return {
   passedStructuralChecks:issues.length===0,
   issues,
   coverage:{objectives:objectiveSet.size,lessons:topics.length,
     detailedObjectives:objectiveCodes.filter(code=>Boolean(deepDives[code])).length,
     flashcards:flashcards.length,paper1Items:paper1Items.length,
     paper2Parts:paper2.questions.flatMap(q=>q.items).length,
     unverifiedHistorical:historical.length,
     scoredSpecimenCheckpointItems:POB_CXC_2019_SPECIMEN_P1_CHECKPOINT.questions.length+
       POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20.questions.length+
       POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30.questions.length,
     historicalP2Batch01Drafts:POB_HISTORICAL_P2_BATCH01.length},
   releaseApproved:false,
   blockers:[
     "Verify authoritative syllabus wording and all lesson answers.",
     "Transcribe and independently validate historical papers and answer keys before enabling them.",
     "Implement calibrated, fair subject-aware grading of Paper 2 narratives and partial credit.",
     "Complete SBA, integrations, accessibility, responsive browsers and device QA.",
     "Obtain explicit release approval before enabling or merging."
   ]
 };
}
