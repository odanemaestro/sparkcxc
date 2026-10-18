/**
 * Advisory Physics Practice 1 Q3(b)(ii) useful-power check.
 * The source explicitly permits 1.5 kW and follow-through from Q3(b)(i).
 * This is calibration evidence, not final grading or independent verification.
 */
const SUPER=Object.freeze({"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4",
 "⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-","⁺":"+"});
const normalized=value=>{
 if(typeof value!=="string"&&typeof value!=="number")return null;
 return String(value).trim().replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g,c=>SUPER[c])
  .replace(/[−–—]/g,"-").replace(/[\s,]/g,"").replace(/[×*]/g,"x")
  .replace(/(\d(?:\.\d*)?)x10\^?([+-]?\d+)/gi,"$1e$2").toLowerCase();
};
const parse=(value,kind)=>{
 const text=normalized(value);
 if(!text)return null;
 const match=text.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(kj|kw|j|w)$/);
 if(!match)return null;
 const num=Number(match[1]),unit=match[2];
 if(!Number.isFinite(num)||num<=0)return null;
 if(kind==="work"&&unit!=="j"&&unit!=="kj")return null;
 if(kind==="power"&&unit!=="w"&&unit!=="kw")return null;
 return num*(unit.startsWith("k")?1000:1);
};
const near=(actual,expected)=>actual!==null&&Number.isFinite(actual)
 &&Number.isFinite(expected)&&expected>0
 &&Math.abs(actual-expected)<=expected*0.02;
export function evaluatePhysicsPumpPower({response={},priorWorkResponse={}}={}){
 const answer=typeof response?.answer==="string"?response.answer:"";
 const working=typeof response?.working==="string"?response.working:"";
 const priorAnswer=typeof priorWorkResponse?.answer==="string"?priorWorkResponse.answer:"";
 const studentPower=parse(answer,"power");
 const priorWork=parse(priorAnswer,"work");
 const direct=near(studentPower,1500);
 const followThrough=priorWork!==null&&near(studentPower,priorWork/40);
 const text=normalized(working)||"";
 const formula=/(?:power|p)=(?:work(?:done)?|energy|e|w)(?:\/|÷)(?:time(?:taken)?|t)\b/.test(text)
  ||/(?:work(?:done)?|energy)(?:\/|÷)(?:time(?:taken)?|t)\b/.test(text);
 const substituted=text.match(/(?:^|[^0-9.])(\d+(?:\.\d+)?)(?:\/|÷)40(?:s)?(?:$|[^0-9.])/);
 const numerator=substituted?Number(substituted[1]):null;
 const method=formula||(numerator!==null&&
   (near(numerator,60000)||(priorWork!==null&&near(numerator,priorWork))));
 const accuracy=direct||followThrough;
 const criteria=[
  {id:"M1",maxMarks:1,candidateMarks:method?1:null,status:method?"candidate-correct":"unresolved"},
  {id:"A1",maxMarks:1,candidateMarks:accuracy?1:null,status:accuracy?"candidate-correct":"unresolved",
   reason:accuracy?(followThrough&&!direct?"supported-follow-through":"correct-power-and-unit"):"insufficient-evidence"}
 ];
 return {authority:"advisory",publishable:false,sourcePart:"phy-p2-1-q3::bii",
  criteria,
  suggestedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks===null?c.maxMarks:0),0)};
}
