# CSEC Chemistry release gate and source QA

This document is a release gate, not a completion certificate. Keep `main` unchanged until all source items and integration checks below are complete.

## Source ledger

- Source: user-supplied `CSEC CHEMISTRY.zip`, 28 Paper 02 PDFs, 568 scanned pages.
- Syllabus: user-supplied `CSEC-Chemistry-Syllabus (1).pdf`, CXC 21/G/SYLL 13, labelled effective for examinations from May–June 2015.
- Source paper inventory and page counts: `src/chemistry/data/chemistryPaper2SourceAudit.js`.
- Historical source-index status: 28/28 inventoried. The OCR/search index is not authoritative for chemistry symbols or graphical measurements.
- Draft learner transcriptions: 18 questions across THREE entire draft historical Paper 02 sets: 2014 May/June, 2025 January, and 2025 May/June. Each has six questions totalling 100 marks. There are 167 expected questions across 28 supplied PDFs; 149 questions are not yet drafted. All historical drafts remain quarantined for independent verification.
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
- Second-pass review of all eighteen drafted questions across three complete historical draft papers (2014 and 2025). The 2014 Figure 1 graph and Figures 2-3 apparatus need exact SVG redrawing and overlay checking. January 2025 source figures need syringe, graph, ester and periodic-table overlay checks, and all new structural model answers need independent chemistry review.\n- Pixel-level comparison of the 2025 draft Figure 1 SVG. The four model SVG chemical structures and one oxygen-preparation apparatus drawing also need visual checks.\n- Resolve examiner-interpretation/source-quality flags in the 2025 paper: Question 2 gives an implausible pH for 0.05 M phosphoric acid, Question 3 uses ambiguous wording about complete methane bromination, and Question 5 links a monohydric C4H10O compound to polyester formation.
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

## Automated historical publication guard

A historical question is eligible for publication only after checks pass in `src/chemistry/data/chemistryHistoricalReleaseGate.js`. The checks require sourced question text, full points and explanations, an exact mark total, no unresolved diagram or source issues, and five recorded reviewer approvals: transcription, chemistry, mark scheme, figure SVG and exam interaction. Every current draft fails this publication gate by design.

## October 12 historical batch, January 2025

Drafted all six questions from the source 20-page PDF, preserving the original January paper's 25 + 15 + 15 + 15 + 15 + 15 mark allocation. Added data-analysis readings (Q1), graph references, quantitative calculations, isotope table (Q2), propyl ethanoate hydrolysis (Q3), periodic-table extract (Q4), alkene isomer and polymer questions (Q5), and ammonia preparation/environmental questions (Q6). The original paper has 100 marks. The newer SVG drawings include internal valence checks where relevant, but the diagrams do not yet have pixel-level source approval.

Source-issue log: Q1 gas-syringe readings need second visual comparison; Q4 places neon on a visually inconsistent row of the printed periodic-table fragment; Q5's condensed alkene formulae appear to omit the C=C bond notation. Preserve the scan text separately from teacher interpretations and avoid auto-marking these interpretations as official.

## October 12 historical batch, May/June 2014

Drafted all six questions and preserved the supplied 25 + 15 + 15 + 15 + 15 + 15 mark structure. Question 1 covers neutralisation, collision theory and sulfite analysis. Question 2 covers group trends, ionic bonding and calcium nitrate decomposition. Question 3 covers hydrocarbon structures, butane isomers and propan-2-ol. Question 4 covers ionic versus molecular oxide melting points, conductivity and corrected electrical test apparatus. Question 5 covers silver/zinc copper sulfate displacement, corrosion and duralumin. Question 6 covers plant nutrient deficiencies, soil acidity, manure, lime and ammonium-fertiliser chemistry.

Source-issue log: original Q1 figures are still waiting for exact source SVG comparisons; Q3 prints atypical reaction conditions for propene hydration; Q4 describes sulfur's oxide using SO₂ melting-point data and requires careful wording about pure versus aqueous conductivity; Q5 aluminium oxide surface passivation needs qualified explanation; Q6 'lime' can refer to multiple chemical forms. None is approved for student use until these questions are independently checked.

The derived historical coverage ledger is `src/chemistry/data/chemistryHistoricalCoverage.js`. It reports question numbers missing for each paper, draft counts, approvals, and hard failures for any duplicate or orphan question. The release count remains zero.
