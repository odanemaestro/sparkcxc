// FNH Paper 02 transparent marking assistance.
// Award decisions require evidence in the student's written response.
// Illustrative points include alternatives; do not award more than part.marks.
export function fnhPartMarkingScheme(part){
  const limit=Math.max(0,Number(part?.marks)||0);
  const points=(part?.modelPoints||[]).map((text,index)=>({
    id:String(index),text,maximum:1,
  }));
  return {
    maximum:limit,
    points,
    rule:points.length>limit
      ?`Award up to ${limit} marks for distinct valid points. The examples are alternatives, not extra compulsory points.`
      :`Award up to ${limit} marks. Each distinct correct marking point earns one mark.`,
    note:"Award marks only when the response demonstrates the point clearly. Equivalent scientifically accurate or context-appropriate answers also receive credit. Do not award duplicate points twice.",
  };
}
export function fnhSelfAssessmentMark(part,selected=[],responseText=null){
  if(responseText!=null&&!String(responseText).trim())return 0;
  const scheme=fnhPartMarkingScheme(part);
  const allowed=new Set(scheme.points.map(point=>point.id));
  const unique=[...new Set((selected||[]).map(String))].filter(id=>allowed.has(id));
  return Math.min(scheme.maximum,unique.length);
}
export function fnhSelfAssessmentTotal(paper=[],selfReview={},answers=null){
  const perQuestion=(paper||[]).map(question=>{
    const parts=(question.items||[]).map(part=>{
      const key=`${question.id}:${part.id}`;
      return {key,maximum:Number(part.marks)||0,
        checked:fnhSelfAssessmentMark(part,selfReview[key]||[],answers?.[key]??(answers? "":null))};
    });
    return {id:question.id,maximum:parts.reduce((a,b)=>a+b.maximum,0),
      checked:parts.reduce((a,b)=>a+b.checked,0),parts};
  });
  return {maximum:perQuestion.reduce((a,b)=>a+b.maximum,0),
    checked:perQuestion.reduce((a,b)=>a+b.checked,0),
    questions:perQuestion,
    reviewedParts:perQuestion.flatMap(x=>x.parts).filter(x=>Array.isArray(selfReview[x.key])&&selfReview[x.key].length>0).length,
    totalParts:perQuestion.reduce((a,b)=>a+b.parts.length,0)};
}


import {matchFnhCriterionEvidence,FNH_P2_RUBRIC_CALIBRATION_VERSION} from "./fnhPaper2RubricCalibration";
export {FNH_P2_RUBRIC_CALIBRATION_VERSION};

// Legacy self-check helpers above are preserved for historic stored attempts
// and tests, but they do not participate in live exam scoring.
export function gradeFnhWrittenPart(part,response){
  const maxMarks=Math.max(0,Number(part?.marks)||0);
  const original=String(response??"");
  const accepted=[];
  let confirmed=0;
  const criteria=(part?.modelPoints||[]).map((modelPoint,index)=>{
    const match=matchFnhCriterionEvidence(modelPoint,original,{usedEvidence:accepted});
    const earned=confirmed<maxMarks && match.confirmed;
    if(earned){
      accepted.push({index:match.sourceIndex,signature:match.evidenceKey,terms:match.terms});
      confirmed+=1;
    }
    return {id:String(index),rule:String(modelPoint||""),confirmed:earned,
      marks:earned?1:0,evidence:earned?match.evidence:"",
      reviewRequired:!earned,reason:match.reason||null};
  });
  const blank=!original.trim();
  const unresolvedMarks=blank?0:Math.max(0,maxMarks-confirmed);
  return {maxMarks,confirmedMarks:confirmed,unresolvedMarks,
    assessedMarks:blank||unresolvedMarks===0?confirmed:null,
    status:blank?"unanswered":unresolvedMarks?"requires-rubric-assessment":"criterion-verified",
    rubricVersion:FNH_P2_RUBRIC_CALIBRATION_VERSION,criteria};
}
export function gradeFnhWrittenPaper(paper=[],answers={}){
  const questions=(paper||[]).map(question=>{
    const parts=(question.items||[]).map(part=>{
      const key=`${question.id}:${part.id}`;
      return {key,...gradeFnhWrittenPart(part,answers?.[key]||"")};
    });
    return {id:question.id,parts,
      maxMarks:parts.reduce((n,p)=>n+p.maxMarks,0),
      confirmedMarks:parts.reduce((n,p)=>n+p.confirmedMarks,0),
      unresolvedMarks:parts.reduce((n,p)=>n+p.unresolvedMarks,0)};
  });
  const maxMarks=questions.reduce((n,q)=>n+q.maxMarks,0);
  const confirmedMarks=questions.reduce((n,q)=>n+q.confirmedMarks,0);
  const unresolvedMarks=questions.reduce((n,q)=>n+q.unresolvedMarks,0);
  const fullyAssessed=unresolvedMarks===0;
  return {questions,maxMarks,confirmedMarks,unresolvedMarks,fullyAssessed,
    rubricVersion:FNH_P2_RUBRIC_CALIBRATION_VERSION,
    assessedMarks:fullyAssessed?confirmedMarks:null,
    reviewedParts:questions.flatMap(q=>q.parts).filter(p=>p.status==="criterion-verified").length,
    unresolvedParts:questions.flatMap(q=>q.parts).filter(p=>p.assessedMarks===null).length};
}
