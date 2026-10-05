# Online grading continuation — 5 October 2026

This report supersedes the remaining-work section of PLATFORM_AUDIT_2026_10_05.md. The work incorporates main through de4b13d, including the all-subject interactive changes and the English A Paper 1 rotating bank. No teacher moderation workflow is required.

## Implemented

- Integrated Science has explicit structured rubrics for all 24 Paper 2 graph tasks. Marking checks coordinates, unique point matches, series identity, axes, scale and graph construction. The shared editor supports direct plotting, negative ranges, series, keys, bars, lines, curves, best-fit lines and undo. Coordinate entry is an accessible alternative. Full marks are reachable for every authored graph in regression tests.
- Calculation and table grading uses explicit evidence rather than incidental numbers in mark schemes. IT formula and pseudocode checks, Mathematics scientific notation and Social Studies pair matching/negation have adversarial regressions.
- Exam timing and submission protections address stale timer state, excessive polling, fixed durations, ownership, score bounds and idempotency. Database migrations are supplied, not applied to a live service.
- An optional server marking queue supports English A and Integrated Science written answers. It loads bank rubrics and submitted responses on the server. Two model passes require evidence quotations and bounded marks; disagreement is shown as uncertainty rather than averaged away. This is an automated practice estimate, not evidence of examiner-equivalent accuracy.
- Queue controls include per-user quotas, globally bounded concurrent leases, claim tokens, bounded retries and cached completed results. Student text and provider errors are excluded from worker logs. The service is disabled by default.
- Vite and Jest replace the legacy react-scripts toolchain. CI runs grading tests, PostgreSQL checks and worker compilation before the production build. The dependency installation reported zero audit vulnerabilities.

## Verification and limits

After integrating the latest English A bank, all 296 suites and 2,145 tests passed (224 seconds). The production build, PostgreSQL checks and trusted worker bundle also passed.

The database harness executes the actual migrations in PGlite PostgreSQL and checks ownership, denied direct writes, fixed exam duration, invalid payloads, duplicate submission, queue leases, stale completion, retries and concurrency limits. Its 100-attempt burst and 12 competing claims reserve exactly four jobs. PGlite uses one local connection; these timings do not certify hosted production capacity.

Synthetic/adversarial examples test known behaviours; they are not independently examiner-marked responses. No live model accuracy benchmark or production load test has been performed. Model agreement can still be wrong. The semantic worker currently covers English A and Integrated Science; the other subjects retain their automatic subject graders.

Scientific drawings still use stroke-presence and written-label heuristics, with provisional feedback. They do not yet assess anatomical placement, circuit topology or visual proportions reliably. Legacy categorical graphs may retain conservative unassessed marks. These are explicit remaining accuracy limitations, not completed visual assessment.

Browser automation was unavailable in this environment. React interaction tests and production compilation passed, but no new browser screenshot or full six-subject visual sign-off is claimed. Production bundle-size warnings remain.

## Optional automatic marker deployment

The frontend works without this optional service. Publishing main does not activate it.

1. Run `npm ci`, `npm test -- --watchAll=false --runInBand`, `npm run test:marking-db`, `npm run build:marker` and `npm run build`.
2. Apply the exam-attempt migrations, including `20261005120000_exam_attempt_write_protection.sql`, followed by `20261005160000_automated_marking_queue.sql`, in a staging Supabase project first. Verify existing attempts and authenticated submission before production rollout.
3. Deploy `supabase/functions/mark-paper2` after generating its ignored `_shared/server-marker.mjs` bundle. Configure `OPENAI_API_KEY`, `SPARK_MARKING_MODEL` and a strong `SPARK_MARKER_SECRET` as server secrets. Never expose them as REACT_APP variables. The worker also needs Supabase URL and service-role credentials from its runtime.
4. Schedule POST requests to the worker with `x-spark-marker-secret`. The worker uses this secret because platform JWT verification is disabled for this scheduled endpoint. It accepts no caller-supplied student response, rubric or job ID.
5. Validate refusal, timeout, retry, ownership and uncertain-result behaviour with staging accounts. Test the selected model against the synthetic benchmarks and review systematic false awards before enabling it. This does not require a teacher for each submitted paper.
6. Set the singleton `spark_marking_config.enabled` to true only when the scheduled worker is operational. Build the frontend with `REACT_APP_SERVER_MARKING=true` to expose its review control (add that environment variable to the deployment workflow when activating).

Defaults are four concurrent jobs, two model calls per job, thirty jobs per user per day and up to three attempts per job. Provider token charges therefore need monitoring; the queue limits are not a monetary budget. Input size and response-token bounds also apply. Disable the config and frontend flag to halt new requests; running leases may finish. Keep recurring scheduling active to recover expired leases.

The model identifier and trusted rubric revision must be managed together. For a future rubric revision, update the worker revision and database configuration deliberately; the worker rejects unsupported revisions. Preserve completed results for reproducibility.

API references: [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses), [Supabase Edge Functions](https://supabase.com/docs/guides/functions). No live provider request or live database migration was performed during this audit.
