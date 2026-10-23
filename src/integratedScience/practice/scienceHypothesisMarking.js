/**
 * Strict deterministic checks for four original Integrated Science hypotheses.
 * Two distinct marks: stated scientific prediction, and testable comparison.
 * Unknown wording remains provisional for later review, never force-approved.
 */
const RULES={
 "IS-M2-P2-07":{terms:/\b(?:copper|iron|alumini?um|metal)s?\b/i,contrast:/\b(?:plastic|wood|non.?metal|insulat\w*)\b/i,effect:/\b(?:conduct\w*|light\w*|lamp|bulb|electric\w*|current)\b/i,negative:/\b(?:not|won't|will not|doesn't|do not|fail|cannot)\b/i},
 "IS-M3-P2-11":{terms:/\b(?:methylated spirit|alcohol|organic solvent)\b/i,contrast:/\b(?:water|acetone|vinegar|other solvents?)\b/i,effect:/\b(?:ink|stain\w*|remov\w*|clean\w*)\b/i,negative:null},
 "IS-M3-P2-13":{terms:/\b(?:dens\w*|liquid)\b/i,contrast:/\b(?:sink|depth|float|submerg|immers)\w*\b/i,effect:/\b(?:less|lower|shallower|higher|more|deep\w*)\b/i,negative:null},
 "IS-M1-P2-15":{terms:/\b(?:bean|seed\w*|germinat\w*)\b/i,contrast:/\b(?:25\s*°?\s*c|4\s*°?\s*c|40\s*°?\s*c|temperature|warm|cold|hot)\b/i,effect:/\b(?:germinat\w*|grow\w*|more|best|most|higher)\b/i,negative:null},
};
const contradicts=(id,text)=>{
 if(/\b(?:no difference|same (?:rate|result|effect)|will not affect|has no effect)\b/i.test(text))return true;
 if(id==="IS-M3-P2-13"&&/\b(?:denser|higher density)\b.{0,55}\b(?:deeper|more deeply|further down)\b/i.test(text))return true;
 if(id==="IS-M1-P2-15"&&/\b(?:4|40)\s*°?\s*c\b.{0,35}\b(?:best|most|highest)\b/i.test(text))return true;
 return false;
};
export function isSourceHypothesis(item){
 const g=String(item?.markScheme?.guidance||"");
 return Number(item?.marks)===2&&/1 mark for a clearly stated hypothesis;?\s*1 mark for a testable hypothesis/i.test(g);
}
export function markSourceHypothesis(questionId,item,response){
 if(!RULES[questionId]||!isSourceHypothesis(item))return null;
 const text=String(response??"").trim();
 const rule=RULES[questionId];
 const prediction=Boolean(text&&rule.terms.test(text)&&rule.effect.test(text)&&!contradicts(questionId,text));
 const testable=prediction&&rule.contrast.test(text)&&(!rule.negative||rule.negative.test(text));
 const score=Number(prediction)+Number(testable);
 return {score,maxMarks:2,unassessedMarks:0,confidence:text?"medium":"high",
  provisional:Boolean(text),criteria:[
   {id:questionId+":prediction",label:"Scientific prediction",marks:Number(prediction),maxMarks:1,earned:prediction,evidence:text},
   {id:questionId+":testable",label:"Testable comparison",marks:Number(testable),maxMarks:1,earned:testable,evidence:text}
  ]};
}
