# POB production staging audit: 17 October 2026

Project: SPARK Supabase, project reference `ymnfexzyjtvjkufcefmf`.

## Production facts verified using read-only SQL

- `public.spark_subjects` originally contained **8** rows and no `principles-of-business` entry despite the React registry declaring this subject as `enabled:false,status:'draft'`. `public.subjects` also contained no POB entry.
- `public.spark_marking_config` has `enabled=true`, `revision='online-v1'`, `max_concurrency=4` and `daily_user_limit=3`. This is the **existing platform-wide** automatic grading queue, not permission to score unverified POB historical sources.
- The `mark-paper2` Edge Function appears in the Supabase list as active, version 2, `verify_jwt=false`; its repository implementation uses a secret header. The Supabase function source-reading endpoint returned an internal error, so we did **not** establish that the deployed bytes match GitHub, nor attempt a worker redeploy.
- The deployed `spark_enqueue_marking(uuid)` Postgres function explicitly lists ONLY `english-a` and `integrated-science`; its live text includes `daily_global_limit` and `daily_token_budget` checks. The repository's older `20261016072000_pob_paper2_semantic_queue.sql` would overwrite that function **without** preserving those production controls. **Never deploy that migration unchanged.**
- The deployed `spark_submit_exam_attempt(...)` rejects ALL NULL scores, including POB Paper 2. The repository already contains `20261016072500_pob_unscored_paper2_submission.sql`, which safely reserves NULL unscored submissions for the exact `pob-original-paper2-01` bank version and keeps historical candidates blocked. The server-side release still requires an authenticated test account and end-to-end verification before it can be advertised ready.
- At audit time there were **zero** POB exam attempts; three completed/submitted English A attempts were present. Two marking jobs were already marked completed in the live queue. Do not interpret these records as POB grading calibration.
- The repository's historical release audit found **0/46** eligible, due to incomplete question transcriptions, unresolved keys, absent CXC marking schemes and missing historical secure-bank calibration. This remains unchanged.

## Safe production modification completed

Using `supabase/ops/pob_draft_catalog_registration.sql`, inserted the exact POB catalog metadata with `enabled=false`, `status='draft'`, `sort_order=48` and 10 sections/42 topics/119 objectives/119 flashcards in `stats`. The script is idempotent, does not overwrite pre-existing subject data, and rolls back if the record is not a disabled draft. A fresh database SELECT confirmed the expected record. No students can discover it via the public live-catalogue policy based on this row.

## Remaining verified migration and release work

1. Compare the live `spark_submit_exam_attempt` function against the existing 2026-10-16 POB NULL-score migration line by line, preserve all existing score/auth/size guards, then deploy and verify the exact minimal change if safe. This is only for unscored **SPARK-original** POB Paper 2.
2. Before altering `spark_enqueue_marking`, write a new forward-only, budget-preserving patch: keep the live daily global count, token reservation, per-user limit, claim locks and idempotency; accept no historical ID. Use a documented authenticated staging test. Do **not** replay the existing POB queue migration verbatim.
3. Rebuild and deploy `_shared/server-marker.mjs` only after verifying source versions, Edge Function code, secrets and real dual-pass calibration in a non-public environment.
4. Reconcile 46 historic original question simulations, source provenance and answers; complete calibration and resolve defective original source questions before publishing any graded historic exam.
5. Keep all 46 historical papers out of live scoring. POB catalog registration is infrastructure preparation, **not a course publication or a grade approval**.

## Repeatable, non-invasive verification

Run `supabase/ops/pob_live_marking_readiness_check.sql`. It reports only course draft state, queue status/version, whether deployed functions mention POB and preserve token limits, and aggregate POB attempt counts. It returns no student answers or credentials.

**Security note:** Supabase security advisors independently reported public-definer RPC access and a definer view. These findings should be reviewed before introducing new privileged grading interfaces. Do not change existing RLS/policies without an explicit, tested authorization review.


## Subsequent verified production change: original POB Paper 2 NULL-score submission

Applied the exact source-controlled `20261016072500_pob_unscored_paper2_submission.sql` to the live SPARK Supabase project using a named migration (`pob_original_paper2_unscored_submission_only`). This change permits unscored/NULL-mark submissions **only** for `subject_id='principles-of-business'`, `paper='02'`, `bank_version='pob-original-paper2-01'`, and `max_score=100`. Other subjects still require their conventional valid score; students cannot submit fabricated numeric POB Paper 2 scores.

Read-only SQL rechecked the LIVE deployed function after the change and confirmed:
- The submitted bank version is pinned: **true**.
- Provisional numeric POB Paper 2 client scores rejected: **true**.
- Original POB Paper 2 maximum constrained to 100: **true**.
- Existing shared queue's global budget check preserved: **true**.
- POB automatic marking enqueue remains disabled in live function: **true (not enabled)**.

The safe unscored attempt feature is one necessary prerequisite, NOT full POB Paper 2 grading readiness. No live historic source can be enqueued or scored.
