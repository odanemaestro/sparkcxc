// Build a sit-able historical Paper 02 attempt without treating drafts as approved material.
import {CHEMISTRY_HISTORICAL_DRAFT_ITEMS} from "./chemistryHistoricalPaper2Drafts";
import {CHEMISTRY_PAPER2_SOURCE_AUDIT} from "./chemistryPaper2SourceAudit";
import {CHEMISTRY_HISTORICAL_OPTION_RULES,selectChemistryHistoricalPaperAttempt} from "./chemistryHistoricalPaperSelection";

export function buildChemistryHistoricalExam(sourceId,optionalQuestion=6,drafts=CHEMISTRY_HISTORICAL_DRAFT_ITEMS){
  const source=CHEMISTRY_PAPER2_SOURCE_AUDIT.find(row=>row.id===sourceId);
  if(!source)return null;
  const rule=CHEMISTRY_HISTORICAL_OPTION_RULES[sourceId];
  const chosen=rule ? Number(optionalQuestion) : null;
  if(rule&&!rule.alternatives.includes(chosen))return null;
  const selection=selectChemistryHistoricalPaperAttempt(sourceId,chosen,drafts);
  const available=drafts.filter(row=>row.sourceId===sourceId)
    .filter(row=>!rule||rule.compulsory.includes(Number(row.originalQuestionNumber))||Number(row.originalQuestionNumber)===chosen)
    .sort((a,b)=>Number(a.originalQuestionNumber)-Number(b.originalQuestionNumber));
  const questions=selection.ready?selection.questions:available;
  if(!questions.length)return null;
  const expectedCount=rule?rule.compulsory.length+rule.choose:Number(source.questionCount||0);
  const complete=Boolean(selection.ready&&questions.length===expectedCount);
  return {
    id:`${source.id}${rule?`-OPTION-${chosen}`:""}`,
    sourceId,sourceFile:source.file,year:source.year,session:source.session,
    title:`${source.year} ${source.session} Chemistry Paper 02`,
    questions,expectedCount,
    totalMarks:questions.reduce((sum,row)=>sum+Number(row.totalMarks||0),0),
    durationMinutes:150,originalQuestionNumbers:questions.map(row=>row.originalQuestionNumber),
    isHistorical:true,verified:false,complete,optionalQuestion:chosen,
    issues:questions.flatMap(row=>row.sourceIssues||[]),
  };
}
