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
- All 51 supplied historical paper files and the supplied syllabus preserved byte-for-byte, indexed with SHA-256 hashes. Historical practice uses native text, original options and accounting tables rather than an embedded PDF reader. A paper becomes selectable after its full transcription is checked.
- Paper 1 has answer choices without calculation or reasoning fields. Both paper types have save-and-exit controls, saved answers, question navigation and flags. Timed attempts keep their deadline when a student exits.
- Historical Paper 2 answer forms support editable cash books, ledgers, journals, account headings and cheques. Dropdowns and backup file inputs match the course's light and dark themes.
- Course registry, study/practice routes, generic progress and learning adapter integration. Notifications reuse SPARK's existing student/linked-parent helpers and additionally check active enrolment and course publication.

## V2 integration

Accounts uses the existing V2 objective evaluator, reconciliation model, shared server attempt API, private subject worker, source inventory and own-result RPC. The browser submits Paper 2 with `score: null`; it cannot publish its practice suggestions as a final grade.

The original paper identity is `POA-ORIGINAL-02-01`, bank version `poa-original-paper2-v1`, rubric version `poa-original-criteria-v1`. Its 100-point rubric is seeded **inactive and draft**. The syllabus specimen also has an inactive draft rubric containing 22 official subpart ceilings totalling 100 marks. Source identity checks reject changed caps, hashes, duplicate criteria and unknown response cells. Accounts is included in the shared grading release subject list.

The existing V2 registry's source verification and publication gates remain in place. This course does not approve its own rubric, register invented independent evidence or activate grading in production. Non-numeric working and equivalent methods require further subject-specific grading support and calibration before final automatic scores can be claimed.

## Historical source audit and unfinished work

The archive contains **50 distinct historical PDFs**. A byte-identical, wrongly labelled copy of January 2020 Paper 2 is excluded from selection. Source anomalies are retained in internal metadata rather than displayed as archive notices to students.

Historical papers are being reconstructed as interactive, question-by-question exams. Completed native transcriptions are listed by `poaPrintedPapers.js`; transcription of the remaining papers is ongoing. Paper 1 practice explanations are independently worked and labelled separately from official keys. The syllabus specimen retains its official answer key with disputed items excluded from practice scoring. Historical numerical comparisons are practice guidance and cannot publish a final grade.

The course remains `enabled: false`, `status: draft` in both the native registry and the migration. It has not been published, enrolled for students, deployed or merged into `main`. No production migrations have been applied. Live account/enrolment, parent notifications, recommendation destinations and V2 worker execution still need a staging check. The instructional-depth review is recorded separately from the objective coverage map.

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
