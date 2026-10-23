/**
 * Adapted, versioned Integrated Science Paper 2 biology assessment.
 * NOT one of the registered 105-mark CSEC historical Paper 2 rubrics.
 * The three original freehand criteria keep their own source identity and
 * cannot be approved using this separate deterministic response format.
 */
import {guidedDiagramForSource,markGuidedDiagram,markGuidedMagnification} from "./scienceGuidedDiagramMarking";
export const ADAPTED_BIOLOGY_P2_ID="is-p2-adapted-biology-v1";
export const ADAPTED_BIOLOGY_P2_RUBRIC="is-p2-adapted-biology-rubric-v1";
export const ADAPTED_BIOLOGY_P2_QUESTIONS=Object.freeze([
 Object.freeze({id:"stoma-identification",kind:"diagram-labels",sourceId:"IS-M1-P2-21::(b)::(i)",
   title:"Label a stoma and guard cells",maxMarks:4,
   instruction:"Identify the structures marked A to D on the prepared stoma diagram. One mark for each correct label."}),
 Object.freeze({id:"flower-identification",kind:"diagram-labels",sourceId:"IS-M1-P2-27::(a)::(i)",
   title:"Label a longitudinal flower section",maxMarks:6,
   instruction:"Identify the structures marked A to F on the prepared flower section. One mark for each correct label."}),
 Object.freeze({id:"flower-magnification",kind:"given-dimensions",sourceId:"IS-M1-P2-27::(a)::(ii)",
   title:"Calculate magnification",maxMarks:2,
   instruction:"A diagram measures 120 mm in height and the actual specimen is 60 mm. Show your division (one mark) and the correctly written magnification including × (one mark)."})
]);
export const ADAPTED_BIOLOGY_P2_MARKS=ADAPTED_BIOLOGY_P2_QUESTIONS.reduce((a,b)=>a+b.maxMarks,0);
export function gradeAdaptedBiologyPaper2(responses={}){
 const input=responses&&typeof responses==="object"&&!Array.isArray(responses)?responses:{};
 const rows=ADAPTED_BIOLOGY_P2_QUESTIONS.map(question=>{
  let marked;
  if(question.id==="stoma-identification")marked=markGuidedDiagram(guidedDiagramForSource("IS-M1-P2-21",1,0),input[question.id]);
  else if(question.id==="flower-identification")marked=markGuidedDiagram(guidedDiagramForSource("IS-M1-P2-27",0,0),input[question.id]);
  else marked=markGuidedMagnification(input[question.id]);
  return {id:question.id,sourceId:question.sourceId,score:marked.score,
    maxMarks:question.maxMarks,marking:marked,assessmentKind:"adapted-paper2",
    originalSourceCriterionVerified:false};
 });
 const score=rows.reduce((n,r)=>n+r.score,0);
 return {paperId:ADAPTED_BIOLOGY_P2_ID,rubricVersion:ADAPTED_BIOLOGY_P2_RUBRIC,
  score,maxMarks:ADAPTED_BIOLOGY_P2_MARKS,
  percent:Math.round(100*score/ADAPTED_BIOLOGY_P2_MARKS),
  rows,assessmentKind:"adapted-paper2",originalSourceCriterionVerified:false,
  serverAuthoritative:false};
}
