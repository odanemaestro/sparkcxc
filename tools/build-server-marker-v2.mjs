import {build} from "esbuild";
import {createHash} from "node:crypto";
import fs from "node:fs";
import path from "node:path";
/**
 * Compile SPARK's existing deterministic Paper 2 course engines as one
 * server-only self-contained module. The worker is the only consumer.
 * No browser/user supplied code is executed.
 */
const outfile="supabase/functions/_shared/server-marker-v2.mjs";
await build({
 absWorkingDir:process.cwd(),
 entryPoints:[path.resolve("src/grading/serverPaper2V2SubjectEngine.js")],
 bundle:true,format:"esm",platform:"neutral",target:"es2022",
 legalComments:"none",minify:true,outfile,logLevel:"warning"
});
const file=fs.readFileSync(outfile);
const checksum=createHash("sha256").update(file).digest("hex");
fs.writeFileSync("supabase/functions/_shared/server-marker-v2.sha256",checksum+"\n");
console.log("Built private nine-subject V2 marker",file.length,"bytes",checksum.slice(0,16));
