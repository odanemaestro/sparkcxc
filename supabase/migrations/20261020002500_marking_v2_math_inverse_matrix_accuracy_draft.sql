-- Source-specific Mathematics original-v1 inverse accuracy check.
-- The authored method marks M1/M2 remain manual/reviewed evidence.
-- Correct fractional scalar and per-entry matrix forms earn ONLY B1's
-- provisional accuracy suggestion, not final score authority.
BEGIN;
DO $v2_matrix$
DECLARE
 v_old spark_grading_private.rubrics_v2%rowtype;
 v_part jsonb;
 v_rules jsonb;
 v_criteria jsonb;
BEGIN
 SELECT * INTO v_old FROM spark_grading_private.rubrics_v2
 WHERE subject_id='mathematics' AND paper_id='original-v1'
   AND rubric_version='source-scheme-draft-v2' FOR UPDATE;
 IF NOT FOUND OR v_old.active OR v_old.verification_status<>'draft'
  OR v_old.verified_at IS NOT NULL OR v_old.verified_by IS NOT NULL
  OR v_old.source_sha256 IS DISTINCT FROM
     encode(pg_catalog.sha256(convert_to(v_old.criteria::text,'UTF8')),'hex')
 THEN RAISE EXCEPTION 'Math original-v1 inverse source changed or approved'; END IF;
 SELECT c INTO v_part FROM jsonb_array_elements(v_old.criteria)c
 WHERE c->>'id'='p2-q10-v1::c';
 IF v_part IS NULL OR v_part->>'maxMarks'<>'3'
  OR v_part->'sourceMarking'->>'answer'<>'(1/7)[[5, -3], [-1, 2]]'
  OR jsonb_array_length(v_part->'sourceMarking'->'criteria')<>3
  OR (SELECT count(*) FROM jsonb_array_elements(v_part->'sourceMarking'->'criteria') x
       WHERE x->>'code'='B1' AND x->'check'->>'type'='manual-verification'
       AND x->>'marks'='1')<>1
 THEN RAISE EXCEPTION 'Math inverse source criteria are not the reviewed draft'; END IF;
 SELECT jsonb_agg(
  CASE WHEN x.value->>'code'='B1' THEN
   jsonb_set(
    jsonb_set(x.value,'{check}',jsonb_build_object(
      'type','matrix',
      'value',jsonb_build_array(jsonb_build_array(5.0/7.0,-3.0/7.0),
        jsonb_build_array(-1.0/7.0,2.0/7.0)),
      'tolerance',0.00000001
    )),
    '{field}','"answer"'::jsonb
   )
  ELSE x.value END ORDER BY x.ordinal
 ) INTO v_rules
 FROM jsonb_array_elements(v_part->'sourceMarking'->'criteria')
  WITH ORDINALITY x(value,ordinal);
 SELECT jsonb_agg(
  CASE WHEN c.value->>'id'='p2-q10-v1::c'
   THEN jsonb_set(c.value,'{sourceMarking,criteria}',v_rules)
   ELSE c.value END ORDER BY c.ordinal
 ) INTO v_criteria
 FROM jsonb_array_elements(v_old.criteria) WITH ORDINALITY c(value,ordinal);
 IF jsonb_array_length(v_criteria)<>45 THEN
  RAISE EXCEPTION 'Math paper source row count drifted'; END IF;
 UPDATE spark_grading_private.rubrics_v2 SET
   criteria=v_criteria,
   source_sha256=encode(pg_catalog.sha256(convert_to(v_criteria::text,'UTF8')),'hex')
 WHERE subject_id='mathematics' AND paper_id='original-v1'
   AND rubric_version='source-scheme-draft-v2'
   AND active=false AND verification_status='draft';
 IF NOT FOUND THEN RAISE EXCEPTION 'Cannot update inactive Maths original-v1 source'; END IF;
END $v2_matrix$;
COMMIT;