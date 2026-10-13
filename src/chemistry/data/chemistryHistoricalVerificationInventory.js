// Actionable source-verification inventory. This is an audit, not a reviewer sign-off.
import {CHEMISTRY_HISTORICAL_DRAFT_ITEMS} from "./chemistryHistoricalPaper2Drafts";
import {CHEMISTRY_PAPER2_SOURCE_AUDIT} from "./chemistryPaper2SourceAudit";
import {auditChemistryHistoricalQuestion,CHEMISTRY_HISTORICAL_REVIEW_CHECKS} from "./chemistryHistoricalReleaseGate";

const hasFigure=item=>["drawing","graph"].includes(item?.response?.type);
export function buildChemistryHistoricalVerificationInventory(
  questions=CHEMISTRY_HISTORICAL_DRAFT_ITEMS,sources=CHEMISTRY_PAPER2_SOURCE_AUDIT
){
  const sourceById=new Map(sources.map(s=>[s.id,s]));
  const rows=questions.map(q=>{
    const source=sourceById.get(q.sourceId);
    const items=(q.parts||[]).flatMap(p=>p.items||[]);
    const computedMarks=items.reduce((n,item)=>n+Number(item.marks||0),0);
    const sourcePageMismatch=!source||q.sourceFile!==source.file||
      !Array.isArray(q.pdfPages)||q.pdfPages.length===0||
      q.pdfPages.some(page=>!Number.isInteger(page)||page<1||page>source.pages);
    const figureItems=items.filter(hasFigure).length;
    const keyedTables=items.filter(i=>i.response?.type==="table").length;
    const issues=Array.isArray(q.sourceIssues)?q.sourceIssues:[];
    const missingApprovals=CHEMISTRY_HISTORICAL_REVIEW_CHECKS
      .filter(check=>q.qaApprovals?.[check]?.approved!==true);
    const gate=auditChemistryHistoricalQuestion(q);
    return {
      id:q.id,sourceId:q.sourceId,questionNumber:q.originalQuestionNumber,
      sourcePageMismatch,markMismatch:computedMarks!==q.totalMarks,
      computedMarks,declaredMarks:q.totalMarks,
      figureItems,keyedTables,unresolvedIssues:issues.length,
      missingApprovals,releaseReady:q.learnerFacing===true&&
        q.status==="verified"&&gate.ready,
      gateBlockers:gate.missing
    };
  });
  const totals=rows.reduce((a,r)=>({
    questions:a.questions+1,sourcePageMismatches:a.sourcePageMismatches+Number(r.sourcePageMismatch),
    markMismatches:a.markMismatches+Number(r.markMismatch),
    figureItems:a.figureItems+r.figureItems,
    keyedTables:a.keyedTables+r.keyedTables,
    unresolvedIssues:a.unresolvedIssues+r.unresolvedIssues,
    approvalChecksOutstanding:a.approvalChecksOutstanding+r.missingApprovals.length,
    releaseReady:a.releaseReady+Number(r.releaseReady)
  }),{questions:0,sourcePageMismatches:0,markMismatches:0,figureItems:0,
    keyedTables:0,unresolvedIssues:0,approvalChecksOutstanding:0,releaseReady:0});
  return {rows,totals};
}
export const CHEMISTRY_HISTORICAL_VERIFICATION_INVENTORY=buildChemistryHistoricalVerificationInventory();
