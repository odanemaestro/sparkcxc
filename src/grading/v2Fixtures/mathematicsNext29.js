import {MATH_NEXT_29_IDS} from "../v2MathNext29";
const allowed=new Set(MATH_NEXT_29_IDS);
const F=(cls,response,expect,note)=>({cls,response,expect,note});
export function mathematicsNext29Fixtures({criterion,part,maxMarks}){
 if(!allowed.has(criterion.id))return null;
 const source=criterion.sourceMarking??{},checks=source.criteria;
 if(!part||part.marks!==maxMarks||!Array.isArray(checks)||checks.length<1||
  checks.some(c=>!["M","A","B"].includes(c.kind)||c.marks<0||!Number.isInteger(c.marks))||
  checks.reduce((n,c)=>n+c.marks,0)!==maxMarks||
  source.answer!==part.answer||source.solution!==part.solution||
  typeof source.answer!=="string"||!source.answer.trim()||
  typeof source.solution!=="string"||!source.solution.trim())
  return {blocked:"next-29-source-integrity-mismatch"};
 const m=checks.filter(c=>c.kind==="M").reduce((n,c)=>n+c.marks,0);
 const a=source.answer,w=source.solution;
 const full={answer:a,working:w},equiv={answer:"  "+a+"  ",working:"  "+w+"  "};
 const nonmatch={answer:"banana",working:""};
 const fixture=[
  F("full",full,maxMarks,"Registered answer with original worked solution"),
  F("equivalent",equiv,maxMarks,"Space-padded source-equivalent wording"),
  F("incorrect",nonmatch,0,"Clearly irrelevant standalone response"),
  F("blank",{answer:"",working:""},0,"Empty response"),
  F("irrelevant",{answer:"banana",working:""},0,"Unrelated nonmathematical word"),
  F("competing",{answer:a+" or banana",working:w},m,
    "Conflicting final responses lose accuracy marks"),
  F("ceiling",full,maxMarks,"No marks in excess of this source allocation"),
  {...F("working",{answer:a,working:"different independently valid method"},null,
    "Unknown method remains provisional"),mustAbstain:true},
  {...F("working",{answer:"another plausible result",working:""},null,
    "Noncanonical bare result remains provisional"),mustAbstain:true},
  {...F("working",{answer:a,working:""},maxMarks===1&&m===0?1:null,
    "Bare answer only decisive for independent one-mark B"),mustAbstain:!(maxMarks===1&&m===0)},
  {...F("competing",{answer:"banana or "+a,working:""},null,
    "No method marks from a contradictory unsupported line"),mustAbstain:true},
  {...F("incorrect",{answer:"other numerical result",working:""},null,
    "Unknown noncanonical numerical result remains provisional"),mustAbstain:true}
 ];
 if(maxMarks>=2){
  fixture.push(F("partial",{answer:"banana",working:w},m,
    "Source method with incorrect final answer"));
  fixture.push(F("partial",{answer:"",working:w},m,
    "Source method without final answer"));
 }
 return {kind:"structured",ruleId:"math:source-next-29",
  sourceAnswer:full,alternatives:[equiv],fixtures:fixture};
}