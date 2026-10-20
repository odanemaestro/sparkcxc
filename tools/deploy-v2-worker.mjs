import {execSync} from "node:child_process";
import fs from "node:fs";
/**
 * Build and deploy the private V2 marking worker.
 *
 *   node tools/deploy-v2-worker.mjs --project-ref <ref>
 *
 * Builds the examiner bundle from the committed sources, places it beside the
 * worker entrypoint for the deploy only, deploys with JWT verification kept
 * on (supabase/config.toml), and removes the copies afterwards. Refuses to
 * deploy from a working tree with uncommitted grading changes, so the
 * deployed bundle always corresponds to a commit.
 */
const ref=process.argv[process.argv.indexOf("--project-ref")+1];
if(!/^[a-z0-9]{20}$/.test(ref||""))throw new Error("--project-ref is required");
const dirty=execSync("git status --porcelain src supabase/functions tools").toString()
 .split("\n").filter(line=>line.trim()&&!/supabase\/functions\/_shared\//.test(line));
if(dirty.length)throw new Error("Commit grading changes before deploying:\n"+dirty.join("\n"));
execSync("node tools/build-server-marker-v2.mjs",{stdio:"inherit"});
const dir="supabase/functions/mark-paper2-v2-shadow";
const copies=["server-marker-v2.mjs","server-marker-v2-checksum.mjs"];
for(const f of copies)fs.copyFileSync("supabase/functions/_shared/"+f,dir+"/"+f);
try{
 execSync(`npx supabase functions deploy mark-paper2-v2-shadow --project-ref ${ref} --use-api`,{stdio:"inherit"});
}finally{
 for(const f of copies)fs.rmSync(dir+"/"+f,{force:true});
}
const sha=fs.readFileSync("supabase/functions/_shared/server-marker-v2.sha256","utf8").trim();
console.log("Deployed V2 worker with examiner bundle",sha,"at",execSync("git rev-parse HEAD").toString().trim());
