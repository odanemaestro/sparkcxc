// Shared SPARK authoring and structural QA for 2017+ historical POB Paper 02.
// A valid 100-mark rubric is NOT evidence of accurate marking. Never let a
// student-supplied object or client booleans activate the production worker.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {validatePobHistoricalP2Selection} from "./pobHistoricalScoringBatches";
export function buildPobFiveQuestionAuthoredRubric({year,sitting,sourceSha256,sourcePages,parts}){
 const id="POB-P2-"+year+"-"+sitting;
 const trusted=POB_SUPPLIED_ARCHIVE.find(p=>p.id===id);
 if(!trusted||trusted.sourceSha256!==sourceSha256||trusted.pages!==sourcePages)
  throw new Error("Unknown or source-mismatched historical P2 "+id);
 const questions=Object.freeze([1,2,3,4,5].map(number=>Object.freeze({
  number,marks:20,
  parts:Object.freeze(parts.filter(r=>r[0]===number).map(([,partId,modelAnswer,rules])=>Object.freeze({
   id:partId,modelAnswer,
   marks:rules.reduce((n,rule)=>{
    const i=rule.indexOf(":"),m=Number(rule.slice(0,i));
    if(i<1||!Number.isInteger(m)||m<1)throw new Error("Invalid rubric point "+partId);
    return n+m;
   },0),
   criteria:Object.freeze(rules.map(raw=>{
    const k=raw.indexOf(":");
    return Object.freeze({
     marks:Number(raw.slice(0,k)),rule:raw.slice(k+1),
     sourceSchemeVerified:false,authoredBySpark:true
    });
   }))
  })))
 })));
 return Object.freeze({
  id,paper:2,year,sitting,sourceFilename:trusted.filename,sourceSha256,
  sourcePages,questionsOffered:5,questionsToAnswer:5,maximumCandidateMarks:100,
  origin:"spark-internally-authored-not-published-CXC",
  officialCxcMarkingSchemeAvailable:false,sourceQuestionsFullyTranscribed:false,
  semanticScoringCalibrated:false,liveScoringApproved:false,
  questions
 });
}
export function verifyPobFiveQuestionAuthoredRubric(paper){
 const issues=[],seen=new Set();let offeredMarks=0,parts=0;
 const trusted=POB_SUPPLIED_ARCHIVE.find(p=>p.id===paper?.id);
 if(!trusted||paper?.sourceSha256!==trusted.sourceSha256||paper?.sourceFilename!==trusted.filename)
  issues.push("Source filename or SHA-256 mismatch.");
 if(!Array.isArray(paper?.questions)||paper.questions.length!==5)issues.push("Must have five distinct questions.");
 for(const q of paper?.questions||[]){
  if(!Number.isInteger(q.number)||q.number<1||q.number>5||seen.has(q.number))issues.push("Duplicate/invalid question.");
  seen.add(q.number);
  let total=0;const ids=new Set();
  for(const p of q.parts||[]){
   parts++;
   if(!p.id||ids.has(p.id))issues.push("Duplicate/blank part ID.");
   ids.add(p.id);
   if(typeof p.modelAnswer!=="string"||p.modelAnswer.length<25)issues.push("Missing model answer.");
   if(!Number.isInteger(p.marks)||p.marks<1||p.criteria?.reduce((sum,c)=>sum+c.marks,0)!==p.marks)
    issues.push("Incorrect part rubric total.");
   if(p.criteria?.some(c=>!c.rule||c.sourceSchemeVerified!==false||c.authoredBySpark!==true))
    issues.push("Rubric origin or rule inconsistent.");
   total+=p.marks||0;
  }
  if(total!==20)issues.push("Question does not total 20.");
  offeredMarks+=total;
 }
 if(offeredMarks!==100||paper?.maximumCandidateMarks!==100)issues.push("Candidate max must be 100.");
 if(paper?.liveScoringApproved!==false||paper?.officialCxcMarkingSchemeAvailable!==false)
  issues.push("Uncalibrated internally-authored rubric cannot release/live.");
 if(!validatePobHistoricalP2Selection(paper?.id,[1,2,3,4,5]).valid)
  issues.push("Source selection rules missing.");
 return {valid:issues.length===0,issues,offeredMarks,parts};
}
