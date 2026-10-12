// Derived historical Chemistry paper-coverage ledger. It never treats an
// indexed PDF as a released question bank. Use for admin/source QA only.
import {CHEMISTRY_PAPER2_SOURCE_AUDIT} from "./chemistryPaper2SourceAudit";
import {CHEMISTRY_HISTORICAL_DRAFT_ITEMS} from "./chemistryHistoricalPaper2Drafts";
import {publishedChemistryHistoricalQuestions} from "./chemistryHistoricalReleaseGate";

function numericId(row){
 const n=Number(row?.originalQuestionNumber);
 return Number.isInteger(n)&&n>=1?n:null;
}
export function buildChemistryHistoricalCoverage(sources=CHEMISTRY_PAPER2_SOURCE_AUDIT,drafts=CHEMISTRY_HISTORICAL_DRAFT_ITEMS){
 const known=new Set(sources.map(source=>source.id));
 const orphanDrafts=drafts.filter(item=>!known.has(item.sourceId)).map(item=>item.id);
 const duplicateQuestionNumbers=[];
 const pages=sources.map(source=>{
  const matching=drafts.filter(item=>item.sourceId===source.id);
  const valid=matching.filter(item=>numericId(item)!==null);
  const numbers=valid.map(numericId),unique=new Set(numbers);
  numbers.forEach(number=>{
   if(numbers.indexOf(number)!==numbers.lastIndexOf(number)&&!duplicateQuestionNumbers.some(row=>row.id===source.id&&row.number===number))
     duplicateQuestionNumbers.push({id:source.id,number});
  });
  const expectedCount=Number(source.questionCount||0);
  const missingNumbers=Array.from({length:expectedCount},(_,i)=>i+1).filter(number=>!unique.has(number));
  const unexpectedNumbers=[...unique].filter(n=>n>expectedCount);
  const awaitingReview=matching.filter(item=>item.status!=="verified"||!item.learnerFacing).length;
  const ready=publishedChemistryHistoricalQuestions(matching);
  return {
   sourceId:source.id,year:source.year,session:source.session,
   sourceFile:source.file,sourcePages:source.pages,
   expectedQuestions:expectedCount,draftedQuestions:matching.length,
   approvedQuestions:ready.length,awaitingReview,
   missingNumbers,unexpectedNumbers,
   draftMarks:matching.reduce((sum,item)=>sum+Number(item.totalMarks||0),0),
   paperComplete:expectedCount>0&&missingNumbers.length===0&&unexpectedNumbers.length===0,
   publishedComplete:expectedCount>0&&ready.length===expectedCount
  };
 });
 const totals=pages.reduce((a,row)=>({
  sources:a.sources+1,pages:a.pages+row.sourcePages,
  expectedQuestions:a.expectedQuestions+row.expectedQuestions,
  draftedQuestions:a.draftedQuestions+row.draftedQuestions,
  approvedQuestions:a.approvedQuestions+row.approvedQuestions,
  fullyDraftedPapers:a.fullyDraftedPapers+Number(row.paperComplete),
  readyPapers:a.readyPapers+Number(row.publishedComplete),
  missingQuestions:a.missingQuestions+row.missingNumbers.length,
  draftMarks:a.draftMarks+row.draftMarks
 }),{sources:0,pages:0,expectedQuestions:0,draftedQuestions:0,approvedQuestions:0,fullyDraftedPapers:0,readyPapers:0,missingQuestions:0,draftMarks:0});
 return {papers:pages,totals,orphanDrafts,duplicateQuestionNumbers};
}
export const CHEMISTRY_HISTORICAL_COVERAGE=buildChemistryHistoricalCoverage();
