/**
 * Read-only audit of authored historical written marking criteria.
 * Valid question totals are not proof of complete mark-by-mark rubrics.
 * Neither a SPARK model answer nor a transcription is an official CXC key.
 */
export const HISTORICAL_RUBRIC_COMPLETENESS_VERSION="1.0.0";

const amount=value=>Number.isFinite(Number(value))&&Number(value)>=0?Number(value):null;
const partList=q=>q?.parts||q?.items||[];
const summation=xs=>xs.reduce((sum,n)=>sum+n,0);

export function auditHistoricalWrittenRubricBank({
  subjectId,paperId,questions,selectedQuestionIds=null,expectedSelectedMarks=null
}={}){
  const errors=[],gaps=[],rows=[],seen=new Set();
  if(!subjectId||!paperId||!Array.isArray(questions)||!questions.length)
    errors.push("invalid-paper-source");
  const all=Array.isArray(questions)?questions:[];
  let offeredMarks=0;
  for(const [questionIndex,q] of all.entries()){
    const id=String(q?.id??q?.number??questionIndex);
    if(seen.has(id))errors.push("duplicate-question:"+id);
    seen.add(id);
    const qMaximum=amount(q?.marks??q?.totalMarks);
    const parts=partList(q);
    if(!parts.length)errors.push("no-parts:"+id);
    const partIds=new Set();
    let allocated=0;
    for(const [index,p] of parts.entries()){
      const partId=String(p?.id??index),idPath=id+":"+partId;
      if(partIds.has(partId))errors.push("duplicate-part:"+idPath);
      partIds.add(partId);
      const max=amount(p?.marks);
      if(max===null||max===0){
        errors.push("invalid-part-marks:"+idPath);continue;
      }
      allocated+=max;
      const points=Array.isArray(p?.modelPoints)?p.modelPoints.filter(Boolean):[];
      const criteria=Array.isArray(p?.criteria)?p.criteria:[];
      const source=String(p?.modelAnswer??"").trim();
      const type=criteria.length?"criteria":points.length?"model-points":"none";
      let addressed=type==="criteria"?summation(criteria.map(c=>Number(c?.marks)||0)):
        type==="model-points"?Math.min(max,points.length):0;
      if(type==="criteria"){
        if(criteria.some(c=>amount(c.marks)===null||amount(c.marks)===0||!String(c.rule||"").trim()))
          errors.push("malformed-criterion:"+idPath);
        if(addressed!==max)gaps.push({questionId:id,partId,reason:"criteria-mark-mismatch",
          maximum:max,documented:addressed});
        if(criteria.some(c=>Number(c.marks)>1))
          gaps.push({questionId:id,partId,reason:"multi-mark-criterion-needs-subcriteria",
            maximum:max,documented:addressed});
      }else if(points.length){
        if(points.length<max)gaps.push({questionId:id,partId,
          reason:"insufficient-distinct-model-points",maximum:max,documented:addressed});
        if(points.some(point=>/^\s*(?:award|accept|give|up to|any\s+\d+)/i.test(point)))
          gaps.push({questionId:id,partId,reason:"model-includes-instructions",
            maximum:max,documented:addressed});
      }else{
        gaps.push({questionId:id,partId,reason:"missing-criterion-evidence",
          maximum:max,documented:0});
      }
      if(type==="criteria"&&!source)gaps.push({questionId:id,partId,
        reason:"no-model-answer",maximum:max,documented:addressed});
      rows.push({questionId:id,partId,maximum:max,documented:addressed,
        rubricType:type,sourceModelAvailable:Boolean(source||points.length)});
    }
    if(qMaximum===null||qMaximum!==allocated)
      errors.push("question-mark-mismatch:"+id);
    offeredMarks+=allocated;
  }
  let selectedMarks=null;
  if(selectedQuestionIds!==null){
    if(!Array.isArray(selectedQuestionIds)||
      new Set(selectedQuestionIds.map(String)).size!==selectedQuestionIds.length||
      selectedQuestionIds.some(id=>!seen.has(String(id))))
      errors.push("invalid-question-selection");
    else selectedMarks=summation(all.filter(q=>
      selectedQuestionIds.map(String).includes(String(q.id??q.number)))
      .map(q=>summation(partList(q).map(part=>Number(part.marks)||0))));
  }
  if(expectedSelectedMarks!==null&&
    (selectedMarks===null||selectedMarks!==Number(expectedSelectedMarks)))
    errors.push("selected-total-mismatch");
  return {
    version:HISTORICAL_RUBRIC_COMPLETENESS_VERSION,subjectId,paperId,
    questionCount:all.length,partCount:rows.length,offeredMarks,
    selectedMarks,errors,gaps,rows,
    markStructureValid:errors.length===0,
    criteriaComplete:errors.length===0&&gaps.length===0,
    needsReview:errors.length>0||gaps.length>0,
    note:"Structural and rubric-scope audit only; it cannot certify examiner equivalence."
  };
}
