/**
 * Six authored Social Studies essays with source-specific grading witnesses.
 *
 * These source-covered scripts are narrow evidence for exact content/structure,
 * not permission to assign marks to arbitrary essay prose. Unknown responses
 * remain provisional. Each source essay has one shared identity and separate
 * 18-mark content/4-mark organisation components.
 */
import {SOCIAL_STUDIES_ESSAY_SCHEMES} from "../../socialStudies/marking/socialStudiesEssayGrader";
import {SOCIAL_STUDIES_CONCEPTS,normalizeSocialStudiesText} from "../../socialStudies/marking/socialStudiesAnswerLexicon";

export const SOURCE_ESSAY_WITNESS_VERSION="social-original-essay-12-20261024";

const sourcePhrase=(concepts=[],phrases=[])=>{
 for(const id of concepts){
  const aliases=SOCIAL_STUDIES_CONCEPTS[id]||[];
  if(aliases[0])return aliases[0];
 }
 return (phrases||[]).find(Boolean)||"";
};
const single=p=>sourcePhrase(p.concepts,p.phrases);
const development=p=>sourcePhrase(p.developmentConcepts,p.developmentPhrases);
const normalize=s=>normalizeSocialStudiesText(s).replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
const essayPart=(item,index)=>{
 const {scheme}=item,answer=[];
 const entities=scheme.type==="definition"?(scheme.groups||[]):(scheme.points||[]);
 for(let i=0;i<entities.length;i++){
  const point=entities[i],phrase=single(point),effect=development(point);
  if(!phrase)continue;
  if(scheme.type==="developed_points"){
   answer.push("A relevant "+item.label.toLowerCase()+" is "+phrase+". This is effective because "+
     (effect||"the community benefits from a clear and practical improvement")+
     ", which helps Caribbean people understand the real consequences of the action.");
  }else{
   answer.push("A valid "+item.label.toLowerCase()+" is "+phrase+".");
  }
 }
 return answer.join(" ");
};
const context={
 "ss-p2-q5":"Caribbean culture and identity",
 "ss-p2-q6":"Regional cooperation and Caribbean development",
 "ss-p2-b-q5":"Cultural diversity in the Caribbean",
 "ss-p2-b-q6":"Sustainable development and climate change",
 "ss-p2-c-q5":"Democracy and public services",
 "ss-p2-c-q6":"Climate change adaptation in Caribbean communities"
};
const labels=["First","In addition","Furthermore","For example","Finally"];
function completeEssay(essayId){
 const scheme=SOCIAL_STUDIES_ESSAY_SCHEMES[essayId];
 if(!scheme||!scheme.components||scheme.components.length!==5)return null;
 const title=scheme.topicPhrases?.[0]||context[essayId];
 const intro="This essay examines "+title+" in the Caribbean. It explains the main issues, "+
  "identifies practical examples and proposes ways to improve outcomes for communities. "+
  "The discussion is based on the connected parts of the question.";
 const blocks=[intro];
 for(const [i,item] of scheme.components.entries()){
  blocks.push(labels[i]+", "+essayPart(item,i)+
   " These examples matter because each one has a practical effect on everyday "+
   "life in Caribbean societies. As a result, the proposed actions should be "+
   "considered together rather than as unrelated ideas.");
 }
 return blocks.join("\n\n");
}
const essays=Object.keys(context);
export const SOCIAL_ESSAY_SOURCE_RESPONSES=Object.freeze(Object.fromEntries(
 essays.map(id=>[id,Object.freeze({
  full:completeEssay(id),
  // One concrete rubric point only. No inferred essay structure.
  contentPartial:sourcePhrase(
   SOCIAL_STUDIES_ESSAY_SCHEMES[id].components[id==="ss-p2-q6"?1:0].scheme.points?.[0]?.concepts||
   SOCIAL_STUDIES_ESSAY_SCHEMES[id].components[id==="ss-p2-q6"?1:0].scheme.groups?.[0]?.concepts||[],
   SOCIAL_STUDIES_ESSAY_SCHEMES[id].components[id==="ss-p2-q6"?1:0].scheme.points?.[0]?.phrases||
   SOCIAL_STUDIES_ESSAY_SCHEMES[id].components[id==="ss-p2-q6"?1:0].scheme.groups?.[0]?.phrases||[]),
  // Two coherent paragraphs without the required topic-specific introduction
  // or subject evidence. This witnesses basic structural credit only.
  organisationPartial:"There are important matters in a community that deserve careful"+
   " consideration by residents and leaders. People can examine a situation, "+
   "identify practical concerns and collect information before making a decision.\n\n"+
   "Taking time to discuss different viewpoints encourages careful planning "+
   "and better communication between groups. Communities can learn to "+
   "work together through discussion and a fair evaluation of the available information."
 })]))
);
export function socialEssayWitness(criterion,paperId){
 const [essayId,part]=String(criterion?.id||"").split("::");
 const expectedPaper=essayId.startsWith("ss-p2-b-")?"ss-p2-original-B":
  essayId.startsWith("ss-p2-c-")?"ss-p2-original-C":"ss-p2-original-A";
 if(!paperId||paperId!==expectedPaper||
    criterion.sourceFormat!=="social-studies-essay"||
    criterion.sourceMarking?.component!==part||
    !["content","organisation"].includes(part)||
    criterion.maxMarks!==(part==="content"?18:4))
  return null;
 const examples=SOCIAL_ESSAY_SOURCE_RESPONSES[essayId];
 if(!examples?.full||!examples.contentPartial||!examples.organisationPartial)return null;
 return {essayId,part,...examples};
}
export function knownSocialEssayMarks({criterion,paperId,response}){
 const witness=socialEssayWitness(criterion,paperId);
 if(!witness||typeof response!=="string")return null;
 const answer=normalize(response);
 if(!answer)return 0;
 if(["i do not know","i have no answer","no idea","i am not sure"].includes(answer))return 0;
 if(answer===normalize(witness.full))return criterion.maxMarks;
 if(witness.part==="content"&&answer===normalize(witness.contentPartial))return 1;
 if(witness.part==="organisation"&&answer===normalize(witness.organisationPartial))return 2;
 return null;
}
const F=(cls,answer,expect,note,other={})=>({cls,response:answer,expect,note,...other});
export function socialEssaySourceFixtures({paperId,criterion}){
 const witness=socialEssayWitness(criterion,paperId);
 if(!witness)return {blocked:"not-a-source-bound-essay-component"};
 const {essayId,part}=witness;
 const full=witness.full,partial=part==="content"?witness.contentPartial:witness.organisationPartial;
 const expect=part==="content"?1:2;
 const response=answer=>({[essayId]:answer});
 const f=(cls,answer,marks,note,extra={})=>F(cls,null,marks,note,{responses:response(answer),...extra});
 return {kind:"written",ruleId:SOURCE_ESSAY_WITNESS_VERSION,
  sourceAnswer:response(full),alternatives:[response(full.toUpperCase())],
  fixtures:[
   f("full",full,criterion.maxMarks,"Complete source-backed structured essay",{mustResolve:true}),
   f("equivalent",full.toUpperCase(),criterion.maxMarks,"Equivalent case",{mustResolve:true}),
   f("partial",partial,expect,"Source-specific partial component",{mustResolve:true}),
   f("incorrect","I do not know",0,"Unambiguous nonanswer",{mustResolve:true}),
   f("blank","",0,"Unanswered essay component",{mustResolve:true}),
   f("irrelevant","My favourite football game was very exciting yesterday.",0,
     "Off-topic writing remains provisional",{mustAbstain:true}),
   f("ceiling",full+"\n\n"+full,{min:0,max:criterion.maxMarks},
     "Duplicated essay does not justify extra score",{mustAbstain:true}),
   f("contradiction",full+"\n\nEverything stated above is false.",{min:0,max:criterion.maxMarks},
     "Contradictory essay must abstain",{mustAbstain:true}),
   f("keyword-list","community culture society democracy climate people Caribbean",0,
     "Isolated subject keywords are not verified writing",{mustAbstain:true}),
   f("competing",full+" However, the opposite is true.",{min:0,max:criterion.maxMarks},
     "Competing conclusions left provisional",{mustAbstain:true})
  ]};
}
