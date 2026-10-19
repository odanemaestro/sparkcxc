/**
 * Source-pinned per-cell evidence for Paper 2 Q5 cumulative frequencies.
 * A partially correct column is NOT proof of an approved partial-mark split.
 * Each cell match is diagnostic information only; it is never an extra mark.
 */
import {MATH_Q5_SOURCES_V2} from "./mathStatisticsProbabilityV2";

const original=(r)=>typeof r==="string"?r:r&&typeof r==="object"&&
 !Array.isArray(r)&&typeof r.answer==="string"?r.answer:"";
const matchSource=(id,partId)=>id==="p2-q5-v4"||id==="p2-q5-v5"
 ?partId==="a":["p2-q5-v1","p2-q5-v2","p2-q5-v3","p2-q5-v10"].includes(id)
  &&partId==="c";
export function inspectMathQ5CumulativeEvidenceV2({questionId,partId,response={}}={}){
 const source=MATH_Q5_SOURCES_V2[questionId];
 if(!source||!Object.prototype.hasOwnProperty.call(source,partId)||
  !matchSource(questionId,partId))
  throw new TypeError("Uncalibrated cumulative-frequency source");
 const [answer,sourceMarks]=source[partId];
 const expected=answer.split(",").map(Number);
 const text=original(response).trim().replace(/[−–—]/g,"-");
 const items=text.split(/[,;\s]+/).filter(Boolean);
 const valid=items.length===expected.length&&items.every(s=>/^\d+$/.test(s));
 const actual=valid?items.map(Number):[];
 const evidence=expected.map((correct,i)=>({
  cell:i+1,sourceValue:correct,
  candidateMatchesSource:valid&&actual[i]===correct,
  // No atomic partial-mark allocation has yet been approved.
  candidateMarks:null,status:"review-only"
 }));
 return {sourcePart:questionId+"::"+partId,
  authority:"advisory",publishable:false,additiveToScore:false,
  markTotalsIncludeCellEvidence:false,requiresRubricReconciliation:true,
  sourceMarks,entryCount:expected.length,validColumnShape:valid,
  matchedCells:evidence.filter(e=>e.candidateMatchesSource).length,
  evidence,suggestedMarks:0,unresolvedMarks:sourceMarks};
}
