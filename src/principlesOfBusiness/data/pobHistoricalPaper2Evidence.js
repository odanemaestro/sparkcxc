// Evidence-based offline checks for historical written responses. This is a
// deliberately conservative subset of the SPARK authored rubric, not a claim
// of understanding every valid English paraphrase. Unverified claims stay pending.
const stop=new Set(["a","an","the","and","or","to","of","in","on","at","for","from","as","by","with","into","is","are","was","were","be","been","being","that","which","who","their","its","it","they","them","can","may","must","should","will","would","could","this","these","those","such","also","one","two","three","four","any","example","including","e","g","each","over","more","less","than"]);
const wordRoots={
 profits:"profit",profitable:"profit",earnings:"income",earning:"income",
 revenue:"income",revenues:"income",money:"income",finance:"finance",
 independence:"independent",autonomy:"independent",
 managers:"manager",supervisors:"supervisor",employees:"employee",
 organisations:"organisation",organizations:"organisation",organization:"organisation",
 customers:"customer",clients:"customer",goods:"good",products:"product",
 purchases:"buy",purchasing:"buy",buys:"buy",buying:"buy",
 selling:"sell",sells:"sell",sales:"sell",supply:"supply",
 shipments:"shipment",exports:"export",imports:"import",
 environmental:"environment",responsibilities:"responsibility",
 governments:"government",businesses:"business",
 entrepreneurs:"entrepreneur",risks:"risk",risky:"risk",
 creative:"creativity",innovative:"creativity",innovation:"creativity",
 obstacles:"difficulty",difficulties:"difficulty",competition:"competitor",
 consumers:"consumer",retailers:"retailer",wholesalers:"wholesaler",
 manufacturers:"manufacturer",producers:"producer",
 training:"train",skills:"skill",
 calculations:"calculate",recorded:"record",receives:"receive",
 exports:"export",delivers:"deliver",delivery:"deliver",
};
const canonical=word=>wordRoots[word]||word.replace(/(?<=\w{4})s$/,"");
const terms=text=>String(text||"").toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g," ")
 .split(/\s+/).filter(w=>w&&!stop.has(w)&&w.length>2).map(canonical);
const unique=list=>[...new Set(list)];
const negation=/\b(?:not|never|without|cannot|doesn't|don't|isn't|aren't|won't|no longer)\b/i;
const noExtraNegation=(model,student)=>negation.test(model)===negation.test(student);
const claims=text=>{
 const value=String(text||"").trim();
 const bulletLines=value.split(/\n/).filter(line=>/^\s*(?:[•*]|[-–]\s|\d+[.)]\s)/.test(line));
 const source=bulletLines.length?bulletLines:value.split(/[.;\n]+/);
 return source.map(x=>x.replace(/^\s*(?:[•*]|[-–]|\d+[.)])\s*/,"").replace(/\(\d+(?:½)?\)/g,"").trim())
  .filter(x=>unique(terms(x)).length>=3);
};
const candidateClauses=text=>String(text||"").split(/[.;\n]+/).map(x=>x.trim()).filter(Boolean);

// Return proven claim count only; unrecognised student language is not wrong.
export function matchPobWrittenEvidence(response,modelAnswer,criteria){
 if(!String(response||"").trim()||!Array.isArray(criteria)||!criteria.length)
  return {confirmed:[],unresolved:criteria?.map((_,i)=>i)||[]};
 // Only apply generic list evidence where the authored SPARK criteria ask for
 // independently listed examples/reasons. Formula, explanation, and method
 // criteria need their own explicit verifier, not keyword-based reassignment.
 const listing=criteria.every(c=>/\b(?:first|second|third|fourth|fifth|sixth|different|distinct)\b/i.test(c.rule||""));
 if(!listing)return {confirmed:[],unresolved:criteria.map((_,i)=>i)};
 const reference=claims(modelAnswer),candidate=candidateClauses(response);
 if(!reference.length||!candidate.length)return {confirmed:[],unresolved:criteria.map((_,i)=>i)};
 const accepted=[],used=new Set();
 for(let index=0;index<criteria.length;index++){
  let hit=null;
  for(let j=0;j<reference.length;j++){
   if(used.has(j))continue;
   const keywords=unique(terms(reference[j]));
   // Do not infer marks from generic phrases (e.g. "good business").
   if(keywords.length<4)continue;
   for(const student of candidate){
    if(!noExtraNegation(reference[j],student))continue;
    const studentTokens=new Set(terms(student));
    const overlap=keywords.filter(w=>studentTokens.has(w)).length;
    // Require substantial concrete correspondence, including two substantial
    // ideas, not a single repeated exam keyword.
    const threshold=Math.max(3,Math.ceil(keywords.length*.8));
    if(overlap>=threshold&&studentTokens.size>=threshold){
     hit={criterion:index,reference:j,evidence:student};
     break;
    }
   }
   if(hit)break;
  }
  if(hit){used.add(hit.reference);accepted.push(hit)}
 }
 return {confirmed:accepted,unresolved:criteria.map((_,i)=>i).filter(i=>!accepted.some(c=>c.criterion===i))};
}

// Exact, source-verified arithmetic structures in the 2005 examination.
// A result alone never earns an unexplained method mark.
export function gradePobHistoricalArithmetic(paperId,partKey,response){
 if(paperId!=="POB-P2-2005-MJ")return null;
 const s=String(response||"").toLowerCase().replace(/,/g,"").replace(/\s+(?=\d{3}\b)/g,"");
 const compact=s.replace(/\s/g,"");
 const number=n=>new RegExp("(?<![0-9])"+n+"(?![0-9])").test(compact);
 const negative2000=/-2000\b/.test(compact)||(/\bdeficit\b/.test(s)&&number("2000"));
 if(partKey==="Q9:a.ii"){
  const method=number("24000")&&number("26000")&&
   (/[-−]/.test(s)||/subtract|less|minus|difference/.test(s));
  const final=negative2000;
  return {maximum:2,marks:Number(method)+Number(final),criteria:[Number(method),Number(final)],exact:true};
 }
 if(partKey==="Q9:b"){
  const visible=negative2000;
  const invisible=number("5000")||(number("20000")&&number("15000")&&/[-−]/.test(s));
  const balance=(number("3000")&&(/surplus/.test(s)||/\+3000\b/.test(compact)))||
   (/current.account/.test(s)&&number("3000")&&!negative2000);
  return {maximum:3,marks:Number(visible)+Number(invisible)+Number(balance),
   criteria:[Number(visible),Number(invisible),Number(balance)],exact:true};
 }
 return null;
}
