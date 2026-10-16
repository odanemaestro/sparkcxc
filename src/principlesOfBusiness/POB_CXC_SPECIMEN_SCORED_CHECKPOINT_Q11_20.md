# CXC specimen Paper 1: verified checkpoint 2, questions 11–20

**Development branch:** `feat/principles-of-business-course-v1` (PR #67). Keep main unchanged, course unpublished.

## Original source checked

- User-supplied `POB.zip` → `POB/CSEC-Principles-of-Business-Syllabus-.pdf`, syllabus reference **CXC 08/G/SYLL 17**.
- Source PDF SHA-256: `08b3bf375a720abf8098d53fb9f6394597d8b576f7b863afd7408ecba913d0e6`.
- Specimen Paper 01 code: `01240010/SPEC 2019`.
- Questions 11–16: **PDF page 79**, specimen printed page **3**.
- Questions 17–20: **PDF page 80**, specimen printed page **4**.
- CXC's specimen Paper 1 answer-key table: **PDF page 86**.
- Original question statements and four A–D choices were visually compared to the two rendered source pages, with line wrapping and typography normalized. CXC answer letters and objective codes are preserved. SPARK-authored explanations are for teaching, not official key text.

| CXC specimen item | Section | CXC syllabus reference | Printed page / PDF page | CXC correct letter |
| ---: | ---: | --- | --- | :---: |
| 11 | 2 | 2.9 | 3 / 79 | B |
| 12 | 3 | 3.3 | 3 / 79 | D |
| 13 | 3 | 3.7 | 3 / 79 | C |
| 14 | 3 | 3.14 | 3 / 79 | A |
| 15 | 3 | 3.10 | 3 / 79 | D |
| 16 | 3 | 3.13 | 3 / 79 | C |
| 17 | 4 | 4.3 | 4 / 80 | D |
| 18 | 4 | 4.9 | 4 / 80 | D |
| 19 | 4 | 4.5 | 4 / 80 | C |
| 20 | 4 | 4.6 | 4 / 80 | D |

**Key:** `BDCADCDDCD`. This is checked against the *published CXC specimen answer table*, not guessed from conceptual similarities. The original statement grouping I/II/III is preserved on multiline stems; CSS uses `white-space:pre-line`.

## Scored checkpoint

`data/pobCxcSpecimenP1Checkpoint11to20.js` holds the ten checked questions and keyed explanations. The new `specimen11to20` practice route uses the existing timed Paper 1 engine: 13-minute timer, ten answerable items, question navigator, automatic one-mark-per-answer scoring out of 10, saved attempt, review and retry. The original printed question number (11–20) appears separately from checkpoint position (1–10). Its storage and progress `paper.id` are different from the first ten-item checkpoint.

`data/pobCxcSpecimenP1Checkpoint11to20.test.jsx` verifies source-key sequence, mapping, distinct IDs, four unique choices per item, source-page provenance, tamper rejection, actual UI submission and scoring. The overall `pobReleaseAudit.js` now requires **20** unique specimen questions across the two verified checkpoints.

## Unreleased work

This enables **20 of 60 CXC specimen questions** as source-checked practice on the **unpublished feature branch**. Questions 21–60 require the same proof before creating a full specimen simulator. None of the 46 uploaded historical sitting PDFs has a verified official answer scheme, and the archive's misplaced May/June 2019 PDF remains reclassified separately as **Paper 02**, not the CXC specimen.
