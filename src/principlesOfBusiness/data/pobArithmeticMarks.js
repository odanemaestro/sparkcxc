// Exact, defensible rubric awards for four arithmetic parts of the SPARK
// ORIGINAL POB Paper 02. No blanket "right number => full marks": the
// separate method, terminology, units and context criteria must be evidenced.
// Other free-text tasks remain subject to the two-pass semantic marker.
import {checkPobCalculation,inspectPobCalculationEvidence} from "./pobCalculationFeedback";
const PREFIX="POB-SPARK-P2-ORIGINAL-01-Q";
const configs=Object.freeze({
 [PREFIX+"3:a"]:{max:3},
 [PREFIX+"3:c"]:{max:4},
 [PREFIX+"5:a"]:{max:3},
 [PREFIX+"5:b"]:{max:3}
});
const normalize=value=>String(value||"").toLowerCase().replace(/[‘’]/g,"'").replace(/\s+/g," ").trim();
const has=(s,re)=>re.test(s);
const numberSource=(s,n)=>{
 const num=n.toLocaleString("en-US"),raw=String(n);
 return s.includes(num)||new RegExp("(^|[^0-9])"+raw+"(?![0-9])").test(s);
};
const labelled=(text,labels,value)=>{
 // Numerical attribution must be close to the named quantity, not merely
 // present elsewhere in an unrelated list or mismatched calculation.
 const source=normalize(text);
 const labelsNearNumber=labels.some(label=>{
  let at=source.indexOf(label);
  while(at>=0){
   const local=source.slice(Math.max(0,at-20),Math.min(source.length,at+label.length+45));
   if(numberSource(local,value)&&!has(local,/\b(?:not|isn't|incorrect|wrong)\b/))return true;
   at=source.indexOf(label,at+1);
  }
  return false;
 });
 return labelsNearNumber;
};
function matchedCriteria(key,answer){
 const t=normalize(answer);
 const ev=inspectPobCalculationEvidence(key,answer);
 const correct=checkPobCalculation(key,answer)?.status==="result-found";
 const method=Boolean(ev?.expectedOperationShown);
 switch(key){
  case PREFIX+"3:a":return [
   has(t,/\b(?:labour|labor) productivity\b/) && has(t,/\b(?:output|bottles|goods)\b/) && has(t,/\b(?:per|divid|each|unit|hour)\b/),
   method,
   correct&&has(t,/(?:\b30\s*(?:bottles?\s*(?:per|\/|each)\s*(?:labour\s*)?hour|bottles\s*\/\s*(?:labour\s*)?hour)\b)/)
  ];
  case PREFIX+"3:c":return [
   labelled(t,["selling price","sale price","price per bottle"],250),
   labelled(t,["variable cost","variable expense","cost per bottle"],130),
   correct&&method,
   has(t,/(?:\b(?:cover|covers|covering|pay|pays|contribut|goes toward|meet|meets)\b.{0,50}\b(?:fixed costs?|fixed expenses?|overheads?)\b|\b(?:fixed costs?|fixed expenses?|overheads?)\b.{0,50}\b(?:cover|covers|pay|pays)\b)/)&&
    !has(t,/\b(?:not|never|cannot|doesn't)\s+(?:\w+\s+){0,3}(?:cover|covers|meet|pay)\b/)
  ];
  case PREFIX+"5:a":return [
   labelled(t,["revenue","sales income","total sales","sales revenue"],850000),
   labelled(t,["cost of sales","cost of goods sold","cogs"],470000),
   correct&&method
  ];
  case PREFIX+"5:b":return [
   labelled(t,["gross profit"],380000),
   labelled(t,["operating expenses","operating expense","expenses"],260000),
   correct&&method
  ];
  default:return null;
 }
}
export function gradePobArithmeticPart(partKey,response){
 const config=configs[partKey];
 if(!config)return null;
 const answer=String(response||"").trim();
 if(!answer)return {partKey,maxMarks:config.max,marks:0,criterionMarks:Array(config.max).fill(0),
  source:"exact-calculation-rubric-v1",reliable:true};
 const checks=matchedCriteria(partKey,answer);
 if(!checks||checks.length!==config.max)throw new Error("calculation_rubric_shape");
 const criterionMarks=checks.map(ok=>ok?1:0);
 const marks=criterionMarks.reduce((a,b)=>a+b,0);
 return {partKey,maxMarks:config.max,marks,criterionMarks,
  source:"exact-calculation-rubric-v1",reliable:true,
  note:"Only visibly supported numerical/definition/method criteria received deterministic marks; ambiguous free text is not assumed correct."};
}
export const POB_DETERMINISTIC_ARITHMETIC_KEYS=Object.freeze(Object.keys(configs));
