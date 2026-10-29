import {OA_PAPER2S,OA_PAPER2,OA_PAPER2_BANK_VERSION,OA_PAPER2_RUBRIC_VERSION,getOaPaper2,oaPaper2Criteria} from './data/oaPaper2';
import {classifyWrittenEvidence,certainWrittenMark} from '../grading/v2WrittenEvidenceGate';

const plain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&(Object.getPrototypeOf(x)===Object.prototype||Object.getPrototypeOf(x)===null);
const sort=x=>Array.isArray(x)?x.map(sort):plain(x)?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sort(x[k])])):x;
const stable=x=>JSON.stringify(sort(x));
const text=x=>typeof x==='string'?x:typeof x==='number'&&Number.isFinite(x)?String(x):plain(x)&&typeof x.answer==='string'?x.answer:'';
const fold=x=>String(x??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[–—−]/g,'-');
const normal=x=>fold(x).replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
const explicitNoAnswer=/^(?:i (?:do not|don't) know(?: the answer)?|i am not sure|no answer|idk|not attempted|unanswered)[.!]?$/i;
const competing=/\b(?:this (?:answer|explanation|statement) is (?:false|incorrect|untrue)|(?:or|but) the opposite is true|ignore (?:all |the |previous )?instructions|award (?:me |all |full )?marks|give me (?:full |all )?marks)\b/i;
const months=['january','february','march','april','may','june','july','august','september','october','november','december'];
function normalField(value,label=''){
 let s=fold(value).replace(/\b([ap])\s*\.\s*m\s*\.?/g,'$1m');
 s=s.replace(/\b(20\d{2})-(\d{2})-(\d{2})\b/g,(_,y,m,d)=>`${Number(d)} ${months[Number(m)-1]} ${y}`);
 s=s.replace(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2}),?\s+(20\d{2})\b/g,'$2 $1 $3');
 s=s.replace(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/g,(_,h,m,phase)=>`${(Number(h)%12)+(phase==='pm'?12:0)}:${m||'00'}`);
 s=s.replace(/\b(?:12\s*)?noon\b/g,'12:00');
 if(/telephone|phone/i.test(label))return s.replace(/\D/g,'');
 return normal(s);
}
const sourcePoint=p=>[p.model,...(p.alternatives||[])].join(' OR ');
function readForm(raw,points){
 const labels=new Map();for(const p of points)if(p.label)for(const l of[p.label,...(p.labelAliases||[])])labels.set(normal(l),p.label);
 const values=new Map();let current=null,unknown=false,duplicate=false;
 for(const line of raw.split(/\r?\n/)){
  if(!line.trim())continue;
  const match=/^\s*([^:=]{1,80})\s*[:=]\s*(.*)$/.exec(line);
  const label=match&&labels.get(normal(match[1]));
  if(label){if(values.has(label))duplicate=true;current=label;values.set(label,match[2].trim());}
  else if(current)values.set(current,values.get(current)+' '+line.trim());
  else unknown=true;
 }
 return {values,unknown,duplicate};
}
function readNumber(value,point){
 let s=fold(value).trim();if(point.qualifier){if(!new RegExp('\\b'+point.qualifier+'\\b','i').test(s))return {value:null,resolved:true,reason:'missing-direction'};s=s.replace(new RegExp('\\b'+point.qualifier+'\\b','ig'),'').trim();}
 if(s.includes('='))s=s.slice(s.lastIndexOf('=')+1).trim();
 if(point.unit==='J$'&&/\b(?:usd|us\$|ec\$|bds\$)\b/i.test(s))return {value:null,resolved:true,reason:'wrong-currency'};
 s=s.replace(/^(?:j\$|jmd|\$)\s*/,'').replace(/\s*(?:jmd|j\$|dollars?|packs?|boxes?|days?)$/,'').trim();
 if(!/^[+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/.test(s))return {value:null,resolved:false,reason:'unreadable-quantity'};
 const number=Number(s.replace(/,/g,''));return {value:Number.isFinite(number)?number:null,resolved:Number.isFinite(number),reason:'labelled-quantity'};
}
function fieldEvidence(point,value){
 const accepted=[point.expected,...(point.alternatives||[])];
 if(accepted.some(a=>normalField(a,point.label)===normalField(value,point.label)))return {marks:1,resolved:true,reason:'source-field-match',evidence:value};
 const words=normal(point.expected).split(' ').length;
 if(words>=7){
  const evidence=classifyWrittenEvidence(value,[sourcePoint(point)]);
  const marks=evidence.states[0]?.state==='match'?1:0;
  const certainty=certainWrittenMark({suggestedMarks:marks,maxMarks:1,response:value,points:[sourcePoint(point)],accounted:accepted});
  return {marks,resolved:certainty.resolved,reason:certainty.reason,evidence:value};
 }
 // A typed date, reference, name or quantity has an objective source value.
 // Near wording in a longer instruction is handled by the written evidence gate above.
 return {marks:0,resolved:true,reason:'source-field-different',evidence:value};
}
export function gradeOaPaper2Part(part,response){
 const raw=text(response).trim(),maxMarks=part.marks;
 if(!raw||explicitNoAnswer.test(raw))return {marks:0,maxMarks,resolved:true,reason:raw?'explicit-no-answer':'blank',criteria:part.criteria.map(c=>({id:c.id,marks:0,resolved:true,rule:c.rule,reason:raw?'explicit-no-answer':'blank'}))};
 if(competing.test(raw))return {marks:0,maxMarks,resolved:false,reason:'conflicting-or-instructional-response',criteria:part.criteria.map(c=>({id:c.id,marks:0,resolved:false,rule:c.rule,reason:'conflicting-or-instructional-response'}))};
 if(part.choiceBank){
  const points=part.choiceBank.map(sourcePoint),evidence=classifyWrittenEvidence(raw,points);
  const sourceMatched=evidence.states.map((s,i)=>({...s,index:i})).filter(s=>s.state==='match');
  let matched=sourceMatched;
  if(part.choiceRequirements){
   const selected=[];
   for(const[group,limit]of Object.entries(part.choiceRequirements))selected.push(...matched.filter(m=>new RegExp('^(?:a|an|the) '+normal(group)+'(?: |$)').test(normal(part.choiceBank[m.index].model))).slice(0,limit));
   matched=selected;
  }
  const marks=Math.min(maxMarks,matched.length),certainty=certainWrittenMark({suggestedMarks:Math.min(maxMarks,sourceMatched.length),maxMarks,response:raw,points,accounted:part.choiceBank.flatMap(p=>[p.model,...(p.alternatives||[])])});
  const repeated=normal(raw)===normal(part.modelAnswer+' '+part.modelAnswer);
  const resolved=marks>0&&certainty.resolved&&!repeated;
  return {marks,maxMarks,resolved,reason:repeated?'repeated-source-answer':certainty.reason,criteria:part.criteria.map((c,i)=>({id:c.id,rule:c.rule,marks:i<marks?1:0,resolved,evidence:i<marks?part.choiceBank[matched[i].index].model:null,reason:certainty.reason}))};
 }
 const form=readForm(raw,part.criteria),rows=part.criteria.map(c=>{
  const value=form.values.get(c.label);
  if(value===undefined)return {id:c.id,rule:c.rule,marks:0,resolved:!form.unknown,reason:form.unknown?'unlabelled-response':'blank-field'};
  if(c.kind==='numeric'){
   const parsed=readNumber(value,c),correct=parsed.value!==null&&Math.abs(parsed.value-c.expected)<=c.tolerance;
   return {id:c.id,rule:c.rule,marks:correct?1:0,resolved:parsed.resolved,reason:parsed.reason,evidence:value};
  }
  return {id:c.id,rule:c.rule,...fieldEvidence(c,value)};
 });
 const resolved=!form.unknown&&!form.duplicate&&rows.every(r=>r.resolved);
 return {marks:rows.reduce((n,c)=>n+c.marks,0),maxMarks,resolved,reason:form.duplicate?'duplicate-field':form.unknown?'unlabelled-response':resolved?'source-document-evidence':'unresolved-document-wording',criteria:rows};
}
function sourceAnswers(responses,criteria){
 if(!plain(responses))throw new TypeError('Invalid Office Administration responses');
 const accepted=new Set(criteria.flatMap(c=>[c.id,c.sourcePartId]));
 if(Object.keys(responses).some(id=>!accepted.has(id)))throw new Error('Unknown Office Administration response key');
 const result=new Map();
 for(const c of criteria){
  const primary=responses[c.id],short=responses[c.sourcePartId];
  if(primary!==undefined&&short!==undefined&&stable(primary)!==stable(short))throw new Error('Conflicting Office Administration response aliases');
  const response=primary??short??'';
  if(!(typeof response==='string'||typeof response==='number'&&Number.isFinite(response)||plain(response)&&Object.keys(response).every(k=>k==='answer')&&typeof response.answer==='string')||text(response).length>200000)
   throw new TypeError('Invalid Office Administration answer');
  result.set(c.id,response);
 }
 return result;
}
export function evaluateOaSourceV2({paperId,criteria,responses={}}){
 const paper=getOaPaper2(paperId);if(!paper)throw new Error('Unknown Office Administration V2 paper');
 const canonical=oaPaper2Criteria(paperId),source=new Map(canonical.map(c=>[c.id,c]));
 if(!Array.isArray(criteria)||criteria.length!==canonical.length)throw new Error('Incomplete Office Administration V2 rubric');
 const seen=new Set();for(const c of criteria){if(!source.has(c?.id)||seen.has(c.id)||stable(c)!==stable(source.get(c.id)))throw new Error('Office Administration V2 source identity mismatch');seen.add(c.id);}
 const answers=sourceAnswers(responses,canonical),parts=new Map(paper.questions.flatMap(q=>q.parts.map(p=>[p.id,p])));
 return criteria.map(c=>{
  const graded=gradeOaPaper2Part(parts.get(c.sourcePartId),answers.get(c.id));
  return {criterionId:c.id,maxMarks:c.maxMarks,suggestedMarks:graded.marks,method:'office-administration-source-evidence-v2',resolved:graded.resolved,
   diagnostic:{scope:'SPARK-original-Office-Administration-Paper-2',sourceVersion:OA_PAPER2_BANK_VERSION,reason:graded.reason,points:graded.criteria.map(p=>({id:p.id,marks:p.marks,resolved:p.resolved,reason:p.reason}))}};
 });
}
export function reviewOaPaper2V2(responses={},paperId=OA_PAPER2.id){
 const paper=getOaPaper2(paperId);if(!paper)throw new Error('Unknown Office Administration Paper 2');
 const canonical=oaPaper2Criteria(paperId),answers=sourceAnswers(responses,canonical),ids=new Map(canonical.map(c=>[c.sourcePartId,c.id]));
 const questions=paper.questions.map(q=>({number:q.number,title:q.title,maxMarks:q.marks,parts:q.parts.map(p=>{
  const g=gradeOaPaper2Part(p,answers.get(ids.get(p.id))),unresolved=g.resolved?0:p.marks-g.marks;
  return {id:p.id,criterionId:ids.get(p.id),label:p.label,prompt:p.prompt,availableMarks:p.marks,maxMarks:p.marks,marks:g.marks,confirmedMarks:g.marks,assessedMarks:g.resolved?g.marks:null,unresolvedMarks:unresolved||(!g.resolved?p.marks:0),resolved:g.resolved,reason:g.reason,modelAnswer:p.modelAnswer,criteria:g.criteria};
 })}));
 const rows=questions.flatMap(q=>q.parts.map(p=>({...p,questionNumber:q.number}))),provisional=rows.some(p=>!p.resolved),candidateMarks=rows.reduce((n,p)=>n+p.marks,0);
 return {paperId,rubricVersion:OA_PAPER2_RUBRIC_VERSION,version:'marking-reconciliation-v2',score:provisional?null:candidateMarks,maxScore:paper.totalMarks,availableMarks:paper.totalMarks,confirmedMarks:candidateMarks,candidateMarks,
  provisional,fullyAssessed:!provisional,unresolvedMarks:rows.reduce((n,p)=>n+p.unresolvedMarks,0),questions,rows,answeredParts:canonical.filter(c=>text(answers.get(c.id)).trim()).length,totalParts:rows.length,canPublishFinalScore:false};
}
export function oaSourceFixtures({paperId,criterion}){
 const paper=getOaPaper2(paperId),canonical=paper&&oaPaper2Criteria(paperId).find(c=>c.id===criterion?.id);
 if(!paper||!canonical||stable(criterion)!==stable(canonical))return {blocked:'Office-Administration-source-rubric-mismatch'};
 const part=paper.questions.flatMap(q=>q.parts).find(p=>p.id===criterion.sourcePartId),full=part.modelAnswer;
 const count=Math.max(1,Math.floor(part.marks/2)),partial=part.criteria.slice(0,count).map(c=>c.model).join('\n');
 const f=(cls,response,expect,note,extra={})=>({cls,response,expect,note,...extra});
 const alternative=(part.choiceBank?part.choiceBank.slice(0,part.marks):part.criteria).map(p=>p.alternatives?.[0]?(p.label?p.label+': '+p.alternatives[0]:p.alternatives[0]):p.model).join('\n');
 return {kind:'structured',ruleId:'oa-original-source-54-20261026',sourceAnswer:{answer:full},alternatives:[{answer:full.toUpperCase()}],
  fixtures:[f('full',full,part.marks,'All source-authored points or document fields.',{mustResolve:true}),
   f('equivalent',full.toUpperCase(),part.marks,'Equivalent case and punctuation.',{mustResolve:true}),
   f('equivalent',alternative,part.marks,'Source-authorised alternative wording, names, dates or numbers.',{mustResolve:true}),
   f('partial',partial,count,'Separate source points or correctly labelled fields, with the rest unanswered.',{mustResolve:true}),
   f('incorrect','I do not know',0,'Unambiguous statement that no answer is given.',{mustResolve:true}),
   f('blank','',0,'An unanswered question receives no marks.',{mustResolve:true}),
   f('irrelevant','There is rain in the mountains today.',0,'Off-topic writing must not become a final mark.',{mustAbstain:true}),
   f('ceiling',full+'\n'+full,{min:0,max:part.marks},'Repetition cannot create additional credit.',{mustAbstain:true}),
   f('contradiction',full+'\nThis explanation is false.',{min:0,max:part.marks},'Contradictory claims remain unresolved.',{mustAbstain:true}),
   f('competing',full+'\nOr the opposite is true.',{min:0,max:part.marks},'Conflicting alternatives remain unresolved.',{mustAbstain:true}),
   f('keyword-list','office records staff money service documents communication',0,'Keywords alone are not a substantive answer.',{mustAbstain:true})]};
}
export {OA_PAPER2_RUBRIC_VERSION};
