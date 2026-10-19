import {PGlite} from "@electric-sql/pglite";
import assert from "node:assert/strict";
import fs from "node:fs";
import {evaluateExistingSubjectPaper2V2} from "../supabase/functions/_shared/server-marker-v2.mjs";
/**
 * Full source registry smoke replay: every staged paper, every course.
 * Does not infer grading accuracy or provide real rubric approvals.
 */
const migrations=[
"20261005043000_exam_attempt_integrity.sql",
"20261005120000_exam_attempt_write_protection.sql",
"20261018190000_marking_v2_private_job_queue.sql",
"20261018193000_marking_v2_rubric_registry_enqueue.sql",
"20261019110000_marking_v2_review_gate_worker_bridge.sql",
"20261019113000_marking_v2_physics_it_draft_source_rubrics.sql",
"20261019123000_marking_v2_seven_subject_source_drafts.sql",
"20261019133000_marking_v2_criterion_approval_gate.sql",
"20261019143000_marking_v2_shadow_advisory_evidence.sql",
"20261019150000_marking_v2_physics_it_source_detail_bridge.sql",
"20261019153000_marking_v2_math_eight_missing_criteria.sql",
"20261019173000_marking_v2_subject_grader_evidence.sql",
"20261019174000_marking_v2_subject_evidence_method_fix.sql",
"20261019180000_marking_v2_live_attempt_routing.sql",
"20261019183000_marking_v2_atomic_score_publication.sql",
 "20261019190000_marking_v2_verified_digest_guard.sql",
 "20261019191000_marking_v2_decimal_score_hotfix.sql",
 "20261019194500_marking_v2_allow_ungraded_submission.sql",
 "20261019195000_marking_v2_own_exam_result_rpc.sql",
"20261019202500_marking_v2_draft_source_fingerprints.sql",
"20261019211000_marking_v2_physics_graph_provisional_method.sql",
"20261019212000_marking_v2_internal_calibration_queue.sql",
"20261019214000_marking_v2_math_original_v1_q1_draft_calibration.sql",
"20261019222000_marking_v2_math_p2f_rich_artifact_drafts.sql"
];
const db=new PGlite();
try{
 await db.exec(`create schema auth;create table auth.users(id uuid primary key);
 create role anon;create role authenticated;create role service_role bypassrls;
 create function auth.uid() returns uuid language sql stable as
 $$select nullif(current_setting('test.user_id',true),'')::uuid$$;
 create function auth.jwt() returns jsonb language sql stable as
 $$select jsonb_build_object('role',current_setting('test.jwt_role',true))$$;
 grant usage on schema auth,public to anon,authenticated,service_role;
 grant execute on function auth.uid(),auth.jwt() to anon,authenticated,service_role;`);
 for(const name of migrations)
  await db.exec(fs.readFileSync("supabase/migrations/"+name,"utf8"));
 const papers=(await db.query(`select subject_id,paper_id,criteria
 from spark_grading_private.rubrics_v2 order by subject_id,paper_id`)).rows;
 assert.equal(papers.length,67);

 // Real authored SPARK Mathematics Q1 source calibration, not certification.
 const v1=(await db.query(`select criteria from spark_grading_private.rubrics_v2
  where subject_id='mathematics' and paper_id='original-v1'
  and verification_status='draft' and active=false`)).rows[0].criteria;
 const originalQuestion1=v1.filter(c=>c.id.startsWith('p2-q1-v1::'));
 assert.equal(originalQuestion1.length,4);
 assert(originalQuestion1.every(c=>Array.isArray(c.sourceMarking?.criteria)
  && c.sourceMarking.criteria.length>0));
 const fakeAnswer={
  'p2-q1-v1::b1':{answer:'3400'}
 };
 const mistaken=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',
  criteria:originalQuestion1,responses:fakeAnswer
 });
 const mistakenCost=mistaken.rows.find(x=>x.criterionId==='p2-q1-v1::b1');
 assert.equal(mistakenCost.suggestedMarks,0,
  'Wrong cost price without method evidence must receive no credit');
 const partial=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',
  criteria:originalQuestion1,
  responses:{'p2-q1-v1::b1':{answer:'3400',working:'4500 / 1.25 = 3400'}}
 });
 const partialCost=partial.rows.find(x=>x.criterionId==='p2-q1-v1::b1');
 assert.equal(partialCost.suggestedMarks,1,
  'Valid cost-price method retains M1 if the candidate miscalculates');
 const carried=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',
  criteria:originalQuestion1,
  responses:{
   'p2-q1-v1::b1':{answer:'3500'},
   'p2-q1-v1::b2':{answer:'4900',working:'3500 x 1.4 = 4900'}
  }
 });
 const followThrough=carried.rows.find(x=>x.criterionId==='p2-q1-v1::b2');
 assert.equal(followThrough.suggestedMarks,2,
  'Valid 40% profit on a wrong earlier cost must receive ECF credit');
 const fraction=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',
  criteria:originalQuestion1,
  responses:{'p2-q1-v1::a':{answer:'14/2',working:''}}
 });
 assert.equal(fraction.rows.find(x=>x.criterionId==='p2-q1-v1::a').suggestedMarks,0,
  'Equivalent but non-lowest-terms fraction must not earn final accuracy');
 assert.equal(fraction.canPublishFinalScore,false,
  'Manual fraction method cannot bypass registered review');
 console.log('Math original-v1 Q1 calibrated test cases',JSON.stringify({
   wrongNoMethod:mistakenCost.suggestedMarks,
   partialMethod:partialCost.suggestedMarks,
   ecfFollowThrough:followThrough.suggestedMarks,
   nonLowestTerms:fraction.rows.find(x=>x.criterionId==='p2-q1-v1::a').suggestedMarks
 }));


 // P2-F original workspace schemes are drawn from the real source pad and
 // table/graph cell allocations. Until V2 consumes verified drawing
 // artefacts, nonblank work cannot receive automatic final graph marks.
 const p2f=(await db.query(`select criteria from spark_grading_private.rubrics_v2
  where subject_id='mathematics' and paper_id='p2f'`)).rows[0].criteria;
 assert.equal(p2f.length,42);
 assert(p2f.every(c=>Array.isArray(c.sourceMarking?.criteria)
   && c.sourceMarking.criteria.length>0),
   'Practice F must have complete registered source allocations');
 const p2fRich=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'p2f',criteria:p2f,
  responses:{
   'p2f-q4::a1':{arcs:[{from:'A',radius:5}],segments:[{from:'M',to:'X'}]},
   'p2f-q5::a':{cells:{c1:15,c2:33,c3:42,c4:50}},
   'p2f-q5::b':{points:[[10,4],[20,15],[30,33],[40,42],[50,50]]},
   'p2f-q7::a':{cells:{q4:16,r4:20,q10:100,r10:44}}
  }
 });
 assert.equal(p2fRich.examinedParts,42);
 assert.equal(p2fRich.maxMarks,100);
 for(const id of ['p2f-q4::a1','p2f-q5::a','p2f-q5::b','p2f-q7::a']){
  const part=p2fRich.rows.find(x=>x.criterionId===id);
  assert.equal(part.suggestedMarks,0,'Unknown drawing/table artefact cannot earn automatic credit');
  assert.equal(part.resolved,false,'Visual or structured artefact requires verified evaluator');
 }
 assert.equal(p2fRich.canPublishFinalScore,false);

 const defects=[],counts={};
 let totalCriteria=0;
 const sourceAudit=[];
 for(const paper of papers){
  const seen=new Set();
  let sourceMarks=0;
  const issues=[];
  for(const c of paper.criteria){
   totalCriteria++;
   if(typeof c.id!=="string"||!c.id.trim()||seen.has(c.id)||
      c.sourcePartId!==c.id)issues.push("source-part-identity");
   seen.add(c.id);
   if(!Number.isInteger(c.maxMarks)||c.maxMarks<=0)
     issues.push("invalid-mark-allocation");
   sourceMarks+=Number(c.maxMarks)||0;
   if(!c.sourceMarking||typeof c.sourceMarking!=="object"||
      Array.isArray(c.sourceMarking))issues.push("missing-source-marking");
   if(Array.isArray(c.sourceMarking?.criteria)){
    const totals=c.sourceMarking.criteria.reduce((n,x)=>n+Number(x.marks||0),0);
    if(totals!==c.maxMarks)issues.push("subcriterion-mark-total");
   }
  }
  if(sourceMarks!==paper.criteria.reduce((n,c)=>n+Number(c.maxMarks||0),0))
    issues.push("paper-mark-total");
  if(issues.length)sourceAudit.push({subject:paper.subject_id,paper:paper.paper_id,issues:[...new Set(issues)]});
 }
 assert.equal(totalCriteria,2118,"Registered criteria count must not silently drift");
 const pendingReviews=(await db.query(`select count(*)::integer AS total,
  count(*) filter(where source_matched_review)::integer AS reviewed,
  count(*) filter(where review_focus='manual-graph-artifact')::integer AS graph,
  count(*) filter(where review_focus='missing-detailed-math-allocation')::integer AS math_missing
  from spark_grading_private.v2_calibration_queue`)).rows[0];
 assert.deepEqual(pendingReviews,{total:2118,reviewed:0,graph:4,math_missing:394});

 assert.deepEqual(sourceAudit,[],"Internal source identity, bounds or scheme checks failed");
 console.log("Independent source-structure QA",JSON.stringify({
  papers:papers.length,criteria:totalCriteria,sourceAuditDefects:sourceAudit.length,
  evidenceLevel:"structural-only; does not certify written-answer correctness"
 }));
 for(const paper of papers){
  counts[paper.subject_id]=(counts[paper.subject_id]||0)+1;
  try{
   const r=evaluateExistingSubjectPaper2V2({
    subjectId:paper.subject_id,paperId:paper.paper_id,
    criteria:paper.criteria,responses:{}
   });
   const expected=paper.criteria.reduce((n,c)=>n+c.maxMarks,0);
   assert.equal(r.examinedParts,paper.criteria.length);
   assert.equal(r.maxMarks,expected);
   assert.equal(r.suggestedMarks,0,"A blank submission cannot earn any marks");
   assert(r.suggestedMarks<=expected);
   assert.equal(r.canPublishFinalScore,r.unresolvedMarks===0);
   assert(r.unresolvedMarks>=0&&r.unresolvedMarks<=expected);
   assert(r.rows.every(row=>typeof row.resolved==="boolean"));
  }catch(error){defects.push({subject:paper.subject_id,paper:paper.paper_id,error:String(error?.message||error)});}
 }

 // Adversarial replay: source-bank consistency is not grading accuracy.
 const adversarial=[],modelReplay=[];
 for(const paper of papers){
  const bogus=Object.fromEntries(paper.criteria.map(c=>[
   c.id,"ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY"
  ]));
  try{
   const result=evaluateExistingSubjectPaper2V2({
    subjectId:paper.subject_id,paperId:paper.paper_id,
    criteria:paper.criteria,responses:bogus
   });
   adversarial.push({subject:paper.subject_id,paper:paper.paper_id,
     suggestedMarks:result.suggestedMarks,unresolvedMarks:result.unresolvedMarks,
     authority:result.authority,
     creditedParts:result.rows.filter(row=>row.suggestedMarks>0).map(row=>({
      criterionId:row.criterionId,marks:row.suggestedMarks,method:row.method
     }))});
  }catch(error){
   defects.push({subject:paper.subject_id,paper:paper.paper_id,
    scenario:"adversarial",error:String(error?.message||error)});
  }
  const canonical=Object.fromEntries(paper.criteria
   .filter(c=>typeof c.sourceMarking?.answer==="string" && c.sourceMarking.answer.trim())
   .map(c=>[c.id,{
    answer:c.sourceMarking.answer,
    working:typeof c.sourceMarking.solution==="string"?c.sourceMarking.solution:""
   }]));
  if(Object.keys(canonical).length){
   try{
    const result=evaluateExistingSubjectPaper2V2({
     subjectId:paper.subject_id,paperId:paper.paper_id,
     criteria:paper.criteria,responses:canonical
    });
    modelReplay.push({subject:paper.subject_id,paper:paper.paper_id,
     sourceAnswers:Object.keys(canonical).length,
     suggestedMarks:result.suggestedMarks,unresolvedMarks:result.unresolvedMarks});
   }catch(error){
    defects.push({subject:paper.subject_id,paper:paper.paper_id,
     scenario:"model-answer",error:String(error?.message||error)});
   }
  }
 }
 console.log("V2 adversarial and model-answer diagnostics",JSON.stringify({
   adversarialPapers:adversarial.length,
   falseCreditCandidates:adversarial.filter(r=>r.suggestedMarks>0),
   modelAnswerPapers:modelReplay.length,
   modelAnswerReplay:modelReplay,
   caution:"Adversarial pass and canonical answer marks are not rubric approval."
 },null,2));
 assert.deepEqual(adversarial.filter(r=>r.suggestedMarks>0),[],
  "Unrelated nonblank text earned V2 marking credit; source-specific correction required");

 console.log("Source-bank replay",JSON.stringify({examined:papers.length,subjectCounts:counts,defects},null,2));
 assert.deepEqual(defects,[],"Every registered paper requires a working subject scorer, without silent fallback");
}finally{await db.close();}
