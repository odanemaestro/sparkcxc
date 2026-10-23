/**
 * One complete V2 criterion verification run over every registered paper.
 *
 * For each criterion: load its source-bound fixtures, grade every fixture with
 * the real examiner in full-paper context, and produce an evidence record.
 * Criteria without fixtures, or whose subject has no reviewed resolution
 * policy, are recorded as "blocked" with the precise reason, never approved.
 */
import {verifyCriterion,VERIFIER_VERSION} from "./v2CriterionVerifier";
import {verifyPaper} from "./v2PaperVerification";
import {informationTechnologyFixtures} from "./v2Fixtures/informationTechnology";
import {informationTechnologyPaper2RuleFor} from "../informationTechnology/practice/itPaper2Marking";
import itPaper2Archive from "../informationTechnology/practice/itPaper2Data.json";
import {mathematicsFixtures} from "./v2Fixtures/mathematics";
import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";

import {scienceFixtures,pointAnswer} from "./v2Fixtures/science";
import {CHEMISTRY_PAPER2_PRACTICE_SETS} from "../chemistry/data/chemistryPaper2Bank";
import {CURATED_CHEMISTRY} from "./v2Fixtures/chemistryCurated";
import {CURATED_FNH} from "./v2Fixtures/fnhCurated";
import {fnhPointValue,fnhDistinctPairs} from "../fnh/practice/fnhPaper2Marking";
import INTEGRATED_SCIENCE_PAPER2_SPECS from "../integratedScience/data/integratedSciencePaper2Specs.json";
import {integratedScienceStructuredFixtures} from "./v2Fixtures/integratedScience";
import {integratedScienceHypothesisFixtures} from "./v2Fixtures/integratedScienceHypothesis";
import {integratedScienceRustTableFixtures} from "./v2Fixtures/integratedScienceRustTable";
import {additionalTableFixtures} from "./v2Fixtures/integratedScienceAdditionalTables";
import {integratedScienceParticleFixtures} from "./v2Fixtures/integratedScienceParticles";
import {integratedScienceCircuitSymbolFixtures} from "./v2Fixtures/integratedScienceCircuitSymbols";
import {integratedScienceCircuitFixtures} from "./v2Fixtures/integratedScienceCircuits";
import {filtrationSourceFixtures} from "./v2Fixtures/integratedScienceFiltration";
import {integratedScienceGraphInText} from "../integratedScience/practice/integratedSciencePaper2Grader";
import {CURATED_IS} from "./v2Fixtures/integratedScienceCurated";
import {physicsFixtures} from "./v2Fixtures/physics";
import {CURATED_PHYSICS} from "./v2Fixtures/physicsCurated";
import physicsSource1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import physicsSource2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import physicsSource3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import physicsSource4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
const physicsSources=new Map([physicsSource1,physicsSource2,physicsSource3,physicsSource4].map(p=>[p.paper_id,p]));

// Criteria of every paper in the current run, for on-topic wrong answers.
const papersById=new Map();

function chemistryItem(paperId,criterionId){
 const paper=CHEMISTRY_PAPER2_PRACTICE_SETS.find(p=>p.id===paperId);
 for(const q of paper?.questions||[])for(const part of q.parts)for(const item of part.items)
  if(q.id+"::"+part.label+"::"+item.label===criterionId)return {paper,question:q,item};
 return null;
}
function chemistryOthers(paper,exclude){
 return paper.questions.flatMap(q=>q.parts.flatMap(p=>p.items))
  .filter(it=>it!==exclude&&(it.response?.type||"lines")==="lines")
  .map(it=>(it.markScheme?.points||[]).map(pointAnswer).join(". ")).filter(Boolean);
}
function mathPart(criterionId){
 const [qid,pid]=criterionId.split("::");
 return PAPER2_QUESTION_BANK.find(q=>q.question_id===qid)?.parts.find(p=>p.id===pid)||null;
}

function itContext(paperId,criterionId){
 const paper=itPaper2Archive.papers.find(p=>p.id===paperId);
 for(const question of paper?.questions||[])for(const part of question.parts)
  if(question.number+"-"+part.id===criterionId)
   return {question,part,rule:informationTechnologyPaper2RuleFor(question,part)};
 return null;
}

/** Returns {kind, fixtures, sourceAnswer, alternatives, ruleId} or {blocked}. */
export function fixturesForCriterion({subjectId,paperId,criterion}){
 if(subjectId==="information-technology"){
  const ctx=itContext(paperId,criterion.id);
  if(!ctx)return {blocked:"criterion-not-found-in-source-archive"};
  const set=informationTechnologyFixtures({...ctx,maxMarks:criterion.maxMarks});
  if(!set)return {blocked:"no-source-fixtures-for-rule:"+ctx.rule};
  return {...set,ruleId:"it:"+ctx.rule};
 }
 if(subjectId==="mathematics"){
  const set=mathematicsFixtures({criterion,part:mathPart(criterion.id),maxMarks:criterion.maxMarks});
  if(set.blocked)return set;
  return {...set,ruleId:"math:"+(criterion.sourceMarking?.criteria||[]).map(c=>c.code+"="+(c.check?.type||"?")).join(",")};
 }
 if(subjectId==="chemistry"){
  const ctx=chemistryItem(paperId,criterion.id);
  if(!ctx)return {blocked:"criterion-not-found-in-source-bank"};
  const graphPart=ctx.question.parts.flatMap(part=>part.items.map(item=>({part,item})))
   .find(x=>x.item.response?.type==="graph");
  const set=scienceFixtures({item:ctx.item,maxMarks:criterion.maxMarks,criterionId:criterion.id,
   graph:graphPart?{id:ctx.question.id+"::"+graphPart.part.label+"::"+graphPart.item.label,item:graphPart.item}:null,
   others:chemistryOthers(ctx.paper,ctx.item),curated:CURATED_CHEMISTRY[criterion.id]||[]});
  if(set.blocked)return set;
  return {...set,ruleId:"chem:"+(ctx.item.response?.type||"lines")};
 }
 if(subjectId==="food-nutrition-and-health"){
  const sm=criterion.sourceMarking||{};
  if(!Array.isArray(sm.modelPoints)||!sm.modelPoints.length)return {blocked:"no-source-model-points"};
  // "Distinct food–nutrient pairs": marks come from pairs, not points.
  const lists=sm.modelPoints.filter(p=>/^[^:;]{2,40}:\s*.+,/.test(p));
  if(fnhDistinctPairs({...sm,marks:criterion.maxMarks},lists.join(". "))){
   const F=(cls,response,expect,note)=>({cls,response,expect,note});
   const full=lists.join(" ");
   return {kind:"written",ruleId:"fnh:distinct-pairs",sourceAnswer:{answer:full},alternatives:[],
    fixtures:[F("full",{answer:full},criterion.maxMarks),
     ...(CURATED_FNH[criterion.id]||[]),
     F("contradiction",{answer:full+"\nIt is false that iron is found in red meat."},{min:0,max:criterion.maxMarks}),
     F("keyword-list",{answer:"iron calcium vitamin meat dairy guava"},{min:0,max:criterion.maxMarks}),
     F("blank",{answer:""},0),F("irrelevant",{answer:"The weather was sunny on Sunday afternoon."},0),
     F("ceiling",{answer:full+"\n"+full},{min:0,max:criterion.maxMarks})]};
  }
  // Present the model points as scheme points carrying their mark value.
  const value=fnhPointValue({...sm,marks:criterion.maxMarks});
  const item={prompt:"",marks:criterion.maxMarks,response:{type:"lines"},
   markScheme:{points:sm.modelPoints.map(p=>p.replace(/[.;]\s*$/,"")+` (${value})`)}};
  const others=(papersById.get(subjectId+"|"+paperId)||[]).filter(c=>c.id!==criterion.id)
   .map(c=>(c.sourceMarking?.modelPoints||[]).join(". ")).filter(Boolean);
  const set=scienceFixtures({item,maxMarks:criterion.maxMarks,others,
   curated:CURATED_FNH[criterion.id]||[],criterionId:criterion.id});
  if(set.blocked)return set;
  return {...set,ruleId:"fnh:"+(sm.profile||"written")+":x"+value};
 }
 if(subjectId==="integrated-science"){
  const [qid,partLabel,itemLabel]=criterion.id.split("::");
  const question=INTEGRATED_SCIENCE_PAPER2_SPECS[qid];
  const pi=question?question.parts.findIndex(p=>p.label===partLabel):-1;
  const ii=pi<0?-1:question.parts[pi].items.findIndex(i=>i.label===itemLabel);
  if(ii<0)return {blocked:"criterion-not-found-in-source-bank"};
  const item=question.parts[pi].items[ii];
  const type=item.response?.type||"lines";
  const hypothesis=integratedScienceHypothesisFixtures(qid,item,criterion.maxMarks);
  if(hypothesis)return hypothesis;
  const rustTable=integratedScienceRustTableFixtures(qid,pi,ii,item,criterion.maxMarks);
  if(rustTable)return rustTable;
  const extraTable=additionalTableFixtures(qid,pi,ii,item,criterion.maxMarks);
  if(extraTable)return extraTable;
  const particles=integratedScienceParticleFixtures(qid,pi,ii,item,criterion.maxMarks);
  if(particles)return particles;
  const symbols=integratedScienceCircuitSymbolFixtures(qid,pi,ii,item,criterion.maxMarks);
  if(symbols)return symbols;
  const circuits=integratedScienceCircuitFixtures(qid,pi,ii,item,criterion.maxMarks);
  if(circuits)return circuits;
  const filtration=filtrationSourceFixtures(qid,pi,ii,item,criterion.maxMarks);
  if(filtration)return filtration;
  if(integratedScienceGraphInText(item))return {blocked:"graph-question-without-graph-response-input"};
  const structured=integratedScienceStructuredFixtures({base:qid+":"+pi+":"+ii,item,maxMarks:criterion.maxMarks});
  if(structured){
   if(structured.blocked)return structured;
   return {...structured,sourceAnswer:structured.fixtures[0].response,alternatives:[],
    fixtures:[...structured.fixtures,...(CURATED_IS[criterion.id]||[])],ruleId:"is:"+type};
  }
  const others=(papersById.get(subjectId+"|"+paperId)||[]).filter(c=>c.id!==criterion.id)
   .map(c=>(c.sourceMarking?.markScheme?.points||[]).map(pointAnswer).join(". ")).filter(Boolean);
  const set=scienceFixtures({item,maxMarks:criterion.maxMarks,others,criterionId:criterion.id,
   curated:CURATED_IS[criterion.id]||[]});
  if(set.blocked)return set;
  return {...set,ruleId:"is:lines"};
 }
 if(subjectId==="physics"){
  const paper=physicsSources.get(paperId);
  const [qid,pid]=criterion.id.split("::");
  const question=paper?.questions.find(q=>q.question_id===qid);
  const part=question?.parts.find(p=>p.id===pid);
  if(!part)return {blocked:"criterion-not-found-in-source-paper"};
  const set=physicsFixtures({paper,question,part,maxMarks:criterion.maxMarks,curated:CURATED_PHYSICS[criterion.id]||[]});
  if(set.blocked)return set;
  return {...set,ruleId:"physics:"+(part.responseType||"text")+":"+(part.criteria||[]).map(c=>c.code+(c.check?"="+c.check.type:"")).join(",")};
 }
 return {blocked:"subject-resolution-policy-not-yet-verified"};
}

/**
 * @param {object[]} papers  [{subject_id,paper_id,rubric_version,source_sha256,
 *   criteria,criterionSha:Map}]
 * @param {object} provenance  {bundleSha256, gitCommit, fixtureSha256, ranAt}
 */
export function runV2Verification(papers,provenance){
 const records=[];
 for(const p of papers)papersById.set(p.subject_id+"|"+p.paper_id,p.criteria);
 for(const p of papers){
  for(const criterion of p.criteria){
   const base={
    subjectId:p.subject_id,paperId:p.paper_id,rubricVersion:p.rubric_version,
    criterionId:criterion.id,sourceSha256:p.source_sha256,
    criterionSha256:p.criterionSha.get(criterion.id),maxMarks:criterion.maxMarks
   };
   const set=fixturesForCriterion({subjectId:p.subject_id,paperId:p.paper_id,criterion});
   if(set.blocked){
    records.push({...base,outcome:"blocked",blocker:set.blocked,markingRuleId:null,
     verificationMethod:VERIFIER_VERSION,provenance});
    continue;
   }
   const result=verifyCriterion({subjectId:p.subject_id,paperId:p.paper_id,
    criteria:p.criteria,criterionId:criterion.id,kind:set.kind,fixtures:set.fixtures,
    allOrNothing:set.allOrNothing===true});
   const methods=[...new Set(result.results.map(r=>r.method).filter(Boolean))];
   records.push({...base,
    outcome:result.outcome,
    markingRuleId:set.ruleId+"@"+(methods[0]??"unknown"),
    verifiedSourceAnswer:set.sourceAnswer,
    acceptedAlternatives:set.alternatives,
    kind:set.kind,
    allOrNothing:set.allOrNothing===true,
    testResults:result.byClass,
    failures:result.failures,
    missingClasses:result.missingClasses,
    uncommittedClasses:result.uncommittedClasses,
    cases:result.results.map(r=>({cls:r.cls,expect:r.expect,marks:r.marks,
     resolved:r.resolved,passed:r.passed,note:r.note,response:r.response})),
    verificationMethod:VERIFIER_VERSION+" (automated source-bound fixture matrix, real V2 examiner, full-paper context)",
    provenance});
  }
 }
 return records;
}

/**
 * End-to-end verification for every paper whose criteria all verified.
 * Papers with any unverified criterion are reported, never verified.
 */
export function runV2PaperVerification(papers,records,provenance){
 const out=[];
 for(const p of papers){
  const mine=records.filter(r=>r.subjectId===p.subject_id&&r.paperId===p.paper_id&&r.rubricVersion===p.rubric_version);
  const unverified=mine.filter(r=>r.outcome!=="verified").map(r=>r.criterionId);
  const base={subjectId:p.subject_id,paperId:p.paper_id,rubricVersion:p.rubric_version,
   sourceSha256:p.source_sha256,expectedTotalMarks:p.expected_total_marks,
   criteria:p.criteria.length,verifiedCriteria:mine.length-unverified.length,provenance};
  if(unverified.length){out.push({...base,outcome:"blocked",unverifiedCriteria:unverified});continue;}
  const result=verifyPaper({subjectId:p.subject_id,paperId:p.paper_id,criteria:p.criteria},
   new Map(mine.map(r=>[r.criterionId,r.cases])));
  out.push({...base,outcome:result.passed?"verified":"failed",scenarios:result.scenarios,
   missingFullFixtures:result.missingFullFixtures,
   verificationMethod:VERIFIER_VERSION+" paper end-to-end scenario replay"});
 }
 return out;
}
