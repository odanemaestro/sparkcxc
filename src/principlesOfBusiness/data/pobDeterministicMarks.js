// Strict deterministic partial-credit decisions for unambiguous LISTING tasks.
// Only these explicitly supported prompts may receive auto-awarded marks.
// All explanation/evaluation responses remain unscored until semantic calibration.
const PREFIX="POB-SPARK-P2-ORIGINAL-01-Q";
const rules=Object.freeze({
 [PREFIX+"1:b"]:{limit:3,criterionAligned:true,choices:[
  {id:"market-demand",terms:["demand","customer demand","competition","market research","market size"]},
  {id:"costs-and-finance",terms:["startup cost","start-up cost","costs","expenses","finance","funding","capital","budget"]},
  {id:"compliance-and-supply",terms:["health regulation","food safety","license","licence","registration","permit","supplier","raw materials","legal requirement","regulation"]}]},
 [PREFIX+"2:a"]:{limit:2,choices:[
  {id:"planning",terms:["planning","plan"]},
  {id:"organising",terms:["organising","organizing"]},
  {id:"leading",terms:["leading","directing"]},
  {id:"controlling",terms:["controlling"]}]},
 [PREFIX+"3:b"]:{limit:2,choices:[
  {id:"product",terms:["product"]},
  {id:"place",terms:["place","distribution"]},
  {id:"promotion",terms:["promotion","advertising"]}]},
 [PREFIX+"4:b"]:{limit:3,choices:[
  {id:"bill-of-lading",terms:["bill of lading"]},
  {id:"airway-bill",terms:["airway bill","air waybill","air way bill"]},
  {id:"delivery-or-consignment",terms:["delivery note","consignment note"]},
  {id:"purchase-order",terms:["purchase order"]},
  {id:"invoice",terms:["invoice","commercial invoice"]}]}
});
function found(text,term){
 const escaped=term.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
 const pattern=new RegExp("(^|[^a-z0-9])"+escaped+"(?=$|[^a-z0-9])","gi");
 let match;
 while((match=pattern.exec(text))){
  const preceding=text.slice(Math.max(0,match.index+match[1].length-40),match.index+match[1].length);
  if(!/(?:\bnot|\bno|\bnever|\bwithout)\s+(?:\w+\s+){0,2}$/.test(preceding))return true;
 }
 return false;
}
export function gradePobListingPart(partKey,response){
 const rule=rules[partKey];
 if(!rule)return null;
 const text=String(response||"").toLowerCase().replace(/\s+/g," ").trim();
 const identified=rule.choices.filter(choice=>choice.terms.some(term=>found(text,term))).map(c=>c.id);
 // A list of isolated terms is sufficient for the expressly stated 'state/name' question.
 const marks=Math.min(rule.limit,identified.length);
 const criterionMarks=rule.criterionAligned?rule.choices.map(c=>identified.includes(c.id)?1:0):Array.from({length:rule.limit},(_,i)=>i<marks?1:0);
 return {partKey,marks,maxMarks:rule.limit,identified,criterionMarks,source:"strict-listing-v2",reliable:true};
}
export const POB_DETERMINISTIC_LISTING_KEYS=Object.freeze(Object.keys(rules));
