import {SOURCE_NUMERIC_TWO_MARK_IDS} from "../v2OriginalMathNumericWorking";
const F=(cls,response,expect,note)=>({cls,response,expect,note});
const ALLOWED=new Set(SOURCE_NUMERIC_TWO_MARK_IDS);
const wrong=s=>String(Number(String(s).replace(/,/g,""))+7.31);
const alternate=s=>{
 const n=Number(String(s).replace(/,/g,""));
 return String(n);
};
export function mathematicsNumericWorkingFixtures({criterion,part,maxMarks}){
 if(!ALLOWED.has(criterion.id))return null;
 if(maxMarks!==2||!part||typeof part.solution!=="string")
  return {blocked:"source-numeric-structure-mismatch"};
 const source=criterion.sourceMarking??{};
 const answer=String(source.answer??"");
 const solution=String(source.solution??"");
 const incorrect=wrong(answer);
 const full={answer,working:solution};
 return {kind:"structured",ruleId:"math:source-atomic-M1-A1",
  sourceAnswer:full,alternatives:[{answer:alternate(answer),working:solution}],
  fixtures:[
   F("full",full,2,"source-authored method AND numerical result"),
   F("equivalent",{answer:alternate(answer),working:solution},2,
    "equivalent formatting, same independently checked result"),
   F("partial",{answer:incorrect,working:solution},1,
    "source method earns M1 but wrong final loses A1"),
   F("partial",{answer:"",working:solution},1,
    "method-only work earns M1 with no accuracy credit"),
   F("incorrect",{answer:incorrect,working:""},0,"unsupported wrong answer"),
   F("blank",{answer:"",working:""},0),
   F("irrelevant",{answer:"banana",working:""},0),
   F("competing",{answer:answer+" or "+incorrect,working:solution},1,
    "two contradictory final numbers with a source-proven method"),
   F("ceiling",{answer,working:solution},2,
    "source cannot grant more than two existing marks"),
   {...F("working",{answer,working:"a completely different method"},null,
    "unrecognized method remains provisional"),mustAbstain:true},
   {...F("working",{answer,working:""},null,
    "correct final number alone does not establish the M1 method mark"),
    mustAbstain:true}
  ]};
}
