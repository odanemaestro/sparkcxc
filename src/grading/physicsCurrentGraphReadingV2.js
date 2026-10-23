import {validatePhysicsCurrentReading} from "./physicsGraphWorkingEvidenceV2";
const C=(id,met,description)=>({id,maxMarks:1,candidateMarks:met?1:null,
 status:met?"candidate-correct":"unresolved",
 reason:met?description:"insufficient-source-evidence"});
/** Paper 3 Q1(e) is a horizontal read at 1.75 V followed by a vertical
 * projection to the current axis. The recorded coordinate must come from
 * the learner's own graph, never their written assertion alone. */
export function evaluatePhysicsCurrentGraphReading({response={},previousGraphResponse={}}={}){
 const text=String(response.answer??"").trim();
 const match=/^(?:(?:current|i|answer)\s*(?:=|:)\s*)?([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*a$/i.exec(text);
 const value=match?Number(match[1]):null;
 const sourceNumeric=value!==null&&Number.isFinite(value)&&value>=0.33&&value<=0.37;
 const point=response.graphEvidence?.point;
 const graphic=validatePhysicsCurrentReading({graphResponse:previousGraphResponse,
  response,questionId:"phy-p2-3-q1"})&&
  sourceNumeric&&Math.abs(value-point.x)<=0.02;
 const criteria=[
  C("M1",graphic,"recorded-horizontal-read-from-source-graph"),
  C("M2",graphic,"recorded-vertical-projection-to-current-axis"),
  C("A1",sourceNumeric,"source-accepted-current-range-and-unit")
 ];
 return {sourcePart:"phy-p2-3-q1::e",authority:"advisory",publishable:false,criteria,
  suggestedMarks:criteria.reduce((n,x)=>n+(x.candidateMarks||0),0),
  unresolvedMarks:criteria.filter(x=>x.candidateMarks===null).length};
}
