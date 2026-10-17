import fs from "fs";
import path from "path";
import {getSparkSubjectRegistry} from "../../subjects/subjectRegistry";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";

const ops=name=>fs.readFileSync(path.join(__dirname,"../../../supabase/ops",name),"utf8");
const migrations=name=>fs.readFileSync(path.join(__dirname,"../../../supabase/migrations",name),"utf8");

describe("SPARK POB safe production staging and database marking drift",()=>{
 test("draft SQL mirrors the app registry and never publishes/enables historical grading",()=>{
  const manifest=getSparkSubjectRegistry().find(s=>s.id==="principles-of-business");
  expect(manifest).toMatchObject({
   enabled:false,status:"draft",implementation:"generic",studyView:"study",
   stats:{sections:10,topics:42,objectives:119,flashcards:119}
  });
  const sql=ops("pob_draft_catalog_registration.sql");
  expect(sql).toContain("'principles-of-business'");
  expect(sql).toContain("false,'draft',48,'generic','study'");
  expect(sql).toContain("on conflict (id) do nothing");
  expect(sql).toContain("enabled=false and status='draft'");
  expect(sql).toContain("raise exception 'POB must remain a disabled draft");
  expect(sql).toContain("'/study/principles-of-business'");
  // No student-facing release or historical score switch is permitted here.
  expect(sql).not.toMatch(/update\s+(public\.)?spark_marking_config/i);
  expect(sql).not.toMatch(/update\s+(public\.)?spark_subjects\s+set/i);
  expect(sql).not.toMatch(/\bset\s+enabled\s*=\s*true\b/i);
  expect(pobReleasedHistoricalPapers()).toHaveLength(0);
 });
 test("production diagnostics inspect the *deployed* marker not repo assumptions",()=>{
  const sql=ops("pob_live_marking_readiness_check.sql");
  expect(sql).toContain("pg_get_functiondef(to_regprocedure('public.spark_enqueue_marking(uuid)'))");
  expect(sql).toContain("pg_get_functiondef(to_regprocedure('public.spark_submit_exam_attempt");
  expect(sql).toContain("daily_global_limit");
  expect(sql).toContain("daily_token_budget");
  expect(sql).toContain("pob_catalog_draft_safe");
  expect(sql).not.toMatch(/\b(update|insert|delete|drop|alter)\s+public\./i);
 });
 test("POB unscored submit migration accepts NULL only for original P2, never historical",()=>{
  const sql=migrations("20261016072500_pob_unscored_paper2_submission.sql");
  expect(sql).toContain("v_row.subject_id='principles-of-business'");
  expect(sql).toContain("v_row.bank_version='pob-original-paper2-01'");
  expect(sql).toContain("p_max_score=100");
  expect(sql).toContain("p_score is not null");
  expect(sql).toContain("p_score is null");
  expect(sql).toContain("p_score > p_max_score");
  expect(sql).toContain("where id=p_attempt_id and user_id=auth.uid()");
  expect(sql).not.toContain("POB-P2-2026-JAN");
  expect(POB_SUPPLIED_ARCHIVE).toHaveLength(46);
 });
 test("a direct deploy of the older POB queue migration would remove live global budgets",()=>{
  // The next deployment must use a NEW budget-preserving migration.
  // Do not blindly replay a historical CREATE OR REPLACE function in production.
  const legacy=migrations("20261016072000_pob_paper2_semantic_queue.sql");
  expect(legacy).toContain("create or replace function public.spark_enqueue_marking");
  expect(legacy).toContain("pob-original-paper2-01");
  expect(legacy).not.toContain("daily_global_limit");
  expect(legacy).not.toContain("daily_token_budget");
  expect(ops("pob_live_marking_readiness_check.sql")).toContain("deployed_queue_preserves_global_token_budget");
 });
});
