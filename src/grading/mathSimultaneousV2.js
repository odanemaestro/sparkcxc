/**
 * Advisory-only Mathematics Paper 2 simultaneous-equation evidence.
 * These SPARK Q2 sources have no authored per-step five-mark rubric.
 * Preserve the 5-mark ceiling, but leave three unsourced solution-method
 * marks unresolved rather than claiming a made-up method distribution.
 */
import {asDifference,proportionality} from "../practice/cxcMarking/algebra";
const SPECS=Object.freeze({
 "p2-q2-v9":Object.freeze({equations:["3x+2y=32","5x+4y=58"],x:6,y:7,
  xLabel:"notebook",yLabel:"pen",total:71}),
 "p2-q2-v10":Object.freeze({equations:["4x+3y=41","2x+5y=45"],x:5,y:7,
  xLabel:"cup",yLabel:"plate",total:65})
});
const asString=x=>typeof x==="string"?x:typeof x==="number"&&Number.isFinite(x)?String(x):"";
const norm=s=>asString(s).replace(/[−–—]/g,"-").replace(/[×*]/g,"x")
 .replace(/\$/g,"").toLowerCase().trim();
const finite=s=>/^[+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)?Number(s):null;
const approx=(x,y)=>x!==null&&Math.abs(x-y)<=0.011;
const vote=(id,maxMarks,yes,reason)=>({id,maxMarks,candidateMarks:yes?maxMarks:null,
 status:yes?"candidate-correct":"unresolved",reason:yes?reason:"insufficient-source-evidence"});
const result=(questionId,partId,criteria)=>({
 sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,rubricAllocation:"proposed-from-worked-solution",
 criteria,suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
 unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?c.maxMarks:0),0)});
function eqEquivalent(raw,expected){
 const a=asDifference(raw),b=asDifference(expected);
 if(!a||!b)return false;
 const proportional=proportionality(a,b);
 return proportional!==null&&Number.isFinite(proportional);
}
function equationEvidence(answer){
 const sentences=norm(answer).split(/[;\n,]/).map(s=>s.trim()).filter(Boolean);
 return sentences.filter(s=>s.includes("="));
}
function parsePair(answer,spec){
 const s=norm(answer);
 if(!s)return null;
 // Accept the bank's coordinate pair, ordered pair or labelled response,
 // but not stray numbers in prose or ambiguous alternative final answers.
 if(/\b(?:or|either|versus)\b/.test(s))return null;
 let m=/^\(?\s*([+]?(?:\d+(?:\.\d*)?|\.\d+))\s*[,;]\s*([+]?(?:\d+(?:\.\d*)?|\.\d+))\s*\)?$/.exec(asString(answer).replace(/\$/g,""));
 if(m)return {x:finite(m[1]),y:finite(m[2])};
 const nameX=spec.xLabel,nameY=spec.yLabel;
 const raw=norm(answer).replace(/[;\n]/g,",");
 // Anchored labelled x and y, with no other text. Values stay associated
 // with the proper variables even if the student reverses their order.
 const v="([+]?(?:\\d+(?:\\.\\d*)?|\\.\\d+))";
 const xPattern=new RegExp("(?:^|,)\\s*(?:x|"+nameX+")\\s*(?:=|:)?\\s*"+v+"\\s*(?=,|$)","g");
 const yPattern=new RegExp("(?:^|,)\\s*(?:y|"+nameY+")\\s*(?:=|:)?\\s*"+v+"\\s*(?=,|$)","g");
 const xs=[...raw.matchAll(xPattern)],ys=[...raw.matchAll(yPattern)];
 if(xs.length!==1||ys.length!==1)return null;
 const left=finite(xs[0][1]),right=finite(ys[0][1]);
 if(left===null||right===null)return null;
 const textLeft=raw.replace(xs[0][0],"").replace(ys[0][0],"").replace(/,/g,"").trim();
 return textLeft?null:{x:left,y:right};
}
function explicitTotalWorking(raw,pair,spec){
 const w=norm(raw).replace(/\s+/g,"");
 const valid=[{x:spec.x,y:spec.y},...(pair?[pair]:[])];
 return valid.some(v=>{
  const x=String(v.x),y=String(v.y);
  return w.includes("6("+x+")+5("+y+")")
    ||w.includes("6x"+x+"+5x"+y)
    ||/(?:^|[^a-z])6x\+5y(?:$|[^a-z])/.test(w);
 });
}
function finalTotal(response){
 const text=norm(response);
 const val=text.replace(/^\$/,"").trim();
 return finite(val);
}
export function evaluateMathSimultaneousV2({
 questionId,partId,response={},previousResponses={}
}={}){
 const spec=SPECS[questionId];
 if(!spec||!["a","b","c"].includes(partId))
  throw new TypeError("Uncalibrated Mathematics simultaneous-equation part");
 const raw=typeof response==="object"&&response!==null&&!Array.isArray(response)
  ?response.answer:response;
 const working=typeof response==="object"&&response!==null&&!Array.isArray(response)
  ?response.working:"";
 if(partId==="a"){
  const equations=equationEvidence(raw);
  const used=new Set();
  const criteria=spec.equations.map((eq,i)=>{
   const found=equations.findIndex((entry,j)=>!used.has(j)&&eqEquivalent(entry,eq));
   if(found>=0)used.add(found);
   return vote("B"+(i+1),1,found>=0,"source-equivalent-equation");
  });
  return result(questionId,partId,criteria);
 }
 if(partId==="b"){
  const pair=parsePair(raw,spec);
  // Source only assigns five total marks; until its steps are individually
  // authored, preserve 3 as unresolved even if x and y are correct.
  const criteria=[
   vote("B1-x",1,pair!==null&&approx(pair.x,spec.x),"correct-first-cost"),
   vote("B2-y",1,pair!==null&&approx(pair.y,spec.y),"correct-second-cost"),
   vote("M-unresolved",3,false,"")
  ];
  return result(questionId,partId,criteria);
 }
 const earlierRaw=previousResponses?.b;
 const earlier=earlierRaw&&typeof earlierRaw==="object"
  ?parsePair(earlierRaw.answer,spec):parsePair(earlierRaw,spec);
 const earlierValid=earlier&&earlier.x>0&&earlier.y>0&&earlier.x<10000&&earlier.y<10000;
 const actual=finalTotal(raw);
 const canonical=approx(actual,spec.total);
 const carry=earlierValid&&approx(actual,6*earlier.x+5*earlier.y);
 const method=explicitTotalWorking(working,earlierValid?earlier:null,spec);
 return result(questionId,partId,[
  vote("M1",1,method,"six-items-plus-five-items"),
  vote("A1",1,canonical||carry,carry&&!canonical?"supported-follow-through":"correct-source-total")
 ]);
}
