// Chemistry historical source release gate. Source identity alone is not enough.
// Deliberately denies learner release until independent approval of each discipline.
import {CHEMISTRY_HISTORICAL_DRAFT_ITEMS} from "./chemistryHistoricalPaper2Drafts";

const CHECKS=Object.freeze(["sourceTranscription","chemicalAnswers","markScheme","figureSvg","examInteraction"]);
export const CHEMISTRY_HISTORICAL_REVIEW_CHECKS=CHECKS;
const approved=entry=>Boolean(entry&&entry.approved===true&&
  String(entry.reviewer||"").trim()&&String(entry.reviewedAt||"").trim());
export function auditChemistryHistoricalQuestion(record){
  const missing=[];
  if(!record?.sourceId||!record.sourceFile||!Array.isArray(record.pdfPages)||!record.pdfPages.length||
    record.pdfPages.some(page=>!Number.isInteger(page)||page<1))
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
  // A table cannot be released merely because its written rubric is complete:
  // every editable cell also needs a concrete answer key.
  const missingTableKeys=items.some(item=>{
    if(item.response?.type!=="table")return false;
    const table=item.response.table||{};
    const count=(table.rows||[]).flat().filter(cell=>String(cell??"")==="").length;
    const answers=table.answers;
    return count===0||!Array.isArray(answers)||answers.length!==count||
      answers.some(answer=>Array.isArray(answer)
        ?answer.length===0||answer.some(value=>!String(value??"").trim())
        :!String(answer??"").trim());
  });
  if(missingTableKeys)missing.push("missing-table-answer-keys");
  // Table grouping must cover each editable cell exactly once when supplied.
  const invalidGroup=items.some(item=>{
    if(item.response?.type!=="table"||item.response.table?.markGroups===undefined)return false;
    const table=item.response.table;
    const count=(table.rows||[]).flat().filter(cell=>String(cell??"")==="").length;
    const groups=table.markGroups;
    const indices=Array.isArray(groups)?groups.flatMap(group=>Array.isArray(group)?group:[]):[];
    return !Array.isArray(groups)||!groups.length||
      groups.some(group=>!Array.isArray(group)||!group.length)||
      indices.length!==count||new Set(indices).size!==count||
      indices.some(index=>!Number.isInteger(index)||index<0||index>=count);
  });
  if(invalidGroup)missing.push("invalid-table-mark-groups");
  const approvals=record?.qaApprovals||{};
  CHECKS.forEach(check=>{if(!approved(approvals[check]))missing.push(`qa:${check}`);});
  // An approval needs a real ISO calendar date, not arbitrary placeholder text.
  CHECKS.forEach(check=>{
    const entry=approvals[check];
    if(!approved(entry))return;
    const date=String(entry.reviewedAt);
    const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    const calendarDate=match&&new Date(`${date}T00:00:00.000Z`);
    if(!match||!Number.isFinite(calendarDate.getTime())||calendarDate.toISOString().slice(0,10)!==date)
      missing.push(`qa-date:${check}`);
  });
  // A model answer illustration is not a substitute for the source image.
  // Missing figure evidence must fail closed, including on questions without a drawing.
  // A reviewer must explicitly record "verified" or "not-applicable".
  const figureStatus=String(record?.diagramStatus||"").trim();
  if(!/^(verified|not-applicable)$/i.test(figureStatus))
    missing.push("unresolved-figure-verification");
  // A missing issue log is not evidence that source ambiguities were reviewed.
  if(!Array.isArray(record?.sourceIssues)||record.sourceIssues.length)
    missing.push("unresolved-source-issues");
  return {id:record?.id||null,ready:missing.length===0,missing,awardedMarks:total};
}
// Publication requires five separate reviewers, not one repeated sign-off.
// The audit above still reports individual checklist completeness separately.
const independentReviewers=record=>{
  const names=CHECKS.map(check=>String(record?.qaApprovals?.[check]?.reviewer||"").trim().toLocaleLowerCase());
  return names.every(Boolean)&&new Set(names).size===CHECKS.length;
};
export function publishedChemistryHistoricalQuestions(rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS){
  return rows.filter(record=>record?.learnerFacing===true&&record?.status==="verified"
    &&auditChemistryHistoricalQuestion(record).ready&&independentReviewers(record));
}
export const CHEMISTRY_HISTORICAL_REVIEW_SUMMARY=Object.freeze({
  indexedDraftQuestions:CHEMISTRY_HISTORICAL_DRAFT_ITEMS.length,
  approvedQuestions:publishedChemistryHistoricalQuestions().length,
  papersWithDrafts:[...new Set(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.map(row=>row.sourceId))].length,
  reason:"Historical papers need five independent approvals plus complete answers, scheme, marks and source diagrams before learner release."
});
