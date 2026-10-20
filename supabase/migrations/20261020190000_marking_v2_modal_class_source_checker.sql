-- Replace unsafe unordered set/modal-class fallback with source-checked
-- ordered class-interval marking, seven exact Mathematics Paper 2 source parts.
-- Keep paper rubrics as inactive drafts pending complete paper review.
BEGIN;
DO $calibrate$
DECLARE p record; r spark_grading_private.rubrics_v2%ROWTYPE;
 revised jsonb; fingerprint text; updated integer;
BEGIN
 FOR p IN SELECT * FROM (VALUES
 ('original-v1','p2-q5-v1::a',16,20,'sparkAnswer'),
 ('original-v2','p2-q5-v2::a',11,15,'sparkAnswer'),
 ('original-v3','p2-q5-v3::a',11,15,'manual-verification'),
 ('original-v10','p2-q5-v10::a',21,25,'manual-verification'),
 ('p2e','p2e-q5::b',21,30,'set'),
 ('p2g','p2g-q5::b',21,30,'set'),
 ('p2i','p2i-q5::b',31,40,'set')
 ) v(paper_id,criterion_id,lower_endpoint,upper_endpoint,old_checker) LOOP
  SELECT * INTO r FROM spark_grading_private.rubrics_v2
   WHERE subject_id='mathematics' AND paper_id=p.paper_id
   AND rubric_version='source-scheme-draft-v2' FOR UPDATE;
  IF NOT FOUND OR r.active OR r.verification_status<>'draft' OR
    r.source_sha256 IS DISTINCT FROM
      encode(sha256(convert_to(r.criteria::text,'UTF8')),'hex')
  THEN RAISE EXCEPTION 'Unverified Mathematics source state: %',p.paper_id; END IF;
  IF (SELECT count(*) FROM jsonb_array_elements(r.criteria)c
      WHERE c->>'id'=p.criterion_id AND c->>'sourcePartId'=p.criterion_id
       AND (c->>'maxMarks')::integer=1 AND
       c->'sourceMarking'->>'answer'=p.lower_endpoint::text||' - '||p.upper_endpoint::text
       AND jsonb_array_length(c->'sourceMarking'->'criteria')=1
       AND c->'sourceMarking'->'criteria'->0->'check'->>'type'=p.old_checker
       AND c->'sourceMarking'->'criteria'->0->>'marks'='1'
    )<>1
  THEN RAISE EXCEPTION 'Source answer, marks or checker drift: %',p.criterion_id; END IF;
  IF EXISTS(SELECT 1 FROM spark_grading_private.rubric_criterion_reviews_v2 v
    WHERE v.subject_id='mathematics' AND v.paper_id=p.paper_id
      AND v.rubric_version='source-scheme-draft-v2' AND v.criterion_id=p.criterion_id)
  THEN RAISE EXCEPTION 'Already reviewed source criterion: %',p.criterion_id; END IF;
  SELECT jsonb_agg(
   CASE WHEN c.value->>'id'=p.criterion_id
    THEN jsonb_set(
      jsonb_set(c.value,'{sourceMarking,criteria,0,check}',
       jsonb_build_object('type','classInterval',
         'value',jsonb_build_array(p.lower_endpoint,p.upper_endpoint)),false),
      '{sourceMarking,criteria,0,field}','"answer"'::jsonb,false)
    ELSE c.value END ORDER BY c.ord)
   INTO revised FROM jsonb_array_elements(r.criteria) WITH ORDINALITY c(value,ord);
  fingerprint:=encode(sha256(convert_to(revised::text,'UTF8')),'hex');
  UPDATE spark_grading_private.rubrics_v2
    SET criteria=revised,source_sha256=fingerprint
    WHERE subject_id='mathematics' AND paper_id=p.paper_id
      AND rubric_version='source-scheme-draft-v2' AND NOT active;
  UPDATE spark_grading_private.v2_calibration_batch_items b
   SET source_sha256=fingerprint,
    criterion_sha256=encode(sha256(convert_to(
     (SELECT c FROM jsonb_array_elements(revised)c
      WHERE c->>'id'=b.criterion_id)::text,'UTF8')),'hex')
   WHERE b.subject_id='mathematics' AND b.paper_id=p.paper_id
     AND b.rubric_version='source-scheme-draft-v2';
  UPDATE spark_grading_private.v2_criterion_evidence_gaps g
   SET paper_source_sha256=fingerprint,
    criterion_sha256=encode(sha256(convert_to(
     (SELECT c FROM jsonb_array_elements(revised)c
      WHERE c->>'id'=g.criterion_id)::text,'UTF8')),'hex')
   WHERE g.subject_id='mathematics' AND g.paper_id=p.paper_id
     AND g.rubric_version='source-scheme-draft-v2'
     AND g.run_id='v2-pending-source-review-20261020';
  SELECT COUNT(*) INTO updated FROM spark_grading_private.v2_calibration_queue q
   WHERE q.subject_id='mathematics' AND q.paper_id=p.paper_id
    AND q.rubric_version='source-scheme-draft-v2'
    AND q.criterion_id=p.criterion_id AND
    q.paper_source_sha256=fingerprint AND
    q.criterion_sha256=encode(sha256(convert_to(
     (SELECT c FROM jsonb_array_elements(revised)c WHERE c->>'id'=p.criterion_id)::text,'UTF8')),'hex');
  IF updated<>1 THEN RAISE EXCEPTION 'Source bridge drift: %',p.criterion_id; END IF;
 END LOOP;
 IF EXISTS(SELECT 1 FROM spark_grading_private.rubrics_v2 WHERE active OR verification_status='verified')
 THEN RAISE EXCEPTION 'Source calibration unexpectedly promoted a paper'; END IF;
 IF (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>39
 THEN RAISE EXCEPTION 'Source calibration must not create reviewer attestations'; END IF;
END $calibrate$;
COMMIT;
