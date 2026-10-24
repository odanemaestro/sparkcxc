/**
 * Source-specific evidence readiness for the three remaining historical items.
 * This checks input completeness only. Student-drawn geometry, correctness of
 * leader-line targets and physical measurements still need independent review.
 */
import {biologicalDrawingSource,readBiologicalDrawingEvidence} from "./ScienceBiologicalDrawingEvidence";
import {magnificationArithmeticEvidence,readMagnificationEvidence} from "./ScienceDrawingMagnificationEvidence";

const isPositive=n=>/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(String(n||"").trim())&&Number(n)>0;
const checkDrawing=(base,source,responses)=>{
 const v=readBiologicalDrawingEvidence(responses[base+":biologicalEvidence"],source);
 const hasStrokes=(()=>{try{const a=JSON.parse(responses[base+":strokes"]||"[]");return Array.isArray(a)&&a.some(s=>Array.isArray(s)&&s.length>=2);}catch{return false;}})();
 const names=new Set(v.labels.map(l=>l.name));
 const minLabels=source.dimension==="width"?3:6;
 const checks={
  drawn:hasStrokes,
  title:v.title.trim().length>=5,
  leaderLines:v.labels.length>=minLabels&&names.size>=minLabels,
  drawingMeasurement:isPositive(v.measurementMm)
 };
 return {criterionId:base,checks,readyForVisualReview:Object.values(checks).every(Boolean),
  sourceApproved:false,reason:"independent-drawing-geometry-and-label-target-verification-required"};
};
export function biologicalSourceEvidenceReadiness(questionId,partIndex,itemIndex,responses={}){
 const base=questionId+":"+partIndex+":"+itemIndex;
 const source=biologicalDrawingSource(questionId,partIndex,itemIndex);
 if(source)return checkDrawing(base,source,responses);
 if(base==="IS-M1-P2-27:0:1"){
  const fields=readMagnificationEvidence(base,responses);
  const drawing=readBiologicalDrawingEvidence(responses["IS-M1-P2-27:0:0:biologicalEvidence"],
   biologicalDrawingSource("IS-M1-P2-27",0,0));
  const arith=magnificationArithmeticEvidence(fields);
  const checks={flowerDrawingMeasured:isPositive(drawing.measurementMm),
   drawingHeightMatches:Number(fields.drawingHeightMm)>0&&Number(fields.drawingHeightMm)===Number(drawing.measurementMm),
   workingMatchesStudentValues:arith.consistent};
  return {criterionId:base,checks,readyForVisualReview:Object.values(checks).every(Boolean),
   sourceApproved:false,reason:"physical-drawing-dimension-and-specimen-scale-verification-required"};
 }
 return null;
}
