import {validatePhysicsGradientTriangle} from "./physicsGraphWorkingEvidenceV2";
import {getPhysicsGraphWorkingSpec} from "./physicsGraphWorkingSpecsV2";

/**
 * Each policy is pinned to the original paper's gradient answer and method
 * criterion. The selected triangle is assessed against the candidate's own
 * graph. This evidence is advisory until full rubric review.
 */
export const PHYSICS_GRADIENT_SOURCE_POLICIES=Object.freeze({
 "phy-p2-2-q1":Object.freeze({min:3.8,max:4.2,units:["s2m-1","s2/m","s^2/m","s2m^-1"]}),
 "phy-p2-3-q1":Object.freeze({min:4.7,max:5.3,units:["ω","ohm","ohms","v/a","va-1"]}),
 "phy-p2-4-q1":Object.freeze({min:0.0095,max:0.0105,units:["ncm-3","n/cm3","ncm^-3"]})
});
const superscripts=Object.freeze({"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5",
 "⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-","⁺":"+"});
function parseGradient(answer){
 if(typeof answer!=="string")return null;
 let raw=answer.trim().toLowerCase().replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g,c=>superscripts[c])
  .replace(/\s+/g,"").replace(/[−–—]/g,"-")
  .replace(/^(?:gradient|grad)(?:=|:)/,"");
 const m=/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(.*)$/.exec(raw);
 if(!m)return null;
 const value=Number(m[1]);
 return Number.isFinite(value)?{value,unit:m[2]}:null;
}
const evidence=(id,marks,correct,why)=>({id,maxMarks:marks,
 candidateMarks:correct?marks:null,status:correct?"candidate-correct":"unresolved",
 reason:correct?why:"insufficient-source-evidence"});
export function evaluatePhysicsSourceGradient({questionId,response={},previousGraphResponse={}}={}){
 const spec=getPhysicsGraphWorkingSpec(questionId);
 const policy=PHYSICS_GRADIENT_SOURCE_POLICIES[questionId];
 if(!spec?.trianglePart||!policy)return null;
 const parsed=parseGradient(response?.answer);
 const numeric=!!parsed&&parsed.value>=policy.min&&parsed.value<=policy.max;
 const unit=!!parsed&&policy.units.includes(parsed.unit);
 const triangle=validatePhysicsGradientTriangle({questionId,graphResponse:previousGraphResponse,response});
 const criteria=[
  evidence("M1",2,triangle,"saved-valid-large-gradient-triangle"),
  evidence("A1",1,numeric,"source-accepted-gradient-interval"),
  evidence("B1",1,unit,"source-accepted-gradient-unit")
 ];
 return {authority:"advisory",publishable:false,sourcePart:questionId+"::"+spec.trianglePart,
  criteria,suggestedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks||0),0),
  unresolvedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks===null?c.maxMarks:0),0)};
}
