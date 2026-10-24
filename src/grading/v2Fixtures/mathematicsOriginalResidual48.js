import {ORIGINAL_RESIDUAL_48_IDS} from "../v2OriginalMathResidual48";
const allowed=new Set(ORIGINAL_RESIDUAL_48_IDS);
const F=(cls,response,expect,note)=>({cls,response,expect,note});
export function mathematicsOriginalResidual48Fixtures({criterion,part,maxMarks}){
 if(!allowed.has(criterion.id))return null;
 if(!part||part.marks!==maxMarks||maxMarks<1||maxMarks>5)
  return {blocked:"residual-original-source-allocation-drift"};
 const source=criterion.sourceMarking??{};
 const checks=source.criteria||[];
 if(!Array.isArray(checks)||checks.length!==maxMarks||
  checks.some(c=>c.marks!==1)||source.answer!==part.answer||
  source.solution!==part.solution||typeof source.answer!=="string"||
  typeof source.solution!=="string"||!source.answer.trim()||
  !source.solution.trim()||
  ["graph","construction","construction_triangle","drawing","table"]
   .includes(part.responseSchema?.type))
  return {blocked:"residual-original-source-mismatch"};
 const answer=source.answer,working=source.solution;
 const complete={answer,working},partial=maxMarks-1;
 const bareOne=maxMarks===1;
 const alternate={answer:" "+answer+" ",working:" "+working+" "};
 return {kind:"structured",ruleId:"math:source-original-residual-48",
  sourceAnswer:complete,alternatives:[alternate],
  fixtures:[
   F("full",complete,maxMarks,"Original source solution and final answer"),
   F("equivalent",alternate,maxMarks,"Surrounding whitespace does not change the solution"),
   F("partial",{answer:"banana",working},partial,"Source method with wrong final"),
   F("partial",{answer:"",working},partial,"Source method without final"),
   F("incorrect",{answer:"banana",working:""},0,"No relevant mathematical evidence"),
   F("blank",{answer:"",working:""},0,"Empty response"),
   F("irrelevant",{answer:"banana",working:""},0,"Irrelevant free text"),
   F("competing",{answer:answer+" or banana",working},partial,
    "Conflicting final response loses its final mark"),
   F("ceiling",complete,maxMarks,"Original mark cap"),
   {...F("working",{answer,working:""},bareOne?1:null,
     "Bare answer is final only for a complete one-mark statement"),
    mustAbstain:!bareOne},
   {...F("working",{answer,working:"independent alternative valid working"},null,
     "Unrecognised method must stay provisional"),mustAbstain:true},
   {...F("working",{answer:"other plausible result",working:""},null,
     "Unworked noncanonical result stays provisional"),mustAbstain:true}
  ]};
}
