-- Mathematics source-specific marking draft batch 3 of 3.
-- All new allocations are manual verification: no unsupported trusted marks.
BEGIN;
DO $calibration$
DECLARE
  paper record;
  rubric spark_grading_private.rubrics_v2%rowtype;
  revised jsonb;
  actual_parts integer;
  missing_parts integer;
  final_details integer;
  source_part jsonb;
BEGIN
 FOR paper IN SELECT * FROM (VALUES ('original-v9',37,35),('original-v10',37,35)) v(paper_id,part_count,missing_count) LOOP
   SELECT * INTO rubric FROM spark_grading_private.rubrics_v2
    WHERE subject_id='mathematics' AND paper_id=paper.paper_id
      AND rubric_version='source-scheme-draft-v2' FOR UPDATE;
   IF NOT FOUND OR rubric.active OR rubric.verification_status <> 'draft'
      OR rubric.verified_by IS NOT NULL OR rubric.verified_at IS NOT NULL
      OR rubric.source_sha256 IS DISTINCT FROM encode(sha256(convert_to(rubric.criteria::text,'UTF8')),'hex')
   THEN RAISE EXCEPTION 'Math source/approval mismatch on %',paper.paper_id; END IF;
   SELECT count(*), count(*) FILTER (WHERE
       jsonb_typeof(c->'sourceMarking'->'criteria') IS DISTINCT FROM 'array'
       OR jsonb_array_length(c->'sourceMarking'->'criteria')=0)
    INTO actual_parts,missing_parts FROM jsonb_array_elements(rubric.criteria)c;
   IF actual_parts<>paper.part_count OR missing_parts<>paper.missing_count
     OR (SELECT sum((c->>'maxMarks')::integer) FROM jsonb_array_elements(rubric.criteria)c)<>100
   THEN RAISE EXCEPTION 'Source part count or mark ceiling drift for %',paper.paper_id; END IF;
   IF EXISTS(SELECT 1 FROM jsonb_array_elements(rubric.criteria)c WHERE
     c->>'id' IS DISTINCT FROM c->>'sourcePartId'
     OR NULLIF(c->'sourceMarking'->>'answer','') IS NULL
     OR NULLIF(c->'sourceMarking'->>'solution','') IS NULL
     OR (c->>'maxMarks')::int < 1)
   THEN RAISE EXCEPTION 'Unusable original source part for %',paper.paper_id; END IF;
   SELECT jsonb_agg(
    CASE WHEN jsonb_typeof(c.value->'sourceMarking'->'criteria') IS DISTINCT FROM 'array'
          OR jsonb_array_length(c.value->'sourceMarking'->'criteria')=0
     THEN jsonb_set(c.value,'{sourceMarking,criteria}',
       (SELECT jsonb_agg(jsonb_build_object(
        'kind', CASE WHEN seq.i=part.total THEN 'A' ELSE 'M' END,
        'code', CASE WHEN seq.i=part.total THEN 'A1' ELSE 'M'||seq.i::text END,
        'marks',1,'field','all','depends','[]'::jsonb,
        'profile','source-specific-manual',
        'description', CASE
          WHEN seq.i=part.total THEN 'Verify exact source-specific final answer and units'
          WHEN seq.i=1 THEN 'Verify source-specific setup and first valid mathematical step'
          ELSE 'Verify subsequent independent mathematical reasoning or computation' END,
        'check',jsonb_build_object('type','manual-verification',
          'evidence',concat('Paper ',paper.paper_id,'; part ',c.value->>'id',
            '; canonical answer: ',c.value->'sourceMarking'->>'answer',
            '; worked method: ',c.value->'sourceMarking'->>'solution',
            '. Confirm mathematical equivalence, correct working and allowed follow-through.',
            ' Do not infer method credit solely from a final answer.')))
         ORDER BY seq.i)
        FROM (SELECT (c.value->>'maxMarks')::int total) part
        CROSS JOIN LATERAL generate_series(1,part.total) seq(i)))
     ELSE c.value END ORDER BY c.ordinal)
    INTO revised FROM jsonb_array_elements(rubric.criteria) WITH ORDINALITY c(value,ordinal);
   SELECT count(*) INTO final_details FROM jsonb_array_elements(revised)c
    WHERE jsonb_typeof(c->'sourceMarking'->'criteria')='array'
      AND jsonb_array_length(c->'sourceMarking'->'criteria')>0;
   IF final_details<>paper.part_count
      OR EXISTS (SELECT 1 FROM jsonb_array_elements(revised)c WHERE
        (c->>'maxMarks')::int IS DISTINCT FROM
          (SELECT sum((entry->>'marks')::int) FROM jsonb_array_elements(c->'sourceMarking'->'criteria') entry))
      OR (SELECT sum((c->>'maxMarks')::int) FROM jsonb_array_elements(revised)c)<>100
   THEN RAISE EXCEPTION 'Draft allocation failed completeness check for %',paper.paper_id; END IF;
   UPDATE spark_grading_private.rubrics_v2 SET criteria=revised,
     source_sha256=encode(sha256(convert_to(revised::text,'UTF8')),'hex')
    WHERE subject_id='mathematics' AND paper_id=paper.paper_id
      AND rubric_version='source-scheme-draft-v2' AND active=false AND verification_status='draft';
 END LOOP;
END $calibration$;
COMMIT;