import {getPhysicsGraphWorkingSpec} from "./physicsGraphWorkingSpecsV2";
import {validatePhysicsGradientTriangle} from "./physicsGraphWorkingEvidenceV2";
/**
 * Source-calibrated, advisory checks for gradient questions on Physics Paper 2
 * Practice Papers 2–4. No trusted or published marks are produced.
 */
const SOURCE=Object.freeze({
 "phy-p2-2-q1":Object.freeze({part:"c",range:[3.8,4.2],units:["s2m-1","s2/m"]}),
 "phy-p2-3-q1":Object.freeze({part:"b",range:[4.7,5.3],units:["ohm","ohms","ω","Ω","va-1","v/a"]}),
 "phy-p2-4-q1":Object.freeze({part:"c",range:[0.0095,0.0105],units:["ncm-3","n/cm3"]})
});
const SUPER=Object.freeze({"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4",
 "⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-","⁺":"+"});
function parseGradient(raw){
 if(typeof raw!=="string"&&typeof raw!=="number")return null;
 const text=String(raw).normalize("NFKC")
  .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g,s=>SUPER[s]).replace(/[−–—]/g,"-")
  .replace(/[×*]/g,"x").replace(/,/g,"").replace(/\s+/g,"")
  .replace(/(\d+(?:\.\d+)?)x10\^?([+-]?\d+)/gi,"$1e$2")
  .replace(/\^(-?\d+)/g,"$1").toLowerCase()
  .replace(/^(?:gradient|grad)(?:=|:)/,"");
 const found=/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(.*)$/.exec(text);
 if(!found)return null;
 const value=Number(found[1]);
 return Number.isFinite(value)?{value,unit:found[2]}:null;
}
export function evaluatePhysicsAdditionalGraphGradient({questionId,response={},previousGraphResponse={}}={}){
 const source=SOURCE[questionId],spec=getPhysicsGraphWorkingSpec(questionId);
 if(!source||!spec||source.part!==spec.trianglePart)
  throw new TypeError("Unsupported source-calibrated gradient question");
 const given=parseGradient(response?.answer);
 const numeric=given!==null&&given.value>=source.range[0]&&given.value<=source.range[1];
 const unit=given!==null&&source.units.includes(given.unit);
 const method=validatePhysicsGradientTriangle({questionId,graphResponse:previousGraphResponse,response});
 const criteria=[
  {id:"M1",maxMarks:2,candidateMarks:method?2:null,status:method?"candidate-correct":"unresolved"},
  {id:"A1",maxMarks:1,candidateMarks:numeric?1:null,status:numeric?"candidate-correct":"unresolved"},
  {id:"B1",maxMarks:1,candidateMarks:unit?1:null,status:unit?"candidate-correct":"unresolved"}
 ];
 return {sourcePart:questionId+"::"+source.part,authority:"advisory",publishable:false,criteria,
  suggestedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks===null?c.maxMarks:0),0)};
}
