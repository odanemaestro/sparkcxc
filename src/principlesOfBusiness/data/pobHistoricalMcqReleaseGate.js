import {validatePobHistoricalCandidate} from "./pobHistoricalReleaseGate";

// Additional evidence gate for 60-item historical Paper 1 examinations.
// A source page, four unique labelled options, one verified correct option,
// and academic verification are required for EACH item.
export function validatePobHistoricalPaper1(candidate){
 const base=validatePobHistoricalCandidate(candidate);
 const issues=[...base.issues];
 if(!candidate||candidate.paper!==1)issues.push("Not a Paper 1 examination.");
 if(candidate?.sourcePaperMismatch||candidate?.coverPaperNumber===2||
    candidate?.paperPrintedOnCover===2)issues.push("The source cover is Paper 02, not Paper 01.");
 const items=candidate?.questions;
 if(!Array.isArray(items)||items.length!==60){
  issues.push("Exactly 60 complete, verified Paper 1 questions are required.");
  return {ready:false,issues};
 }
 const numbers=new Set();
 items.forEach((item,i)=>{
  const number=item?.number;
  if(!Number.isInteger(number)||number<1||number>60||numbers.has(number)){
   issues.push(`Question slot ${i+1}: invalid or duplicate question number.`);
  }else numbers.add(number);
  if(typeof item?.stem!=="string"||!item.stem.trim()||item.questionWordingVerified!==true)
   issues.push(`Question ${number}: unverified or missing question text.`);
  const opts=item?.options;
  const validOptions=opts&&typeof opts==="object"&&
   ["A","B","C","D"].every(letter=>typeof opts[letter]==="string"&&opts[letter].trim())&&
   Object.keys(opts).length===4;
  if(!validOptions||item.answerChoicesVerified!==true)
   issues.push(`Question ${number}: all four options must be visually verified.`);
  if(!["A","B","C","D"].includes(item?.correctOption)||item.answerSourceVerified!==true)
   issues.push(`Question ${number}: no verified correct answer with evidence.`);
  if(!Number.isInteger(item?.sourcePage)||item.sourcePage<1||
     item.sourcePage>candidate.sourcePageCount)
   issues.push(`Question ${number}: missing or invalid source page.`);
  if(item?.hasDiagram===true&&item.diagramVerified!==true)
   issues.push(`Question ${number}: diagram has not been verified.`);
 });
 if(numbers.size!==60)issues.push("The complete sequence of 60 distinct question numbers is missing.");
 return {ready:issues.length===0,issues};
}
