-- Seventh and final V2 calibration cohort: all 318 previously unselected parts,
-- spanning seven remaining subject domains. Cohort triage is NOT rubric approval.
BEGIN;
CREATE TABLE IF NOT EXISTS spark_grading_private.v2_calibration_batch_items (
 batch_id text NOT NULL,
 subject_id text NOT NULL,
 paper_id text NOT NULL,
 rubric_version text NOT NULL,
 criterion_id text NOT NULL,
 criterion_sha256 text NOT NULL CHECK (criterion_sha256 ~ '^[a-f0-9]{64}$'),
 source_sha256 text NOT NULL CHECK (source_sha256 ~ '^[a-f0-9]{64}$'),
 max_marks integer NOT NULL CHECK(max_marks>0),
 evidence_class text NOT NULL CHECK(evidence_class IN ('direct-check-candidate','source-specific-evidence-required')),
 review_focus text NOT NULL,
 triage_note text NOT NULL,
 triaged_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 PRIMARY KEY(batch_id,subject_id,paper_id,rubric_version,criterion_id)
);
ALTER TABLE spark_grading_private.v2_calibration_batch_items ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON spark_grading_private.v2_calibration_batch_items FROM PUBLIC,anon,authenticated;
GRANT SELECT ON spark_grading_private.v2_calibration_batch_items TO service_role;
DO $batch$
DECLARE n integer; subjects integer; eligible integer;
BEGIN
 IF (SELECT count(*) FROM spark_grading_private.v2_calibration_batch_items
     WHERE batch_id='v2-bulk-calibration-001')<>300 OR
    (SELECT count(*) FROM spark_grading_private.v2_calibration_batch_items
     WHERE batch_id='v2-bulk-calibration-002')<>300 OR
    (SELECT count(*) FROM spark_grading_private.v2_calibration_batch_items
     WHERE batch_id='v2-bulk-calibration-003')<>300 OR
    (SELECT count(*) FROM spark_grading_private.v2_calibration_batch_items
     WHERE batch_id='v2-bulk-calibration-004')<>300 OR
    (SELECT count(*) FROM spark_grading_private.v2_calibration_batch_items
     WHERE batch_id='v2-bulk-calibration-005')<>300 OR
    (SELECT count(*) FROM spark_grading_private.v2_calibration_batch_items
     WHERE batch_id='v2-bulk-calibration-006')<>300
 THEN RAISE EXCEPTION 'Prior six 300-part batches not registered'; END IF;
 IF EXISTS(SELECT 1 FROM spark_grading_private.v2_calibration_batch_items
    WHERE batch_id='v2-bulk-calibration-007') THEN
   RAISE EXCEPTION 'Batch 007 already exists'; END IF;
 IF (SELECT count(*) FROM spark_grading_private.rubrics_v2)<>67 OR
    (SELECT count(*) FROM spark_grading_private.rubric_criterion_reviews_v2)<>12 THEN
   RAISE EXCEPTION 'Unexpected source inventory / review baseline'; END IF;
 INSERT INTO spark_grading_private.v2_calibration_batch_items (
 batch_id,subject_id,paper_id,rubric_version,criterion_id,criterion_sha256,
 source_sha256,max_marks,evidence_class,review_focus,triage_note)
 WITH quotas(subject_id,quota) AS (VALUES
  ('chemistry',56),('english-a',3),
  ('information-technology',42),('integrated-science',160),
  ('mathematics',45),('physics',10),('social-studies',2)
 ),
 source AS (
  SELECT q.*, r.criteria, part.value AS source_part,
     jsonb_typeof(part.value->'sourceMarking'->'criteria')='array'
      AND jsonb_array_length(CASE WHEN jsonb_typeof(part.value->'sourceMarking'->'criteria')='array'
       THEN part.value->'sourceMarking'->'criteria' ELSE '[]'::jsonb END)>0
      AND NOT EXISTS (
       SELECT 1 FROM jsonb_array_elements(CASE
        WHEN jsonb_typeof(part.value->'sourceMarking'->'criteria')='array'
         THEN part.value->'sourceMarking'->'criteria' ELSE '[]'::jsonb END) rule
       WHERE rule->'check'->>'type' NOT IN
        ('numeric','equation','inequality','expression','fraction','coordinate',
         'set','ordered','matrix','value')
       OR rule->'check' IS NULL
       OR coalesce(rule->>'manual','false')='true'
       OR coalesce(rule->>'reviewRequired','false')='true'
       OR coalesce(jsonb_array_length(CASE WHEN jsonb_typeof(rule->'depends')='array'
        THEN rule->'depends' ELSE '[]'::jsonb END),0)>0
       OR rule->'ecf' IS NOT NULL
      ) as direct_candidate
  FROM spark_grading_private.v2_calibration_queue q
  JOIN spark_grading_private.rubrics_v2 r
    ON r.subject_id=q.subject_id AND r.paper_id=q.paper_id
   AND r.rubric_version=q.rubric_version
  JOIN LATERAL jsonb_array_elements(r.criteria) part(value)
    ON part.value->>'id'=q.criterion_id
  WHERE q.verification_status='draft'
    AND NOT q.active AND r.expected_total_marks IS NOT NULL
    AND NOT EXISTS(SELECT 1 FROM spark_grading_private.v2_calibration_batch_items previous
     WHERE previous.subject_id=q.subject_id AND previous.paper_id=q.paper_id
      AND previous.rubric_version=q.rubric_version AND previous.criterion_id=q.criterion_id)
    AND r.source_sha256=encode(pg_catalog.sha256(convert_to(r.criteria::text,'UTF8')),'hex')
 ), ranked AS (
  SELECT source.*,
   ROW_NUMBER() OVER(PARTITION BY subject_id
     ORDER BY CASE WHEN direct_candidate THEN 0 ELSE 1 END,
     paper_id,criterion_id) seq
  FROM source
 )
 SELECT 'v2-bulk-calibration-007', ranked.subject_id,paper_id,rubric_version,
  criterion_id,criterion_sha256,paper_source_sha256,max_marks,
  CASE WHEN direct_candidate THEN 'direct-check-candidate'
   ELSE 'source-specific-evidence-required' END,review_focus,
  CASE WHEN source_matched_review THEN
    'Already has a previously recorded, source-hash-matched AI criterion review. Included to complete calibration inventory; this is not a new approval or paper attestation.'
   WHEN direct_candidate THEN
    'Direct-evidence check candidate only, not yet approved; validate source, alternative answers and adversarial scripts.'
   ELSE 'Method, graph, construction, alternative or written evidence remains unresolved; no approval.'
  END
 FROM ranked JOIN quotas USING(subject_id) WHERE seq<=quota;
 GET DIAGNOSTICS n=ROW_COUNT;
 SELECT count(distinct subject_id),
  count(*) FILTER(WHERE evidence_class='direct-check-candidate')
 INTO subjects,eligible FROM spark_grading_private.v2_calibration_batch_items
 WHERE batch_id='v2-bulk-calibration-007';
 IF n<>318 OR subjects<>7 THEN
  RAISE EXCEPTION 'Incomplete 318-item seven-subject batch: % items, % subjects',n,subjects; END IF;
 IF (SELECT count(*) FROM spark_grading_private.v2_calibration_batch_items a
      JOIN spark_grading_private.v2_calibration_queue q
       ON a.subject_id=q.subject_id AND a.paper_id=q.paper_id AND
        a.rubric_version=q.rubric_version AND a.criterion_id=q.criterion_id
      WHERE a.batch_id='v2-bulk-calibration-007' AND
       (q.criterion_sha256<>a.criterion_sha256 OR
        q.paper_source_sha256<>a.source_sha256))>0 THEN
  RAISE EXCEPTION 'Selected batch source drift'; END IF;
 IF (SELECT count(*) FROM spark_grading_private.v2_calibration_batch_items b
       JOIN spark_grading_private.v2_calibration_queue q
       ON b.subject_id=q.subject_id AND b.paper_id=q.paper_id
       AND b.rubric_version=q.rubric_version AND b.criterion_id=q.criterion_id
       WHERE b.batch_id='v2-bulk-calibration-007' AND q.source_matched_review)<>4
 THEN RAISE EXCEPTION 'Four prior source-matched reviews must be retained without creating new approvals'; END IF;
 IF (SELECT count(*) FROM spark_grading_private.v2_calibration_batch_items)<>2118
 OR (SELECT count(*) FROM spark_grading_private.v2_calibration_queue)<>2118
 OR EXISTS (
   SELECT 1 FROM spark_grading_private.v2_calibration_queue q
   WHERE NOT EXISTS (
    SELECT 1 FROM spark_grading_private.v2_calibration_batch_items b
    WHERE b.subject_id=q.subject_id AND b.paper_id=q.paper_id
      AND b.rubric_version=q.rubric_version AND b.criterion_id=q.criterion_id))
 OR EXISTS (
   SELECT 1 FROM spark_grading_private.v2_calibration_batch_items b
   GROUP BY b.subject_id,b.paper_id,b.rubric_version,b.criterion_id HAVING count(*)>1)
 THEN RAISE EXCEPTION 'Calibration inventory does not cover all 2118 unique source parts'; END IF;
 RAISE NOTICE 'Cohort 007: % parts, % subjects; % deterministic candidates',n,subjects,eligible;
END $batch$;
COMMIT;
