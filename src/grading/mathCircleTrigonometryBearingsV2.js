/**
 * Source-specific advisory marking for SPARK original Mathematics Paper 2 Q9.
 *
 * Source identity and the assembled 12-mark allocation are mandatory.
 * Suggested M/A/B marks are not authorised examiner allocations and NEVER
 * publish a score. Unknown methods and ambiguous responses remain unresolved.
 */
export const MATH_Q9_SOURCES_V2=Object.freeze({
 "p2-q9-v1":{kind:"circle-bearing",marks:{a1:3,a2:2,b1:3,b2:2,b3:2},
  centre:104,inscribed:52,baseAngle:38,out:40,back:220,second:130,
  firstLeg:90,secondLeg:120,distance:150,bearing:93},
 "p2-q9-v2":{kind:"circle-bearing",marks:{a1:3,a2:2,b1:3,b2:2,b3:2},
  centre:128,inscribed:64,baseAngle:26,out:55,back:235,second:145,
  firstLeg:60,secondLeg:80,distance:100,bearing:108},
 "p2-q9-v3":{kind:"cosine",marks:{a:4,b:4,c:4},
  lk:9,lm:14,angle:68,km:13.5,kmIntermediate:13.51,atK:74,area:58.4},
 "p2-q9-v4":{kind:"cosine",marks:{a:4,b:4,c:4},
  lk:11,lm:15,angle:57,km:12.9,kmIntermediate:12.89,atK:77,area:69.2},
 "p2-q9-v5":{kind:"cosine",marks:{a:4,b:4,c:4},
  lk:8,lm:13,angle:112,km:17.6,kmIntermediate:17.63,atK:43,area:48.2},
 "p2-q9-v6":{kind:"tangent",marks:{a:3,b:3,c:3,d:3},
  tangent:47,angleA:61,angleT:72},
 "p2-q9-v7":{kind:"tangent",marks:{a:3,b:3,c:3,d:3},
  tangent:52,angleA:58,angleT:70},
 "p2-q9-v8":{kind:"navigation",marks:{a:3,b:3,c:3,d:3},
  leg1:60,bearing1:210,leg2:80,bearing2:120,
  qNorth:-52,qEast:-30,rNorth:-91.96,rEast:39.28,distance:100,bearing:157},
 "p2-q9-v9":{kind:"navigation",marks:{a:3,b:3,c:3,d:3},
  leg1:45,bearing1:320,leg2:70,bearing2:50,
  qNorth:34.5,qEast:-28.9,rNorth:79.47,rEast:24.70,distance:83.2,bearing:17},
 "p2-q9-v10":{kind:"navigation",marks:{a:3,b:3,c:3,d:3},
  leg1:90,bearing1:240,leg2:50,bearing2:150,
  qNorth:-45,qEast:-77.9,rNorth:-88.30,rEast:-52.94,distance:103,bearing:211}
});
const raw=x=>typeof x==="string"?x:typeof x==="number"&&Number.isFinite(x)?String(x):"";
const field=(r,key)=>r&&typeof r==="object"&&!Array.isArray(r)?raw(r[key]):key==="answer"?raw(r):"";
const normalise=x=>raw(x).toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×∗]/g,"*").replace(/÷/g,"/").replace(/π/g,"pi")
 .replace(/[²]/g,"^2").replace(/[ \t\r]+/g,"").replace(/,/g,"");
const nonambiguous=x=>!/\b(?:or|either|perhaps|maybe|not|isn't|wasn't|isnt|wasnt)\b/i.test(x);
const vote=(id,good,reason)=>({id,maxMarks:1,candidateMarks:good?1:null,
 status:good?"candidate-correct":"unresolved",
 reason:good?reason:"insufficient-source-evidence"});
const missing=(id,why="source-method-allocation-unverified")=>({
 id,maxMarks:1,candidateMarks:null,status:"unresolved",reason:why
});
const workContains=(r,fragment)=>{
 const s=normalise(field(r,"working")),target=normalise(fragment);
 if(!s||!nonambiguous(field(r,"working"))||!target)return false;
 return s.split(/[;\n]/).some(row=>row===target||
  row.startsWith(target+"=")||row.endsWith("="+target)||row.includes("="+target+"="));
};
function textNumber(x){
 const s=raw(x).trim().replace(/[−–—]/g,"-")
  .replace(/^\s*(?:x|angle\s*[a-z]+)\s*=\s*/i,"")
  .replace(/\s*(?:degrees?|°|km|cm|cm\^2)\s*$/i,"");
 if(!/^[+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return null;
 const n=Number(s);return Number.isFinite(n)?n:null;
}
const measure=(r,target,precision=null)=>{
 const s=field(r,"answer");
 if(!nonambiguous(s))return false;
 const n=textNumber(s);
 if(n===null||Math.abs(n-target)>0.0001)return false;
 if(precision===1){
  const m=/([+-]?\d+)(?:\.(\d+))?/.exec(s);
  return !!m&&m[2]?.length===1;
 }
 if(precision===0)return !/\d\.\d/.test(s);
 return true;
};
const bearingResult=(r,result)=>{
 const ans=field(r,"answer").trim().toLowerCase();
 if(!nonambiguous(ans))return false;
 // CSEC compass bearings are written with three figures (including 017, 093).
 const m=/^(?:bearing\s*(?:of\s*r\s*from\s*p)?\s*(?:is|=|:)?\s*)?(\d{3})\s*(?:°|degrees?)?$/.exec(ans);
 return !!m&&Number(m[1])===result;
};
const includesResult=(r,result)=>{
 const s=field(r,"answer").toLowerCase();
 if(!s||!nonambiguous(s))return false;
 const m=s.match(/\b\d+(?:\.\d+)?\b/);
 return !!m&&Number(m[0])===result;
};
const theory=(r,kind)=>{
 const s=(field(r,"answer")+" "+field(r,"working")).toLowerCase();
 if(!nonambiguous(s))return false;
 if(kind==="centre")return /\bcentre\b/.test(s)&&/\bcircumference\b/.test(s)
  &&/\b(?:twice|double|half)\b/.test(s);
 if(kind==="alternate")return /\balternate\s+segment\b/.test(s)||
  (/\btangent\b/.test(s)&&/\bchord\b/.test(s)
   &&/\b(?:equals?|equal|same)\b/.test(s)&&/\bsegment\b/.test(s));
 if(kind==="isosceles")return /\b(?:isosceles|radii|radii\s+are\s+equal)\b/.test(s)
  &&/\b(?:equal|same|base|isosceles)\b/.test(s);
 if(kind==="radius")return /\btangent\b/.test(s)&&/\b(?:radius|ot)\b/.test(s)
  &&/\b(?:perpendicular|right\s+angle|90\s*(?:degrees|°))\b/.test(s);
 return false;
};
function circleBearing(s,p,r){
 if(p==="a1")return [vote("A1",includesResult(r,s.inscribed),"inscribed-angle"),
  vote("B1",theory(r,"centre"),"centre-is-twice-circumference"),missing("M-extra")];
 if(p==="a2")return [vote("M1",workContains(r,"(180-"+s.centre+")/2"),
  "equal-base-angles-from-radii"),
  vote("A1",measure(r,s.baseAngle),"isosceles-angle")];
 if(p==="b1"){
  // 'Show that 90 degrees' prints the numerical answer in the prompt. The
  // published C9 correction requires calculation of the back bearing and
  // subtraction, not transcription of '90'.
  const back=workContains(r,s.out+"+180="+s.back)||
   workContains(r,s.out+"+180");
  const difference=workContains(r,s.back+"-"+s.second+"=90")||
   workContains(r,s.back+"-"+s.second);
  return [vote("M1",back,"calculated-back-bearing"),
   vote("M2",back&&difference,"deduced-interior-bearing-angle"),
   vote("A1",back&&difference&&includesResult(r,90),"supported-right-angle-result")];
 }
 if(p==="b2")return [vote("M1",
  workContains(r,s.firstLeg+"^2+"+s.secondLeg+"^2")||
  workContains(r,s.secondLeg+"^2+"+s.firstLeg+"^2"),
  "pythagorean-distance"),vote("A1",measure(r,s.distance),"resultant-distance")];
 if(p==="b3")return [vote("M1",
  workContains(r,"atan("+s.secondLeg+"/"+s.firstLeg+")")||
  workContains(r,"tan-1("+s.secondLeg+"/"+s.firstLeg+")")||
  workContains(r,"tan^(-1)("+s.secondLeg+"/"+s.firstLeg+")"),
  "bearing-offset-from-right-triangle"),
  vote("A1",bearingResult(r,s.bearing),"three-figure-bearing-nearest-degree")];
 throw new TypeError("Uncalibrated Q9 circle bearing part");
}
function cosine(s,p,r){
 let expected=s.km,precision=1,pattern;
 if(p==="a")pattern=[
  s.lk+"^2+"+s.lm+"^2-2*"+s.lk+"*"+s.lm+"*cos"+s.angle,
  s.lk+"^2+"+s.lm+"^2-2("+s.lk+")("+s.lm+")cos"+s.angle
 ];
 else if(p==="b"){
  expected=s.atK;precision=0;
  pattern=[
   "("+s.lk+"^2+"+s.kmIntermediate+"^2-"+s.lm+"^2)/(2*"+s.lk+"*"+s.kmIntermediate+")",
   "("+s.lk+"^2+"+s.kmIntermediate+"^2-"+s.lm+"^2)/(2("+s.lk+")("+s.kmIntermediate+"))"
  ];
 }else if(p==="c"){
  expected=s.area;
  pattern=["1/2*"+s.lk+"*"+s.lm+"*sin"+s.angle,
   "0.5*"+s.lk+"*"+s.lm+"*sin"+s.angle,
   "1/2*"+s.lm+"*"+s.lk+"*sin"+s.angle];
 }else throw new TypeError("Uncalibrated Q9 cosine part");
 const method=pattern.some(x=>workContains(r,x));
 return [vote("M1",method,"source-specific-trigonometric-substitution"),
  missing("M2"),missing("M3"),
  vote("A1",measure(r,expected,precision),"correctly-rounded-result")];
}
function tangent(s,p,r){
 if(p==="a"||p==="c")return [
  vote("B1",includesResult(r,p==="a"?s.tangent:s.angleA),"circle-angle"),
  vote("B2",theory(r,"alternate"),"alternate-segment-reason"),
  missing("B-extra")];
 if(p==="b")return [vote("M1",
  workContains(r,"180-"+s.tangent+"-"+s.angleA)||
  workContains(r,"180-("+s.tangent+"+"+s.angleA+")"),
  "triangle-angle-sum"),vote("A1",measure(r,s.angleT),"angle-at-t"),
  missing("M-extra")];
 if(p==="d"){
  const a=(field(r,"answer")+" "+field(r,"working")).toLowerCase();
  const reason=theory(r,"radius");
  const contact=reason&&(/\b(?:contact|touch|tangency)\b/.test(a)||/\bot\b/.test(a));
  return [vote("B1",reason,"radius-perpendicular-to-tangent"),
   vote("B2",contact,"at-point-of-contact"),missing("B-extra")];
 }
 throw new TypeError("Uncalibrated Q9 tangent part");
}
function navigation(s,p,r){
 const signed=s[p==="a"?"qNorth":"qEast"];
 const expected=p==="a"||p==="b"?Math.abs(signed):
  p==="c"?s.distance:s.bearing;
 let formula=false;
 if(p==="a")formula=workContains(r,s.leg1+"*cos"+s.bearing1)||
  workContains(r,s.leg1+"*cos("+s.bearing1+")");
 else if(p==="b")formula=workContains(r,s.leg1+"*sin"+s.bearing1)||
  workContains(r,s.leg1+"*sin("+s.bearing1+")");
 else if(p==="c"){
  formula=workContains(r,"sqrt("+s.leg1+"^2+"+s.leg2+"^2)")||
   workContains(r,s.leg1+"^2+"+s.leg2+"^2")||
   workContains(r,"sqrt("+s.rNorth+"^2+"+s.rEast+"^2)");
 }else if(p==="d"){
  formula=[
   "atan2("+s.rEast+","+s.rNorth+")",
   "arctan2("+s.rEast+","+s.rNorth+")",
   "atan("+s.rEast+"/"+s.rNorth+")",
   "tan-1("+s.rEast+"/"+s.rNorth+")",
   "tan("+s.rEast+"/"+s.rNorth+")"
  ].some(x=>workContains(r,x));
 }else throw new TypeError("Uncalibrated Q9 navigation part");
 const precision=p==="d"?0:1;
 const result=p==="d"?bearingResult(r,expected):measure(r,expected,precision);
 return [vote("M1",formula,"source-direction-or-component-calculation"),
  missing("M-extra"),vote("A1",result,"correctly-rounded-directional-result")];
}
export function evaluateMathQ9V2({questionId,partId,response={}}={}){
 const source=MATH_Q9_SOURCES_V2[questionId];
 if(!source||!Object.prototype.hasOwnProperty.call(source.marks,partId))
  throw new TypeError("Uncalibrated Mathematics Question 9 source");
 const criteria=source.kind==="circle-bearing"?circleBearing(source,partId,response):
  source.kind==="cosine"?cosine(source,partId,response):
  source.kind==="tangent"?tangent(source,partId,response):
  navigation(source,partId,response);
 const allocated=criteria.reduce((n,c)=>n+c.maxMarks,0);
 if(allocated!==source.marks[partId])throw new Error("Q9 source mark allocation mismatch");
 return {sourcePart:questionId+"::"+partId,authority:"advisory",
  publishable:false,rubricAllocation:"proposed-from-worked-solution",
  criteria,suggestedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks===null?c.maxMarks:0),0)};
}
