const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,Number(value)||0));
const nowIso=()=>new Date().toISOString();

function scoreFromEvent(event={}){
  if(Number.isFinite(Number(event.percent))) return clamp(Number(event.percent)/100);
  if(Number.isFinite(Number(event.score))&&Number.isFinite(Number(event.maxScore))&&Number(event.maxScore)>0){
    return clamp(Number(event.score)/Number(event.maxScore));
  }
  return null;
}

function keyPart(value,fallback="activity"){
  return String(value||fallback).trim().toLowerCase().replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80)||fallback;
}

function physicsSkill(event={}){
  const topic=event.topic||event.topicId||event.section||event.objective||"General";
  return `Physics :: ${String(topic).trim()}`;
}
function itSkill(event={}){
  const topic=event.componentTitle||event.topicTitle||event.title||event.topicId||event.topic||event.labTitle||event.lab||event.componentId||"General";
  return `Information Technology :: ${String(topic).trim()}`;
}

export function learningEvidenceFromSubjectEvent(event={}){
  const type=String(event?.type||"").trim().toLowerCase();
  const at=event.at||event.completedAt||nowIso();
  const scored=scoreFromEvent(event);

  if(type==="physics_lab_evidence"){
    const itemId=event.interactiveId||event.lab||event.labId||event.objective||"physics-lab";
    const rawScore=Number(event.score);
    const observedScore=Number.isFinite(rawScore)
      ? clamp(rawScore>1?rawScore/Math.max(1,Number(event.maxScore||rawScore)):rawScore)
      : event.correct===true?1:event.correct===false?0:event.result==="completed"?1:null;
    return {
      subjectId:"physics", skill:physicsSkill(event), source:"physics_lab_evidence",
      itemId:String(itemId), observedScore, correct:observedScore==null?null:observedScore>=0.6,
      evidenceWeight:observedScore==null?0.12:0.48, difficulty:event.difficulty||null,
      errorCode:event.errorCode||null,errorLabel:event.errorLabel||null,
      helpUsed:Boolean(event.helpUsed),studentConfidence:event.studentConfidence??null,
      evidenceKey:`physics-lab-evidence:${keyPart(itemId)}:${keyPart(event.objective||event.task||event.result||"event")}:${at}`,
      occurredAt:at,metadata:{...event,source_event:type},
    };
  }

  if(type==="physics_topic_quiz"||type==="physics_section_checkpoint"||type==="physics_paper1_exam"||type==="physics_paper2_exam"){
    const source=type;
    const itemId=event.paperId||event.topic||event.section||type;
    const weight=type.includes("paper2")?1.45:type.includes("paper1")?1.25:type.includes("checkpoint")?1.15:0.95;
    return {
      subjectId:"physics",skill:physicsSkill(event),source,itemId:String(itemId),
      observedScore:scored,correct:scored==null?null:scored>=0.6,evidenceWeight:weight,
      difficulty:event.difficulty||null,errorCode:event.errorCode||null,errorLabel:event.errorLabel||null,
      helpUsed:false,studentConfidence:event.studentConfidence??null,
      evidenceKey:`${source}:${keyPart(itemId)}:${at}`,occurredAt:at,
      metadata:{...event,source_event:type},
    };
  }

  if(type==="physics_lesson_completion"||type==="physics_completion"){
    if(event.completed===false) return null;
    const itemId=event.topic||event.key||event.section||"lesson";
    return {
      subjectId:"physics",skill:physicsSkill(event),source:"physics_lesson",
      itemId:String(itemId),observedScore:null,correct:null,evidenceWeight:0.08,
      evidenceKey:`physics-lesson:${keyPart(itemId)}`,occurredAt:at,
      metadata:{...event,exposure_only:true,source_event:type},
    };
  }

  if(type==="physics_lab_completion"){
    if(event.completed===false) return null;
    const itemId=event.lab||event.labId||"lab";
    return {
      subjectId:"physics",skill:physicsSkill(event),source:"physics_lab_completion",
      itemId:String(itemId),observedScore:null,correct:null,evidenceWeight:0.12,
      evidenceKey:`physics-lab-completion:${keyPart(itemId)}`,occurredAt:at,
      metadata:{...event,exposure_only:true,source_event:type},
    };
  }

  if(type==="it_paper1_exam"||type==="it_paper2_exam"){
    const itemId=event.paperId||event.paperTitle||type;
    return {
      subjectId:"information-technology",skill:itSkill({...event,title:event.paperTitle||"Exam readiness"}),
      source:type,itemId:String(itemId),observedScore:scored,correct:scored==null?null:scored>=0.6,
      evidenceWeight:type==="it_paper2_exam"?1.45:1.25,difficulty:null,
      evidenceKey:`${type}:${keyPart(itemId)}:${at}`,occurredAt:at,
      metadata:{...event,source_event:type},
    };
  }

  if(type==="it_lesson_completion"){
    if(event.completed===false) return null;
    const itemId=event.topicId||event.topic||"lesson";
    return {
      subjectId:"information-technology",skill:itSkill(event),source:"it_lesson",
      itemId:String(itemId),observedScore:null,correct:null,evidenceWeight:0.08,
      evidenceKey:`it-lesson:${keyPart(itemId)}`,occurredAt:at,
      metadata:{...event,exposure_only:true,source_event:type},
    };
  }

  if(type==="it_lab_skill_evidence"){
    const itemId=event.labId||event.lab||"lab";
    const taskId=event.taskId||event.skillId||"task";
    const taskLabel=String(event.taskLabel||taskId).replace(/[-_]+/g," ").replace(/\b\w/g,char=>char.toUpperCase());
    const observedScore=Number.isFinite(Number(event.score))?clamp(Number(event.score)>1?Number(event.score)/Math.max(1,Number(event.maxScore||event.score)):Number(event.score)):1;
    return {
      subjectId:"information-technology",
      skill:`Information Technology :: ${event.labTitle||itemId} :: ${taskLabel}`,
      source:"it_lab_skill_evidence",
      itemId:`${itemId}:${taskId}`,
      observedScore,
      correct:observedScore>=0.6,
      evidenceWeight:0.45,
      difficulty:event.difficulty||null,
      errorCode:event.errorCode||null,
      errorLabel:event.errorLabel||null,
      helpUsed:Boolean(event.helpUsed),
      studentConfidence:event.studentConfidence??null,
      evidenceKey:`it-lab-skill:${keyPart(itemId)}:${keyPart(taskId)}:${at}`,
      occurredAt:at,
      metadata:{...event,source_event:type},
    };
  }

  if(type==="it_lab_completion"){
    if(event.completed===false) return null;
    const itemId=event.labId||event.lab||"lab";
    return {
      subjectId:"information-technology",skill:itSkill(event),source:"it_lab_completion",
      itemId:String(itemId),observedScore:null,correct:null,evidenceWeight:0.14,
      evidenceKey:`it-lab-completion:${keyPart(itemId)}`,occurredAt:at,
      metadata:{...event,exposure_only:true,source_event:type},
    };
  }

  if(type==="it_sba_section_reviewed"){
    if(event.completed===false) return null;
    const itemId=`${event.projectId||"project"}:${event.componentId||"section"}`;
    return {
      subjectId:"information-technology",skill:itSkill(event),source:"it_sba_review",
      itemId,observedScore:null,correct:null,evidenceWeight:0.07,
      evidenceKey:`it-sba-review:${keyPart(itemId)}`,occurredAt:at,
      metadata:{...event,exposure_only:true,source_event:type},
    };
  }

  if(type==="it_flashcard_review"){
    const itemId=event.cardId||"flashcard";
    return {
      subjectId:"information-technology",skill:itSkill(event),source:"it_flashcard_review",
      itemId:String(itemId),observedScore:null,correct:null,evidenceWeight:0.06,
      evidenceKey:`it-flashcard-review:${keyPart(itemId)}`,occurredAt:at,
      metadata:{...event,exposure_only:true,source_event:type},
    };
  }

  return null;
}

export async function recordLearningEvidenceV2({supabase,evidence}={}){
  if(!supabase?.rpc||!evidence) return {data:null,error:null,skipped:true};
  try{
    const {data,error}=await supabase.rpc("spark_record_learning_evidence_v2",{
      p_subject_id:evidence.subjectId,
      p_skill:evidence.skill,
      p_source:evidence.source,
      p_item_id:evidence.itemId||null,
      p_observed_score:evidence.observedScore==null?null:Number(evidence.observedScore),
      p_correct:evidence.correct==null?null:Boolean(evidence.correct),
      p_evidence_weight:Number(evidence.evidenceWeight||0.2),
      p_difficulty:evidence.difficulty||null,
      p_student_confidence:evidence.studentConfidence==null?null:Number(evidence.studentConfidence),
      p_help_used:Boolean(evidence.helpUsed),
      p_error_code:evidence.errorCode||null,
      p_error_label:evidence.errorLabel||null,
      p_metadata:evidence.metadata||{},
      p_evidence_key:evidence.evidenceKey,
      p_occurred_at:evidence.occurredAt||nowIso(),
    });
    if(!error&&data){
      if(typeof window!=="undefined"){
        window.dispatchEvent(new CustomEvent("spark:learner-intelligence-updated",{detail:{state:data}}));
      }
      if(evidence.observedScore!=null){
        supabase.rpc("spark_apply_learning_evidence_outcome",{
          p_subject_id:evidence.subjectId,
          p_skill:evidence.skill,
        }).catch(()=>{});
      }
    }
    return {data,error};
  }catch(error){return {data:null,error};}
}

export async function recordLearningEvidenceFromSubjectEvent({supabase,event}={}){
  const evidence=learningEvidenceFromSubjectEvent(event);
  if(!evidence) return {data:null,error:null,skipped:true};
  return recordLearningEvidenceV2({supabase,evidence});
}

export async function recordMathematicsLearningEvidenceV2({
  supabase,skill,source,itemId,observedScore,correct,evidenceWeight=1,difficulty=null,
  studentConfidence=null,helpUsed=false,errorCode=null,errorLabel=null,metadata={},evidenceKey,occurredAt,
}={}){
  return recordLearningEvidenceV2({supabase,evidence:{
    subjectId:"mathematics",skill:String(skill||"CSEC Mathematics"),source:String(source||"mathematics"),
    itemId:itemId||null,observedScore:observedScore==null?null:clamp(observedScore),
    correct:correct==null?null:Boolean(correct),evidenceWeight,difficulty,studentConfidence,
    helpUsed,errorCode,errorLabel,metadata,evidenceKey:evidenceKey||`math:${keyPart(itemId||skill)}:${occurredAt||nowIso()}`,
    occurredAt:occurredAt||nowIso(),
  }});
}

export async function fetchLearningActionEffectiveness({supabase,userId}={}){
  if(!supabase?.from||!userId) return {};
  const {data,error}=await supabase.from("spark_learning_action_effectiveness")
    .select("subject_id,action_type,exposures,starts,completions,positive_outcomes,avg_delta,effectiveness_score,updated_at");
  if(error) return {};
  return (data||[]).reduce((acc,row)=>{
    const subject=row.subject_id||"all";
    acc[subject]=acc[subject]||{};
    acc[subject][row.action_type]=row;
    return acc;
  },{});
}

export async function recordLearningRecommendation({supabase,action}={}){
  if(!supabase?.rpc||!action) return {data:null,error:null,skipped:true};
  return supabase.rpc("spark_record_learning_recommendation",{
    p_subject_id:action.subjectId,
    p_skill:action.skill||null,
    p_action_type:action.type,
    p_action_key:action.actionKey,
    p_priority_score:Number(action.priorityScore||0),
    p_rationale:{reasons:action.reasons||[],explanation:action.explanation||"",effectiveness:action.effectiveness??null},
    p_baseline_mastery:Number(action.baselineMastery||0),
    p_model_version:action.modelVersion||"li-v2.0",
  });
}

export async function startLearningRecommendation({supabase,recommendationId}={}){
  if(!supabase?.rpc||!recommendationId) return {data:null,error:null,skipped:true};
  return supabase.rpc("spark_start_learning_recommendation",{p_recommendation_id:recommendationId});
}

export async function completeLearningRecommendation({supabase,recommendationId}={}){
  if(!supabase?.rpc||!recommendationId) return {data:null,error:null,skipped:true};
  return supabase.rpc("spark_complete_learning_recommendation",{p_recommendation_id:recommendationId});
}
