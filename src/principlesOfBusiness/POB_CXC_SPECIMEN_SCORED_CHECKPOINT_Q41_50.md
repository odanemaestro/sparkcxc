# CXC 2019 specimen Paper 1: fifth scored checkpoint, questions 41–50

**PR:** #67, `feat/principles-of-business-course-v1`. This is an unpublished feature-branch practice checkpoint, NOT a production course release.

## Original source checked

The user-supplied `POB.zip` contains `POB/CSEC-Principles-of-Business-Syllabus-.pdf` (CXC 08/G/SYLL 17). Its source SHA-256 is `08b3bf375a720abf8098d53fb9f6394597d8b576f7b863afd7408ecba913d0e6`. This is the **2019 CXC specimen Paper 01, code 01240010/SPEC 2019**, not the May/June 2019 historical sitting.

The source pages were rendered and visually inspected:

- Questions **41–48**: printed specimen page **7**, PDF page **83**.
- Questions **49–50**: printed specimen page **8**, PDF page **84**.
- Official CXC specimen Paper 1 answer-key table: **PDF page 86**.

| Question | Syllabus reference | Source printed / PDF page | Published answer |
| ---: | --- | --- | :---: |
| 41 | 8.2 | 7 / 83 | B |
| 42 | 8.2 | 7 / 83 | A |
| 43 | 8.3 | 7 / 83 | C |
| 44 | 8.1 | 7 / 83 | A |
| 45 | 8.2 | 7 / 83 | D |
| 46 | 8.5 | 7 / 83 | D |
| 47 | 8.3 | 7 / 83 | C |
| 48 | 9.1 | 7 / 83 | A |
| 49 | 9.2 | 8 / 84 | D |
| 50 | 9.4 (a) | 8 / 84 | A |

**CXC published answer sequence: `BACADDCADA`.** Each transcribed question preserves the four printed options A–D. Roman-numeral statements in Q48 and Q49 retain their line breaks. SPARK-written learning explanations are NOT descriptions supplied by CXC.

### Source wording and answer-key nuances

- **Q42:** The original specimen wording is *“On which of the following bank accounts is a service fee discharged?”* This unusual wording is preserved, not silently replaced with the more common *charged*.
- **Q47:** CXC prints key **C**, which refers to benefits in unforeseen circumstances. Retirement benefits in option B are one important subset of social insurance, but the broader option C is the published key.
- **Q44:** CXC prints answer **A (Cooperatives)**. Participation/share eligibility is governed by cooperative membership rules, so the explanation remains narrowly qualified.
- **Q38 in the previous batch:** The printed key's retailer/wholesaler ambiguity remains explicitly flagged. This checkpoint does not change or dismiss that outstanding review.

## SPARK integration

`src/principlesOfBusiness/data/pobCxcSpecimenP1Checkpoint41to50.js` contains the 10 source-backed MCQs with official answer letters, explanations, syllabus codes, PDF page provenance, and a strict validator. `PobPracticeHub.jsx` now offers **Questions 41–50** as the fifth independent 13-minute, ten-question specimen practice with timer, navigation, flags, saved attempts, after-submit explanations, and score out of 10.

`data/pobCxcSpecimenP1Checkpoint41to50.test.jsx` checks the exact published key and objectives; valid, distinct four-choice items; rejection of tampered keys and provenance; preservation of Q42 wording; UI submission of a correct response; and separation from the other four ten-item specimen attempts and the SPARK original 60-question mock.

`data/pobReleaseAudit.js` now demands **50 unique CXC source-verified specimen items** across five checkpoint datasets. Academic release gates continue to withhold the **46 original historical exam source PDFs**, which have no authenticated complete answer bank or rubric set.

## Next step

**Specimen coverage: 50/60 (83.3%).** Next finish Q51–60, then assess the full 60-question CXC specimen as a separate timed practice simulation with its actual **75-minute** duration, full key, original question order and overall QA. Keep the earlier checkpoint results intact and require explicit approval before merging or publishing the course.
