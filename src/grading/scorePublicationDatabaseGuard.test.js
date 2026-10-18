import fs from "fs";
import path from "path";

const migration=fs.readFileSync(path.join(process.cwd(),"supabase","migrations",
 "20261018170500_paper2_final_score_publication_guard.sql"),"utf8");

test("server saves English A / Integrated Science Paper 2 responses without certifying browser scores",()=>{
 expect(migration).toMatch(/v_nullable_written\s*:=\s*v_row\.paper='02'/);
 expect(migration).toContain("'english-a','integrated-science'");
 expect(migration).toContain("when v_nullable_written then null else p_score");
 expect(migration).toContain("'server-unverified-written-practice'");
 expect(migration).toContain("when v_nullable_written or v_owner_pob then 'requires-review'");
});
test("preserve POB original Paper 2 unscored submission and source-bank guard",()=>{
 expect(migration).toContain("v_historical :=");
 expect(migration).toContain("v_archive boolean := false");
 expect(migration).toContain("pob_historical_jan26_canary_enabled");
 expect(migration).toContain("pob_owner_p2_source_pilot_enabled");
 expect(migration).toContain("Historical archive POB submission not enabled");
 expect(migration).toContain("- 'selected_questions'");
 expect(migration).toContain("v_row.bank_version='pob-original-paper2-01'");
 expect(migration).toContain("p_score is not null");
 expect(migration).toContain("if (v_row.subject_id='principles-of-business'");
});
test("DB function still validates ownership, response size, score bounds and definer privileges",()=>{
 expect(migration).toContain("user_id=auth.uid()");
 expect(migration).toContain("set search_path = ''");
 expect(migration).toContain("octet_length(p_response_snapshot::text) > 2097152");
 expect(migration).toContain("octet_length(coalesce(p_metadata,'{}'::jsonb)::text) > 16384");
 expect(migration).toContain("p_score > p_max_score");
 expect(migration).toContain("revoke execute on function public.spark_submit_exam_attempt");
 expect(migration).toContain("to authenticated;");
});
