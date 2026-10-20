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

const exact=f=>typeof f?.expect==="number";
const pick=(cases,cls)=>cases.find(c=>c.cls===cls&&c.passed&&c.resolved&&exact(c));
const responseOf=(id,f)=>f.responses??{[id]:f.response};

function scenario(name,{subjectId,paperId,criteria},plan,{mustPublish}){
 const responses={};const expected=new Map();const tolerant=new Map();
 for(const [id,f] of plan){
  if(!f)continue;
  Object.assign(responses,responseOf(id,f));
  if(exact(f))expected.set(id,f.expect);else tolerant.set(id,f.expect);
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
  if(!out.canPublishFinalScore)failures.push("expected-publication");
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
 const scenarios=[
  scenario("full-marks",paper,plan(c=>pick(c,"full")),{mustPublish:true}),
  scenario("zero-marks",paper,plan(c=>pick(c,"incorrect")),{mustPublish:true}),
  scenario("blank-script",paper,new Map(),{mustPublish:true}),
  scenario("partial-marks",paper,plan(c=>pick(c,"partial")??pick(c,"full")),{mustPublish:true}),
  scenario("mixed",paper,plan((c,i)=>[pick(c,"full"),pick(c,"incorrect"),pick(c,"partial")??pick(c,"blank")][i%3]),{mustPublish:true}),
  scenario("missing-answers",paper,plan((c,i)=>i%2===0?pick(c,"full"):null),{mustPublish:true}),
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
