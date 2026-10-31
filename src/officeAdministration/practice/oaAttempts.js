const object=x=>Boolean(x&&typeof x==='object'&&!Array.isArray(x));
export const oaAttemptKey=(userId,paperId)=>`spark:oa:exam:v1:${userId||'guest'}:${paperId}`;
export function newOaAttempt(paperId){return {paperId,id:globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`,phase:'instructions',index:0,answers:{},flags:{},selectedQuestionIds:[],deadline:null,serverId:null,submittedAt:null};}
export function oaSelectionValid(paper,ids){
 if(!Array.isArray(ids)||new Set(ids).size!==ids.length)return false;
 const rules=paper.selectionRules,questions=paper.questions||[];
 if(!rules?.optional?.length)return ids.length===questions.length&&questions.every(q=>ids.includes(q.id));
 const selected=questions.filter(q=>ids.includes(q.id));
 return selected.length===ids.length&&selected.length===(paper.requiredQuestionCount||6)&&rules.compulsory.every(n=>selected.some(q=>q.number===n))&&selected.filter(q=>rules.optional.includes(q.number)).length===rules.choose;
}
export function oaSelectedQuestions(paper,attempt){return attempt.phase==='instructions'||!paper.selectionRules?.optional?.length?paper.questions:paper.questions.filter(q=>attempt.selectedQuestionIds.includes(q.id));}
export function readOaAttempt(key,paper){
 try{
  const a=JSON.parse(localStorage.getItem(key));
  const valid=a?.paperId===paper.id&&typeof a.id==='string'&&a.id.length>0&&['instructions','exam','review'].includes(a.phase)&&object(a.answers)&&object(a.flags)&&Number.isInteger(a.index)&&a.index>=0&&((a.phase==='instructions'&&a.deadline==null)||Number.isFinite(a.deadline));
  if(!valid)return newOaAttempt(paper.id);
  const ids=Array.isArray(a.selectedQuestionIds)?a.selectedQuestionIds:paper.questions.map(q=>q.id);
  if(a.phase!=='instructions'&&!oaSelectionValid(paper,ids))return newOaAttempt(paper.id);
  const answerIds=new Set(paper.paper===1?paper.questions.map(q=>q.id):paper.questions.flatMap(q=>(q.parts||[]).map(p=>p.id)));
  const answers=Object.fromEntries(Object.entries(a.answers).filter(([id,value])=>answerIds.has(id)&&(paper.paper===1?typeof value==='string'&&/^[ABCD]$/.test(value):object(value)&&typeof value.answer==='string'&&value.answer.length<=64000)));
  const flags=Object.fromEntries(paper.questions.filter(q=>a.flags[q.id]===true).map(q=>[q.id,true]));
  const clean={...a,answers,flags,selectedQuestionIds:ids,serverId:typeof a.serverId==='string'?a.serverId:null};
  if(a.index>=oaSelectedQuestions(paper,clean).length)return newOaAttempt(paper.id);
  return clean;
 }catch{return newOaAttempt(paper.id);}
}
export function oaRemainingSeconds(deadline,now=Date.now()){return Math.max(0,Math.ceil((deadline-now)/1000));}
export function oaClock(seconds){return [Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(v=>String(Math.max(0,v)).padStart(2,'0')).join(':');}
export function oaPaper1Result(paper,answers){
 const checked=(paper.questions||[]).filter(q=>Number.isInteger(q.answerIndex)&&q.answerIndex>=0&&q.answerIndex<4&&q.scoringReady!==false&&(paper.answerKeyVerified!==false||q.scoringReady===true));
 const complete=checked.length>0&&checked.length===paper.questions.length;
 return {score:checked.reduce((n,q)=>n+Number(answers[q.id]==='ABCD'[q.answerIndex]),0),maxMarks:checked.length,questionCount:paper.questions.length,complete};
}
export function oaPaper1Score(paper,answers){const result=oaPaper1Result(paper,answers);return result.complete?result.score:null;}
