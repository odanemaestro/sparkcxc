-- Two AI-assisted reviews of source-specific, one-mark simplest-form B1 checks.
-- These records are NOT paper-level authorization or human sign-off.
BEGIN;
DO $review$
DECLARE p record; r spark_grading_private.rubrics_v2%ROWTYPE; c jsonb;
BEGIN
 IF (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>10
 THEN RAISE EXCEPTION 'Unexpected review baseline'; END IF;
 FOR p IN SELECT * FROM (VALUES
 ('original-v1','p2-q2-v1::c1','8w + 8','8w+8'),
 ('original-v2','p2-q2-v2::c1','6w + 10','6w+10')
 ) t(paper_id,part_id,answer,expected) LOOP
  SELECT * INTO r FROM spark_grading_private.rubrics_v2
  WHERE subject_id='mathematics' AND paper_id=p.paper_id
   AND rubric_version='source-scheme-draft-v2';
  IF NOT FOUND OR r.active OR r.verification_status<>'draft' OR
   r.source_sha256<>encode(sha256(convert_to(r.criteria::text,'UTF8')),'hex')
   THEN RAISE EXCEPTION 'Source changed %',p.paper_id; END IF;
  SELECT value INTO c FROM jsonb_array_elements(r.criteria)value
   WHERE value->>'id'=p.part_id;
  IF NOT FOUND OR (c->>'maxMarks')::int<>1 OR
   c->'sourceMarking'->>'answer'<>p.answer OR
   c->'sourceMarking'->'criteria'->0->'check'->>'value'<>p.expected OR
   c->'sourceMarking'->'criteria'->0->'check'->>'requireSimplifiedLinear'<>'true'
   THEN RAISE EXCEPTION 'Simplest-form source check mismatch %',p.part_id; END IF;
  INSERT INTO spark_grading_private.rubric_criterion_reviews_v2
  (subject_id,paper_id,rubric_version,criterion_id,criterion_sha256,
   verified_by,verified_at,review_note)
  VALUES('mathematics',p.paper_id,r.rubric_version,p.part_id,
   encode(sha256(convert_to(c::text,'UTF8')),'hex'),
   'OpenAI GPT-6 (AI criterion QA, nonhuman)',clock_timestamp(),
   'AI source QA: one independent B1 perimeter-expression mark. Corrected source requires '
   || 'simplest linear form; accepts symbolic commutativity, rejects equivalent '
   || 'unsimplified brackets and duplicate linear terms. Source-aligned positive '
   || 'and negative fixtures in src/grading/v2CriterionReviewPilot.test.js. '
   || 'Not human attestation or final V2 score authorization.');
 END LOOP;
 IF (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>12
 THEN RAISE EXCEPTION 'Incomplete source review insertion'; END IF;
END $review$;
COMMIT;