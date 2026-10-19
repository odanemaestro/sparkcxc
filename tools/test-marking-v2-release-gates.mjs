import {PGlite} from "@electric-sql/pglite";
import {randomUUID} from "node:crypto";
import fs from "node:fs";
import assert from "node:assert/strict";

/**
 * Isolated final-release gate integration.
 * All approval identities below are synthetic test fixtures, NOT attestations
 * to any real SPARK paper, and the test never connects to live Supabase.
 */
const sql=name=>fs.readFileSync("supabase/migrations/"+name,"utf8");
const db=new PGlite();
const migrations=[
 "20261005043000_exam_attempt_integrity.sql",
 "20261005120000_exam_attempt_write_protection.sql",
 "20261018190000_marking_v2_private_job_queue.sql",
 "20261018193000_marking_v2_rubric_registry_enqueue.sql",
 "20261019110000_marking_v2_review_gate_worker_bridge.sql",
 "20261019113000_marking_v2_physics_it_draft_source_rubrics.sql",
 "20261019123000_marking_v2_seven_subject_source_drafts.sql",
 "20261019133000_marking_v2_criterion_approval_gate.sql",
 "20261019143000_marking_v2_shadow_advisory_evidence.sql",
 "20261019150000_marking_v2_physics_it_source_detail_bridge.sql",
 "20261019153000_marking_v2_math_eight_missing_criteria.sql",
 "20261019173000_marking_v2_subject_grader_evidence.sql",
 "20261019174000_marking_v2_subject_evidence_method_fix.sql",
 "20261019180000_marking_v2_live_attempt_routing.sql",
 "20261019183000_marking_v2_atomic_score_publication.sql"
];
async function reject(sql,params=[],pattern=/approval|attestation|permission|Forbidden|lease|rubric/i){
 await assert.rejects(db.query(sql,params),pattern);
}
try{
 await db.exec(`create schema auth;
   create table auth.users(id uuid primary key);
   create role anon;
   create role authenticated;
   create role service_role bypassrls;
   create function auth.uid() returns uuid language sql stable as
     $$select nullif(current_setting('test.user_id',true),'')::uuid$$;
   create function auth.jwt() returns jsonb language sql stable as
     $$select jsonb_build_object('role',current_setting('test.jwt_role',true))$$;
   grant usage on schema auth,public to anon,authenticated,service_role;
   grant execute on function auth.uid(),auth.jwt() to anon,authenticated,service_role;`);
 for(const file of migrations)await db.exec(sql(file));
 const row=(await db.query(`select count(*)::integer as papers,
   count(*) filter(where active)::integer as active,
   count(*) filter(where verification_status='verified')::integer as verified
   from spark_grading_private.rubrics_v2`)).rows[0];
 assert.deepEqual(row,{papers:67,active:0,verified:0});
 const counts=(await db.query(`select subject_id,count(*)::integer n from
   spark_grading_private.rubrics_v2 group by subject_id`)).rows;
 assert.equal(counts.length,9);
 assert.equal(counts.reduce((n,r)=>n+r.n,0),67);
 const audited=(await db.query(`select
   count(*) filter(where c->'sourceMarking'->'criteria'='[]'::jsonb)::integer as empty_math,
   count(*) filter(where jsonb_typeof(c->'sourceMarking'->'criteria')='array'
      and jsonb_array_length(c->'sourceMarking'->'criteria')>0)::integer as detailed_math
   from spark_grading_private.rubrics_v2 r,
   lateral jsonb_array_elements(r.criteria) c
   where r.subject_id='mathematics'`)).rows[0];
 assert.equal(audited.empty_math,0);
 assert.equal(audited.detailed_math,237);
 // An unreviewed REAL paper cannot be promoted using fabricated flags alone.
 await reject(`update spark_grading_private.rubrics_v2
   set active=true,verification_status='verified',
      verified_by='fake-operator',verified_at=now(),source_sha256=repeat('a',64),
      expected_total_marks=100
   where subject_id='physics' and paper_id='spark-phy-p02-practice-1'`);
 const snapshot=(await db.query(`select active,verification_status from
    spark_grading_private.rubrics_v2
    where subject_id='physics' and paper_id='spark-phy-p02-practice-1'`)).rows[0];
 assert.equal(snapshot.active,false);
 assert.equal(snapshot.verification_status,'draft');
 // Synthetic isolated paper used exclusively to exercise the mechanism.
 const userId=randomUUID(),attemptId=randomUUID();
 await db.query("insert into auth.users(id) values($1)",[userId]);
 const criteria=[{id:"test-q1",sourcePartId:"test-q1",maxMarks:2,
  kind:"numeric",sourceMarking:{answer:"42",criteria:[]}}];
 await db.query(`insert into spark_grading_private.rubrics_v2
 (subject_id,rubric_version,paper_id,criteria,active,verification_status)
 values('mathematics','isolated-fixture-v1','isolated-paper',$1::jsonb,false,'draft')`,
 [JSON.stringify(criteria)]);
 await db.query(`insert into public.spark_exam_attempts
 (id,user_id,subject_id,paper,rubric_version,status,submitted_at,response_snapshot,metadata)
 values($1,$2,'mathematics','02','isolated-fixture-v1','submitted',now(),
 '{"test-q1":{"answer":"42"}}'::jsonb,'{"paper_id":"isolated-paper"}'::jsonb)`,
 [attemptId,userId]);
 await reject("select spark_grading_private.enqueue_marking_job_v2($1)",[attemptId],
  /No active server rubric/);
 await db.exec(`insert into spark_grading_private.rubric_criterion_reviews_v2
 (subject_id,rubric_version,paper_id,criterion_id,criterion_sha256,verified_by,verified_at,review_note)
 select 'mathematics','isolated-fixture-v1','isolated-paper',c->>'id',
 encode(sha256(convert_to(c::text,'UTF8')),'hex'),
 'isolated-reviewer',now(),'Fixture criterion reviewed in test only'
 from spark_grading_private.rubrics_v2 r,
 lateral jsonb_array_elements(r.criteria) c
 where r.paper_id='isolated-paper'`);
 await db.exec(`update spark_grading_private.rubrics_v2 set
  expected_total_marks=2,verification_status='verified',active=true,
  source_sha256=repeat('b',64),verified_by='isolated-approver',
  verified_at=now()+interval '1 second'
 where paper_id='isolated-paper'`);
 // Simulate a canonical post-approval submission; legacy V1 version stays intact.
 await db.query("update public.spark_exam_attempts set status='in_progress' where id=$1",[attemptId]);
 await db.query("update public.spark_exam_attempts set status='submitted' where id=$1",[attemptId]);
 const pinned=(await db.query("select v2_paper_id,v2_rubric_version from public.spark_exam_attempts where id=$1",[attemptId])).rows[0];
 assert.deepEqual(pinned,{v2_paper_id:"isolated-paper",v2_rubric_version:"isolated-fixture-v1"});
 const job=(await db.query(
  "select spark_grading_private.enqueue_marking_job_v2($1) job_id",
 [attemptId])).rows[0].job_id;
 assert.equal((await db.query(
  "select spark_grading_private.enqueue_marking_job_v2($1) job_id",
 [attemptId])).rows[0].job_id,job);
 // Browser roles never receive the service-only worker completion method.
 for(const role of ["anon","authenticated"]){
  await db.exec("set role "+role);
  await reject("select public.spark_v2_claim_next_shadow_job()",[],/permission denied|Forbidden/);
  await db.exec("reset role");
 }
 const claimed=(await db.query(
  "select public.spark_v2_claim_next_shadow_job() as data")).rows[0].data;
 assert.equal(claimed.attemptId,attemptId);
 assert.equal(claimed.criteria[0].maxMarks,2);
 await reject(`select public.spark_v2_finish_shadow_job_with_advisory(
   $1::uuid,$2::uuid,1,$3::jsonb)`,
  [job,claimed.leaseToken,JSON.stringify([{criterionId:"test-q1",suggestedMarks:3,rule:"scalar-answer-match"}])],
  /exceeds registered rubric ceiling/);
 const accepted=(await db.query(`select public.spark_v2_finish_shadow_job_with_advisory(
   $1::uuid,$2::uuid,1,$3::jsonb) as result`,
  [job,claimed.leaseToken,JSON.stringify([{criterionId:"test-q1",suggestedMarks:2,rule:"scalar-answer-match"}])]
 )).rows[0].result;
 assert.equal(accepted,true);
 const replay=(await db.query(`select public.spark_v2_finish_shadow_job_with_advisory(
   $1::uuid,$2::uuid,1,'[]'::jsonb) as result`,
  [job,claimed.leaseToken])).rows[0].result;
 assert.equal(replay,false);
 // Expired lease cannot commit provisional credit, even with valid data.
 const expiredAttempt=randomUUID();
 await db.query(`insert into public.spark_exam_attempts
 (id,user_id,subject_id,paper,rubric_version,status,submitted_at,response_snapshot,metadata)
 values($1,$2,'mathematics','02','isolated-fixture-v1','submitted',now(),
 '{"test-q1":{"answer":"42"}}'::jsonb,'{"paper_id":"isolated-paper"}'::jsonb)`,
 [expiredAttempt,userId]);
 const expiredJob=(await db.query(
  "select spark_grading_private.enqueue_marking_job_v2($1) job_id",
  [expiredAttempt])).rows[0].job_id;
 const expiredClaim=(await db.query(
  "select public.spark_v2_claim_next_shadow_job() as data")).rows[0].data;
 assert.equal(expiredClaim.jobId,expiredJob);
 await db.query(`update spark_grading_private.marking_jobs_v2
  set lease_expires_at=now()-interval '2 seconds' where id=$1`,[expiredJob]);
 const fenced=(await db.query(`select public.spark_v2_finish_shadow_job_with_advisory(
   $1::uuid,$2::uuid,1,'[]'::jsonb) result`,
   [expiredJob,expiredClaim.leaseToken])).rows[0].result;
 assert.equal(fenced,false,"expired lease must reject scoring write");
 const persisted=(await db.query(`select a.score,a.max_score,j.status,j.result
 from public.spark_exam_attempts a join spark_grading_private.marking_jobs_v2 j on j.attempt_id=a.id
 where a.id=$1`,[attemptId])).rows[0];
 assert.equal(persisted.score,null,"shadow must never publish an exam score");
 assert.equal(persisted.status,"provisional");
 assert.deepEqual({confirmedMarks:persisted.result.confirmedMarks,
  unresolvedMarks:persisted.result.unresolvedMarks,finalScore:persisted.result.finalScore,
  canPublishFinalScore:persisted.result.canPublishFinalScore,suggestedMarks:persisted.result.suggestedMarks},
  {confirmedMarks:0,unresolvedMarks:2,finalScore:null,canPublishFinalScore:false,suggestedMarks:2});
 // A fresh independently approved fixture resolves every part and publishes
 // only through the private DB function. Unverified real papers remain drafts.
 const finalAttempt=randomUUID();
 await db.query(`insert into public.spark_exam_attempts
 (id,user_id,subject_id,paper,rubric_version,status,submitted_at,response_snapshot,metadata)
 values($1,$2,'mathematics','02','legacy-paper-v1','submitted',now(),
 '{"test-q1":{"answer":"42"}}'::jsonb,'{"paper_id":"isolated-paper"}'::jsonb)`,
 [finalAttempt,userId]);
 const finalJob=(await db.query("select id from spark_grading_private.marking_jobs_v2 where attempt_id=$1",
 [finalAttempt])).rows[0].id;
 const finalClaim=(await db.query("select public.spark_v2_claim_next_shadow_job() as data")).rows[0].data;
 assert.equal(finalClaim.jobId,finalJob);
 const confirmed=(await db.query(`select public.spark_v2_complete_subject_job(
 $1::uuid,$2::uuid,$3::jsonb,$4::text) as outcome`,[
 finalJob,finalClaim.leaseToken,
 JSON.stringify([{criterionId:"test-q1",maxMarks:2,suggestedMarks:2,method:"existing-mathematics-MAB-ECF",resolved:true}]),
 "c".repeat(64)
 ])).rows[0].outcome;
 assert.equal(confirmed.status,"verified");
 assert.equal(confirmed.score,2);
 const finalScore=(await db.query("select score,max_score,metadata->>'score_authority' authority from public.spark_exam_attempts where id=$1",[finalAttempt])).rows[0];
 assert.equal(Number(finalScore.score),2);
 assert.equal(Number(finalScore.max_score),2);
 assert.equal(finalScore.authority,"server-v2-deterministic");
 assert.equal((await db.query(`select public.spark_v2_complete_subject_job(
 $1::uuid,$2::uuid,$3::jsonb,$4::text) as outcome`,[
 finalJob,finalClaim.leaseToken,
 JSON.stringify([{criterionId:"test-q1",maxMarks:2,suggestedMarks:0,method:"existing-mathematics-MAB-ECF",resolved:true}]),
 "c".repeat(64)])).rows[0].outcome.status,"stale-lease");
 console.log("V2 release gates passed: 67 sources, 9 subjects, Math criteria, independent fixture review, RLS, lease fencing, provisional-only score storage");
}finally{await db.close();}
