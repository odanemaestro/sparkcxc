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

## Batch 002: 300 more distinct parts, source-bound algebra fix

Batch 002 has been deployed to SPARK's private production Supabase database,
with 300 source criteria not repeated from Batch 001:

| Subject | Batch 002 |
|---|---:|
| Mathematics | 100 |
| Integrated Science | 60 |
| Chemistry | 30 |
| Information Technology | 30 |
| Physics | 20 |
| English A | 15 |
| Social Studies | 15 |
| Food, Nutrition and Health | 15 |
| Principles of Business | 15 |
| **Total** | **300** |

Commits/migrations:

- `20261020100000_marking_v2_second_300_criterion_calibration_queue.sql`
- `20261020103000_marking_v2_math_simplest_linear_source_checks.sql`
- `20261020110000_marking_v2_math_simplest_linear_ai_reviews.sql`
- `src/practice/cxcMarking/checkers.js` now supports the opt-in
  `requireSimplifiedLinear` check. The corrected original v1/v2 rectangle
  perimeter criteria reject unsimplified equivalents like `2(4w+4)`
  and `4w+4w+8` while accepting correctly simplified expressions in
  either term order.

The isolated CI [#2534](https://github.com/odanemaestro/sparkcxc/actions/runs/39350306369)
passed before the three guarded migrations were applied. Each migration was
also tested against production with rollback before persistent deployment.

Post-deployment SQL confirms 300 source fingerprint matches in Batch 001,
300 in Batch 002, and no overlapping source identities. The two corrected
source-bound one-mark B1 criteria now have additional clearly attributed
nonhuman AI QA records. **12/2,118** criterion reviews are recorded,
**2,106** remain, and **zero** rubric versions are fully verified/active.
The other 300 Batch 002 items are in `source-specific-evidence-required`
triage. None qualified as whole-part deterministic auto-approval without
additional source-specific evidence.

Batch 002 represents validation workflow coverage, **not 300 automatic
grading approvals**. Final V2 score publication remains disabled pending
real evidence-grade evaluators, complete per-paper criterion reviews and
distinct final rubric attestations.

## Batch 003: third 300-part calibration cohort

After [CI #2541](https://github.com/odanemaestro/sparkcxc/actions/runs/39351421037) passed, applied
`20261020120000_marking_v2_third_300_criterion_calibration_queue.sql`
to private production Supabase. Batch 003 covers 300 **new** criteria:
Mathematics 100, Integrated Science 75, Chemistry 30, IT 30, Physics 30,
English A 10, Social Studies 10 and FNH 15. POB's 25 registered parts were
already selected in the first two cohorts.

Production post-deployment audit: **three batches of 300**, 900 distinct
criterion IDs with **900/900 current source fingerprint matches and zero
duplicates**. All 300 Batch 003 criteria require source-specific evidence;
**zero new criterion reviews** were granted by triage alone. The entire V2
registry still has **12/2,118** AI-assisted source-matched reviews,
**2,106 pending**, and **zero** active or verified paper-level rubrics.
Existing live student grading remains unchanged.

CI now replays Batch 003 in whole-paper context, checking blank and unrelated
responses earn no marks, in addition to the prior cohorts and complete
source-fingerprint checks. This is bounded examiner calibration, not an
approval of written methods, alternative explanations or graphical work.

## Batch 004: production deployment and written-evidence improvement

The private migration `20261020130000_marking_v2_fourth_300_criterion_calibration_queue.sql`
passed a production rollback dry-run and was applied after
[CI #2548](https://github.com/odanemaestro/sparkcxc/actions/runs/39352656105)
passed. The fourth cohort contributes 300 **new** parts: Mathematics 100,
Integrated Science 90, IT 40, Chemistry 35, Physics 15, English A 10,
FNH 5 and Social Studies 5. POB's source parts were already covered.

The CI replay now tests four separate 300-part cohorts in their actual
full-paper context, including blank and unrelated answers, and checks for
source-fingerprint drift. Production SQL confirms 1,200 selected source
parts, **1,200 matching source fingerprints, zero duplicate identities**.

The shared `scienceWrittenEvidence` matcher was improved to distinguish
contrasts introduced by *although*, *yet* and *nevertheless*. New positive
and adversarial tests check that irrelevant negative statements do not
suppress valid evidence, while contradictory claims do not earn credit.
The original isolated regression failed due to the test stub not matching
the graders' existing singular/plural word matching; corrected fixture
tests passed in CI #2548.

Batch 004 registered **zero new paper/criterion approvals**: the newly
selected 300 parts are marked as requiring source-specific evidence.
The system still has 12 nonhuman AI-reviewed parts out of 2,118,
2,106 parts pending real review, and zero verified/active rubrics.
This is calibration infrastructure coverage, not automatic examination
accuracy certification or student-facing V2 rollout.

## Batch 005: fifth 300-part cohort deployed with science negation QA

Following [CI #2552](https://github.com/odanemaestro/sparkcxc/actions/runs/39353329663),
applied `20261020140000_marking_v2_fifth_300_criterion_calibration_queue.sql`
to the private production Supabase project. Its transaction was dry-run with
rollback before deployment.

Batch 005 introduces 300 *new* source parts: Mathematics 100, Integrated
Science 85, Information Technology 45, Chemistry 25, Physics 20, English A
12, Social Studies 10, and FNH 3. POB's 25 registered source parts had already
been included in earlier batches.

The complete private audit now confirms **five cohorts of 300 each: 1,500
source parts, 1,500 matching source fingerprints, zero duplicate source
identities**. The CI replay checks all five cohorts against actual
full-paper contexts and rejects blank and unrelated answers for selected
parts.

The shared Chemistry/Integrated Science `scienceWrittenEvidence` polarity
checker was hardened for *fails to*, *unable to* and negative contractions
with typographic apostrophes. Positive and negative source-evidence fixtures
were added. This reduces keyword-only false credit for explicitly denied
scientific claims. It is not broad semantic or independent examiner
certification, and the grading-code improvement remains on the V2 feature
branch rather than merged into the existing live grader.

Batch 005 includes zero whole-part direct-check candidates under the
conservative source criterion classifier and registers **no additional
criterion reviews**. The total remains 12 source-bound nonhuman AI QA
reviews of 2,118 registered parts, with 2,106 still pending and zero
verified/active V2 paper rubrics. Adding a part to a calibration cohort
must never be construed as approving its marking scheme.

## Batch 006: 300 source-locked parts deployed and scientific false-denial QA

Following passing [CI #2556](https://github.com/odanemaestro/sparkcxc/actions/runs/39354472986),
the private production migration
`20261020150000_marking_v2_sixth_300_criterion_calibration_queue.sql`
was applied successfully after a rollback dry-run.

New Batch 006 source parts: Mathematics 95, Integrated Science 110,
Chemistry 35, Information Technology 35, Physics 15, English A 7,
Social Studies 3. Food, Nutrition and Health and Principles of Business
have already had their entire registered source-part inventories selected
in the earlier calibration cohorts.

Production reports **six cohorts of 300 parts (1,800 total)** with
**1,800/1,800 current matching source SHA-256 fingerprints**, **zero
duplicate criterion identities**, and **zero** active or verified V2 paper
rubrics. Twelve nonhuman AI-assisted source criterion reviews remain
recorded across 2,118 parts; **2,106** are still pending. Batch 006
contains **zero newly qualified direct whole-part scoring checks**;
the selected sources remain explicitly review-required. Inclusion in
the cohort is not marking accuracy verification or approval.

The shared `scienceWrittenEvidence` checker now treats claims like
"it is false that [required scientific fact]" and "it is incorrect to say
[required fact]" as explicit contradiction evidence, rather than awarding
credit based on repeated correct keywords. Regression fixtures also
preserve correct handling of source-authored negative facts. The fix
has passed the nine-subject CI regression suite and stays on the V2
feature branch until a separate approved rollout.

## Batch 007: Final source-calibration inventory completed (318 parts)

The final, guarded private migration
`20261020160000_marking_v2_final_318_criterion_calibration_queue.sql`
was deployed after a production rollback dry-run and passing
[CI #2559](https://github.com/odanemaestro/sparkcxc/actions/runs/39355157876).

The final batch registers all remaining 318 source parts, including four
with already recorded, source-matched AI-assisted reviews. The four were
retained unchanged and were **not** duplicated as new sign-offs.

| Subject | Final batch |
|---|---:|
| Integrated Science | 160 |
| Chemistry | 56 |
| Mathematics | 45 |
| Information Technology | 42 |
| Physics | 10 |
| English A | 3 |
| Social Studies | 2 |
| **Total** | **318** |

Production audit results after the migration:

- **2,118/2,118** source criteria selected across seven batches
  (300 + 300 + 300 + 300 + 300 + 300 + 318).
- **2,118/2,118** current source criterion and paper fingerprints matched.
- **0** duplicate source criterion identities; **0** unselected registered parts.
- **12** already registered AI-assisted source criterion reviews
  (all source matched); **2,106** criterion reviews remain outstanding.
- **0** verified or active V2 paper rubrics. Live authoritative score
  publication remains blocked and the deployed private worker is not
  replaced by the feature-branch version.

**This completes the calibration *inventory*, not substantive examiner
verification.** The final 318 batch and the earlier six batches are
source-bound triage and negative-response replay coverage. Neither proving
that a source hash matches nor rejecting one unrelated answer provides
sufficient evidence for automatic partial credit, graphs, code, working,
essays or ambiguous alternatives. Actual criterion approvals must be
earned through source-specific accuracy fixtures, method/ECF/graph
validators where needed, and separate genuine final rubric attestation
before controlled live rollout.

Next phase: implement and calibrate criterion evidence evaluators by
subject and mark type; produce positive, negative, equivalent, ambiguous
and partially correct answer matrices for all 2,106 unresolved parts;
record honest, source-bound reviews; then verify worker publication,
attempt isolation and rollback under approved criteria. Avoid claiming
that completing the seven batches authorizes live V2 grading.

## Evidence verification phase: two 1,053-criterion QA batches

The seven registration/calibration cohorts are complete. This is the first
**substantive two-batch examiner-evidence replay** covering all **2,106
source parts without criterion review sign-offs**, split into two separate
groups of **1,053**. The source-aligned evaluator is
`tools/test-v2-registered-paper-replay.mjs` and the retained, per-criterion
diagnostics are uploaded by `.github/workflows/pr-checks.yml` as the
`spark-v2-criterion-evidence-<commit>` GitHub Actions artifact.

The workflow passed
[CI #2568](https://github.com/odanemaestro/sparkcxc/actions/runs/39357732764).

| Tested property | Observed |
|---|---:|
| Unreviewed source criteria included | 2,106 / 2,106 |
| Source-authored canonical answer probes available | 1,722 |
| Canonical probes obtaining some advisory credit | 1,134 |
| Explicit source-denial probes | 934 |
| Source denials that are clearly contradictory to affirmative facts | 867 |
| Such clear denials obtaining advisory credit after patch | **0** |
| Double-negative, qualified or otherwise ambiguous denial probes | 67 |
| Ambiguous denials obtaining advisory credit | 58 |
| Paper rubric versions activated | **0** |
| Criterion-level AI reviews already present | **12** |

These are diagnostic counts, not scored-script accuracy statistics or
independent approval attestations. Positive-probe failure can mean a
structured response format is required, the sample is insufficient,
a manual method is expected, or an implementation defect. Do not
automatically treat any such failure as a candidate earning zero.

**Issue discovered and corrected:** the native Chemistry, Integrated
Science and FNH V2 adapters could sometimes credit a response that
started with an explicit denial of an exact correct source marking point
because its keywords/numbers were otherwise present. A conservative
source-identity-linked check now leaves those attempts unresolved with
zero advisory marks. FNH's model evidence matcher was also hardened
against inability/failure and typographic apostrophe negations.
New regression cases require rejected denials to receive no score
authority. The full source replay now **fails CI if any clearly
contradictory source denial earns marks**.

A negative model point (e.g. ions **cannot** move in a solid) is
logically different: denying that negative statement is not
unambiguously an incorrect answer. The **67** cases of that kind are
reported as ambiguous, never automatically failed or approved.

**Remaining evidence gaps:** IT's 252 criteria, English A's 72 tasks
and Social Studies' 60 criteria have no direct source-exemplar
response in this particular matrix; they need domain-specific
code/output, comprehension/writing, and structured-concept fixtures.
Math's 969 manual-verification mark checks and Physics graphical
requirements likewise need actual method/artifact validators.
The matrix is not sufficient to approve those criteria and contains
no fabricated human reviews.

The feature branch's private worker bundle passed CI but was **not**
deployed to the currently active production worker. Production retains
67 rubric versions, zero active/verified, and 12 AI-assisted
criterion reviews. The existing live student scorer was not changed.
