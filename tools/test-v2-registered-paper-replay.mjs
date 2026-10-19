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
"20261020005000_marking_v2_math_original_v2_q3_q6_drafts.sql"
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
 assert.equal(cylinderModel.unresolvedMarks,7,
  'Even a fully worked canonical cylinder response retains manual verification obligations');
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
 assert.equal(changedCost.rows.find(r=>r.criterionId==='p2-q1-v2::b2').resolved,true,
  'Deterministic ECF may be resolved mathematically; private rubric approval still gates publication');
 const factorise=evaluateExistingSubjectPaper2V2({
  subjectId:'mathematics',paperId:'original-v2',criteria:v2Q(2),
  responses:{
   'p2-q2-v2::b1':{answer:'3(m-7n)(m+7n)'},
   'p2-q2-v2::b2':{answer:'3x^2+7x-6'},
   'p2-q2-v2::c2':{answer:'width 6 cm, length 17 cm'}
  }
 });
 assert.equal(factorise.rows.find(r=>r.criterionId==='p2-q2-v2::b1').suggestedMarks,2,
  'A fully correct factorisation may imply its deterministic method mark');
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
 assert.deepEqual(pendingReviews,{total:2118,reviewed:0,graph:4,math_missing:338});

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
