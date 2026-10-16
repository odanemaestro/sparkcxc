# Principles of Business release checklist (15 sections)

Source: user-provided SPARK Master Checklist for Adding a New Course, 16 October 2026.
Branch: `feat/principles-of-business-course-v1`.
Rule: an implemented first pass is not proof of completion. Keep `enabled:false`, `status:"draft"` and do not merge or publish without approval.

| Checklist section | Evidence on feature branch | Release status |
| --- | --- | --- |
| 1. Syllabus and course structure | 10 sections, 119 mapped objectives and 42 lessons | IN PROGRESS: compare each objective against authoritative wording; check prerequisites and depth |
| 2. Comprehensive study notes | Original Caribbean examples and revision prompts | IN PROGRESS: proofread and deepen all lessons, worked examples and misconceptions |
| 3. Diagrams, illustrations, animations and videos | Four attributed external diagrams, fallback descriptions | IN PROGRESS: verify licence, external loading, relevance, dark-mode readability, useful additional media |
| 4. Interactive learning activities | Six initial business decision/calculation tools | IN PROGRESS: strengthen accessible controls, feedback, completion persistence and graph/data tools |
| 5. Paper 1 bank | One original 60-question/75-minute paper with answer review | IN PROGRESS: verify every key and explanation, build and validate historical bank, diversify originals |
| 6. Paper 2 bank and marking | One original five-question, 100-mark paper with rubrics; four non-scoring numerical checks | BLOCKED FOR RELEASE: subject-aware reliable grading, alternate credit, tested partial marks, historical paper verification |
| 7. Flashcards | 119 first-pass prompts | IN PROGRESS: topic accuracy, application depth, swipe/flip navigation and progress persistence |
| 8. Learning Intelligence | Baseline activity tracking | IN PROGRESS: recommendation precision, completed-course behavior, Learning Loop integration |
| 9. Platform integration | Native draft registration, routes, initial enrollment gating | IN PROGRESS: dashboard, parent/admin reports, notifications, tutoring, Study Circles, DB and safe publication |
| 10. Navigation and page behaviour | Exam instructions, timer, navigator, back and scroll-to-top basics | IN PROGRESS: use shared icons and Back, Next/Previous lesson rules, saved tab, no extra floating button |
| 11. Design, CSS and UX | Initial POB styles | IN PROGRESS: SPARK Apple-inspired design, navy dark theme, contrast, all supported devices and modes |
| 12. SBA support | Initial 40-mark research workspace | IN PROGRESS: source-version eligibility, evidence and charts, secure saving, accurate rubric feedback |
| 13. QA and accuracy | Unit and component tests; repeatable structural audit in `data/pobReleaseAudit.js` covering all 119 objectives, 42 lessons, exam-bank links, historical-release flags and draft state | IN PROGRESS: full suite, new CI, production build, browser/device tests, calculation QA, diagrams and content |
| 14. GitHub delivery | Open PR #67, feature branch and scoped commits | IN PROGRESS: inspect latest main, resolve drift, ensure CI, document setup, preserve main |
| 15. Final course completion audit | No release certification yet | NOT COMPLETE: all 14 preceding sections must pass before approval |

## Assessment safety

- Historical P1 and P2 files remain inventoried but unverified, never presented as scored official papers.
- Correct numerical values alone do not establish full Paper 2 marks. The calculation checker supplies feedback but not a grade.
- SPARK's marking system is responsible for feedback. Do not insert compulsory teacher evaluation, external examiner review or student self-marking.
- Preserve CXC 08/G/SYLL 17 historical rules. A future exam configuration must be explicitly tied to a verified examination year, not inferred from a general reform announcement.
- Neither an automatically passing test nor the presence of 119 objective IDs certifies the quality of the underlying lesson explanations.

## Batch sequencing

1. Source and objective verification with detailed lesson content, examples, misconceptions and visual guides.
2. Paper 1 historical transcription/key QA and expanded original practice.
3. Paper 2 alternative responses, rubric-linked partial credit, subject-aware feedback, calibration tests and secure result integration.
4. Flashcards, business investigations and SBA research tools.
5. Dashboards, Learning Intelligence, permissions, notifications and Study Circles.
6. Responsive Apple-style/navy theme audit, accessibility and browser QA.
7. Final syllabus/assessment audit, regression run, production build and user review.

## Current evidence limits

GitHub Actions reported a successful workflow for commit `e8dea3b706168fd1317de7872ad84f5122de3b3c`. Later commits must have their own checks confirmed. Browser, tablet, touch and keyboard QA have not been demonstrated in this document.

## Repeatable pre-release structural gate

Run `pobReleaseAudit.test.js` with the project's normal test command. The audit checks objective-to-lesson links, first-pass enriched teaching, 119 flashcards, Paper 1 item structure and objective references, Paper 2 rubric totals, historical verification flags and draft-only status. Its negative tests deliberately corrupt these inputs to confirm failures are detected.

A clean result means **structural checks passed**, not that POB is ready for publication. Real historical past-paper transcription, reliable automated Paper 2 marking, human-readable academic review, accessibility and multi-device browser QA still remain release blockers. Never automatically publish from this audit alone.

## Consolidated Paper 2 assessment batch

The original 25-part, 100-mark paper now has explicit concept-evidence mappings in `data/pobAssessmentEvidence.js`, integrated with `data/pobRubricReview.js` and the candidate review interface. Diagnostic evidence is associated with each criterion, with regression tests for all 25 parts, calculations, alternative expressions, negations and keyword stuffing.

**This is not an automatic examiner.** Concept matches cannot determine whether a student's argument, causal explanation, contract analysis or recommendation is correct. As a result, `assessedMarks` remains null for submitted nonblank work, and no score is written to progress. To finish the requested examiner, SPARK needs a secure semantic-evaluation service with calibrated per-criterion marking, verified alternative-answer sets, adversarial and blinded calibration scripts, failure handling and score persistence. Releasing guessed grades is prohibited.

## Historical examination source recovery (16 October 2026)

The original user-supplied `POB.zip` was located in the ChatGPT file library and directly inspected: **21 historical Paper 1 PDFs (193 pages), 25 historical Paper 2 PDFs (275 pages), and one 138-page syllabus PDF**. Source inspection identified 17 historical exam PDFs without a substantial text layer. Details are in `POB_HISTORICAL_SOURCE_QA_20261016.md`.

The feature branch now includes `tools/audit-pob-archive.py` for SHA-256 provenance and PDF text-layer audit, and `tools/draft-pob-paper2-transcription.py` for gated candidate transcription. January 2024 Paper 2 has also been entered as a five-question, 100-mark draft in `data/pobHistoricalP22024JanDraft.js`, with release-safety tests. **Its wording has not yet passed visual-page comparison and its marks have not been checked against an authoritative scheme; it must remain outside the scored simulator.** None of the 46 historical papers can be marked as verified or simulator-ready on this evidence alone.

## Historical transcription batch policy: exactly ten PDFs at a time

Batch 01 is now staged from **ten source-backed Paper 2 PDFs** covering **136 PDF pages** and **60 available question bodies**: 2012–2018 May/June, January 2022, May/June 2022 and January 2023. All ten have SHA-256 identities and page-attributed full-text review drafts. The branch includes a reproducible parser, a ten-paper QA index, and regression tests. See `POB_HISTORICAL_P2_BATCH01_QA.md`.

- Historical Paper 2: **10/25** PDFs staged for transcription review; **0/25** verified for scored simulation.
- Historical Paper 1: **0/21** PDFs transcribed into exam-ready questions.
- All 46 source PDFs are inventoried; the untouched source ZIP is not committed.
- Historical answer keys and full marking schemes remain **unverified** and therefore disabled.
- Preserve older examination choice rules: the seven-question 2012–2016 papers require Q1–Q3 and either option from each of two question pairs. From the selected 2017-onwards sources, five questions are compulsory.
- One text-layer mark anomaly (2017 P2 Q2) was visually checked and annotated; the extracted raw text is preserved. A 20-mark token sum alone is not a full question-and-diagram verification.

Continue in batches of exactly ten source PDFs, tracking separately **source staged**, **visually verified**, **answers verified**, and **simulator released**. Do not collapse these statuses or mark historical sources complete because a machine-text extractor found question numbers.

## Historical Paper 2 batch 02 (ten source PDFs)

Batch 02 source PDFs have been audited and page-linked: 2005–2011 May/June, January 2019, May/June 2019 and May/June 2021 (**10 PDFs, 78 pages**). Three text-readable papers (2009, 2010, 2011) yielded **21 complete numbered question bodies** with extracted 20-mark totals. The other seven require visual transcription; a partial text layer is not sufficient to invent missing questions or answer keys.

Files: `tools/build-pob-historical-batch02.py`, `data/pobHistoricalP2Batch02.js`, `data/pobHistoricalP2Batch02.test.js`, `POB_HISTORICAL_P2_BATCH02_QA.md`. With Batch 01, **20 of 25 historical Paper 2 source PDFs have been processed**, **81 question bodies provisionally segmented**, and **zero have been approved for scored release**. Full source/answer/marking-scheme comparison remains a release blocker; continue using batches of exactly ten sources where possible.

## Historical source batch 03: five Paper 2 + five Paper 1

The remaining **five historical Paper 2 PDFs** (2023 MJ, 2024 JAN/MJ, 2025 JAN, 2026 JAN) and the earliest **five Paper 1 PDFs** (2002–2006 MJ) have been inventoried and extracted into page-attributed review drafts from the supplied archive. Total **10 sources / 104 pages**. Four Paper 2 sources are image-only; January 2024 Paper 2 retains the previously checked compiled draft. January 2026 Paper 2 visibly states **Hybrid** and requires format-specific QA. Paper 1 requires two-column reading order and question/distractor recovery: candidate heading numbers are not verified questions.

Files: `tools/build-pob-historical-batch03.py`, `data/pobHistoricalBatch03.js`, `data/pobHistoricalBatch03.test.js`, and `POB_HISTORICAL_BATCH03_QA.md`.

**Combined source progress:** 30 of 46 historical exam PDFs inventoried through three source-backed batches (all 25 Paper 2 plus five Paper 1), 318 of 468 historical exam pages. Sixteen Paper 1 PDFs (150 pages) remain for source processing. Official answer-key and marking-scheme verification and historical scored simulator publication remain incomplete for all 46. Do not release drafts as verified papers.
