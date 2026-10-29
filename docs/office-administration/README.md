# Office Administration course — draft release

This branch adds Office Administration to SPARK’s existing Study, Practice, flashcard, progress and enrollment flows. The course remains disabled/draft. No production database or live catalogue has been changed.

## Course content and practice

- Revised CXC 27/O/SYLL 24, effective May–June 2026: 11 sections, 80 specific objectives.
- 39 lessons, approximately 15,800 teaching words, practical cases, revision checks and 119 flashcards.
- Eight saved office tools: telephone messages, appointments, meeting documents, filing, stock records, payroll, travel itinerary and SBA planning.
- Two original Paper 1 papers: 120 unique questions, 60 marks and 75 minutes per paper.
- Three original Paper 2 papers: six compulsory questions, 90 marks and 120 minutes; each follows the current knowledge/application profile.
- Both official syllabus specimens, with separately audited official review guidance. Paper 1 specimen item 60 is excluded from scoring because its printed key conflicts with the question.

## Native historical papers

The supplied ZIP contains 23 historical Paper 1 and 21 historical Paper 2 PDFs, plus the syllabus/specimens. The app stores native question text and recreates source pages with positioned, selectable SVG text and a separate illustration/rule layer. It does not embed PDFs or put an accounting workspace inside exams.

The 2019, 2020, 2021, 2023, 2024 and 2025 Paper 1 papers have all 360 questions visually compared with their scans, including the register, stock record, petty-cash, invoice, inventory and costing tables. The 2024 May–June Paper 2 has six questions/17 response parts compared with the scan, including its franking, job description, action sheet, cheque, invoice and memorandum. The 2025 Paper 2 has all six questions/19 response parts compared with its scanned pages; its CV, index card, email, payroll and purchase requisition use native editable fields/tables. Safety illustrations retain their original colours. The source layout and exam response view are distinct presentations of the same supplied material.

The positioned page assets retain their separate unverified OCR status; checking native question text does not silently approve the page-layer OCR.

The older historical archive is **not release-approved**. At this checkpoint Paper 1 has 1,180 detected question boundaries across 1,380 positions; 200 numbered positions still require source review. Context-dependent or uncertain transcriptions remain explicitly flagged internally. The 1996 scan itself cuts text off at the right edge; extracting its embedded source image confirms that the missing edge is not merely a renderer crop. No wording has been invented to fill those gaps. Older Paper 2 forms and OCR wording also need further native-layout review.

No official historical answer keys/schemes were supplied. Historical Paper 1 answers are unscored; historical Paper 2 contains labelled SPARK guidance rather than fabricated official marking. The 54 worked examples and 400 approach notes are distinct from the official specimen scheme and from the calibrated original Paper 2 rubrics.

## Exam behaviour

Paper 1 is multiple choice only. Both papers have exit confirmation, a persistent deadline, saved answers/flags/current question, source-page routing and a question navigator. Earlier Paper 2 formats require the correct six-question selection before the timer starts, preserving the source question numbers. Refresh restores that selection. Paper 2 forms preserve their printed fixed values while saving student completion cells. Source keys and scheme pages are excluded from the exam-page assets.

## Grading and access

Original Paper 2 uses the existing server V2 engine. Unknown wording and unresolved criteria withhold final publication. Submitted responses use canonical source criterion IDs; client scores cannot masquerade as verified Paper 2 results. SQL gates bind identity, source/version, marks, registered evidence, deployed bundle, lease, attempt owner, enrollment and course publication. The worker publishes canonical progress and notification receipts once; pending browser sync cannot overwrite a verified result.

Five migrations have been applied only to disposable staging project `cfqetgozfxmavwexhrxz`. Staging checks confirm 11 sections/39 lessons/8 tools, three verified, inactive rubrics/54 criteria/90 marks each after the hosted rehearsal, matching source hashes, all five OA triggers, private receipt RLS, revoked private helper access, and draft invisibility to anonymous/ordinary authenticated catalogue reads. The compatibility patch accepts only the known original or current method validator and rejects unknown implementations.

Local verification includes 594 original-paper criterion cases, three whole-paper scenario sets, and eight Postgres integration groups covering spoofing, ownership, cross-user/parent access, retries, tampering, zero marks and unpublished uncertain responses. The separate hosted HTTP run passed 19 checks, including 90/90, 0/90, unresolved-score withholding, real Auth sessions, access rules, canonical progress and deduplicated student/parent notifications. The fixed-stage service-key adapter was used for Supabase opaque keys; the production JWT worker was unchanged. All fixture accounts were deleted, the course returned to hidden/draft, rubrics were deactivated, and both temporary endpoints returned 403 after retirement. See `live-staging-verification.md`.

## Reproduction

Use the supplied source files under `.audit-output/office-admin-source/` and generated Windows OCR inputs under `.audit-output/office-admin-ocr/`. These inputs/caches and all private staging authorization remain outside version control.

```powershell
# Use the configured Node/Python runtime paths where they are not on PATH.
python tools/prepare-office-administration-sources.py
python tools/prepare-oa-paper1-recovery.py
# Run extract-office-administration-ocr.ps1 through the existing in-memory Windows OCR wrapper.
python tools/prepare-oa-paper1-text.py
python tools/audit-office-administration-sources.py
node tools/prepare-office-administration-course.mjs
node tools/calibrate-office-administration.mjs .audit-output/oa-calibration
node tools/v2-verify-all.mjs --subject office-administration --out .audit-output/oa-v2-release
node tools/test-office-administration-migration.mjs
node tools/test-oa-release-integration.mjs
node tools/test-oa-known-validator.mjs
node --test tools/build-oa-staging-worker.test.mjs tools/poa-stage-worker-auth.test.mjs tools/oa-staging-edge-runtime.test.mjs tools/test-oa-staging.test.mjs
# For an authorized disposable staging rehearsal only:
node tools/build-oa-staging-worker.mjs
node tools/export-office-administration-notes.mjs OUTPUT_DIRECTORY
npm run build
```

`docs/office-administration/syllabus-coverage.md` maps the objectives to lessons. The historical audit files describe extraction limits. `backend-integration-verification.md` contains the staging SQL gates. Continue the remaining historical transcription review before requesting course publication or merging this draft. Responsive and hosted checks are recorded separately.

Regression checkpoint: 212 relevant Jest suites covered 3,529 tests. The only failing inventory check identified the missing OA source-inventory entry; that implementation entry was added and its 11-test suite passed on retest. The production build passed. The complete V2 replay across all 11 subjects verified 2,742 criteria and 165 papers with no failed criteria, no rejected evidence, and no rejected releases. The 22 intentionally superseded Accounts specimen criteria remain blocked; no other subject was broadened or silently marked approved. These broad regression results are local; the separate 19-check hosted canary is documented above.

Responsive confirmation: an isolated Chromium preview passed at 1440px and 390px, in light/dark exam views. Paper 1 restored its route, current question and flag after reload; Paper 2 restored its current question and an edited payroll cell. No outer-page overflow or browser exceptions were found. This local preview uses a fixture identity and no live authentication, so it does not replace the hosted HTTP checks.

Latest focused verification: 12 Office Administration Jest suites / 78 tests passed, all 16 staging packaging/authentication/authorization Node tests passed, and the production build passed.
