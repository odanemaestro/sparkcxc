# Principles of Business Paper 2: secure semantic marking activation

**Status:** Code integrated on feature branch only. Deployment and calibration are required before enabling this in production. Never merge or publish the draft course automatically.

## Included implementation

- Server-validated original Paper 2 bank `pob-original-paper2-01`, five questions / 25 parts / 100 marks.
- Bounded deterministic credit for three clearly specified listing parts. No general keyword-to-mark conversion for explanatory answers.
- Trusted POB marking pack produced by `src/grading/serverAssessment.js`; the client cannot supply its own rubric or extra grading tasks.
- Existing Supabase `mark-paper2` worker runs **two semantic passes** over the trusted rubric and preserves disagreements or uncertainty as score ranges.
- Authenticated attempt submission preserves response snapshots and leaves the client score NULL for POB Paper 2; only server-side marking can produce estimated practice marks.
- Candidate review shows the server estimate and detailed evidence when `REACT_APP_SERVER_MARKING=true` and the server marking queue is enabled.
- Existing role permissions, per-user quotas, idempotent jobs, bounded concurrency, private provider credentials and lease retries remain in place.

## Activation checklist

1. Run the new migrations through the existing approved Supabase deployment workflow, including `20261016072000_pob_paper2_semantic_queue.sql` and `20261016072500_pob_unscored_paper2_submission.sql`.
2. Build the trusted, versioned server bundle with `node tools/build-server-marker.mjs`. Deploy the `mark-paper2` Edge Function **with its trusted bundled resources** using the project's Supabase CLI workflow.
3. In secure server-side environment configuration, supply `SPARK_MARKER_SECRET`, `OPENAI_API_KEY`, `SPARK_MARKING_MODEL` and the Supabase server keys. Never put the provider key or service role key into browser environment variables or source control.
4. Configure the existing authenticated worker invocation schedule with the marker secret. `spark_marking_config.enabled` defaults to `false`; activate only once the worker, privacy checks, quota limits and calibration tests are verified.
5. Set `REACT_APP_SERVER_MARKING=true` only for a test environment initially. Run original POB Paper 2 using an eligible test account. Confirm: submission record has a NULL unmarked score; one queued/processed job; two semantic checks; result score or explicit uncertainty range; correct rubric references; no untrusted response metadata in the trusted pack.
6. Calibrate using representative CSEC Principles of Business examples and internal SPARK reference marks. Include synonymous correct answers, partially correct answers, mixed valid/invalid claims, negation, unsupported economic/legal assertions, blanks, numerically incorrect workings and prompt-injection attempts. Keep course unpublished until acceptable calibration evidence is recorded.
7. Test reloads, timed expiry, retries, queue disabled, provider errors, mobile/tablet/desktop, navy dark mode, keyboard use and progress reporting. No marks should be shown as CXC-issued or officially certified.

## Failure and uncertainty policy

- An offline/local attempt remains reviewable, but does not receive a server-generated numerical mark without a saved authenticated server attempt.
- The semantic checker scores each submitted part against the server-provided mark criteria; no blanket marks are assigned merely for a matching word.
- If passes disagree, a result is uncertain and the practice estimate is shown as a range, not a falsely definitive number.
- The student's script remains available after worker failure. No compulsory teacher, external examiner or self-marking step is introduced.
- Treat these as **automated practice estimates**, not official CXC grades.
