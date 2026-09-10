const STORAGE_PREFIX='spark_physics_section_e_progress_v1';
export function physicsAtomicStorageKey(userId){const safe=String(userId||'guest').trim()||'guest';return `${STORAGE_PREFIX}:${safe}`;}
function store(s){if(s)return s;try{return typeof window!=='undefined'?window.localStorage:null}catch{return null}}
export function readPhysicsAtomicProgress(userId,storage){const t=store(storage);if(!t)return{};try{return JSON.parse(t.getItem(physicsAtomicStorageKey(userId))||'{}')||{}}catch{return{}}}
export function writePhysicsAtomicProgress(userId,p,storage){const t=store(storage);if(!t)return false;try{t.setItem(physicsAtomicStorageKey(userId),JSON.stringify(p||{}));return true}catch{return false}}
export function setPhysicsAtomicCompletion(userId,p,key,done,storage){const n={...(p||{}),[String(key)]:Boolean(done)};writePhysicsAtomicProgress(userId,n,storage);return n}
export function recordPhysicsAtomicResult(userId,p,key,result,storage){const r={score:Number(result?.score)||0,maxScore:Number(result?.maxScore)||0,percent:Number(result?.percent)||0,at:new Date().toISOString()},prev=p?.[key];const n={...(p||{}),[key]:r,[`${key}:best`]:Math.max(Number(prev?.percent)||0,Number(p?.[`${key}:best`])||0,r.percent)};writePhysicsAtomicProgress(userId,n,storage);return n}
export function physicsAtomicProgressSummary(p,topics,interactives){const x=p||{},ts=topics||[],labs=interactives||[],qs=ts.map(t=>x[`quiz:${t.id}`]).filter(Boolean);return{labsCompleted:labs.filter(l=>x[`lab:${l.id}`]).length,labsTotal:labs.length,topicsPractised:qs.length,topicsTotal:ts.length,averageTopicPercent:qs.length?Math.round(qs.reduce((s,r)=>s+(Number(r.percent)||0),0)/qs.length):0,checkpointPercent:Number(x['checkpoint:E']?.percent)||0}}
export const PHYSICS_ATOMIC_PROGRESS_VERSION=1;
