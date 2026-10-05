import {build} from "esbuild";
import {createHash} from "node:crypto";
import fs from "node:fs";
import path from "node:path";
const outfile="supabase/functions/_shared/server-marker.mjs";
await build({absWorkingDir:process.cwd(),entryPoints:[path.resolve("src/grading/serverAssessment.js")],tsconfigRaw:{},bundle:true,format:"esm",platform:"neutral",target:"es2022",outfile,legalComments:"none"});
const checksum=createHash("sha256").update(fs.readFileSync(outfile)).digest("hex");
fs.writeFileSync("supabase/functions/_shared/server-marker.sha256",`${checksum}\n`);
console.log(`Built trusted marker ${checksum.slice(0,12)}`);
