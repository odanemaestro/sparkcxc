# CSEC Chemistry release gate and source QA

This document is a release gate, not a completion certificate. Keep `main` unchanged until all source items and integration checks below are complete.

## Source ledger

- Source: user-supplied `CSEC CHEMISTRY.zip`, 28 Paper 02 PDFs, 568 scanned pages.
- Syllabus: user-supplied `CSEC-Chemistry-Syllabus (1).pdf`, CXC 21/G/SYLL 13, labelled effective for examinations from May–June 2015.
- Source paper inventory and page counts: `src/chemistry/data/chemistryPaper2SourceAudit.js`.
- Historical source-index status: 28/28 inventoried. The OCR/search index is not authoritative for chemistry symbols or graphical measurements.
- Draft learner transcriptions: 7 questions, comprising all six questions of 2025 May/June (100 marks, printed pages 5-21) plus 2014 May/June Question 1 (25 marks, printed pages 2-6). All remain quarantined for second-pass verification.
- Historical questions cleared for students: **0**. The draft bank is deliberately kept separate from learner-facing simulations.
- Original SPARK simulations: six 6-question, 100-mark practice sets. These are *original SPARK content* and must not be labelled historical CXC papers.

## Exact historical-paper requirements

For **every question of every supplied paper**, record:

1. Paper/session/year, question number, original printed page, source PDF page and number of marks.
2. Visually verified question text, part labels, scientific constants, formulae, ion charges, units, tables, numerical values and spelling.
3. Independently calculated correct answers. Show every intermediate calculation, units, significant figures, exceptions and legitimate alternatives.
4. A point-by-point *SPARK-authored* mark scheme. Do not describe schemes as official CXC schemes unless an official scheme is supplied and checked.
5. Each figure graph / chart / chemical structure as accessible, genuine SVG. Compare geometry, labels, scales, dashed/solid marks, tick values, position and required arrows against the PDF at full resolution.
6. Answer editor appropriate to the question: text, calculation, table, graph or labelled drawing. Preserve question-level and item-level marks exactly.
7. Marking tests for correct, partly correct, empty, equivalent and demonstrably incorrect answers. Automatically scored free text remains provisional.
8. Desktop, phone, tablet, iPad, light and dark theme review.
9. Reviewer identity and approval date for **transcription**, **chemistry**, **mark scheme** and **diagram**. Do not promote a record with any missing approval.

## Implemented controls on the current integration branch

- Historical drafts are explicitly `learnerFacing: false`. No source scan is shown as an independently verified question.
- Original SPARK Paper 02 simulations retain 2 h 30 min, six compulsory questions and 100 marks.
- Rate-of-reaction table now has six keyed answers. Three integer marks follow three explicit two-cell groups rather than awarding three marks for any three cells.
- Tables without verified reference answers cannot award automatic marks.
- Numerical table matching respects displayed precision. For example, `0.016` does not meet the `0.012` key.
- Chemical formula Unicode subscript, superscript and ionic-charge variants are normalised.
- Graph plot tolerance scales with source data; axis quantity and units are required for the axis-label mark.
- Automated tests assert question item marks sum to the parent question total and check source QA boundaries.

## Still blocked for release

- Source-by-source review for every remaining historical question in the 28 PDFs, including all of the 2014 May/June paper apart from drafted Question 1.
- Second-pass review of all seven drafted questions (2025 and 2014). The 2014 Figure 1 graph and Figures 2-3 apparatus need exact SVG redrawing and overlay checking.\n- Pixel-level comparison of the 2025 draft Figure 1 SVG. The four model SVG chemical structures and one oxygen-preparation apparatus drawing also need visual checks.\n- Resolve examiner-interpretation/source-quality flags in the 2025 paper: Question 2 gives an implausible pH for 0.05 M phosphoric acid, Question 3 uses ambiguous wording about complete methane bromination, and Question 5 links a monohydric C4H10O compound to polyester formation.
- Independent scientific review of all 119 mapped syllabus objectives, all numerical answers and the practical models.
- PR #49 supplementary study explanations are now reconciled into this branch for all 21 topics while retaining the 119-objective guide and original Chemistry labs. Scientifically review the expanded lessons, then retire the redundant PR #49 to avoid duplicate merges.
- End-to-end checks for submissions, progress reports, parent/student notifications, saving, restored timers, navigation and permissions.
- Full build, test, accessibility and mobile/tablet/desktop checks on the final commit.
- Explicit user review and approval before a merge.

## Workflow

1. Finish each historical source paper and independently verify every question.
2. Promote only fully approved questions into the live question bank.
3. Run CI and cross-device QA; resolve all failures.
4. Present the complete Chemistry review branch.
5. Merge to `main` **only after explicit approval**.
