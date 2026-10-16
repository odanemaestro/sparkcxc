# CXC 2019 specimen Paper 1: checkpoint 4 (questions 31–40)

**PR:** #67, `feat/principles-of-business-course-v1`. The course remains disabled/unpublished; `main` is untouched.

## Source and correct answers

Questions 31–40 were compared to the visually rendered source pages in the user-provided `POB.zip` → `POB/CSEC-Principles-of-Business-Syllabus-.pdf`, syllabus CXC 08/G/SYLL 17. Exact source PDF SHA-256:

`08b3bf375a720abf8098d53fb9f6394597d8b576f7b863afd7408ecba913d0e6`

- **Q31:** printed specimen p. 5 / PDF p. 81.
- **Q32–39:** printed specimen p. 6 / PDF p. 82.
- **Q40:** printed specimen p. 7 / PDF p. 83.
- **Published CXC answer table:** PDF p. 86, `01240010/SPEC 2019`.

| Question | Syllabus reference | Printed / PDF page | Published answer |
| ---: | --- | --- | :---: |
| 31 | 6.6 | 5 / 81 | B |
| 32 | 6.9 | 6 / 82 | D |
| 33 | 6.11 | 6 / 82 | A |
| 34 | 6.9 | 6 / 82 | A |
| 35 | 7.6 | 6 / 82 | D |
| 36 | 7.1 | 6 / 82 | A |
| 37 | 7.8 | 6 / 82 | D |
| 38 | 7.2 | 6 / 82 | A * |
| 39 | 7.7 | 6 / 82 | D |
| 40 | 7.4 | 7 / 83 | B |

**CXC official answer sequence: `BDAADADADB`.** Original choice positions and Roman numeral combinations are preserved. Multi-statement items show separate lines. Source wording is retained, including the term **“reserve flow”** in Q36; this may be a typographical error for reverse flow, but must not be silently corrected.

### Academic issue requiring review: Q38

The published CXC specimen answer table explicitly records **A (retailer)** for the question asking about breaking bulk goods into smaller packages. However, breaking bulk is commonly taught as a **wholesaler** function (option C), including when wholesalers split bulk shipments for retailers. This creates a genuine tension between the printed specimen key and the conventional description.

SPARK therefore records both the **printed CXC answer (A)** and a visible **source-key academic review flag** and does not offer a falsely unqualified explanation. A student who selects A receives credit when practising against the published specimen key. Academic adjudication is still needed before presenting this as an uncontested question for high-stakes use or aggregating the full specimen into a definitive mock grade.

## Implementation

- `data/pobCxcSpecimenP1Checkpoint31to40.js`: ten printed specimen questions, four options, CXC keys, source pages, objective mapping, SPARK-authored feedback and tamper-evident validation.
- `practice/PobPracticeHub.jsx`: fourth checkpoint selection with unique paper identity, 13-minute timer, native navigator, flags, local attempt storage, automatic score out of 10 and post-submission review. When reviewing Q38, the academic flag is displayed.
- `data/pobCxcSpecimenP1Checkpoint31to40.test.jsx`: verifies the source keys, four-option sets, original item numbers, multiple page references, duplicate prevention, a real browser-scoring attempt, and the Q38 warning.
- `data/pobReleaseAudit.js`: now demands **40 distinct source-key-checked specimen questions** across four checkpoints.

## Release decision

**40/60 CXC specimen questions (66.7%) have source-key-backed ten-question checkpoint implementations on the draft branch.** This does **not** establish a published full 60-question specimen or approve the separately supplied 46 historical examination PDFs for scoring. The academically disputed Q38 remains flagged for review, as do any other issues found in final QA.

**Next batch:** CXC specimen Paper 1, questions **41–50**, using the PDF and printed CXC key. Keep source-check and academic-issue reporting separate from official published letters. Do not merge or publish without explicit approval.
