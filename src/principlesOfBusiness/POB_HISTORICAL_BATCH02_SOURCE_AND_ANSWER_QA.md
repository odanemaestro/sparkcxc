# Principles of Business, historical scoring source audit and answer writing: batch 2

Date: 17 October 2026.
Source: owner-supplied `POB.zip`, 15 source PDFs, 136 physical pages.
Branch: `feat/pob-historical-batch02-answer-qc-v1`.

## Input provenance and correct paper identities

The second batch has **14 actual historical Paper 1 PDFs** and **one Paper 2** whose ZIP filename incorrectly calls it P1. The 2019 May/June file `CSEC_Principles_of_Business_P1_2019_MJ.pdf` has a photograph of a CXC Paper **02** cover with printed test code **01240020**, **five compulsory questions**, and a **2-hour** limit. It is `POB-P2-2019-MJ-ALT`, not an additional Paper 1. The source SHA-256 and physical page counts of all 15 files are linked to the approved existing manifest.

May/June 2016 P1 (8 pages), May/June 2018 P1 (9 pages) and the 2019 P2 ALT (15 pages) have **zero extractable PDF characters on every page** (32 image-only pages). These require inspection of the actual pictures; lack of extracted text is NOT evidence of missing examination questions. Other years' OCR may still contain mangled options or diagrams. **All source PDFs require visual checking before a historical paper is published.**

## Answer authoring completed in this iteration

| Historical Paper 01 source | Proposed answers | Explanation entries | Disputed academic items | Source details checked |
| --- | ---: | ---: | --- | --- |
| May/June 2012 | 60 | 60 | Q16, Q27, Q41, Q45, Q55 | Original PDF text and options, including Q55 with no plausible corrective employment measure |\n| May/June 2014 | 60 | 60 | Q51, Q53, Q56, Q57, Q60 | Original text plus rendered diagrams Q7/8 and source questions Q51/60 |
| May/June 2015 | 60 | 60 | Q52, Q56, Q59 | Source text plus rendered organisation chart Q10 and ending questions |
| May/June 2017 | 60 | 60 | Q47, Q56 | Source text plus visually checked organisation chart Q6/7 |
| **Total in batch 2** | **240** | **240** | **15 awaiting review** | **4/15 files with authored answers** |

These are genuine SPARK-authored teaching explanations keyed to the actual printed option letters. They are **not CXC-published keys**, and none is a graded historical Paper 1 yet. Eleven more sources in the batch need answer writing, including the 2019 Paper 2.

## Critical original source problems uncovered

- **2012 Question 55:** The printed alternatives are raising income tax, deflation, imposing an employment levy and increasing borrowing interest. None directly and reliably reduces unemployment; the item cannot fairly be marked with a guessed letter.\n- **2014 Question 51:** The printed prompt asks about dealing in securities, but none of its four printed answers actually defines buying/selling shares, bonds or related financial instruments. No defensible single correct letter was found. Status: `no-correct-option`.
- **2014 Question 60:** Both **B (Guyana/Bahamas)** and **C (Barbados/Jamaica)** list a pair of non-OECS members. The original page image confirms both options. Status: `multiple-correct-option-pairs`.
- **2014 Question 56:** Raising exports is the direct balance-of-payments remedy, but credit tightening may also reduce import demand. Do not reject a defensible interpretation without adjudicating original question context.
- **2014 Question 53 / 2015 Question 52:** Source wording uses a simplified or inverted trade/current-account concept. Verify how the intended CSEC-era language maps to complete balance-of-payments accounts before grading.
- **2014 Question 57 / 2015 Question 59 / 2017 Question 56:** Generic collaboration and specific trade/common-service cooperation are both valid CARICOM purposes in the printed choices. The term `interregional` is imprecise.
- **2012 Question 16 / 27 / 41 / 45:** Collateral requirements, likelihood of increased communication after firm growth, protective roles of taxes, and whether NI is a redistributive instrument require the historical teaching context.\n- **2015 Question 56:** Rural-to-urban migration can be a symptom of economic dualism but should not be confused with its definition.
- **2017 Question 47:** Source's income redistribution framing groups PAYE with National Insurance; check national arrangements and actual welfare funding before making a definitive conceptual claim.

## Scoring rules

SPARK should adjudicate questionable original items internally, documenting evidence and accepted alternatives. For a truly defective MCQ the fair remedy must be uniform for students (e.g. omit the item from the denominator or explicitly credit multiple defensible correct answers). **Do not silently guess a single answer, invent CXC authority, or activate unreviewed historical grades.**

All new answer banks use `liveScoringApproved:false`. The 2014 specific scoring helper refuses disputed items and refuses all grades until full transcription verification, calibration and controlled backend release. No student self-marking or external teachers. Tests confirm 60 items, 60 explanations, original source fingerprints, cross-year repeated-stem consistency, the anomalous 2019 paper cover, and no premature activation.

## Next work in the same batch

1. Develop answer/explanation banks for the **remaining 10 Paper 1 sources** (2002–2011, 2016 and 2018), including diagrams and image-only pages.
2. For the **2019 Paper 2 alternate**, read every photographic page, transcribe questions, allocate printed marks accurately, author 100-mark criterion-level solutions, and calibrate the secure written-answer scorer.
3. Verify any ambiguous items against the historical syllabus and original source; test adversarial MCQ and free-response attempts, student report parity, light/navy-dark themes and mobile/tablet/desktop.
4. After source and grade calibration QA, enable only independently verified historical examinations. The general POB course remains in draft until its entire release checklist is satisfied.

**Current honest status:** batch 1 source answers 15/15 authored, but none academically released. Batch 2 source inventory 15/15 authenticated by digest and page counts; 4/15 academic answer banks drafted; 0/15 historical papers scored live. Full archive 0/46 live.
