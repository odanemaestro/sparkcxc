import {build} from 'esbuild';
import fs from 'node:fs';
const out=process.argv[2]||'artifacts/office-administration-calibration';
const bundled=await build({stdin:{contents:'export {OA_PAPER2S,oaPaper2Criteria} from "./src/officeAdministration/data/oaPaper2.js";export {oaSourceFixtures,evaluateOaSourceV2} from "./src/officeAdministration/oaMarkingV2.js";export {verifyCriterion} from "./src/grading/v2CriterionVerifier.js";',resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node'});
const data=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text).toString('base64'));
const results=[];
for(const p of data.OA_PAPER2S){const criteria=data.oaPaper2Criteria(p.id);for(const criterion of criteria){const source=data.oaSourceFixtures({paperId:p.id,criterion});results.push({paperId:p.id,...data.verifyCriterion({subjectId:'office-administration',paperId:p.id,criteria,criterionId:criterion.id,kind:source.kind,fixtures:source.fixtures})});}}
const summary={papers:data.OA_PAPER2S.length,criteria:results.length,verified:results.filter(r=>r.verified).length,failed:results.filter(r=>!r.verified).length,cases:results.reduce((n,r)=>n+r.results.length,0),marks:data.OA_PAPER2S.reduce((n,p)=>n+p.totalMarks,0)};
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(out+'/summary.json',JSON.stringify(summary,null,2)+'\n');fs.writeFileSync(out+'/evidence.json',JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(summary));for(const r of results.filter(r=>!r.verified))console.error(JSON.stringify({paper:r.paperId,id:r.criterionId,missing:r.missingClasses,uncommitted:r.uncommittedClasses,failures:r.failures}));
if(summary.failed)process.exitCode=1;
