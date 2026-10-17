# SPARK Principles of Business: Historical answer authoring, batch 1 of 4

Date: 17 October 2026. Branch: `feat/pob-historical-authored-answers-batch01-v1`.

## Complete first-batch answer authoring

All **15 owner-supplied source files** in the first batch have corresponding SPARK-authored historical answer or marking banks. These are independent academic answers, **NOT a claim that CXC's own historical keys or published mark schemes were supplied**. Formal scoring is still guarded pending calibration and fully verified digital question transcripts.

| Historical source file | SPARK-authored answer coverage | Candidate max |
| --- | --- | ---: |
| P1 January 2023 | 60 multiple-choice correct-option drafts and 60 reasoned explanations | 60 |
| P2 May/June 2009 | 7 offered questions, 36 assessed parts, 140 rubric marks offered | 100 |
| P2 May/June 2010 | 7 offered, 33 assessed parts, 140 marks offered | 100 |
| P2 May/June 2011 | 7 offered, 37 assessed parts, 140 marks offered | 100 |
| P2 May/June 2012 | 7 offered, 42 assessed parts, 140 marks offered | 100 |
| P2 May/June 2013 | 7 offered, 40 assessed parts, 140 marks offered | 100 |
| P2 May/June 2014 | 7 offered, 42 assessed parts, 140 marks offered | 100 |
| P2 May/June 2015 | 7 offered, 42 assessed parts, 140 marks offered | 100 |
| P2 May/June 2016 | 7 offered, 45 assessed parts, 140 marks offered | 100 |
| P2 May/June 2017 | 5 compulsory, 28 assessed parts, 100 marks | 100 |
| P2 May/June 2018 | 5 compulsory, 32 assessed parts, 100 marks | 100 |
| P2 January 2022 | 5 compulsory, 27 assessed parts, 100 marks | 100 |
| P2 May/June 2022 | 5 compulsory, 32 assessed parts, 100 marks | 100 |
| P2 January 2023 | 5 compulsory, 31 assessed parts, 100 marks | 100 |
| P2 January 2024 | 5 compulsory, 28 assessed parts, 100 marks. Source is a typed transcription, not the original printed exam | 100 |

The seven-question examinations offer 140 marks **across all seven questions** but students answer five questions, worth **100 marks**. `pobHistoricalScoringBatches.js` validates original sitting rules, and `pobHistoricalSevenQuestionRubric.js` and `pobHistoricalFiveQuestionRubric.js` enforce the structural limits. `pobHistoricalAuthoredBatch01Audit.js` audits all 15 authored banks and links each to the approved source SHA-256.

## Visually recovered examination details

The paper text layer is not uniformly sufficient, so selected pages were rendered and checked:

- 2016 May/June P2 Q7(b)(iii), access to affordable quality healthcare, 2 marks, recovered from original PDF page 17.
- 2017 May/June Q4(b)(ii), methods vendors use to promote sales, 4 marks, and Q5(b)(ii), indicators of standard of living, 3 marks, recovered from rendered pages.
- 2022 May/June Q4(a)(i), the actual distribution diagram is **producer/manufacturer → wholesaler → retailer → consumer**, with missing labels A = producer/manufacturer, B = retailer.
- 2022 May/June Q5(a)(iii), reducing unemployment through government action, 2 marks, recovered from rendered page.
- 2023 January Q1(b) names two stakeholders other than customers/employees; Q3(b)(ii) is townhouse development (secondary production), both recovered from original source images.
- January 2022 and January 2023 scanned low-text pages were visually confirmed as non-question sheets.

## Academic ambiguities needing internal resolution before scored publication

- January 2023 Paper 1: inspect and adjudicate original items 4, 16, 46 and 47, and independently cross-check the remaining answer letters and options. The internally drafted answers are not a substitute for complete authoritative CXC historical P1 answers; if conceptual alternatives conflict, do not silently award or deny a grade.
- 2022 May/June and January 2023 P2: historical questions use *specialty contract* in relation to hire purchase. Different jurisdictions and textbooks use differing formal-contract terminology. SPARK must accept defensible alternatives without conflating all hire-purchase arrangements with contracts executed as deeds.
- 2022 May/June P2 mutual-mistake car transaction: avoid falsely alleging intentional fraud or treating every disagreement as the same contractual remedy.
- January 2024 P2 source is a two-page *derivative typed transcription*, so its original CXC booklet formatting and authenticity must be independently established before presenting the examination as source-certified.
- Original 2009–2018 historical exam era differs from the current syllabus. Preserve paper-specific wording and optional question rules.
- Some exact question wording, chart positions, image accessibility and accepted alternatives still require complete rendered page review. Passing structural tests or source SHA-256 checks does **not** establish full academic key accuracy.

## Live scoring still requires technical and academic tests

1. Finish complete faithful digital question transcription with every option and source graphic, page by page.
2. Correct remaining academic ambiguities internally and document source-based judgments, accepted alternatives and counterexamples.
3. Calibrate the trusted P2 server assessor against benchmark responses for each criterion: full credit, partial credit, valid alternative, invalid claim, contradiction, copied rubric, unsupported numerical answer and blank response. Confirm false-award/missed-award rates before enabling a paper.
4. Require fixed trusted bank versions and PDF fingerprints, verified signed attempt/question selection, server-only grading rules, secure persistence, grading idempotency and score-review parity. Students never submit rubrics or grade their own attempts.
5. Run regression tests and actual browser/device QA (desktop, mobile, tablet, light/navy-dark), enable production worker and SPARK's subject only after each paper independently passes.

**Accurate statement:** All 15 first-batch source files have substantive authored answer models. **0/15 first-batch historical papers have been certified for live scoring.** Owner permission from PR#70 authorizes preparation, not invented academic accuracy. No human teacher, independent examiner or student self-assessment is required; SPARK's own assessment verification remains mandatory.
