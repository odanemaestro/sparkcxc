# Principles of Accounts course draft

This branch adds the Accounts course to SPARK's existing subject, study, revision and practice architecture. It incorporates the user-specified `feat/automated-marking-verification-v2` branch and current `main`. Principles of Business grading behaviour is unchanged by the Accounts integration.

## Included

- 11 sections, 33 substantial lessons and 106 objective mappings against the supplied CXC 10/G/SYLL 17 syllabus. The notes include original Caribbean examples, worked calculations, misconceptions, knowledge checks and dedicated revision recaps. See `principles-of-accounts-coverage.md` and `principles-of-accounts-instructional-review.md`.
- 66 explicit revision cards through SPARK's shared flashcard experience; existing generic lesson navigation and completion tracking.
- Accounting cycle and debit/credit visual guides.
- A connected general journal, custom chart of accounts, ledger, trial balance and cash book. Money posted to the journal uses integer cents. Split entries are supported; unbalanced entries and negative physical cash histories are rejected.
- Petty cash, bank reconciliation, depreciation, ratios, FIFO/LIFO/moving AVCO inventory, payroll, six-month cash flow and three-month production budgets, plus an SBA research/business-plan planner.
- Browser-local, user-scoped work with JSON export/restore and trial balance CSV export. This is not cross-device cloud document storage.
- One original 60-question, 90-minute Paper 1 using the existing examination simulator, with navigation, flags, saved deadlines and explanations.
- One original three-hour Paper 2: five 20-mark questions and 100 separately markable numerical checkpoints. This is SPARK-authored practice, not an official historical paper or official marking scheme. Working is saved; the current practice diagnostics compare numerical values and do not assess written methods.
- All 51 supplied historical paper files and the supplied syllabus preserved byte-for-byte, indexed with SHA-256 hashes. All 50 distinct historical papers and both syllabus specimens have complete native question text, original options and accounting tables. The archive contains 1,317 extant historical Paper 1 items and 166 historical Paper 2 questions.
- Paper 1 has answer choices without calculation or reasoning fields. Both paper types have save-and-exit controls, saved answers, question navigation and flags. Timed attempts keep their deadline when a student exits.
- Historical Paper 2 answer forms support editable cash books, ledgers, journals, account headings and cheques. Drawing questions have a saved diagram pad with undo and an accessible description. Printed examples and layout gaps remain fixed. Dropdowns and backup file inputs match the course's light and dark themes.
- Course registry, study/practice routes, generic progress and learning adapter integration. Notifications reuse SPARK's existing student/linked-parent helpers and additionally check active enrolment and course publication.

## V2 integration

Accounts uses the existing V2 objective evaluator, reconciliation model, shared server attempt API, private subject worker, source inventory and own-result RPC. The browser submits Paper 2 with `score: null`; it cannot publish its practice suggestions as a final grade.

The original paper identity is `POA-ORIGINAL-02-01`, bank version `poa-original-paper2-v1`, rubric version `poa-original-criteria-v1`. Its 100 numerical checkpoints have passed independent calibration: **100 verified criteria and 1,400 response-fixture checks**, with clean source-commit and exact private-marker provenance. This release scope checks numerical answers only. It does not award written-method, presentation, ledger-layout or own-figure marks.

The seed still creates the original rubric **inactive and draft**; its verified release was rehearsed only in the separate disposable staging project. The syllabus specimen's 22 official subpart ceilings total 100 marks, but all 22 criteria remain blocked pending method and presentation calibration. Formal automatic grades for historical Paper 2 papers remain withheld. Worked study guidance and numerical practice comparisons are separate from final grading.

The existing V2 registry's source verification and publication gates remain in place. Source identity checks reject changed caps, hashes, duplicate criteria and unknown response cells. Accounts is included in the shared grading release subject list. Browser scores and copied verification metadata cannot authorize a final result; the private examiner, registered evidence and database reconciliation must agree. No grading release has been activated in production.

## Historical source audit

The archive contains **50 distinct historical PDFs**. A byte-identical, wrongly labelled copy of January 2020 Paper 2 is excluded from selection. Source anomalies are retained in internal metadata rather than displayed as archive notices to students.

All 50 distinct historical papers are reconstructed as interactive, question-by-question exams in `poaPrintedPapers.js`. All 1,317 extant Paper 1 items have independent working or an explicit source issue; items with no defensible unique choice are excluded from scoring. All 166 Paper 2 questions have independently worked study guidance covering their subparts, including conditional alternatives where printed information is inconsistent. These guides are not official marking schemes. The syllabus specimen retains its official answer key with disputed items excluded from practice scoring. Historical numerical comparisons are practice guidance and cannot publish a final grade.

## Hosted staging verification and release status

The genuine hosted rehearsal passed **16 checks** in the separate project `cfqetgozfxmavwexhrxz`. It created and authenticated three disposable accounts, checked the published staging catalogue and learning RPC, student enrolment, linked-parent ownership, lesson/lab/quiz progress, notification deduplication, leaving and rejoining, saved unscored Paper 1 answers, server-owned exam durations, and denial of anonymous/student worker access. The deployed private worker produced **100/100 for the full numerical script, 0/100 for the incorrect script and a provisional result with `score: null` for unresolved work**. Canonical progress, linked-parent notifications, immutable submissions and protection against late client sync also passed. The runner restored course visibility, signed out sessions and reported successful deletion of all three fixture accounts.

The staging worker used the genuine examiner bundle and completion protocol, with a stage-only API-key authentication adapter for the project's modern secret key. The temporary rehearsal endpoint separately required a gateway-verified JWT and an expiring, one-use nonce. This rehearsal validates the calibrated original numerical paper and the named backend flows; it does not establish method grading for the specimen or historical papers.

A separate database query confirmed zero users, sessions, profiles, family links, attempts, progress rows, notifications and publication receipts after the final run. The course was restored to disabled/draft. The temporary endpoint was replaced with a disabled handler and returned HTTP 403 even with its former authorization nonce; all local nonce files were removed. The genuine stage worker and 100 verified criterion records remain available in the disposable project. See `artifacts/poa-live-staging/report.json` for the exact live checks, cleanup results and deployed checksums, and `artifacts/poa-v2-verification/` for the source-bound verification records. The local-only calibration report deliberately keeps its own `liveStagingChecked: false`; the separate hosted report is the evidence of the live check.

The course remains `enabled: false`, `status: draft` in the native registry and production seed. No production course publication, student enrolment, deployment, migration application or merge into `main` has been performed. Written methods and equivalent presentations still require subject-specific evaluation and independent calibration before their automatic grades can be released. The instructional-depth review is recorded separately from the objective coverage map.

The static historical PDF URLs follow SPARK's existing public-asset convention. UI course access uses the existing enrolment gates; these public PDF assets are not protected downloads. If licensed access restrictions are required, move the archive to private storage and use the established authenticated download service before publication.

## Local review

```powershell
git fetch origin
git switch feat/principles-of-accounts
npm ci
npm test -- --runInBand
npm run test:poa-db
npm run build:marker:v2
npm run build
npm start
```

Apply migrations in order in a disposable staging database with the existing SPARK and V2 prerequisites. The new migrations are:

1. `20261021090000_principles_of_accounts_course_draft.sql`: catalogue, 11 sections, 33 topics, prerequisite metadata and the inactive private V2 source rubric. Rerunning the seed preserves operator publication choices and never changes existing courses.
2. `20261021091000_poa_progress_notifications.sql`: Accounts-only notifications, with published-course/active-enrolment guards. Helper functions retain existing notification preferences and linked-parent permissions. Pending scores are described as pending.
3. `20261023042600_marking_v2_poa_release_integration.sql`: server-owned Accounts exam durations, saved unscored source Paper 1 submissions, protection against client-published Paper 2 grades, paper-specific numerical examiner provenance, and atomic verified progress/notification publication with retry and late-sync protection.
4. `20261023042602_marking_v2_poa_draft_source_fingerprints.sql`: binds both exact seeded Accounts rubrics to their canonical PostgreSQL JSONB source digests. Fingerprinting preserves inactive/draft status and does not approve or release either rubric.

`npm run prepare:poa` regenerates the content seed and coverage document from the committed course data. `node tools/export-poa-notes.mjs <output-directory>` exports readable HTML/Markdown notes and the coverage map.

`node tools/audit-poa-course.mjs --require-worked-solutions` checks the full native inventory, independent Paper 1 working, Paper 2 solution coverage and syllabus mappings.

Validation on 23 October 2026: full regression passed **615 suites / 5,286 tests**. The application production build, private-marker build and Accounts database integration checks pass. Calibration verified 100 original numerical criteria across 1,400 response-fixture checks. The genuine hosted staging rehearsal passed all 16 checks, including private-worker scoring and fixture cleanup. Browser checks confirm the standard Study view, saved statement answers after exit/resume, and themed dropdown/file controls. The content audit confirms all 50 historical papers, both specimens and all 166 worked Paper 2 guides. Source anomalies and conditional accounting policies remain explicit in worked guidance.

The draft branch is ready for review with original numerical grading calibration and hosted backend evidence. Production publication remains a separate release action; specimen and historical Paper 2 formal grading remain blocked.
