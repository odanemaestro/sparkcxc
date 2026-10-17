// Source-linked SPARK-authored Paper 02 rubric wrapper for 2005–2007.
// Separate from the live grading worker. Structural credit caps are NOT
// sufficient evidence of source transcription or semantic correctness.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {validatePob2005to2007P2Selection} from "./pobHistoricalBatch03SourceAudit";
export function makePobEarlyP2AuthoredScheme({year,sourceSha256,sourcePages,parts}){
 const id="POB-P2-"+year+"-MJ";
 const original=POB_SUPPLIED_ARCHIVE.find(x=>x.id===id);
 if(!original||original.paper!==2||original.sourceSha256!==sourceSha256||original.pages!==sourcePages)
  throw new Error("Original nine-question Paper 2 missing or fingerprint changed.");
 const questions=Object.freeze([1,2,3,4,5,6,7,8,9].map(number=>Object.freeze({
  number,marks:number<=2?10:20,
  parts:Object.freeze(parts.filter(r=>r[0]===number).map(([,partId,modelAnswer,rawCriteria])=>Object.freeze({
   id:partId,modelAnswer,
   marks:rawCriteria.reduce((sum,s)=>sum+Number(s.slice(0,s.indexOf(":"))),0),
   criteria:Object.freeze(rawCriteria.map(raw=>{
    const at=raw.indexOf(":"),marks=Number(raw.slice(0,at)),rule=raw.slice(at+1);
    if(at<1||!Number.isInteger(marks)||marks<1||!rule.trim())
     throw new Error("Malformed criterion "+number+":"+partId);
    return Object.freeze({marks,rule,sourceSchemeVerified:false,authoredBySpark:true});
   }))
  })))
 })));
 return Object.freeze({
  id,paper:2,year,sitting:"MJ",sourceFilename:original.filename,
  sourceSha256,sourcePages,questions,offeredMarks:160,maximumCandidateMarks:100,
  examSelection:{compulsory:[1,2,3],chooseOneEach:[[4,5],[6,7],[8,9]]},
  origin:"SPARK-authored-not-CXC-published",
  officialCxcSchemeSupplied:false,completeDigitalSourceQuestionsVerified:false,
  semanticScoringCalibrated:false,liveScoringApproved:false
 });
}
export function verifyPobEarlyP2AuthoredScheme(paper){
 const issues=[],seen=new Set();let total=0,parts=0;
 const source=POB_SUPPLIED_ARCHIVE.find(x=>x.id===paper?.id);
 if(!source||source.paper!==2||source.sourceSha256!==paper.sourceSha256||
    source.filename!==paper.sourceFilename)
  issues.push("Source identity mismatch.");
 if(!Array.isArray(paper?.questions)||paper.questions.length!==9)
  issues.push("Nine distinct source questions required.");
 for(const q of paper?.questions||[]){
  if(!Number.isInteger(q.number)||q.number<1||q.number>9||seen.has(q.number))
   issues.push("Duplicated/invalid question.");
  seen.add(q.number);
  const ids=new Set();let subtotal=0;
  for(const p of q.parts||[]){
   parts++;subtotal+=p.marks;
   if(!p.id||ids.has(p.id))issues.push("Duplicate part "+q.number+":"+p.id);
   ids.add(p.id);
   if(!p.modelAnswer||p.modelAnswer.length<25)issues.push("Missing model answer.");
   if(!p.criteria?.length||p.criteria.reduce((s,c)=>s+c.marks,0)!==p.marks||
      p.criteria.some(c=>!c.rule||c.sourceSchemeVerified!==false))
    issues.push("Incorrect mark allocation.");
  }
  if(subtotal!==(q.number<=2?10:20))issues.push("Incorrect source marks Q"+q.number);
  total+=subtotal;
 }
 if(total!==160||paper?.maximumCandidateMarks!==100||
    !validatePob2005to2007P2Selection(paper?.id,[1,2,3,4,6,8]).valid)
  issues.push("Historical selection/maximum incorrect.");
 if(paper?.liveScoringApproved!==false||paper?.officialCxcSchemeSupplied!==false)
  issues.push("Not a released official CXC scheme.");
 return {valid:issues.length===0,issues,parts,offeredMarks:total};
}
