import {MATH_FINAL_REASONING_IDS} from "../v2MathFinalReasoning";
const allowed=new Set(MATH_FINAL_REASONING_IDS);
const F=(cls,response,expect,note)=>({cls,response,expect,note});
export function mathematicsFinalReasoningFixtures({criterion,part,maxMarks}){
 if(!allowed.has(criterion.id))return null;
 const src=criterion.sourceMarking||{};
 if(!part||part.marks!==maxMarks||src.answer!==part.answer||src.solution!==part.solution||!Array.isArray(src.criteria)||src.criteria.reduce((n,c)=>n+c.marks,0)!==maxMarks)return {blocked:"final-maths-source-integrity"};
 const answer=src.answer,working=src.solution;
 const full={answer,working};
 const alternative={answer:"  "+answer+"  ",working:"  "+working+"  "};
 return {kind:"structured",ruleId:"math:final-reasoning-source",sourceAnswer:full,alternatives:[alternative],fixtures:[
 F("full",full,maxMarks,"source answer and full registered mathematical reasoning"),
 F("equivalent",alternative,maxMarks,"whitespace equivalent source proof"),
 F("partial",{answer:"banana",working},maxMarks-1,"correct proof but wrong final statement"),
 F("partial",{answer:"",working},maxMarks-1,"correct proof with no final statement"),
 F("incorrect",{answer:"banana",working:""},0,"irrelevant unsupported final answer"),
 F("blank",{answer:"",working:""},0,"no answer evidence"),
 F("irrelevant",{answer:"banana"},0,"unrelated answer"),
 F("competing",{answer:answer+" or banana",working},maxMarks-1,"contradictory final response"),
 F("ceiling",full,maxMarks,"registered source maximum"),
 {...F("working",{answer,working:""},null,"source answer without proof is provisional"),mustAbstain:true},
 {...F("working",{answer,working:"a valid alternative solution"},null,"unrecognised valid methods remain provisional"),mustAbstain:true},
 {...F("working",{answer:"plausible other proof",working:""},null,"unknown reasoning remains provisional"),mustAbstain:true}
 ]};
}
