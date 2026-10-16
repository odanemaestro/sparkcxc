// Deterministic feedback for calculations in SPARK's original POB Paper 02.
// This checks the final numerical result, not reasoning, units, or full CXC marks.
// Never treat a correct result alone as a graded answer.
export const POB_CALCULATION_TARGETS = Object.freeze({
  "POB-SPARK-P2-ORIGINAL-01-Q3:a": {value:30,unit:"bottles per labour hour",working:"300 ÷ 10 = 30 bottles per labour hour"},
  "POB-SPARK-P2-ORIGINAL-01-Q3:c": {value:120,unit:"J$ per bottle",working:"J$250 − J$130 = J$120 per bottle"},
  "POB-SPARK-P2-ORIGINAL-01-Q5:a": {value:380000,unit:"J$",working:"J$850,000 − J$470,000 = J$380,000"},
  "POB-SPARK-P2-ORIGINAL-01-Q5:b": {value:120000,unit:"J$",working:"J$380,000 − J$260,000 = J$120,000"}
});

// Match complete numbers with optional thousands separators and decimals.
// Do not accidentally match 120 within 120000, or 30 within 300.
const NUMERIC_TOKEN=/(?<![\w.])(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?![\w])/g;
export function checkPobCalculation(partKey,response){
  const target=POB_CALCULATION_TARGETS[partKey];
  if(!target)return null;
  const answer=String(response||"").trim();
  if(!answer)return {status:"unanswered",message:"No calculation entered.",working:target.working};
  const numbers=[...answer.matchAll(NUMERIC_TOKEN)].map(match=>Number(match[0].replace(/,/g,"")));
  const equals=(a,b)=>Number.isFinite(a)&&Math.abs(a-b)<1e-8;
  // An explicitly labelled final answer takes priority over earlier working.
  const labelled=[...answer.matchAll(/(?:final answer|answer is|answer:|therefore|thus)\s*(?:is\s*)?(?:J\$|\$)?\s*([\d,]+(?:\.\d+)?)/gi)];
  const labelledValue=labelled.length?Number(labelled[labelled.length-1][1].replace(/,/g,"")):null;
  // Equations frequently contain earlier arithmetic; use only the last
  // equals-sign result, and only when the number follows the equals sign.
  const equations=[...answer.matchAll(/=\s*(?:J\$|\$)?\s*([\d,]+(?:\.\d+)?)/g)];
  const equationValue=equations.length?Number(equations[equations.length-1][1].replace(/,/g,"")):null;
  const stated=labelledValue!==null?labelledValue:equationValue;
  if(stated!==null&&!equals(stated,target.value)){
    return {status:"review-needed",message:"Your stated result does not match the expected answer. Check your working and final answer.",working:target.working};
  }
  if(stated!==null&&equals(stated,target.value)){
    return {status:"result-found",message:"Expected numerical result found. Your method, explanation and units still require assessment.",working:target.working};
  }
  if(numbers.length===1&&equals(numbers[0],target.value)){
    return {status:"result-found",message:"Expected numerical result found. Your method, explanation and units still require assessment.",working:target.working};
  }
  // More than one unlabelled number is ambiguous. Never assume that an
  // intermediate operand is the intended final answer.
  return {status:"review-needed",message:"A clear matching final result was not identified. Label your final answer and check the working.",working:target.working};
}


// Rubric-linked diagnostic signals, NOT automatically awarded examination marks.
// Each mathematical checkpoint is assessed separately so that an examiner-quality
// feedback engine can distinguish a correct final result from demonstrated method.
export const POB_CALCULATION_RUBRIC_SIGNALS=Object.freeze({
 "POB-SPARK-P2-ORIGINAL-01-Q3:a":Object.freeze({
   operands:[300,10],operation:"/",result:30,
   resultGuidance:"30 bottles per labour hour",methodGuidance:"Show 300 ÷ 10 and define output per labour hour."
 }),
 "POB-SPARK-P2-ORIGINAL-01-Q3:c":Object.freeze({
   operands:[250,130],operation:"-",result:120,
   resultGuidance:"J$120 per bottle",methodGuidance:"State selling price and variable cost, then subtract; contribution covers fixed costs before profit."
 }),
 "POB-SPARK-P2-ORIGINAL-01-Q5:a":Object.freeze({
   operands:[850000,470000],operation:"-",result:380000,
   resultGuidance:"J$380,000 gross profit",methodGuidance:"Identify sales revenue and cost of sales and subtract the latter."
 }),
 "POB-SPARK-P2-ORIGINAL-01-Q5:b":Object.freeze({
   operands:[380000,260000],operation:"-",result:120000,
   resultGuidance:"J$120,000 simplified net profit",methodGuidance:"Deduct operating expenses from gross profit."
 })
});
const numberPattern="(?:\\d{1,3}(?:,\\d{3})+|\\d+)(?:\\.\\d+)?";
const rawToNumber=value=>Number(String(value).replace(/,/g,""));
export function inspectPobCalculationEvidence(partKey,response){
 const signal=POB_CALCULATION_RUBRIC_SIGNALS[partKey];
 if(!signal)return null;
 const answer=String(response||"").trim();
 const result=checkPobCalculation(partKey,answer);
 // Only a complete arithmetical expression counts as visible method evidence.
 // Matching operands in a paragraph without an operation is not proof of method.
 const operation=signal.operation==="/"?String.raw`(?:/|÷)`:String.raw`(?:-|−)`;
 const expr=new RegExp("("+numberPattern+")\\s*"+operation+"\\s*("+numberPattern+")(?![\\w])","g");
 const workingShown=[...answer.matchAll(expr)].some(match=>
   rawToNumber(match[1])===signal.operands[0]&&rawToNumber(match[2])===signal.operands[1]);
 const finalCorrect=result.status==="result-found";
 return {
   status:result.status,
   finalResultRecognised:finalCorrect,
   expectedOperationShown:workingShown,
   resultGuidance:signal.resultGuidance,
   methodGuidance:signal.methodGuidance,
   // A correct result and method together are evidence, not an automatic mark.
   requiresFullRubricReview:true,
   provisionalMarks:null,
   message:result.message
 };
}
