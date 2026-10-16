# CXC specimen Paper 1: Scored practice checkpoint 3 (questions 21–30)

**Branch:** `feat/principles-of-business-course-v1`, PR #67. **Public release:** not approved.

## Source and academic QA

Source is the user-supplied `POB.zip` archive, file `POB/CSEC-Principles-of-Business-Syllabus-.pdf`, CXC 08/G/SYLL 17, SHA-256:

`08b3bf375a720abf8098d53fb9f6394597d8b576f7b863afd7408ecba913d0e6`

The **2019 CXC specimen Paper 01** (test code `01240010/SPEC 2019`) places Q21–23 on **printed page 4 / PDF page 80**, and Q24–30 on **printed page 5 / PDF page 81**. Original stems, Roman-numeral combinations and option order have been visually checked against rendered source-page images. The official answer-key table on **PDF page 86** gives the following letters and syllabus codes:

| Question | Section | Syllabus reference | Printed page / PDF page | Published CXC answer |
|---:|---:|---|---|:---:|
| 21 | 5 | 5.1 | 4 / 80 | D |
| 22 | 5 | 5.6 | 4 / 80 | C |
| 23 | 5 | 5.7 | 4 / 80 | B |
| 24 | 5 | 5.2 | 5 / 81 | B |
| 25 | 5 | 5.1 | 5 / 81 | C |
| 26 | 5 | 5.10 | 5 / 81 | B |
| 27 | 5 | 5.8 | 5 / 81 | D |
| 28 | 6 | 6.2 | 5 / 81 | B |
| 29 | 6 | 6.8 | 5 / 81 | D |
| 30 | 6 | 6.1 | 5 / 81 | A |

**Source key sequence:** `DCBBCBDBDA`. All four options remain in their original A–D order; multi-statement questions use newlines preserved by the practice UI. SPARK-authored teaching explanations are **not** presented as CXC-issued rationales.

## Integration and grading

- `data/pobCxcSpecimenP1Checkpoint21to30.js` provides ten individually source-backed, four-option CXC specimen questions and validates source hash, item numbering, official answer letters, syllabus codes and page placement.
- `PobPracticeHub.jsx` adds the third checkpoint option, **Questions 21–30**, using the same 13-minute timed ten-question interface and automatic 1-mark-per-correct-answer grading as earlier checkpoints.
- Results are graded **out of 10**, with each question's original printed number shown alongside the checkpoint position. Answer explanations, reviewing flagged items and saved-attempt recovery are inherited.
- A distinct paper ID and storage key prevent the third checkpoint from overwriting Q1–10, Q11–20 or the 60-question SPARK-authored mock paper.
- `data/pobCxcSpecimenP1Checkpoint21to30.test.jsx` checks answer-key tampering, original question order, options, paper provenance, end-to-end submission of an actual answer and a score out of 10.
- `data/pobReleaseAudit.js` requires the three source-verified checkpoints to have **30 unique** question IDs and keeps course publication blocked.

## Status

**CXC 2019 specimen questions 1–30 are available as three separate source-key-verified scored checkpoints on the unpublished feature branch.** This is not a published full CXC past paper or a complete 60-question specimen examination.

Next checkpoint: **questions 31–40**. The 46 supplied historical examination PDFs remain outside scored playback until their academic questions, keys and marking schemes pass separate verification. No change to `main` and no production release is authorized.
