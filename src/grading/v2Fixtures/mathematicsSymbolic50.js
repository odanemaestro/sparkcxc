import {SOURCE_SYMBOLIC_50_IDS} from "../v2OriginalMathSymbolic50";
const ids=new Set(SOURCE_SYMBOLIC_50_IDS);
const F=(cls,response,expect,note)=>({cls,response,expect,note});
export function mathematicsSymbolic50Fixtures({criterion,part,maxMarks}){
 if(!ids.has(criterion.id))return null;
 if(!part||![2,3].includes(maxMarks)||part.marks!==maxMarks)
  return {blocked:"symbolic-50-source-part-mismatch"};
 const source=criterion.sourceMarking||{},answer=String(source.answer??""),
  working=String(source.solution??"");
 if(!answer||!working)return {blocked:"symbolic-50-missing-source"};
 const full={answer,working},wrong="irrelevant unrelated response";
 return {kind:"structured",ruleId:"math:source-symbolic-50",
  sourceAnswer:full,alternatives:[{answer:" "+answer+" ",working:" "+working+" "}],
  fixtures:[
   F("full",full,maxMarks,"original source working and answer"),
   F("equivalent",{answer:" "+answer+" ",working:" "+working+" "},maxMarks,"formatting equivalent"),
   F("partial",{answer:wrong,working},maxMarks-1,"method but incorrect final"),
   F("partial",{answer:"",working},maxMarks-1,"method with no final answer"),
   {...F("incorrect",{answer:wrong,working:""},0,"unworked wrong final is provisional"),mustAbstain:true},
   F("blank",{answer:"",working:""},0),
   {...F("irrelevant",{answer:"nothing relevant",working:""},0,"unsupported response is provisional"),mustAbstain:true},
   F("competing",{answer:answer+" or "+wrong,working},maxMarks-1,"contradiction denies accuracy"),
   F("ceiling",full,maxMarks,"original mark ceiling"),
   {...F("working",{answer,working:""},1,"correct bare answer remains unresolved"),mustAbstain:true},
   {...F("working",{answer,working:"different valid derivation"},null,"different method must abstain"),mustAbstain:true}
  ]};
}
