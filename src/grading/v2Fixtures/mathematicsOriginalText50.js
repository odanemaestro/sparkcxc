import {ORIGINAL_TEXT_50_IDS} from "../v2OriginalMathText50";
const allowed=new Set(ORIGINAL_TEXT_50_IDS);
const F=(cls,response,expect,note)=>({cls,response,expect,note});
export function mathematicsOriginalText50Fixtures({criterion,part,maxMarks}){
 if(!allowed.has(criterion.id))return null;
 if(!part||part.marks!==maxMarks||maxMarks<1||maxMarks>5)
  return {blocked:"original-text-50-mark-allocation-drift"};
 const s=criterion.sourceMarking??{},answer=String(s.answer??""),
  working=String(s.solution??"");
 if(!answer||!working)return {blocked:"original-text-50-source-drift"};
 const canonical={answer,working},wrong="banana",partial=Math.max(0,maxMarks-1);
 const goodBare=maxMarks===1&&s.criteria?.[0]?.kind==="A";
 return {kind:"structured",ruleId:"math:original-text-50",sourceAnswer:canonical,
  alternatives:[{answer:" "+answer+" ",working:" "+working+" "}],
  fixtures:[
   F("full",canonical,maxMarks,"source correct answer and authentic method"),
   F("equivalent",{answer:" "+answer+" ",working:" "+working+" "},maxMarks,
    "surrounding whitespace does not alter the source result"),
   F("partial",{answer:wrong,working},partial,"source working, inaccurate final"),
   F("partial",{answer:"",working},partial,"source method and no final answer"),
   F("incorrect",{answer:wrong,working:""},0,"non-answer"),
   F("blank",{answer:"",working:""},0),
   F("irrelevant",{answer:wrong,working:""},0),
   F("competing",{answer:answer+" or "+wrong,working},partial,
    "contradictory answer loses last source mark"),
   F("ceiling",canonical,maxMarks,"original mark cap"),
   {...F("working",{answer,working:""},goodBare?1:null,
    "bare answer resolves only original standalone A1"),mustAbstain:!goodBare},
   {...F("working",{answer,working:"different valid working"},null,
    "unknown method remains provisional"),mustAbstain:true},
   {...F("working",{answer:"other answer",working:""},null,
    "bare different answer cannot deny method credit"),mustAbstain:true}
  ]};
}
