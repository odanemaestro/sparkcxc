# Paper 2 V2: Nine-subject rubric approval-readiness audit (2026-10-19)

## Verified source registration

CI #2512 passed on commit d3f725f7fa3bb60af1996ef7cb5d3704feb68f99.
Production migration `20261020060000_marking_v2_nine_subject_source_total_readiness.sql`
applied successfully. It recorded **source-derived** `expected_total_marks`
for each of the 67 paper versions. The private, service-role-only view
`spark_grading_private.rubric_approval_readiness_v2` reports criteria
counts, source hashes, mark totals, and current review coverage.

| Subject | Paper versions | Source parts | Registered marks per paper | Criterion approvals | Pending |
|---|---:|---:|---:|---:|---:|
| Mathematics | 16 | 640 | 100 | 0 | 640 |
| Physics | 4 | 135 | 100 | 0 | 135 |
| Information Technology | 9 | 252 | 90 | 0 | 252 |
| Chemistry | 6 | 241 | 100 | 0 | 241 |
| English A | 12 | 72 | 120 | 0 | 72 |
| Food, Nutrition and Health | 2 | 48 | 96 | 0 | 48 |
| Integrated Science | 14 | 645 | 105 | 0 | 645 |
| Social Studies | 3 | 60 | 100 | 0 | 60 |
| Principles of Business | 1 | 25 | 100 | 0 | 25 |
| **Total** | **67** | **2,118** | source-specific | **0** | **2,118** |

The mark totals above match the registered selection/scheme. They do not
independently establish that the source examination's optional question rules,
paper maximum, and classroom marking model have been verified.

## Structural verification is not examiner approval

- All 67 registered source digests match their criteria payloads.
- Every registered paper total matches the sum of its source part marks.
- CI replays the nine subject examiners and refuses approval without
  criterion-level review evidence.
- Mathematics contains 969 explicit `manual-verification` mark checks.
  These must remain unresolved without source-specific working, graphs,
  tables or construction evaluators.
- The source registry also contains extended writing and alternative answer
  requirements for all the other subjects. Source matching alone cannot prove
  they were graded accurately.
- The reviewer-signature table currently has **zero rows**. No rubric
  should be marked `verified` or `active` in their absence.

## Release completion work still requiring real evidence

1. Validate each registered question and scoring part against its authoritative
   corrected source, including option selection and full paper totals.
2. For each criterion, test correct, equivalent, partially correct, conflicting,
   negated and incorrect responses. Validate follow-through, rounding and
   units as applicable.
3. Build authenticated graph, table, mathematical working and construction
   artifact checkers before crediting the related criteria.
4. Establish sufficient test fixtures for essays and other open-ended writing,
   including contradictory and superficially similar but incorrect scripts.
5. Obtain genuine source-bound criterion reviews, including the hashes and
   reviewer notes required by the private approval trigger.
6. Record a distinct, accountable rubric attestation after those reviews.
   The database enforces that the attester is not the same as a criterion
   reviewer. No fictitious identifiers, generated review timestamps or blanket
   approval uploads are valid.
7. Run the live submission, leased worker and atomic publication tests under
   an approved rubric with a documented rollback path before enabling
   final-score publication.

## Deployment boundary

The registration-readiness migration and service-role reporting view are live.
No paper rubrics have been activated, no V2 source reviews have been fabricated,
and existing student-facing scoring remains unchanged.
