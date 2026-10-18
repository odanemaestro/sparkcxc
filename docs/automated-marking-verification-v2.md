# Automated Marking Verification V2

Status: first implementation slice. Not enabled for score publication.

## What is implemented
- Criterion-level evidence format with source references, decision, mark, and method.
- Conservative independent trusted-rule consensus with conflict detection.
- Unresolved marks remain unresolved and are never converted into a zero-grade.
- Rubric identity and total-mark checks in a release audit.
- Regression tests for verified, conflicted, unverifiable, duplicated and invalid cases.

## Important trust boundary
This client-compatible library is **not server authority**. Fields such as
`authority: "trusted-rule"`, provenance or rubric version can be forged by a
browser. Do not use the new audit alone to write a published grade.

## Required next implementation
1. Build server-owned rubric/criterion definitions, immutable version identifiers,
   and a submission record attached to the authenticated exam attempt.
2. Add a durable grading-job queue with idempotent processing and retry limits.
3. Port calibrated deterministic graders to server-side workers. Keep semantic
   interpretation advisory until independent criterion-level verification.
4. Store rubric and response hashes computed by the server. Record grading
   decisions and model versions without storing secrets or exposing private rubrics.
5. Issue final grade through a transaction that verifies the submitted attempt,
   marks total, all criteria resolved, and the server-owned grader run. Revoke
   direct client authority to publish Paper 2 numeric scores in progress RPCs.
6. Shadow-test against historical answer banks and disagreement cases before
   gradual subject-specific production enablement.
7. Preserve all POB owner/archive pilot gates and previous submission behaviour.

Do not label uncertain responses as incorrect and do not promise fully
automatic final results for semantically ambiguous responses. Human-free operation
means potentially retaining a provisional result when evidence is insufficient.

## Local checks
`npm test -- --watch=false markingReconciliationV2.test.js`
Run the full test suite and build before merge.

## Batch 2 advisory second pass
- `markingSecondPassV2.js` scans criterion-specific responses for rubric phrase evidence and accepted alternatives.
- Marks remain unresolved for unmatched phrases and negations; matched phrases do not become final marks.
- Client-provided first pass decisions are not server-authenticated. A locally reconciled result remains nonpublishable.
- Five dedicated second-pass regression tests added.
- Next: server-owned rubric lookup, robust semantic analysis under rubric constraints, tamper-proof job execution, and official calibration.

## Batch 3: evidence adjudication
- `markingAdjudicationV2.js` audits criterion IDs, mark bounds, evidence references, grader run IDs and conflicting grader-method claims.
- Generates a structured review queue for unresolved criteria.
- Distinct client-supplied grader run IDs are *not* proof of independence. Only a future trusted server may attest these identities.
- Always returns `canPublish: false`. No production grading or score-publication connection is enabled.
- Five dedicated regression tests were added. CI execution still needs verification.

## Batch 4: server-job orchestration foundation
- `gradingJobRunnerV2.js` adds a lease-aware, idempotency-friendly worker contract for the future server implementation.
- `store.claim(jobId)` must atomically create an expiring lease; `store.commit(jobId, token, outcome)` must reject expired or mismatched leases. `store.retry` has the same fencing requirement.
- Response snapshots, versions and rubric definitions must be fetched from trusted server storage, not supplied by the caller as grading authority.
- Failed jobs retry up to a bounded maximum, with sanitized error reasons that do not expose essays or secrets.
- Worker outputs always remain provisional, even when the grader reports all marks resolved. Grader claims of attestation are not trusted.
- This batch does NOT yet contain a concrete PostgreSQL queue adapter, Edge Function, server proof verification, deployed migration, or production integration.
- Six regression tests added but not yet executed. CI and integration tests are required.
- Follow current Supabase Edge Function resource limits and process long written scripts in bounded jobs.

## Batch 4 continuation: private queue schema (not deployed)
- Migration: `20261018190000_marking_v2_private_job_queue.sql`.
- Private schema and RLS on grading jobs. No grants for student-facing roles.
- Unique attempt/rubric key prevents duplicate queued jobs.
- Transactional claim with expiry, lease-token fencing, bounded attempts and bounded result payload.
- Finish function accepts only retry, provisional or failed. No final score or publication SQL is present.
- No automatic enqueue trigger yet. The worker storage adapter and server-only execution still need implementation.
- Migration is committed only to the feature branch and has **not** been applied to production.
- Before rollout: run SQL migration in staging, inspect privilege grants and function owners, check retry races and expired lease behaviour, exercise service JWT authorization, and complete server-side submission validation.

## Batch 4 continued: PostgreSQL storage adapter
- Added `postgresGradingJobStoreV2.js`, a server-only adapter for parameterized SQL calls to the private claim/finish functions.
- Enforces UUID validation, limited completion states, and lease-token fencing. Lost leases throw and never report successful completion.
- Retry handling discards potential student-response data from the result payload.
- Added five regression tests; the tests have not been executed in this session.
- Private function authorization permits direct trusted PostgreSQL sessions and service-role JWTs, not anonymous or authenticated student roles.
- A running backend with database credentials, atomic enqueue path, grading rubric registry, response loader, and live worker is still missing.
- No database migration deployed or verified in production. Do not merge without staging role/RLS/lease tests.

## Batch 4 continuation: submission queue and authoritative rubric lookup
- Migration `20261018193000_marking_v2_rubric_registry_enqueue.sql` adds a private, operator-managed rubric registry and idempotent `enqueue_marking_job_v2` procedure.
- Enqueue accepts only a server-saved submitted Paper 02 attempt with a matching active rubric. Duplicate enqueue returns the existing job ID.
- `gradingSubmissionRepositoryV2.js` loads submitted response snapshots and private rubric criteria from PostgreSQL using parameterized queries.
- Five tests cover enqueue, lookup, missing rubrics, invalid criteria and invalid attempt identifiers.
- Schema migration and tests are NOT executed or deployed. No authenticated frontend receives permissions to enqueue jobs or read private rubrics.
- The registry is currently empty. It needs validated subject rubrics, approved versions, content constraints, and staging role/RLS checks before enabling real grading.
- The job processor still lacks a deployed runtime and end-to-end server integration. No trigger, worker deployment or score publication was enabled.

## Batch 4 continuation: integrated shadow grading worker
- `shadowPaper2WorkerV2.js` composes the private PostgreSQL lease adapter, submitted-answer repository, rubric phrase suggestions, adjudication and job runner.
- Deliberately sends **no trusted first-pass marks**. All criteria stay unresolved until calibrated, independent server-side graders are connected. Phrase matches serve as diagnostic evidence only.
- Four integration-oriented Jest tests cover advisory-only output, identity mismatch, mocked database end-to-end persistence, and missing-rubric retries.
- This is a server-side library, not a deployed Edge Function, runtime scheduler or automatically invoked submission hook.
- No grading migrations were applied. No production publication path was modified.
- Before activation: provide server runtime credentials securely, test with a staging DB, populate approved rubric criteria, reconcile response schema/IDs and run the project test/build suite.

## Batch 5 start: constrained objective marking candidates
- `objectiveMarkingV2.js` evaluates explicitly configured one-mark exact values and numeric answers with numeric tolerance.
- Outputs are **advisory**, not trusted or independently corroborated, and never publish marks.
- Nonmatching prose, absent answers, units within numeric strings, and extended essays remain unresolved.
- `shadowPaper2WorkerV2.js` now observes the count of candidate objective decisions; reconciliation still receives no trusted automatic marks.
- Four dedicated objective regression tests added. Not executed in this session.
- Next: canonical schema mapping of actual question part IDs, trustworthy independent server calculation checks, rubric quality review, and staging runtime execution.

## Batch 5 continuation: numeric quantities
- `numericQuantityV2.js` parses finite numbers, scientific notation, and an explicitly limited set of metric units.
- Converts compatible units to a canonical representation; rejects incompatible dimensions and unsupported units as unresolved.
- `objectiveMarkingV2.js` now uses the quantity comparison for numeric candidate evidence, while keeping all decisions advisory.
- Seven added regression scenarios cover conversions, dimensions, invalid expressions, scientific notation and integration.
- No real grading scores are published. These checks require staging execution and historical-rubric calibration before any trusted decisions are enabled.

## Paper 2 source-shape adapter
- `paper2CriteriaAdapterV2.js` maps FNH historical responses using `question.id:part.id` and Chemistry responses using `question.id:partIndex:itemIndex`.
- Retains source mark maximums and blank responses, and rejects missing/duplicate part IDs and invalid mark allocations.
- Does not promote worked answers or model-point phrases into automatic trusted decisions. `acceptedPhrases` intentionally remains empty until authoritatively reviewed rubric definitions are available.
- Four regression tests added. This is a source-format adapter, not an enabled grading or score publication endpoint.
- Further course mappings require verifying each course's response and marking structures before rollout.

## Paper 2 adapter expansion: English A and Integrated Science
- `paper2AdditionalAdaptersV2.js` maps English A essay tasks with their rubric total marks and selected creative writing choice; no automatic semantic grading credit is assigned.
- Integrated Science uses `question.id:partIndex:itemIndex`, matching the current responseKey helper.
- No source marking descriptions are elevated into trusted rubric evidence. Missing or invalid mark allocations fail closed.
- Four new Jest cases added. Tests have not been executed in this session.
- Adapter implementation is feature-branch only and is not called by the production submission or score-publication paths.
- Remaining subjects require individual shape audits, followed by real paper integration tests and staging execution.
