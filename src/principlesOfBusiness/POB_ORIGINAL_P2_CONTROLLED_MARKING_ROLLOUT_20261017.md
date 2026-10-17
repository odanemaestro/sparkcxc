# Controlled SPARK-original POB Paper 2 marker rollout

**Scope:** Prepare the trusted automatic marker for the single SPARK-authored `pob-original-paper2-01` bank with strict internal-test authorization. Do **not** clear any of the 46 historical CXC papers.

## Why this migration is different

Production `spark_enqueue_marking(uuid)` currently serves English A and Integrated Science. It includes important shared controls absent from the older POB prototype migration `20261016072000_pob_paper2_semantic_queue.sql`: whole-platform daily job caps, token reservation budgets, and concurrency-safe advisory locks.

The forward migration `20261017190000_pob_original_p2_controlled_queue.sql` replicates and retains those protections while adding:
- `spark_marking_config.pob_original_enabled BOOLEAN NOT NULL DEFAULT FALSE`
- `spark_marking_config.pob_internal_tester_user_id UUID DEFAULT NULL`
- POB eligibility restricted to authenticated **single internal tester**, `paper='02'`, `status='submitted'`, exact server-side `bank_version` and `metadata.paper_id` of `pob-original-paper2-01`, `score IS NULL`, `max_score=100`.
- Historic `POB-P2-...` bank versions rejected. The global queue setting `enabled=true` does **not** override the independent POB canary setting.
- No new anon grants. Student-supplied rubrics still cannot be used by `src/grading/serverAssessment.js`.

## Checks required

1. Verify the source-controlled migration using `pobControlledQueueRollout.test.js` and complete CI. Review changes against the actual deployed function, not against the legacy migration alone.
2. Apply migration through the authorized database migration workflow. It installs both new flags **off by default**. Do not set either flag as part of migration.
3. Run `supabase/ops/pob_guarded_queue_postdeploy_check.sql`; assert hidden draft, POB canary off, historic attempt count zero, original bank pinned, budget guards present, and unauthenticated access denied.
4. Verify the deployed `mark-paper2` Edge Function and immutable, server-only `_shared/server-marker.mjs` bundle against the source revision. Supabase's `get_edge_function` endpoint returned an internal error during the initial audit; deployed bundle identity is unverified.
5. Execute an internally adjudicated calibration suite (synonyms, blank answers, mixed true/false, contradicted claims, partial answers, correct numerical results, candidate-injected instructions) and capture error rates and uncertainty results. GitHub unit tests alone are not a real scorer benchmark.
6. **Only after actual worker and calibration verification**, designate a known authenticated internal tester in `pob_internal_tester_user_id` and explicitly set `pob_original_enabled=true`, run one authenticated end-to-end attempt, and inspect the job and grade without exposing any candidate answers publicly. Restore both canary settings to their safe defaults if tests fail.
7. Historical POB remains separately blocked by canonical source and academic gates; a successful SPARK-original canary would **not** release past-paper scoring.

**Do not** deploy `20261016072000_pob_paper2_semantic_queue.sql` as a replacement in production after this guard is installed: it would remove shared daily budget controls and this new canary gate.
