// Run locally with: OPENAI_API_KEY=... SPARK_MARKING_MODEL=... node tools/pob-jan2026-calibrate.mjs
// Real provider execution only. Never invent scores or enable production grading.
// Reports contain student-like examples; keep them local and out of production logs.
import {build} from "esbuild";
import {mkdtemp,writeFile,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {pathToFileURL} from "node:url";

const validationOnly=process.argv.includes("--validate");
const apiKey=process.env.OPENAI_API_KEY;
const model=process.env.SPARK_MARKING_MODEL;
if(!validationOnly&&(!apiKey||!model)){console.error("Missing OPENAI_API_KEY or SPARK_MARKING_MODEL. No provider execution occurred.");process.exit(2);}
const dir=await mkdtemp(join(tmpdir(),"spark-pob-calibrate-"));
try{
 const entry=join(dir,"entry.mjs"),bundle=join(dir,"bundle.mjs");
 await writeFile(entry,`export {POB_JAN_2026_P2_BENCHMARK_CASES,validatePobJan2026BenchmarkFixtures} from ${JSON.stringify(new URL("../src/principlesOfBusiness/data/pobHistorical2026JanP2Benchmarks.js",import.meta.url).pathname)};\nexport {buildPob2026JanHistoricalPaper} from ${JSON.stringify(new URL("../src/principlesOfBusiness/data/pobHistorical2026JanP2RealPaper.js",import.meta.url).pathname)};\nexport {buildPobJan2026ExaminerPack} from ${JSON.stringify(new URL("../src/principlesOfBusiness/data/pobJan2026ExaminerMarking.js",import.meta.url).pathname)};\nexport {gradePobJan2026ExaminerPaper} from ${JSON.stringify(new URL("../src/grading/historicalPobExaminerPipeline.js",import.meta.url).pathname)};\n`);
 await build({entryPoints:[entry],outfile:bundle,bundle:true,platform:"node",format:"esm",loader:{".json":"json"}});
 const {POB_JAN_2026_P2_BENCHMARK_CASES:seed,validatePobJan2026BenchmarkFixtures:validate,buildPob2026JanHistoricalPaper:buildPaper,buildPobJan2026ExaminerPack:makePack,gradePobJan2026ExaminerPaper:grade}=await import(pathToFileURL(bundle).href);
 const source=buildPaper();
 const generated=source.questions.flatMap(q=>q.items.flatMap(part=>[
  {id:"all-parts-model-"+q.number+"-"+part.id,part:q.number+":"+part.id,
   responses:{
    [q.number+":"+part.id]:part.modelAnswer,
    ...(q.number===1&&part.id==="e.ii"?{"1:e.i":q.items.find(p=>p.id==="e.i").modelAnswer}:{}),
    ...(q.number===3&&part.id==="a.iii"?{"3:a.ii":q.items.find(p=>p.id==="a.ii").modelAnswer}:{})
   },
   min:part.marks,max:part.marks,reason:"SPARK proposed worked model answer. Full marks is a calibration hypothesis, not an adjudicated result."},
  {id:"all-parts-blank-"+q.number+"-"+part.id,part:q.number+":"+part.id,
   responses:{[q.number+":"+part.id]:""},min:0,max:0,reason:"Blank script receives zero."}
 ]));
 const cases=[...seed,...generated];
 const audit=validate();if(!audit.valid)throw Error("Fixture validation failed: "+audit.issues.join("; "));
 const keys=new Set(),coverage=new Set();
 for(const c of cases){
  if(keys.has(c.id))throw Error("Duplicate calibration case: "+c.id);
  keys.add(c.id);
  const responseKeys=Object.fromEntries(Object.entries(c.responses).map(([id,value])=>["POB-P2-2026-JAN:Q"+id,value]));
  const pack=makePack({responses:responseKeys});
  const found=source.questions.some(q=>q.items.some(i=>q.number+":"+i.id===c.part&&i.marks>=c.max));
  if(!found)throw Error("Out-of-range or unknown calibration target: "+c.id);
  if(c.min>0&&!pack.items.some(i=>i.constraints.primaryResponseKey==="POB-P2-2026-JAN:Q"+c.part))throw Error("Missing positive response: "+c.id);
  if(c.id.startsWith("all-parts-model-"))coverage.add(c.part);
 }
 if(cases.length!==84||coverage.size!==32)throw Error("Expected 84 cases covering all 32 printed parts.");
 if(validationOnly){
  console.log(JSON.stringify({status:"fixtures_valid_only",cases:cases.length,parts:coverage.size,printedMarks:100,providerExecuted:false,releaseApproved:false}));
  await rm(dir,{recursive:true,force:true});
  process.exit(0);
 }
 const results=[];let failures=0,disputed=0;const observedParts=new Set();
 for(const c of cases){
  const responses=Object.fromEntries(Object.entries(c.responses).map(([id,value])=>["POB-P2-2026-JAN:Q"+id,value]));
  const pack=makePack({responses});
  const targetId="POB-P2-2026-JAN:Q"+c.part;
  const item=pack.items.find(i=>i.constraints.primaryResponseKey===targetId);
  if(!item){if(c.min!==0||c.max!==0)failures++;results.push({id:c.id,result:c.min===0&&c.max===0?"blank":"failure",min:0,max:0});continue;}
  // Grade the ENTIRE linked source-backed submitted pack, not a fabricated item.
  try{
   const adjudicated=await grade({pack,model,apiKey});
   const row=adjudicated.parts.find(r=>r.id===targetId);
   const within=!adjudicated.uncertain&&row.marks>=c.min&&row.marks<=c.max;
   const result=adjudicated.uncertain?"disputed":within?"pass":"failure";
   observedParts.add(c.part);
   if(result==="disputed")disputed++;
   if(result==="failure")failures++;
   results.push({id:c.id,part:c.part,result,expected:[c.min,c.max],awarded:row.marks,range:[row.minMarks,row.maxPossibleMarks],reason:c.reason,feedback:row.criteria.map(criterion=>criterion.feedback).join(" | ").slice(0,1600)});
  }catch(error){failures++;results.push({id:c.id,result:"error",error:String(error.message||error)});}
  console.log(c.id+": "+results.at(-1).result);
 }
 const report={paper:"POB-P2-2026-JAN",model,runId:process.env.GITHUB_RUN_ID||null,sourceCommit:process.env.GITHUB_SHA||null,providerExecuted:true,generatedAt:new Date().toISOString(),cases:cases.length,failures,disputed,coverage:{uniqueParts:32,criterionMarks:100,semanticBenchmarkedParts:observedParts.size},results,releaseApproved:false};
 const out=process.env.SPARK_CALIBRATION_REPORT||join(process.cwd(),"pob-jan2026-calibration-results.json");
 await writeFile(out,JSON.stringify(report,null,2)+"\n",{mode:0o600});
 console.log("Wrote local report: "+out+". Scoring remains blocked.");
 if(failures||disputed||observedParts.size!==32)process.exitCode=1;
}finally{await rm(dir,{recursive:true,force:true});}
