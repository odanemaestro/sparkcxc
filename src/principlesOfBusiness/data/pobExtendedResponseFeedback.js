// Context-aware review prompts for SPARK's original extended-response POB Paper 2.
// These are formative diagnostics, not automatic marks or a substitute for full rubric assessment.
const rules={
 "POB-SPARK-P2-ORIGINAL-01-Q1:e":{
  context:["sauce","bottle","supermarket","friend","expand","finance"],
  choices:[["partnership","partners"],["company","incorporat"],["co-operative","cooperative"]],
  considerations:[["liability","debts","personally responsible"],["capital","funding","loan","finance","investors"],["control","management","decision","ownership"]],
  risks:["Not every business structure offers limited liability; make sure the recommendation and legal reasoning agree."]
 },
 "POB-SPARK-P2-ORIGINAL-01-Q2:c":{
  context:["event","cater","wedding","supplier","staff","delivery"],
  choices:[["unclear responsibilities","unclear duties","conflicting instructions"],["unfair workload","unequal shifts","wages","poor communication"]],
  considerations:[["clarify","role description","meeting","responsibilities"],["negotiate","mediat","grievance","fair process"]],
  risks:["Describe both a cause and a matching response rather than listing unrelated ideas."]
 },
 "POB-SPARK-P2-ORIGINAL-01-Q3:e":{
  context:["drink","bottle","fruit","commuter","customer"],
  choices:[["target market","customers","audience"]],
  considerations:[["packaging","label","flavour","product"],["price","cost","afford"],["distribution","place","supermarket","shop"],["promotion","advertis","sampling"]],
  risks:["Explain how your chosen marketing actions meet the needs of the target customers."]
 },
 "POB-SPARK-P2-ORIGINAL-01-Q4:e":{
  context:["dairy","chilled","storm","shipment","island","distributor"],
  choices:[["tracking","gps","digital record"],["temperature","cold chain","sensor"],["stock","inventory","reorder"]],
  considerations:[["cost","training","internet","connectivity","security","backup","system outage"]],
  risks:["Evaluate a real implementation limitation as well as the potential advantages of ICT."]
 },
 "POB-SPARK-P2-ORIGINAL-01-Q5:e":{
  context:["manufacturer","inventory","stock","computer","business"],
  choices:[["reorder","stock level","inventory tracking"],["accurac","fewer errors","speed","real time"]],
  considerations:[["cost","training","cyber","backup","outage","data loss"]],
  risks:["Identify a real implementation risk and describe a suitable control, not just the benefits."]
 }
};
const normalise=value=>String(value||"").toLowerCase().replace(/\s+/g," ").trim();
const matches=(text,groups)=>groups.filter(group=>group.some(term=>text.includes(term))).length;
export const POB_EXTENDED_FEEDBACK_KEYS=Object.freeze(Object.keys(rules));
export function inspectPobExtendedResponse(key,response){
 const rule=rules[key];
 if(!rule)return null;
 const text=normalise(response);
 if(!text)return {status:"unanswered",marks:null,checks:[],message:"No response entered."};
 const checks=[
  {label:"Relevant business context",seen:matches(text,[rule.context])>0},
  {label:"Distinct business ideas",seen:matches(text,rule.choices)>=Math.min(2,rule.choices.length)},
  {label:"Supporting considerations",seen:matches(text,rule.considerations)>=Math.min(2,rule.considerations.length)},
  {label:"Explanation or justification",seen:/\b(because|therefore|so that|this means|as a result|however|although)\b/.test(text)}
 ];
 return {status:"diagnostic",marks:null,checks,
  message:"These are writing prompts based on possible concepts, not proof of correctness or an assessment score. Valid alternatives and context-sensitive explanations may be missed.",
  guidance:rule.risks[0]};
}
