import {SOURCE_CALC_50_IDS} from "../v2OriginalMathSourceCalculations50";
const allowed=new Set(SOURCE_CALC_50_IDS);
const f=(cls,response,expect,note)=>({cls,response,expect,note});
const altAnswer=(part,answer)=>{
 if(answer.includes("/"))return answer.replace("/"," / ");
 if(/correct to \d+ decimal places?|\bbearing\b/i.test(part.prompt||"")||/^0\d{2}$/.test(answer))
  return " "+answer+" ";
 return answer.includes(".")?" "+answer+" ":answer+".0";
};
export function mathematicsSourceCalc50Fixtures({criterion,part,maxMarks}){
 if(!allowed.has(criterion.id))return null;
 if(!part||part.marks!==maxMarks||![2,3].includes(maxMarks))
  return {blocked:"source-calc-50-missing-or-changed-part"};
 const source=criterion.sourceMarking??{},answer=String(source.answer??""),
  method=String(source.solution??"");
 if(!method||!answer)return {blocked:"source-calc-50-missing-method"};
 const wrong=answer.includes("/")?"997/991":String(Number(answer)+71.23);
 const canonical={answer,working:method}, methodMarks=maxMarks-1;
 return {kind:"structured",ruleId:"math:source-calc-50",
  sourceAnswer:canonical,
  alternatives:[{answer:altAnswer(part,answer),working:method}],
  fixtures:[
   f("full",canonical,maxMarks,"independently correct source method and result"),
   f("equivalent",{answer:altAnswer(part,answer),working:method},maxMarks,
    "source-equivalent number formatting without changing precision"),
   f("partial",{answer:wrong,working:method},methodMarks,
    "independently source-proven method; incorrect final accuracy"),
   f("partial",{answer:"",working:method},methodMarks,
    "valid method with missing numerical final result"),
   f("incorrect",{answer:"banana",working:""},0,"clearly irrelevant nonnumber"),
   {...f("incorrect",{answer:wrong,working:""},0,
    "wrong bare number cannot establish any method mark"),mustAbstain:true},
   f("blank",{answer:"",working:""},0),
   f("irrelevant",{answer:"not a numerical answer",working:""},0),
   f("competing",{answer:answer+" or "+wrong,working:method},methodMarks,
    "conflicting final numbers lose accuracy credit"),
   f("ceiling",canonical,maxMarks,"original source allocation remains unchanged"),
   {...f("working",{answer,working:""},1,
    "correct final answer without working leaves method provisional"),mustAbstain:true},
   {...f("working",{answer,working:"an alternative valid method"},null,
    "unrecognised working is not scored as incorrect"),mustAbstain:true}
  ]};
}
