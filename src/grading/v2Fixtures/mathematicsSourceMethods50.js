import {SOURCE_METHODS_50_IDS} from "../v2OriginalMathSourceMethods50";
const ids=new Set(SOURCE_METHODS_50_IDS);
const F=(cls,response,expect,note)=>({cls,response,expect,note});
export function mathematicsSourceMethods50Fixtures({criterion,part,maxMarks}){
 if(!ids.has(criterion.id))return null;
 if(!part||part.marks!==maxMarks||maxMarks<3||maxMarks>5)
  return {blocked:"source-method-50-original-mark-ceiling-drift"};
 const source=criterion.sourceMarking??{};
 const answer=String(source.answer??""),working=String(source.solution??"");
 if(!answer||!working)return {blocked:"source-method-50-missing-solution"};
 const complete={answer,working},wrong="banana", methodMarks=maxMarks-1;
 return {kind:"structured",ruleId:"math:source-methods-50",sourceAnswer:complete,
  alternatives:[{answer:" "+answer+" ",working:" "+working+" "}],
  fixtures:[
   F("full",complete,maxMarks,"source solution and independently correct final"),
   F("equivalent",{answer:" "+answer+" ",working:" "+working+" "},maxMarks,
    "surrounding whitespace is not evidence of a different numerical result"),
   F("partial",{answer:wrong,working},methodMarks,"source-proven method with incorrect final"),
   F("partial",{answer:"",working},methodMarks,"method only; no accuracy mark"),
   F("incorrect",{answer:wrong,working:""},0,"definitively irrelevant final, no method"),
   F("blank",{answer:"",working:""},0,"empty answer"),
   F("irrelevant",{answer:wrong,working:""},0,"nonsense is not an alternative"),
   F("competing",{answer:answer+" or "+wrong,working},methodMarks,
    "contradictory final response cannot earn A1"),
   F("ceiling",complete,maxMarks,"never exceed the source's original marks"),
   {...F("working",{answer,working:""},1,
    "correct final alone does not establish M1 through M3/M4"),mustAbstain:true},
   {...F("working",{answer,working:"an alternative method"},null,
    "unknown valid methods remain unresolved"),mustAbstain:true},
   {...F("working",{answer:"wrong final",working:""},0,
    "wrong unworked answer cannot establish zero method-credit eligibility"),mustAbstain:true}
  ]};
}
