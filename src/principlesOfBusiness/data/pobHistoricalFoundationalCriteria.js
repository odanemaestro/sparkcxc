/**
 * Exact-source, two-mark definitions on CSEC POB May/June 2005 P2.
 * SPARK authored evidence, not a CXC-published key. Unknown free-form
 * equivalents are unresolved rather than treated as wrong.
 */
export const POB_FOUNDATIONAL_CRITERIA_VERSION="pob-2005-definition-v1";

const PAPER="POB-P2-2005-MJ";
const configs=Object.freeze({
  "Q2:a":{
    expected:"Productivity is productive output per unit of input",
    first:/\b(?:productivity|productive)\b.{0,75}\b(?:output|produced|production)\b.{0,35}\b(?:per|divid(?:e|ed)|relative|to each|for every|\/)\b.{0,42}\b(?:input|labou?r|worker|hour|time|resources?)\b|\b(?:output|production)\s*\/\s*(?:input|worker|labou?r|hours?)\b/i,
    second:/\b(?:output|units?|goods?|items?|products?)\b.{0,48}\b(?:per|each|\/|divided by)\b.{0,25}\b(?:worker|hour|labou?r|input)\b|\b(?:output\s*(?:÷|\/)\s*input|units?\s+(?:produced|made)\s+(?:per|each)\s+(?:worker|hour))\b/i,
    rules:["Defines productivity as output per unit of input.",
      "Provides an output-per-worker/hour measure or formula."],
  },
  "Q2:b":{
    expected:"Capital consists of produced resources used in further production",
    first:/\b(?:capital)\b.{0,100}\b(?:man.made|produced resources?|factor of production|used to produc(?:e|ing)|productive assets?|resources? to produc(?:e|ing))\b/i,
    second:/\b(?:machiner(?:y|ies)|tools?|equipments?|buildings?|factories?|vehicles?|computers?|production lines?)\b/i,
    rules:["Identifies man-made productive resources as capital.",
      "Gives a suitable capital good or productive asset example."],
  },
  "Q3:a":{
    expected:"Supply is the amount sellers are willing and able to offer for sale",
    first:/\b(?:supply|supplied)\b.{0,80}\b(?:sellers?|producers?|suppliers?|firms?|businesses?)\b.{0,60}\b(?:willing|able|offer|sell|market|quantit(?:y|ies))\b|\b(?:sellers?|producers?|suppliers?|firms?)\b.{0,35}\b(?:willing and able|offer for sale|quantit(?:y|ies).*sell)\b/i,
    second:/\b(?:given|certain|specific|particular|specified)\s+price\b.{0,110}\b(?:time|period|date|month|year|day|week)\b|\b(?:time|period|date|month|year|day|week)\b.{0,110}\b(?:given|certain|specific|particular|specified)\s+price\b/i,
    rules:["Defines supply as quantity sellers are willing and able to sell.",
      "Includes a specified price and time period."],
  },
});
const untrue=/\b(?:not|never|no|cannot|can't|isn't|doesn't|don't|without)\b/i;
const contradicts=(key,value)=>{
  if(untrue.test(value))return true;
  if(key==="Q3:a"&&/\b(?:buyers?|consumers?|customers?)\b.{0,35}\b(?:buy|purchase|demand)\b/i.test(value)
      &&!/\b(?:sellers?|producers?|suppliers?)\b/i.test(value))return true;
  if(key==="Q2:a"&&/\b(?:input\s*\/\s*output|labou?r\s*\/\s*output)\b/i.test(value))return true;
  return false;
};
export function getPobFoundationalTask(paperId,partKey){
 return paperId===PAPER?configs[String(partKey)]||null:null;
}
export function gradePobFoundationalPart(paperId,partKey,response){
 const source=getPobFoundationalTask(paperId,partKey);
 if(!source)return null;
 const answer=String(response??"").trim(),blank=!answer;
 const contradictory=contradicts(String(partKey),answer);
 const first=!blank&&!contradictory&&source.first.test(answer);
 const second=first&&source.second.test(answer);
 const confirmedMarks=Number(first)+Number(second);
 const unresolvedMarks=blank?0:2-confirmedMarks;
 return {maximum:2,confirmedMarks,unresolvedMarks,
  assessedMarks:unresolvedMarks===0?confirmedMarks:null,
  status:blank?"unanswered":unresolvedMarks?"requires-rubric-assessment":"criterion-verified",
  rubricVersion:POB_FOUNDATIONAL_CRITERIA_VERSION,
  criteria:source.rules.map((rule,index)=>({
    index,marks:index===0?Number(first):Number(second),
    conceptId:index===0?"definition":"qualification",
    evidence:index===0&&first||index===1&&second?answer:"",
    rule
  }))
 };
}
