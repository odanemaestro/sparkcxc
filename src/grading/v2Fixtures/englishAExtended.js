/**
 * Narrow verified-source grading policy for English A's 18 original extended
 * tasks, represented in 12 registered choice-specific 120-mark paper variants.
 *
 * A source-reviewed original script and a shorter source excerpt can be
 * scored ONLY when their stored text matches, and the existing scoring model
 * independently agrees with the expected numeric mark. All other writing
 * remains provisional for internal examiner review, not automatic publication.
 */
import {englishAPaper2Sets} from "../../englishA/data/englishAPaper2Bank";
import {gradeEnglishAPaper2Response,countEnglishWords} from "../../englishA/practice/englishAPaper2Grader";
import {ENGLISH_A_EXTENDED_REFERENCES} from "./englishAExtendedReferences";

const tasks=new Map(englishAPaper2Sets.flatMap(set=>set.tasks.map(t=>[t.id,t])));
const canonical=s=>String(s??"").replace(/[’‘]/g,"'").replace(/\s+/g," ").trim();
const admission=new Set(["i do not know","i have no answer","no idea","i am not sure"]);
const score=(t,answer)=>gradeEnglishAPaper2Response(t,answer);
const part=answer=>String(answer||"").split(/\n\s*\n/)[0]?.trim()||"";
export const ENGLISH_A_EXTENDED_V2_VERSION="english-original-extended-36-source-20261024";
export function englishExtendedCalibration({paperId,criterion}){
 const id=criterion?.id,task=tasks.get(id),ref=ENGLISH_A_EXTENDED_REFERENCES[id],src=criterion?.sourceMarking;
 if(!/^EA-P2-[A-F]-C[12]$/.test(paperId||"")||
    !id?.startsWith(paperId.replace(/-C[12]$/,"")+"-")||
    !["exposition","literary","persuasive"].includes(task?.kind)||
    id.includes("-M2-C1")!==paperId.endsWith("-C1")&&task?.kind==="literary"||
    criterion.sourceFormat!=="english-a-paper2"||
    src?.kind!==task.kind||src.rubric?.marks!==30||criterion.maxMarks!==30||
    !ref?.response||ref.kind!==task.kind)return null;
 const response=ref.response,partial=part(response);
 const fullScore=score(task,response),partialScore=score(task,partial);
 const wordCount=countEnglishWords(response);
 if(wordCount<(task.kind==="literary"?280:175)||
    wordCount>700||countEnglishWords(partial)<28||
    fullScore.confidence==="low"||fullScore.score<8||fullScore.score>30||
    partialScore.confidence==="low"||partialScore.score<1||
    partialScore.score>=fullScore.score)return null;
 return Object.freeze({task,response,partial,fullScore:fullScore.score,
  partialScore:partialScore.score});
}
export function knownEnglishExtendedMark({paperId,criterion,response,analysisResponse}){
 const w=englishExtendedCalibration({paperId,criterion});
 if(!w||typeof response!=="string")return null;
 const answer=canonical(response);
 if(!answer)return !canonical(analysisResponse)?0:null;
 if(admission.has(answer.toLowerCase())&&!canonical(analysisResponse))return 0;
 if(canonical(analysisResponse))return null;
 if(answer===canonical(w.response))return w.fullScore;
 if(answer===canonical(w.partial))return w.partialScore;
 return null;
}
const F=(cls,responses,expect,note,other={})=>({cls,responses,expect,note,...other});
export function englishExtendedFixtures({paperId,criterion}){
 if(criterion.sourceFormat!=="english-a-paper2"||
   !["exposition","literary","persuasive"].includes(criterion.sourceMarking?.kind))
  return {blocked:"not-an-original-English-A-extended-writing-task"};
 const w=englishExtendedCalibration({paperId,criterion});
 if(!w)return {blocked:"extended-task-source-evidence-not-calibrated"};
 const res=value=>({[criterion.id]:value});
 const full=res(w.response),equivalent=res("   "+w.response.trim()+"   ");
 return {kind:"written",ruleId:ENGLISH_A_EXTENDED_V2_VERSION,
  sourceAnswer:full,alternatives:[equivalent],fixtures:[
   F("full",full,w.fullScore,"Source-specific original long-form answer",{mustResolve:true}),
   F("equivalent",equivalent,w.fullScore,"Equivalent surrounding whitespace only",{mustResolve:true}),
   F("partial",res(w.partial),w.partialScore,"Only source introduction/opening",{mustResolve:true}),
   F("incorrect",res("I do not know"),0,"Explicit admission of no answer",{mustResolve:true}),
   F("blank",res(""),0,"No content submitted",{mustResolve:true}),
   F("irrelevant",res("My favourite football team scored many goals during the match. The supporters were very excited and cheered for a long time."),0,
     "Unrelated writing remains provisional",{mustAbstain:true}),
   F("ceiling",res(w.response+"\n\n"+w.response),{min:0,max:30},
     "Repeated full text cannot certify extra marks",{mustAbstain:true}),
   F("contradiction",res(w.response+"\n\nAll these claims are untrue and the facts above did not happen."),{min:0,max:30},
     "Explicit contradiction remains provisional",{mustAbstain:true}),
   F("keyword-list",res("school community students resources writing literature characters argument audience dialogue language"),
     0,"Keyword lists are not verified writing",{mustAbstain:true}),
   F("competing",res(w.response+"\n\nHowever the opposite is true and no part of this account should be believed."),
     {min:0,max:30},"Conflicting conclusion remains provisional",{mustAbstain:true}),
  ]};
}
