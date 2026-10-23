/**
 * Source-bound two-mark hypotheses. Do not infer the extra testability mark
 * from keyword overlap, and abstain on statements outside the supported rules.
 */
const HYPOTHESIS_GUIDANCE=/1 mark for a clearly stated hypothesis;?\s*1 mark for a testable hypothesis/i;
const topic=(id,t)=>{
 switch(id){
 case "IS-M2-P2-07":return /\b(?:metals?|copper|iron|alumini?um|plastic|wood)\b/.test(t);
 case "IS-M3-P2-11":return /\b(?:methylated|alcohol|solvent|acetone|vinegar|ink|stain)\b/.test(t);
 case "IS-M3-P2-13":return /\b(?:density|dense|denser|liquid|test tube|sinking)\b/.test(t);
 case "IS-M1-P2-15":return /\b(?:beans?|seeds?|germinat\w*|temperature)\b/.test(t);
 default:return false;
 }
};
const evaluate=(id,t)=>{
 switch(id){
 case "IS-M2-P2-07":{
  const conductor=/\b(?:metal\w*|copper|iron|alumini?um)\b/.test(t)&&
   /\b(?:conduct\w*|light\w*|electric\w*|lamp|bulb)\b/.test(t);
  const insulator=/\b(?:plastic|dry wood|wood|insulat\w*|non.?metal\w*)\b/.test(t);
  const negative=/\b(?:will not|won't|does not|doesn't|cannot|can't|not|fail\w*)\b/.test(t);
  const reversed=/\b(?:metal\w*|copper|iron|alumini?um)\b.{0,28}\b(?:will not|won't|does not|doesn't|cannot|can't|not)\b.{0,20}\bconduct/i.test(t);
  return {prediction:conductor&&!reversed,comparison:conductor&&insulator&&negative&&!reversed,contrary:reversed};
 }
 case "IS-M3-P2-11":{
  const solvent=/\b(?:methylated spirit|alcohol|organic solvent)\b/.test(t);
  const outcome=/\b(?:remov\w*|clean\w*|lift\w*)\b/.test(t)&&/\b(?:ink|stain\w*)\b/.test(t);
  const control=/\b(?:water|acetone|vinegar|other solvents?)\b/.test(t);
  const better=/\b(?:better|more effective\w*|faster|best)\b/.test(t);
  const contrary=/\b(?:methylated spirit|alcohol)\b.{0,60}\b(?:worse|less effective|does not remove|will not remove)\b/.test(t);
  return {prediction:solvent&&outcome&&!contrary,comparison:solvent&&outcome&&control&&better&&!contrary,contrary};
 }
 case "IS-M3-P2-13":{
  const density=/\b(?:denser|density|dense)\b/.test(t);
  const depth=/\b(?:sink\w*|depth|deep\w*|submerg\w*|float\w*)\b/.test(t);
  const direction=/\b(?:less deep\w*|shallower|less far|less deeply|not as deep\w*|sink\w* less|float\w* higher)\b/.test(t);
  const variable=/\b(?:denser|higher density|density increase\w*|more dense)\b/.test(t);
  const contrary=variable&&/\b(?:sink\w* deeper|more deeply|deeper|sink\w* further)\b/.test(t)&&!direction;
  return {prediction:density&&depth&&!contrary,comparison:density&&depth&&variable&&direction&&!contrary,contrary};
 }
 case "IS-M1-P2-15":{
  const seed=/\b(?:beans?|seeds?)\b/.test(t);
  const germination=/\b(?:germinat\w*|sprout\w*)\b/.test(t);
  const target=/\b25\s*°?\s*c\b/.test(t);
  const compare=/\b(?:4|40)\s*°?\s*c\b/.test(t);
  const directional=/\b(?:best|better|more|most|higher|greater)\b/.test(t);
  const contrary=compare&&(/\b(?:4|40)\s*°?\s*c\b.{0,32}\b(?:best|most|highest)\b/.test(t)||
   /\b(?:best|most|highest)\b\s+(?:at|around)\s+(?:4|40)\s*°?\s*c\b/.test(t));
  return {prediction:seed&&germination&&target&&directional&&!contrary,
    comparison:seed&&germination&&target&&compare&&directional&&!contrary,contrary};
 }
 default:return null;
 }
};
export function isSourceHypothesis(item){
 return Number(item?.marks)===2&&HYPOTHESIS_GUIDANCE.test(String(item?.markScheme?.guidance||""));
}
export function markSourceHypothesis(questionId,item,response){
 if(!isSourceHypothesis(item))return null;
 const t=String(response??"").toLowerCase().replace(/\s+/g," ").trim();
 const checks=evaluate(questionId,t);
 if(!checks)return null;
 const unambiguousList=questionId==="IS-M3-P2-11"
  ?t.replace(/\bwater,\s*acetone\s+or\s+vinegar\b/g,"")
  :questionId==="IS-M1-P2-15"
  ?t.replace(/\b4\s*°?\s*c\s+or\s+40\s*°?\s*c\b/g,""):t;
 const ambiguous=/\b(?:or|either|perhaps|maybe|possibly)\b/.test(unambiguousList)||
  /\b(?:it is false that|not true that|is incorrect)\b/.test(t);
 const prediction=checks.prediction&&!ambiguous;
 const comparison=checks.comparison&&prediction;
 const score=Number(prediction)+Number(comparison);
 const recognized=!t||checks.contrary||!topic(questionId,t)||prediction;
 const resolved=recognized&&!ambiguous;
 return {score,maxMarks:2,unassessedMarks:0,confidence:resolved?"high":"low",
  provisional:!resolved,sourceHypothesis:true,sourceResolved:resolved,
  criteria:[
   {id:questionId+":prediction",label:"Scientific prediction",marks:Number(prediction),maxMarks:1,earned:prediction,evidence:t},
   {id:questionId+":testable",label:"Testable comparison",marks:Number(comparison),maxMarks:1,earned:comparison,evidence:t}
  ]};
}
