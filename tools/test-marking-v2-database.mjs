import {PGlite} from "@electric-sql/pglite";
import {randomUUID} from "node:crypto";
import fs from "node:fs";
import assert from "node:assert/strict";

// Isolated in-memory PostgreSQL, no Supabase credentials or network.
const db=new PGlite();
try{
 await db.exec(`create schema auth;
   create table auth.users(id uuid primary key);
   create role anon; create role authenticated; create role service_role bypassrls;
   create function auth.uid() returns uuid language sql stable as
     $$select nullif(current_setting('test.user_id',true),'')::uuid$$;
   create function auth.jwt() returns jsonb language sql stable as
     $$select jsonb_build_object('role',current_setting('test.jwt_role',true))$$;
   grant usage on schema auth,public to anon,authenticated,service_role;
   grant execute on function auth.uid(),auth.jwt() to anon,authenticated,service_role;`);
 for(const filename of [
  "20261005043000_exam_attempt_integrity.sql",
  "20261005120000_exam_attempt_write_protection.sql",
  "20261018190000_marking_v2_private_job_queue.sql",
  "20261018193000_marking_v2_rubric_registry_enqueue.sql"
 ])await db.exec(fs.readFileSync("supabase/migrations/"+filename,"utf8"));
 const user=randomUUID(),attempt=randomUUID();
 await db.query("insert into auth.users(id) values($1)",[user]);
 await db.query(`insert into public.spark_exam_attempts
   (id,user_id,subject_id,paper,rubric_version,status,submitted_at,response_snapshot,metadata)
   values($1,$2,'chemistry','02','rubric-fixture-v1','submitted',now(),
   '{"q1":"water evaporates"}'::jsonb,'{"paper_id":"fixture-paper"}'::jsonb)`,[attempt,user]);
 await db.query(`insert into spark_grading_private.rubrics_v2
  (subject_id,rubric_version,paper_id,criteria,active)
  values('chemistry','rubric-fixture-v1','fixture-paper',
   '[{"id":"q1","maxMarks":2,"acceptedPhrases":["evaporates"]}]'::jsonb,true)`);
 const enqueue=()=>db.query("select spark_grading_private.enqueue_marking_job_v2($1) as id",[attempt]);
 const first=(await enqueue()).rows[0].id;
 assert.equal((await enqueue()).rows[0].id,first,"enqueue must be idempotent");
 await db.exec("set role authenticated");
 await assert.rejects(db.query("select * from spark_grading_private.marking_jobs_v2"),/permission denied/);
 await assert.rejects(db.query("select spark_grading_private.enqueue_marking_job_v2($1)",[attempt]),/permission denied/);
 await db.exec("reset role");
 const claim=()=>db.query("select * from spark_grading_private.claim_marking_job_v2($1)",[first]);
 const firstLease=(await claim()).rows[0];
 assert.equal(firstLease.attempt_id,attempt);
 assert.equal((await claim()).rows.length,0,"active lease must not double-claim");
 await db.query("update spark_grading_private.marking_jobs_v2 set lease_expires_at=now()-interval '1 second' where id=$1",[first]);
 const secondLease=(await claim()).rows[0];
 assert.notEqual(firstLease.lease_token,secondLease.lease_token);
 const finish=(token,status="provisional")=>db.query(
  "select spark_grading_private.finish_marking_job_v2($1,$2,$3,'test', $4::jsonb) as accepted",
  [first,token,status,JSON.stringify({confirmedMarks:0,unresolvedMarks:2})]);
 assert.equal((await finish(firstLease.lease_token)).rows[0].accepted,false);
 assert.equal((await finish(secondLease.lease_token)).rows[0].accepted,true);
 assert.equal((await finish(secondLease.lease_token)).rows[0].accepted,false);
 // Terminal jobs cannot be reclaimed, and invalid completion statuses fail closed.
 assert.equal((await claim()).rows.length,0,"provisional jobs must not be reclaimed");
 await assert.rejects(
  db.query("select spark_grading_private.finish_marking_job_v2($1,$2,'verified','test',null)",[first,secondLease.lease_token]),
  /Invalid worker terminal status/
 );
 // A separate queued job with exhausted attempts remains ineligible for a claim.
 const anotherAttempt=randomUUID();
 await db.query(`insert into public.spark_exam_attempts
   (id,user_id,subject_id,paper,rubric_version,status,submitted_at,response_snapshot,metadata)
   values($1,$2,'chemistry','02','rubric-fixture-v1','submitted',now(),
   '{"q1":"evaporation"}'::jsonb,'{"paper_id":"fixture-paper"}'::jsonb)`,[anotherAttempt,user]);
 const exhausted=(await db.query("select spark_grading_private.enqueue_marking_job_v2($1) as id",[anotherAttempt])).rows[0].id;
 await db.query("update spark_grading_private.marking_jobs_v2 set attempts=3 where id=$1",[exhausted]);
 assert.equal((await db.query("select * from spark_grading_private.claim_marking_job_v2($1)",[exhausted])).rows.length,0);
 // A rubric deactivated before enqueue must not authorize work.
 await db.exec("update spark_grading_private.rubrics_v2 set active=false");
 const unapprovedAttempt=randomUUID();
 await db.query(`insert into public.spark_exam_attempts
   (id,user_id,subject_id,paper,rubric_version,status,submitted_at,response_snapshot,metadata)
   values($1,$2,'chemistry','02','rubric-fixture-v1','submitted',now(),
   '{"q1":"evaporation"}'::jsonb,'{"paper_id":"fixture-paper"}'::jsonb)`,[unapprovedAttempt,user]);
 await assert.rejects(db.query("select spark_grading_private.enqueue_marking_job_v2($1)",[unapprovedAttempt]),/No active server rubric/);
 const record=(await db.query("select score from public.spark_exam_attempts where id=$1",[attempt])).rows[0];
 assert.equal(record.score,null,"shadow result must never publish score");
 console.log("V2 staging SQL integration passed: migration, enqueue, RLS, lease fencing, reclaims, provisional storage");
}finally{await db.close();}
