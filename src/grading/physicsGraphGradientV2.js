/**
 * Advisory calibration for Physics Paper 2 Practice 1 Q1(c) and Q1(d).
 * The graph plots P against (1/V) x 10^-2, so its on-screen slope is ~24
 * whereas the physical gradient is ~2400 kPa cm^3.
 * Neither text alone nor an earlier graph line proves the candidate drew
 * a half-length gradient triangle or read a value from the plotted line.
 */
const SUPER=Object.freeze({"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5",
 "⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-","⁺":"+"});
function tidy(v) {
 if(typeof v!=="string"&&typeof v!=="number")return "";
 return String(v).trim().toLowerCase()
  .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g,c=>SUPER[c])
  .replace(/[−–—]/g,"-").replace(/×/g,"x").replace(/\*/g,"x")
  .replace(/,/g,"").replace(/\s+/g,"")
  .replace(/(\d+(?:\.\d+)?)x10\^?([+-]?\d+)/g,"$1e$2")
  .replace(/\^(-?\d+)/g,"$1");
}
function numericUnit(answer, prefix, units){
 const s=tidy(answer).replace(prefix,"");
 const m=/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(.*)$/.exec(s);
 if(!m)return null;
 const value=Number(m[1]);
 if(!Number.isFinite(value))return null;
 const unit=units.includes(m[2])?m[2]:null;
 return {value,unit};
}
const gradientUnit=u=>u==="kpacm3"||u==="kpa/cm-3";
const candidate=(id,maxMarks,award,reason)=>({
 id,maxMarks,candidateMarks:award?maxMarks:null,
 status:award?"candidate-correct":"unresolved",
 reason:award?reason:"insufficient-source-evidence"
});
function envelope(criteria,sourcePart){
 return {authority:"advisory",publishable:false,sourcePart,criteria,
  suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?c.maxMarks:0),0)};
}
export function evaluatePhysicsGraphGradient({response={}}={}){
 const quantity=numericUnit(response?.answer??"",/^(?:gradient|grad)(?:=|:)/,["kpacm3","kpa/cm-3",""]);
 const numeric=quantity!==null&&quantity.value>=2300&&quantity.value<=2500;
 const unit=quantity!==null&&gradientUnit(quantity.unit);
 return envelope([
  // This requires a drawn triangle using at least half the line's length.
  // Q1(c) only saves text, not triangle geometry; never infer its 2 marks.
  candidate("M1",2,false,""),
  candidate("A1",1,numeric,"source-accepted-gradient-range"),
  candidate("B1",1,unit,"source-accepted-gradient-unit")
 ],"phy-p2-1-q1::c");
}
export function evaluatePhysicsGraphPressure({response={},previousGradientResponse={}}={}){
 const quantity=numericUnit(response?.answer??"",/^(?:pressure|p|answer)(?:=|:)/,["kpa"]);
 const previous=numericUnit(previousGradientResponse?.answer??"",/^(?:gradient|grad)(?:=|:)/,["kpacm3","kpa/cm-3",""]);
 const previousValid=previous!==null&&gradientUnit(previous.unit)&&previous.value>0;
 const direct=quantity!==null&&quantity.unit==="kpa"&&quantity.value>=128&&quantity.value<=138;
 const followThrough=quantity!==null&&quantity.unit==="kpa"&&previousValid&&
  Math.abs(quantity.value-previous.value/18)<=Math.max(0.5,Math.abs(previous.value/18)*0.02);
 const working=tidy(response?.working??"");
 const inversion=working.match(/1\/18(?:\.0+)?=([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)/);
 const inv=inversion?Number(inversion[1]):null;
 const correctInverse=inv!==null&&Number.isFinite(inv)&&Math.abs(inv-1/18)<=0.0006;
 const division=working.match(/(\d+(?:\.\d+)?)\/18(?:\.0+)?(?:=|$)/);
 const dividend=division?Number(division[1]):null;
 const sourceOrFollow=dividend!==null&&
  (Math.abs(dividend-2400)<=1||(previousValid&&Math.abs(dividend-previous.value)<=1));
 // The marking note permits P=2400/18 instead of an explicit inverse
 // calculation, but never claims this is an actual graph reading.
 const method=correctInverse||sourceOrFollow&&(direct||followThrough);
 return envelope([
  candidate("M1",1,method,"supported-inverse-volume-or-division"),
  candidate("M2",1,false,""), // No graph-reading trace is stored for Q1(d).
  candidate("A1",1,direct||followThrough,
   followThrough&&!direct?"supported-earlier-gradient-follow-through":"source-accepted-pressure-range")
 ],"phy-p2-1-q1::d");
}
