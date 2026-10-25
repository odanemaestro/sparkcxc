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
  return previous&&outcome ? {previous:previous+".",response:"The proposed strategy of "+previous+" helps because "+outcome+"."} : null;
 }).filter(Boolean);
 if(links.length<2)return null;
 return {
  full:{response:links.slice(0,2).map(x=>x.response).join("\n"),
   previous:links.slice(0,2).map(x=>x.previous).join("\n")},
  partial:{response:links[0].response,previous:links[0].previous},
  marksPartial:2
 };
};

export function socialSourceWitness(criterion,paperId){
 const scheme=criterion?.sourceMarking?.marking;
 if(!scheme || !["ss-p2-original-A","ss-p2-original-B","ss-p2-original-C"].some(id=>id===paperId))
  return null;
 if(scheme.maxMarks!==criterion.maxMarks||scheme.maxMarks<=1)return null;
 if(scheme.type==="linked_development")return linked(scheme);
 const items=sections(scheme);
 if(!items.length)return null;
 const n=scheme.type==="list"||scheme.type==="developed_points"?
  Number(scheme.maxPoints):items.length;
 if(n<2||items.length<n)return null;
 const first=items.slice(0,n),partial=["ss-p2-q1::(c) (i)","ss-p2-c-q3::(a)"].includes(criterion.id) ? items[items.length-1] : items[0];
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

export function knownSocialSourceMarks({
 paperId,criterion,response,previousResponse="",previousCriterion=null
}){
 const witness=socialSourceWitness(criterion,paperId);
 if(!witness||typeof response!=="string")return null;
 const candidate=normal(response);
 if(!candidate)return 0;
 if(candidate==="i do not know"||candidate==="i have no answer"||
    candidate==="no idea"||candidate==="i am not sure")return 0;
 const before=normal(previousResponse);
 // The paper's preceding response may be the *complete* independently
 // verified answer to (c)(i), rather than the short linked-response fixture's
 // excerpt. Both are authored from the same official source and neither is
 // an arbitrary keyword match. Reject anything else, including negated or
 // invented prior answers.
 const sourceBefore=previousCriterion&&previousCriterion.id===
   criterion.id.replace("::(c) (ii)","::(c) (i)")
   ?socialSourceWitness(previousCriterion,paperId):null;
 const approvedParents=sourceBefore?
   [sourceBefore.full?.response,sourceBefore.partial?.response]
     .filter(Boolean).map(normal):[];
 const expectedBefore=x=>!x.previous||
  normal(x.previous)===before||approvedParents.includes(before);
 if(candidate===normal(witness.full.response)&&!expectedBefore(witness.full)&&
    before.length>30&&
    ["ss-p2-q1::(c) (ii)","ss-p2-q2::(c) (ii)",
     "ss-p2-b-q4::(c) (ii)","ss-p2-c-q2::(c) (ii)"].includes(criterion.id))
  console.warn("SOCIAL_LINKED_SOURCE_DEBUG="+JSON.stringify({
   id:criterion.id,prior:before,required:normal(witness.full.previous),
   verifiedParentAnswers:approvedParents,
   parentType:previousCriterion?.sourceMarking?.marking?.type,
   parentId:previousCriterion?.id
  }));
 if(candidate===normal(witness.full.response)&&expectedBefore(witness.full))
  return criterion.maxMarks;
 if(candidate===normal(witness.partial.response)&&expectedBefore(witness.partial))
  return witness.marksPartial;
 return null;
}

const F=(cls,response,expect,note,options={})=>({cls,response,expect,note,...options});
export function socialOriginalSourceFixtures({paperId,criterion}){
 if(!["ss-p2-original-A","ss-p2-original-B","ss-p2-original-C"].includes(paperId)||
    criterion.sourceFormat!=="social-studies-paper2"||
    !criterion.id.startsWith("ss-p2-")||
    !criterion.sourceMarking?.marking)
  return {blocked:"not-a-source-structured-Social-Studies-original"};
 const witness=socialSourceWitness(criterion,paperId);
 if(!witness)return {blocked:"no-distinct-source-approved-witness"};
 const linked=criterion.sourceMarking.marking.type==="linked_development";
 const parent=criterion.id.replace("::(c) (ii)","::(c) (i)");
 if(linked&&parent===criterion.id)return {blocked:"linked-criterion-has-no-source-parent"};
 const wrap=w=>linked?{[criterion.id]:w.response,[parent]:w.previous}:{[criterion.id]:w.response};
 const complete=wrap(witness.full),partial=wrap(witness.partial);
 const withText=(cls,response,expected,note,opts={})=>linked?
   F(cls,null,expected,note,{responses:typeof response==="string"?{[criterion.id]:response}:response,...opts}):
   F(cls,typeof response==="string"?response:response[criterion.id],expected,note,opts);
 const fullText=witness.full.response;
 return {kind:"structured",ruleId:"social-original-48-source-20261024",
  sourceAnswer:complete,alternatives:[wrap({...witness.full,response:fullText.toUpperCase()})],
  fixtures:[
   withText("full",complete,criterion.maxMarks,"All distinct source-described points",{mustResolve:true}),
   withText("equivalent",wrap({...witness.full,response:fullText.toUpperCase()}),criterion.maxMarks,
     "Equivalent case for the same complete source statements",{mustResolve:true}),
   withText("partial",partial,witness.marksPartial,"First authored source point only",{mustResolve:true}),
   withText("incorrect","I do not know",0,"Unambiguous absence of a substantive answer",{mustResolve:true}),
   withText("blank","",0,"No candidate answer",{mustResolve:true}),
   withText("irrelevant","Clouds are moving over the mountain.",0,"Off-topic content must abstain",{mustAbstain:true}),
   withText("ceiling",linked?{...complete,[criterion.id]:fullText+"\n"+fullText}:fullText+"\n"+fullText,
     {min:0,max:criterion.maxMarks},"Duplicate points cannot add credit",{mustAbstain:true}),
   withText("competing",linked?{...complete,[criterion.id]:fullText+" I do not believe this."}:fullText+" I do not believe this.",
     {min:0,max:criterion.maxMarks},"Conflicting conclusion must abstain",{mustAbstain:true}),
   withText("contradiction",linked?{...complete,[criterion.id]:"It is false that "+fullText}:"It is false that "+fullText,
     {min:0,max:criterion.maxMarks},"Explicitly negated correct statement must abstain",{mustAbstain:true}),
   withText("keyword-list","family society community government population resources development",0,
     "Keywords alone never prove the part",{mustAbstain:true}),
   ...(linked?[withText("follow-through",wrap({...witness.full,previous:""}),0,
     "Full explanation without source-linked prior strategy stays provisional",{mustAbstain:true})]:[])
  ]};
}
