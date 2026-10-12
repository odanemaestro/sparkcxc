// Chemistry historical source release gate. Source identity alone is not enough.
// Deliberately denies learner release until independent approval of each discipline.
import {CHEMISTRY_HISTORICAL_DRAFT_ITEMS} from "./chemistryHistoricalPaper2Drafts";

const CHECKS=Object.freeze(["sourceTranscription","chemicalAnswers","markScheme","figureSvg","examInteraction"]);
export const CHEMISTRY_HISTORICAL_REVIEW_CHECKS=CHECKS;
const approved=entry=>Boolean(entry&&entry.approved===true&&
  String(entry.reviewer||"").trim()&&String(entry.reviewedAt||"").trim());
export function auditChemistryHistoricalQuestion(record){
  const missing=[];
  if(!record?.sourceId||!record.sourceFile||!Array.isArray(record.pdfPages)||!record.pdfPages.length)
    missing.push("source-identity");
  if(!record?.parts?.length)missing.push("question-parts");
  const items=(record?.parts||[]).flatMap(part=>part.items||[]);
  const total=items.reduce((sum,item)=>sum+Number(item.marks||0),0);
  if(!Number.isFinite(total)||total!==Number(record?.totalMarks||0)||!total)
    missing.push("mark-total");
  if(items.some(item=>!item.prompt||!item.markScheme?.points?.length||!item.explanation))
    missing.push("complete-answer-and-explanation");
  // A complete source transcription still cannot be published when individual
  // criteria do not account for the exact marks shown beside each answer.
  const allocationValid=item=>{
    const marks=Number(item?.marks||0);
    const points=item?.markScheme?.points||[];
    if(!Number.isInteger(marks)||marks<1||!Array.isArray(points)||!points.length)return false;
    if(points.some(point=>!String(point||"").trim()))return false;
    const weights=item?.markScheme?.pointWeights;
    if(Array.isArray(weights))return weights.length===points.length &&
      weights.every(weight=>Number.isFinite(Number(weight))&&Number(weight)>0) &&
      Math.abs(weights.reduce((sum,weight)=>sum+Number(weight),0)-marks)<1e-9;
    return points.length===marks;
  };
  if(items.some(item=>!allocationValid(item)))
    missing.push("mark-scheme-allocation");
  const approvals=record?.qaApprovals||{};
  CHECKS.forEach(check=>{if(!approved(approvals[check]))missing.push(`qa:${check}`);});
  // A model answer illustration is not a substitute for the source image.
  if(record?.diagramStatus&&/requires|still|pending|need/i.test(record.diagramStatus))
    missing.push("unresolved-figure-verification");
  if(Array.isArray(record?.sourceIssues)&&record.sourceIssues.length)
    missing.push("unresolved-source-issues");
  return {id:record?.id||null,ready:missing.length===0,missing,awardedMarks:total};
}
export function publishedChemistryHistoricalQuestions(rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS){
  return rows.filter(record=>record?.learnerFacing===true&&record?.status==="verified"
    &&auditChemistryHistoricalQuestion(record).ready);
}
export const CHEMISTRY_HISTORICAL_REVIEW_SUMMARY=Object.freeze({
  indexedDraftQuestions:CHEMISTRY_HISTORICAL_DRAFT_ITEMS.length,
  approvedQuestions:publishedChemistryHistoricalQuestions().length,
  papersWithDrafts:[...new Set(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.map(row=>row.sourceId))].length,
  reason:"Historical papers need five independent approvals plus complete answers, scheme, marks and source diagrams before learner release."
});
