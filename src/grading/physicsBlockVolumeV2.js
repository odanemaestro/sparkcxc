/**
 * Advisory Physics practice 1 Q2(b)(i) volume calibration.
 * Distinguishes method evidence, final answer, and missing units.
 * These are candidate decisions only; no marks are published.
 */
const parse=s=>{
 if(typeof s==="number")return Number.isFinite(s)?s:null;
 if(typeof s!=="string")return null;
 const normalized=s.trim().replace(/×/g,"x").replace(/\s+/g,"");
 const power=normalized.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))x10\^(-?\d+)(?:m³|m3)?$/i);
 if(power)return Number(power[1])*10**Number(power[2]);
 const match=normalized.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?:m³|m3|cm³|cm3)?$/i);
 return match?Number(match[1]):null;
};
export function evaluatePhysicsBlockVolume({answer="",working=""}={}){
 const text=String(working).toLowerCase().replace(/\s+/g,"");
 const converted=/0\.2(?:0)?(?:x|×|\*)0\.1(?:0)?(?:x|×|\*)0\.05(?:0)?/.test(text);
 const centimeterMethod=/20(?:x|×|\*)10(?:x|×|\*)5(?:\.0)?/.test(text)&&/1000/.test(text);
 const numeric=parse(answer);
 const unit=/m³|m3/i.test(String(answer))&&!/cm³|cm3/i.test(String(answer));
 const valid=unit&&numeric!==null&&Math.abs(numeric-0.001)<=0.00000001;
 const method=converted||centimeterMethod;
 return {authority:"advisory",publishable:false,
  criteria:[
   {id:"M1",maxMarks:1,candidateMarks:method?1:null,status:method?"candidate-correct":"unresolved"},
   {id:"A1",maxMarks:1,candidateMarks:valid?1:null,status:valid?"candidate-correct":"unresolved"}
  ],
  suggestedMarks:Number(method)+Number(valid),
  unresolvedMarks:Number(!method)+Number(!valid)
 };
}
