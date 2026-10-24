import {ORIGINAL_RESIDUAL_48_IDS} from "../v2OriginalMathResidual48";
import {RESIDUAL_ORIGINAL_TABLE_GROUPS} from "../v2OriginalMathResidualTables48";
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
  ["graph","construction","construction_triangle","drawing"]
   .includes(part.responseSchema?.type))
  return {blocked:"residual-original-source-mismatch"};
 const groups=RESIDUAL_ORIGINAL_TABLE_GROUPS[criterion.id];
 if(part.responseSchema?.type==="table"){
  if(!groups||groups.length!==maxMarks)return {blocked:"residual-source-table-mark-groups"};
  const slots=part.responseSchema.rows.flat().filter(c=>c&&typeof c==="object"&&!Array.isArray(c)&&c.key);
  const expected=Object.fromEntries(slots.map(c=>[c.key,String(c.answer)]));
  if(groups.flat().some(k=>!Object.hasOwn(expected,k)))return {blocked:"residual-table-missing-source-cell"};
  const numericEquivalent=Object.fromEntries(slots.map(c=>[c.key,Number(c.answer).toFixed(1)]));
  const erroneous=Object.fromEntries(slots.map(c=>[c.key,String(Number(c.answer)+111)]));
  const first=Object.fromEntries(groups[0].map(k=>[k,expected[k]]));
  const last=Object.fromEntries(groups[groups.length-1].map(k=>[k,expected[k]]));
  const wrongFirst={...first,[groups[0][0]]:String(Number(expected[groups[0][0]])+111)};
  const full={cells:expected};
  return {kind:"structured",ruleId:"math:source-original-keyed-table-48",
   sourceAnswer:full,alternatives:[{cells:numericEquivalent}],
   fixtures:[
    F("full",full,maxMarks,"All answers occupy the correct labelled source cells"),
    F("equivalent",{cells:numericEquivalent},maxMarks,"Equivalent numeric formatting"),
    F("partial",{cells:first},1,"Only first complete source mark group"),
    F("partial",{cells:last},1,"Only last complete source mark group"),
    F("incorrect",{cells:erroneous},0,"Every keyed cell has incorrect value"),
    F("blank",{cells:{}},0,"No submitted table entries"),
    {...F("irrelevant",{answer:"banana"},null,"Unkeyed text cannot earn table marks"),mustAbstain:true},
    {...F("competing",{cells:{...expected,[groups[0][0]]:expected[groups[0][0]]+" or 999"}},null,
      "Contradictory values inside one source cell remain unresolved"),mustAbstain:true},
    {...F("ceiling",{cells:{...expected,unknown:"999"}},null,
      "Extra unsourced cell cannot create any marks"),mustAbstain:true},
    {...F("working",{cells:{},working:"an alternative method"},null,
      "Unsupported response shape stays provisional"),mustAbstain:true},
    F("incorrect",{cells:wrongFirst},0,"Incorrect first required cell denies its group"),
    F("partial",{cells:{...expected,[groups[0][0]]:""}},maxMarks-1,
      "One missing required cell removes its mark without denying other groups")
   ]};
 }
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
