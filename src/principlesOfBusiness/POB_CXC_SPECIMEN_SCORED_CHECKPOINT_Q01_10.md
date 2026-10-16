# Principles of Business: first source-key-verified scored practice checkpoint

**Feature branch only:** `feat/principles-of-business-course-v1` (PR #67). Do not mistake this for publication of the historical archive or the whole course.

## Evidence

The original user-supplied `POB.zip` includes `CSEC-Principles-of-Business-Syllabus-.pdf` with the complete **2019 CXC Paper 01 specimen examination and CXC's own published Paper 01 key**.

- SHA-256 of this exact syllabus PDF: `08b3bf375a720abf8098d53fb9f6394597d8b576f7b863afd7408ecba913d0e6`.
- Specimen cover: PDF page **77** (test code `01240010`, 60 questions, **1 hour 15 minutes**).
- Source specimen questions **1–9**: PDF page **78**; question **10**: PDF page **79**. Both pages have been rendered and read against extracted text.
- **CXC's answer-key table**: PDF page **86**. For questions 1–10, it explicitly gives `A A B B C A C B D C`, with syllabus references `1.1, 1.2, 1.3, 1.6, 1.7, 2.2, 2.10, 2.9, 2.5, 2.6`.
- Questions and options were transcribed from the supplied pages with typography normalized; exact option letters and the published answer-key entries were checked against rendered pages. Teaching explanations are SPARK-authored and **not** presented as official mark-scheme text.
- `data/pobCxcSpecimenP1Checkpoint.js` provides a 10-item timed and scored **checkpoint**, not a false claim to a full 60-question specimen examination. Students receive their actual score out of 10, correct answers, and feedback after submission. The score is an automatically checked **practice** score.
- The checkpoint has its own ID and storage key and does not replace, overwrite, or masquerade as the existing 60-question SPARK-authored practice paper.
- Guardrails in `verifyPobSpecimenCheckpoint()` and `data/pobScoredSpecimenCheckpoint.test.js` ensure the CXC source key, all four options, question order and source pages remain intact.

## Correction of 2019 May/June source classification

The file named `CSEC_Principles_of_Business_P1_2019_MJ.pdf` has a **Paper 02** cover, test code `01240020`, as confirmed from the source image. The source inventory therefore now records it as `POB-P2-2019-MJ-ALT`, an **alternate Paper 02 copy**. Its original filename and provenance are unchanged, and the archive's distinct `POB-P2-2019-MJ` source remains independently inventoried. This corrects a filing error; it does **not** authenticate or award answers from either 2019 sitting.

## Still blocked

- **Actual historical sitting papers:** the supplied archive contains no authenticated answer-key set. Its 46 original source files have only been inventoried/drafted, not approved for live scoring.
- **Specimen full 60 questions:** 10 of the 60 CXC specimen items have been checked and integrated. The other 50 still require the same source-page/choice/key comparison, so no full-specimen exam is offered yet.
- **Principles of Business course publication:** still disabled pending academic, integration, online marking, QA and explicit release sign-off.

**Scored-practice decision:** approve the first **ten questions** as an internally evidence-backed, scored **CXC specimen checkpoint on the draft branch only**. This is not approval of the historical past papers or a public course release.
