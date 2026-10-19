import fs from "node:fs";
import path from "node:path";

const root=path.join(process.cwd(),"supabase/migrations");
const gate=fs.readFileSync(path.join(root,"20261019133000_marking_v2_criterion_approval_gate.sql"),"utf8");
const drafts=fs.readFileSync(path.join(root,"20261019123000_marking_v2_seven_subject_source_drafts.sql"),"utf8");
const worker=fs.readFileSync(path.join(process.cwd(),"supabase/functions/mark-paper2-v2-shadow/index.ts"),"utf8");

test("all seven additional subjects have draft-only paper registrations",()=>{
 const subjects=["mathematics","chemistry","english-a","social-studies",
  "food-nutrition-and-health","principles-of-business","integrated-science"];
 for(const subject of subjects)expect(drafts).toContain("values ('"+subject+"'");
 expect((drafts.match(/insert into spark_grading_private\.rubrics_v2/g)||[])).toHaveLength(54);
 expect((drafts.match(/false,'draft'/g)||[])).toHaveLength(54);
 expect(drafts).not.toMatch(/true,'verified'/);
});
test("a V2 rubric requires independent reviews matching its source criterion hash",()=>{
 expect(gate).toContain("rubrics_v2_requires_criterion_approval");
 expect(gate).toContain("criterion_sha256=encode(pg_catalog.sha256");
 expect(gate).toContain("x.verified_by<>new.verified_by");
 expect(gate).toContain("new.expected_total_marks");
 expect(gate).toContain("Missing independent criterion-level approvals");
 expect(gate).toContain("Verified V2 rubric is immutable");
 expect(gate).toContain("revoke all on spark_grading_private.rubric_criterion_reviews_v2");
});
test("V2 worker delegates final publication to the private server gate",()=>{
 expect(worker).toContain("spark_v2_complete_subject_job");
 expect(worker).not.toMatch(/update\s+public\.spark_exam_attempts/i);
});
