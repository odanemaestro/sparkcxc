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

## Source-bound criterion review pilot completed

The first four AI-assisted criterion reviews were added by
`20261020070000_marking_v2_four_source_bound_ai_criterion_reviews.sql` on the
feature branch, then applied successfully to the private production database.
[CI #2519](https://github.com/odanemaestro/sparkcxc/actions/runs/39343829972)
passed after the complete registered-paper replay.

Reviewed source identities:

- Mathematics original-v1 `p2-q4-v1::a1`: `f(4)=15`.
- Mathematics original-v2 `p2-q4-v2::a1`: `f(6)=13`.
- Physics Practice 4 `phy-p2-4-q2::di`: `8 N`.
- Physics Practice 4 `phy-p2-4-q2::dii`: `2 N`.

The stored reviewer name explicitly describes GPT-6 as **nonhuman AI
criterion QA**; no human signature or second attester is claimed. The
criterion source hashes were recomputed and verified after deployment.
Production totals now show **4 matching AI review records of 2,118 parts,
2,114 pending**, zero active paper rubrics and zero verified paper rubrics.
An attempted paper-wide activation with just the partial source reviews
was explicitly rejected by the production approval trigger.

Two other reviewed perimeter-expression candidates remain unapproved:
the existing checker accepts algebraically equivalent but not necessarily
simplified forms when the question says "in simplest form". This must
be corrected and retested before recording criterion-level approval.
Additional prose, graphical, table and dependent-method criteria still
require authentic evidence-based calibration. These four reviews by
themselves do not enable V2 final-score publication.

## Batch 001: 300-part calibration and six additional AI source reviews

On October 19, 2026, committed and applied these two guarded private
migrations after [CI #2526](https://github.com/odanemaestro/sparkcxc/actions/runs/39347113739)
passed the complete registered-source replay:

- `20261020080000_marking_v2_first_300_criterion_calibration_queue.sql`
- `20261020090000_marking_v2_six_math_physics_source_ai_reviews.sql`

The first migration creates a private, RLS-protected, source-digest-locked
**300-part cohort**; it does *not* imply that these 300 items have passed
full examiner review. Source/blank/unrelated-response replay passed in
**full-paper context**, including all nine subjects. Subject quotas:
Mathematics 100, Integrated Science 65, Chemistry 30, IT 30, Physics 25,
English A 15, Social Studies 15, FNH 10, and POB 10.

The cohort contains **17 direct-check candidates** and **283 requiring
source-specific evidence**. Direct-check eligibility is a structural
classification, *not* a rubric approval. Detailed sources, partial-credit
dependencies, invalid negatives, graph evidence and strict form instructions
must each be checked before promotion.

The second migration registers **six additional criterion-specific,
explicitly nonhuman AI QA reviews** supported by positive/negative tests
(`src/grading/v2BulkSourceBoundCriterion.test.js`):

- Mathematics original-v1 `p2-q10-v1::b` (determinant 7)
- Mathematics original-v3 `p2-q1-v3::b3` (hire purchase 16.67%)
- Mathematics p2e `p2e-q4::a2` (perimeter 22)
- Mathematics p2g `p2g-q4::a2` (midpoint 4)
- Mathematics p2i `p2i-q4::a2` (supplementary angle 120°)
- Physics practice-2 `phy-p2-2-q3::biii` (energy 254000 J)

Production follow-up SQL verified all **300** cohort records matched their
source SHA-256 fingerprints; exactly **6** cohort parts now have matched
reviews. Across the entire V2 registry, **10 of 2118** parts have source-bound
AI reviews and **2108 remain unapproved**.

A separate post-deployment attempt to promote original-v1 to active/verified
without all its independent criterion reviews was rejected by the database
trigger. **Zero paper versions are verified or active** and existing
student-facing grading is unchanged. This is *not* 300 final examiner approvals.

### Why many require stronger evidence

The private registry contains extensive source-based marking schemes, but
many criteria cannot be certified by answer-string similarity alone:
Mathematics M/ECF marks and drawing artifacts, Physics graph/table marks,
Chemistry and Integrated Science equivalent explanations, IT code evidence,
and written reasoning or essay rubrics for English A, Social Studies, FNH
and POB. These remain in the review-required category until tested
evidence validators are implemented. Approved notes do not bypass separate
paper-level attestation.
