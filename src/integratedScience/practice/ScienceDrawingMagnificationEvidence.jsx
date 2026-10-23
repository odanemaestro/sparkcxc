import React from "react";

/**
 * Capture the student's own measurements without providing model values,
 * computing an answer, or assuming the browser's CSS pixels are millimetres.
 * The authoritative grader MUST reconcile them with the student's drawing.
 */
export const FLOWER_MAGNIFICATION_ID="IS-M1-P2-27:0:1";

const FIELDS=[
 ["drawingHeightMm","Measured height of your drawing (mm)"],
 ["actualHeightMm","Actual height of the specimen (mm)"],
 ["magnificationWorking","Your working"],
 ["magnificationAnswer","Your magnification (include ×)"]
];

export function readMagnificationEvidence(base,responses={}){
 return Object.fromEntries(FIELDS.map(([key])=>[key,String(responses[base+":"+key]??"")]));
}
export function magnificationEvidenceStatus(values){
 const draw=String(values?.drawingHeightMm??"").trim();
 const actual=String(values?.actualHeightMm??"").trim();
 const working=String(values?.magnificationWorking??"").trim();
 const answer=String(values?.magnificationAnswer??"").trim();
 const numeric=s=>/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(s)&&Number(s)>0&&Number.isFinite(Number(s));
 const validNumbers=numeric(draw)&&numeric(actual);
 // Information for eventual evidence reconciliation only, NOT scoring.
 return {complete:validNumbers&&working.length>0&&answer.length>0,
  hasMeasurements:validNumbers,hasWorking:working.length>0,hasAnswer:answer.length>0};
}

// Arithmetic consistency is useful examiner evidence, but the specimen's
// actual size and the submitted drawing must still be independently checked.
export function magnificationArithmeticEvidence(values){
 const status=magnificationEvidenceStatus(values);
 if(!status.hasMeasurements)return {consistent:false,reviewRequired:true,reason:"missing-measurements"};
 const drawing=Number(values.drawingHeightMm),actual=Number(values.actualHeightMm);
 const expected=drawing/actual;
 const answer=String(values.magnificationAnswer??"").trim().replace(/[×xX]/g,"").trim();
 if(!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(answer))
  return {consistent:false,reviewRequired:true,reason:"invalid-answer"};
 const given=Number(answer);
 const working=String(values.magnificationWorking??"").replace(/,/g,"");
 const hasWorking=working.includes("/")||working.includes("÷")||/divided by/i.test(working);
 const consistent=hasWorking&&Number.isFinite(expected)&&Math.abs(given-expected)<=Math.max(.005,Math.abs(expected)*.005);
 return {consistent,calculatedMagnification:expected,reviewRequired:true,
  reason:consistent?"requires-drawing-and-specimen-check":"arithmetic-or-working-mismatch"};
}

export default function ScienceDrawingMagnificationEvidence({base,responses,onChange,disabled}){
 const values=readMagnificationEvidence(base,responses);
 return <fieldset className="is-p2-magnification-evidence" disabled={disabled}>
  <legend>Measurements from your drawing</legend>
  <p>Record the measurements you used for your own calculation. The numbers in a worked example are not automatically the measurements of your drawing.</p>
  <div className="is-p2-magnification-grid">
   {FIELDS.map(([name,label])=><label key={name}>
    <span>{label}</span>
    <input value={values[name]} inputMode={name.endsWith("Mm")?"decimal":"text"}
     placeholder={name.endsWith("Mm")?"Measured value":name==="magnificationWorking"?"Show your division":"Write your answer"}
     onChange={e=>onChange(base+":"+name,e.target.value)}/>
   </label>)}
  </div>
 </fieldset>;
}
