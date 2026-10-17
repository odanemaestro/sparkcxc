// Complete source-backed January 2023 POB Paper 1 simulator.
import {POB_HISTORICAL_2023_JAN_P1_Q01_10} from "./pobHistorical2023JanP1Q01to10Draft";
import {POB_2023_JAN_P1_REMAINING} from "./pobHistorical2023JanP1RemainingQuestions";
import {POB_2023_JAN_P1_AUTHORED_KEY} from "./pobHistorical2023JanP1AuthoredKey";

const originals=POB_HISTORICAL_2023_JAN_P1_Q01_10.questions.map(x=>({
 number:x.number,stem:x.stem,options:x.options,page:x.sourcePdfPage
})).concat(POB_2023_JAN_P1_REMAINING);
export const POB_HIST_2023_JAN_FULL_60=Object.freeze({
 id:"POB-P1-2023-JAN",year:2023,sitting:"JAN",paper:1,
 sourceSha256:"3074ee9e4b69da38efbc895ac82a37333d55f46a349053d336b2a111e320982a",
 questionCount:60,timeLimitMinutes:75,
 officialCxcKeySupplied:false,answerAuthority:"spark-provisional-explanations",
 questions:Object.freeze(originals.map(q=>Object.freeze({
  ...q,id:"POB-P1-2023-JAN:Q"+q.number,
  answer:POB_2023_JAN_P1_AUTHORED_KEY.entries.find(r=>r.number===q.number)?.answer??null,
  explanation:POB_2023_JAN_P1_AUTHORED_KEY.entries.find(r=>r.number===q.number)?.explanation??"",
  academicReview:POB_2023_JAN_P1_AUTHORED_KEY.answerReviewNotes?.[q.number]||null
 })))
});
export function verifyPobHistorical2023FullPaper(paper=POB_HIST_2023_JAN_FULL_60){
 const errors=[];
 if(paper?.sourceSha256!==POB_2023_JAN_P1_AUTHORED_KEY.sourceSha256)
  errors.push("source_sha_mismatch");
 if(paper?.timeLimitMinutes!==75||paper?.questions?.length!==60)
  errors.push("paper_length_or_time");
 for(let n=1;n<=60;n++){
  const q=paper?.questions?.[n-1];
  if(q?.number!==n||typeof q.stem!=="string"||q.stem.trim().length<12||
     !Array.isArray(q.options)||q.options.length!==4||
     q.options.some(a=>typeof a!=="string"||a.trim().length<1)||
     !Number.isInteger(q.page)||q.page<2||q.page>9)
   errors.push("invalid_original_question_"+n);
 }
 if(paper?.officialCxcKeySupplied!==false)
   errors.push("misrepresented_official_key");
 return {valid:!errors.length,errors};
}
