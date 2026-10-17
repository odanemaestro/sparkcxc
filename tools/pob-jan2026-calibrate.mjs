// Run locally with: OPENAI_API_KEY=... SPARK_MARKING_MODEL=... node tools/pob-jan2026-calibrate.mjs
// Real provider execution only. Never invent scores or enable production grading.
// Reports contain student-like examples; keep them local and out of production logs.
import {build} from "esbuild";
import {mkdtemp,readFile,writeFile,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {pathToFileURL} from "node:url";

const apiKey=process.env.OPENAI_API_KEY;
const model=process.env.SPARK_MARKING_MODEL;
if(!apiKey||!model){console.error("Missing OPENAI_API_KEY or SPARK_MARKING_MODEL. No calibration run occurred.");process.exit(2);}
const dir=await mkdtemp(join(tmpdir(),"spark-pob-calibrate-"));
try{
 const entry=join(dir,"entry.mjs"),bundle=join(dir,"bundle.mjs");
 await writeFile(entry,`export {POB_JAN_2026_P2_BENCHMARK_CASES,validatePobJan2026BenchmarkFixtures} from ${JSON.stringify(new URL("../src/principlesOfBusiness/data/pobHistorical2026JanP2Benchmarks.js",import.meta.url).pathname)};\nexport {buildPob2026JanHistoricalPaper} from ${JSON.stringify(new URL("../src/principlesOfBusiness/data/pobHistorical2026JanP2RealPaper.js",import.meta.url).pathname)};\nexport {buildPob2026JanHistoricalCalibrationPack} from ${JSON.stringify(new URL("../src/principlesOfBusiness/data/pobHistorical2026JanP2CalibrationPack.js",import.meta.url).pathname)};\nexport {requestSemanticPass,reconcileSemanticPasses} from ${JSON.stringify(new URL("../src/grading/semanticMarking.js",import.meta.url).pathname)};\n`);
 await build({entryPoints:[entry],outfile:bundle,bundle:true,platform:"node",format:"esm",loader:{".json":"json"}});
 const {POB_JAN_2026_P2_BENCHMARK_CASES:seed,validatePobJan2026BenchmarkFixtures:validate,buildPob2026JanHistoricalPaper:buildPaper,buildPob2026JanHistoricalCalibrationPack:makePack,requestSemanticPass:request,reconcileSemanticPasses:reconcile}=await import(pathToFileURL(bundle).href);
 const source=buildPaper();
 const generated=source.questions.flatMap(q=>q.items.flatMap(part=>[
  {id:"all-parts-model-"+q.number+"-"+part.id,part:q.number+":"+part.id,
   responses:{[q.number+":"+part.id]:part.modelAnswer},
   min:part.marks,max:part.marks,reason:"SPARK proposed worked model answer. Full marks is a calibration hypothesis, not an adjudicated result."},
  {id:"all-parts-blank-"+q.number+"-"+part.id,part:q.number+":"+part.id,
   responses:{[q.number+":"+part.id]:""},min:0,max:0,reason:"Blank script receives zero."}
 ]));
 const cases=[...seed,...generated];
 const audit=validate();if(!audit.valid)throw Error("Fixture validation failed: "+audit.issues.join("; "));
 const results=[];let failures=0,disputed=0;const observedParts=new Set();
 for(const c of cases){
  const responses=Object.fromEntries(Object.entries(c.responses).map(([id,value])=>["POB-P2-2026-JAN:Q"+id,value]));
  const pack=makePack({responses});
  const targetId="POB-P2-2026-JAN:Q"+c.part;
  const item=pack.items.find(i=>i.id===targetId);
  if(!item){if(c.min!==0||c.max!==0)failures++;results.push({id:c.id,result:c.min===0&&c.max===0?"blank":"failure",min:0,max:0});continue;}
  // Grade the ENTIRE linked source-backed submitted pack, not a fabricated item.
  try{
   const first=await request({model,apiKey,items:pack.items,responses:pack.responses,pass:1});
   const second=await request({model,apiKey,items:pack.items,responses:pack.responses,pass:2});
   const adjudicated=reconcile(first,second,pack.items,pack.responses);
   const row=adjudicated.criteria.find(r=>r.id===targetId);
   const within=!adjudicated.uncertain&&row.marks>=c.min&&row.marks<=c.max;
   const result=adjudicated.uncertain?"disputed":within?"pass":"failure";\n   observedParts.add(c.part);
   if(result==="disputed")disputed++;
   if(result==="failure")failures++;
   results.push({id:c.id,part:c.part,result,expected:[c.min,c.max],awarded:row.marks,range:[row.minMarks,row.maxPossibleMarks],reason:c.reason,feedback:row.feedback});
  }catch(error){failures++;results.push({id:c.id,result:"error",error:String(error.message||error)});}
  console.log(c.id+": "+results.at(-1).result);
 }
 const report={paper:"POB-P2-2026-JAN",model,generatedAt:new Date().toISOString(),cases:cases.length,failures,disputed,coverage:{uniqueParts:32,criterionMarks:100,semanticBenchmarkedParts:observedParts.size},results,releaseApproved:false};
 const out=process.env.SPARK_CALIBRATION_REPORT||join(process.cwd(),"pob-jan2026-calibration-results.json");
 await writeFile(out,JSON.stringify(report,null,2)+"\n",{mode:0o600});
 console.log("Wrote local report: "+out+". Scoring remains blocked.");
 if(failures||disputed||observedParts.size!==32)process.exitCode=1;
}finally{await rm(dir,{recursive:true,force:true});}
