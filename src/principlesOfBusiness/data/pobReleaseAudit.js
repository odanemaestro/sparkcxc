// Repeatable release-readiness audit for the POB feature branch.
// Structural checks are necessary, not sufficient: this never certifies academic
// accuracy, historical transcription, browser QA or reliable extended-answer marks.
import {POB_OBJECTIVES,POB_TOPICS,POB_FLASHCARDS,POB_SECTIONS} from "./pobCourse";
import {POB_OBJECTIVE_DEEP_DIVES} from "./pobObjectiveDeepDives";
import {POB_PAPER1_ORIGINAL_ITEMS,validatePobPaper1Items,buildPobPaper1} from "./pobPaper1Original";
import {POB_PAPER2_ORIGINAL_01,validatePobPaper2} from "./pobPaper2Original";
import {POB_CXC_SPECIMEN_P2_2019,validatePobCxcSpecimenP2} from "./pobCxcSpecimenP2";
import {POB_DETERMINISTIC_LISTING_KEYS,gradePobListingPart} from "./pobDeterministicMarks";
import {POB_DETERMINISTIC_ARITHMETIC_KEYS,gradePobArithmeticPart} from "./pobArithmeticMarks";
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {POB_HISTORICAL_P2_BATCH01,POB_HISTORICAL_P2_BATCH01_SUMMARY} from "./pobHistoricalP2Batch01";
import {verifyPobSpecimenCheckpoint,POB_CXC_2019_SPECIMEN_P1_CHECKPOINT} from "./pobCxcSpecimenP1Checkpoint";
import {verifyPobSpecimenCheckpoint11to20,POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20} from "./pobCxcSpecimenP1Checkpoint11to20";
import {verifyPobSpecimenCheckpoint21to30,POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30} from "./pobCxcSpecimenP1Checkpoint21to30";
import {verifyPobSpecimenCheckpoint31to40,POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40} from "./pobCxcSpecimenP1Checkpoint31to40";
import {verifyPobSpecimenCheckpoint41to50,POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_41_50} from "./pobCxcSpecimenP1Checkpoint41to50";
import {verifyPobSpecimenCheckpoint51to60,POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_51_60} from "./pobCxcSpecimenP1Checkpoint51to60";
import {verifyPobFullSpecimen,POB_CXC_2019_SPECIMEN_P1_FULL} from "./pobCxcSpecimenP1Full";
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
 const originalDeterministicKeys=[...POB_DETERMINISTIC_LISTING_KEYS,...POB_DETERMINISTIC_ARITHMETIC_KEYS];
 const exactMarkCapacity=originalDeterministicKeys.reduce((total,key)=>{
   const rule=gradePobListingPart(key,"")||gradePobArithmeticPart(key,"");
   return total+(rule?.maxMarks||0);
 },0);
 requireCheck(new Set(originalDeterministicKeys).size===8&&exactMarkCapacity===23,
   "Original Paper 2 must preserve 23 explicitly evidenced deterministic rubric marks across 8 unique parts.");
 const officialSpecimen2=validatePobCxcSpecimenP2();
 requireCheck(officialSpecimen2.valid&&POB_CXC_SPECIMEN_P2_2019.questions.length===5&&
   POB_CXC_SPECIMEN_P2_2019.questions.flatMap(q=>q.items).length===25&&
   POB_CXC_SPECIMEN_P2_2019.questions.reduce((n,q)=>n+q.marks,0)===100,
   "Official 2019 CXC specimen Paper 2 must retain 5 questions and 100 source-scheme marks.");
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
 requireCheck(verifyPobSpecimenCheckpoint21to30().valid,
   "Third CXC specimen checkpoint (Q21–30) source/answer proof required.");
 requireCheck(verifyPobSpecimenCheckpoint31to40().valid,
   "Fourth CXC specimen checkpoint (Q31–40) with academic Q38 caution required.");
 requireCheck(verifyPobSpecimenCheckpoint41to50().valid,
   "Fifth source-key-verified CXC specimen checkpoint (Q41–50) required.");
 const specimenAll=[
   ...POB_CXC_2019_SPECIMEN_P1_CHECKPOINT.questions,
   ...POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20.questions,
   ...POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30.questions,
   ...POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40.questions,
   ...POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_41_50.questions,
   ...POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_51_60.questions
 ];
 requireCheck(verifyPobSpecimenCheckpoint51to60().valid&&
   specimenAll.length===60&&new Set(specimenAll.map(q=>q.id)).size===60&&
   specimenAll.every((q,index)=>q.number===index+1),
   "Final CXC specimen checkpoint (Q51–60) requires all 60 unique ordered verified question IDs.");
 requireCheck([38,51,53].every(number=>specimenAll[number-1].sourceKeyAcademicReview===true),
   "Published CXC source-key academic concerns at Q38, Q51 and Q53 must remain flagged.");
 requireCheck(verifyPobFullSpecimen().valid&&POB_CXC_2019_SPECIMEN_P1_FULL.questions.length===60&&
   POB_CXC_2019_SPECIMEN_P1_FULL.timeLimitMinutes===75&&
   POB_CXC_2019_SPECIMEN_P1_FULL.maxScore===60,
   "Complete 60-question 75-minute specimen exam must match CXC's source and printed key.");
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
     originalP2DeterministicMarks:exactMarkCapacity,
     cxcSpecimenPaper2Parts:POB_CXC_SPECIMEN_P2_2019.questions.flatMap(q=>q.items).length,
     cxcSpecimenPaper2Marks:POB_CXC_SPECIMEN_P2_2019.marks,
     unverifiedHistorical:historical.length,
     fullCxcSpecimenQuestions:POB_CXC_2019_SPECIMEN_P1_FULL.questions.length,
     scoredSpecimenCheckpointItems:POB_CXC_2019_SPECIMEN_P1_CHECKPOINT.questions.length+
       POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20.questions.length+
       POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30.questions.length+
       POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40.questions.length+
       POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_41_50.questions.length+
       POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_51_60.questions.length,
     historicalP2Batch01Drafts:POB_HISTORICAL_P2_BATCH01.length},
   releaseApproved:false,
   blockers:[
     "Verify authoritative syllabus wording and all lesson answers.",
     "Transcribe and independently validate historical papers and answer keys before enabling them.",
     "Calibrate and deploy the secure two-pass Paper 2 semantic marker and the new specimen bank migrations before awarding complete narrative grades.",
     "Complete SBA, integrations, accessibility, responsive browsers and device QA.",
     "Obtain explicit release approval before enabling or merging."
   ]
 };
}
