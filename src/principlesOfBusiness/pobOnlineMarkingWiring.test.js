import fs from "fs";
import path from "path";
const source=(...parts)=>fs.readFileSync(path.join(process.cwd(),...parts),"utf8");
describe("POB secure online marking wiring",()=>{
 test("client saves an unscored response snapshot, never submits made-up grades",()=>{
  const view=source("src","principlesOfBusiness","practice","PobPracticeHub.jsx");
  expect(view).toContain("startServerExamAttempt");
  expect(view).toContain("submitServerExamAttempt");
  expect(view).toContain("score:null,maxScore:100");
  expect(view).toContain("serverAttemptId");
  expect(view).toContain("<ServerMarkingReview");
 });
 test("DB only accepts original POB Paper 2 without a client-authored score",()=>{
  const sql=source("supabase","migrations","20261016072500_pob_unscored_paper2_submission.sql");
  expect(sql).toContain("v_row.bank_version='pob-original-paper2-01'");
  expect(sql).toContain("p_score is not null");
  expect(sql).toContain("'pending-server-marking'");
 });
 test("queue allows only the trusted original bank and remains opt-in",()=>{
  const sql=source("supabase","migrations","20261016072000_pob_paper2_semantic_queue.sql");
  expect(sql).toContain("v_attempt.bank_version is distinct from 'pob-original-paper2-01'");
  expect(sql).toContain("if not v_config.enabled then raise exception");
  expect(sql).toContain("spark_enqueue_marking");
 });
 test("worker retains two independent semantic passes and server-owned rubric",()=>{
  const worker=source("supabase","functions","mark-paper2","index.ts");
  expect(worker).toContain("buildTrustedAssessment(attempt,{historicalJan2026Enabled})");
  expect(worker).toContain('Deno.env.get("SPARK_POB_HISTORICAL_JAN2026_WORKER_ENABLED")==="true"');
  expect(worker).not.toContain("buildTrustedAssessment(attempt,attempt.metadata)");
  expect(worker).toContain("requestSemanticPass");
  expect(worker).toContain("reconcileSemanticPasses");
  expect(worker).toContain("score:semantic.uncertain||pack.unassessedMarks?null");
 });
});
