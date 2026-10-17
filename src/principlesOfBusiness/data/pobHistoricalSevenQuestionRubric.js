// Academic authoring utility for pre-revised CSEC historical POB Paper 02.
// The original exam prints SEVEN questions. Each student answers FIVE:
// Questions 1-3, one of 4/5, one of 6/7. The maximum mark is 100.
// Never assume a structurally complete rubric proves academic validity.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {validatePobHistoricalP2Selection} from "./pobHistoricalScoringBatches";
export function buildPobSevenQuestionAuthoredRubric({year,sourceSha256,sourcePages,parts}){
 const id="POB-P2-"+year+"-MJ";
 const trusted=POB_SUPPLIED_ARCHIVE.find(x=>x.id===id);
 if(!trusted||trusted.sourceSha256!==sourceSha256||trusted.pages!==sourcePages)
  throw new Error("Unapproved or mismatched historical POB source: "+id);
 const questions=Object.freeze([1,2,3,4,5,6,7].map(number=>Object.freeze({
  number,marks:20,
  parts:Object.freeze(parts.filter(x=>x[0]===number).map(([_,itemId,answer,rules])=>Object.freeze({
   id:itemId,modelAnswer:answer,
   marks:rules.reduce((sum,rule)=>sum+Number(rule.slice(0,rule.indexOf(":"))),0),
   criteria:Object.freeze(rules.map(raw=>{
    const separator=raw.indexOf(":");
    const marks=Number(raw.slice(0,separator)),rule=raw.slice(separator+1);
    if(!Number.isInteger(marks)||marks<1||!rule.trim())throw new Error("Invalid authored rubric rule.");
    return Object.freeze({
     marks,rule,sourceSchemeVerified:false,authoredBySpark:true
    });
   }))
  })))
 })));
 return Object.freeze({
  id,paper:2,year,sitting:"MJ",
  sourceFilename:trusted.filename,sourceSha256,
  sourcePages,questionsOffered:7,questionsToAnswer:5,maximumCandidateMarks:100,
  ownerAuthorizationVerified:true,
  rubricOrigin:"spark-internally-authored-not-CXC-official",
  officialCxcSchemeAvailable:false,sourceWordingVerified:false,
  calibratedSemanticMarking:false,liveScoringApproved:false,
  questions
 });
}
export function verifyPobSevenQuestionAuthoredRubric(paper){
 const issues=[],seen=new Set();let total=0,parts=0;
 const trusted=POB_SUPPLIED_ARCHIVE.find(p=>p.id===paper?.id);
 if(!trusted||paper?.sourceSha256!==trusted.sourceSha256||paper?.sourceFilename!==trusted.filename)
  issues.push("Source identity or SHA-256 mismatch.");
 if(!Array.isArray(paper?.questions)||paper.questions.length!==7)issues.push("Seven offered questions required.");
 for(const q of paper?.questions||[]){
  if(!Number.isInteger(q.number)||q.number<1||q.number>7||seen.has(q.number))issues.push("Duplicate or invalid question.");
  seen.add(q.number);
  const partIds=new Set();let questionMarks=0;
  for(const p of q.parts||[]){
   parts++;
   if(!p.id||partIds.has(p.id))issues.push("Duplicate part.");
   partIds.add(p.id);
   if(typeof p.modelAnswer!=="string"||p.modelAnswer.length<25)issues.push("Missing developed answer.");
   const markSum=p.criteria?.reduce((sum,c)=>sum+c.marks,0);
   if(markSum!==p.marks||!Number.isInteger(p.marks)||p.marks<1)issues.push("Incorrect criterion maximum.");
   if(p.criteria?.some(c=>!c.rule||c.sourceSchemeVerified!==false||c.authoredBySpark!==true))
    issues.push("Rubric source incorrectly represented.");
   questionMarks+=p.marks||0;
  }
  if(questionMarks!==20)issues.push("Each offered question must total 20 marks.");
  total+=questionMarks;
 }
 if(total!==140||paper?.maximumCandidateMarks!==100)issues.push("Candidate max 100 / offered max 140 mismatch.");
 if(paper?.liveScoringApproved!==false||paper?.officialCxcSchemeAvailable!==false)
  issues.push("Authored draft cannot be promoted to live/official.");
 if(!validatePobHistoricalP2Selection(paper?.id,[1,2,3,4,6]).valid||
   validatePobHistoricalP2Selection(paper?.id,[1,2,3,4,5]).valid)
  issues.push("Historical question choice rules missing or wrong.");
 return {valid:issues.length===0,issues,offeredMarks:total,parts};
}
