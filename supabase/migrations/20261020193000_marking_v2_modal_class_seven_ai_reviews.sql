-- Seven source-specific, nonhuman deterministic criterion QA reviews.
-- This grants NO paper-level attestation or score-publication authority.
BEGIN;
DO $approve$
DECLARE n integer;
BEGIN
 IF (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>39
 THEN RAISE EXCEPTION 'Criterion review baseline drifted'; END IF;
 CREATE TEMP TABLE _modal_sources ON COMMIT DROP AS
 SELECT r.subject_id,r.paper_id,r.rubric_version,
  c->>'id' criterion_id,c->'sourceMarking'->>'answer' model_answer,
  c->'sourceMarking'->'criteria'->0->'check' source_check,
  encode(sha256(convert_to(c::text,'UTF8')),'hex') digest,
  r.source_sha256 paper_digest,
  p.lower_endpoint,p.upper_endpoint,p.peak_frequency
 FROM (VALUES
  ('original-v1','p2-q5-v1::a',16,20,16),
  ('original-v2','p2-q5-v2::a',11,15,12),
  ('original-v3','p2-q5-v3::a',11,15,16),
  ('original-v10','p2-q5-v10::a',21,25,12),
  ('p2e','p2e-q5::b',21,30,14),
  ('p2g','p2g-q5::b',21,30,18),
  ('p2i','p2i-q5::b',31,40,20)
 ) p(paper_id,criterion_id,lower_endpoint,upper_endpoint,peak_frequency)
 JOIN spark_grading_private.rubrics_v2 r
  ON r.subject_id='mathematics' AND r.paper_id=p.paper_id
  AND r.rubric_version='source-scheme-draft-v2'
 CROSS JOIN LATERAL jsonb_array_elements(r.criteria)c
 WHERE c->>'id'=p.criterion_id AND c->>'sourcePartId'=p.criterion_id
  AND c->>'maxMarks'='1' AND c->'sourceMarking'->>'answer'=
  p.lower_endpoint::text||' - '||p.upper_endpoint::text
  AND jsonb_array_length(c->'sourceMarking'->'criteria')=1
  AND c->'sourceMarking'->'criteria'->0->'check'->>'type'='classInterval'
  AND c->'sourceMarking'->'criteria'->0->'check'->'value'=
   jsonb_build_array(p.lower_endpoint,p.upper_endpoint)
  AND c->'sourceMarking'->'criteria'->0->>'field'='answer'
  AND c->'sourceMarking'->'criteria'->0->>'marks'='1'
  AND r.verification_status='draft' AND NOT r.active
  AND r.source_sha256=encode(sha256(convert_to(r.criteria::text,'UTF8')),'hex');
 IF (SELECT count(*) FROM _modal_sources)<>7
 THEN RAISE EXCEPTION 'Seven exact source definitions are required'; END IF;
 IF EXISTS(SELECT 1 FROM _modal_sources x JOIN
  spark_grading_private.rubric_criterion_reviews_v2 v
  ON v.subject_id=x.subject_id AND v.paper_id=x.paper_id
   AND v.rubric_version=x.rubric_version AND v.criterion_id=x.criterion_id)
 THEN RAISE EXCEPTION 'An ordered interval has already been reviewed'; END IF;
 INSERT INTO spark_grading_private.rubric_criterion_reviews_v2
  (subject_id,paper_id,rubric_version,criterion_id,criterion_sha256,
   verified_by,verified_at,review_note)
 SELECT subject_id,paper_id,rubric_version,criterion_id,digest,
  'OpenAI GPT-6 (AI criterion QA, nonhuman)',clock_timestamp(),
  format('Nonhuman source-specific QA for the unique modal class %s: %s. '
   || 'The source frequency table has a largest class frequency of %s. '
   || 'Exact subject/question, one B1/A1 mark, and scheme answer verified from '
   || 'SPARK original Mathematics Paper 2 source. This private V2 classInterval '
   || 'checker accepts ordered class limits, optional kg units and equivalent '
   || 'wording. It rejects reversed bounds, two competing intervals, extra '
   || 'guesses and wrong boundaries. Seven-paper positive/adversarial tests: '
   || 'src/grading/v2ModalClassSourceApproval.test.js. '
   || 'This is an AI-only criterion QA review, not independent human '
   || 'or paper-level attestation. No V2 exam grade is approved.',
   criterion_id,model_answer,peak_frequency)
 FROM _modal_sources;
 GET DIAGNOSTICS n=ROW_COUNT;
 IF n<>7 THEN RAISE EXCEPTION 'Seven criterion-level QA records required, inserted %',n; END IF;
 IF (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>46
 THEN RAISE EXCEPTION 'Expected 46 real-source AI QA reviews'; END IF;
 IF EXISTS(SELECT 1 FROM spark_grading_private.rubrics_v2
   WHERE active OR verification_status='verified')
 THEN RAISE EXCEPTION 'Rubric approval is NOT authorized'; END IF;
END $approve$;
-- Previously registered evidence-gap snapshots now distinguish the small
-- source-reviewed subset from open gaps. Preserve all 2,079 original entries.
ALTER TABLE spark_grading_private.v2_criterion_evidence_gaps
 DROP CONSTRAINT v2_criterion_evidence_gaps_assessment_status_check;
ALTER TABLE spark_grading_private.v2_criterion_evidence_gaps
 ADD CONSTRAINT v2_criterion_evidence_gaps_assessment_status_check
 CHECK (assessment_status IN ('unverified','source-ai-qa'));
UPDATE spark_grading_private.v2_criterion_evidence_gaps g
 SET assessment_status='source-ai-qa',
  required_evidence=ARRAY[
   'Source modal class and highest table frequency independently identified',
   'Ordered class bounds, whitespace, interval wording and kg alternatives tested',
   'Reversed, competing, extra and wrong class boundaries rejected by regression',
   'Paper-level verification, other source methods and grade publication remain gated'
  ]::text[]
 FROM spark_grading_private.rubric_criterion_reviews_v2 v
 WHERE g.run_id='v2-pending-source-review-20261020'
  AND g.subject_id='mathematics' AND g.subject_id=v.subject_id
  AND g.paper_id=v.paper_id AND g.rubric_version=v.rubric_version
  AND g.criterion_id=v.criterion_id AND g.criterion_sha256=v.criterion_sha256
  AND g.criterion_id IN ('p2-q5-v1::a','p2-q5-v2::a','p2-q5-v3::a',
   'p2-q5-v10::a','p2e-q5::b','p2g-q5::b','p2i-q5::b');
DO $$BEGIN
 IF (SELECT count(*) FROM spark_grading_private.v2_criterion_evidence_gaps
   WHERE run_id='v2-pending-source-review-20261020' AND assessment_status='source-ai-qa')<>7
 OR (SELECT count(*) FROM spark_grading_private.v2_criterion_evidence_gaps
   WHERE run_id='v2-pending-source-review-20261020' AND assessment_status='unverified')<>2072
 THEN RAISE EXCEPTION 'Approval classification did not reconcile'; END IF;
END $$;
COMMIT;
