BEGIN;
DO $fix$
DECLARE p record; r spark_grading_private.rubrics_v2%ROWTYPE; revised jsonb; fingerprint text;
BEGIN
 FOR p IN SELECT * FROM (VALUES
   ('original-v1','p2-q2-v1::c1','8w+8'),
   ('original-v2','p2-q2-v2::c1','6w+10')
 ) t(paper_id,part_id,expected) LOOP
  SELECT * INTO r FROM spark_grading_private.rubrics_v2 WHERE
   subject_id='mathematics' AND paper_id=p.paper_id
   AND rubric_version='source-scheme-draft-v2' FOR UPDATE;
  IF NOT FOUND OR r.active OR r.verification_status<>'draft' OR
     r.source_sha256<>encode(sha256(convert_to(r.criteria::text,'UTF8')),'hex')
  THEN RAISE EXCEPTION 'Source state mismatch %',p.paper_id; END IF;
  IF (SELECT count(*) FROM jsonb_array_elements(r.criteria)c
     WHERE c->>'id'=p.part_id AND (c->>'maxMarks')::int=1
     AND c->'sourceMarking'->'criteria'->0->'check'->>'value'=p.expected
     AND c->'sourceMarking'->'criteria'->0->'check'->>'type'='expression')<>1
  THEN RAISE EXCEPTION 'Source criterion mismatch %',p.part_id; END IF;
  IF EXISTS(SELECT 1 FROM spark_grading_private.rubric_criterion_reviews_v2
   WHERE subject_id='mathematics' AND paper_id=p.paper_id
   AND criterion_id=p.part_id) THEN RAISE EXCEPTION 'Already reviewed'; END IF;
  SELECT jsonb_agg(CASE WHEN c.value->>'id'=p.part_id
     THEN jsonb_set(c.value,'{sourceMarking,criteria,0,check,requireSimplifiedLinear}',
         'true'::jsonb,true) ELSE c.value END ORDER BY c.ord)
   INTO revised FROM jsonb_array_elements(r.criteria) WITH ORDINALITY c(value,ord);
  fingerprint:=encode(sha256(convert_to(revised::text,'UTF8')),'hex');
  UPDATE spark_grading_private.rubrics_v2
   SET criteria=revised,source_sha256=fingerprint WHERE
    subject_id='mathematics' AND paper_id=p.paper_id
    AND rubric_version='source-scheme-draft-v2' AND NOT active;
  UPDATE spark_grading_private.v2_calibration_batch_items b
   SET source_sha256=fingerprint,
    criterion_sha256=encode(sha256(convert_to(
      (SELECT c FROM jsonb_array_elements(revised)c
       WHERE c->>'id'=b.criterion_id)::text,'UTF8')),'hex')
   WHERE subject_id='mathematics' AND paper_id=p.paper_id
    AND rubric_version='source-scheme-draft-v2';
 END LOOP;
END $fix$;
COMMIT;