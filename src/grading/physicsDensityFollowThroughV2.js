/**
 * Advisory, source-calibrated Physics Practice 1 Q2(b)(ii) density checker.
 * Follow-through is allowed from the student's saved Q2(b)(i) volume,
 * but only if that earlier answer has an unambiguous supported volume unit.
 *
 * Nothing in this module is trusted evidence or publishes a grade.
 */
const SUPER=Object.freeze({"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4",
 "⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-","⁺":"+"});
const NUMBER=String.raw`[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?`;
const normalise=value=>{
 if(typeof value!=="string"&&typeof value!=="number")return null;
 return String(value).trim().replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g,c=>SUPER[c])
  .replace(/[−–—]/g,"-").replace(/[\s,]/g,"").replace(/[×*]/g,"x")
  .replace(/(\d(?:\.\d*)?)x10\^?([+-]?\d+)/gi,"$1e$2")
  .replace(/\^(-?\d+)/g,"$1").toLowerCase();
};
function quantity(value,kind){
 const source=normalise(value);
 if(!source)return null;
 const match=new RegExp("^("+NUMBER+")(.*)$","i").exec(source);
 if(!match)return null;
 const amount=Number(match[1]);
 if(!Number.isFinite(amount)||amount<=0)return null;
 const suffix=match[2];
 if(kind==="volume"){
  if(suffix==="m3")return amount;
  if(suffix==="cm3")return amount/1000000;
 }else if(kind==="density"){
  if(suffix==="kgm-3"||suffix==="kg/m3")return amount;
  if(suffix==="gcm-3"||suffix==="g/cm3")return amount*1000;
 }
 return null;
}
const near=(a,b)=>Number.isFinite(a)&&Number.isFinite(b)&&b>0
 &&Math.abs(a-b)<=Math.max(1e-12,b*0.02);
const candidate=(id,okay,reason)=>({
 id,maxMarks:1,candidateMarks:okay?1:null,
 status:okay?"candidate-correct":"unresolved",
 reason:okay?reason:"insufficient-evidence"
});
export function evaluatePhysicsDensityFollowThrough({response={},priorVolumeResponse={}}={}){
 const answer=typeof response?.answer==="string"?response.answer:"";
 const working=typeof response?.working==="string"?response.working:"";
 const earlier=typeof priorVolumeResponse?.answer==="string"?priorVolumeResponse.answer:"";
 const earlierVolume=quantity(earlier,"volume");
 const studentDensity=quantity(answer,"density");
 const standard=2700;
 const direct=studentDensity!==null&&near(studentDensity,standard);
 const followThrough=studentDensity!==null&&earlierVolume!==null
  &&near(studentDensity,2.7/earlierVolume);
 const methodText=working.toLowerCase().replace(/\s+/g,"");
 const formula=/(?:density|rho|ρ)=?(?:mass|m)(?:\/|÷)(?:volume|v)\b/.test(methodText)
  ||/(?:mass|m)(?:\/|÷)(?:volume|v)\b/.test(methodText);
 const substitution=methodText.match(/(?:^|[^0-9.])2\.7(?:kg)?(?:\/|÷)([0-9]+(?:\.[0-9]+)?)/);
 const denominator=substitution?Number(substitution[1]):null;
 const substituteCorrect=denominator!==null&&
  (near(denominator,0.001)||(earlierVolume!==null&&near(denominator,earlierVolume)));
 const method=formula||substituteCorrect;
 const accuracy=direct||followThrough;
 const criteria=[
  candidate("M1",method,"density-formula-or-consistent-substitution"),
  candidate("A1",accuracy,followThrough&&!direct?"supported-follow-through":"correct-density-and-unit")
 ];
 return {authority:"advisory",publishable:false,
  sourcePart:"phy-p2-1-q2::bii",criteria,
  suggestedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks===null?c.maxMarks:0),0)
 };
}
