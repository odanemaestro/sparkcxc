import science1 from "../../public/integrated-science/bank/is_module1.json";
import science2 from "../../public/integrated-science/bank/is_module2.json";
import science3 from "../../public/integrated-science/bank/is_module3.json";
import {englishAPaper2Sets,buildEnglishAPaper2} from "../englishA/data/englishAPaper2Bank";
import {gradeEnglishAPaper2} from "../englishA/practice/englishAPaper2Grader";
import {gradeIntegratedSciencePaper2} from "../integratedScience/practice/integratedSciencePaper2Grader";
import {POB_PAPER2_ORIGINAL_01} from "../principlesOfBusiness/data/pobPaper2Original";
import {buildPobJan2026ExaminerPack,summarizePobJan2026Marks} from "../principlesOfBusiness/data/pobJan2026ExaminerMarking";
import {POB_2026_JAN_HISTORICAL_BANK_VERSION,buildPob2026JanHistoricalPaper} from "../principlesOfBusiness/data/pobHistorical2026JanP2RealPaper";
import {gradePobListingPart} from "../principlesOfBusiness/data/pobDeterministicMarks";
import {gradePobCalculationResultPart} from "../principlesOfBusiness/data/pobDeterministicCalculationMarks";
import {buildPobArchiveExaminerPack,pobArchiveBankVersion,POB_ARCHIVE_RUBRIC_VERSION,eligiblePobArchiveScoringSources} from "./pobArchiveExaminer";
import {pobOwnerP2BankVersion,POB_OWNER_P2_RUBRIC_VERSION,POB_OWNER_P2_PILOT_IDS} from "./pobOwnerArchiveCalibration";
import {SEMANTIC_MARKING_REVISION} from "./semanticMarking";
export {requestSemanticPass,reconcileSemanticPasses,SEMANTIC_MARKING_REVISION} from "./semanticMarking";
export {summarizePobJan2026Marks} from "../principlesOfBusiness/data/pobJan2026ExaminerMarking";
export {gradePobJan2026ExaminerPaper} from "./historicalPobExaminerPipeline";
export {gradePobArchiveExaminerPaper} from "./pobArchiveExaminer";

// The runtime worker owns this authority. Never derive it from a candidate
// snapshot, submitted metadata, query parameters or browser feature flags.
export function buildTrustedAssessment(attempt,authority={}){
  if(attempt?.status!=="submitted" || attempt.paper!=="02")throw new Error("submitted_paper_required");
  const responses=attempt.response_snapshot;
  if(!responses || typeof responses!=="object" || Array.isArray(responses))throw new Error("invalid_snapshot");
  // Separate historical authority from the SPARK original bank.
  // No historical sitting is eligible unless both the trusted server queue
  // and the worker explicitly opt into this one immutable source version.
  if(attempt.subject_id==="principles-of-business" &&
     attempt.bank_version===POB_2026_JAN_HISTORICAL_BANK_VERSION){
    if(authority.historicalJan2026Enabled!==true)throw new Error("unsupported_bank_version");
    const paper=buildPob2026JanHistoricalPaper();
    if(attempt.metadata?.paper_id!==paper.id||
       attempt.metadata?.source_sha256!==paper.sourceSha256||
       attempt.score!=null||Number(attempt.max_score)!==100||
       attempt.rubric_version!=="pob-historical-2026-jan-p2-rubric-v1"||
       attempt.grader_version!==SEMANTIC_MARKING_REVISION)
      throw new Error("historical_attempt_identity_mismatch");
    const allowed=new Set(paper.questions.flatMap(q=>q.items.map(p=>q.id+":"+p.id)));
    if(Object.keys(responses).some(id=>!allowed.has(id)))
      throw new Error("unknown_historical_part");
    const pack=buildPobJan2026ExaminerPack({responses});
    if(pack.paperId!==paper.id||pack.sourceSha256!==paper.sourceSha256||
       pack.maxMarks!==100||pack.items.some(i=>!allowed.has(i.constraints.primaryResponseKey)))
      throw new Error("historical_source_not_verified");
    return {items:pack.items,responses:pack.responses,
      deterministicScore:0,maxMarks:100,unassessedMarks:0,baselineScore:0,
      historicalPaperId:paper.id,sourceSha256:paper.sourceSha256,parts:pack.parts,criterionLevel:true};
  }
  if(attempt.subject_id==="principles-of-business" &&
      (String(attempt.bank_version||"").startsWith("pob-archive-v1-") ||
       String(attempt.bank_version||"").startsWith("pob-archive-owner-v2-"))){
    if(authority.historicalPobArchiveEnabled!==true)
      throw new Error("unsupported_bank_version");
    const paperId=attempt.metadata?.paper_id;
    const ownerSource=String(attempt.bank_version||"").startsWith("pob-archive-owner-v2-");
    const record=eligiblePobArchiveScoringSources().find(p=>p.id===paperId);
    if(ownerSource&&!POB_OWNER_P2_PILOT_IDS.includes(paperId))throw new Error("owner_calibration_not_released");
    if(!record||attempt.bank_version!==(ownerSource?pobOwnerP2BankVersion(paperId):pobArchiveBankVersion(paperId))||
       attempt.metadata?.source_sha256!==record.source.sourceSha256||
       attempt.rubric_version!==(ownerSource?POB_OWNER_P2_RUBRIC_VERSION:POB_ARCHIVE_RUBRIC_VERSION)||
       attempt.grader_version!==SEMANTIC_MARKING_REVISION||
       attempt.score!=null||Number(attempt.max_score)!==100)
      throw new Error("historical_attempt_identity_mismatch");
    const pack=buildPobArchiveExaminerPack({
      paperId,selectedQuestions:attempt.metadata?.selected_questions,
      responses
    });
    return {...pack,deterministicScore:0,baselineScore:0,unassessedMarks:0};
  }
  const items=[];
  let baseline,replaceScore=0;
  if(attempt.subject_id==="integrated-science"){
    if(attempt.bank_version!=="integrated-science-v1.2.0")throw new Error("unsupported_bank_version");
    const ids=attempt.metadata?.question_ids;
    if(!Array.isArray(ids)||ids.length!==6||new Set(ids).size!==6)throw new Error("invalid_question_selection");
    const bank=[science1,science2,science3].flatMap(m=>m.paper02);
    const paper=ids.map(id=>bank.find(q=>q.id===id));
    if(paper.some(q=>!q))throw new Error("unknown_question");
    for(const module of [1,2,3]){
      const selected=paper.filter(q=>q.id.startsWith(`IS-M${module}-`));
      if(selected.length!==2 || selected.map(q=>Number(q.totalMarks)).sort((a,b)=>a-b).join(",")!=="15,20")throw new Error("invalid_module_selection");
    }
    baseline=gradeIntegratedSciencePaper2(paper,responses);
    for(const q of baseline.questions)for(const row of q.items){
      const part=q.question.parts[row.partIndex],item=part.items[row.itemIndex],id=`${q.question.id}:${row.partIndex}:${row.itemIndex}`;
      if((item.response?.type || "lines")!=="lines" || !String(responses[id] || "").trim())continue;
      items.push({id,maxMarks:row.maxMarks,responseKeys:[id],prompt:item.prompt,
        context:[q.question.context,part.context].filter(Boolean).join("\n"),rubric:item.markScheme});
      replaceScore+=row.score;
    }
  }else if(attempt.subject_id==="english-a"){
    if(attempt.bank_version!=="english-a-paper2-v1")throw new Error("unsupported_bank_version");
    const paperId=attempt.metadata?.paper_id,choice=attempt.metadata?.selected_creative_prompt || "";
    if(!englishAPaper2Sets.some(p=>p.id===paperId))throw new Error("unknown_paper");
    const paper=buildEnglishAPaper2(paperId);
    if(choice&&!paper.tasks.some(t=>t.choiceGroup&&t.id===choice))throw new Error("invalid_creative_selection");
    baseline=gradeEnglishAPaper2(paper,responses,choice);
    for(const row of baseline.rows){
      const task=row.task;
      if(task.choiceGroup && task.id!==choice)continue;
      const keys=task.kind==="summary"?[task.id,`${task.id}:analysis`]:[task.id];
      if(!keys.some(key=>String(responses[key] || "").trim()))continue;
      const words=String(responses[task.id] || "").trim().split(/\s+/).filter(Boolean).length;
      const short=(task.kind==="persuasive"&&words<150)||(task.kind==="literary"&&words<200);
      items.push({id:task.id,maxMarks:short?Math.min(10,row.maxMarks):row.maxMarks,responseKeys:keys,
        prompt:task.instructions,context:task.stimulus,rubric:task.rubric,
        constraints:{kind:task.kind,wordLimit:task.wordLimit,wordRange:task.wordRange,shortResponseCap:short?10:null}});
      replaceScore+=row.score;
    }
  }else if(attempt.subject_id==="principles-of-business"){
    if(attempt.bank_version!=="pob-original-paper2-01")throw new Error("unsupported_bank_version");
    if(attempt.metadata?.paper_id!==POB_PAPER2_ORIGINAL_01.id)throw new Error("unknown_paper");
    let determined=0;
    for(const question of POB_PAPER2_ORIGINAL_01.questions){
      for(const part of question.items){
        const id=question.id+":"+part.id;
        const value=String(responses[id]||"").trim();
        if(!value)continue;
        const listing=gradePobListingPart(id,value);
        if(listing){
          determined+=listing.marks;
          continue;
        }
        const numeric=gradePobCalculationResultPart(id,value);
        const hasVerifiedResult=numeric?.assessedCriterionMarks===1;
        if(hasVerifiedResult)determined+=1;
        // Remove the precise result criterion from semantic grading once
        // awarded deterministically. Otherwise dual-pass could double credit.
        const remaining=part.criteria.filter((_,index)=>!hasVerifiedResult||
          index!==numeric.criterionIndex);
        const semanticMax=remaining.reduce((sum,c)=>sum+c.marks,0);
        if(semanticMax>0)items.push({id,maxMarks:semanticMax,responseKeys:[id],
          prompt:part.prompt,context:question.context,
          rubric:remaining.map(c=>({marks:c.marks,rule:c.rule,alternatives:c.alternatives||[]})),
          constraints:{subject:"principles-of-business",profile:part.profile,
            deterministicResultMark:hasVerifiedResult?1:0}});
      }
    }
    baseline={score:determined,maxScore:100,unassessedMarks:0};
  }else throw new Error("unsupported_subject");
  const allowed=new Set(items.flatMap(item=>item.responseKeys));
  const semanticResponses=Object.fromEntries([...allowed].map(key=>[key,String(responses[key] || "")]));
  return {items,responses:semanticResponses,deterministicScore:Math.max(0,baseline.score-replaceScore),
    maxMarks:baseline.maxScore,unassessedMarks:baseline.unassessedMarks || 0,baselineScore:baseline.score};
}
