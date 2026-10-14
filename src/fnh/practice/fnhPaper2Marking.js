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
export function fnhSelfAssessmentMark(part,selected=[]){
  const scheme=fnhPartMarkingScheme(part);
  const allowed=new Set(scheme.points.map(point=>point.id));
  const unique=[...new Set((selected||[]).map(String))].filter(id=>allowed.has(id));
  return Math.min(scheme.maximum,unique.length);
}
export function fnhSelfAssessmentTotal(paper=[],selfReview={}){
  const perQuestion=(paper||[]).map(question=>{
    const parts=(question.items||[]).map(part=>{
      const key=`${question.id}:${part.id}`;
      return {key,maximum:Number(part.marks)||0,
        checked:fnhSelfAssessmentMark(part,selfReview[key]||[])};
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
