# SPARK Principles of Business: historical source and authored-answer QA, batch 2

Date: 17 October 2026. Branch: `feat/pob-historical-batch02-answer-qc-v1`.

## The supplied 15-file batch

- 15 original PDF files from owner-supplied `POB.zip`, 136 physical PDF pages, all bound to original SHA-256 fingerprints in the approved source manifest.
- **14 genuinely Paper 1** source files plus one May/June 2019 PDF named as P1 which is actually **Paper 02** (cover test code `01240020`, five compulsory questions). Keep this classified as `POB-P2-2019-MJ-ALT`, not P1.
- **32 pages have no selectable text at all**: 8 pages of the 2016 P1, 9 pages of the 2018 P1, and 15 pages of 2019 P2 ALT. These are images, not missing questions. Their content must be read visually before any answer bank or live scoring is cleared.
- The remaining text-bearing PDFs may have OCR corruption, diagrams, missing labels, altered fonts or watermarks. PDF text extraction is only a first draft, not final source verification.

## Source-specific answers written so far

All answer entries below are **internally authored SPARK solutions**. They are not published CXC answer sheets and are not yet signed off for live grades.

| Source | Internally authored answer entries | Source-specific evidence |
| --- | ---: | --- |
| May/June 2002 Paper 1 | 60 | Original stock/share-capital and cost-accounting calculations; bill of exchange (Q39–40), supply-demand and downward-demand graph rendered |
| May/June 2003 Paper 1 | 60 | Visualised reporting hierarchy Q9–11; line, delegation and general-management roles checked against original chart |
| May/June 2004 Paper 1 | 60 | First source page of Q1–9 had unusable text extraction and was read from original image; hire-purchase finance cost Q33 and cheque mismatch Q39 checked |
| May/June 2005 Paper 1 | 60 | Variable-returns graph Q18 visually confirmed at optimum point; Q58 has no defensible positive unemployment policy among the original choices |
| May/June 2006 Paper 1 | 60 | Supply-demand price graph Q14 read from source; whaling Q25, economic dualism Q57 and defective unemployment Q59 recovered from original page images |
| May/June 2007 Paper 1 | 60 | Original merchandise-trade table Q55 and title-document Q38 ambiguity recorded; Q58 has no effective unemployment-policy option |
| May/June 2008 Paper 1 | 60 | All offered questions and relevant historical economic calculations provided; 13 disputed source items retained |
| May/June 2011 Paper 1 | 60 | Original reporting and regressive-tax chart checked visually in earlier batch-2 work |
| May/June 2012 Paper 1 | 60 | Full source questions extracted; unemployment Q55 and economic-policy ambiguities flagged |
| May/June 2014 Paper 1 | 60 | Rendered figures and original items Q51 (no valid listed answer) and Q60 (two valid non-OECS pairs) checked |
| May/June 2015 Paper 1 | 60 | Reporting hierarchy and final economic-policy question pages checked visually |
| May/June 2017 Paper 1 | 60 | Original reporting hierarchy and disputed redistributive tax/CARICOM items checked |
| May/June 2016 Paper 1 | 60 | All eight scanned pages visually reviewed; Q47 gives real visible merchandise-trade balance of +$40m, but none of four options offers +$40m |
| May/June 2018 Paper 1 | 55 source-present questions | All nine pages viewed; printed source skips Q53–57. Five slots are missing and intentionally have no proposed answer |
| May/June 2019 Paper 2 ALT | 32 rubric parts, 100 marks | All 15 scanned pages viewed; genuine Paper 02 cover test 01240020; five compulsory 20-mark questions with SPARK-authored model answers |
| **Academic material in batch 2** | **13 complete Paper 1 banks (780 explained answers), 2018 partial 55 answers, plus 2019 Paper 2 32-part/100-mark rubric** | **15/15 source files addressed; 2018 source is incomplete** |

**All 15 sources have been read and have academic answer or rubric material**, but the original May/June 2018 P1 PDF physically omits **Questions 53–57**, leaving only 55 of its stated 60 questions. The 2019 ALT is fully rubric-authored, but the written-answer assessor has not been calibrated. No historical paper is ready for student scoring.

## Important accuracy decisions

1. May/June 2005 P1 Question 58 and May/June 2006 P1 Question 59: **no confidently correct option**. Tax increases, employer levies, credit tightening and deflation are not reliable unemployment reduction policies. Proposed answer remains null; do not automatically mark candidates incorrect or assign an invented correct option.
2. May/June 2014 P1 Question 51: none of the four printed options correctly describes securities trading. May/June 2014 Q60: both B and C are defensible non-OECS pairs. Both remain disputed rather than assigned a fabricated unique answer.
3. May/June 2002 P1 Q5: 10,000 × $2 = **$20,000 nominal share capital**; the 12.5% premium is separate from nominal capital. Q16: $1,500 overstated opening stock raises cost of sales and decreases reported profit by $1,500. These are internally checked calculations.
4. May/June 2004 P1 Q33: hire purchase price $784 less cash price $700 = **$84 finance cost**. Source-rendered cheque Q39 contains different words and figures.
5. May/June 2007 P1 Q38 offers Bill of Sale (I) and Bill of Lading (III), both potentially title documents, but provides no I-and-III answer. Q58 repeats the defective unemployment-policy choices. Neither has a safe unique grade without adjudication.
6. May/June 2005 P1 Q37: bill discounting of $10,000 at 8% gives $9,200 under the question's simplified calculation; bill tenor is omitted and should be confirmed before claiming a universally precise interest calculation.
7. May/June 2006 P1 Q14: original graph equilibrium is **50 cents**. Q21 partnership distribution of $12,000 in a 3:2:1 ratio gives partner B **$4,000**.
8. Several questions reuse nearly identical stems across years while changing the positions and ordering of the A–D choices. Do **not** transfer answer letters from a different sitting. Exact options must always be compared against that paper's source.
9. All answers presently marked provisional must still pass independent internal academic adjudication, including option fidelity. An automated test proving a source digest or 60-letter count **does not** prove the answers correct.

## Verification and release gates

- `pobHistoricalBatch02SourceAudit.js` checks the 15 PDF source identities, cover/paper classification, page counts, and original SHA-256 fingerprints.
- `pobHistoricalBatch02AuthoredAudit.js` checks every authored key and unresolved dispute status, with tests for numerical questions, visually inspected graphics, source substitution, missing letters and premature scored release.
- No teacher, independent examiner or student self-marking is required. SPARK will maintain its own adjudication and grade server.
- Before any original historic paper is scored: complete faithful question/option/diagram transcription; internal concept and answer validation; acceptance policy for defective MCQs; secure trusted-version bank resolution; scoring benchmarks for correct, incorrect and borderline responses; submission, saved-score and review UI testing on desktop, mobile and tablet. Preserve the navy dark theme.
- Principles of Business stays `enabled:false`, `status:"draft"`. All 46 historical paper scored release gates remain closed.

**Current claim: 13/15 batch-2 source files have 60-item internally authored answer models (780 answers), 2018 Paper 1 has 55 source-backed provisional answers and five MISSING original questions, and the misnamed 2019 P2 still needs a complete five-question criterion rubric. 0/15 batch-2 historical PDFs cleared for live automatic scoring.** Merging source authoring work must not be treated as approval of historical grades.

## Confirmed defect in the photographed May/June 2018 Paper 1

Rendered source PDF page 8 ends immediately after **Question 52**, but source PDF page 9 begins at **Question 58**. The original source supplied is incomplete: **Questions 53, 54, 55, 56 and 57 are absent**, not merely missing text extraction. We produced 55 provisional answer explanations for the 55 visible questions and modelled the other five slots with `answer:null`, `status:"source-missing"`. Never create replacement historical CXC wording, invent answers, or present a score out of 60 from this defective source. The `verifyPob2018MjP1SourceGap` validator and regression test fail closed if any missing slot is fabricated.

The photographed **May/June 2016 Paper 1**, in contrast, contains all sixty items and all source pages have been examined visually. In its Q47, the table gives a **$40m surplus for merchandise (goods only)**, but the provided options omit $40m; including services gives **$200m** (the printed option). The question uses the label 'balance of trade', so this stays an academic ambiguity rather than being silently treated as a unique validated key.


## Final scanned-source findings (original images, not OCR guesses)

- **2016 P1:** all eight pages inspected visually, 60 answer proposals. Q47: original merchandise exports **$160m** less goods imports **$120m** = **+$40m**. None of the four choices lists +$40m. The +$200m option improperly mixes services. Hold Q47; do not force a letter.
- **2018 P1:** nine image-only PDF pages, first cover; PDF page 8 ends at **Question 52**, next PDF page begins at **Question 58**. Five complete original question statements and their four choices, Q53–57, are absent. 55 source-present questions were independently explained and proposed. Five missing slots have `proposedOption:null` and `sourceQuestionPresent:false`. The original cannot be graded as a 60-item paper until the source is repaired.
- **2019 MJ ALT:** misleading filename P1 is not an objective paper. The scanned source cover visibly says **Paper 02**, test code `01240020`, **2 hours**, all five questions compulsory. Every page inspected (scanned PDF has 15 pages, printed booklet pages 3–17). SPARK authored a 32-part **100-mark** criterion rubric across five 20-mark questions on stakeholder responsibilities, HR/management, production and capital, consumer protection and trademarks, banking technology and ICT ethics. Correct answers and alternatives must be checked through calibrated secure semantic grading before live release. No official CXC marking scheme is claimed.

## Recommended fix for absent 2018 paper content

Acquire a complete, source-identical May/June 2018 Paper 01 (same sitting, same test code), and compare Q53–57 against its original cover, sequence and surrounding text. If no complete original can be validated, leave this historical sitting unavailable for scored exam simulation. Do **not** invent five questions, reweight 55 into 60, award everyone marks for absent questions, or silently drop them while claiming a complete 60-question paper.
