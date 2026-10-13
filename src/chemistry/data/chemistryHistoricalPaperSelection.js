// Rules for reconstructing an original historical paper attempt from source drafts.
// The seven-question 2008/2009 archives have TWO alternatives in Section C.
// Keep both in the bank, but NEVER silently include both in a 100-mark exam.
import {CHEMISTRY_HISTORICAL_DRAFT_ITEMS} from "./chemistryHistoricalPaper2Drafts";
import {CHEMISTRY_PAPER2_SOURCE_AUDIT} from "./chemistryPaper2SourceAudit";

export const CHEMISTRY_HISTORICAL_OPTION_RULES=Object.freeze({
 "CHEM-P2-2008-MJ":Object.freeze({compulsory:Object.freeze([1,2,3,4,5]),alternatives:Object.freeze([6,7]),choose:1}),
 "CHEM-P2-2009-MJ":Object.freeze({compulsory:Object.freeze([1,2,3,4,5]),alternatives:Object.freeze([6,7]),choose:1})
});

const byNumber=(a,b)=>a.originalQuestionNumber-b.originalQuestionNumber;
const draftNumber=q=>Number(q.originalQuestionNumber);
export function selectChemistryHistoricalPaperAttempt(sourceId,optionalQuestion=null,allDrafts=CHEMISTRY_HISTORICAL_DRAFT_ITEMS){
 const all=allDrafts.filter(q=>q.sourceId===sourceId).sort(byNumber);
 const rule=CHEMISTRY_HISTORICAL_OPTION_RULES[sourceId]||null;
 if(!all.length)return {ready:false,reason:"source-not-found",sourceId,questions:[],totalMarks:0};
 if(!rule){
  const source=CHEMISTRY_PAPER2_SOURCE_AUDIT.find(q=>q.id===sourceId);
  const count=Number(source?.questionCount||0);
  if(!count||all.length!==count||Array.from({length:count},(_,i)=>i+1).some(n=>!all.some(q=>draftNumber(q)===n)))return {
   ready:false,reason:"incomplete-source-paper",sourceId,questions:[],totalMarks:0
  };
  const total=all.reduce((sum,q)=>sum+Number(q.totalMarks||0),0);
  return {ready:true,sourceId,questions:all,totalMarks:total,optionalQuestion:null};
 }
 if(!rule.alternatives.includes(Number(optionalQuestion)))return {
  ready:false,reason:"section-c-option-required",sourceId,questions:[],totalMarks:0,
  availableChoices:[...rule.alternatives]
 };
 const expected=[...rule.compulsory,Number(optionalQuestion)];
 if(expected.some(n=>!all.some(q=>draftNumber(q)===n)))return {
  ready:false,reason:"incomplete-source-paper",sourceId,questions:[],totalMarks:0
 };
 const selection=all.filter(q=>expected.includes(draftNumber(q)));
 return {
  ready:true,sourceId,questions:selection,
  totalMarks:selection.reduce((sum,q)=>sum+Number(q.totalMarks||0),0),
  optionalQuestion:Number(optionalQuestion)
 };
}
