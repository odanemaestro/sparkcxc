-- Two-batch source-anchored evidence gap register. This is NOT criterion approval.
-- Existing 39 reviews, source digests, grading jobs, active flags and scores are untouched.
BEGIN;
CREATE SCHEMA IF NOT EXISTS spark_grading_private;
CREATE TABLE IF NOT EXISTS spark_grading_private.v2_criterion_evidence_gaps (
 run_id text NOT NULL,
 batch_id text NOT NULL,
 subject_id text NOT NULL,
 paper_id text NOT NULL,
 rubric_version text NOT NULL,
 criterion_id text NOT NULL,
 criterion_sha256 text NOT NULL CHECK (criterion_sha256 ~ '^[0-9a-f]{64}$'),
 paper_source_sha256 text NOT NULL CHECK (paper_source_sha256 ~ '^[0-9a-f]{64}$'),
 max_marks integer NOT NULL CHECK (max_marks > 0),
 blocker_class text NOT NULL,
 required_evidence text[] NOT NULL CHECK (cardinality(required_evidence) > 0),
 source_excerpt text NOT NULL,
 assessment_status text NOT NULL DEFAULT 'unverified' CHECK (assessment_status='unverified'),
 recorded_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (run_id,subject_id,paper_id,rubric_version,criterion_id),
 FOREIGN KEY (subject_id,rubric_version,paper_id) REFERENCES spark_grading_private.rubrics_v2(subject_id,rubric_version,paper_id)
);
ALTER TABLE spark_grading_private.v2_criterion_evidence_gaps ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON spark_grading_private.v2_criterion_evidence_gaps FROM PUBLIC,anon,authenticated,service_role;
GRANT SELECT ON spark_grading_private.v2_criterion_evidence_gaps TO service_role;
DO $source_audit$
DECLARE n integer; v_count integer; v_review integer; v_matched integer;
BEGIN
 SELECT count(*) INTO v_review FROM spark_grading_private.rubric_criterion_reviews_v2;
 IF v_review<>39 THEN RAISE EXCEPTION 'Review baseline drifted: %',v_review; END IF;
 SELECT COUNT(*) INTO v_count FROM spark_grading_private.v2_calibration_queue
 WHERE NOT source_matched_review;
 IF v_count<>2079 THEN RAISE EXCEPTION 'Pending source baseline drifted: %',v_count; END IF;
 IF EXISTS(
 SELECT 1 FROM spark_grading_private.v2_calibration_queue q
 JOIN spark_grading_private.rubrics_v2 r USING(subject_id,paper_id,rubric_version)
 CROSS JOIN LATERAL jsonb_array_elements(r.criteria) c
 WHERE c->>'id'=q.criterion_id AND NOT q.source_matched_review AND
  (q.criterion_sha256<>encode(sha256(convert_to(c::text,'UTF8')),'hex')
   OR q.paper_source_sha256<>r.source_sha256
   OR q.max_marks<>(c->>'maxMarks')::integer OR r.active OR r.verification_status<>'draft')
 ) THEN RAISE EXCEPTION 'Source mismatch / live rubric detected'; END IF;
 WITH pending AS (
 SELECT q.*,c AS item,
 ROW_NUMBER() OVER(ORDER BY q.subject_id,q.paper_id,q.criterion_id) AS rank
 FROM spark_grading_private.v2_calibration_queue q
 JOIN spark_grading_private.rubrics_v2 r USING(subject_id,paper_id,rubric_version)
 CROSS JOIN LATERAL jsonb_array_elements(r.criteria) c
 WHERE c->>'id'=q.criterion_id AND NOT q.source_matched_review
 ), classified AS (
 SELECT *,
 CASE 
 WHEN subject_id='mathematics' AND item::text ILIKE '%manual-verification%' THEN 'mathematics-manual-working-or-artifact'
 WHEN subject_id='mathematics' AND item::text ILIKE '%"type": "set"%' THEN 'mathematics-set-vs-ordered-answer'
 WHEN subject_id='mathematics' THEN 'mathematics-alternative-and-partial-credit'
 WHEN subject_id='physics' AND item->'sourceMarking'->>'responseType'='graph' THEN 'physics-graph-artifact'
 WHEN subject_id='physics' THEN 'physics-calculation-units-and-working'
 WHEN subject_id='information-technology' AND item->'sourceMarking'->>'responseType'='formula' THEN 'IT-formula-rule-or-equivalence'
 WHEN subject_id='information-technology' THEN 'IT-code-database-or-explanation'
 WHEN subject_id='english-a' THEN 'English-A-open-writing'
 WHEN subject_id='social-studies' THEN 'Social-Studies-essay-or-concepts'
 WHEN subject_id='food-nutrition-and-health' THEN 'FNH-written-alternatives'
 WHEN subject_id='principles-of-business' THEN 'POB-written-alternatives'
 WHEN subject_id IN ('chemistry','integrated-science') THEN 'science-reasoning-graph-or-calculation'
 ELSE 'unmapped-requires-inspection' END AS blocker
 FROM pending
 )
 INSERT INTO spark_grading_private.v2_criterion_evidence_gaps
 (run_id,batch_id,subject_id,paper_id,rubric_version,criterion_id,
  criterion_sha256,paper_source_sha256,max_marks,blocker_class,
  required_evidence,source_excerpt,assessment_status)
 SELECT 'v2-pending-source-review-20261020','001',
 subject_id,paper_id,rubric_version,criterion_id,criterion_sha256,
 paper_source_sha256,max_marks,blocker,
 CASE
 WHEN blocker='mathematics-manual-working-or-artifact' THEN ARRAY['verify original working or drawing','correct, partial, equivalent and wrong method fixtures','test error carried forward and mark dependencies']
 WHEN blocker='physics-graph-artifact' THEN ARRAY['authenticated point/axis/scale and best-fit artifact evidence','valid and deliberately incorrect graph fixtures','check mark allocation and graph interpolation']
 WHEN blocker='IT-code-database-or-explanation' THEN ARRAY['test executable code or validated output against original prompt','incorrect, equivalent, partial and contradictory cases','source-specific mark split and dependencies']
 WHEN blocker='English-A-open-writing' THEN ARRAY['source task criteria and quality-level anchor responses','off-topic, plagiarized, conflicting and partial scripts','calibrated content, organisation and language thresholds']
 WHEN blocker='mathematics-set-vs-ordered-answer' THEN ARRAY['check exact source answer form','test interval order, competing alternatives and extra values','test source-level full/partial mark boundaries']
 ELSE ARRAY['independently validate original source question and full mark scheme','test correct, equivalent, partial, incorrect and contradictory responses','check unresolved manual, graph, unit and follow-through allocations']
 END,
 LEFT(COALESCE(NULLIF(item->'sourceMarking'->>'answer',''),
 NULLIF(item->'sourceMarking'->>'modelAnswer',''),
 NULLIF(item->'sourceMarking'->'points'->>0,''),
 NULLIF(item->'sourceMarking'->'markScheme'->'points'->>0,''),
 NULLIF(item->'sourceMarking'->'modelPoints'->>0,''),
 NULLIF(item->'sourceMarking'->'markScheme'->>0,''),
 NULLIF(item->'sourceMarking'->>'prompt',''),
 '(no single authored text exemplar)'),240),
 'unverified'
 FROM classified WHERE rank BETWEEN 1 AND 1040;
 GET DIAGNOSTICS n=ROW_COUNT;
 IF n<>1040 THEN RAISE EXCEPTION 'Expected 1040 source records, wrote %',n; END IF;
 SELECT count(*) INTO v_matched
 FROM spark_grading_private.v2_criterion_evidence_gaps g
 JOIN spark_grading_private.v2_calibration_queue q
   ON g.subject_id=q.subject_id AND g.paper_id=q.paper_id
  AND g.rubric_version=q.rubric_version AND g.criterion_id=q.criterion_id
 WHERE g.run_id='v2-pending-source-review-20261020' AND g.batch_id='001'
  AND g.criterion_sha256=q.criterion_sha256
  AND g.paper_source_sha256=q.paper_source_sha256
  AND g.max_marks=q.max_marks AND NOT q.source_matched_review;
 IF v_matched<>1040 THEN RAISE EXCEPTION 'Source fingerprint mismatch in batch 001'; END IF;
 IF EXISTS(SELECT 1 FROM spark_grading_private.rubrics_v2 WHERE active OR verification_status='verified')
 THEN RAISE EXCEPTION 'Unexpected active source rubric'; END IF;
END $source_audit$;
COMMIT;
