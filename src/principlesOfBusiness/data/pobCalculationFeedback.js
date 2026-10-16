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
const NUMERIC_TOKEN=/(?<![\w.])(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?![\w.])/g;
export function checkPobCalculation(partKey,response){
  const target=POB_CALCULATION_TARGETS[partKey];
  if(!target)return null;
  const answer=String(response||"").trim();
  if(!answer)return {status:"unanswered",message:"No calculation entered.",working:target.working};
  const numbers=[...answer.matchAll(NUMERIC_TOKEN)].map(match=>Number(match[0].replace(/,/g,"")));
  if(numbers.some(number=>Number.isFinite(number)&&Math.abs(number-target.value)<1e-8)){
    return {status:"result-found",message:"Expected numerical result found. Your method, explanation and units still require assessment.",working:target.working};
  }
  return {status:"review-needed",message:"The expected numerical result was not found. Check your working and final answer.",working:target.working};
}
