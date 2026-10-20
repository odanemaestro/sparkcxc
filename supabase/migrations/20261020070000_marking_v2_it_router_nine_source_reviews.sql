-- Actual source-hash-bound nonhuman examiner QA for nine exact IT router marks.
-- Single approved rule family across nine papers. No unverified rule is claimed approved.
BEGIN;
DO $approve_router$
DECLARE n integer; w integer;
BEGIN
 IF (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>46 THEN
  RAISE EXCEPTION 'Expected 46 pre-existing source QA records';
 END IF;
 CREATE TEMP TABLE _router_source ON COMMIT DROP AS
 SELECT r.subject_id,r.paper_id,r.rubric_version,
   c->>'id' criterion_id,
   encode(sha256(convert_to(c::text,'UTF8')),'hex') criterion_digest
 FROM spark_grading_private.rubrics_v2 r
 CROSS JOIN LATERAL jsonb_array_elements(r.criteria)c
 WHERE r.subject_id='information-technology'
   AND r.rubric_version='source-shape-draft-v2'
   AND r.verification_status='draft' AND NOT r.active
   AND r.source_sha256=encode(sha256(convert_to(r.criteria::text,'UTF8')),'hex')
   AND c->>'id'='1-b' AND c->>'sourcePartId'='1-b' AND c->>'maxMarks'='2'
   AND c->'sourceMarking'->>'prompt'='Identify the MOST important hardware device used to connect the local networks to other networks.'
   AND c->'sourceMarking'->'markScheme'=jsonb_build_array(
    'Router. 1 mark.',
    'Role/function correctly stated as connecting or forwarding data between networks. 1 mark.');
 IF (SELECT count(*) FROM _router_source)<>9 OR
    (SELECT count(DISTINCT paper_id) FROM _router_source)<>9 OR
    EXISTS(SELECT 1 FROM _router_source WHERE paper_id NOT IN
    ('P2-A','P2-B','P2-C','P2-D','P2-E','P2-F','P2-G','P2-H','P2-I')) THEN
  RAISE EXCEPTION 'IT router source completeness failure';
 END IF;
 IF EXISTS(SELECT 1 FROM _router_source r
   JOIN spark_grading_private.rubric_criterion_reviews_v2 v
     USING(subject_id,paper_id,rubric_version,criterion_id)) THEN
  RAISE EXCEPTION 'Duplicate source criterion QA';
 END IF;
 INSERT INTO spark_grading_private.rubric_criterion_reviews_v2
  (subject_id,paper_id,rubric_version,criterion_id,criterion_sha256,
   verified_by,verified_at,review_note)
 SELECT subject_id,paper_id,rubric_version,criterion_id,criterion_digest,
  'OpenAI GPT-6 (AI criterion QA, nonhuman)',clock_timestamp(),
  format('Per-criterion nonhuman source QA for %s 1(b): 2 marks split router identity (A1) and correct inter-network routing function (A2). Exact question text, scheme and source hash verified. CI #2624 exercised thirteen positive/negative/partial/contradictory answers against each of nine registered paper-specific server V2 rules (117 checks). Source identity changes are rejected. This review does not certify the other paper parts, independent human attestation, or live grade authority.',paper_id)
 FROM _router_source;
 GET DIAGNOSTICS n=ROW_COUNT;
 IF n<>9 THEN RAISE EXCEPTION 'Missing IT router approval records %',n; END IF;
 UPDATE spark_grading_private.v2_criterion_evidence_gaps g
 SET assessment_status='source-ai-qa',
  required_evidence=ARRAY[
   'Original two-mark IT source prompt and rubric match and SHA256 current',
   'Full two-mark, one-mark partial, zero-mark wrong and competing device regressions pass',
   'Negated router identity and function are rejected by hardened examiner',
   'Whole-paper score authority remains disabled until every part verified'
  ]
 FROM _router_source r
 WHERE g.run_id='v2-pending-source-review-20261020'
 AND g.subject_id=r.subject_id AND g.paper_id=r.paper_id
 AND g.rubric_version=r.rubric_version AND g.criterion_id=r.criterion_id
 AND g.criterion_sha256=r.criterion_digest AND g.assessment_status='unverified';
 GET DIAGNOSTICS w=ROW_COUNT;
 IF w<>9 THEN RAISE EXCEPTION 'Failed to reconcile source-bound gap tracking: %',w; END IF;
 IF (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>55
   OR (SELECT count(*) FROM spark_grading_private.v2_criterion_evidence_gaps
       WHERE run_id='v2-pending-source-review-20261020' AND assessment_status='unverified')<>2063
   OR EXISTS(SELECT 1 FROM spark_grading_private.rubrics_v2
        WHERE active OR verification_status='verified') THEN
  RAISE EXCEPTION 'Unverified score-publication gate or review count diverged';
 END IF;
END $approve_router$;
COMMIT;
