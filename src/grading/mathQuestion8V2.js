/**
 * Advisory source-specific calibration for original Mathematics Paper 2 Q8.
 *
 * Q8 has four distinct topics across its ten templates. These source-based
 * criteria are NOT authorised final publication marks. In particular, graph
 * evidence and unsupported alternative reasoning remain unresolved.
 */
export const MATH_Q8_SOURCES_V2=Object.freeze({
 "p2-q8-v1":{kind:"vertex",marks:{a:4,b1:2,b2:2,c:2,d:2},
  coefficient:3,h:2,k:8,yIntercept:20,vertex:"3(x-2)^2+8",
  expansion:"3(x^2-4x)+20",square:"(x-2)^2-4"},
 "p2-q8-v2":{kind:"vertex",marks:{a:4,b1:2,b2:2,c:2,d:2},
  coefficient:2,h:-3,k:5,yIntercept:23,vertex:"2(x+3)^2+5",
  expansion:"2(x^2+6x)+23",square:"(x+3)^2-9"},
 "p2-q8-v3":{kind:"vertex",marks:{a:4,b1:2,b2:2,c:2,d:2},
  coefficient:1,h:4,k:-7,yIntercept:9,vertex:"(x-4)^2-7",
  expansion:null,square:"(x-4)^2-16"},
 "p2-q8-v4":{kind:"graph",marks:{a:3,b:3,c:2,d:2,e:2},
  entries:[0,-4,5],minimum:[1,-4],roots:[-1,3],line:2,lineRoots:[-1.4,3.4]},
 "p2-q8-v5":{kind:"graph",marks:{a:3,b:3,c:2,d:2,e:2},
  entries:[0,-8,7],minimum:[1,-9],roots:[-2,4],line:3,lineRoots:[-2.5,4.5]},
 "p2-q8-v6":{kind:"linear",marks:{a:3,b:3,c:2,d:4},
  inequalities:["2x+3y<=60","x>=6","y>=4"],
  vertices:[[6,4],[6,16],[24,4]],profit:[50,60],max:1440,optimal:[24,4]},
 "p2-q8-v7":{kind:"linear",marks:{a:3,b:3,c:2,d:4},
  inequalities:["3x+2y<=72","x>=6","y>=6"],
  vertices:[[6,6],[6,27],[20,6]],profit:[40,30],max:1050,optimal:[6,27]},
 "p2-q8-v8":{kind:"intersection",marks:{a:5,b1:3,b2:4},
  roots:[3.89,-0.39],discriminant:73,
  line:"3x+1",curve:"x^2+2x-5",equation:"x^2-x-6=0",
  points:[[-2,-5],[3,10]],factors:"(x+2)(x-3)=0"},
 "p2-q8-v9":{kind:"intersection",marks:{a:5,b1:3,b2:4},
  roots:[0.18,-1.85],discriminant:37,
  line:"2x-2",curve:"x^2-3x+4",equation:"x^2-5x+6=0",
  points:[[2,2],[3,4]],factors:"(x-2)(x-3)=0"},
 "p2-q8-v10":{kind:"intersection",marks:{a:5,b1:3,b2:4},
  roots:[0.64,-3.14],discriminant:57,
  line:"4x-1",curve:"x^2+x-11",equation:"x^2-3x-10=0",
  points:[[-2,-9],[5,19]],factors:"(x+2)(x-5)=0"}
});
const asText=x=>typeof x==="string"?x:typeof x==="number"&&Number.isFinite(x)?String(x):"";
const field=(r,key)=>r&&typeof r==="object"&&!Array.isArray(r)?asText(r[key]):key==="answer"?asText(r):"";
const norm=x=>asText(x).toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×∗]/g,"*").replace(/≤/g,"<=").replace(/≥/g,">=")
 .replace(/\s+/g,"").replace(/,/g,"");
const number=x=>{
 const s=asText(x).trim().replace(/,/g,"").replace(/[−–—]/g,"-")
  .replace(/^(?:x|y|p|f\(x\))\s*=\s*/i,"").replace(/^\$/,"");
 return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)?Number(s):null;
};
const near=(a,b,t=0.001)=>a!==null&&Number.isFinite(a)&&Math.abs(a-b)<=t;
const vote=(id,okay,reason)=>({id,maxMarks:1,candidateMarks:okay?1:null,
 status:okay?"candidate-correct":"unresolved",
 reason:okay?reason:"requires-verified-source-evidence"});
const unresolved=(id)=>({id,maxMarks:1,candidateMarks:null,status:"unresolved",
 reason:"atomic-rubric-or-graph-evidence-not-yet-verified"});
function tokens(response){
 const raw=field(response,"working");
 if(!raw||/\b(?:or|either|maybe)\b/i.test(raw))return [];
 return norm(raw).split(/[;=\n]/).filter(Boolean);
}
function step(response,pattern){
 const original=field(response,"working");
 if(!original||/\b(?:or|either)\b/i.test(original))return false;
 const needle=norm(pattern),work=norm(original);
 return work.split(/[;\n]/).some(line=>
  line===needle||line.startsWith(needle+"=")||line.endsWith("="+needle)||
  line.includes("="+needle+"=")
 );
}
function values(text){
 const parts=asText(text).trim().split(/[,;\s]+/).filter(Boolean);
 if(!parts.length)return null;
 const result=parts.map(number);
 return result.some(x=>x===null)?null:result;
}
const coordString=pair=>"("+pair[0]+","+pair[1]+")";
function coordinatePairs(text){
 const input=asText(text).trim().replace(/[−–—]/g,"-");
 if(!input||/\b(?:or|either)\b/i.test(input))return null;
 const matches=[...input.matchAll(/\(\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)/g)];
 const rest=input.replace(/\(\s*[+-]?\d+(?:\.\d+)?\s*,\s*[+-]?\d+(?:\.\d+)?\s*\)/g,"")
  .replace(/(?:\b(?:and)\b|[,;\s])/gi,"");
 if(rest||!matches.length)return null;
 return matches.map(m=>[Number(m[1]),Number(m[2])]);
}
const samePair=(a,b)=>a[0]===b[0]&&a[1]===b[1];
function unorderedPairs(input,expected){
 const pairs=coordinatePairs(input);
 return pairs&&pairs.length===expected.length&&
  new Set(pairs.map(coordString)).size===pairs.length&&
  expected.every(e=>pairs.some(p=>samePair(p,e)));
}
function rootAccuracy(input,expected,precision=2){
 // Accept two explicit, separately rounded roots. Distinct source roots
 // have independent A1 candidates: one incorrect root must not erase
 // evidence for the other. Reject duplicated roots or extra guesses.
 const source=asText(input).trim().replace(/[−–—]/g,"-")
  .replace(/\bx\s*=\s*/gi,"").replace(/\band\b/gi,",");
 if(/\b(?:or|either|maybe)\b/i.test(input))
  return expected.map(()=>false);
 const parts=source.split(/[;,]/).map(s=>s.trim());
 if(parts.length!==expected.length||parts.some(s=>!new RegExp(
  "^[+-]?(?:\\d+)\\.\\d{"+precision+"}$").test(s)))
  return expected.map(()=>false);
 const values=parts.map(Number);
 if(new Set(values).size!==values.length)return expected.map(()=>false);
 return expected.map(e=>values.some(n=>near(n,e,0.0001)));
}
function equationsList(answer,source){
 const raw=asText(answer).replace(/[≤≥]/g,x=>x==="≤"?"<=":">=")
  .replace(/[−–—]/g,"-");
 const pieces=raw.split(/[;,\n]/).map(norm).filter(Boolean);
 return pieces.length===3&&pieces.every(x=>source.inequalities.includes(x))
  &&new Set(pieces).size===3;
}
function vertexCriteria(source,partId,response){
 const a=field(response,"answer");
 const n=number(a),w=field(response,"working");
 if(partId==="a"){
  const final=norm(a)===norm(source.vertex)||
   norm(a)==="f(x)="+norm(source.vertex);
  return [vote("M1",!!source.expansion&&step(response,source.expansion),"factor-from-quadratic"),
   vote("M2",step(response,source.square),"complete-square-identity"),
   unresolved("M3"),
   vote("A1",final,"published-completed-square-form")];
 }
 if(partId==="b1")return [unresolved("B-method"),
  vote("A1",near(n,source.k),"minimum-value")];
 if(partId==="b2")return [unresolved("B-method"),
  vote("A1",near(n,source.h),"minimum-abscissa")];
 if(partId==="c")return [unresolved("B-method"),
  vote("A1",norm(a)==="x="+source.h||near(n,source.h),"axis-of-symmetry")];
 if(partId==="d"){
  const pair=coordinatePairs(a);
  return [unresolved("B-method"),
   vote("A1",pair?.length===1&&samePair(pair[0],[0,source.yIntercept]),
    "correct-y-intercept-coordinate")];
 }
 throw new TypeError("Uncalibrated Q8 vertex part");
}
function graphCriteria(source,partId,response){
 if(partId==="a"){
  // Three table blanks are three independent source-specific accuracy items.
  const nums=values(field(response,"answer"));
  return source.entries.map((v,i)=>vote("A"+(i+1),
   !!nums&&nums.length===3&&near(nums[i],v),
   "source-table-entry-"+(i+1)));
 }
 // Drawing a graph and reading points/intersections FROM that graph require
 // validated graphical evidence. Text or a client-supplied graph flag is not
 // a trustworthy renderer/measurement authority.
 return Array.from({length:source.marks[partId]},(_,i)=>unresolved("G"+(i+1)));
}
function linearCriteria(source,partId,response){
 const a=field(response,"answer"),w=field(response,"working");
 if(partId==="a"){
  const raw=a.replace(/[≤≥]/g,x=>x==="≤"?"<=":">=")
   .replace(/[−–—]/g,"-");
  const pieces=raw.split(/[;,\n]/).map(norm).filter(Boolean);
  const unique=pieces.length===3&&new Set(pieces).size===3;
  return source.inequalities.map((x,i)=>vote("B"+(i+1),
   unique&&pieces.includes(x)&&pieces.every(y=>source.inequalities.includes(y)),
   "source-resource-constraint-"+(i+1)));
 }
 if(partId==="b"){
  const coords=coordinatePairs(a);
  const trusted=coords&&coords.length===3&&new Set(coords.map(coordString)).size===3;
  return source.vertices.map((p,i)=>vote("B"+(i+1),
   trusted&&coords.some(c=>samePair(c,p)),"source-feasible-vertex-"+(i+1)));
 }
 if(partId==="c"){
  const expr=source.profit[0]+"x+"+source.profit[1]+"y";
  return [unresolved("M1"),vote("A1",
   norm(a)===expr||norm(a)==="p="+expr,"source-profit-objective")];
 }
 if(partId==="d"){
  const input=norm(a);
  const correctMoney=new RegExp("(?:^|[^\\d])"+source.max+"(?:$|[^\\d])").test(input);
  const win=source.optimal,coordinates=coordinatePairs(a);
  const label=source.profit[0]===50
   ?/(?:^|[^\d])24\s*shirts?\b/i:/(?:^|[^\d])6\s*tables?\b/i;
  const second=source.profit[0]===50
   ?/(?:^|[^\d])4\s*(?:pairs?\s*of\s*)?trousers\b/i
   :/(?:^|[^\d])27\s*chairs?\b/i;
  const correctCounts=(label.test(a)&&second.test(a))||
   (coordinates?.length===1&&samePair(coordinates[0],win));
  const vertexWork=step(response,
   source.profit[0]+"*"+win[0]+"+"+source.profit[1]+"*"+win[1]);
  return [vote("M1",vertexWork,"calculate-objective-at-optimal-vertex"),
   unresolved("M-extra"),vote("A1",correctMoney,"correct-maximum-profit"),
   vote("A2",correctCounts,"correct-production-combination")];
 }
 throw new TypeError("Uncalibrated Q8 linear part");
}
function intersectionCriteria(source,partId,response){
 const a=field(response,"answer");
 if(partId==="a"){
  const each=rootAccuracy(a,source.roots);
  return [unresolved("M1"),unresolved("M2"),
   vote("M3",step(response,"sqrt("+source.discriminant+")"),
    "correct-quadratic-discriminant-root"),
   vote("A1",each[0],"first-rounded-root"),
   vote("A2",each[1],"second-rounded-root")];
 }
 if(partId==="b1"){
  // C9 already requires workings in the assembled authoritative paper. An
  // answer copied directly from the prompt is not derivation evidence.
  const equality=step(response,source.curve+"="+source.line)||
   step(response,source.line+"="+source.curve);
  const collected=equality&&step(response,source.equation);
  const conclusion=norm(a)===norm(source.equation);
  return [vote("M1",equality,"line-curve-equated-in-working"),
   vote("M2",collected,"terms-collected-with-supporting-equality"),
   vote("A1",collected&&conclusion,"derived-published-intersection-equation")];
 }
 if(partId==="b2"){
  const coords=coordinatePairs(a);
  const valid=coords&&coords.length===2&&new Set(coords.map(coordString)).size===2;
  const workFactor=step(response,source.factors);
  return [vote("M1",workFactor,"factor-intersection-quadratic"),
   unresolved("M2"),vote("A1",valid&&coords.some(c=>samePair(c,source.points[0])),
    "first-verified-intersection"),vote("A2",valid&&coords.some(c=>samePair(c,source.points[1])),
    "second-verified-intersection")];
 }
 throw new TypeError("Uncalibrated Q8 intersection part");
}
export function evaluateMathQ8V2({questionId,partId,response={}}={}){
 const source=MATH_Q8_SOURCES_V2[questionId];
 if(!source||!Object.prototype.hasOwnProperty.call(source.marks,partId))
  throw new TypeError("Uncalibrated Mathematics Question 8 source");
 const criteria=source.kind==="vertex"?vertexCriteria(source,partId,response)
  :source.kind==="graph"?graphCriteria(source,partId,response)
  :source.kind==="linear"?linearCriteria(source,partId,response)
  :intersectionCriteria(source,partId,response);
 const expected=source.marks[partId];
 if(criteria.reduce((n,c)=>n+c.maxMarks,0)!==expected)
  throw new Error("Q8 proposed criteria exceed source marks");
 return {sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
  rubricAllocation:"proposed-from-worked-solution",criteria,
  suggestedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks===null?c.maxMarks:0),0)};
}
