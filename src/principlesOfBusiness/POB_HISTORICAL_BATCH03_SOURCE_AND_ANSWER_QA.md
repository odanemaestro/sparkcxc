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

Source covers were rendered individually before deciding format. Critically, **2005–2007 Paper 2 covers instruct students to answer all of Section I (**Q1=10 marks, Q2=10, Q3=20**) and three questions from Section II (**one each from Q4/5, Q6/7 and Q8/9**). This is SIX questions attempted from NINE offered, **100 candidate marks out of 160 offered**; 2008's cover specifies three compulsory 20-mark questions in Section I and two selected 20-mark questions in Section II**. Neither should inherit the newer five-compulsory format or the 2012–2016 grouped choice pattern without complete question allocation checks. Later 2019–2025 covers describe compulsory five-question examination formats. No source-only cover observation produces student grades.

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

## May/June 2008 Paper 2: second fully authored source\n\nAll four original PDF pages were rendered and visually inspected. SPARK has drafted model answers for **all seven questions and 31 assessable parts**, with criterion marks totalling **140 offered marks**. The original booklet requires **Q1, Q2 and Q3**, then **one of Q4/5** and **one of Q6/7**. Only five questions are answered, for **100 marks maximum**.\n\nSource-specific responses include functional-area reactions to Christmas soft-drink demand; primary versus secondary production; consumer redress for stale bakery goods; reasonable perishable/bulk/urgent/secure goods transportation methods; reasons for nationalising industries; distinct valid business-plan components; and carefully differentiated real GDP, GNP and standard-of-living concepts. Alternative correct explanations are accepted conceptually rather than by rigid phrase matching.\n\nThe file `pobHistorical2008MjP2AuthoredScheme.js` and its tests verify all seven 20-mark subtotals, actual 2008 question-choice logic, source fingerprints, and rejection of wrong mark totals or fabricated source certification. Source wording has been read, but **the grading worker's performance is not calibrated** and no live grades are enabled.\n\n## Next tasks before live automatic scoring

1. Author and inspect remaining batch 3 source files. At present: **15 of 15** now have full provisional answer or marking-scheme banks; 0 remain un-authored. Finish original five-part question sets with correct marks and genuine alternatives, preserving each sitting's actual exam instructions.
2. Visually verify all printed questions, four answer choices, diagram labels, numerical data and relevant diagrams. Keep image-only sources distinct from missing content.
3. Internally adjudicate disputed answer keys with traceable evidence, and implement a clear defective-item marking policy. Do not mark a student wrong when the printed question has no unique correct answer.
4. Grade candidate test responses in a controlled trusted-server benchmark across full, partial, zero, contradictory and legitimate alternative answers for Paper 2. Ensure per-criterion caps, reasonable false-credit thresholds, saved-result parity and idempotency.
5. Preserve exam security, routing, mobile/tablet/desktop and theme QA. Keep the POB subject in draft and **0 historical papers released to live scoring** until all checks are complete.

The user has authorised us to provide the answers and to perform the checking internally; no independent teacher or student self-marking is required.

## Critical 2005–2007 examination-format QA

Examined each original rendered page from the 2005, 2006 and 2007 Paper 02 source PDFs, not just the cover. These sittings have **NINE offered numbered questions**: Q1 (10 marks), Q2 (10 marks), Q3 (20 marks), and Q4–Q9 (20 each). Candidates must answer the three Section I questions and choose exactly one each from Q4/Q5, Q6/Q7 and Q8/Q9. Thus they complete **SIX questions, 100 marks maximum**, with 160 offered across the whole booklet. The `validatePob2005to2007P2Selection` helper and regression suite reject incorrect grouped choices, duplicate IDs, missing answers and mistaken five-question submissions. No candidate may be graded by the 2008 or current sitting's rule for these years.

### Secure historic scoring-gate compatibility

The development release gate `pobHistoricalAutoScoringGate.js` now validates the six-answer 2005–2007 examination pattern, accepts 10 marks per original Q1/Q2, requires all nine offered question records, and rejects seven-question/incomplete substitutes. For 2008 it requires seven offered question records but exactly five candidate-selected questions with the original Q1–Q3 compulsory and Q4/5 plus Q6/7 choices. These protections fail closed, still require original source-verified question wording, signed rubrics and controlled marking calibration, and do **not** make any source live. Regression tests verify altered mark allocations, forbidden grouped selections and incomplete original question sets.

## 17 October 2026: completed third-batch authoring (15 of 15)

**Complete SPARK-authored answer coverage is committed on the feature branch:** 5 Paper 01 sources (300 explained multiple-choice slots) and 10 Paper 02 sources (one source-authored rubric per offered printed question, 1,220 marks across all *offered* P2 questions, restricted to a candidate maximum of 100 per paper). The first three P2 2005–2007 sittings offer 160 marks, 2008 offers 140, and six newer P2 sources offer 100 each. The May/June 2019 duplicate scan reuses the 32-part academic rubric only after its cover and printed questions were compared, with both PDFs retaining their different SHA-256 fingerprints.

Original source pages were checked by image, including the 2005–2007 nine-question choice patterns, January 2019 producer–wholesaler–retailer–consumer diagram, 2024 deejay contract, and January 2025 salon organisation chart. The 2022 and 2024 Paper 01 scans were rechecked item by item against original printed options rather than OCR. The 2024 PDF contains red handwritten answers: these are **not official examiner keys** and do not certify correctness.

**Unresolved academic questions remain deliberately visible:**

- **January 2020 P1:** Q24, Q52, Q55 and Q57.
- **May/June 2020 P1:** Q27, Q34 and Q48.
- **May/June 2021 P1:** Q33, Q52, Q55, Q56 and Q57.
- **January 2022 P1:** Q24 (no unique least-likely consequence of business growth) and Q58 (no listed policy convincingly reduces unemployment). Both proposed options are `null`.
- **May/June 2024 P1:** Q30 (residence is relevant to consumer decisions), Q50 (alternative explanations of tax redistribution) and Q56 (the marked answer describes GDP more closely than GNP; no fully accurate listed option). Q56's answer is `null`.

The `pobHistoricalBatch03AuthoredBanksAudit` function verifies 15 distinct source hashes and exactly 300 Paper 01 entries, and recalculates offered and maximum Paper 02 mark totals; its tests include tampered sources, misplaced answers and false live approval. This checks **structure and provenance**, not whether the student's written explanation will actually receive the correct partial marks. Full faithful question-bank representation, independent internal academic adjudication, server-side benchmark calibration and security/attempt-persistence testing remain prerequisites to release. **0/15 batch-3 papers released for live scoring; 0/46 historical sources overall.**
