# CXC 2019 specimen Paper 01: final ten questions and full 60-question practice

**Branch:** `feat/principles-of-business-course-v1`, PR #67. **Course:** draft and unpublished; do not merge or change `main`.

## Source used and verified

The user-provided `POB.zip` includes `POB/CSEC-Principles-of-Business-Syllabus-.pdf` (CXC 08/G/SYLL 17), SHA-256:

`08b3bf375a720abf8098d53fb9f6394597d8b576f7b863afd7408ecba913d0e6`.

The 2019 **specimen** Paper 01 is separate from the actual May/June 2019 sitting.

- Final **Q51–Q56**: printed page 8, PDF **page 84**.
- Final **Q57–Q60**: printed page 9, PDF **page 85**.
- CXC's full **60-item specimen answer key**, including objective references: PDF **page 86**.

| Item | Syllabus objective | Printed / PDF page | Printed CXC answer | Academic note |
| ---: | --- | --- | :---: | --- |
| 51 | 9.4 (b) | 8 / 84 | B | Printed key includes tariff among direct taxes; this conflicts with normal indirect-tax classification |
| 52 | 9.4 (b) | 8 / 84 | A | Surtax |
| 53 | 9.3 | 8 / 84 | C | Printed key says reducing spending; reducing taxes (A) also conventionally stimulates business |
| 54 | 9.2 | 8 / 84 | C | Quotas restrict quantities imported |
| 55 | 10.11 | 8 / 84 | A | Caribbean Development Bank economic-development role |
| 56 | 10.13 | 8 / 84 | D | Debt, unemployment and capital constraints |
| 57 | 10.13 | 9 / 85 | C | Contains dated terminology that must be presented as historical source wording |
| 58 | 10.1 | 9 / 85 | D | Gross domestic product |
| 59 | 10.5 | 9 / 85 | A | NAFTA countries in 2019 historical context; now superseded by USMCA |
| 60 | 10.15 | 9 / 85 | C | Establishment of markets and inflow of capital |

**Published answer sequence, Q51–Q60: `BACCADCDAC`.** All four original lettered options were checked against rendered source pages. SPARK explanations are instructional interpretations, not official CXC marking text.

**Important academic integrity caveat:** Q51 and Q53 are source-key conflicts. The source's printed letter, the conceptual objection and a source-key academic notice are retained. Q38 from the previous batches remains similarly flagged. When practising against the published specimen key, those original letters receive credit, but this is not a dispute-free final official assessment grade.

## Six independent ten-question checkpoints

Each group from Q1–10 through Q51–60 has a unique paper ID, its own ten-question / 13-minute practice timer, a per-student saved attempt, CXC-keyed automatic marking out of 10, navigator, individual correct-answer explanations and optional flags. The final checkpoint adds a source-fidelity fingerprint over every actual question stem, options, correct key, syllabus reference and page, preventing silent drift of reviewed content.

## Full 60-question specimen practice

`data/pobCxcSpecimenP1Full.js` assembles the six source-checked checkpoints **without copying or renumbering individual questions**. It preserves:

- The original exam's **60 questions, 75-minute duration**, one mark per question and CXC's printed source answer key.
- Original CXC question numbers 1–60 and the reviewed question text, option order and syllabus references.
- Independent, full-exam saved attempts and progress records, distinct from the six shorter checkpoints and from SPARK's own mock questions.
- Automatic score **out of 60**, submitted review, explanations, navigator and timed auto-submit using the established practice engine.
- Disclosure of all three academically contested source keys (Q38, Q51, Q53), both before starting and in each affected answer review.
- A fixed-source fingerprint across all 60 items. If questions, distractors, correct letters or source-page attribution are changed without checked source revision, `verifyPobFullSpecimen()` fails closed.

The full composite's CXC answer sequence is:

`AABBCACBDC BDCADCDDCD DCBBCBDBDA BDAADADADB BACADDCADA BACCADCDAC`

The two forms of the specimen are **scored practice using CXC's printed specimen answer key**, not an actual CXC exam result or certification. The full specimen's source coverage is complete, but final academic adjudication on disputed printed keys and human/device-level QA remain separate from reliable production release.

## Testing and release boundaries

- `data/pobCxcSpecimenP1Checkpoint51to60.test.jsx`: exact official key, the 60 unique item sequence, final checkpoint scoring and original source text/options.
- `data/pobCxcSpecimenP1Full.test.jsx`: original 75-minute full duration, 60 unique IDs, score out of 60, actual browser selection/submission, documented source-key concerns, and source tamper rejection.
- `data/pobReleaseAudit.js`: requires both all 60 specimen questions and a complete, valid full-paper composition. Overall course release remains **false**.
- All **46 uploaded historical sitting PDFs** remain separate, not source-answer-key-approved scored papers, and historical Paper 2 still requires marking-scheme evaluation.

**Next academic priorities:** adjudicate Q38, Q51 and Q53 against official corrigenda or a defensible subject committee decision; audit the full specimen on desktop/mobile/tablet; continue authentic transcription, objective alignment and accepted-answer verification for historical papers and graded Paper 2. No production publish or merge without explicit user approval.
