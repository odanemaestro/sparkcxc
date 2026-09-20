const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,Number(value)||0));

export const LEARNING_ACTIONS=Object.freeze({
  baseline:{type:"baseline",label:"Build a baseline",cta:"Start a short check",route:"practice"},
  lesson:{type:"lesson",label:"Review the lesson",cta:"Open study",route:"study"},
  targeted_practice:{type:"targeted_practice",label:"Do targeted practice",cta:"Start practice",route:"practice"},
  flashcards:{type:"flashcards",label:"Use spaced flashcards",cta:"Review flashcards",route:"flashcards"},
  lab:{type:"lab",label:"Use an interactive lab",cta:"Open labs",route:"study"},
  checkpoint:{type:"checkpoint",label:"Take a section checkpoint",cta:"Start checkpoint",route:"practice"},
  exam_question:{type:"exam_question",label:"Try exam-style questions",cta:"Open practice",route:"practice"},
  sba_guide:{type:"sba_guide",label:"Review the SBA guide",cta:"Open SBA Centre",route:"practice"},
});

function subjectCapabilities(subjectId="mathematics"){
  if(subjectId==="physics") return ["lesson","targeted_practice","flashcards","lab","checkpoint","exam_question"];
  if(subjectId==="information-technology") return ["lesson","targeted_practice","flashcards","lab","checkpoint","exam_question","sba_guide"];
  return ["lesson","targeted_practice","flashcards","checkpoint","exam_question"];
}

function effectivenessFor(actionType, actionEffectiveness={}){
  const raw=actionEffectiveness?.[actionType]?.effectiveness_score
    ?? actionEffectiveness?.[actionType]
    ?? 0.5;
  const value=Number(raw);
  return Number.isFinite(value)?clamp(value):0.5;
}

function candidateScore(type,focus,effectiveness){
  const mastery=clamp((focus?.effectiveMastery ?? focus?.mastery ?? 50)/100);
  const retentionRisk=clamp(focus?.retentionRisk ?? 0);
  const confidence=clamp((focus?.modelConfidence ?? focus?.confidence ?? 0)/100);
  const prereq=clamp(focus?.prerequisiteRisk ?? 0);
  const misconception=focus?.commonError?1:0;
  let fit=0;
  if(type==="lesson") fit=(1-mastery)*0.55 + prereq*0.45;
  if(type==="targeted_practice") fit=(1-mastery)*0.42 + misconception*0.36 + confidence*0.12 + prereq*0.10;
  if(type==="flashcards") fit=retentionRisk*0.65 + mastery*0.20 + confidence*0.15;
  if(type==="lab") fit=(1-mastery)*0.35 + misconception*0.20 + confidence*0.20 + prereq*0.10 + 0.15;
  if(type==="checkpoint") fit=mastery*0.42 + confidence*0.35 + (1-retentionRisk)*0.23;
  if(type==="exam_question") fit=mastery*0.45 + confidence*0.30 + (1-retentionRisk)*0.25;
  if(type==="sba_guide") fit=(1-mastery)*0.30 + prereq*0.25 + confidence*0.10 + 0.20;
  if(type==="baseline") fit=(1-confidence)*0.70 + (focus?.evidenceCount<3?0.30:0);
  return fit*0.82 + effectiveness*0.18;
}

function why(focus,type){
  const reasons=[];
  if((focus?.evidenceCount||0)<3) reasons.push("SPARK needs more evidence before it can be highly confident about this skill.");
  if((focus?.effectiveMastery??focus?.mastery??100)<60) reasons.push(`Recent evidence places this skill at about ${Math.round(focus?.effectiveMastery??focus?.mastery??0)}% effective mastery.`);
  if((focus?.retentionRisk||0)>=0.35) reasons.push("The skill has a meaningful forgetting risk because it has not been demonstrated recently.");
  if(focus?.commonError) reasons.push(`The recurring error pattern is: ${focus.commonError.label}.`);
  if((focus?.prerequisiteRisk||0)>=0.2 && focus?.prerequisiteWeaknesses?.length){
    reasons.push(`A prerequisite may be holding this back: ${focus.prerequisiteWeaknesses.slice(0,2).map(item=>item.term).join(", ")}.`);
  }
  if(focus?.confidenceBias==="overconfident") reasons.push("Your self-confidence is currently running ahead of demonstrated performance.");
  if(focus?.confidenceBias==="underconfident") reasons.push("Your demonstrated performance is stronger than your self-ratings suggest.");
  if(!reasons.length){
    if(type==="exam_question") reasons.push("The skill is stable enough for harder exam-style evidence.");
    else reasons.push("This is the highest-value next step from the evidence SPARK currently has.");
  }
  return reasons;
}

function preferredTypes(focus,subjectId){
  if(!focus) return ["baseline"];
  if((focus.evidenceCount||0)<2 || (focus.modelConfidence??focus.confidence??0)<25) return ["baseline","lesson","targeted_practice"];
  if((focus.prerequisiteRisk||0)>=0.3) return ["lesson","targeted_practice"];
  if(focus.commonError) return subjectId==="physics"
    ? ["targeted_practice","lab","lesson"]
    : ["targeted_practice","lesson","flashcards"];
  if((focus.retentionRisk||0)>=0.42 && (focus.mastery||0)>=65) return ["flashcards","exam_question","checkpoint"];
  if((focus.effectiveMastery??focus.mastery??0)<45) return subjectId==="information-technology"
    ? ["lesson","lab","targeted_practice","sba_guide"]
    : subjectId==="physics"
      ? ["lesson","lab","targeted_practice"]
      : ["lesson","targeted_practice","flashcards"];
  if((focus.effectiveMastery??focus.mastery??0)<72) return subjectId==="physics"
    ? ["targeted_practice","lab","checkpoint"]
    : ["targeted_practice","flashcards","checkpoint"];
  return ["exam_question","checkpoint","flashcards"];
}

export function buildNextBestAction({
  profile,
  subjectId="mathematics",
  actionEffectiveness={},
}={}){
  const subject=profile?.subjects?.[subjectId];
  const focus=subject?.focus || profile?.focus || null;
  const allowed=new Set(subjectCapabilities(subjectId));
  const preferred=preferredTypes(focus,subjectId).filter(type=>type==="baseline"||allowed.has(type));
  const candidates=(preferred.length?preferred:["baseline"]).map(type=>{
    const meta=LEARNING_ACTIONS[type]||LEARNING_ACTIONS.baseline;
    const effectiveness=effectivenessFor(type,actionEffectiveness);
    return {
      ...meta,
      subjectId,
      skill:focus?.rawSkill||focus?.skill||null,
      displaySkill:focus?.skill||null,
      score:candidateScore(type,focus,effectiveness),
      effectiveness,
    };
  }).sort((a,b)=>b.score-a.score);
  const selected=candidates[0];
  const reasons=why(focus,selected.type);
  const explanation=reasons.join(" ");
  const featureVector = {
    mastery_gap: clamp(1 - Number(focus?.effectiveMastery ?? focus?.mastery ?? 50) / 100),
    confidence_gap: clamp(1 - Number(focus?.modelConfidence ?? focus?.confidence ?? 0) / 100),
    retention_risk: clamp(focus?.retentionRisk ?? 0),
    trend_risk: clamp(Math.max(0, -(Number(focus?.trendScore) || 0))),
    prerequisite_risk: clamp(focus?.prerequisiteRisk ?? 0),
    misconception_signal: focus?.commonError ? 1 : 0,
  };
  return {
    ...selected,
    featureVector,
    actionKey:`${subjectId}:${selected.type}:${String(focus?.rawSkill||focus?.skill||"baseline").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`,
    title:focus?.skill? `${selected.label}: ${focus.skill}` : selected.label,
    reasons,
    explanation,
    priorityScore:Math.round((focus?.priorityScore??50)),
    baselineMastery:Number(focus?.effectiveMastery??focus?.mastery??0),
    modelVersion:profile?.modelVersion||"li-v2.0",
  };
}

export function buildCrossSubjectNextBestAction({profile,actionEffectivenessBySubject={}}={}){
  if(!profile?.subjects) return buildNextBestAction({profile});
  const candidates=Object.keys(profile.subjects)
    .map(subjectId=>buildNextBestAction({
      profile,
      subjectId,
      actionEffectiveness:actionEffectivenessBySubject?.[subjectId]||{},
    }))
    .filter(Boolean)
    .sort((a,b)=>b.priorityScore-a.priorityScore || b.score-a.score);
  return candidates[0]||buildNextBestAction({profile});
}
