-- Source-specific, nonhuman AI criterion QA for exact IT spreadsheet formula parts.
-- This is NOT independent human signoff and MUST NOT activate a paper rubric.
BEGIN;
DO $review$
DECLARE n integer;
BEGIN
 IF (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>12
 THEN RAISE EXCEPTION 'Review baseline changed'; END IF;
 CREATE TEMP TABLE _it_source_formulas ON COMMIT DROP AS
 SELECT r.subject_id,r.paper_id,r.rubric_version,
   c->>'id' AS criterion_id,c AS criterion_source,
   encode(sha256(convert_to(c::text,'UTF8')),'hex') criterion_digest,
   CASE
    WHEN c->>'id'='2-f' AND c->'sourceMarking'->>'prompt'='Write the spreadsheet formula that should be entered in D2 to calculate Total Cost.'
     AND c->'sourceMarking'->'markScheme'->>0='=B2*C2 or equivalent. 2 marks.' AND c->>'maxMarks'='2' THEN 'formula-d2-total'
    WHEN c->>'id'='2-g' AND c->'sourceMarking'->>'prompt'='Write the function that should be entered in D4 to calculate the total of D2:D3.'
     AND c->'sourceMarking'->'markScheme'->>0='=SUM(D2:D3). 3 marks.' AND c->>'maxMarks'='3' THEN 'sum-d4'
    WHEN c->>'id'='3-a' AND c->'sourceMarking'->>'prompt'='Write the formula in D2 to calculate Revenue.'
     AND c->'sourceMarking'->'markScheme'->>0='=B2*C2 or equivalent.' AND c->>'maxMarks'='2' THEN 'formula-revenue'
    WHEN c->>'id'='3-b' AND c->'sourceMarking'->>'prompt'='Write the formula in E2 to calculate Tax using the rate in F2. The formula will be copied down and the reference to F2 must remain fixed.'
     AND c->'sourceMarking'->'markScheme'->>0='=D2*$F$2 or equivalent.' AND c->>'maxMarks'='3' THEN 'formula-tax'
    WHEN c->>'id'='3-c' AND c->'sourceMarking'->>'prompt'='Write the function in D4 to calculate total Revenue.'
     AND c->'sourceMarking'->'markScheme'->>0='=SUM(D2:D3).' AND c->>'maxMarks'='2' THEN 'sum-revenue'
   END rule
 FROM spark_grading_private.rubrics_v2 r
 CROSS JOIN LATERAL jsonb_array_elements(r.criteria)c
 WHERE r.subject_id='information-technology'
  AND r.rubric_version='source-shape-draft-v2'
  AND r.verification_status='draft' AND NOT r.active
  AND r.source_sha256=encode(sha256(convert_to(r.criteria::text,'UTF8')),'hex')
  AND c->>'id' IN('2-f','2-g','3-a','3-b','3-c')
  AND c->>'id'=c->>'sourcePartId';
 IF (SELECT count(*) FROM _it_source_formulas WHERE rule IS NOT NULL)<>27
 OR (SELECT count(*) FROM _it_source_formulas WHERE rule IS NULL)<>18
 THEN RAISE EXCEPTION 'Source formula identities or approved scope changed'; END IF;
 IF EXISTS(SELECT 1 FROM _it_source_formulas x
  JOIN spark_grading_private.rubric_criterion_reviews_v2 v
   ON v.subject_id=x.subject_id AND v.paper_id=x.paper_id
    AND v.rubric_version=x.rubric_version AND v.criterion_id=x.criterion_id
  WHERE x.rule IS NOT NULL) THEN
  RAISE EXCEPTION 'Candidate IT formula already has a review'; END IF;
 INSERT INTO spark_grading_private.rubric_criterion_reviews_v2
 (subject_id,paper_id,rubric_version,criterion_id,criterion_sha256,
  verified_by,verified_at,review_note)
 SELECT subject_id,paper_id,rubric_version,criterion_id,criterion_digest,
  'OpenAI GPT-6 (AI criterion QA, nonhuman)',clock_timestamp(),
  format('AI-only source-specific evidence review for IT %s, part %s, rule %s. '
   || 'Exact source prompt, marks and answer scheme match the original registered paper. '
   || 'Authoritative evaluator uses strict formula/cell equality, accepts documented commutative '
   || 'operands and equivalent D2+D3 sum, and rejects wrong references, blank, off-topic and '
   || 'narrated answers. Adversarial source-specific matrix: '
   || 'src/informationTechnology/practice/itV2ArchiveEvidence.test.js (run in the verified V2 CI workflow). '
   || 'Nonhuman evidence QA only. Not independent human attestation; not paper approval.',
   paper_id,criterion_id,rule)
 FROM _it_source_formulas WHERE rule IS NOT NULL;
 GET DIAGNOSTICS n=ROW_COUNT;
 IF n<>27 THEN RAISE EXCEPTION 'Incomplete IT criterion review insert: %',n; END IF;
 IF (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>39
 THEN RAISE EXCEPTION 'Incorrect final QA reviewer count'; END IF;
 IF EXISTS(SELECT 1 FROM spark_grading_private.rubrics_v2 WHERE active OR verification_status='verified')
 THEN RAISE EXCEPTION 'Unexpected production rubric activation'; END IF;
END $review$;
COMMIT;