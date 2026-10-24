import {THREE_MARK_NUMERIC_IDS} from "../v2OriginalMathThreeMarkNumeric";
const ids=new Set(THREE_MARK_NUMERIC_IDS);
const F=(cls,response,expect,note)=>({cls,response,expect,note});
const alternative=s=>s.includes("/")?s.replace("/"," / "):s.includes(".")?s+"0":s+".0";
export function mathematicsThreeMarkNumericFixtures({criterion,part,maxMarks}){
 if(!ids.has(criterion.id))return null;
 if(maxMarks!==3||part?.marks!==3)return {blocked:"source-MMA-structure-mismatch"};
 const source=criterion.sourceMarking??{},answer=String(source.answer??""),
  solution=String(source.solution??"");
 if(!answer||!solution)return {blocked:"missing-source-MMA-evidence"};
 const wrong=answer.includes("/")?"999/997":String(Number(answer)+37.31);
 const full={answer,working:solution};
 const alternate=/correct to \d+ decimal places?/i.test(part.prompt||"")?" "+answer+" ":alternative(answer);
 return {kind:"structured",ruleId:"math:source-three-mark-MMA",sourceAnswer:full,
  alternatives:[{answer:alternate,working:solution}],
  fixtures:[
   F("full",full,3,"full source-specified method and independently correct answer"),
   F("equivalent",{answer:alternative(answer),working:solution},3,"format-equivalent numeric answer"),
   F("partial",{answer:wrong,working:solution},2,"correct method but wrong final number"),
   F("partial",{answer:"",working:solution},2,"correct method without answer earns M1/M2"),
   F("incorrect",{answer:"banana",working:""},0,"conclusively irrelevant nonnumerical result"),
   {...F("incorrect",{answer:wrong,working:""},0,"incorrect bare number leaves method credit unresolved"),mustAbstain:true},
   F("blank",{answer:"",working:""},0),
   F("irrelevant",{answer:"banana",working:""},0),
   F("competing",{answer:answer+" or "+wrong,working:solution},2,"competing final results lose A1"),
   F("ceiling",full,3,"cannot award more than three marks"),
   {...F("working",{answer:NaN,working:solution},null,"nonfinite payload abstains"),mustAbstain:true},
   {...F("working",{answer,working:"a different legitimate solution method"},null,"unrecognised method abstains"),mustAbstain:true},
   {...F("working",{answer,working:""},null,"bare correct answer does not prove both methods"),mustAbstain:true}
  ]};
}
