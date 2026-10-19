import {PGlite} from "@electric-sql/pglite";
import assert from "node:assert/strict";
import fs from "node:fs";
import {evaluateExistingSubjectPaper2V2} from "../supabase/functions/_shared/server-marker-v2.mjs";
/**
 * Full source registry smoke replay: every staged paper, every course.
 * Does not infer grading accuracy or provide real rubric approvals.
 */
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
const db=new PGlite();
try{
 await db.exec(`create schema auth;create table auth.users(id uuid primary key);
 create role anon;create role authenticated;create role service_role bypassrls;
 create function auth.uid() returns uuid language sql stable as
 $$select nullif(current_setting('test.user_id',true),'')::uuid$$;
 create function auth.jwt() returns jsonb language sql stable as
 $$select jsonb_build_object('role',current_setting('test.jwt_role',true))$$;
 grant usage on schema auth,public to anon,authenticated,service_role;
 grant execute on function auth.uid(),auth.jwt() to anon,authenticated,service_role;`);
 for(const name of migrations)
  await db.exec(fs.readFileSync("supabase/migrations/"+name,"utf8"));
 const papers=(await db.query(`select subject_id,paper_id,criteria
 from spark_grading_private.rubrics_v2 order by subject_id,paper_id`)).rows;
 assert.equal(papers.length,67);
 const defects=[],counts={};
 for(const paper of papers){
  counts[paper.subject_id]=(counts[paper.subject_id]||0)+1;
  try{
   const r=evaluateExistingSubjectPaper2V2({
    subjectId:paper.subject_id,paperId:paper.paper_id,
    criteria:paper.criteria,responses:{}
   });
   const expected=paper.criteria.reduce((n,c)=>n+c.maxMarks,0);
   assert.equal(r.examinedParts,paper.criteria.length);
   assert.equal(r.maxMarks,expected);
   assert.equal(r.suggestedMarks,0,"A blank submission cannot earn any marks");
   assert(r.suggestedMarks<=expected);
   assert.equal(r.canPublishFinalScore,r.unresolvedMarks===0);
   assert(r.unresolvedMarks>=0&&r.unresolvedMarks<=expected);
   assert(r.rows.every(row=>typeof row.resolved==="boolean"));
  }catch(error){defects.push({subject:paper.subject_id,paper:paper.paper_id,error:String(error?.message||error)});}
 }
 console.log("Source-bank replay",JSON.stringify({examined:papers.length,subjectCounts:counts,defects},null,2));
 assert.deepEqual(defects,[],"Every registered paper requires a working subject scorer, without silent fallback");
}finally{await db.close();}
