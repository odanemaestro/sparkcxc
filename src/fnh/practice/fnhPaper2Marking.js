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


// Candidate-selected checkboxes are legacy review data, NOT grading evidence.
// The non-AI marker only confirms points supported by written candidate text.
// Anything not established remains unresolved; it is never assumed incorrect.
const FNH_NOISE=new Set("the a an and of to in on for with is are was were be being that this these those their it its from by at into or as can may should such one two three four marks mark award give point points example examples accepted also any".split(" "));
const fnhWords=value=>String(value??"").toLowerCase().replace(/[’‘]/g,"'")
  .match(/[a-z]+|\d+(?:\.\d+)?/g)||[];
const fnhKeyTerms=value=>[...new Set(fnhWords(value).filter(w=>w.length>=3&&!FNH_NOISE.has(w)))];
const fnhNegated=value=>/\b(?:not|never|no|cannot|can't|doesn't|don't|isn't|without)\b/i.test(String(value||""));
const fnhStatements=value=>String(value??"").split(/[;\n]+|(?<!\d)\.\s+(?!\d)/)
  .map(s=>s.trim()).filter(Boolean);
function fnhVerifiablePoint(text){
  const raw=String(text||"");
  return !/^\s*(?:award|give|accept|credit|any\s+(?:two|three|four)|up\s+to)\b/i.test(raw)
    && fnhKeyTerms(raw).length>=4;
}
export function gradeFnhWrittenPart(part,response){
  const maxMarks=Math.max(0,Number(part?.marks)||0);
  const original=String(response??"");
  const statements=fnhStatements(original);
  const used=new Set();
  let confirmed=0;
  const criteria=(part?.modelPoints||[]).map((modelPoint,index)=>{
    const text=String(modelPoint||"");
    const reference=fnhKeyTerms(text);
    let evidence="";
    if(confirmed<maxMarks&&fnhVerifiablePoint(text)){
      for(let i=0;i<statements.length;i++){
        if(used.has(i)||fnhNegated(text)!==fnhNegated(statements[i]))continue;
        const candidate=new Set(fnhKeyTerms(statements[i]));
        const hits=reference.filter(term=>candidate.has(term)).length;
        const threshold=Math.max(4,Math.ceil(reference.length*.85));
        const sourceNumbers=(text.match(/\b\d+(?:\.\d+)?\b/g)||[]);
        const responseNumbers=(statements[i].match(/\b\d+(?:\.\d+)?\b/g)||[]);
        const numbersMatch=sourceNumbers.every(n=>responseNumbers.includes(n));
        // Conflicting assertions about the same point need adjudication.
        const contradicted=statements.some(other=>
          fnhNegated(other)!==fnhNegated(text)&&
          reference.filter(term=>new Set(fnhKeyTerms(other)).has(term)).length>=threshold);
        if(hits>=threshold&&numbersMatch&&!contradicted){
          evidence=statements[i];used.add(i);confirmed+=1;break;
        }
      }
    }
    return {id:String(index),rule:text,confirmed:Boolean(evidence),marks:evidence?1:0,
      evidence,reviewRequired:!evidence};
  });
  const blank=!original.trim();
  const unresolvedMarks=blank?0:Math.max(0,maxMarks-confirmed);
  return {maxMarks,confirmedMarks:confirmed,unresolvedMarks,
    assessedMarks:blank||unresolvedMarks===0?confirmed:null,
    status:blank?"unanswered":unresolvedMarks?"requires-rubric-assessment":"criterion-verified",
    criteria};
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
    assessedMarks:fullyAssessed?confirmedMarks:null,
    reviewedParts:questions.flatMap(q=>q.parts).filter(p=>p.status==="criterion-verified").length,
    unresolvedParts:questions.flatMap(q=>q.parts).filter(p=>p.assessedMarks===null).length};
}
