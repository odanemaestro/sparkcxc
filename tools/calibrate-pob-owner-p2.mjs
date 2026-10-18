// Controlled, synthetic-only benchmark for SPARK historical POB Paper 2.
// Opt-in live mode uses the SAME scoring pipeline as the marking worker, but
// never submits, modifies, or releases a student exam or database grade.
// Usage: node tools/calibrate-pob-owner-p2.mjs --plan
//        OPENAI_API_KEY=... SPARK_MARKING_MODEL=... node tools/calibrate-pob-owner-p2.mjs --all
import {build} from "esbuild";
import {mkdir,writeFile} from "node:fs/promises";
import {resolve} from "node:path";

const argv=process.argv.slice(2);
const plan=argv.includes("--plan"),all=argv.includes("--all");
const nArg=argv.find(a=>a.startsWith("--limit="));
const limit=all?Infinity:nArg?Number(nArg.slice("--limit=".length)):4;
if(!Number.isInteger(limit)&&limit!==Infinity)throw new Error("Provide --limit=<integer> or --all");
if(limit<=0)throw new Error("Calibration sample size must be positive");

const bundled=await build({
 stdin:{contents:`export {POB_OWNER_P2_BENCHMARK} from "./src/grading/pobOwnerP2CalibrationFixtures.js";
 export {buildPobArchiveExaminerPack,gradePobArchiveExaminerPaper} from "./src/grading/pobArchiveExaminer.js";`,
 resolveDir:process.cwd(),sourcefile:"pob-calibration-entry.js",loader:"js"},
 bundle:true,platform:"node",format:"esm",target:"node20",write:false
});
const code=Buffer.from(bundled.outputFiles[0].text).toString("base64");
const {POB_OWNER_P2_BENCHMARK:fixtures,buildPobArchiveExaminerPack:makePack,gradePobArchiveExaminerPaper:grade}=await import("data:text/javascript;base64,"+code);
const paperId="POB-P2-2022-JAN",selectedQuestions=[1,2,3,4,5];
const empty=makePack({paperId,ownerSource:true,selectedQuestions});
for(const fixture of fixtures){
 const part=empty.parts.find(p=>p.id===paperId+":"+fixture.part);
 if(!part||part.maxMarks!==fixture.maxMarks)throw new Error("Fixture/bank mark mismatch: "+fixture.id);
}
if(plan){
 console.log(JSON.stringify({mode:"preflight-only",paperId,fixtures:fixtures.length,
  categories:[...new Set(fixtures.map(x=>x.category))],
  selectedQuestions,maxMarks:empty.maxMarks,sourceSha256:empty.sourceSha256,
  note:"No provider called; this does not certify examiner agreement."},null,2));
 process.exit(0);
}
const model=process.env.SPARK_MARKING_MODEL,apiKey=process.env.OPENAI_API_KEY;
if(!model||!apiKey)throw new Error("Live calibration requires SPARK_MARKING_MODEL and OPENAI_API_KEY; no scoring requested.");
const cases=fixtures.slice(0,limit),records=[];
for(const fixture of cases){
 const id=paperId+":"+fixture.part;
 const pack=makePack({paperId,ownerSource:true,selectedQuestions,responses:{[id]:fixture.answer}});
 try{
  const result=await grade({pack,model,apiKey});
  const part=result.parts.find(p=>p.id===id);
  if(!part)throw new Error("Missing assessed part");
  records.push({id:fixture.id,category:fixture.category,expectedMarks:fixture.expectedMarks,
   score:part.marks,min:part.minMarks,max:part.maxPossibleMarks,
   exact:part.marks===fixture.expectedMarks,uncertain:part.marks===null,
   error:null});
 }catch(error){
  records.push({id:fixture.id,category:fixture.category,expectedMarks:fixture.expectedMarks,
   score:null,uncertain:true,error:String(error?.message||"provider_error").slice(0,120)});
 }
 console.log(fixture.id+": "+(records.at(-1).score===null?"unresolved":records.at(-1).score)+"/"+fixture.maxMarks);
}
const deviations=records.filter(r=>r.score!==null).map(r=>Math.abs(r.score-r.expectedMarks));
const maximumError=deviations.length?Math.max(...deviations):null;
const meanAbsoluteError=deviations.length?deviations.reduce((n,a)=>n+a,0)/deviations.length:null;
const crucial=records.filter(r=>["incorrect","adversarial","duplicate"].includes(r.category));
const criticalFalseCredit=crucial.filter(r=>r.score!==null&&r.score>r.expectedMarks);
const complete=records.length===fixtures.length;
const passed=complete&&records.every(r=>r.score!==null&&!r.error)&&
 criticalFalseCredit.length===0&&maximumError<=1&&meanAbsoluteError<=0.5&&
 records.filter(r=>r.exact).length/records.length>=0.75;
const report={paperId,model,version:empty.bankVersion,rubricVersion:empty.rubricVersion,
 sourceSha256:empty.sourceSha256,runAt:new Date().toISOString(),
 sampleCount:records.length,expectedCaseCount:fixtures.length,complete,
 exactMatchCount:records.filter(r=>r.exact).length,maximumError,meanAbsoluteError,
 criticalFalseCreditCount:criticalFalseCredit.length,passed,
 records,
 warning:"Synthetic SPARK reference fixtures only. This is not an official CXC marking certification, nor a public release approval."};
await mkdir(resolve("artifacts"),{recursive:true});
await writeFile(resolve("artifacts/pob-owner-paper2-calibration.json"),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify({complete,passed,meanAbsoluteError,
 exactMatchCount:report.exactMatchCount,criticalFalseCreditCount:report.criticalFalseCreditCount},null,2));
if(!passed)process.exitCode=1;
