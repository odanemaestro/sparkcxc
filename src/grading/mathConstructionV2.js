/** Source-specific advisory evidence for SPARK original Mathematics P2 Q3 v9-10.
 * Construction arc and measurement evidence require graphical inspection.
 * Numeric checks never authorise final marks or score publication.
 */
export const MATH_CONSTRUCTION_SOURCES_V2=Object.freeze({
 "p2-q3-v9":Object.freeze({pq:8,qr:6,angle:60,side:7.2,area:20.8}),
 "p2-q3-v10":Object.freeze({pq:9,qr:5,angle:90,side:10.3,area:22.5})
});
const text=x=>typeof x==="string"?x:typeof x==="number"&&Number.isFinite(x)?String(x):"";
const answer=x=>x&&typeof x==="object"&&!Array.isArray(x)?text(x.answer):text(x);
const working=x=>x&&typeof x==="object"&&!Array.isArray(x)?text(x.working):"";
const parsed=x=>{
 const s=text(x).trim().replace(/[−–—]/g,"-");
 const m=/^\s*(\d+(?:\.\d+)?)\s*(?:cm|cm\^2|cm²|square\s+centimetres?)?\s*$/i.exec(s);
 return m&&Number.isFinite(Number(m[1]))?Number(m[1]):null;
};
const vote=(id,good,reason)=>({id,maxMarks:1,candidateMarks:good?1:null,
 status:good?"candidate-correct":"unresolved",
 reason:good?reason:"insufficient-source-evidence"});
const unresolved=(id)=>({id,maxMarks:1,candidateMarks:null,status:"unresolved",
 reason:"requires-graphical-construction-evidence"});
export function evaluateMathConstructionV2({questionId,partId,response={}}={}){
 const source=MATH_CONSTRUCTION_SOURCES_V2[questionId];
 if(!source||!["a","b","c"].includes(partId))throw new TypeError("Uncalibrated Mathematics construction source");
 const a=answer(response),w=working(response),num=parsed(a);
 let criteria;
 if(partId==="a")criteria=["C1","C2","C3","C4"].map(unresolved);
 else if(partId==="b"){
  // This is a measured side, not a request to prove it by calculation.
  criteria=[unresolved("M1"),vote("A1",num!==null&&Math.abs(num-source.side)<0.051,
   "one-decimal-measured-side")];
 }else{
  const compact=w.toLowerCase().replace(/[×∗]/g,"*").replace(/\s+/g,"");
  const base=String(source.pq),height=String(source.qr);
  const halves=[`1/2*${base}*${height}`,`0.5*${base}*${height}`,
   `1/2*${height}*${base}`,`0.5*${height}*${base}`];
  const correctSine=source.angle===90
   ? !/sin\(?60\)?/.test(compact)
   : /sin\(?60(?:°|deg)?\)?/.test(compact);
  // For 60 degrees, the perpendicular height is not QR itself.
  // A bare 1/2 * PQ * QR multiplication cannot evidence the area method.
  const substitution=halves.some(v=>compact.includes(v))
   &&correctSine&&(source.angle===90||/sin\(?60(?:°|deg)?\)?/.test(compact));
  const formula=/1\/2\*?(?:base|b)\*?(?:height|h)|0\.5\*?(?:base|b)\*?(?:height|h)/.test(compact)
   ||/1\/2\*?(?:pq|8|9)\*?(?:qr|6|5)\*?sin/.test(compact);
  criteria=[vote("M1",formula,"triangle-area-formula"),
   vote("M2",substitution,"source-appropriate-angle-and-dimensions"),
   vote("A1",num!==null&&Math.abs(num-source.area)<0.051,"one-decimal-triangle-area")];
 }
 return {sourcePart:questionId+"::"+partId,authority:"advisory",publishable:false,
  rubricAllocation:"proposed-from-worked-solution",criteria,
  suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?1:0),0)};
}
