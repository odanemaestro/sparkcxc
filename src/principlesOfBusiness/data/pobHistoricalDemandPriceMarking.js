/**
 * SPARK-authored marking points aligned with the actual May/June 2005
 * Principles of Business Paper 2 Q3(c) and Q3(d) transcriptions.
 *
 * Marks: three different relevant factors/ways (1 each), and one supported
 * effect consistent with the source question's economic direction (1 each).
 * Unmatched plausible paraphrases remain unresolved, never confirmed wrong.
 * No AI or assertion of an official published CXC marking scheme.
 */
export const POB_DEMAND_PRICE_RUBRIC_VERSION="pob-2005-demand-price-v1";
const PAPER="POB-P2-2005-MJ";
const options=Object.freeze({
 "Q3:c":{
  kind:"demand-decrease",maximum:6,
  concepts:[
   {id:"lower-income",label:"Falling disposable income",name:/\b(?:fall(?:ing)?|drop(?:ping)?|decreas(?:e|ed|ing)|reduc(?:ed|ing)|low(?:er)?)\s+(?:(?:in|of)\s+)?(?:disposable\s+)?(?:family\s+|household\s+|consumer(?:s'?)?\s+)?income\b|\b(?:people|families|households|consumers)\s+(?:have|earn)\s+less\s+(?:money|income)\b/i,
    wrong:/\b(?:rising|higher|increased?|increasing|growing)\s+(?:disposable\s+)?(?:family\s+|household\s+)?income\b/i},
   {id:"health-preference",label:"Changing tastes and health preferences",
    name:/\b(?:health(?:y|ier)?|nutrition(?:al)?|diet(?:ing)?|sugar|fat(?:ty)?|tastes?|preferences?|avoid(?:ing)? sweets?|low.sugar)\b/i},
   {id:"substitutes",label:"Cheaper competing frozen desserts",
    name:/\b(?:cheaper|lower.price|price\s+(?:falls?|drops?|decreases?))\s+(?:(?:frozen|alternative)\s+)?(?:yogh?urt|popsicles?|snow\s*cones?|substitutes?|alternatives?)\b|\b(?:substitutes?|frozen\s+yogh?urt|popsicles?|snow\s*cones?)\s+(?:become|are|is|cost)\s+(?:cheaper|less)\b/i,
    wrong:/\b(?:higher|increas(?:ed|ing)?|more expensive|rising)\s+(?:price\s+(?:of\s+)?)?(?:substitutes?|frozen\s+yogh?urt|popsicles?|snow\s*cones?)\b/i},
   {id:"complements",label:"More expensive complementary products",
    name:/\b(?:higher|rising|increas(?:ed|ing)?|more expensive)\s+(?:(?:price|cost)\s+(?:of\s+)?)?(?:ice.cream\s+)?(?:cones?|toppings?|complements?)\b|\b(?:cones?|toppings?|complements?)\s+(?:become|are|cost)\s+more\b/i,
    wrong:/\b(?:cheaper|lower|falling)\s+(?:(?:price|cost)\s+(?:of\s+)?)?(?:cones?|toppings?|complements?)\b/i},
   {id:"weather",label:"Cool or rainy weather",
    name:/\b(?:cool(?:er)?|cold(?:er)?|rain(?:y|fall)?|wet weather|winter|cool season|cold season)\b/i,
    wrong:/\b(?:hot(?:ter)?|warmer|heatwave|sunny|heat wave)\b/i},
   {id:"publicity",label:"Adverse publicity or fewer advertisements",
    name:/\b(?:bad publicity|negative publicity|health scare|food safety scare|adverse publicity|reduc(?:ed|ing)|less|fewer|cut(?:s|ting)?)\s+(?:advertis(?:ing|ements?)|marketing|promotion|publicity)\b|\b(?:bad publicity|negative publicity|health scare|food safety scare)\b/i},
   {id:"buyers",label:"Fewer customers or reduced population",
    name:/\b(?:fewer|less|fall(?:ing)?|declin(?:e|ing)|decreas(?:ed|ing)|reduc(?:ed|ing))\s+(?:people|customers|buyers|tourists|population)\b|\b(?:population|tourism|tourist numbers?)\s+(?:falls?|declines?|drops?|decreases?)\b/i}
  ]
 },
 "Q3:d":{
  kind:"cheese-price",maximum:6,
  concepts:[
   {id:"supply-cut",label:"Producers restrict cheese supply",
    name:/\b(?:producers?|sellers?|suppliers?|farmers?)\b.{0,55}\b(?:cut(?:ting)?|reduc(?:e|es|ing)|limit(?:ing)?|restrict(?:ing)?|withhold(?:ing)?|decreas(?:e|es|ing))\b.{0,28}\b(?:supply|production|output|quantity|cheese)\b|\b(?:shortage|scarcity)\s+of\s+cheese\b/i,sign:"up"},
   {id:"supply-rise",label:"Producers increase cheese supply",
    name:/\b(?:producers?|sellers?|suppliers?|farmers?)\b.{0,55}\b(?:increas(?:e|es|ing)|expand(?:ing)?|rais(?:e|es|ing)|produce|import(?:ing)?)\b.{0,25}\b(?:supply|production|output|cheese)\b|\b(?:surplus|greater supply|more cheese produced)\b/i,sign:"down"},
   {id:"advertising",label:"Producers advertise or brand to increase demand",
    name:/\b(?:advertis(?:e|ing|ement)|brand(?:ing)?|promot(?:e|ion|ing)|marketing)\b/i,sign:"up"},
   {id:"market-power",label:"Producer price agreement or monopoly",
    name:/\b(?:cartel|collusion|price.fixing|price agreement|monopol(?:y|ist)|producer agreement|agree to set prices?)\b/i,sign:"set"},
   {id:"boycott",label:"Consumers boycott or substitute away from cheese",
    name:/\b(?:boycott|avoid(?:ing)?|switch(?:ing)?\s+(?:to|away)|substitutes?|buy(?:ing)?\s+less)\b.{0,42}\b(?:cheese|dairy|alternatives?)\b|\b(?:cheese|dairy)\b.{0,30}\b(?:boycott|substitutes?|replac(?:e|ed))\b/i,sign:"down"},
   {id:"demand-rise",label:"Consumers increase cheese demand",
    name:/\b(?:consumers?|customers?|buyers?|households?)\b.{0,52}\b(?:demand|buy|purchas(?:e|ing)|want)\b.{0,36}\b(?:more|cheese|increas(?:e|ed|ing))\b|\b(?:higher|greater|rising|increasing)\s+demand\s+for\s+cheese\b/i,sign:"up"},
   {id:"price-control",label:"Consumers advocate cheese price controls",
    name:/\b(?:consumer groups?|consumers?|buyers?)\b.{0,50}\b(?:lobby|petition|campaign|ask|pressure)\b.{0,45}\b(?:price controls?|price caps?|government|regulat(?:ion|e))\b|\b(?:price cap|price ceiling|government price control)\b/i,sign:"set"}
  ]
 }
});

const sentences=value=>String(value??"").split(/[;\n]+|(?<=[.!?])\s+/)
  .map(s=>s.trim()).filter(Boolean);
const negated=value=>/\b(?:not|never|cannot|can't|doesn't|don't|won't|will not|no longer)\b/i.test(value);
const linkage=value=>/\b(?:so|because|which|therefore|thereby|leading|caus(?:e|es|ing)|result(?:s|ing)?|mak(?:e|es|ing)|allow(?:s|ing)?|push(?:es|ing)?|driv(?:e|es|ing)|encourag(?:e|es|ing)|reduce(?:s|d)?|decrease(?:s|d)?|increas(?:e|es|ed)|rise|rises|falls?|drops?|lowers?|rais(?:e|es))\b/i.test(value);
const iceCreamContext=/\b(?:ice.?cream|demand|sales|purchases?|buy(?:ing)?|consum(?:e|ption))\b/i;
const demandDown=/(?:\b(?:demand|sales|purchases?|buying|consumption)\s+(?:for\s+(?:ice.?cream)\s+)?(?:falls?|decreas(?:e|es|ed)|drops?|declines?|reduc(?:e|es|ed))\b|\b(?:lower|less|reduc(?:e|es|ed)|decreas(?:e|es|ed)|fall(?:ing)?)\s+(?:(?:demand|sales|purchases?)\s+(?:for\s+)?)?(?:ice.?cream|demand|sales|purchases?)\b|\b(?:buy|purchase|eat|consume)\s+(?:less|fewer)\s+ice.?cream\b|\b(?:switch|move|turn)\s+(?:to|away\s+from)\s+(?:frozen\s+)?(?:yogh?urt|popsicles?|snow\s*cones?|substitutes?)\b)/i;
const demandUp=/\b(?:demand|sales|purchases?|buying)\s+(?:for\s+ice.?cream\s+)?(?:rises?|increas(?:e|es|ed)|grows?|go(?:es)? up)\b|\b(?:more|increas(?:e|ed|ing)?)\s+(?:ice.?cream\s+)?(?:demand|sales|purchases?)\b|\bbuy\s+more\s+ice.?cream\b/i;
const cheeseContext=/\b(?:cheese|its price|market price|price|supply|demand)\b/i;
const priceUp=/\b(?:prices?|cost\s+to\s+consumers?)\s+(?:(?:of|for)\s+cheese\s+)?(?:rise|rises|increase|increases|go(?:es)? up|higher)\b|\b(?:raise|higher|increased?|rising|more expensive|push(?:es)? up|drive(?:s)? up)\s+(?:(?:the|cheese|market)\s+)?(?:prices?|cheese price)\b/i;
const priceDown=/\b(?:prices?|cost\s+to\s+consumers?)\s+(?:(?:of|for)\s+cheese\s+)?(?:fall|falls|drop|drops|decrease|decreases|go(?:es)? down|lower)\b|\b(?:lower|cheaper|reduc(?:e|es|ed)|decreas(?:e|es|ed)|falling|dropping|push(?:es)? down|drive(?:s)? down)\s+(?:(?:the|cheese|market)\s+)?(?:prices?|cheese price)\b/i;
const priceSet=/\b(?:set|fix|control|cap|regulate|limit|agree(?:ing)? on)\s+(?:(?:the|cheese|market)\s+)?prices?\b|\bprice\s+(?:fixing|controls?|ceiling|cap|agreement)\b/i;

function assessClause(task,concept,line){
 if(negated(line)||concept.wrong?.test(line))return null;
 if(!concept.name.test(line))return null;
 // Identification is one point. A source-linked directional effect in the
 // same statement is necessary for the independently awarded second point.
 let explained=false;
 if(task.kind==="demand-decrease"){
   const wrong=demandUp.test(line);
   explained=!wrong&&iceCreamContext.test(line)&&demandDown.test(line)&&linkage(line);
 }else{
   const rise=priceUp.test(line),fall=priceDown.test(line),set=priceSet.test(line);
   const contradictory=rise&&fall;
   explained=!contradictory&&cheeseContext.test(line)&&linkage(line)&&
     (concept.sign==="up"?rise&&!fall:concept.sign==="down"?fall&&!rise:set&&!rise&&!fall);
 }
 return {marks:explained?2:1,identified:true,explained};
}
export function getPobDemandPriceTask(paperId,partKey){
 return paperId===PAPER?options[String(partKey)]||null:null;
}
export function gradePobDemandPricePart(paperId,partKey,response){
 const task=getPobDemandPriceTask(paperId,partKey);
 if(!task)return null;
 const lines=sentences(response),used=new Set(),found=[];
 for(const [index,line] of lines.entries()){
   for(const concept of task.concepts){
     if(used.has(concept.id))continue;
     const marks=assessClause(task,concept,line);
     if(!marks)continue;
     found.push({conceptId:concept.id,label:concept.label,statement:line,
       statementIndex:index,...marks});
     used.add(concept.id);
     break; // never award two independent factors from one clause
   }
   if(found.length===3)break;
 }
 const confirmedMarks=found.reduce((sum,item)=>sum+item.marks,0);
 const blank=!String(response??"").trim();
 const unresolvedMarks=blank?0:Math.max(0,task.maximum-confirmedMarks);
 return {maximum:task.maximum,confirmedMarks,unresolvedMarks,
   assessedMarks:unresolvedMarks===0?confirmedMarks:null,
   status:blank?"unanswered":unresolvedMarks?"requires-rubric-assessment":"criterion-verified",
   rubricVersion:POB_DEMAND_PRICE_RUBRIC_VERSION,concepts:found,
   criteria:Array.from({length:3},(_,index)=>({
     index,marks:found[index]?.marks??null,
     conceptId:found[index]?.conceptId??null,evidence:found[index]?.statement??""
   }))};
}
