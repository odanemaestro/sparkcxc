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
