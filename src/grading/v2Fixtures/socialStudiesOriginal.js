/**
 * Source-specific conservative witness corpus for the 48 structured parts of
 * SPARK's original Social Studies A/B/C papers.
 *
 * Accepted examples are constructed from the authored source rubric's named
 * concepts/links, not from arbitrary student keywords. Exact witnesses may be
 * graded; unrecognized prose is left provisional for the full examiner.
 * This is intentionally a small, auditable calibration, not general NLP.
 */
import {SOCIAL_STUDIES_CONCEPTS,normalizeSocialStudiesText} from "../../socialStudies/marking/socialStudiesAnswerLexicon";

const phrase=(ids=[],phrases=[])=>{
 for(const id of ids){
  const names=SOCIAL_STUDIES_CONCEPTS[id]||[];
  if(names.length && names[0])return names[0];
 }
 return phrases.find(x=>typeof x==="string"&&x.trim())||"";
};
const pointWord=p=>phrase(p.concepts,p.phrases);
const effectWord=p=>phrase(p.developmentConcepts,p.developmentPhrases);
const normal=s=>normalizeSocialStudiesText(s).replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
const distinct=(xs)=>[...new Set(xs.filter(Boolean))];
const piece=(p,i,type)=>{
 if(type==="developed_points"){
  const base=pointWord(p),development=effectWord(p);
  if(!base)return "";
  return base+" helps because "+(development||"it allows people to handle this challenge more effectively")+".";
 }
 if(type==="pairs"){
  const key=p.keys?.[0],value=phrase(p.concepts,p.values);
  return key&&value ? key+": "+value+"." : "";
 }
 if(type==="criteria"){
  const pieces=[
   ...(p.allConcepts||[]).map(id=>phrase([id])),
   ...(p.allPhrases||[]),
   phrase(p.anyConcepts,p.anyPhrases)
  ];
  return distinct(pieces).join(" and ")+".";
 }
 if(type==="definition"){
  return phrase(p.concepts,p.phrases)+".";
 }
 return pointWord(p)+".";
};

const sections=scheme=>{
 switch(scheme.type){
  case "list":return (scheme.points||[]).map(p=>piece(p,0,"list")).filter(Boolean);
  case "developed_points":return (scheme.points||[]).map((p,i)=>piece(p,i,"developed_points")).filter(Boolean);
  case "definition":return (scheme.groups||[]).map((p,i)=>piece(p,i,"definition")).filter(Boolean);
  case "pairs":return (scheme.pairs||[]).map((p,i)=>piece(p,i,"pairs")).filter(Boolean);
  case "criteria":return (scheme.criteria||[]).map((p,i)=>piece(p,i,"criteria")).filter(Boolean);
  default:return [];
 }
};

const linked=scheme=>{
 const links=(scheme.links||[]).map(l=>{
  const previous=phrase(l.triggerConcepts,l.triggerPhrases);
  const outcome=phrase(l.resultConcepts,l.resultPhrases);
  return previous&&outcome ? {previous:previous+".",response:"This strategy helps because "+outcome+"."} : null;
 }).filter(Boolean);
 if(links.length<2)return null;
 return {
  full:{response:links.slice(0,2).map(x=>x.response).join("\n"),
   previous:links.slice(0,2).map(x=>x.previous).join("\n")},
  partial:{response:links[0].response,previous:links[0].previous},
  marksPartial:2
 };
};

export function socialSourceWitness(criterion){
 const scheme=criterion?.sourceMarking?.marking;
 if(!scheme || !["ss-p2-original-A","ss-p2-original-B","ss-p2-original-C"].some(id=>id===criterion.paperId))
  return null;
 if(scheme.maxMarks!==criterion.maxMarks||scheme.maxMarks<=1)return null;
 if(scheme.type==="linked_development")return linked(scheme);
 const items=sections(scheme);
 if(!items.length)return null;
 const n=scheme.type==="list"||scheme.type==="developed_points"?
  Number(scheme.maxPoints):items.length;
 if(n<2||items.length<n)return null;
 const first=items.slice(0,n),partial=items[0];
 if(first.some(s=>!s.trim())||!partial)return null;
 const partialMarks=scheme.type==="developed_points"?2:
   scheme.type==="criteria"?Number(scheme.criteria[0].marks||1):
   scheme.type==="definition"?Number(scheme.groups[0].marks||1):
   scheme.type==="pairs"?Number(scheme.pairs[0].marks||1):
   Number(scheme.marksPerPoint||1);
 if(partialMarks<=0||partialMarks>=criterion.maxMarks)return null;
 return {
  full:{response:first.join("\n")},
  partial:{response:partial},
  marksPartial:partialMarks
 };
}

export function knownSocialSourceMarks({criterion,response,previousResponse=""}){
 const witness=socialSourceWitness(criterion);
 if(!witness||typeof response!=="string")return null;
 const candidate=normal(response);
 if(!candidate)return 0;
 if(candidate==="i do not know"||candidate==="i have no answer"||
    candidate==="no idea"||candidate==="i am not sure")return 0;
 const before=normal(previousResponse);
 const expectedBefore=x=>!x.previous||normal(x.previous)===before;
 if(candidate===normal(witness.full.response)&&expectedBefore(witness.full))
  return criterion.maxMarks;
 if(candidate===normal(witness.partial.response)&&expectedBefore(witness.partial))
  return witness.marksPartial;
 return null;
}
