// FNH Paper 02 transparent marking assistance.
// Award decisions require evidence in the student's written response.
// Illustrative points include alternatives; do not award more than part.marks.
export function fnhPartMarkingScheme(part){
  const limit=Math.max(0,Number(part?.marks)||0);
  const task=getFnhHistoricalStructuredTask(part);
  const points=(part?.modelPoints||[]).map((text,index)=>({
    id:String(index),text,maximum:1,
  }));
  return {
    maximum:limit,
    points,
    rule:task==="community"
      ?"Award up to 4 marks for TWO different community-nutrition roles. Each earns 1 mark for identification and 1 more for a relevant explanation."
      :task==="dehydration"
      ?"Award 1 mark for removal of water from food and 1 mark for explaining how reduced moisture limits spoilage organisms."
      :points.length>limit
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
import {gradeFnhHistoricalStructuredPart,getFnhHistoricalStructuredTask} from "./fnhHistoricalStructuredCriteria";
export {FNH_P2_RUBRIC_CALIBRATION_VERSION};

/**
 * Marks each model point is worth, read from the scheme's own allocation
 * ("Award 2 marks for each correctly linked threat and response", "two
 * benefits each paired with correct explanations" for 4 marks). Default 1.
 */
export function fnhPointValue(part){
  const text=String(part?.explanation||"").toLowerCase();
  const words={one:1,two:2,three:3,four:4};
  const each=text.match(/\b(\d|one|two|three)\s+marks?\s+(?:for\s+)?(?:each|per)\b/);
  if(each)return Number(words[each[1]]??each[1]);
  const paired=text.match(/\b(two|three|\d)\s+[a-z-]+\s+each\s+paired\b/);
  const marks=Number(part?.marks)||0;
  if(paired){const n=Number(words[paired[1]]??paired[1]);if(n>0&&marks%n===0)return marks/n;}
  return 1;
}

/**
 * "Award distinct accurate food–nutrient pairs": the model points are
 * "Nutrient: food, food or food" lists and each distinct nutrient + food pair
 * the candidate states earns one mark (two foods for iron are two pairs).
 * Returns null for any other kind of part.
 */
export function fnhDistinctPairs(part,response){
  const maxMarks=Math.max(0,Number(part?.marks)||0);
  const points=(part?.modelPoints||[]);
  if(!/\bpairs?\b/i.test(String(part?.explanation||"")+" "+points.join(" ")))return null;
  const lists=points.map(p=>String(p).match(/^([^:;]{2,40}):\s*(.+?)\.?$/)).filter(Boolean)
    .map(m=>({nutrient:m[1].trim(),foods:m[2].split(/,\s*|\s+or\s+/).map(x=>x.trim()).filter(Boolean)}));
  if(lists.length<2)return null;
  const blank=!String(response??"").trim();
  const statements=String(response??"").split(/[;\n]+|(?<!\d)\.\s+(?!\d)/).map(s=>s.trim().toLowerCase()).filter(Boolean);
  const has=(statement,phrase)=>String(phrase).toLowerCase().split(/\s+/).every(w=>new RegExp(`\\b${w.replace(/[^a-z0-9-]/g,"")}`).test(statement));
  const found=new Set();
  for(const s of statements)for(const {nutrient,foods} of lists){
    if(!has(s,nutrient))continue;
    // A statement naming two nutrients cannot show which food goes with which.
    if(lists.filter(l=>has(s,l.nutrient)).length>1)continue;
    for(const food of foods)if(has(s,food))found.add(nutrient+"|"+food.toLowerCase());
  }
  const confirmed=Math.min(maxMarks,found.size);
  return {maxMarks,confirmedMarks:confirmed,unresolvedMarks:blank?0:maxMarks-confirmed,
    assessedMarks:confirmed,status:blank?"unanswered":"criterion-verified",
    rubricVersion:FNH_P2_RUBRIC_CALIBRATION_VERSION,
    criteria:[...found].map((pair,i)=>({id:String(i),rule:pair.replace("|",": "),confirmed:true,marks:1,evidence:pair}))};
}

// Legacy self-check helpers above are preserved for historic stored attempts
// and tests, but they do not participate in live exam scoring.
export function gradeFnhWrittenPart(part,response){
  const maxMarks=Math.max(0,Number(part?.marks)||0);
  const structured=gradeFnhHistoricalStructuredPart(part,response);
  if(structured)return structured;
  const original=String(response??"");
  const pairs=fnhDistinctPairs(part,original);
  if(pairs)return pairs;
  const accepted=[];
  const value=fnhPointValue(part);
  let confirmed=0;
  const criteria=(part?.modelPoints||[]).map((modelPoint,index)=>{
    const match=matchFnhCriterionEvidence(modelPoint,original,{usedEvidence:accepted});
    const earned=confirmed<maxMarks && match.confirmed;
    const marks=earned?Math.min(value,maxMarks-confirmed):0;
    if(earned){
      accepted.push({index:match.sourceIndex,signature:match.evidenceKey,terms:match.terms});
      confirmed+=marks;
    }
    return {id:String(index),rule:String(modelPoint||""),confirmed:earned,
      marks,evidence:earned?match.evidence:"",
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
