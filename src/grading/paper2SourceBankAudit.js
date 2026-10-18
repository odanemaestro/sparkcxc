/**
 * Read-only source-bank audit, deliberately separate from student scoring.
 * A model answer or a passing UI test does NOT establish examiner equivalence.
 */
export const SOURCE_BANK_AUDIT_VERSION="1.0.0";

const valid=value=>Number.isFinite(value)&&value>=0;
const flattenQuestion=q=>(q?.items||q?.parts||[]).flatMap(part=>
  Array.isArray(part.items)?part.items:[part]
);
function authoredEvidence(item){
  const source=item?.markScheme;
  if(Array.isArray(item?.modelPoints))return item.modelPoints.filter(Boolean).length;
  if(Array.isArray(item?.criteria))return item.criteria.filter(Boolean).length;
  if(Array.isArray(source?.points))return source.points.filter(Boolean).length;
  if(Array.isArray(source))return source.filter(Boolean).length;
  return item?.marking?1:0;
}
export function auditPaper2SourceBank({subjectId,paperId,questions=[],expectedPaperMarks=null}={}){
  const critical=[],warnings=[],byQuestion=[];
  const questionIds=new Set();
  if(!subjectId||!paperId||!Array.isArray(questions)||!questions.length)
    critical.push("missing-source-bank-identity");
  (Array.isArray(questions)?questions:[]).forEach((q,qi)=>{
    const questionId=String(q?.id??q?.question_id??q?.number??q?.question_number??"");
    const key=questionId||"index:"+qi;
    if(questionIds.has(key))critical.push("duplicate-question-id:"+key);
    questionIds.add(key);
    const parts=flattenQuestion(q);
    if(!parts.length)critical.push("empty-question:"+key);
    const partIds=new Set();
    let questionMarks=0;
    parts.forEach((part,pi)=>{
      const label=String(part?.id??part?.label??pi);
      if(partIds.has(label))critical.push("duplicate-part-id:"+key+":"+label);
      partIds.add(label);
      const marks=Number(part?.marks);
      if(!valid(marks)||marks===0)critical.push("invalid-part-marks:"+key+":"+label);
      else questionMarks+=marks;
      const points=authoredEvidence(part);
      if(!points)warnings.push("missing-authored-evidence:"+key+":"+label);
      else if(valid(marks)&&marks>points && !part?.criteria)
        warnings.push("under-specified-subcriteria:"+key+":"+label);
    });
    const expected=q?.totalMarks??q?.marks;
    if(expected!==undefined&&(!valid(Number(expected))||
      Math.abs(questionMarks-Number(expected))>1e-6))
      critical.push("question-total-mismatch:"+key);
    byQuestion.push({id:key,parts:parts.length,marks:questionMarks});
  });
  const totalMarks=byQuestion.reduce((sum,row)=>sum+row.marks,0);
  if(expectedPaperMarks!==null&&(!valid(Number(expectedPaperMarks))||
    Math.abs(totalMarks-Number(expectedPaperMarks))>1e-6))
    critical.push("paper-total-mismatch");
  return {version:SOURCE_BANK_AUDIT_VERSION,subjectId,paperId,
    questions:byQuestion.length,parts:byQuestion.reduce((sum,row)=>sum+row.parts,0),
    totalMarks,critical,warnings,sourceStructureValid:critical.length===0,
    // Rubric completeness is deliberately independent from source structure.
    rubricReviewRequired:warnings.length>0,byQuestion};
}
