import fs from "fs";
import path from "path";
import physics1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import physics2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import physics3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import physics4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
import it from "../informationTechnology/practice/itPaper2Data.json";

const migration=fs.readFileSync(path.join(process.cwd(),
 "supabase/migrations/20261019113000_marking_v2_physics_it_draft_source_rubrics.sql"),"utf8");
const gate=fs.readFileSync(path.join(process.cwd(),
 "supabase/migrations/20261019110000_marking_v2_review_gate_worker_bridge.sql"),"utf8");
const worker=fs.readFileSync(path.join(process.cwd(),
 "supabase/functions/mark-paper2-v2-shadow/index.ts"),"utf8");

test("all 13 real Physics and IT papers are staged with their actual source IDs",()=>{
 const papers=[...([physics1,physics2,physics3,physics4].map(p=>({
  subject:"physics",id:p.paper_id,total:p.marks,
  parts:p.questions.flatMap(q=>q.parts).map(p=>p.marks)
 }))),...it.papers.map(p=>({subject:"information-technology",id:p.id,
  total:it.format.marks,parts:p.questions.flatMap(q=>q.parts).map(p=>p.marks)}))];
 expect(papers).toHaveLength(13);
 for(const p of papers){
  expect(p.parts.reduce((sum,m)=>sum+m,0)).toBe(p.total);
  expect(migration).toContain("'"+p.id+"'");
 }
 expect((migration.match(/insert into spark_grading_private.rubrics_v2/g)||[])).toHaveLength(13);
 expect((migration.match(/false,'draft'/g)||[])).toHaveLength(13);
 expect(migration).not.toMatch(/true,'verified'/);
});
test("attestation gate never considers unreviewed source rubrics active",()=>{
 expect(gate).toContain("verification_status='verified'");
 expect(gate).toContain("rubrics_v2_active_requires_review");
 expect(gate).toContain("verified_by");
 expect(gate).toContain("source_sha256");
 expect(gate).not.toMatch(/update\s+(?:public\.)?spark_exam_attempts\s+set/i);
});
test("shadow worker is separated from live examiner score publication",()=>{
 expect(worker).toContain("spark_v2_claim_next_shadow_job");
 expect(worker).toContain("spark_v2_finish_shadow_job");
 expect(worker).toContain('canPublishFinalScore:false');
 expect(worker).toContain("SUPABASE_SERVICE_ROLE_KEY");
 expect(worker).not.toContain("spark_finish_marking");
 expect(worker).not.toMatch(/\.from\(["']spark_exam_attempts["']\)\.update/);
});
