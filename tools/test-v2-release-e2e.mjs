import assert from "node:assert/strict";
import {randomUUID} from "node:crypto";
import fs from "node:fs";
import {openRegistry} from "./v2-registry.mjs";
/**
 * V2 automated release gate and end-to-end score publication, in an isolated
 * in-memory Postgres built from the committed migrations.
 *
 *   node tools/test-v2-release-e2e.mjs [evidence-dir]
 *
 * Uses the evidence produced by tools/v2-verify-all.mjs and the same examiner
 * bundle the worker deploys. Checks that the gate rejects incomplete or
 * tampered evidence, that a verified paper routes a real student submission
 * through queue, worker and atomic publication, and that retries, failures
 * and unresolved criteria never publish an unsupported or duplicate score.
 */
const dir=process.argv[2]||"artifacts/v2-verification";
const flag=name=>{const i=process.argv.indexOf(name);return i>0?process.argv[i+1]:null;};
const evidence=JSON.parse(fs.readFileSync(dir+"/evidence.json","utf8"));
const papers=JSON.parse(fs.readFileSync(dir+"/papers.json","utf8"));
const {evaluateExistingSubjectPaper2V2}=await import("../supabase/functions/_shared/server-marker-v2.mjs");
const {BUNDLE_SHA256}=await import("../supabase/functions/_shared/server-marker-v2-checksum.mjs");

const SUBJECT=flag("--subject")||"information-technology",PAPER=flag("--paper")||"P2-A";
// Timed Paper 2 durations the database owns.
const DURATION={"english-a":9900,"integrated-science":9000,"principles-of-accounts":10800}[SUBJECT]??7200;
const paperRecord=papers.find(p=>p.subjectId===SUBJECT&&p.paperId===PAPER&&p.outcome==="verified");
assert(paperRecord,"verified paper evidence for "+PAPER+" is required");
const mine=evidence.filter(r=>r.subjectId===SUBJECT&&r.paperId===PAPER);
assert(mine.length>0&&mine.every(r=>r.outcome==="verified"));

const db=await openRegistry();
if(SUBJECT==="principles-of-accounts"){
 // The isolated registry omits the application catalogue. Load the exact
 // canonical progress table/index definitions for the Accounts publication
 // bridge, then idempotently install its hooks against those real columns.
 const progressSql=fs.readFileSync("supabase/migrations/20260910_spark_multisubject_progress_v1.sql","utf8");
 const end=progressSql.indexOf("alter table public.spark_subject_progress enable row level security;");
 assert(end>0,"canonical progress schema boundary is required");
 await db.exec(progressSql.slice(0,end).replace(/^begin;/,""));
 const integration=fs.readdirSync("supabase/migrations").find(name=>name.endsWith("_marking_v2_poa_release_integration.sql"));
 assert(integration,"Accounts release integration migration is required");
 await db.exec(fs.readFileSync("supabase/migrations/"+integration,"utf8"));
 const ownedProgress=fs.readdirSync("supabase/migrations").find(name=>name.endsWith("_marking_v2_poa_owned_attempt_progress.sql"));
 assert(ownedProgress,"Accounts owned-attempt progress guard is required");
 await db.exec(fs.readFileSync("supabase/migrations/"+ownedProgress,"utf8"));
}
const asService=()=>db.exec("reset role; set test.jwt_role='service_role'; set test.user_id=''");
const asStudent=id=>db.exec(`reset role; set test.jwt_role='authenticated'; set test.user_id='${id}'; set role authenticated`);
const one=async(sql,params)=>(await db.query(sql,params)).rows[0];
const register=records=>one("select spark_grading_private.register_criterion_verifications_v2($1::jsonb) as r",[JSON.stringify(records)]);
const release=(paper=PAPER,subject=SUBJECT)=>one(
 "select spark_grading_private.release_verified_rubric_v2($1,$2,(select rubric_version from spark_grading_private.rubrics_v2 where subject_id=$1 and paper_id=$2)) as r",[subject,paper]);

try{
 await asService();
 // 1. Tampered or incomplete criterion evidence is rejected by the database.
 const sample=mine[0];
 await assert.rejects(register([{...sample,criterionSha256:"0".repeat(64)}]),/Criterion SHA-256 mismatch/);
 await assert.rejects(register([{...sample,sourceSha256:"1".repeat(64)}]),/Source SHA-256 mismatch/);
 await assert.rejects(register([{...sample,maxMarks:sample.maxMarks+1}]),/maximum mismatch/);
 await assert.rejects(register([{...sample,cases:sample.cases.map((c,i)=>i===0?{...c,passed:false}:c)}]),/failing cases/);
 await assert.rejects(register([{...sample,cases:sample.cases.filter(c=>c.cls!=="incorrect")}]),/Missing required incorrect/);
 await assert.rejects(register([{...sample,cases:sample.cases.map(c=>c.cls==="full"?{...c,resolved:false}:c)}]),/No committed full/);
 await assert.rejects(register([{...sample,outcome:"failed"}]),/criterion_verifications_v2_outcome_check|violates check constraint/);
 await assert.rejects(register([{...sample,provenance:{}}]),/provenance/);

 // A historic, client-scored IT attempt submitted before activation must be
 // neither regraded nor overwritten once the paper goes live.
 const students=[randomUUID(),randomUUID(),randomUUID()];
 for(const id of students)await db.query("insert into auth.users(id) values($1)",[id]);
 const historic=randomUUID();
 await db.query(`insert into public.spark_exam_attempts(id,user_id,subject_id,paper,status,submitted_at,
   response_snapshot,score,max_score,metadata) values($1,$2,$3,'02','submitted',now()-interval '30 days',
   '{"1-a":"old answer"}'::jsonb,41,90,$4::jsonb)`,
   [historic,students[0],SUBJECT,JSON.stringify({paper_id:PAPER,score_authority:"client-practice-estimate"})]);

 // Clients ask before routing: an unreleased paper is reported as such.
 const released=async(paper=PAPER)=>{await asStudent(students[0]);
  const r=(await one("select public.spark_v2_paper_released($1,$2) as r",[SUBJECT,paper])).r;
  await asService();return r;};
 assert.equal(await released(),false);

 // 2. A paper cannot be verified, activated or released without evidence.
 await assert.rejects(release(),/Missing evidence-backed criterion verifications/);
 await assert.rejects(db.query(`update spark_grading_private.rubrics_v2 set active=true
   where subject_id=$1 and paper_id=$2`,[SUBJECT,PAPER]),/Verified status/);
 await assert.rejects(one("select spark_grading_private.register_paper_verification_v2($1::jsonb) as r",
  [JSON.stringify(paperRecord)]),/criteria without verification evidence/);

 // 3. Complete evidence registers, idempotently, and auto-approves criteria.
 const first=(await register(mine)).r;
 assert.equal(first.inserted,mine.length);
 const again=(await register(mine)).r;
 assert.equal(again.inserted,0);assert.equal(again.alreadyRecorded,mine.length);
 const approvals=await one(`select count(*)::int n from spark_grading_private.rubric_criterion_reviews_v2
   where subject_id=$1 and paper_id=$2 and verified_by='spark-v2-automated-verifier'`,[SUBJECT,PAPER]);
 assert.equal(approvals.n,mine.length);
 await assert.rejects(db.query(`delete from spark_grading_private.criterion_verifications_v2 where paper_id=$1`,[PAPER]),/append-only/);
 await assert.rejects(release(),/Missing end-to-end paper verification/);
 const failedScenario={...paperRecord,scenarios:paperRecord.scenarios.map((s,i)=>i===0?{...s,passed:false}:s)};
 await assert.rejects(one("select spark_grading_private.register_paper_verification_v2($1::jsonb) as r",[JSON.stringify(failedScenario)]),/failing scenarios/);
 await assert.rejects(one("select spark_grading_private.register_paper_verification_v2($1::jsonb) as r",
  [JSON.stringify({...paperRecord,scenarios:paperRecord.scenarios.filter(s=>s.name!=="contradictory")})]),/lacks required contradictory/);
 assert.equal((await one("select spark_grading_private.register_paper_verification_v2($1::jsonb) as r",[JSON.stringify(paperRecord)])).r.inserted,1);
 assert.equal((await release()).r.status,"activated");
 assert.equal((await release()).r.status,"already-active");
 assert.equal(await released(),true);
 assert.equal(await released(PAPER+"-unregistered"),false);
 await db.exec("reset role; set test.jwt_role='anon'; set test.user_id=''; set role anon");
 await assert.rejects(db.query("select public.spark_v2_paper_released($1,$2)",[SUBJECT,PAPER]),/permission denied/);
 await asService();
 // A verified rubric is immutable.
 await assert.rejects(db.query(`update spark_grading_private.rubrics_v2 set criteria=criteria||'[]'::jsonb,
   expected_total_marks=expected_total_marks where subject_id=$1 and paper_id=$2 and criteria<>criteria||'[{"x":1}]'::jsonb`,[SUBJECT,PAPER]).then(()=>
  db.query(`update spark_grading_private.rubrics_v2 set expected_total_marks=expected_total_marks+1 where subject_id=$1 and paper_id=$2`,[SUBJECT,PAPER])),/immutable/);
 // Only the released paper is active.
 assert.equal((await one("select count(*)::int n from spark_grading_private.rubrics_v2 where active")).n,1);

 // 4. Student submission -> queue -> worker -> atomic publication.
 const rubric=await one("select * from spark_grading_private.rubrics_v2 where subject_id=$1 and paper_id=$2",[SUBJECT,PAPER]);
 // A Physics source-method fixture may include BOTH its own answer and
 // the upstream plotted graph. Merge these into the complete response map,
 // rather than nesting several part IDs under the downstream part ID.
 // Then reapply the explicitly selected answer for each individual part.
 const composeScript=choose=>{
  const script={},chosen=new Map();
  for(const r of mine){
   const fixture=choose(r);
   const value=fixture?.response;
   if(value&&typeof value==="object"&&!Array.isArray(value)&&
      Object.hasOwn(value,r.criterionId)){
    Object.assign(script,value);
    chosen.set(r.criterionId,value[r.criterionId]);
   }else{
    chosen.set(r.criterionId,value);
   }
  }
  for(const [id,value] of chosen)script[id]=value;
  return script;
 };
 const fullAnswers=composeScript(r=>r.cases.find(c=>c.cls==="full"));
 // Independent incorrect Physics fixtures may assert mutually incompatible
 // graph and follow-through evidence when combined. For the full-paper zero
 // publication check, a blank script is the unambiguous source-backed 0/100
 // case (and mirrors the successfully published production smoke test).
 const incorrect=SUBJECT==="physics"?{}:
  composeScript(r=>r.cases.find(c=>c.cls==="incorrect"&&c.resolved));
 const contradictory=composeScript(r=>r.cases.find(c=>c.cls==="contradiction"&&!c.resolved)??r.cases.find(c=>c.cls==="full"));
 const submit=async(student,responses)=>{
  await asStudent(student);
  const started=await one(`select * from public.spark_start_exam_attempt($1,'02','timed',$3,
    'v2-e2e-bank','v2-e2e-rubric','v2-e2e-grader',$2::jsonb)`,[SUBJECT,JSON.stringify({paper_id:PAPER,paper:"02"}),DURATION]);
  await one(`select * from public.spark_submit_exam_attempt($1,$2::jsonb,'hash',null,$3,'{}'::jsonb)`,
   [started.attempt_id,JSON.stringify(responses),rubric.expected_total_marks]);
  await asService();
  return started.attempt_id;
 };
 const work=async()=>{
  const job=(await one("select public.spark_v2_claim_next_shadow_job() as j")).j;
  if(!job)return null;
  const exam=evaluateExistingSubjectPaper2V2({subjectId:job.subjectId,paperId:job.paperId,
   criteria:job.criteria,responses:job.responses});
  const done=(await one("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4) as d",
   [job.jobId,job.leaseToken,JSON.stringify(exam.rows),BUNDLE_SHA256])).d;
  return {job,exam,done};
 };
 const attemptFull=await submit(students[0],fullAnswers);
 const queued=await one("select v2_paper_id,v2_rubric_version from public.spark_exam_attempts where id=$1",[attemptFull]);
 assert.equal(queued.v2_paper_id,PAPER,"server-side paper routing");
 assert.equal(queued.v2_rubric_version,rubric.rubric_version,"server-side rubric version routing");
 const r1=await work();
 assert.equal(r1.done.status,"verified");
 assert.equal(Number(r1.done.score),rubric.expected_total_marks);
 const published=await one("select score,max_score,metadata from public.spark_exam_attempts where id=$1",[attemptFull]);
 assert.equal(Number(published.score),rubric.expected_total_marks);
 assert.equal(published.metadata.score_authority,"server-v2-deterministic");
 assert.equal(published.metadata.v2_source_sha256,rubric.source_sha256);
 if(SUBJECT==="principles-of-accounts"){
  const progress=await one("select score,metadata from public.spark_subject_progress where activity_key=$1",["exam:poa-v2:"+attemptFull]);
  assert.equal(Number(progress.score),rubric.expected_total_marks);
  assert.equal(progress.metadata.score_authority,"server-v2-deterministic");
  assert.equal((await one("select count(*)::int n from public.spark_subject_activity_events where activity_key=$1",["exam:poa-v2:"+attemptFull])).n,1);
 }
 // Retry safety: the same lease cannot complete twice; no job remains.
 const replay=(await one("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4) as d",
  [r1.job.jobId,r1.job.leaseToken,JSON.stringify(r1.exam.rows),BUNDLE_SHA256])).d;
 assert.equal(replay.status,"stale-lease");
 assert.equal(await work(),null);
 // Re-submitting the same attempt creates no second job.
 await asStudent(students[0]);
 await one(`select * from public.spark_submit_exam_attempt($1,$2::jsonb,'hash',null,$3,'{}'::jsonb)`,[attemptFull,JSON.stringify(fullAnswers),90]);
 await asService();
 assert.equal((await one("select count(*)::int n from spark_grading_private.marking_jobs_v2 where attempt_id=$1",[attemptFull])).n,1);
 // The student reads their own verified result; another student cannot.
 await asStudent(students[0]);
 const own=(await one("select public.spark_v2_exam_result($1) as r",[attemptFull])).r;
 assert.equal(own.status,"verified");assert.equal(Number(own.score),rubric.expected_total_marks);
 await asStudent(students[1]);
 const foreign=(await one("select public.spark_v2_exam_result($1) as r",[attemptFull])).r;
 assert(!foreign||foreign.score==null,"another student must not read this result");
 await asService();

 // 5. A zero script publishes zero; an unresolved script publishes nothing.
 const attemptZero=await submit(students[1],incorrect);
 const r2=await work();
 assert.equal(r2.done.status,"verified");assert.equal(Number(r2.done.score),0);
 const attemptMixed=await submit(students[2],contradictory);
 const r3=await work();
 assert.equal(r3.done.status,"provisional","an unresolved criterion blocks the final mark");
 const unpublished=await one("select score,metadata from public.spark_exam_attempts where id=$1",[attemptMixed]);
 assert.equal(unpublished.score,null);
 assert.notEqual(unpublished.metadata.score_authority,"server-v2-deterministic");

 // 6. A failing completion rolls back completely: no partial publication.
 const extra=randomUUID();await db.query("insert into auth.users(id) values($1)",[extra]);
 const attemptBad=await submit(extra,fullAnswers);
 const job=(await one("select public.spark_v2_claim_next_shadow_job() as j")).j;
 const exam=evaluateExistingSubjectPaper2V2({subjectId:job.subjectId,paperId:job.paperId,criteria:job.criteria,responses:job.responses});
 // The worker wire protocol carries exactly five server-owned row fields.
 await assert.rejects(db.query("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4)",
  [job.jobId,job.leaseToken,JSON.stringify(exam.rows.map((r,i)=>i===0?{...r,clientDiagnostic:true}:r)),BUNDLE_SHA256]),/Invalid verified examiner row/);
 if(SUBJECT==="principles-of-accounts"){
  await assert.rejects(db.query("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4)",
   [job.jobId,job.leaseToken,JSON.stringify(exam.rows.map((r,i)=>i===0?{...r,method:"existing-IT-specific-rules"}:r)),BUNDLE_SHA256]),/(?:Subject|Accounts) examiner provenance mismatch/);
 }
 const tampered=exam.rows.map((r,i)=>i===0?{...r,suggestedMarks:r.maxMarks+1}:r);
 await assert.rejects(db.query("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4)",
  [job.jobId,job.leaseToken,JSON.stringify(tampered),BUNDLE_SHA256]),/exceeds source scheme/);
 const after=await one("select score,metadata from public.spark_exam_attempts where id=$1",[attemptBad]);
 assert.equal(after.score,null);
 const jobAfter=await one("select status from spark_grading_private.marking_jobs_v2 where id=$1",[job.jobId]);
 assert.equal(jobAfter.status,"running","failed completion leaves the job retryable");
 await assert.rejects(db.query("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4)",
  [job.jobId,job.leaseToken,JSON.stringify(exam.rows.slice(1)),BUNDLE_SHA256]),/Incomplete paper coverage/);
 const done=(await one("select public.spark_v2_complete_subject_job($1,$2,$3::jsonb,$4) as d",
  [job.jobId,job.leaseToken,JSON.stringify(exam.rows),BUNDLE_SHA256])).d;
 assert.equal(done.status,"verified");

 // 7. Historic scores are unchanged.
 const old=await one("select score,metadata from public.spark_exam_attempts where id=$1",[historic]);
 assert.equal(Number(old.score),41);assert.equal(old.metadata.score_authority,"client-practice-estimate");
 if(SUBJECT==="principles-of-accounts"){
  assert.equal((await one("select count(*)::int n from spark_grading_private.poa_published_results_v2")).n,3);
  assert.equal((await one("select count(*)::int n from public.spark_subject_activity_events where activity_key like 'exam:poa-v2:%'")).n,3);
  assert.equal((await one("select count(*)::int n from public.spark_subject_progress where activity_key=$1",["exam:poa-v2:"+attemptMixed])).n,0);
 }
 console.log("V2 automated release gate + end-to-end publication passed",JSON.stringify({
  paper:SUBJECT+"/"+PAPER,criteria:mine.length,fullScore:Number(r1.done.score),zeroScore:0,
  provisionalUnresolved:attemptMixed?true:false,attempts:[attemptFull,attemptZero,attemptMixed,attemptBad].length}));
}finally{await db.close();}
