/**
 * Advisory-only linear programming follow-through for Mathematics Paper 2 Q8.
 *
 * Checks a single mistaken earlier feasible-region vertex carried into a
 * later optimisation decision. Requires the candidate to show a consistent
 * profit substitution and to select the maximum of the three vertices
 * they actually supplied. This is diagnostic review evidence, never an
 * extra mark or automatic final grade.
 */
import {MATH_Q8_SOURCES_V2,evaluateMathQ8V2} from "./mathQuestion8V2";

const text=x=>typeof x==="string"?x:x&&typeof x==="object"&&
 !Array.isArray(x)&&typeof x.answer==="string"?x.answer:"";
const working=x=>x&&typeof x==="object"&&!Array.isArray(x)&&
 typeof x.working==="string"?x.working:"";
const clean=x=>String(x).trim().toLowerCase().replace(/[−–—]/g,"-")
 .replace(/\s+/g,"").replace(/\$/g,"");
const same=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const key=p=>p.join(",");
function parseVertices(value){
 const raw=text(value).trim();
 if(/\b(?:or|either|maybe)\b/i.test(raw))return null;
 const re=/\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)/g;
 const found=[...raw.matchAll(re)];
 if(found.length!==3)return null;
 const rest=raw.replace(re,"").replace(/[;,\s]/g,"");
 if(rest)return null;
 const pairs=found.map(m=>[Number(m[1]),Number(m[2])]);
 return new Set(pairs.map(key)).size===3?pairs:null;
}
function sourceReview(id,response,precedingResponses){
 const source=MATH_Q8_SOURCES_V2[id];
 if(source?.kind!=="linear")return null;
 const vertices=parseVertices(precedingResponses?.b);
 if(!vertices)return null;
 const correct=vertices.filter(p=>source.vertices.some(x=>same(x,p)));
 const wrong=vertices.filter(p=>!source.vertices.some(x=>same(x,p)));
 if(correct.length!==2||wrong.length!==1)return null;
 const chosen=wrong[0];
 if(chosen.some(v=>v<0||v>10000))return null;
 const profit=p=>source.profit[0]*p[0]+source.profit[1]*p[1];
 const calculated=profit(chosen);
 if(!Number.isSafeInteger(calculated)||calculated===source.max||
  !vertices.every(p=>calculated>=profit(p)))return null;
 const left=source.profit[0]+"*"+chosen[0]+"+"+source.profit[1]+"*"+chosen[1];
 const w=clean(working(response));
 if(!w||/\b(?:or|either|maybe|not|incorrect)\b/i.test(working(response)))return null;
 const step=w.split(/[;\n]/).some(line=>line===clean(left+"="+calculated));
 if(!step)return null;
 const [first,second]=chosen;
 const name=id==="p2-q8-v6"?
  first+" shirts and "+second+" pairs of trousers":
  first+" tables and "+second+" chairs";
 const expected=clean(calculated+", from "+name);
 if(clean(text(response))!==expected)return null;
 return {dependency:"b",sourceValue:vertices,computedValue:calculated,
  chosenVertex:chosen,relationship:"source-profit-objective-at-earlier-proposed-vertex"};
}
export function evaluateMathQ8FollowThroughV2({
 questionId,partId,response={},precedingResponses={}
}={}){
 const source=MATH_Q8_SOURCES_V2[questionId];
 if(source?.kind!=="linear"||partId!=="d")
  throw new TypeError("Uncalibrated Mathematics Q8 follow-through source");
 const normal=evaluateMathQ8V2({questionId,partId,response});
 const candidate=sourceReview(questionId,response,precedingResponses);
 return {...normal,authority:"advisory",publishable:false,
  scorePublicationAllowed:false,markTotalsIncludeFollowThrough:false,
  followThrough:{
   authority:"advisory",publishable:false,additiveToScore:false,
   rubricAllocation:"unverified-follow-through-review-only",
   requiresRubricReconciliation:true,
   dependency:candidate?.dependency??null,
   criteria:[{id:"FT-review-1",maxMarks:1,
    candidateMarks:candidate?1:null,
    status:candidate?"candidate-follow-through":"unresolved",
    reason:candidate?.relationship??"no-supported-cross-part-evidence"}],
   suggestedMarks:candidate?1:0,evidence:candidate
  }};
}
