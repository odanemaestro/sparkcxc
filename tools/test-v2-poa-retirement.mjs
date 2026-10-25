import assert from "node:assert/strict";
import fs from "node:fs";
import {openRegistry} from "./v2-registry.mjs";

// The registry replays the actual committed migrations in isolated PostgreSQL.
// Never touch Supabase production during this test.
const migration="supabase/migrations/20261025035500_v2_retire_legacy_poa_specimen_draft.sql";
const db=await openRegistry();
try{
 const single=async sql=>(await db.query(sql)).rows[0];

 // The source-only registry intentionally retains draft statuses; evidence
 // approvals happen separately against Supabase production. Mirror *only*
 // the observed, source-hash-verified successor state for this test, and
 // execute the production retirement migration explicitly.
 const before=await single(`select active,verification_status,source_sha256
  from spark_grading_private.rubrics_v2
  where paper_id='poa-specimen-2-2017--q-1-2-3-4-5'`);
 assert.equal(before.source_sha256,
  "344d4d84bb5188e111e58866c690d6dc0a2af02e488746ea2c2db336150950c9");
 if(!before.active||before.verification_status!=="verified")
  await db.exec(`update spark_grading_private.rubrics_v2
   set active=true,verification_status='verified'
   where subject_id='principles-of-accounts'
   and paper_id='poa-specimen-2-2017--q-1-2-3-4-5'
   and rubric_version='poa-source-methods-v1'`);
 await db.exec(fs.readFileSync(migration,"utf8"));

 const counts=await single(`select
  (select sum(total_criteria)::int from spark_grading_private.rubric_review_progress_v2) raw,
  (select sum(total_criteria)::int from spark_grading_private.rubric_operational_review_progress_v2) operational,
  (select count(*)::int from spark_grading_private.rubric_retirements_v2) retired,
  (select count(*)::int from spark_grading_private.v2_calibration_queue
   where paper_id='poa-specimen-2-2017') historical_queue,
  (select count(*)::int from spark_grading_private.v2_operational_calibration_queue
   where paper_id='poa-specimen-2-2017') current_queue`);
 assert.equal(counts.raw-counts.operational,22,
  "22 superseded criteria must be excluded only from operational totals");
 assert.equal(counts.retired,1);
 assert.equal(counts.historical_queue,22,
  "legacy queue is preserved for audit");
 assert.equal(counts.current_queue,0,
  "current queue must not request new approval of retired criteria");

 const old=await single(`select r.active,r.verification_status,
  jsonb_array_length(r.criteria) criteria,r.source_sha256,a.retired_criteria,
  a.replacement_paper_id,a.replacement_source_sha256
  from spark_grading_private.rubrics_v2 r
  join spark_grading_private.rubric_retirements_v2 a
  using(subject_id,rubric_version,paper_id)
  where r.paper_id='poa-specimen-2-2017'`);
 assert.equal(old.active,false);
 assert.equal(old.verification_status,"draft");
 assert.equal(old.criteria,22);
 assert.equal(old.retired_criteria,22);
 assert.equal(old.replacement_paper_id,"poa-specimen-2-2017--q-1-2-3-4-5");
 assert.equal(old.replacement_source_sha256,
  "344d4d84bb5188e111e58866c690d6dc0a2af02e488746ea2c2db336150950c9");

 const current=await single(`select count(*)::int count
 from spark_grading_private.rubric_operational_review_progress_v2
 where paper_id='poa-specimen-2-2017--q-1-2-3-4-5'
 and active=true and verification_status='verified' and total_criteria=5`);
 assert.equal(current.count,1,"verified replacement remains part of current progress");

 // Migration replay must not overwrite audit data or delete registered rubrics.
 await db.exec(fs.readFileSync(migration,"utf8"));
 const replay=await single(`select
  (select count(*)::int from spark_grading_private.rubric_retirements_v2) audit,
  (select count(*)::int from spark_grading_private.rubrics_v2
   where paper_id in ('poa-specimen-2-2017',
     'poa-specimen-2-2017--q-1-2-3-4-5')) rubrics`);
 assert.deepEqual(replay,{audit:1,rubrics:2});

 // Views and audit records must not be readable using a public client role.
 await db.exec("set role authenticated");
 for(const sql of [
  "select * from spark_grading_private.rubric_retirements_v2",
  "select * from spark_grading_private.rubric_operational_review_progress_v2",
  "select * from spark_grading_private.v2_operational_calibration_queue"
 ])await assert.rejects(db.query(sql),/permission denied/i);
 await db.exec("reset role");

 console.log("POA legacy specimen safely retired from current reporting: 22/22");
 console.log("Raw rubric, historical queue, verified replacement and RLS checks passed");
}finally{await db.close()}
