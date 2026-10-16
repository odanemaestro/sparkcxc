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

## Historical source batch 04: next ten Paper 1-labelled PDFs

Batch 04 reviewed the ten labelled Paper 1 sources for 2007, 2008, 2011, 2012 and 2014–2019: **93 source pages**, seven PDFs with extractable text and three without. A significant **source metadata error** was found: `CSEC_Principles_of_Business_P1_2019_MJ.pdf` actually contains **May/June 2019 Paper 02** (cover test code **01240020**, two-hour, five compulsory questions), **not Paper 01**. The base archive metadata and historical release gate now flag/reject this record rather than allowing false Paper 1 publication. Thus Batch 04 is ten files but only nine source-confirmed Paper 1 copies, comprising 78 pages. The real 2019 Paper 1 still needs sourcing.

See `tools/build-pob-historical-batch04.py`, `data/pobHistoricalBatch04.js`, `data/pobHistoricalBatch04.test.js` and `POB_HISTORICAL_BATCH04_QA.md`. The **282** numeric line cues are unverified extraction hints, not 282 completed questions. The 2014 source has 180-degree page rotation; 2016 and 2018 lack text layers; 2017 has a third-party watermark. Continue with visual confirmation of all 60 items and four answer options before key verification.

**Cumulative:** 40 of 46 labelled historical source PDFs processed, 411 of 468 PDF pages. Six remaining labelled Paper 1 source PDFs occupy 57 pages. All historically sourced scored papers remain blocked by academic/answer-key verification; do not merge or publish until the master release gate passes.

## Historical Paper 1 final source batch 05 (six remaining supplied PDFs)

Batch 05 has now processed **all six remaining labelled Paper 1 PDFs**: January and May/June 2020, May/June 2021, January 2022, January 2023, and May/June 2024. It covers **57 PDF pages**, all rendered for source review. Of the six, **2020 January and 2023 January** have substantial question-bearing text; the other four are image-backed or have scanner/watermark-only text. January 2020 has 58 text heading numbers, with Questions **22 (page 4)** and **41 (page 6)** visually located. January 2023 has all 60 number cues in sequence but not a verified complete four-option set or answer key.

Files: `tools/build-pob-historical-batch05.py`, `data/pobHistoricalBatch05.js`, `data/pobHistoricalBatch05.test.js`, `data/pobHistoricalMcqReleaseGate.js`, `data/pobHistoricalMcqReleaseGate.test.js`, and `POB_HISTORICAL_BATCH05_QA.md`.

**Source inventory complete: 46 of 46 labelled exam PDFs, 468 of 468 original exam pages, across five batches (10+10+10+10+6).** This is only source processing: **no historical question booklet has a verified correct-answer bank**, so zero historical papers are simulator-ready. The archive's `P1_2019_MJ.pdf` is **actually Paper 02** according to its cover; the **genuine May/June 2019 Paper 1 is missing**. Thus the archive contains 20 cover-confirmed P1 copies and 26 P2 copies, not 21 actual P1 plus 25 actual P2.

**Next phase is substantive academic construction and QA**, not further filename batches: verify exact questions and diagrams page-by-page, find the missing genuine 2019 P1, obtain evidence-based keys and historical P2 marking schemes, verify all syllabus-era selection formats, calibrate the marking engines, and then test on desktop, mobile and tablet. Do not promote, auto-grade or publish any historical draft until every academic release gate passes.

## Source-backed scored-practice approval: CXC 2019 specimen Q1–Q10

The original supplied syllabus PDF contains CXC's 2019 **official specimen Paper 01 and answer key**. The first **ten** question stems, option sets, item numbers and syllabus references have been checked against its rendered source pages **78–79** and the official answer-key table on **PDF page 86**. Source SHA-256 and evidence are in `POB_CXC_SPECIMEN_SCORED_CHECKPOINT_Q01_10.md`.

A separate ten-item, 13-minute **CXC specimen checkpoint** now uses the same native Paper 1 timer, navigator, save/review and score path, with a **score out of 10** and independent storage and progress identity. It is **not** a full 60-question exam, not the May/June 2019 historical sitting, and not an official CXC result. Its test suite checks the official answer sequence `AABBCACBDC`. The existing SPARK-authored 60-question paper remains unchanged.

The wrongly named `CSEC_Principles_of_Business_P1_2019_MJ.pdf` is now **reclassified under Paper 02** as `POB-P2-2019-MJ-ALT`. The original filename is preserved for evidence; it is separate from the original `POB-P2-2019-MJ` source. After correcting source identities, the **46 PDF archive entries comprise 20 actual Paper 1 source copies and 26 Paper 2 copies**. The true 2019 MJ Paper 1 remains missing. All 46 historical sources are still unverified for live scored practice.

**Release decisions remain separate:** only this ten-question CXC **specimen** checkpoint has a verified published answer key and can be tested as scored practice on the feature branch. The wider course, historical sitting papers and full specimen 60-question paper remain unpublished/unapproved until their remaining criteria are met.

## CXC specimen Paper 01, ten-item Batch 02: questions 11–20

The second checkpoint contains **CXC 2019 specimen Paper 01 questions 11–20**, source-verified against PDF pages **79–80** and the CXC published key on page **86** of `CSEC-Principles-of-Business-Syllabus-.pdf` (source SHA-256 recorded in data). Official keys: `B D C A D C D D C D`; objective codes: `2.9, 3.3, 3.7, 3.14, 3.10, 3.13, 4.3, 4.9, 4.5, 4.6`. Original three-statement question layouts preserved and original question numbers displayed.

Files: `data/pobCxcSpecimenP1Checkpoint11to20.js`, `data/pobCxcSpecimenP1Checkpoint11to20.test.jsx`, and `POB_CXC_SPECIMEN_SCORED_CHECKPOINT_Q11_20.md`. The Paper 1 practice area offers two independently saved ten-item CXC specimen checkpoints, each with a 13-minute timer and keyed automatic scoring.

**Specimen scored-practice coverage is 20/60 (33.3%), not the complete CXC specimen paper.** The 60-item SPARK original remains separate. The 46 supplied historical sitting source PDFs remain unapproved for graded playback, and the POB course remains a disabled unpublished draft. Next checkpoint: specimen questions 21–30.

## CXC specimen Paper 01: third scored ten-item checkpoint (Q21–30)

Questions **21–30** have been checked against the rendered **CXC 2019 specimen Paper 01** in the supplied syllabus PDF, printed pages **4–5 / PDF pages 80–81**, and CXC's own published key on PDF page **86**. Question sequence, four A–D choices, syllabus references `5.1, 5.6, 5.7, 5.2, 5.1, 5.10, 5.8, 6.2, 6.8, 6.1` and correct answer letters `D C B B C B D B D A` are recorded in `data/pobCxcSpecimenP1Checkpoint21to30.js` and documented in `POB_CXC_SPECIMEN_SCORED_CHECKPOINT_Q21_30.md`.

A third **13-minute, score-out-of-10** CXC specimen checkpoint is integrated in the native Paper 1 practice UI. It has a distinct paper ID and saved-attempt state, maintains original source question numbering, retains after-submission answer review and explanation, and is covered by tests that exercise real UI scoring. The release audit now demands **30 unique source-verified CXC specimen questions**.

**Scored CXC specimen checkpoint coverage: 30/60 (50%)** on this feature branch. The full specimen, all historical sitting papers, and the entire POB course remain unpublished, and `main` is unchanged. Next ten-question batch: CXC specimen **Q31–40**.

## CXC specimen Paper 01: fourth scored ten-item checkpoint (Q31–40)

CXC specimen Paper 1 **questions 31–40** have been transcribed and visually compared with printed specimen pages **5–7** (supplied syllabus PDF pp. **81–83**). Correct choices and reference codes were checked against CXC's published key on PDF p. **86**: `B D A A D A D A D B`; syllabus codes `6.6, 6.9, 6.11, 6.9, 7.6, 7.1, 7.8, 7.2, 7.7, 7.4`.

The native Practice page now offers a fourth distinct ten-question, 13-minute, score-out-of-10 CXC specimen checkpoint with independently saved attempt and after-submission explanations. Academic verification notes are preserved: **Q38** has printed CXC answer **A (retailer)**, while breaking bulk is commonly associated with **wholesaling** (option C). The published CXC answer is preserved but a prominent source-key dispute flag accompanies the student's review. Q36 retains the original wording “reserve flow” from the source, despite possible source typographical error.

Files: `data/pobCxcSpecimenP1Checkpoint31to40.js`, `data/pobCxcSpecimenP1Checkpoint31to40.test.jsx`, `POB_CXC_SPECIMEN_SCORED_CHECKPOINT_Q31_40.md`. The release audit now demands **40 unique verified specimen question identifiers**.

**Specimen checkpoint coverage 40/60 (66.7%) on the unpublished feature branch, not a full 60-question mock examination.** Academic Q38 review, remaining 20 specimen items, all historical sitting-answer key and marking-scheme QA, and the rest of the release checklist remain outstanding. No promotion to `main` or production release.
