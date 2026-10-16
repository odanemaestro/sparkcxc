// POB Paper 2: conservative evidence hints for selected short-answer items.
// Not a grade. Terms alone do not establish understanding, so no points are awarded.
const groups=Object.freeze({
 "POB-SPARK-P2-ORIGINAL-01-Q1:a":[
  {label:"identifies or starts a venture",phrases:["entrepreneur","starts a business","starts an enterprise","business opportunity","sets up a business"]},
  {label:"organises productive resources",phrases:["organises resources","organizes resources","combines resources","organises production","organizes production"]},
  {label:"accepts business risk",phrases:["takes risks","takes risk","bears risk","accepts risk","business risk"]}],
 "POB-SPARK-P2-ORIGINAL-01-Q2:a":[
  {label:"planning",phrases:["planning","plan objectives","setting goals"]},
  {label:"organising",phrases:["organising","organizing","organise resources","organize resources"]},
  {label:"leading",phrases:["leading","directing","motivating staff"]},
  {label:"controlling",phrases:["controlling","monitoring performance","compare results"]}],
 "POB-SPARK-P2-ORIGINAL-01-Q3:b":[
  {label:"product",phrases:["product","product design"]},
  {label:"place",phrases:["place","distribution channels","where customers buy"]},
  {label:"promotion",phrases:["promotion","advertising","sales promotion"]}],
 "POB-SPARK-P2-ORIGINAL-01-Q4:b":[
  {label:"bill of lading",phrases:["bill of lading"]},
  {label:"airway bill",phrases:["airway bill","air waybill","air way bill"]},
  {label:"delivery or consignment note",phrases:["delivery note","consignment note"]},
  {label:"commercial invoice",phrases:["commercial invoice","invoice"]},
  {label:"purchase order",phrases:["purchase order"]}]
});
const clean=text=>String(text||"").toLowerCase().replace(/[’']/g,"'").replace(/\s+/g," ").trim();
const negated=(text,offset)=>/(?:\bnot|\bnever|\bno|\bwithout|\bisn'?t|\bdoesn'?t)\s+(?:\w+\s+){0,3}$/.test(text.slice(Math.max(0,offset-45),offset));
function phrasePresent(answer,phrase){
 const source=clean(answer),term=clean(phrase);
 let at=source.indexOf(term);
 while(at!==-1){
  const before=at===0||!/[a-z0-9]/.test(source[at-1]);
  const end=at+term.length;
  const after=end===source.length||!/[a-z0-9]/.test(source[end]);
  if(before&&after&&!negated(source,at))return true;
  at=source.indexOf(term,at+1);
 }
 return false;
}
export function inspectPobShortAnswer(partKey,response){
 const concepts=groups[partKey];
 if(!concepts)return null;
 const value=String(response||"").trim();
 if(!value)return {status:"unanswered",observed:[],notIdentified:concepts.map(c=>c.label),marks:null,
   message:"No answer entered. Use the rubric to guide your revision."};
 const observed=concepts.filter(c=>c.phrases.some(phrase=>phrasePresent(value,phrase))).map(c=>c.label);
 const notIdentified=concepts.filter(c=>!observed.includes(c.label)).map(c=>c.label);
 return {status:"feedback",observed,notIdentified,marks:null,
   message:"These are possible concepts found in your wording, not marks. Check the full rubric: synonyms, explanations, context, negation and different valid answers require careful assessment."};
}
export const POB_SHORT_ANSWER_HINT_KEYS=Object.freeze(Object.keys(groups));
