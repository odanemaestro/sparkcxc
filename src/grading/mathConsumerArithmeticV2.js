/**
 * Advisory calibration for original SPARK Mathematics P2 p2-q1-v1(b).
 * Checks explicit M/A evidence with source formulas, including ECF from the
 * student's actual preceding response. Never authorises final score release.
 */
const SOURCE_ID="p2-q1-v1";
const asText=v=>typeof v==="string"?v:typeof v==="number"&&Number.isFinite(v)?String(v):"";
function parseValue(raw,{percent=false}={}){
 let text=asText(raw).trim().replace(/,/g,"").replace(/^\$/,"");
 if(percent)text=text.replace(/%$/,"").trim();
 if(!/^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text))return null;
 const value=Number(text);
 return Number.isFinite(value)&&value>=0&&value<=1e9?value:null;
}
const studentAnswer=(response,options)=>parseValue(
 response&&typeof response==="object"&&!Array.isArray(response)?response.answer:response,options);
const studentWorking=response=>response&&typeof response==="object"&&!Array.isArray(response)
 ?asText(response.working):"";
const normalise=s=>asText(s).toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×*]/g,"x").replace(/÷/g,"/").replace(/,/g,"")
 .replace(/\$/g,"").replace(/\s+/g,"");
const nearly=(value,target,tolerance)=>value!==null&&Number.isFinite(target)&&
 Math.abs(value-target)<=tolerance;
const number=v=>String(v);
const operand=v=>number(v)+"(?:\\.0+)?";
const before="(?:^|[^0-9.])",after="(?=$|[^0-9.])";
function operationShown(text,first,op,second){
 const expression=new RegExp(before+operand(first)+op+second+after);
 return expression.test(text);
}
const evidence=(id,okay,why)=>({
 id,maxMarks:1,candidateMarks:okay?1:null,
 status:okay?"candidate-correct":"unresolved",
 reason:okay?why:"insufficient-source-evidence"
});
function wrap(partId,method,accuracy,accuracyReason){
 const criteria=[evidence("M1",method,"method-from-source-equation"),
  evidence("A1",accuracy,accuracyReason)];
 return {sourcePart:SOURCE_ID+"::"+partId,authority:"advisory",
  publishable:false,criteria,
  suggestedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((s,c)=>s+(c.candidateMarks===null?1:0),0)};
}
const prior=response=>{
 const value=studentAnswer(response);
 return value!==null&&value>=0&&value<=10000000?value:null;
};
export function evaluateMathConsumerArithmeticV2({
 questionId=SOURCE_ID,partId,response={},previousResponses={}
}={}){
 if(questionId!==SOURCE_ID||!["b1","b2","b3"].includes(partId))
  throw new TypeError("Uncalibrated Mathematics part");
 // Preserve written sentence boundaries between two calculation steps.
 // "4900-4500=400. 400/4500x100" must not become decimal "400.400".
 const w=normalise(studentWorking(response).replace(/\.\s+(?=\d)/g,";").replace(/\n\s*(?=\d)/g,";"));
 const final=studentAnswer(response,{percent:partId==="b3"});
 if(partId==="b1"){
  const method=operationShown(w,4500,"/","1\\.25")
   ||operationShown(w,4500,"x","100/125");
  return wrap(partId,method,nearly(final,3600,0.01),"correct-cost-price");
 }
 if(partId==="b2"){
  const earlier=prior(previousResponses?.b1);
  const valid=[3600,...(earlier===null?[]:[earlier])];
  const method=valid.some(v=>operationShown(w,v,"x","(?:1\\.4(?:0+)?|140/100)"));
  const canonical=nearly(final,5040,0.01);
  const carried=earlier!==null&&earlier!==3600&&nearly(final,earlier*1.4,0.01);
  return wrap(partId,method,canonical||carried,
   carried&&!canonical?"verified-earlier-cost-follow-through":"correct-new-price");
 }
 const earlier=prior(previousResponses?.b2);
 const valid=[5040,...(earlier===null?[]:[earlier])];
 const method=valid.some(v=>{
  const delta=v-4500;
  const direct=new RegExp(before+"\\(?"+operand(v)+"-4500(?:\\.0+)?\\)?/4500(?:\\.0+)?x100"+after).test(w);
  // A two-step expression is recognised only when its subtraction agrees.
  const twoStep=delta>=0&&operationShown(w,v,"-","4500(?:\\.0+)?="+number(delta))
    &&operationShown(w,delta,"/","4500(?:\\.0+)?x100");
  return direct||twoStep;
 });
 const canonical=nearly(final,12,0.011);
 const carried=earlier!==null&&earlier!==5040&&
  nearly(final,100*(earlier-4500)/4500,0.011);
 return wrap(partId,method,canonical||carried,
  carried&&!canonical?"verified-earlier-price-follow-through":"correct-percentage-increase");
}
