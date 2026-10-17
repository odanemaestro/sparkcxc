// Conservative automatic award of ONLY an explicit correct arithmetic-result mark.
// All other POB Paper 2 criterion marks remain unresolved until calibrated
// subject-aware marking can distinguish valid alternative explanations.
import {inspectPobCalculationEvidence} from "./pobCalculationFeedback";
const P="POB-SPARK-P2-ORIGINAL-01-Q";
const rules=Object.freeze({
 [P+"3:a"]:{criterionIndex:2,value:30,unit:/\b(?:bottles?)\s*(?:\/|per|each)\s*(?:labour\s*)?hours?\b/i},
 [P+"3:c"]:{criterionIndex:2,value:120,unit:/\b(?:per|\/)\s*(?:bottle|unit)\b/i},
 [P+"5:a"]:{criterionIndex:2,value:380000,unit:/\b(?:gross\s+profit|profit)\b/i},
 [P+"5:b"]:{criterionIndex:2,value:120000,unit:/\b(?:net\s+profit|profit)\b/i}
});
const norm=s=>String(s||"").toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g," ").trim();
// Do not award a mark for a correctly copied result if it is explicitly denied,
// presented as an error, or accompanied by contradictory asserted totals.
const NEGATED_RESULT=/(?:\bnot\s+(?:equal\s+to\s+|is\s+|the\s+answer\s+)?|\bincorrect\s+(?:is\s+)?|\bwrong\s+(?:is\s+)?|\bshould\s+not\s+be\s+)$/i;
const TOKEN=/\b(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?\b/g;
const asNum=v=>Number(v.replace(/,/g,""));
const equals=(a,b)=>Number.isFinite(a)&&Math.abs(a-b)<1e-9;
export function gradePobCalculationResultPart(partKey,response){
 const rule=rules[partKey];
 if(!rule)return null;
 const text=norm(response);
 if(!text)return {partKey,assessedCriterionMarks:0,criterionIndex:rule.criterionIndex,reason:"blank",source:"strict-calculation-result-v1"};
 const evidence=inspectPobCalculationEvidence(partKey,response);
 if(!evidence?.expectedOperationShown||!evidence.finalResultRecognised)
   return {partKey,assessedCriterionMarks:null,criterionIndex:rule.criterionIndex,reason:"method-and-result-not-both-confirmed",source:"strict-calculation-result-v1"};
 if(!rule.unit.test(text))return {partKey,assessedCriterionMarks:null,criterionIndex:rule.criterionIndex,reason:"unit-or-result-label-not-confirmed",source:"strict-calculation-result-v1"};
 const matches=[...text.matchAll(TOKEN)];
 const final=[...text.matchAll(/(?:final\s+answer|answer\s+is|answer:|thus|therefore|=)\s*(?:is\s*)?(?:j\$|\$)?\s*([\d,]+(?:\.\d+)?)/gi)];
 const claimed=final.length?asNum(final[final.length-1][1]):null;
 if(claimed===null||!equals(claimed,rule.value))
   return {partKey,assessedCriterionMarks:null,criterionIndex:rule.criterionIndex,reason:"explicit-final-result-required",source:"strict-calculation-result-v1"};
 const finalIdx=final[final.length-1].index;
 if(NEGATED_RESULT.test(text.slice(Math.max(0,finalIdx-52),finalIdx)))
   return {partKey,assessedCriterionMarks:null,criterionIndex:rule.criterionIndex,reason:"negated-answer",source:"strict-calculation-result-v1"};
 // Require the final result to be the final numeric claim; an unlabelled
 // contradictory number after it invalidates reliable automatic assessment.
 const lastNumber=matches[matches.length-1];
 if(lastNumber&&lastNumber.index>finalIdx&&!equals(asNum(lastNumber[0]),rule.value))
   return {partKey,assessedCriterionMarks:null,criterionIndex:rule.criterionIndex,reason:"contradictory-later-number",source:"strict-calculation-result-v1"};
 return {partKey,assessedCriterionMarks:1,criterionIndex:rule.criterionIndex,
   reason:"explicit-operation-correct-final-and-context-label",source:"strict-calculation-result-v1"};
}
export const POB_DETERMINISTIC_CALC_KEYS=Object.freeze(Object.keys(rules));
