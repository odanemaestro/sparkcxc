/**
 * V2 written-answer certainty gate.
 *
 * A subject grader suggests marks for a written answer. This gate decides
 * whether that suggestion is certain enough to be published as a final mark,
 * by classifying every registered source point independently:
 *
 *   match       - one clause states the point, with the source's polarity
 *   contradict  - one clause states the point and locally denies it
 *   near        - a clause shares at least half the point's key terms but
 *                 not enough to state it; the wording may be a valid
 *                 paraphrase the grader cannot recognise
 *   absent      - no clause comes close to the point
 *
 * The gate never adds marks. It only withholds certainty: contradiction,
 * unexplained near-miss wording, telegraphic keyword lists, unaccounted
 * content beside partial credit, and disagreement between the grader and the
 * point evidence all leave the criterion unresolved, so the paper keeps a
 * provisional score instead of a confident wrong one.
 */
import {scienceResponseClauses} from "./scienceWrittenEvidence";

// Function words. A genuine English clause of five or more words almost
// always contains one; a keyword list does not.
const STOP=new Set(("a an and are as at be been being but by can could did do does for from had has have he her his i if in into is it its may me more most much my of on one or our she so some such than that the their them then there these they this those to too us was we were what when where which while who whom whose why how will with would you your also just very each every any all only other whether about after before between through during within out up down over under again here should must might shall not no yes onto upon via per because since though although unless until").split(" "));
// Examiner wording in mark schemes that is not part of the expected answer.
const NOISE=/^(?:mark|marks|award|awarded|accept|accepted|credit|any|one|two|three|four|five|six|each|max|maximum|eg|example|examples|etc|ie|identified|identify|described|describe|stated|state|states|correctly|correct|suitable|relevant|clear|clearly|valid|explanation|explain|explained|explains|reference|mention|mentions|mentioned|equivalent|similar|given|shows?|showing|recognises?|recognition|interpretation|linked|appropriate|well|up|candidate|answer|answers|response|point|points|idea|ideas|named?|names|give|gives|giving|using|uses|use)$/;
const NEGATION_WORD=/^(?:not|no|never|cannot|can't|couldn't|won't|without|doesn't|isn't|aren't|wasn't|weren't|don't|didn't|neither|nor|false|untrue|incorrect|unable|fails?|hasn't|haven't|shouldn't)$/;
const NEGATION=/\b(?:not|no|never|cannot|can't|couldn't|won't|without|doesn'?t|isn'?t|aren'?t|wasn'?t|don'?t|didn'?t|neither|nor|fails?\s+to|unable\s+to|false\s+that|is\s+false\b|incorrect\s+to\s+say|untrue)\b/i;

export function normaliseWritten(value){
 return String(value??"").toLowerCase().replace(/[’‘]/g,"'")
  .replace(/[–—−]/g,"-").replace(/[^a-z0-9.'%°+\-\s]/g," ")
  .replace(/(?<!\d)\.|\.(?!\d)/g," ").replace(/\s+/g," ").trim();
}
const stem=t=>t.length>4?t.replace(/(?:ing|ed|es|s|ly)$/,""):t.replace(/s$/,"");
const numeric=t=>/^\d+(?:\.\d+)?%?$/.test(t);
export function keyTerms(value){
 return [...new Set(normaliseWritten(value).split(" ")
  .filter(t=>numeric(t)||(t.length>1&&!STOP.has(t)&&!NOISE.test(t)))
  .map(t=>numeric(t)?t:stem(t)))];
}
const clauseWords=clause=>normaliseWritten(clause).split(" ").filter(Boolean);
const negated=value=>NEGATION.test(String(value).replace(/[’‘]/g,"'"));

/** Strip examiner annotations: "(1)", "1 mark.", "1–2 marks", "Accept:". */
export function cleanSourcePoint(point){
 return String(point??"")
  .replace(/\s*\((?:accept|allow)\b[^)]*\)/gi," ")
  .replace(/\s*\((?:e\.g\.?|for example)[^)]*\)/gi," ")
  .replace(/(?<=\S),?\s+(?:e\.g\.?|for example)\s.*$/i,"")
  .replace(/\(\s*\d(?:\s*\+\s*\d)*(?:\s+[a-z ]+)?\s*\)/gi," ")
  .replace(/\(\s*\d+\s*(?:marks?)?\s*\)/gi," ")
  .replace(/\b(?:up\s+to\s+)?\d+(?:\s*[–-]\s*\d+)?\s*marks?\b\.?/gi," ")
  .replace(/^\s*(?:or|accept:?)\s+/i,"")
  .replace(/\s+/g," ").trim();
}

/**
 * Alternatives a point allows: " OR " / " / " separate whole alternatives, and
 * a slash inside a phrase ("raw facts/values") offers word alternatives.
 */
export function pointAlternatives(point){
 // "e.g. a; b; c" lists examples, any one of which is the point.
 const examples=cleanSourcePoint(point).match(/^\s*(?:e\.g\.?|for example)\s*,?\s*(.+)$/i);
 // Upper-case OR / spaced slash separate whole answers; a lower-case "or"
 // between two words offers word alternatives within one statement.
 const whole=(examples?examples[1].split(/\s*;\s*/):cleanSourcePoint(point).split(/\s+OR\s+|\s+\/\s+|;\s*or\s+/))
  .flatMap(v=>{
   const pair=v.match(/\b([A-Za-z-]+)\s+or\s+([A-Za-z-]+)\b/);
   return pair?[v.replace(pair[0],pair[1]),v.replace(pair[0],pair[2])]:[v];
  })
  .map(x=>x.trim()).filter(Boolean);
 const out=[];
 for(const alt of whole){
  const slash=alt.match(/([A-Za-z-]+)(?:\/([A-Za-z-]+))+/);
  if(!slash){out.push(alt);continue;}
  for(const option of slash[0].split("/"))
   out.push(alt.replace(slash[0],option));
  if(out.length>12)break;
 }
 return out.filter(x=>keyTerms(x).length>0);
}

// Is any of the matched terms denied within the three words before it?
function locallyNegated(words,termSet){
 for(let i=0;i<words.length;i++){
  if(!termSet.has(stem(words[i])))continue;
  for(let back=1;back<=3&&i-back>=0;back++)
   if(NEGATION_WORD.test(words[i-back]))return true;
 }
 return false;
}

const DENIAL=/^\s*(?:it\s+is\s+(?:false|incorrect|not\s+true|untrue)\s+(?:that|to\s+say)|it'?s\s+not\s+true\s+that)\b/i;
const CONJUNCTION=/\b(?:however|whereas|but|although|yet|nevertheless)\b/i;
function classifyAlternative(baseClauses,alt,synonyms,spent=new Set(),sentences=[]){
 // A point that itself joins two ideas with "but" is compared with whole
 // sentences, not with the halves of a split response.
 const clauses=CONJUNCTION.test(alt)||alt.includes(";")?[...baseClauses,...sentences]:baseClauses;
 const terms=keyTerms(alt);
 if(!terms.length)return {state:"absent",hits:0,terms:0};
 const minimum=terms.length<=3?terms.length:Math.ceil(terms.length*.75);
 const nearAt=terms.length>=2?Math.ceil(terms.length/2):Infinity;
 const sourceNegative=negated(alt);
 let best=0,state="absent",clause=null;
 for(const [index,text] of clauses.entries()){
  const words=clauseWords(text);
  const present=new Set(words.map(stem));
  const hit=terms.filter(t=>present.has(t)||(synonyms?.[t]||[]).some(s=>present.has(stem(s))));
  best=Math.max(best,hit.length);
  if(hit.length>=minimum){
   // An explicit denial contradicts whatever it restates, even a negative
   // statement; otherwise a locally negated required term contradicts it.
   // A conditional clause ("If the power cannot be switched off") is a
   // circumstance, not a denial.
   const conditional=/^\s*(?:if|unless|when|whenever|in\s+case)\b/i.test(text);
   if(!conditional&&(DENIAL.test(text)&&!DENIAL.test(alt)||!sourceNegative&&locallyNegated(words,new Set(hit))))
    return {state:"contradict",hits:hit.length,terms:terms.length};
   state="match";clause=index;
  }else if(hit.length>=nearAt&&state!=="match"&&!spent.has(index))state="near";
 }
 return {state,hits:best,terms:terms.length,clause};
}

const rank={contradict:3,match:2,near:1,absent:0};
/**
 * Classify each source point (with its alternatives) against the response.
 * Returns per-point states plus response-level flags.
 */
export function classifyWrittenEvidence(response,points,{synonyms}={}){
 const raw=typeof response==="string"?response:String(response?.answer??response??"");
 const clauses=scienceResponseClauses(raw);
 const sentences=raw.split(/\n+|(?<=[!?])\s+|(?<!\d)\.\s+(?!\d)|(?<=\d)\.\s+(?=[A-Z])/).map(s=>s.trim()).filter(Boolean);
 const classify=spent=>points.map(point=>{
  const alts=pointAlternatives(point);
  if(!alts.length)return {point,state:"absent"};
  let best={state:"absent"};
  for(const alt of alts){
   const r=classifyAlternative(clauses,alt,synonyms,spent,sentences);
   // A contradiction on any alternative wins: the answer asserts and denies.
   if(r.state==="contradict")return {point,...r};
   if(rank[r.state]>rank[best.state])best=r;
   // Denying either half of a point joined by ";" contradicts the point.
   for(const half of alt.split(/;\s*/).filter(h=>h!==alt&&keyTerms(h).length>=2)){
    const h=classifyAlternative(clauses,half,synonyms,spent,sentences);
    if(h.state==="contradict")return {point,...h};
   }
  }
  return {point,...best};
 });
 // A clause that states one point is spent: its shared wording is not a
 // near-miss attempt at a different point.
 const first=classify(new Set());
 const spent=new Set(first.filter(s=>s.state==="match"&&Number.isInteger(s.clause)).map(s=>s.clause));
 const states=spent.size?classify(spent):first;
 // Telegraphic keyword lists: five or more words, no function word at all,
 // drawing on terms unique to two or more different source points. A
 // label-style statement of one point ("Period 3: 3 occupied electron
 // shells") shares only common words with the others and is not a list.
 const pointTerms=points.map(p=>new Set(keyTerms(cleanSourcePoint(p))));
 const unique=pointTerms.map((set,i)=>[...set].filter(t=>pointTerms.every((other,j)=>j===i||!other.has(t))));
 const salad=clauses.some(clause=>{
  const words=clauseWords(clause);
  if(words.length<5||words.some(w=>STOP.has(w)))return false;
  const present=new Set(words.map(stem));
  return unique.filter(terms=>terms.some(t=>present.has(t))).length>=2;
 });
 return {
  states,salad,blank:!raw.trim(),
  matched:states.filter(s=>s.state==="match").length,
  contradicted:states.some(s=>s.state==="contradict"),
  near:states.filter(s=>s.state==="near").length
 };
}

/**
 * Decide whether a grader's suggested marks may be published as final.
 * Never changes the marks themselves.
 *
 * accounted: phrases the subject grader positively recognised, plus the
 *   question's own wording. Partial credit is only certain when everything
 *   substantive the candidate wrote is accounted for; anything else may be a
 *   valid paraphrase of a missing point.
 * pointEvidence: "grader" when the grader's own structured evidence replaces
 *   point-wording agreement (lexicon graders whose scheme points describe
 *   answers abstractly rather than giving their wording).
 * creditedPoints: how many scheme points the grader credited (grader mode),
 *   so near-miss wording on a credited point is not mistaken for a possible
 *   uncredited paraphrase.
 */
export function certainWrittenMark({suggestedMarks,maxMarks,response,points,synonyms,
 accounted=[],pointEvidence="points",creditedPoints=null}){
 const raw=typeof response==="string"?response:String(response?.answer??response??"");
 if(!raw.trim())return {resolved:suggestedMarks===0,reason:"blank"};
 if(!Array.isArray(points)||!points.some(p=>keyTerms(cleanSourcePoint(p)).length))
  return {resolved:false,reason:"no-source-points"};
 const e=classifyWrittenEvidence(raw,points,{synonyms});
 if(e.contradicted)return {resolved:false,reason:"contradiction",evidence:e};
 if(e.salad)return {resolved:false,reason:"keyword-list",evidence:e};
 if(negatedResponse(raw,accounted))
  return {resolved:false,reason:"negated-recognised-evidence",evidence:e};
 if(pointEvidence==="points"){
  if(suggestedMarks>0&&e.matched===0)
   return {resolved:false,reason:"grader-credit-without-point-evidence",evidence:e};
  if(suggestedMarks===0&&e.matched>0)
   return {resolved:false,reason:"point-evidence-without-grader-credit",evidence:e};
 }
 if(suggestedMarks<maxMarks&&e.near>0){
  const explained=pointEvidence==="grader"&&Number.isFinite(creditedPoints)
   ?Math.max(0,creditedPoints-e.matched):0;
  if(e.near>explained)
   return {resolved:false,reason:"near-miss-wording",evidence:e};
 }
 if(suggestedMarks>0&&suggestedMarks<maxMarks){
  const known=new Set([...accounted.flatMap(keyTerms),
   ...e.states.filter(s=>s.state!=="absent").flatMap(s=>pointAlternatives(s.point).flatMap(keyTerms))]);
  const unaccounted=keyTerms(raw).filter(t=>!known.has(t)&&!numeric(t));
  if(unaccounted.length>=1)
   return {resolved:false,reason:"unaccounted-content",unaccounted,evidence:e};
 }
 return {resolved:true,reason:suggestedMarks===maxMarks?"full-evidence":
  suggestedMarks===0?"no-point-evidence":"remaining-points-absent",evidence:e};
}

// A recognised phrase that is locally denied ("an extranet does not give
// external users access") is not positive evidence, whatever a lexicon matched.
function negatedResponse(raw,accounted){
 if(!accounted.length)return false;
 return scienceResponseClauses(raw).some(clause=>{
  const words=clauseWords(clause);
  return accounted.some(term=>{
   const t=keyTerms(term);
   if(!t.length||negated(term))return false;
   const present=new Set(words.map(stem));
   return t.every(x=>present.has(x))&&locallyNegated(words,new Set(t));
  });
 });
}
