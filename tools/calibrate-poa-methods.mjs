import assert from "node:assert/strict";
import fs from "node:fs";
import {build} from "esbuild";

const b=await build({stdin:{contents:`
 export * from './src/principlesOfAccounts/marking/poaMethodRegistry.js';
 export * from './src/principlesOfAccounts/marking/poaMethodEvaluator.js';
 export * from './src/grading/v2Fixtures/principlesOfAccountsMethods.js';
 export * from './src/grading/v2CriterionVerifier.js';
 export * from './src/principlesOfAccounts/calibration/poaHistoricalMethodsEarlyFixtures.js';
 export * from './src/principlesOfAccounts/calibration/poaHistoricalMethodsLateFixtures.js';
 export * from './src/principlesOfAccounts/calibration/poaSpecimenMethodFixtures.js';
 export * from './src/principlesOfAccounts/calibration/poaHistoricalLateSourceReadings.js';
 export * from './src/principlesOfAccounts/calibration/poaHistoricalLateFollowThrough.js';
 export * from './src/principlesOfAccounts/calibration/poaHistoricalLateSemanticCases.js';
 export * from './src/principlesOfAccounts/data/poaHistoricalPaper2.js';
 export * from './src/principlesOfAccounts/data/poaSpecimenPaper2.js';
 export * from './src/principlesOfAccounts/data/poaPrintedPapers.js';`,resolveDir:process.cwd()},write:false,bundle:true,platform:"node",format:"esm",logLevel:"error"});
const d=await import("data:text/javascript;base64,"+Buffer.from(b.outputFiles[0].text).toString("base64"));
const failures=[],seen=new Set();let criterionFixtures=0,sourceFixtures=0,independentNumbers=0;
const policies=new Map(d.POA_METHOD_QUESTION_POLICIES.map(q=>[q.paperId+"|"+q.questionNumber,q]));
for(const p of d.poaMethodPapers())for(const c of p.criteria){
 const key=c.sourceMarking.sourcePaperId+"|"+c.id;if(seen.has(key))continue;seen.add(key);
 const set=d.poaMethodFixtures({paperId:p.paperId,criterion:c});
 if(set.blocked){failures.push({key,blocked:set.blocked});continue;}
 const result=d.verifyCriterion({subjectId:"principles-of-accounts",paperId:p.paperId,criteria:p.criteria,criterionId:c.id,...set});
 criterionFixtures+=set.fixtures.length;
 if(!result.verified)failures.push({key,failures:result.failures,uncommitted:result.uncommittedClasses});
}
for(const {question,sections}of d.poaEarlyIndependentScripts())for(const section of sections)for(const {point,independentValue}of section.points){
 if(point.kind!=="number")continue;independentNumbers++;
 if(Math.abs(point.numbers[0].value-independentValue)>(point.numbers[0].tolerance??0.005)+1e-8)failures.push({key:question.paperId+"|"+point.id,kind:"independent-arithmetic-disagrees"});
}
for(const n of d.poaLateIndependentNumericRecipes()){
 const p=policies.get(n.paperId+"|"+n.questionNumber).sections.flatMap(s=>s.points).find(p=>p.id===n.pointId);independentNumbers++;
 if(Math.abs(p.numbers[0].value-n.value)>(p.numbers[0].tolerance??0.005)+1e-8)failures.push({key:n.paperId+"|"+n.pointId,kind:"independent-arithmetic-disagrees"});
}
const sources=[...d.POA_HISTORICAL_PAPER2_ARCHIVE,d.POA_SPECIMEN_PAPER2];
for(const f of [...d.POA_HISTORICAL_METHODS_EARLY_FIXTURES,...d.POA_HISTORICAL_METHODS_LATE_FIXTURES,...d.POA_SPECIMEN_METHOD_FIXTURES,...d.POA_LATE_SOURCE_READING_FIXTURES,...d.POA_LATE_FOLLOW_THROUGH_FIXTURES]){
 const policy=policies.get(f.paperId+"|"+f.questionNumber),paper=sources.find(p=>p.id===f.paperId),question=paper.questions.find(q=>q.number===f.questionNumber);
 let chosen=policy;
 if(f.pointId){const s=policy.sections.find(s=>s.points.some(p=>p.id===f.pointId)),point=s.points.find(p=>p.id===f.pointId);chosen={...policy,sections:[{...s,maxMarks:point.marks,points:[point]}]};}
 const result=d.evaluatePoaMethodQuestion({policy:chosen,response:f.response,question,printedQuestion:d.getPoaPrintedQuestions(f.paperId).find(q=>q.number===f.questionNumber),allResponses:{[f.questionNumber]:f.response}});
 const mustResolve=!f.pointId&&f.resolved===true;
 sourceFixtures++;
 if(f.expect===null?result.resolved:result.marks!==f.expect||mustResolve&&!result.resolved)
  failures.push({key:f.id||`${f.paperId}|${f.questionNumber}|${f.partId||""}|${f.cls}`,expect:f.expect,marks:result.marks,resolved:result.resolved,unclassified:result.unclassifiedLines});
}
// Held-out human phrasing may be recognized or withheld. It may never become a
// confident wrong mark. These cases are separate from proof-contract fixtures.
let semanticAccepted=0,semanticWithheld=0,semanticWrongRejected=0;
for(const [binding,f]of Object.entries(d.POA_HISTORICAL_LATE_SEMANTIC_CASES)){
 const [paperId,n,pointId]=binding.split("|"),policy=policies.get(paperId+"|"+n),section=policy.sections.find(s=>s.points.some(p=>p.id===pointId)),point=section.points.find(p=>p.id===pointId);
 const chosen={...policy,sections:[{...section,maxMarks:point.marks,points:[point]}]};
 for(const field of ["correct","alternative","wrong"]){
  const result=d.evaluatePoaMethodQuestion({policy:chosen,response:{working:f[field]}}),expected=field==="wrong"?0:point.marks;
  if(result.resolved&&result.marks!==expected)failures.push({key:binding,kind:"held-out-semantic",field,marks:result.marks,expected});
  if(field==="wrong")semanticWrongRejected+=result.marks===0?1:0;
  else if(result.resolved)semanticAccepted++;else semanticWithheld++;
 }
}
const report={passed:failures.length===0,authority:"spark-authored",sourcePapers:29,sourceQuestions:seen.size,validPaperVariants:94,
 independentNumericChecks:independentNumbers,criterionFixtures,sourceFixtures,
 heldOutSemantic:{accepted:semanticAccepted,withheld:semanticWithheld,wrongRejected:semanticWrongRejected},failures};
fs.mkdirSync(".audit-output",{recursive:true});fs.writeFileSync(".audit-output/poa-method-calibration.json",JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));assert.equal(failures.length,0,"Accounts method calibration failed");
