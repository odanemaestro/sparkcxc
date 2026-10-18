/**
 * Advisory only: Chemistry Practice 1–6 Q5(b) charge and copper mass.
 * Criteria mirror SPARK's authored Paper 2 marking scheme. The actual exam
 * stores a single multiline string per item, so input is plain response text.
 * No final score is authorised or published by this module.
 */
const SUP=Object.freeze({"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4",
 "⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-","⁺":"+"});
function normalise(s){
 return String(s??"").toLowerCase()
  .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g,c=>SUP[c])
  .replace(/[−–—]/g,"-").replace(/×/g,"x").replace(/[*,]/g,c=>c==="*"?"x":"")
  .replace(/(\d+(?:\.\d+)?)\s*x\s*10\s*\^?\s*([+-]?\d+)/g,"$1e$2");
}
function compact(s){return normalise(s).replace(/\s+/g,"");}
const val=String.raw`([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)`;
function quantity(s,unit){
 const m=new RegExp("^"+val+"\\s*"+unit+"$","i").exec(normalise(s).trim());
 if(!m)return null;
 const n=Number(m[1]);
 return Number.isFinite(n)&&n>=0?n:null;
}
function finalLine(input){
 const text=String(input??"").trim();
 const declarations=[...text.matchAll(/\b(?:final\s+answer|answer|ans)\s*(?:is\s+|[:=]\s*)([^\n;]+)/gi)];
 if(declarations.length>1)return null;
 let line=declarations.length?declarations[0][1]:
  text.split(/[\n;]/).map(s=>s.trim()).filter(Boolean).at(-1)??"";
 if(/\b(?:or|versus|either)\b/i.test(line))return null;
 line=line.replace(/^\s*(?:charge|q|mass|m)\s*=\s*/i,"").trim();
 // A normal Chemistry textarea contains worked equations: Q=It=...=2880 C
 // or mass=...=0.946 g. The last equality is the declared result.
 if(line.includes("="))line=line.slice(line.lastIndexOf("=")+1);
 return line.replace(/^\s*=\s*/,"").trim();
}
const finalNumber=(raw,unit)=>{
 const line=finalLine(raw);
 return line===null?null:quantity(line,unit);
};
const close=(x,y,t)=>x!==null&&Number.isFinite(x)&&Math.abs(x-y)<=t;
const candidate=(id,ok,why)=>({
 id,maxMarks:1,candidateMarks:ok?1:null,
 status:ok?"candidate-correct":"unresolved",
 reason:ok?why:"insufficient-source-evidence"
});
const result=(sourcePart,criteria)=>({
 sourcePart,authority:"advisory",publishable:false,criteria,
 suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?1:0),0)
});
function sourceIds(paperId,questionId){
 const match=/^CHEM-P2-PRACTICE-([1-6])$/.exec(String(paperId??""));
 if(!match||questionId!=="CHEM-G"+match[1]+"-Q5")
  throw new TypeError("Uncalibrated Chemistry electrolysis source");
}
function candidateCharges(previous){
 const correct=2880;
 const prior=finalNumber(previous,"c");
 return prior!==null&&prior>0&&prior<=1000000
  ?{charge:prior,followThrough:!close(prior,correct,0.01)}
  :{charge:correct,followThrough:false};
}
function extractChain(working,denominator){
 // Require a real numeric division and an evaluated quotient, not a
 // coincidental number elsewhere in the submitted answer.
 const pattern=new RegExp(val+"\\s*\\/\\s*"+denominator+"\\s*=\\s*"+val,"gi");
 const hits=[...normalise(working).matchAll(pattern)];
 return hits.map(m=>({numerator:Number(m[1]),result:Number(m[2])}))
  .filter(x=>Number.isFinite(x.numerator)&&Number.isFinite(x.result)&&x.numerator>=0&&x.result>=0);
}
const consistent=(actual,expected)=>close(actual,expected,Math.max(0.000002,Math.abs(expected)*0.002));
const roundedCopperMass=q=>{
 const e=Number((q/96500).toPrecision(3));
 const cu=Number((e/2).toPrecision(3));
 return [q*63.5/(96500*2),cu*63.5];
};
export function evaluateChemistryElectrolysisCharge({paperId,questionId,response=""}={}){
 sourceIds(paperId,questionId);
 const text=compact(response);
 const converted=/32(?:\.0+)?(?:min)?x60(?:=|→)1920(?:s)?/.test(text);
 const ans=finalNumber(response,"c");
 return result(questionId+":b:i",[
  candidate("C1-time-conversion",converted,"32-minute-to-second-conversion"),
  candidate("C2-charge",close(ans,2880,0.001),"correct-charge-and-coulomb-unit")
 ]);
}
export function evaluateChemistryElectrolysisCopperMass({
 paperId,questionId,response="",previousChargeResponse=""
}={}){
 sourceIds(paperId,questionId);
 const text=compact(response),source=candidateCharges(previousChargeResponse);
 const electronChains=extractChain(response,"96500");
 const eChain=electronChains.find(x=>
  (close(x.numerator,2880,0.001)||close(x.numerator,source.charge,0.001))
  &&consistent(x.result,x.numerator/96500));
 const acceptedElectrons=eChain?.result??null;
 const copperChains=extractChain(response,"2");
 const cuChain=copperChains.find(x=>
  (acceptedElectrons!==null&&consistent(x.numerator,acceptedElectrons)
   ||close(x.numerator,0.0298,0.00006))&&consistent(x.result,x.numerator/2));
 const copperMoles=cuChain?.result??null;
 const massPattern=new RegExp(val+"\\s*x\\s*63\\.5(?:\\s*=|$)","gi");
 const massMethods=[...normalise(response).matchAll(massPattern)].map(m=>Number(m[1]));
 const methodMass=massMethods.some(n=>Number.isFinite(n)
  &&((copperMoles!==null&&consistent(n,copperMoles))||close(n,0.0149,0.00004)));
 const actual=finalNumber(response,"g");
 const reference=[0.946,0.947,0.948];
 const direct=actual!==null&&reference.some(n=>close(actual,n,0.00049));
 // Follow-through is candidate evidence ONLY if the earlier response
 // clearly shows a charge and the chain reuses it consistently.
 const followThrough=source.followThrough&&!!eChain&&
  close(eChain.numerator,source.charge,0.001)&&!!cuChain&&methodMass&&
  roundedCopperMass(source.charge).some(expected=>close(actual,expected,0.0015));
 return result(questionId+":b:ii",[
  candidate("C1-electron-moles",!!eChain,"charge-over-faraday-constant"),
  candidate("C2-copper-moles",!!cuChain,"two-electrons-per-copper-ion"),
  candidate("C3-copper-mass-method",methodMass,"copper-moles-times-relative-atomic-mass"),
  candidate("C4-copper-mass-result",direct||followThrough,
   followThrough&&!direct?"candidate-follow-through":"source-accepted-rounded-mass")
 ]);
}
