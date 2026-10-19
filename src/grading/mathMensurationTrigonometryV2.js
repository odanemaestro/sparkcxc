/**
 * SPARK original Mathematics Paper 2 Question 6 (v1-v10).
 *
 * Conservative, source-anchored advisory candidates. The assembled paper
 * (including Q6-v4's R3 reasoning extension) determines each part's marks.
 * The raw paper gives worked answers but not independently verified atomic
 * M/A allocations, so these candidates cannot publish or deny final marks.
 */
const CYLINDERS = Object.freeze({
 "p2-q6-v1":{r:3.5,h:4,rate:5.5,area:38.5,volume:154,curved:88,time:28},
 "p2-q6-v2":{r:7,h:15,rate:21,area:154,volume:2310,curved:660,time:110},
 "p2-q6-v3":{r:10.5,h:8,rate:77,area:346.5,volume:2772,curved:528,time:36}
});
const SECTORS = Object.freeze({
 "p2-q6-v4":{radius:21,angle:120,arc:44,area:462,perimeter:86},
 "p2-q6-v5":{radius:14,angle:90,arc:22,area:154,perimeter:50},
 "p2-q6-v6":{radius:42,angle:60,arc:44,area:924,perimeter:128}
});
const PRISMS = Object.freeze({
 "p2-q6-v7":{base:8,height:6,length:20,edge:10,area:24,volume:480,surface:528},
 "p2-q6-v8":{base:12,height:5,length:25,edge:13,area:30,volume:750,surface:810}
});
const TOWERS = Object.freeze({
 "p2-q6-v9":{distance:48,angle:34,farDistance:68,height:32.4,slant:57.9,farAngle:25},
 "p2-q6-v10":{distance:35,angle:42,farDistance:50,height:31.5,slant:47.1,farAngle:32}
});
export const MATH_Q6_SOURCES_V2=Object.freeze({
 ...Object.fromEntries(Object.entries(CYLINDERS).map(([id,s])=>[id,Object.freeze({
  kind:"cylinder",marks:{a:2,b:3,c:2,d:2},answers:{a:s.area,b:s.volume,c:s.curved,d:s.time},...s
 })])),
 ...Object.fromEntries(Object.entries(SECTORS).map(([id,s])=>[id,Object.freeze({
  kind:"sector",marks:id==="p2-q6-v4"?{a:2,b:3,c:2,d:2}:{a:3,b:3,c:3},
  answers:{a:s.arc,b:s.area,c:s.perimeter},...s
 })])),
 ...Object.fromEntries(Object.entries(PRISMS).map(([id,s])=>[id,Object.freeze({
  kind:"prism",marks:{a:2,b:2,c:2,d:3},
  answers:{a:s.area,b:s.volume,c:s.edge,d:s.surface},...s
 })])),
 ...Object.fromEntries(Object.entries(TOWERS).map(([id,s])=>[id,Object.freeze({
  kind:"tower",marks:{a:3,b:3,c:3},
  answers:{a:s.height,b:s.slant,c:s.farAngle},...s
 })]))
});
const raw=x=>typeof x==="string"?x:typeof x==="number"&&Number.isFinite(x)?String(x):"";
const ans=r=>r&&typeof r==="object"&&!Array.isArray(r)?raw(r.answer):raw(r);
const work=r=>r&&typeof r==="object"&&!Array.isArray(r)?raw(r.working):"";
const norm=x=>raw(x).toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×∗]/g,"*").replace(/÷/g,"/").replace(/π/g,"pi")
 .replace(/[²]/g,"^2").replace(/[³]/g,"^3")
 .replace(/[ \t\r]+/g,"").replace(/,/g,"");
const number=x=>{
 const text=norm(x).replace(/(?:cm\^2|cm\^3|m\^2|m\^3|cm|m|hours?|hrs?|degrees?|°)$/,"");
 if(!/^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text))return null;
 const value=Number(text);
 return Number.isFinite(value)&&value>=0&&value<=1e9?value:null;
};
function exactStep(response,expressions){
 const text=norm(work(response));
 if(!text||/\b(?:or|either)\b/.test(work(response)))return false;
 const tokens=text.split(/[;=\n]/).filter(Boolean);
 return expressions.some(pattern=>tokens.includes(norm(pattern)));
}
const squared=x=>x+"^2";
function methodPatterns(source,partId){
 const s=source;
 if(s.kind==="cylinder"){
  const r=s.r,h=s.h;
  if(partId==="a")return [
   "22/7*"+squared(r),"22/7*("+r+")^2",
   "pi*"+squared(r),"pi*("+r+")^2"
  ];
  if(partId==="b")return [
   s.area+"*"+h,"22/7*"+squared(r)+"*"+h,
   "pi*"+squared(r)+"*"+h
  ];
  if(partId==="c")return [
   "2*22/7*"+r+"*"+h,"2*pi*"+r+"*"+h
  ];
  return [s.volume+"/"+s.rate];
 }
 if(s.kind==="sector"){
  const f=s.angle+"/360",r=s.radius;
  if(partId==="a")return [
   f+"*2*22/7*"+r,f+"*2*pi*"+r,
   "("+f+")*2*22/7*"+r,"("+f+")*2*pi*"+r
  ];
  if(partId==="b")return [
   f+"*22/7*"+squared(r),f+"*pi*"+squared(r),
   "("+f+")*22/7*"+squared(r),"("+f+")*pi*"+squared(r)
  ];
  if(partId==="c")return [
   s.arc+"+2*"+r,s.arc+"+2("+r+")",s.arc+"+"+r+"+"+r
  ];
 }
 if(s.kind==="prism"){
  const b=s.base,h=s.height,l=s.length;
  if(partId==="a")return [
   "1/2*"+b+"*"+h,"0.5*"+b+"*"+h,
   "1/2*"+h+"*"+b
  ];
  if(partId==="b")return [s.area+"*"+l];
  if(partId==="c")return [
   squared(b)+"+"+squared(h),squared(h)+"+"+squared(b),
   "sqrt("+squared(b)+"+"+squared(h)+")",
   "sqrt("+squared(h)+"+"+squared(b)+")"
  ];
  if(partId==="d")return [
   "2*"+s.area+"+("+b+"+"+h+"+"+s.edge+")*"+l,
   "2*"+s.area+"+("+h+"+"+b+"+"+s.edge+")*"+l,
   (2*s.area)+"+"+(b+h+s.edge)+"*"+l
  ];
 }
 if(s.kind==="tower"){
  const d=s.distance,a=s.angle,z=s.farDistance;
  if(partId==="a")return [d+"*tan"+a,d+"*tan("+a+")"];
  if(partId==="b")return [d+"/cos"+a,d+"/cos("+a+")"];
  if(partId==="c")return [
   "atan("+String(Math.round(s.height*100)/100)+"/"+z+")",
   "arctan("+String(Math.round(s.height*100)/100)+"/"+z+")"
  ];
 }
 return [];
}
function vote(id,okay,reason,maxMarks=1){
 return {id,maxMarks,candidateMarks:okay?maxMarks:null,
  status:okay?"candidate-correct":"unresolved",
  reason:okay?reason:"insufficient-source-evidence"};
}
const unresolved=(id,maxMarks,reason)=>({
 id,maxMarks,candidateMarks:null,status:"unresolved",reason
});
function reasoningV4(response){
 const text=(ans(response)+" "+work(response)).toLowerCase();
 const uncertain=/\b(?:or|either|maybe|perhaps|not|isn't|isnt|doesn't|doesnt)\b/.test(text);
 const four=!uncertain&&/\b(?:four|4)\s*(?:times|fold)\b/.test(text)
  &&!/\b(?:twice|double|doubles|half|two\s+times)\b/.test(text);
 const square=!uncertain&&/\b(?:squared?|second\s+power)\b/.test(text)
  &&/\b(?:radius|radii)\b/.test(text)
  &&!/\b(?:linear|directly|inversely)\b/.test(text);
 return [vote("B1",four,"area-increases-by-factor-four"),
  vote("B2",square,"area-varies-with-square-of-radius")];
}
export function evaluateMathQ6V2({questionId,partId,response={}}={}){
 const source=MATH_Q6_SOURCES_V2[questionId];
 if(!source||!Object.prototype.hasOwnProperty.call(source.marks,partId))
  throw new TypeError("Uncalibrated Mathematics Question 6 source");
 let criteria;
 if(questionId==="p2-q6-v4"&&partId==="d"){
  // R3 introduces a separately authored two-mark reasoning question.
  criteria=reasoningV4(response);
 }else{
  const marks=source.marks[partId],value=number(ans(response));
  const expected=source.answers[partId];
  const tol=source.kind==="tower"
   ?(partId==="c"?0.001:0.051):0.011;
  const correct=value!==null&&Math.abs(value-expected)<=tol;
  const method=exactStep(response,methodPatterns(source,partId));
  criteria=[
   ...(marks>2?[unresolved("M-extra",marks-2,
    "atomic-method-allocation-not-source-approved")]:[]),
   ...(marks>1?[vote("M1",method,"source-specific-substitution-or-equation")]:[]),
   vote("A1",correct,"published-numeric-result")
  ];
 }
 return {sourcePart:questionId+"::"+partId,authority:"advisory",
  publishable:false,rubricAllocation:questionId==="p2-q6-v4"&&partId==="d"
   ?"authored-reasoning-criteria":"proposed-from-worked-solution",
  criteria,suggestedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((n,c)=>n+(c.candidateMarks===null?c.maxMarks:0),0)};
}
