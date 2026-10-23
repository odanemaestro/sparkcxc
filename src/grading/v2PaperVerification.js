/**
 * End-to-end V2 paper verification.
 *
 * Builds complete simulated scripts from each criterion's verified fixtures
 * and grades them as one submission. Checks, for every scenario:
 *   - the paper total equals the sum of the expected criterion marks;
 *   - no total exceeds the paper maximum and no row exceeds its criterion;
 *   - a final score is publishable only when every row is resolved, and an
 *     unresolved row never yields a confirmed total;
 *   - where a scenario expects publication, publication happens.
 */
import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";
import {physicsPaper2FollowThroughSources} from "../physics/paper2/physicsPaper2Marking";

const exact=f=>typeof f?.expect==="number";
const pick=(cases,cls)=>cases.find(c=>c.cls===cls&&c.passed&&c.resolved&&exact(c));
// A criterion fixture may include its own graph plus the downstream
// gradient/read-off answer. Preserve that full-paper response map rather than
// nesting it under the downstream criterion id when replaying the paper.
// Earlier evidence records stored f.responses in the 'response' field, so
// support both formats without weakening any mark or resolution checks.
const responseOf=(id,f)=>f.responses??
 (f.response&&typeof f.response==="object"&&!Array.isArray(f.response)&&
  Object.hasOwn(f.response,id)?f.response:{[id]:f.response});

function scenario(name,{subjectId,paperId,criteria},plan,{mustPublish}){
 const responses={};const expected=new Map();const tolerant=new Map();
 const chosen=new Map();
 for(const [id,f] of plan){
  if(!f)continue;
  const fixtureResponses=responseOf(id,f);
  Object.assign(responses,fixtureResponses);
  if(Object.hasOwn(fixtureResponses,id))chosen.set(id,fixtureResponses[id]);
  if(exact(f))expected.set(id,f.expect);else tolerant.set(id,f.expect);
 }
 // A downstream graph-working fixture supplies the source graph solely to
 // verify that criterion in isolation. It cannot replace a graph answer
 // independently selected for the *whole script*. Apply every student's
 // selected per-part answer last; remove deliberately missing answers.
 for(const [id,f] of plan){
  if(!f)delete responses[id];
  else if(chosen.has(id))responses[id]=chosen.get(id);
 }
 const maxMarks=criteria.reduce((n,c)=>n+c.maxMarks,0);
 const failures=[];let out;
 try{out=evaluateExistingSubjectPaper2V2({subjectId,paperId,criteria,responses});}
 catch(e){return {name,passed:false,total:0,failures:["examiner-error: "+e.message]};}
 for(const row of out.rows){
  if(row.suggestedMarks>row.maxMarks||row.suggestedMarks<0)failures.push("row-out-of-range:"+row.criterionId);
  const want=expected.has(row.criterionId)?expected.get(row.criterionId):
   plan.has(row.criterionId)&&plan.get(row.criterionId)?null:0;
  if(want!==null&&row.resolved&&Math.abs(row.suggestedMarks-want)>1e-9)
   failures.push("resolved-wrong:"+row.criterionId+" "+row.suggestedMarks+"!="+want);
  const range=tolerant.get(row.criterionId);
  if(range&&row.resolved&&(row.suggestedMarks<(range.min??0)||row.suggestedMarks>(range.max??Infinity)))
   failures.push("resolved-outside-range:"+row.criterionId);
 }
 if(out.suggestedMarks>maxMarks)failures.push("total-exceeds-maximum");
 const anyUnresolved=out.rows.some(r=>!r.resolved);
 if(anyUnresolved&&(out.canPublishFinalScore||out.confirmedMarks!==null))
  failures.push("unresolved-row-published");
 if(!anyUnresolved&&!out.canPublishFinalScore)failures.push("resolved-paper-not-publishable");
 const expectedTotal=[...criteria].reduce((n,c)=>n+(expected.get(c.id)??0),0);
 if(mustPublish){
  if(!out.canPublishFinalScore){
   const unresolved=out.rows.filter(r=>!r.resolved)
    .map(r=>r.criterionId+"="+r.suggestedMarks+"@"+r.method);
   failures.push("expected-publication; unresolved: "+unresolved.join(", "));
  }
  else if(tolerant.size===0&&Math.abs(out.confirmedMarks-expectedTotal)>1e-9)
   failures.push("total "+out.confirmedMarks+" != expected "+expectedTotal);
 }
 return {name,passed:failures.length===0,total:out.suggestedMarks,
  confirmedMarks:out.confirmedMarks,canPublish:out.canPublishFinalScore,
  expectedTotal:tolerant.size?null:expectedTotal,unresolvedMarks:out.unresolvedMarks,failures};
}

/**
 * @param paper {subjectId,paperId,criteria}
 * @param casesById Map criterionId -> evidence cases (with responses)
 */
export function verifyPaper(paper,casesById){
 const ids=paper.criteria.map(c=>c.id);
 const plan=fn=>new Map(ids.map((id,i)=>[id,fn(casesById.get(id)||[],i,id)]));
 // A source graphical method fixture embeds the *same question's* plotted
 // graph to verify it alone. Whole-script cases instead choose one actual
 // graph answer and independently choose its dependent method answers.
 // In the zero-script, use a blank method response if the graph is wrong:
 // a wrong/missing drawn graph plus no method evidence is a definite zero.
 const graphIds=new Set(paper.subjectId==="physics"
  ?paper.criteria.filter(c=>c.sourceMarking?.responseType==="graph").map(c=>c.id):[]);
 const graphDependent=id=>paper.subjectId==="physics"&&
  (casesById.get(id)||[]).some(f=>f.cls==="full"&&f.response&&
   typeof f.response==="object"&&
   Object.keys(f.response).some(key=>key!==id&&graphIds.has(key)));
 // A numeric mark can be earned by legitimate error-carried-forward (ECF)
 // from a *different* earlier answer. Do not construct an internally
 // contradictory script by independently combining two wrong/partial source
 // fixtures and then demand that their standalone marks remain final. Use
 // blank downstream answers in the zero/mixed scripts, and a complete
 // canonical downstream answer in the partial script. The source ECF rules,
 // not a manually curated list of failing paper IDs, decide which parts.
 const ecfDependent=id=>{
  if(paper.subjectId!=="physics")return false;
  const row=paper.criteria.find(c=>c.id===id);
  const [questionId,partId]=id.split("::");
  return (row?.sourceMarking?.criteria||[]).some(c=>
   physicsPaper2FollowThroughSources(questionId,partId,c.code).length>0);
 };
 const scenarios=[
  scenario("full-marks",paper,plan(c=>pick(c,"full")),{mustPublish:true}),
  scenario("zero-marks",paper,plan((c,i,id)=>graphDependent(id)||ecfDependent(id)
   ?pick(c,"blank"):pick(c,"incorrect")),{mustPublish:true}),
  scenario("blank-script",paper,new Map(),{mustPublish:true}),
  scenario("partial-marks",paper,plan((c,i,id)=>ecfDependent(id)
   ?pick(c,"full"):pick(c,"partial")??pick(c,"full")),{mustPublish:true}),
  scenario("mixed",paper,plan((c,i,id)=>graphIds.has(id)?pick(c,"full"):
   ecfDependent(id)?pick(c,"blank"):
   [pick(c,"full"),pick(c,"incorrect"),pick(c,"partial")??pick(c,"blank")][i%3]),{mustPublish:true}),
  scenario("missing-answers",paper,plan((c,i,id)=>graphIds.has(id)?pick(c,"full"):
   i%2===0?pick(c,"full"):null),{mustPublish:true}),
  scenario("equivalent-answers",paper,plan(c=>pick(c,"equivalent")??pick(c,"full")),{mustPublish:true}),
  scenario("contradictory",paper,plan(c=>c.find(x=>x.cls==="contradiction"&&x.passed)??
   c.find(x=>x.cls==="competing"&&x.passed)??pick(c,"full")),{mustPublish:false}),
  scenario("keyword-lists",paper,plan(c=>c.find(x=>x.cls==="keyword-list"&&x.passed)??pick(c,"incorrect")),{mustPublish:false}),
 ];
 // A missing fixture for a scenario means that scenario cannot be built.
 const missing=ids.filter(id=>!pick(casesById.get(id)||[],"full"));
 return {scenarios,passed:missing.length===0&&scenarios.every(s=>s.passed),
  missingFullFixtures:missing};
}
