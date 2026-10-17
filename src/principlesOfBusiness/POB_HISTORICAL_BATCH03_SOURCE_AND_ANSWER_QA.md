# SPARK Principles of Business: historical scoring batch 3 of 4

Date: 17 October 2026. Branch: `feat/pob-historical-batch03-source-answer-v1`.

## Original source inventory (15 PDFs, 167 pages)

Original owner-supplied `POB.zip` was inspected directly, and all 15 PDFs were hashed SHA-256. Each source fingerprint and physical page count is checked against the approved 46-file inventory in `pobHistoricalBatch03SourceAudit.js`. **150/167 pages contain fewer than 50 extractable text characters**. This does NOT mean 150 pages are blank: these pages are scans and must be read visually, not turned into invented OCR content.

| Sitting | Paper type | Physical pages | Pages needing visual reading |
| --- | --- | ---: | ---: |
| Jan 2020 | P1 | 8 | 0 |
| May/June 2020 | P1 | 9 | 9 |
| May/June 2021 | P1 | 11 | 4 |
| Jan 2022 | P1 | 9 | 9 |
| May/June 2024 | P1 | 11 | 11 |
| May/June 2005 | P2 | 5 | 5 |
| May/June 2006 | P2 | 6 | 5 |
| May/June 2007 | P2 | 6 | 6 |
| May/June 2008 | P2 | 4 | 4 |
| Jan 2019 | P2 | 14 | 13 |
| May/June 2019 | P2 | 15 | 15 |
| May/June 2021 | P2 | 16 | 16 |
| May/June 2023 | P2 | 17 | 17 |
| May/June 2024 | P2 | 16 | 16 |
| Jan 2025 | P2 | 20 | 20 |

Source covers were rendered individually before deciding format. Critically, **2005–2007 Paper 2 covers instruct students to answer all of Section I and three questions from Section II as indicated; 2008's cover specifies three in Section I and two in Section II**. Neither should inherit the newer five-compulsory format or the 2012–2016 grouped choice pattern without complete question allocation checks. Later 2019–2025 covers describe compulsory five-question examination formats. No source-only cover observation produces student grades.

## Jan 2020 Paper 1: first authored answer bank

All **60 original MCQ items** were read using the source PDF text and specific rendered visual comparisons. `pobHistorical2020JanP1AuthoredKey.js` includes a tentative correct option and individual reasoning for each, with the approved PDF fingerprint and page number. This is independently authored SPARK material, not an official CXC answer sheet. No paper is enabled for live grading.

The original PDF's extracted text is **incorrect** for three combination-question option layouts:
- Q9: (B) is **I and III only**, not repeated I and II. The correct SPARK-authored proposition is that written communication supplies evidence and detailed messages, so tentative option **A** is supported.
- Q47: (B) is **I and III only**, and (C) is **II and III only**. Commercial banks make small-business loans and accept customer deposits; proposed **C**.
- Q49: (B) is **I and III only**. Recycling and water conservation help the environment; deforestation does not. Proposed **B**.

The rendered source corrected each of these, preventing scoring the wrong letter through text extraction alone.

The following remain marked as disputed, pending careful internal adjudication and alignment with the sitting's exact objective:
- **Q24:** More productivity, division of labour, communication and capital investment may all follow organisational growth; no answer is plainly the unique *least likely*.
- **Q52:** PAYE and National Insurance are the likely intended measures of redistribution, but social insurance and redistribution are not always synonymous.
- **Q55:** No listed option is a reliable direct solution to unemployment. The options raise taxes, deflate the economy, raise borrowing rates or impose employment levies.
- **Q57:** Some CARICOM aims overlap; member-state collaboration and regional trade/common services are both defensible. Source language is imprecise.

These are source-based **draft key claims**, not proven official CXC correct-answer letters. Passing 60-entry structural tests does not certify the syllabus interpretation or accurate scoring. Some items may need more academic adjustment before release.

## Next tasks before live automatic scoring

1. Author and inspect remaining batch 3 source files. At present: **1 of 15** has a full provisional answer key; 14 still require authored keys/rubrics. Finish original five-part question sets with correct marks and genuine alternatives, preserving each sitting's actual exam instructions.
2. Visually verify all printed questions, four answer choices, diagram labels, numerical data and relevant diagrams. Keep image-only sources distinct from missing content.
3. Internally adjudicate disputed answer keys with traceable evidence, and implement a clear defective-item marking policy. Do not mark a student wrong when the printed question has no unique correct answer.
4. Grade candidate test responses in a controlled trusted-server benchmark across full, partial, zero, contradictory and legitimate alternative answers for Paper 2. Ensure per-criterion caps, reasonable false-credit thresholds, saved-result parity and idempotency.
5. Preserve exam security, routing, mobile/tablet/desktop and theme QA. Keep the POB subject in draft and **0 historical papers released to live scoring** until all checks are complete.

The user has authorised us to provide the answers and to perform the checking internally; no independent teacher or student self-marking is required.
