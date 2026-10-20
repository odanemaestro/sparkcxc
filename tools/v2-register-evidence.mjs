import {execFileSync} from "node:child_process";
import {randomBytes} from "node:crypto";
import fs from "node:fs";
/**
 * Register verified V2 evidence in a Supabase project and release papers.
 *
 *   node tools/v2-register-evidence.mjs --project-ref <ref> [--dir artifacts/v2-verification]
 *        [--subject <id>] [--release]
 *
 * One transaction per paper: all of that paper's criterion records, then its
 * end-to-end record, then (with --release) the gated activation. The database
 * re-validates everything; any rejection rolls back that paper only. Every
 * insert is idempotent, so the tool can be re-run after any interruption.
 */
const arg=n=>{const i=process.argv.indexOf(n);return i>0?process.argv[i+1]:null;};
const ref=arg("--project-ref");
if(!/^[a-z0-9]{20}$/.test(ref||""))throw new Error("--project-ref is required");
const dir=arg("--dir")||"artifacts/v2-verification";
const subject=arg("--subject");
const doRelease=process.argv.includes("--release");
const evidence=JSON.parse(fs.readFileSync(dir+"/evidence.json","utf8"));
const papers=JSON.parse(fs.readFileSync(dir+"/papers.json","utf8"))
 .filter(p=>p.outcome==="verified"&&(!subject||p.subjectId===subject));
const tmp=".v2work/register";fs.mkdirSync(tmp,{recursive:true});
const quote=json=>{const tag="ev"+randomBytes(6).toString("hex");return `$${tag}$${json}$${tag}$`;};
const lit=s=>"'"+String(s).replace(/'/g,"''")+"'";
const results=[];
for(const p of papers){
 const mine=evidence.filter(r=>r.subjectId===p.subjectId&&r.paperId===p.paperId&&
  r.rubricVersion===p.rubricVersion&&r.outcome==="verified");
 const sql=`begin;
select spark_grading_private.register_criterion_verifications_v2(${quote(JSON.stringify(mine))}::jsonb);
select spark_grading_private.register_paper_verification_v2(${quote(JSON.stringify(p))}::jsonb);
${doRelease?`select spark_grading_private.release_verified_rubric_v2(${lit(p.subjectId)},${lit(p.paperId)},${lit(p.rubricVersion)});`:""}
commit;
select r.subject_id,r.paper_id,r.verified_criteria,r.criteria,r.paper_verified,
 g.verification_status,g.active from spark_grading_private.rubric_release_status_v2 r
 join spark_grading_private.rubrics_v2 g using(subject_id,paper_id,rubric_version)
 where r.subject_id=${lit(p.subjectId)} and r.paper_id=${lit(p.paperId)} and r.rubric_version=${lit(p.rubricVersion)};`;
 const file=`${tmp}/${p.subjectId}-${p.paperId}.sql`;
 fs.writeFileSync(file,sql);
 try{
  const out=execFileSync(process.platform==="win32"?"npx.cmd":"npx",
   ["supabase","db","query","--linked","--project-ref",ref,"-f",file],
   {encoding:"utf8",stdio:["ignore","pipe","pipe"],shell:process.platform==="win32"});
  const rows=JSON.parse(out.slice(out.indexOf("{"))).rows;
  results.push({paper:p.subjectId+"/"+p.paperId,ok:true,...rows[0]});
 }catch(e){
  results.push({paper:p.subjectId+"/"+p.paperId,ok:false,error:String(e.stderr||e.message).slice(0,400)});
 }finally{fs.rmSync(file,{force:true});}
}
console.table(results);
if(results.some(r=>!r.ok))process.exitCode=1;
