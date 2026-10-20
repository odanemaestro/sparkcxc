# Principles of Accounts course draft

This branch adds the Accounts course to SPARK's existing subject, study, revision and practice architecture. It incorporates the user-specified `feat/automated-marking-verification-v2` branch and current `main`. Principles of Business grading behaviour is unchanged by the Accounts integration.

## Included

- 11 sections, 33 lessons and 106 objective mappings against the supplied CXC 10/G/SYLL 17 syllabus. The notes contain approximately 9,800 words, original Caribbean examples, worked calculations, misconceptions and knowledge checks. See `principles-of-accounts-coverage.md` for the objective map.
- 66 explicit revision cards through SPARK's shared flashcard experience; existing generic lesson navigation and completion tracking.
- Accounting cycle and debit/credit visual guides.
- A connected general journal, custom chart of accounts, ledger, trial balance and cash book. Money posted to the journal uses integer cents. Split entries are supported; unbalanced entries and negative physical cash histories are rejected.
- Petty cash, bank reconciliation, depreciation, ratios, FIFO/LIFO/moving AVCO inventory, payroll, six-month cash flow and three-month production budgets, plus an SBA research/business-plan planner.
- Browser-local, user-scoped work with JSON export/restore and trial balance CSV export. This is not cross-device cloud document storage.
- One original 60-question, 90-minute Paper 1 using the existing examination simulator, with navigation, flags, saved deadlines and explanations.
- One original three-hour Paper 2: five 20-mark questions and 100 separately markable numerical checkpoints. This is SPARK-authored practice, not an official historical paper or official marking scheme. Working is saved; the current practice diagnostics compare numerical values and do not assess written methods.
- All 51 supplied historical paper files and the supplied syllabus preserved byte-for-byte, indexed with SHA-256 hashes. The historical reader retains the PDF's exact layouts, instructions, tables and illustrations and provides a saved answer notebook.
- Course registry, study/practice routes, generic progress and learning adapter integration. Notifications reuse SPARK's existing student/linked-parent helpers and additionally check active enrolment and course publication.

## V2 integration

Accounts uses the existing V2 objective evaluator, reconciliation model, shared server attempt API, private subject worker, source inventory and own-result RPC. The browser submits Paper 2 with `score: null`; it cannot publish its practice suggestions as a final grade.

The exact original paper identity is `POA-ORIGINAL-02-01`, bank version `poa-original-paper2-v1`, rubric version `poa-original-criteria-v1`. Its 100-point source rubric is seeded **inactive and draft**. The worker validates the source structure, supports PostgreSQL JSONB key ordering, rejects duplicate or altered source cells and unknown response keys, and preserves provisional authority. Accounts is included in the shared grading release subject list.

The existing V2 registry's source verification and publication gates remain in place. This course does not approve its own rubric, register invented independent evidence or activate grading in production. Non-numeric working and equivalent methods require further subject-specific grading support and calibration before final automatic scores can be claimed.

## Historical source audit and unfinished work

The archive contains **50 distinct historical PDFs**. The file labelled May/June 2020 Paper 2 is byte-for-byte identical to January 2020 Paper 2. The scanned cover explicitly prints **08 January 2020**, so the wrongly labelled duplicate is excluded from selection. The genuine May/June 2020 Paper 2 is missing from this archive.

Historical papers currently run as exact source readers, **not interactive question-by-question replicas with verified marking**. They have no verified answer keys, transcriptions, subject-specific historical rubrics or automatic scores in this change. Those items remain substantial course-completion work; source availability must not be described as a calibrated historical exam bank.

The course remains `enabled: false`, `status: draft` in both the native registry and the migration. It has not been published, enrolled for students, deployed or merged into `main`. No production migrations have been applied. Live account/enrolment, parent notifications, recommendation destinations and V2 worker execution must be checked in a staging deployment. All 106 mappings require final instructional-depth review; a complete map alone is not proof of full instructional coverage.

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

`npm run prepare:poa` regenerates the content seed and coverage document from the committed course data. `node tools/export-poa-notes.mjs <output-directory>` exports readable HTML/Markdown notes and the coverage map.

Do not publish the course as complete until historical replication, answer verification, V2 calibration and the staging checks above are complete.
