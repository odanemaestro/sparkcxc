-- First larger calibration cohort, separate source-bound 6-item AI review.
-- These six reviews are machine-checkable answer/accuracy evidence only.
-- AI reviewer identity is disclosed; full paper activation remains prohibited.
BEGIN;
DO $pilot$
DECLARE
 candidate jsonb;
 rubric spark_grading_private.rubrics_v2%rowtype;
 part jsonb; item jsonb; n integer:=0;
BEGIN
 IF (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>4
 THEN RAISE EXCEPTION 'Unexpected 4-review baseline'; END IF;
 FOR candidate IN SELECT value FROM jsonb_array_elements('[{"subject":"mathematics","paper":"original-v1","part":"p2-q10-v1::b","answer":"7","type":"numeric","value":7,"note":"Matrix determinant of [[2,3],[1,5]] is 2×5−3×1=7. Correct equivalents, wrong values and competing guesses tested."},{"subject":"mathematics","paper":"original-v3","part":"p2-q1-v3::b3","answer":"16.67","type":"numeric","value":16.67,"note":"Extra hire-purchase cost $600 divided by $3600 =16.666...%; source scheme permits 16.67%. Incorrect rounding and conflicting alternatives tested."},{"subject":"mathematics","paper":"p2e","part":"p2e-q4::a2","answer":"22","type":"numeric","value":22,"note":"Triangle AB=9, BC=6, AC=7 has perimeter 22 cm. Tested numeric equivalence and competing guesses. Independent mark, separate from construction marks."},{"subject":"mathematics","paper":"p2g","part":"p2g-q4::a2","answer":"4","type":"numeric","value":4,"note":"AB=8 cm, its perpendicular bisector meets AB at midpoint M so AM=4 cm. Tested wrong lengths and alternatives."},{"subject":"mathematics","paper":"p2i","part":"p2i-q4::a2","answer":"120","type":"numeric","value":120,"note":"Equilateral CAB has 60° at A; CAL is supplementary 120° on line LAB. Incorrect angle values and competing guesses tested."},{"subject":"physics","paper":"spark-phy-p02-practice-2","part":"phy-p2-2-q3::biii","answer":"2.54 × 10⁵ J","type":"value","value":254000,"unit":"J","note":"Source sums prior energy values to 254000 J. Unit-aware acceptance of 254000 J and 2.54×10^5 J; wrong units and numbers rejected."}]'::jsonb) LOOP
  SELECT * INTO rubric FROM spark_grading_private.rubrics_v2
   WHERE subject_id=candidate->>'subject' AND paper_id=candidate->>'paper'
    AND rubric_version=CASE WHEN candidate->>'subject'='physics'
      THEN 'source-shape-draft-v2' ELSE 'source-scheme-draft-v2' END FOR SHARE;
  IF NOT FOUND OR rubric.active OR rubric.verification_status<>'draft'
     OR rubric.expected_total_marks<>100 OR rubric.verified_by IS NOT NULL
     OR rubric.verified_at IS NOT NULL OR
     rubric.source_sha256 IS DISTINCT FROM
      encode(pg_catalog.sha256(convert_to(rubric.criteria::text,'UTF8')),'hex')
  THEN RAISE EXCEPTION 'Unverified source-version drift: %',candidate->>'paper'; END IF;
  SELECT value INTO part FROM jsonb_array_elements(rubric.criteria)value
   WHERE value->>'id'=candidate->>'part';
  IF NOT FOUND OR part->>'sourcePartId' IS DISTINCT FROM candidate->>'part'
     OR (part->>'maxMarks')::integer<>1
     OR part->'sourceMarking'->>'answer' IS DISTINCT FROM candidate->>'answer'
     OR jsonb_array_length(CASE WHEN jsonb_typeof(part->'sourceMarking'->'criteria')='array'
      THEN part->'sourceMarking'->'criteria' ELSE '[]'::jsonb END)<>1
  THEN RAISE EXCEPTION 'Unverified part identity, answer or allocation: %',candidate->>'part'; END IF;
  item:=part->'sourceMarking'->'criteria'->0;
  IF (item->>'marks')::int<>1 OR
     item->>'code' NOT IN ('B1','A1') OR
     item->'check'->>'type' IS DISTINCT FROM candidate->>'type'
     OR (item->'check'->>'value')::numeric IS DISTINCT FROM (candidate->>'value')::numeric
     OR coalesce(item->>'manual','false')='true' OR
     coalesce(item->>'reviewRequired','false')='true'
  THEN RAISE EXCEPTION 'Unsafe source-specific subcriterion: %',candidate->>'part'; END IF;
  IF candidate->>'subject'='mathematics' AND (
      item->>'code'<>'B1' OR item->'depends' IS DISTINCT FROM '[]'::jsonb
      OR item->'ecf' IS NOT NULL)
  THEN RAISE EXCEPTION 'Dependent or implicit method mark cannot be approved: %',candidate->>'part'; END IF;
  IF candidate->>'subject'='physics' AND (
      item->>'code'<>'A1' OR item->'check'->>'unit' IS DISTINCT FROM candidate->>'unit')
  THEN RAISE EXCEPTION 'Wrong source unit on Physics: %',candidate->>'part'; END IF;
  INSERT INTO spark_grading_private.rubric_criterion_reviews_v2(
    subject_id,paper_id,rubric_version,criterion_id,criterion_sha256,
    verified_by,verified_at,review_note)
   VALUES(candidate->>'subject',candidate->>'paper',rubric.rubric_version,
     candidate->>'part',
     encode(pg_catalog.sha256(convert_to(part::text,'UTF8')),'hex'),
     'OpenAI GPT-6 (AI criterion QA, nonhuman)',clock_timestamp(),
     'AI-assisted source criterion evidence; NOT a human attestation, paper approval or grading rollout. '
     || (candidate->>'note')
     || ' Reproducible positive/negative fixtures: src/grading/v2BulkSourceBoundCriterion.test.js. '
     || 'Source SHA-256 rechecked. Remaining paper criteria must receive independent review.'
   );
   n:=n+1;
 END LOOP;
 IF n<>6 OR (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>10
 THEN RAISE EXCEPTION 'Incomplete six-criterion source-bound reviews: %',n; END IF;
END $pilot$;
COMMIT;