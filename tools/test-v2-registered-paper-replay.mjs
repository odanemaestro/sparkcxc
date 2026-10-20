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
"20261019222000_marking_v2_math_p2f_rich_artifact_drafts.sql",
"20261019225500_marking_v2_math_original_v1_q2_q4_q5_drafts.sql",
"20261019233000_marking_v2_math_original_v1_q6_cylinder_drafts.sql",
"20261019234500_marking_v2_math_original_v1_q3_q7_q10_drafts.sql",
"20261020001000_marking_v2_math_original_v2_q1_q2_source_drafts.sql",
"20261020002500_marking_v2_math_inverse_matrix_accuracy_draft.sql",
"20261020005000_marking_v2_math_original_v2_q3_q6_drafts.sql",
"20261020010500_marking_v2_math_original_v2_q7_q8_drafts.sql",
"20261020011500_marking_v2_math_original_v2_q9_q10_drafts.sql",
"20261020014500_marking_v2_math_p2h_p2j_visual_source_drafts.sql",
"20261020020000_marking_v2_math_p2e_p2g_p2i_source_drafts.sql",
"20261020030000_marking_v2_math_original_v3_v5_source_drafts.sql",
"20261020040000_marking_v2_math_original_v6_v8_source_drafts.sql",
"20261020050000_marking_v2_math_original_v9_v10_source_drafts.sql",
"20261020060000_marking_v2_nine_subject_source_total_readiness.sql",
"20261020070000_marking_v2_four_source_bound_ai_criterion_reviews.sql",
"20261020080000_marking_v2_first_300_criterion_calibration_queue.sql",
"20261020090000_marking_v2_six_math_physics_source_ai_reviews.sql",
"20261020100000_marking_v2_second_300_criterion_calibration_queue.sql",
"20261020103000_marking_v2_math_simplest_linear_source_checks.sql",
"20261020110000_marking_v2_math_simplest_linear_ai_reviews.sql",
"20261020120000_marking_v2_third_300_criterion_calibration_queue.sql",
"20261020130000_marking_v2_fourth_300_criterion_calibration_queue.sql",
"20261020140000_marking_v2_fifth_300_criterion_calibration_queue.sql"
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
 // The large review batch is source-anchored triage, not automatic approval.
 const bulk=(await db.query(`SELECT batch_id,subject_id,paper_id,rubric_version,
   criterion_id,criterion_sha256,source_sha256,max_marks,evidence_class
   FROM spark_grading_private.v2_calibration_batch_items
   WHERE batch_id='v2-bulk-calibration-001'
   ORDER BY subject_id,paper_id,criterion_id`)).rows;
 assert.equal(bulk.length,300,'The first calibration cohort must contain exactly 300 parts');
 const batchQuotas={
  'mathematics':100,'integrated-science':65,'chemistry':30,
  'information-technology':30,'physics':25,'english-a':15,
  'social-studies':15,'food-nutrition-and-health':10,
  'principles-of-business':10
 };
 for(const [subject,quota] of Object.entries(batchQuotas))
  assert.equal(bulk.filter(x=>x.subject_id===subject).length,quota,
   'Missing subject cohort coverage: '+subject);
 const paperMap=new Map(papers.map(p=>[p.subject_id+'::'+p.paper_id,p]));
 let checked=0;
 const candidateCases=[],replayFailures=[];
 const byPaper=new Map();
 for(const item of bulk){
  const key=item.subject_id+'::'+item.paper_id;
  if(!byPaper.has(key))byPaper.set(key,[]);
  byPaper.get(key).push(item);
 }
 for(const [key,items] of byPaper){
  const paper=paperMap.get(key);
  assert(paper,'Missing source-bound cohort paper '+key);
  const args={subjectId:items[0].subject_id,paperId:items[0].paper_id,
   criteria:paper.criteria};
  const unrelated=Object.fromEntries(items.map(item=>[
   item.criterion_id,'ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY'
  ]));
  const canonical=Object.fromEntries(items.filter(item=>
   item.evidence_class==='direct-check-candidate'
  ).map(item=>{
   const criterion=paper.criteria.find(c=>c.id===item.criterion_id);
   return [item.criterion_id,{
    answer:criterion?.sourceMarking?.answer??'',
    working:criterion?.sourceMarking?.solution??''
   }];
  }));
  try{
   const empty=evaluateExistingSubjectPaper2V2({...args,responses:{}});
   const invalid=evaluateExistingSubjectPaper2V2({...args,responses:unrelated});
   const candidate=Object.keys(canonical).length
    ?evaluateExistingSubjectPaper2V2({...args,responses:canonical}):null;
   const rowById=result=>new Map(result.rows.map(row=>[row.criterionId,row]));
   const emptyRows=rowById(empty),invalidRows=rowById(invalid);
   const candidateRows=candidate?rowById(candidate):null;
   assert.equal(empty.examinedParts,paper.criteria.length);
   assert.equal(invalid.examinedParts,paper.criteria.length);
   for(const item of items){
    const criterion=paper.criteria.find(c=>c.id===item.criterion_id);
    assert(criterion,'Missing cohort part '+item.criterion_id);
    assert.equal(criterion.maxMarks,item.max_marks);
    assert.equal(emptyRows.get(item.criterion_id)?.suggestedMarks,0,
     'Blank source part earned V2 credit: '+item.criterion_id);
    assert.equal(invalidRows.get(item.criterion_id)?.suggestedMarks,0,
     'Unrelated text earned V2 credit: '+item.criterion_id);
    if(item.evidence_class==='direct-check-candidate'){
     const mark=candidateRows?.get(item.criterion_id);
     candidateCases.push({subject:item.subject_id,id:item.criterion_id,
      suggestedMarks:mark?.suggestedMarks??0,resolved:mark?.resolved??false});
    }
    checked++;
   }
  }catch(error){
   replayFailures.push({paper:key,error:String(error?.message||error)});
  }
 }
 console.log('Large-batch paper-context replay',JSON.stringify({
   papers:byPaper.size,checked,replayFailures,
   candidateDiagnostics:candidateCases.slice(0,25)
 }));
 assert.deepEqual(replayFailures,[],
  'Cross-subject 300-criterion paper-context replay must not throw');
 assert.equal(checked,300);
 console.log('Nine-subject 300-criterion source-bound adversarial cohort',
  JSON.stringify({checked,subjectCounts:batchQuotas,
   directCandidates:bulk.filter(x=>x.evidence_class==='direct-check-candidate').length,
   diagnosticExamples:candidateCases.slice(0,25),
   accuracyCaveat:'Blank and unrelated adversarial tests do not prove equivalence, method, written or graph marking accuracy. This cohort is not 300 approvals.'}));


 { // Second independent 300-source batch, no recycled criterion IDs.
 const bulk=(await db.query(`SELECT batch_id,subject_id,paper_id,rubric_version,
   criterion_id,criterion_sha256,source_sha256,max_marks,evidence_class
   FROM spark_grading_private.v2_calibration_batch_items
   WHERE batch_id='v2-bulk-calibration-002'
   ORDER BY subject_id,paper_id,criterion_id`)).rows;
 assert.equal(bulk.length,300,'The first calibration cohort must contain exactly 300 parts');
 const batchQuotas={
  'mathematics':100,'integrated-science':60,'chemistry':30,
  'information-technology':30,'physics':20,'english-a':15,
  'social-studies':15,'food-nutrition-and-health':15,
  'principles-of-business':15
 };
 for(const [subject,quota] of Object.entries(batchQuotas))
  assert.equal(bulk.filter(x=>x.subject_id===subject).length,quota,
   'Missing subject cohort coverage: '+subject);
 const paperMap=new Map(papers.map(p=>[p.subject_id+'::'+p.paper_id,p]));
 let checked=0;
 const candidateCases=[],replayFailures=[];
 const byPaper=new Map();
 for(const item of bulk){
  const key=item.subject_id+'::'+item.paper_id;
  if(!byPaper.has(key))byPaper.set(key,[]);
  byPaper.get(key).push(item);
 }
 for(const [key,items] of byPaper){
  const paper=paperMap.get(key);
  assert(paper,'Missing source-bound cohort paper '+key);
  const args={subjectId:items[0].subject_id,paperId:items[0].paper_id,
   criteria:paper.criteria};
  const unrelated=Object.fromEntries(items.map(item=>[
   item.criterion_id,'ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY'
  ]));
  const canonical=Object.fromEntries(items.filter(item=>
   item.evidence_class==='direct-check-candidate'
  ).map(item=>{
   const criterion=paper.criteria.find(c=>c.id===item.criterion_id);
   return [item.criterion_id,{
    answer:criterion?.sourceMarking?.answer??'',
    working:criterion?.sourceMarking?.solution??''
   }];
  }));
  try{
   const empty=evaluateExistingSubjectPaper2V2({...args,responses:{}});
   const invalid=evaluateExistingSubjectPaper2V2({...args,responses:unrelated});
   const candidate=Object.keys(canonical).length
    ?evaluateExistingSubjectPaper2V2({...args,responses:canonical}):null;
   const rowById=result=>new Map(result.rows.map(row=>[row.criterionId,row]));
   const emptyRows=rowById(empty),invalidRows=rowById(invalid);
   const candidateRows=candidate?rowById(candidate):null;
   assert.equal(empty.examinedParts,paper.criteria.length);
   assert.equal(invalid.examinedParts,paper.criteria.length);
   for(const item of items){
    const criterion=paper.criteria.find(c=>c.id===item.criterion_id);
    assert(criterion,'Missing cohort part '+item.criterion_id);
    assert.equal(criterion.maxMarks,item.max_marks);
    assert.equal(emptyRows.get(item.criterion_id)?.suggestedMarks,0,
     'Blank source part earned V2 credit: '+item.criterion_id);
    assert.equal(invalidRows.get(item.criterion_id)?.suggestedMarks,0,
     'Unrelated text earned V2 credit: '+item.criterion_id);
    if(item.evidence_class==='direct-check-candidate'){
     const mark=candidateRows?.get(item.criterion_id);
     candidateCases.push({subject:item.subject_id,id:item.criterion_id,
      suggestedMarks:mark?.suggestedMarks??0,resolved:mark?.resolved??false});
    }
    checked++;
   }
  }catch(error){
   replayFailures.push({paper:key,error:String(error?.message||error)});
  }
 }
 console.log('Large-batch paper-context replay',JSON.stringify({
   papers:byPaper.size,checked,replayFailures,
   candidateDiagnostics:candidateCases.slice(0,25)
 }));
 assert.deepEqual(replayFailures,[],
  'Cross-subject 300-criterion paper-context replay must not throw');
 assert.equal(checked,300);
 console.log('Nine-subject 300-criterion source-bound adversarial cohort',
  JSON.stringify({checked,subjectCounts:batchQuotas,
   directCandidates:bulk.filter(x=>x.evidence_class==='direct-check-candidate').length,
   diagnosticExamples:candidateCases.slice(0,25),
   accuracyCaveat:'Blank and unrelated adversarial tests do not prove equivalence, method, written or graph marking accuracy. This cohort is not 300 approvals.'}));



 }
 const batch3=(await db.query("select subject_id,paper_id,rubric_version,criterion_id from spark_grading_private.v2_calibration_batch_items where batch_id='v2-bulk-calibration-003'")).rows;
 assert.equal(batch3.length,300);
 const batch4=(await db.query("select subject_id,paper_id,rubric_version,criterion_id,max_marks from spark_grading_private.v2_calibration_batch_items where batch_id='v2-bulk-calibration-004'")).rows;
 assert.equal(batch4.length,300,'Batch 004 must have exactly 300 source parts');
 const quotas4={'mathematics':100,'integrated-science':90,
  'chemistry':35,'information-technology':40,'physics':15,
  'english-a':10,'social-studies':5,'food-nutrition-and-health':5};
 for(const [subject,number] of Object.entries(quotas4))
  assert.equal(batch4.filter(x=>x.subject_id===subject).length,number);
 assert.equal(new Set(batch4.map(x=>x.subject_id)).size,8);

 const batch5=(await db.query("select subject_id,paper_id,rubric_version,criterion_id,max_marks from spark_grading_private.v2_calibration_batch_items where batch_id='v2-bulk-calibration-005'")).rows;
 assert.equal(batch5.length,300,'Batch 005 must have exactly 300 source parts');
 const quotas5={'mathematics':100,'integrated-science':85,
  'chemistry':25,'information-technology':45,'physics':20,
  'english-a':12,'social-studies':10,'food-nutrition-and-health':3};
 for(const [subject,number] of Object.entries(quotas5))
  assert.equal(batch5.filter(x=>x.subject_id===subject).length,number);
 assert.equal(new Set(batch5.map(x=>x.subject_id)).size,8);

 const repeats=(await db.query(`select count(*)::int n from (
 select subject_id,paper_id,rubric_version,criterion_id from
 spark_grading_private.v2_calibration_batch_items group by 1,2,3,4
 having count(*)>1) duplicates`)).rows[0].n;
 assert.equal(repeats,0,'Source parts must never repeat across five batches');
 const hashes=(await db.query(`select count(*)::int total,
 count(*) filter(where b.source_sha256=q.paper_source_sha256
 and b.criterion_sha256=q.criterion_sha256)::int matched
 from spark_grading_private.v2_calibration_batch_items b
 join spark_grading_private.v2_calibration_queue q
 on q.subject_id=b.subject_id and q.paper_id=b.paper_id
 and q.rubric_version=b.rubric_version and q.criterion_id=b.criterion_id`)).rows[0];
 assert.equal(hashes.total,1500);
 assert.equal(hashes.matched,1500);

 assert.equal(new Set(batch3.map(x=>x.subject_id)).size,8);
 const groups3=Map.groupBy(batch3,x=>x.subject_id+'::'+x.paper_id);
 for(const [key,items] of groups3){
  const paper=papers.find(x=>x.subject_id+'::'+x.paper_id===key);
  assert(paper,'Missing Batch 003 source '+key);
  const unrelated=Object.fromEntries(items.map(x=>[x.criterion_id,
   'ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY']));
  const blank=evaluateExistingSubjectPaper2V2({subjectId:paper.subject_id,
    paperId:paper.paper_id,criteria:paper.criteria,responses:{}});
  const wrong=evaluateExistingSubjectPaper2V2({subjectId:paper.subject_id,
    paperId:paper.paper_id,criteria:paper.criteria,responses:unrelated});
  for(const part of items){
   assert.equal(blank.rows.find(r=>r.criterionId===part.criterion_id)?.suggestedMarks,0);
   assert.equal(wrong.rows.find(r=>r.criterionId===part.criterion_id)?.suggestedMarks,0,
    'Unrelated response awarded marks: '+part.criterion_id);
  }
 }
 const groups4=Map.groupBy(batch4,x=>x.subject_id+'::'+x.paper_id);
 for(const [key,items] of groups4){
  const paper=papers.find(x=>x.subject_id+'::'+x.paper_id===key);
  assert(paper,'Missing Batch 004 source '+key);
  const unrelated=Object.fromEntries(items.map(x=>[x.criterion_id,
   'ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY']));
  const blank=evaluateExistingSubjectPaper2V2({subjectId:paper.subject_id,
    paperId:paper.paper_id,criteria:paper.criteria,responses:{}});
  const wrong=evaluateExistingSubjectPaper2V2({subjectId:paper.subject_id,
    paperId:paper.paper_id,criteria:paper.criteria,responses:unrelated});
  for(const part of items){
   assert.equal(blank.rows.find(r=>r.criterionId===part.criterion_id)?.suggestedMarks,0);
   assert.equal(wrong.rows.find(r=>r.criterionId===part.criterion_id)?.suggestedMarks,0,
    'Unrelated response awarded marks: '+part.criterion_id);
  }
 }
 const groups5=Map.groupBy(batch5,x=>x.subject_id+'::'+x.paper_id);
 for(const [key,items] of groups5){
  const paper=papers.find(x=>x.subject_id+'::'+x.paper_id===key);
  assert(paper,'Missing Batch 005 source '+key);
  const unrelated=Object.fromEntries(items.map(x=>[x.criterion_id,
   'ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY']));
  const blank=evaluateExistingSubjectPaper2V2({subjectId:paper.subject_id,
    paperId:paper.paper_id,criteria:paper.criteria,responses:{}});
  const wrong=evaluateExistingSubjectPaper2V2({subjectId:paper.subject_id,
    paperId:paper.paper_id,criteria:paper.criteria,responses:unrelated});
  for(const part of items){
   assert.equal(blank.rows.find(r=>r.criterionId===part.criterion_id)?.suggestedMarks,0);
   assert.equal(wrong.rows.find(r=>r.criterionId===part.criterion_id)?.suggestedMarks,0,
    'Unrelated response awarded marks: '+part.criterion_id);
  }
 }

 const overlap=(await db.query(`SELECT count(*)::int AS n FROM
 spark_grading_private.v2_calibration_batch_items first
 JOIN spark_grading_private.v2_calibration_batch_items second
 ON first.subject_id=second.subject_id AND first.paper_id=second.paper_id
 AND first.rubric_version=second.rubric_version AND first.criterion_id=second.criterion_id
 WHERE first.batch_id='v2-bulk-calibration-001'
 AND second.batch_id='v2-bulk-calibration-002'`)).rows[0].n;
 assert.equal(overlap,0,'Second batch must not recycle first batch source parts');
 const stale=(await db.query(`SELECT count(*)::int n
 FROM spark_grading_private.v2_calibration_batch_items b
 JOIN spark_grading_private.v2_calibration_queue q
 ON b.subject_id=q.subject_id AND b.paper_id=q.paper_id
 AND b.rubric_version=q.rubric_version AND b.criterion_id=q.criterion_id
 WHERE b.criterion_sha256<>q.criterion_sha256
    OR b.source_sha256<>q.paper_source_sha256`)).rows[0].n;
 assert.equal(stale,0,'Every cohort fingerprint must match corrected source rubrics');


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


 // Replay genuine original-v1 Q2, Q4 and Q5 calibrated source identities.
 // These tests validate methods and bounds, NOT independent scheme approval.
 const updatedMath=(await db.query(`select criteria from spark_grading_private.rubrics_v2
  where subject_id='mathematics' and paper_id='original-v1'`)).rows[0].criteria;
 const sourceQuestion=(n)=>updatedMath.filter(c=>c.id.startsWith('p2-q'+n+'-v1::'));
 for(const [number,total,parts] of [[2,9,5],[4,9,5],[5,9,4]]){
  const source=sourceQuestion(number);
  assert.equal(source.length,parts);
  const grade=evaluateExistingSubjectPaper2V2({
   subjectId:'mathematics',paperId:'original-v1',
   criteria:source,responses:{}
  });
  assert.equal(grade.maxMarks,total);
  assert.equal(grade.suggestedMarks,0);
  assert(source.every(c=>Array.isArray(c.sourceMarking.criteria)&&
   c.sourceMarking.criteria.length>0));
 }
 const algebraWrong=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',criteria:sourceQuestion(2),
  responses:{'p2-q2-v1::a':{answer:'2xy^4'}}
 });
 assert.equal(algebraWrong.rows.find(r=>r.criterionId==='p2-q2-v1::a').suggestedMarks,0);
 const perimeter=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',criteria:sourceQuestion(2),
  responses:{'p2-q2-v1::c1':{answer:'8w+8'},
   'p2-q2-v1::c2':{answer:'width 4.5 cm, length 17.5 cm'}}
 });
 assert.equal(perimeter.rows.find(r=>r.criterionId==='p2-q2-v1::c1').suggestedMarks,1);
 assert.equal(perimeter.rows.find(r=>r.criterionId==='p2-q2-v1::c2').resolved,false);
 assert.equal(perimeter.canPublishFinalScore,false);
 const functions=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',criteria:sourceQuestion(4),
  responses:{'p2-q4-v1::a1':{answer:'15'}}
 });
 assert.equal(functions.rows.find(r=>r.criterionId==='p2-q4-v1::a1').suggestedMarks,1);
 const table=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',criteria:sourceQuestion(5),
  responses:{'p2-q5-v1::c':{answer:'4, 12, 24, 40'}}
 });
 assert.equal(table.rows.find(r=>r.criterionId==='p2-q5-v1::c').resolved,false);
 assert.equal(table.canPublishFinalScore,false);
 console.log("Mathematics original-v1 Q2/Q4/Q5",JSON.stringify({
  wrongAlgebra:algebraWrong.suggestedMarks,
  expressionMarks:perimeter.rows.find(r=>r.criterionId==='p2-q2-v1::c1').suggestedMarks,
  functionsValue:functions.rows.find(r=>r.criterionId==='p2-q4-v1::a1').suggestedMarks,
  structuredTableUnresolved:table.rows.find(r=>r.criterionId==='p2-q5-v1::c').resolved===false
 }));


 // Cylinder method and accuracy: correct result, wrong result and valid ECF
 // from an earlier incorrect volume. These are draft evidence only.
 const cylinder=sourceQuestion(6);
 assert.equal(cylinder.length,4);
 assert(cylinder.every(c=>Array.isArray(c.sourceMarking.criteria)
  && c.sourceMarking.criteria.length>0));
 assert.equal(cylinder.reduce((sum,c)=>sum+c.maxMarks,0),9);
 const cylinderWrong=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',criteria:cylinder,
  responses:{'p2-q6-v1::d':{answer:'15'}}
 });
 assert.equal(cylinderWrong.rows.find(r=>r.criterionId==='p2-q6-v1::d').suggestedMarks,0);
 const cylinderECF=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',criteria:cylinder,
  responses:{
   'p2-q6-v1::b':{answer:'160'},
   'p2-q6-v1::d':{answer:'29.09',working:'160 / 5.5 = 29.09'}
  }
 });
 const carriedTime=cylinderECF.rows.find(r=>r.criterionId==='p2-q6-v1::d');
 assert.equal(carriedTime.suggestedMarks,2,
  'Water filling time must get both marks for valid ECF from an earlier volume');
 assert.equal(cylinderECF.canPublishFinalScore,false,
  'Real source graph/method verification is still required');
 const cylinderModel=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',criteria:cylinder,
  responses:{
   'p2-q6-v1::a':{answer:'38.5',working:'(22/7)*3.5^2 = 38.5'},
   'p2-q6-v1::b':{answer:'154',working:'38.5*4 = 154'},
   'p2-q6-v1::c':{answer:'88',working:'2*(22/7)*3.5*4 = 88'},
   'p2-q6-v1::d':{answer:'28',working:'154/5.5 = 28'}
  }
 });
 assert.equal(cylinderModel.maxMarks,9);
 assert.equal(cylinderModel.suggestedMarks,5,
  'Canonical cylinder answer earns five machine-verifiable marks; four manual method marks are not inferred');
 assert.equal(cylinderModel.unresolvedMarks,9,
  'Strict V2 evidence review must leave all nine cylinder mark weights unresolved until manually verifiable methods are supported');
 assert.equal(cylinderModel.canPublishFinalScore,false);
 console.log('Mathematics original-v1 Q6 draft',JSON.stringify({
  validECF:carriedTime.suggestedMarks,
  canonicalSuggestions:cylinderModel.suggestedMarks,
  remainingUnresolved:cylinderModel.unresolvedMarks
 }));


 // Completing the source draft allocations is not enough for student grades.
 // Test the real assembled question identities, their mark ceilings,
 // equivalent answers and unsafe inversions of typed mathematical responses.
 const fullyDrafted=(await db.query(`SELECT criteria FROM spark_grading_private.rubrics_v2
  WHERE subject_id='mathematics' AND paper_id='original-v1'
    AND active=false AND verification_status='draft'`)).rows[0].criteria;
 assert.equal(fullyDrafted.length,45);
 assert.equal(fullyDrafted.reduce((n,c)=>n+c.maxMarks,0),100);
 assert(fullyDrafted.every(c=>Array.isArray(c.sourceMarking?.criteria)
  && c.sourceMarking.criteria.length>0),
  'Original-v1 must have 45 populated source criteria before calibration replay');
 const srcQ=n=>fullyDrafted.filter(c=>c.id.startsWith('p2-q'+n+'-v1::'));
 for(const [question,parts,marks] of [[3,4,9],[7,4,10],[8,5,12],[9,5,12],[10,5,12]]){
  const source=srcQ(question);
  assert.equal(source.length,parts,'Assembled question part count: '+question);
  assert.equal(source.reduce((sum,c)=>sum+c.maxMarks,0),marks,
   'Assembled question marks: '+question);
  const blankPaper=evaluateExistingSubjectPaper2V2({
   subjectId:'mathematics',paperId:'original-v1',
   criteria:source,responses:{}
  });
  assert.equal(blankPaper.suggestedMarks,0);
  assert.equal(blankPaper.examinedParts,parts);
  assert.equal(blankPaper.maxMarks,marks);
 }
 const gradeNew=(question,responses)=>evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v1',
  criteria:srcQ(question),responses
 });
 const q7Wrong=gradeNew(7,{'p2-q7-v1::c':{answer:'-15'}});
 assert.equal(q7Wrong.rows.find(r=>r.criterionId==='p2-q7-v1::c').suggestedMarks,0,
  'Reject the negative root as an invalid design number');
 const q7Right=gradeNew(7,{'p2-q7-v1::c':{answer:'11',working:'(n+15)(n-11)=0'}});
 assert(q7Right.rows.find(r=>r.criterionId==='p2-q7-v1::c').suggestedMarks>0);
 assert.equal(q7Right.canPublishFinalScore,false);
 const q8Wrong=gradeNew(8,{'p2-q8-v1::d':{answer:'(20,0)'}});
 assert.equal(q8Wrong.rows.find(r=>r.criterionId==='p2-q8-v1::d').suggestedMarks,0,
  'Coordinate order matters on the y-axis intercept');
 const q8Right=gradeNew(8,{'p2-q8-v1::d':{answer:'(0,20)',working:'f(0)=20'}});
 assert(q8Right.rows.find(r=>r.criterionId==='p2-q8-v1::d').suggestedMarks>0);
 assert.equal(q8Right.canPublishFinalScore,false);
 const q9Wrong=gradeNew(9,{'p2-q9-v1::b3':{answer:'193'}});
 assert.equal(q9Wrong.rows.find(r=>r.criterionId==='p2-q9-v1::b3').suggestedMarks,0,
  'Bearing 193 is not the correct 093');
 const q9Right=gradeNew(9,{'p2-q9-v1::b3':{
  answer:'093',working:'tan(QPR)=120/90 = 53.13; 40+53.13=93.13'
 }});
 assert(q9Right.rows.find(r=>r.criterionId==='p2-q9-v1::b3').suggestedMarks>0);
 assert.equal(q9Right.canPublishFinalScore,false);
 const q10Wrong=gradeNew(10,{'p2-q10-v1::d':{answer:'3, 2'}});
 assert.equal(q10Wrong.rows.find(r=>r.criterionId==='p2-q10-v1::d').suggestedMarks,0,
  'Swapped matrix-solution x/y values must not earn marks');
 const q10Right=gradeNew(10,{'p2-q10-v1::d':{
  answer:'2, 3',working:'M inverse times [13,17] = [2,3]'
 }});
 assert(q10Right.rows.find(r=>r.criterionId==='p2-q10-v1::d').suggestedMarks>0);
 assert.equal(q10Right.canPublishFinalScore,false);
 const q3Wrong=gradeNew(3,{'p2-q3-v1::a':{answer:'a translation by (0, -2)'}});
 assert.equal(q3Wrong.rows.find(r=>r.criterionId==='p2-q3-v1::a').suggestedMarks,0);
 const q3Right=gradeNew(3,{'p2-q3-v1::a':{
  answer:'reflection in the x-axis (y=0)'
 }});
 assert.equal(q3Right.rows.find(r=>r.criterionId==='p2-q3-v1::a').resolved,false);
 console.log('Original-v1 Q3/Q7-Q10 draft evidence checks',JSON.stringify({
  sourceParts:fullyDrafted.length,marks:100,
  correctDesign:q7Right.suggestedMarks,
  correctCoordinate:q8Right.suggestedMarks,
  correctBearing:q9Right.suggestedMarks,
  correctMatrixSolution:q10Right.suggestedMarks,
  finalMarkPublication:false
 }));


 // Verify the original-v2 source, not the automatically derived question bank.
 // Exact lowest-terms fractions must not accept decimal equivalents.
 const v2Source=(await db.query(`select criteria from spark_grading_private.rubrics_v2
  where subject_id='mathematics' and paper_id='original-v2'
  and active=false and verification_status='draft'`)).rows[0].criteria;
 const v2Q=n=>v2Source.filter(c=>c.id.startsWith('p2-q'+n+'-v2::'));
 assert.equal(v2Source.length,42);
 for(const number of [1,2]){
  assert.equal(v2Q(number).length,number===1?4:5);
  assert(v2Q(number).every(c=>Array.isArray(c.sourceMarking?.criteria)
     && c.sourceMarking.criteria.length>0));
  assert.equal(v2Q(number).reduce((n,c)=>n+c.maxMarks,0),9);
 }
 const fractionGrade=answer=>evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v2',criteria:v2Q(1),
  responses:{'p2-q1-v2::a':{answer}}
 }).rows.find(r=>r.criterionId==='p2-q1-v2::a');
 assert.equal(fractionGrade('1.8').suggestedMarks,0,
  'An exact fraction cannot be replaced with decimal 1.8');
 assert.equal(fractionGrade('18/10').suggestedMarks,0,
  'An unreduced fraction cannot earn exact accuracy');
 assert.equal(fractionGrade('9/5').suggestedMarks,1,
  'Lowest-terms fraction must earn accuracy even while methods remain unresolved');
 assert.equal(fractionGrade('1 4/5').suggestedMarks,1,
  'Equivalent lowest-terms mixed number is a legitimate fraction');
 const changedCost=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v2',criteria:v2Q(1),
  responses:{
   'p2-q1-v2::b1':{answer:'4000'},
   'p2-q1-v2::b2':{answer:'5400',working:'4000 * 1.35 = 5400'}
  }
 });
 assert.equal(changedCost.rows.find(r=>r.criterionId==='p2-q1-v2::b2').suggestedMarks,2,
  'Valid ECF on incorrect prior cost should still earn Q1 method + accuracy');
 assert.equal(changedCost.rows.find(r=>r.criterionId==='p2-q1-v2::b2').resolved,false,
  'Correct follow-through is advisory until source-specific method evidence is independently verified');
 const factorise=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v2',criteria:v2Q(2),
  responses:{
   'p2-q2-v2::b1':{answer:'3(m-7n)(m+7n)'},
   'p2-q2-v2::b2':{answer:'3x^2+7x-6'},
   'p2-q2-v2::c2':{answer:'width 6 cm, length 17 cm'}
  }
 });
 assert.equal(factorise.rows.find(r=>r.criterionId==='p2-q2-v2::b1').suggestedMarks,1,
  'Correct factorised expression earns its accuracy mark; unsupported method inference stays provisional');
 assert.equal(factorise.rows.find(r=>r.criterionId==='p2-q2-v2::b2').suggestedMarks,0);
 assert.equal(factorise.rows.find(r=>r.criterionId==='p2-q2-v2::c2').resolved,false,
  'Paired width and length must preserve source roles');
 assert.equal(factorise.canPublishFinalScore,false);
 console.log('Mathematics original-v2 Q1/Q2 source response checks',JSON.stringify({
  exactFraction: fractionGrade('9/5').suggestedMarks,
  decimalRejected: fractionGrade('1.8').suggestedMarks,
  carriedForward: changedCost.rows.find(r=>r.criterionId==='p2-q1-v2::b2').suggestedMarks,
  factoriseCorrect:factorise.rows.find(r=>r.criterionId==='p2-q2-v2::b1').suggestedMarks
 }));


 // The mathematical inverse accepts scalar notation and equivalent rational
 // entries; swapped positions or incorrect denominators earn no B1 mark.
 // Both M marks remain unresolved pending genuine method evidence.
 const inverseSource=fullyDrafted.filter(c=>c.id.startsWith('p2-q10-v1::'));
 const inverseGrade=answer=>evaluateExistingSubjectPaper2V2({
   subjectId:'mathematics',paperId:'original-v1',
   criteria:inverseSource,responses:{'p2-q10-v1::c':{answer}}
 }).rows.find(x=>x.criterionId==='p2-q10-v1::c');
 const correctInverse=inverseGrade('(1/7)[[5,-3],[-1,2]]');
 const equivalentInverse=inverseGrade('[[5/7,-3/7],[-1/7,2/7]]');
 const incorrectInverse=inverseGrade('(1/8)[[5,-3],[-1,2]]');
 const swappedInverse=inverseGrade('(1/7)[[5,-3],[2,-1]]');
 assert.equal(correctInverse.suggestedMarks,1);
 assert.equal(equivalentInverse.suggestedMarks,1);
 assert.equal(incorrectInverse.suggestedMarks,0);
 assert.equal(swappedInverse.suggestedMarks,0);
 assert.equal(correctInverse.resolved,false,
  'Two inverse construction method marks must remain under review');


 // Complete source-bound Maths original-v2 Q3 through Q6. Typed diagrams,
 // multi-coordinate responses and table-cell allocations remain unresolved
 // instead of producing unverified final marks.
 const v2Full=(await db.query(`select criteria from spark_grading_private.rubrics_v2
  where subject_id='mathematics' and paper_id='original-v2'
  and verification_status='draft' and active=false`)).rows[0].criteria;
 const sourceV2=n=>v2Full.filter(c=>c.id.startsWith('p2-q'+n+'-v2::'));
 for(const [question,partCount] of [[3,3],[4,4],[5,4],[6,4]]){
  const partRows=sourceV2(question);
  assert.equal(partRows.length,partCount);
  assert.equal(partRows.reduce((n,c)=>n+c.maxMarks,0),9);
  assert(partRows.every(c=>Array.isArray(c.sourceMarking?.criteria)
   && c.sourceMarking.criteria.length>0),
   'Every new original-v2 rubric part needs reviewed structural allocation');
  const blank=evaluateExistingSubjectPaper2V2({
   subjectId:'mathematics',paperId:'original-v2',
   criteria:partRows,responses:{}
  });
  assert.equal(blank.maxMarks,9);
  assert.equal(blank.suggestedMarks,0);
 }
 const gradeV2=(question,responses)=>evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v2',
  criteria:sourceV2(question),responses
 });
 const geometry=gradeV2(3,{
  'p2-q3-v2::a':{answer:'reflection in the y-axis x=0'},
  'p2-q3-v2::b':{answer:'A (5,-5), B (9,-5), C (5,-2)'},
  'p2-q3-v2::c':{answer:'5.00',working:'4^2 + 3^2 =25; sqrt(25)=5'}
 });
 assert.equal(geometry.rows.find(x=>x.criterionId==='p2-q3-v2::a').suggestedMarks,0,
  'Words cannot independently verify all three geometry transformation marks');
 assert.equal(geometry.rows.find(x=>x.criterionId==='p2-q3-v2::b').suggestedMarks,0,
  'Coordinate triples require positional verification before awarding marks');
 assert.equal(geometry.rows.find(x=>x.criterionId==='p2-q3-v2::c').suggestedMarks,1,
  'Correct length with 2 decimal places gets accuracy but no manual method inference');
 assert.equal(geometry.canPublishFinalScore,false);
 const badPrecision=gradeV2(3,{
  'p2-q3-v2::c':{answer:'5'}
 });
 assert.equal(badPrecision.rows.find(x=>x.criterionId==='p2-q3-v2::c').suggestedMarks,0,
  'Do not award requested 2dp precision mark for whole-number answer');
 const functionAnswers=gradeV2(4,{
  'p2-q4-v2::a1':{answer:'13'},
  'p2-q4-v2::a2':{answer:'25',working:'g(3)=10; f(10)=25'},
  'p2-q4-v2::b':{answer:'(x+5)/3'},
  'p2-q4-v2::c':{answer:'-5 and 5',working:'x^2 =25'}
 });
 assert.equal(functionAnswers.rows.find(x=>x.criterionId==='p2-q4-v2::a1').suggestedMarks,1);
 assert.equal(functionAnswers.rows.find(x=>x.criterionId==='p2-q4-v2::a2').suggestedMarks,2,
  'Composite function M1 and A1 are verified, inner M2 remains manual');
 assert.equal(functionAnswers.rows.find(x=>x.criterionId==='p2-q4-v2::b').suggestedMarks,1);
 assert.equal(functionAnswers.rows.find(x=>x.criterionId==='p2-q4-v2::c').suggestedMarks,1);
 assert.equal(functionAnswers.canPublishFinalScore,false);
 const invalidFunction=gradeV2(4,{
  'p2-q4-v2::a2':{answer:'30',working:'f(3) * g(3)=4*10=40'},
  'p2-q4-v2::c':{answer:'5'}
 });
 assert.equal(invalidFunction.rows.find(x=>x.criterionId==='p2-q4-v2::a2').suggestedMarks,1,
  'Correct g(3) is M1 only; incorrect composition and final cannot score');
 assert.equal(invalidFunction.rows.find(x=>x.criterionId==='p2-q4-v2::c').suggestedMarks,0,
  'Single root is incomplete when both roots are required');
 const statistics=gradeV2(5,{
  'p2-q5-v2::a':{answer:'11-15'},
  'p2-q5-v2::b':{answer:'13',working:'fx total 520, n=40'},
  'p2-q5-v2::c':{cells:{c2:14,c3:26,c4:35,c5:40}},
  'p2-q5-v2::d':{answer:'7/20',working:'14/40=7/20'}
 });
 assert.equal(statistics.rows.find(x=>x.criterionId==='p2-q5-v2::a').suggestedMarks,1);
 assert.equal(statistics.rows.find(x=>x.criterionId==='p2-q5-v2::b').suggestedMarks,1);
 assert.equal(statistics.rows.find(x=>x.criterionId==='p2-q5-v2::c').suggestedMarks,0);
 assert.equal(statistics.rows.find(x=>x.criterionId==='p2-q5-v2::c').resolved,false);
 assert.equal(statistics.rows.find(x=>x.criterionId==='p2-q5-v2::d').suggestedMarks,1);
 assert.equal(statistics.canPublishFinalScore,false);
 const invalidFraction=gradeV2(5,{
  'p2-q5-v2::d':{answer:'14/40'}
 });
 assert.equal(invalidFraction.rows.find(x=>x.criterionId==='p2-q5-v2::d').suggestedMarks,0,
  'Unreduced probability fraction cannot earn accuracy');
 const v2Cylinder=gradeV2(6,{
  'p2-q6-v2::a':{answer:'154',working:'22/7 * 7^2 =154'},
  'p2-q6-v2::b':{answer:'2310',working:'154*15=2310'},
  'p2-q6-v2::c':{answer:'660',working:'2*22/7*7*15=660'},
  'p2-q6-v2::d':{answer:'110',working:'2310/21=110'}
 });
 assert.equal(v2Cylinder.maxMarks,9);
 assert(v2Cylinder.suggestedMarks>0&&v2Cylinder.suggestedMarks<9);
 assert.equal(v2Cylinder.canPublishFinalScore,false);
 const v2CylinderWrong=gradeV2(6,{
  'p2-q6-v2::a':{answer:'150'},
  'p2-q6-v2::b':{answer:'2250',working:'150 * 15 =2250'}
 });
 assert.equal(v2CylinderWrong.rows.find(x=>x.criterionId==='p2-q6-v2::b').suggestedMarks,2,
  'Valid v2Cylinder ECF gets M2+A1 while M1 remains manual');
 const fillWrong=gradeV2(6,{
  'p2-q6-v2::b':{answer:'2205'},
  'p2-q6-v2::d':{answer:'105',working:'2205/21=105'}
 });
 assert.equal(fillWrong.rows.find(x=>x.criterionId==='p2-q6-v2::d').suggestedMarks,2,
  'Valid filling-time ECF preserves both marks from earlier wrong volume');
 console.log('Math original-v2 Q3-Q6 source calibration replay',JSON.stringify({
  questions:4,parts:15,marks:36,
  geometryAccuracy:geometry.rows.find(x=>x.criterionId==='p2-q3-v2::c').suggestedMarks,
  inverseAndFunctionResults:functionAnswers.suggestedMarks,
  structuredTableProvisional:true,
  cylinderECF:v2CylinderWrong.rows.find(x=>x.criterionId==='p2-q6-v2::b').suggestedMarks
 }));


 try {
 // Source-specific original-v2 Q7-Q10: all remaining parts must agree with
 // the real 42-part paper and preserve the existing Q9(b)(i) mark scheme.
 const mathV2=(await db.query(`select criteria from spark_grading_private.rubrics_v2
 where subject_id='mathematics' and paper_id='original-v2' and
 verification_status='draft' and active=false`)).rows[0].criteria;
 assert.equal(mathV2.length,42);
 assert.equal(mathV2.reduce((sum,c)=>sum+c.maxMarks,0),100);
 assert(mathV2.every(c=>Array.isArray(c.sourceMarking?.criteria)
   && c.sourceMarking.criteria.length>0));
 const remaining=n=>mathV2.filter(c=>c.id.startsWith('p2-q'+n+'-v2::'));
 for(const [q,n,marks] of [[7,4,10],[8,5,12],[9,5,12],[10,4,12]]){
  const rows=remaining(q);
  assert.equal(rows.length,n);
  assert.equal(rows.reduce((sum,c)=>sum+c.maxMarks,0),marks);
  const blank=evaluateExistingSubjectPaper2V2({
    subjectId:'mathematics',paperId:'original-v2',criteria:rows,responses:{}
  });
  assert.equal(blank.maxMarks,marks);
  assert.equal(blank.suggestedMarks,0);
 }
 const preservedBearing=remaining(9).find(c=>c.id==='p2-q9-v2::b1');
 assert.equal(preservedBearing.sourceMarking.criteria.length,3);
 assert.equal(preservedBearing.sourceMarking.criteria[0].check.type,'reachesValue');
 const gradeRest=(number,responses)=>evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v2',
  criteria:remaining(number),responses
 });
 const q7Structured=gradeRest(7,{
  'p2-q7-v2::a':{answer:'16, 16, 32'},
  'p2-q7-v2::b':{answer:'n^2, 4n, n^2+4n'},
  'p2-q7-v2::c':{answer:'8',working:'n^2+4n=96'},
  'p2-q7-v2::d':{answer:'60',working:'n=15, 4n=60'}
 });
 assert.equal(q7Structured.rows.find(x=>x.criterionId==='p2-q7-v2::a').suggestedMarks,0,
  'Unverified table cell positions cannot earn final marks');
 assert.equal(q7Structured.rows.find(x=>x.criterionId==='p2-q7-v2::b').suggestedMarks,0,
  'Unverified labelled tile expressions cannot earn marks');
 assert.equal(q7Structured.rows.find(x=>x.criterionId==='p2-q7-v2::c').suggestedMarks,1);
 assert.equal(q7Structured.rows.find(x=>x.criterionId==='p2-q7-v2::d').suggestedMarks,1);
 assert.equal(q7Structured.canPublishFinalScore,false);
 const badDesign=gradeRest(7,{'p2-q7-v2::c':{answer:'-12'}});
 assert.equal(badDesign.rows.find(x=>x.criterionId==='p2-q7-v2::c').suggestedMarks,0);
 const q8=gradeRest(8,{
  'p2-q8-v2::a':{answer:'2x^2+12x+23'},
  'p2-q8-v2::b1':{answer:'5'},
  'p2-q8-v2::b2':{answer:'-3'},
  'p2-q8-v2::c':{answer:'x=-3'},
  'p2-q8-v2::d':{answer:'(0,23)'}
 });
 assert.equal(q8.rows.find(x=>x.criterionId==='p2-q8-v2::a').suggestedMarks,0,
  'Expanded algebra does not demonstrate completing the square');
 assert.equal(q8.rows.find(x=>x.criterionId==='p2-q8-v2::c').suggestedMarks,1);
 assert.equal(q8.rows.find(x=>x.criterionId==='p2-q8-v2::d').suggestedMarks,1);
 assert.equal(q8.canPublishFinalScore,false);
 const swappedIntercept=gradeRest(8,{'p2-q8-v2::d':{answer:'(23,0)'}});
 assert.equal(swappedIntercept.rows.find(x=>x.criterionId==='p2-q8-v2::d').suggestedMarks,0);
 const q9=gradeRest(9,{
  'p2-q9-v2::a1':{answer:'64'},
  'p2-q9-v2::a2':{answer:'26'},
  'p2-q9-v2::b2':{answer:'100'},
  'p2-q9-v2::b3':{answer:'108'}
 });
 assert.equal(q9.rows.find(x=>x.criterionId==='p2-q9-v2::a1').suggestedMarks,1);
 assert.equal(q9.rows.find(x=>x.criterionId==='p2-q9-v2::b3').suggestedMarks,1);
 assert.equal(q9.canPublishFinalScore,false);
 const invalidBearing=gradeRest(9,{'p2-q9-v2::b3':{answer:'208'}});
 assert.equal(invalidBearing.rows.find(x=>x.criterionId==='p2-q9-v2::b3').suggestedMarks,0);
 const q10=gradeRest(10,{
  'p2-q10-v2::a':{answer:'[[3,-1],[2,16]]'},
  'p2-q10-v2::b':{answer:'10'},
  'p2-q10-v2::c':{answer:'(1/10)[[4,-1],[-2,3]]'},
  'p2-q10-v2::d':{answer:'2, 5'}
 });
 for(const id of ['a','b','c']){
  assert.equal(q10.rows.find(x=>x.criterionId==='p2-q10-v2::'+id).suggestedMarks,1);
 }
 assert.equal(q10.rows.find(x=>x.criterionId==='p2-q10-v2::d').suggestedMarks,2);
 assert.equal(q10.canPublishFinalScore,false);
 const wrongMatrix=gradeRest(10,{'p2-q10-v2::a':{answer:'[[3,2],[-1,16]]'}});
 assert.equal(wrongMatrix.rows.find(x=>x.criterionId==='p2-q10-v2::a').suggestedMarks,0);
 const wrongInverse=gradeRest(10,{'p2-q10-v2::c':{answer:'(1/11)[[4,-1],[-2,3]]'}});
 assert.equal(wrongInverse.rows.find(x=>x.criterionId==='p2-q10-v2::c').suggestedMarks,0);
 const reversedXY=gradeRest(10,{'p2-q10-v2::d':{answer:'5, 2'}});
 assert.equal(reversedXY.rows.find(x=>x.criterionId==='p2-q10-v2::d').suggestedMarks,0);
 console.log('Mathematics original-v2 Q7-Q10 verification',JSON.stringify({
  parts:18,marks:46,completePaperParts:42,completePaperMarks:100,
  retainedQ9Bearing:true,structuredAnswersUnresolved:true,finalPublication:false
 }));


 } catch(error) {
  console.error('Original-v2 Q7-Q10 source replay failed:',String(error?.message||error));
  throw new Error('Original-v2 Q7-Q10 source replay failed: '+String(error?.message||error));
 }

 // Q4 constructions, Q5 cumulative-frequency tables/curves and Q7
 // labelled figure entries must remain unresolved until visual evidence is
 // checked against the SOURCE, even for text that happens to look correct.
 for(const paperId of ['p2h','p2j']){
  const partRows=(await db.query(`select criteria from spark_grading_private.rubrics_v2
  where subject_id='mathematics' and paper_id=$1 and
   active=false and verification_status='draft'`,[paperId])).rows[0].criteria;
  assert.equal(partRows.length,41);
  assert.equal(partRows.reduce((sum,c)=>sum+c.maxMarks,0),100);
  assert(partRows.every(c=>Array.isArray(c.sourceMarking?.criteria)&&
   c.sourceMarking.criteria.length>0));
  const focus=partRows.filter(c=>
   c.id===paperId+'-q4::a1'||c.id===paperId+'-q4::a2'||
   c.id===paperId+'-q5::a'||c.id===paperId+'-q5::b'||
   c.id===paperId+'-q7::a');
  assert.equal(focus.length,5);
  assert.equal(focus.reduce((sum,c)=>sum+c.maxMarks,0),13);
  const responses=Object.fromEntries(focus.map(c=>[c.id,{
   answer:c.sourceMarking.answer,working:c.sourceMarking.solution
  }]));
  const evaluation=evaluateExistingSubjectPaper2V2({
   subjectId:'mathematics',paperId,criteria:partRows,responses
  });
  assert.equal(evaluation.maxMarks,100);
  assert.equal(evaluation.examinedParts,41);
  for(const c of focus){
   const outcome=evaluation.rows.find(r=>r.criterionId===c.id);
   assert.equal(outcome.suggestedMarks,0,
     'Text-only '+c.id+' cannot earn a visual/artifact mark');
   assert.equal(outcome.resolved,false,
     'Unverified construction/graph/table must remain provisional');
  }
  assert.equal(evaluation.canPublishFinalScore,false);
 }
 console.log('Mathematics Practice H/J visual-only source calibration',
 JSON.stringify({papers:['p2h','p2j'],partsAdded:10,marksAdded:26,
 sourcePaperParts:41,marksPerPaper:100,visualMarksPublished:0}));

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
 const pilotReviews=(await db.query(`select subject_id,paper_id,criterion_id,
   verified_by,criterion_sha256 from spark_grading_private.rubric_criterion_reviews_v2
   order by subject_id,paper_id,criterion_id`)).rows;
 assert.equal(pilotReviews.length,12);
 assert(pilotReviews.every(row=>row.verified_by.includes('AI criterion QA, nonhuman')));
 assert.deepEqual(pilotReviews.map(row=>row.criterion_id).sort(),[
  'p2-q4-v1::a1','p2-q4-v2::a1','phy-p2-4-q2::di','phy-p2-4-q2::dii',
  'p2-q10-v1::b','p2-q1-v3::b3','p2e-q4::a2','p2g-q4::a2',
  'p2i-q4::a2','phy-p2-2-q3::biii','p2-q2-v1::c1','p2-q2-v2::c1'].sort());
 const readiness=(await db.query(`select subject_id,paper_id,source_parts,
   expected_total_marks,source_total_marks,source_hash_matches,
   source_matched_reviews,pending_criterion_reviews,explicit_manual_checks
   from spark_grading_private.rubric_approval_readiness_v2`)).rows;
 assert.equal(readiness.length,67,
   'Independent approval view must track all registered V2 papers');
 assert.equal(readiness.reduce((n,r)=>n+Number(r.source_parts),0),2118);
 for(const paper of readiness){
  assert.equal(paper.expected_total_marks,paper.source_total_marks,
   'Source-registered paper total mismatch: '+paper.paper_id);
  assert.equal(paper.source_hash_matches,true);
  const expectedReviews=({
   'mathematics::original-v1':3,
   'mathematics::original-v2':2,
   'mathematics::original-v3':1,
   'mathematics::p2e':1,
   'mathematics::p2g':1,
   'mathematics::p2i':1,
   'physics::spark-phy-p02-practice-2':1,
   'physics::spark-phy-p02-practice-4':2
  })[paper.subject_id+'::'+paper.paper_id]||0;
  assert.equal(Number(paper.source_matched_reviews),expectedReviews);
  assert.equal(Number(paper.pending_criterion_reviews),
   paper.source_parts-expectedReviews,
   'Every unreviewed source part must preserve its approval requirement');
 }
 await assert.rejects(
  db.query(`update spark_grading_private.rubrics_v2
   set verification_status='verified',active=true,
   verified_by='test_not_a_review',verified_at=now()
   where subject_id='mathematics' and paper_id='original-v1'`),
  /Missing independent criterion-level approvals/,
  'No fixture should approve a paper without criterion-by-criterion evidence'
 );

 // CI must replay the full private staging schema, not silently audit an old
 // subset of migrations after production Mathematics reached 640/640 parts.
 const mathPaperRows=papers.filter(p=>p.subject_id==='mathematics');
 assert.equal(mathPaperRows.length,16);
 assert.equal(mathPaperRows.reduce((n,p)=>n+p.criteria.length,0),640);
 for(const paper of mathPaperRows){
  assert(paper.criteria.every(c=>Array.isArray(c.sourceMarking?.criteria)
    && c.sourceMarking.criteria.length>0),
    'Every registered Mathematics source part must have detailed draft criteria');
  for(const part of paper.criteria)
   assert.equal(part.sourceMarking.criteria.reduce((n,c)=>n+c.marks,0),
    part.maxMarks,'Per-part M/A/B allocation drift: '+part.id);
 }

 const pendingReviews=(await db.query(`select count(*)::integer AS total,
  count(*) filter(where source_matched_review)::integer AS reviewed,
  count(*) filter(where review_focus='manual-graph-artifact')::integer AS graph,
  count(*) filter(where review_focus='missing-detailed-math-allocation')::integer AS math_missing
  from spark_grading_private.v2_calibration_queue`)).rows[0];
 assert.deepEqual(pendingReviews,{total:2118,reviewed:12,graph:4,math_missing:0},
  'Replay must include all Mathematics calibrations and ten genuine source-bound AI QA records');

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
