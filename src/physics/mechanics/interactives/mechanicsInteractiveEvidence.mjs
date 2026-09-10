import { MECHANICS_INTERACTIVES } from './mechanicsInteractiveRegistry.mjs';

const BY_ID=new Map(MECHANICS_INTERACTIVES.map(x=>[x.id,x]));
function finite(name,v){const n=Number(v);if(!Number.isFinite(n))throw new TypeError(`${name} must be finite`);return n;}

export function createMechanicsInteractiveEvidence({
  interactiveId,
  objective,
  score,
  attempts=1,
  usedHint=false,
  durationSeconds=0,
  result='checked',
  occurredAt=new Date().toISOString(),
}={}){
  const meta=BY_ID.get(String(interactiveId||''));
  if(!meta)throw new RangeError(`unknown Mechanics interactive: ${interactiveId}`);
  const obj=String(objective||'');
  if(!meta.objectives.includes(obj))throw new RangeError(`${interactiveId} does not assess ${objective}`);
  const s=finite('score',score);if(s<0||s>1)throw new RangeError('score must be between 0 and 1');
  const a=Number(attempts);if(!Number.isInteger(a)||a<1)throw new RangeError('attempts must be a positive integer');
  const seconds=finite('durationSeconds',durationSeconds);if(seconds<0)throw new RangeError('durationSeconds cannot be negative');
  if(!['attempted','checked','completed'].includes(result))throw new RangeError('invalid result');
  const date=new Date(occurredAt);if(Number.isNaN(date.getTime()))throw new RangeError('occurredAt must be a valid date');
  return Object.freeze({
    schemaVersion:1,
    subject:'csec-physics',
    section:'A',
    topic:meta.topic,
    interactiveId:meta.id,
    objective:obj,
    skill:meta.skill,
    score:s,
    attempts:a,
    usedHint:Boolean(usedHint),
    durationSeconds:seconds,
    result,
    occurredAt:date.toISOString(),
  });
}

export function validateMechanicsInteractiveEvidence(event){
  try{
    const rebuilt=createMechanicsInteractiveEvidence(event);
    if(event?.subject!==undefined&&event.subject!=='csec-physics')return {valid:false,reason:'wrong subject namespace'};
    if(event?.section!==undefined&&event.section!=='A')return {valid:false,reason:'wrong section namespace'};
    if(event?.topic!==undefined&&event.topic!==rebuilt.topic)return {valid:false,reason:'topic does not match interactive'};
    return {valid:true,reason:null};
  }catch(error){return {valid:false,reason:error.message};}
}

// This is evidence summarization, not a mastery algorithm. It intentionally
// reports best/mean performance and activity counts without declaring a
// learner mastered an objective. The learner model remains authoritative.
export function summarizeMechanicsInteractiveEvidence(events=[]){
  if(!Array.isArray(events))throw new TypeError('events must be an array');
  const valid=events.filter(e=>validateMechanicsInteractiveEvidence(e).valid);
  const groups=new Map();
  for(const e of valid){
    const key=e.objective;
    const g=groups.get(key)||{objective:key,attemptEvents:0,completedEvents:0,scores:[],totalDurationSeconds:0,hintEvents:0,lastOccurredAt:null};
    g.attemptEvents+=1;
    if(e.result==='completed')g.completedEvents+=1;
    g.scores.push(Number(e.score));g.totalDurationSeconds+=Number(e.durationSeconds)||0;if(e.usedHint)g.hintEvents+=1;
    if(!g.lastOccurredAt||new Date(e.occurredAt)>new Date(g.lastOccurredAt))g.lastOccurredAt=e.occurredAt;
    groups.set(key,g);
  }
  return [...groups.values()].map(g=>({
    objective:g.objective,
    attemptEvents:g.attemptEvents,
    completedEvents:g.completedEvents,
    bestScore:Math.max(...g.scores),
    meanScore:g.scores.reduce((a,b)=>a+b,0)/g.scores.length,
    totalDurationSeconds:g.totalDurationSeconds,
    hintEvents:g.hintEvents,
    lastOccurredAt:g.lastOccurredAt,
  })).sort((a,b)=>a.objective.localeCompare(b.objective,undefined,{numeric:true}));
}
