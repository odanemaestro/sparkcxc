/**
 * Source-bound provisional examiner for IS-M1-P2-27(a)(ii).
 * Awards distinct METHOD and ANSWER evidence from the student's own flower.
 * Source specimen height and physical drawing scale cannot be certified from
 * browser-entered measurements, so authoritative V2 resolution stays false.
 */
export const FLOWER_SOURCE_MAGNIFICATION_BASE="IS-M1-P2-27:0:1";
const positive=x=>/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(String(x??"").trim())&&Number(x)>0&&Number.isFinite(Number(x));
const close=(a,b)=>Math.abs(a-b)<=Math.max(0.005,Math.abs(b)*0.005);
export function markSourceFlowerMagnification(responses={},base=FLOWER_SOURCE_MAGNIFICATION_BASE){
 if(base!==FLOWER_SOURCE_MAGNIFICATION_BASE)return null;
 const read=k=>String(responses[base+":"+k]??"").trim();
 const drawing=read("drawingHeightMm"),actual=read("actualHeightMm");
 const working=read("magnificationWorking"),answer=read("magnificationAnswer");
 let measured="";
 try{
  const evidence=JSON.parse(responses["IS-M1-P2-27:0:0:biologicalEvidence"]||"{}");
  measured=String(evidence.measurementMm??"").trim();
 }catch{}
 const matchesDrawing=positive(measured)&&positive(drawing)&&close(Number(drawing),Number(measured));
 const hasDimensions=matchesDrawing&&positive(actual);
 const ratio=hasDimensions?Number(drawing)/Number(actual):null;
 const workingText=working.toLowerCase().replace(/÷/g,"/").replace(/\bdivided\s+by\b/g,"/")
  .replace(/^\s*(?:magnification|mag|m)\s*=\s*/,"").replace(/,/g,"").replace(/\s+/g,"");
 const validExpression=workingText.match(/^(\d+(?:\.\d+)?|\.\d+)\/(\d+(?:\.\d+)?|\.\d+)(?:=(\d+(?:\.\d+)?|\.\d+))?$/);
 const methodCorrect=Boolean(hasDimensions&&validExpression&&
  close(Number(validExpression[1]),Number(drawing))&&close(Number(validExpression[2]),Number(actual))&&
  (validExpression[3]===undefined||close(Number(validExpression[3]),ratio)));
 const displayed=answer.match(/^[×xX]\s*(\d+(?:\.\d+)?|\.\d+)$/);
 const answerCorrect=Boolean(hasDimensions&&displayed&&close(Number(displayed[1]),ratio));
 const score=Number(methodCorrect)+Number(answerCorrect);
 const complete=Boolean(matchesDrawing&&hasDimensions&&working&&answer);
 return {score,maxMarks:2,sourceBiological:true,sourceResolved:false,
  provisional:true,confidence:complete?"medium":"low",
  unassessedMarks:2-score,visualEvidenceRequired:true,
  criteria:[
   {id:base+":method",label:"Magnification = measured drawing height / actual height",marks:Number(methodCorrect),maxMarks:1,earned:methodCorrect},
   {id:base+":answer",label:"Calculated magnification with ×",marks:Number(answerCorrect),maxMarks:1,earned:answerCorrect}
  ],
  visualEvidence:{drawingHeightMm:positive(drawing)?Number(drawing):null,
   actualHeightMm:positive(actual)?Number(actual):null,
   matchesDrawing,methodCorrect,answerCorrect,externalPhysicalScaleVerified:false}
 };
}
