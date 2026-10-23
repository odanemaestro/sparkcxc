import fs from 'node:fs';
import {createHash} from 'node:crypto';
// Schema-only Accounts rehearsal: no production rows, other course banks, or
// global nine-course calibration/backfills are copied into the disposable stage.
const names = [
 '20260910_spark_multisubject_progress_v1.sql',
 '20260910_spark_subject_enrollment_goals_v2.sql',
 '20260920060000_dynamic_subject_platform_v1.sql',
 '20260920235500_generic_subject_learner_shell_v2.sql',
 '20260921000500_subject_progress_diagram_activity.sql',
 '20261005043000_exam_attempt_integrity.sql',
 '20261005120000_exam_attempt_write_protection.sql',
 '20261018190000_marking_v2_private_job_queue.sql',
 '20261018193000_marking_v2_rubric_registry_enqueue.sql',
 '20261019110000_marking_v2_review_gate_worker_bridge.sql',
 '20261019133000_marking_v2_criterion_approval_gate.sql',
 '20261019143000_marking_v2_shadow_advisory_evidence.sql',
 '20261019173000_marking_v2_subject_grader_evidence.sql',
 '20261019174000_marking_v2_subject_evidence_method_fix.sql',
 '20261019180000_marking_v2_live_attempt_routing.sql',
 '20261019183000_marking_v2_atomic_score_publication.sql',
 '20261019190000_marking_v2_verified_digest_guard.sql',
 '20261019191000_marking_v2_decimal_score_hotfix.sql',
 '20261019194500_marking_v2_allow_ungraded_submission.sql',
 '20261019195000_marking_v2_own_exam_result_rpc.sql',
 '20261019211000_marking_v2_physics_graph_provisional_method.sql',
 '20261021010000_marking_v2_automated_evidence_release_gate.sql',
 '20261021020000_marking_v2_paper_released_rpc.sql',
 '20261021090000_principles_of_accounts_course_draft.sql',
 '20261021091000_poa_progress_notifications.sql',
 '20261023042600_marking_v2_poa_release_integration.sql',
 '20261023042602_marking_v2_poa_draft_source_fingerprints.sql',
];
const plan=names.map(name=>{
 let sql=fs.readFileSync('supabase/migrations/'+name,'utf8');
 let scope='complete repository migration';
 if(name==='20260910_spark_multisubject_progress_v1.sql'){
   sql=sql.slice(0,sql.indexOf('create or replace function public.spark_reward_lifetime_points('))+'\ncommit;';
   scope='canonical progress tables, RLS and record/sync RPCs; unrelated legacy reward aggregations omitted';
 }
 if(name==='20260910_spark_subject_enrollment_goals_v2.sql'){
   const prefix=sql.split('-- Existing students are enrolled only')[0];
   const trigger=sql.slice(sql.indexOf('create or replace function public.spark_auto_enroll_new_subject_progress()'),sql.indexOf('-- General SPARK learning goal'));
   if(!prefix.includes('create table if not exists public.spark_student_subject_enrollments')||!trigger.includes('create trigger spark_subject_progress_auto_enroll'))throw Error('Enrollment source changed');
   sql=prefix+'\n'+trigger+'\ncommit;';
   scope='enrollment table, RLS and auto-enroll trigger only; empty-stage participant backfill and unrelated goals omitted';
 }
 return {name,scope,sha256:createHash('sha256').update(sql).digest('hex'),sql};
});
// The public catalog RLS policy calls this boolean helper for anonymous reads.
// Match the live production prerequisite ACL without copying users or data.
const catalogAcl='grant execute on function public.spark_current_user_is_admin() to anon, authenticated;';
plan.push({name:'public-catalog-helper-production-acl',
 scope:'read-only production prerequisite parity: public catalog RLS boolean helper',
 sha256:createHash('sha256').update(catalogAcl).digest('hex'),sql:catalogAcl});
fs.mkdirSync('.audit-output',{recursive:true});
fs.writeFileSync('.audit-output/poa-staging-schema-plan.json',JSON.stringify(plan));
console.log(JSON.stringify(plan.map(({sql,...rest})=>({...rest,bytes:Buffer.byteLength(sql)}))));
