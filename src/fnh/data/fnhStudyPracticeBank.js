import {FNH_STUDY_PRACTICE_PART_ONE} from "./fnhStudyPracticeOne";
import {FNH_STUDY_PRACTICE_PART_TWO} from "./fnhStudyPracticeTwo";

// Exactly three original practice questions per syllabus topic. These are
// inspired by past-paper question styles, never copied historical source
// items. They give immediate formative feedback with no exam scoring.
export const FNH_STUDY_PRACTICE_BANK=Object.freeze({
 ...FNH_STUDY_PRACTICE_PART_ONE,...FNH_STUDY_PRACTICE_PART_TWO
});
export function fnhStudyPracticeForTopic(topicId){
 return FNH_STUDY_PRACTICE_BANK[topicId]||[];
}
export function fnhMarkStudyPractice(question,response){
 if(!question)return false;
 if(question.type==="number"){
  if(response==null||String(response).trim()==="")return false;
  const value=Number(response);
  return Number.isFinite(value)&&Math.abs(value-question.answer)<=(question.tolerance??0.001);
 }
 if(question.type==="single")return question.answer===response;
 if(question.type==="multi"){
  const actual=Array.isArray(response)?response:[];
  return actual.length===question.answer.length
   &&new Set(actual).size===actual.length
   &&actual.every(value=>question.answer.includes(value));
 }
 if(question.type==="order"){
  return Array.isArray(response)
    &&response.length===question.answer.length
    &&response.every((value,index)=>value===question.answer[index]);
 }
 return false;
}
export function fnhPracticeAnswerText(question){
 if(!question)return "";
 if(question.type==="number")return `${question.answer} ${question.unit}`;
 if(question.type==="order")return question.answer.map((letter,index)=>
  `${index+1}. ${question.options["ABCD".indexOf(letter)]}`).join("; ");
 if(question.type==="multi")return question.answer.join(", ");
 return question.answer;
}
