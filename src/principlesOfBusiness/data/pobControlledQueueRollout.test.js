import fs from "fs";
import path from "path";
import {POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./pobHistoricalInventory";
import {buildTrustedAssessment} from "../../grading/serverAssessment";

const file=(...parts)=>fs.readFileSync(path.join(process.cwd(),...parts),"utf8");
const migration=file("supabase","migrations","20261017190000_pob_original_p2_controlled_queue.sql");

describe("POB original Paper 02 guarded queue rollout",()=>{
 test("migration cannot switch on automatic POB grades by default",()=>{
  expect(migration).toContain("pob_original_enabled boolean not null default false");
  expect(migration).toContain("pob_internal_tester_user_id uuid default null");
  expect(migration).toContain("not coalesce(v_config.pob_original_enabled,false)");
  expect(migration).toContain("v_config.pob_internal_tester_user_id is null");
  expect(migration).toContain("auth.uid() is distinct from v_config.pob_internal_tester_user_id");
  expect(migration).toContain("v_attempt.subject_id = 'principles-of-business'");
  expect(migration).not.toMatch(/update\s+public\.spark_marking_config\s+set/i);
  expect(migration).not.toMatch(/\bset\s+pob_original_enabled\s*=\s*true/i);
  expect(migration).toContain("create or replace function public.spark_enqueue_marking");
 });
 test("queue requires trusted original bank, exact metadata, server-unscored paper and 100-mark maximum",()=>{
  expect(migration).toContain("v_attempt.bank_version is distinct from 'pob-original-paper2-01'");
  expect(migration).toContain("v_attempt.metadata->>'paper_id' is distinct from 'pob-original-paper2-01'");
  expect(migration).toContain("v_attempt.score is not null");
  expect(migration).toContain("v_attempt.max_score is distinct from 100");
  expect(migration).toContain("v_attempt.status <> 'submitted'");
  expect(migration).toContain("user_id = auth.uid()");
  expect(migration).toContain("v_attempt.paper <> '02'");
  for(const source of POB_SUPPLIED_ARCHIVE)expect(migration).not.toContain(source.id);
  expect(pobReleasedHistoricalPapers()).toHaveLength(0);
 });
 test("the latest queue migration retains all deployed global and per-user budget safeguards",()=>{
  for(const token of [
   "hashtextextended(auth.uid()::text, 0)",
   "hashtextextended('spark-marking-daily-budget', 0)",
   "v_config.daily_user_limit",
   "v_config.daily_global_limit",
   "v_config.per_job_token_reservation",
   "v_config.daily_token_budget",
   "reserved_tokens",
   "v_config.revision",
   "attempt_id = p_attempt_id",
   "if found then",
   "revoke all on function public.spark_enqueue_marking(uuid) from public,anon",
   "grant execute on function public.spark_enqueue_marking(uuid) to authenticated"
  ])expect(migration).toContain(token);
  expect(migration).not.toMatch(/\bgrant\s+execute\s+on\s+function\s+public\.spark_enqueue_marking\(uuid\)\s+to\s+anon/i);
 });
 test("the trusted grading pack still fails closed on every historical POB bank",()=>{
  const base={
   status:"submitted",subject_id:"principles-of-business",paper:"02",
   response_snapshot:{"Q1:a":"A student answer"},metadata:{paper_id:"pob-original-paper2-01"},
   bank_version:"pob-original-paper2-01"
  };
  expect(buildTrustedAssessment(base)).toHaveProperty("maxMarks",100);
  for(const source of POB_SUPPLIED_ARCHIVE.filter(s=>s.paper===2)){
   expect(()=>buildTrustedAssessment({...base,bank_version:source.id})).toThrow("unsupported_bank_version");
   expect(()=>buildTrustedAssessment({...base,metadata:{paper_id:source.id}})).toThrow("unknown_paper");
  }
 });
});
