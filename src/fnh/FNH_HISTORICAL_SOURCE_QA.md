# FNH historical examination source QA register

Updated: 14 October 2026  
Branch: `feat/fnh-syllabus-course-v1` · Draft PR #52 · Do not merge without user review.

This is the working audit for the historical CSEC Food and Nutrition / Food, Nutrition and Health archive. **A transcribed question, source-style SVG, or plausible answer is not a verified official CXC key.** All scored historical Paper 01 releases remain blocked.

## Submitted sources needing replacement or supplementary evidence

| Source | What the supplied document actually shows | Required action |
| --- | --- | --- |
| `CSEC_FNH_Paper_1_-_May_June_2021.pdf` (from FNH.zip) | January **2023 Spanish Paper 03 Oral**, not 2021 FNH Paper 01 | Replace with correct May/June 2021 FNH Paper 01. Do not use Spanish passages in an FNH question bank. |
| `CSEC FNH P1 2023 MJ.pdf` (uploaded 14 October) | **Agricultural Science**, May/June **2020**, Paper 01, Single Award, General Proficiency, 3 June 2020, 75 minutes, form TP 2020047, test code 01203010. Ten scanned pages, upside down. SHA-256: `7a854cc8f6d66330225494b4144abf68c267a213014920a377f49f96f297a0e7`. | Replace with an actual CSEC FNH May/June **2023 Paper 01**. The upload is quarantined in `fnhIncomingSourceIdentity.js` and **must not be counted as an FNH exam**. |
| 2004 FNH Paper 01 | Eight-page scan has Q1–60 but the common choices for Q46–47 are absent. The same questions appear with four choices in the user-supplied 2005 Q52–53 and in a separate published 2015 Paper 01. These provide **cross-year candidate options only**, not proof of the original 2004 options. | Keep Q46–47 excluded from the student source-review reader and all grading until an original 2004 scan or authenticated source verifies the choices. |
| 2005 FNH Paper 01 | Seven-page scan ends at Q53 with “GO ON TO THE NEXT PAGE”. Reupload was byte-identical. CXC's [official 2005 report](https://www.cxc.org/SiteAssets/2005SchoolReports/CSEC_2005_FoodandNutrition.pdf) confirms **60 original Paper 01 items**, but supplies neither the remaining questions nor an official key. | Obtain the missing original eighth question page and transcribe Q54–60 directly. Do not borrow seven items from 2014 or 2015. |
| 2018 FNH Paper 01 | All 60 numbered questions transcribed, but original cover absent. | Verify qualification and exam duration from an authentic cover or contemporaneous CXC source. |
| 2020 FNH Paper 01 | All 60 numbered questions transcribed, but original cover absent. | Verify exam metadata from an authentic cover or CXC source. |
| 2016 FNH Paper 01 | Original cover identifies 2016; one internal footer says 2014. | Verify page-level scan assembly and avoid incorrectly substituting 2014 page text. |
| 2026 FNH Paper 01 | Q11 label says “Net Weight: 4” without a unit; Q56 nutrition label prints “Sodium 850 g, 37%”. | Keep printed source text for historical fidelity, document suspected errors, do not silently alter original numbers. |

## Cross-year evidence for 2004 Questions 46–47

The cropped 2004 Question 46–47 page prints the two question stems and a reference to the shared choices, **but not the shared list itself**. The provided **2005 Paper 01, PDF page 7, Questions 52–53** repeats the same two spending-sense questions with the following four options in their original 2005 order:

- (A) Buying in bulk
- (B) Comparative shopping
- (C) Preparing a shopping list
- (D) Investigating new products

A separate publicly reproduced **2015** exam also contains this exact paired wording and option order ([Studocu 2015 source](https://www.studocu.com/row/document/university-of-technology-jamaica/master-of-science-in-public-health-nutrition/toaz-paper-is-for-cxc-students/29471792), Questions 46–47; [alternate 2015 reproduction](https://www.scribd.com/document/632554691/2015-Jun-CSEC-FN-P1-with-ans)). This two-year agreement is a useful transcription lead, **not an authenticated answer-list page for the 2004 sitting**.

The 2004 draft now stores these in `crossSourceCandidateOptions` with `crossSourceCandidateProvenance.verifiedFor2004:false`. Its actual `options` remain `null`, `sourceChecked:false`, and `officialKeyVerified:false` for both questions. The 2004 question browser therefore remains at 58 of 60 items; scored examinations stay blocked. Do not use handwriting or unverified uploads as official key evidence.

## Official 2005 Paper 01 item-count evidence

The [CXC May/June 2005 examiner report](https://www.cxc.org/SiteAssets/2005SchoolReports/CSEC_2005_FoodandNutrition.pdf) confirms the 2005 Food and Nutrition General Proficiency Paper 01 was worth **60 marks and had 60 multiple-choice questions**. It does not present the original question statements, source diagrams, or key. Hence the original scan's last printed question Q53 gives **53 transcribed / 60 expected**, not a 53-question exam. The absent seven are unresolved, and the reader should explicitly show that limitation.

## Resolved identity issue

**2014 May/June FNH Paper 01:** the user explicitly confirmed that 2014 is the correct year on 14 October 2026. That confirmation is retained in the source record. The PDF's question overlap with 2005 is not used to reclassify its year or reconstruct the missing 2005 page. No official marking keys are inferred from handwritten selections.

## Current baseline and release requirements

- The original `FNH.zip` contains 34 distinct named historical PDFs; one labelled 2021 Paper 01 is an incorrect-subject document, leaving **33 subject-matching documents**. The newly uploaded incorrectly named 2023 paper is tracked separately and **does not change this count**.
- Paper 01 inventory includes **15 subject-matching documents** with **893 transcribed numbered questions**, including the 53 surviving 2005 items. **891** are eligible for **unscored** source review. The only excluded records are 2004 Q46–47.
- The historical Paper 01 reader saves selections locally and awards **no marks**. It must never reveal tentative keys as official answers, send result notifications, or affect parent/student performance reports.
- SVG illustrations from scanned papers are **source-style redraws** until manually checked at full resolution against each original page. Do not label them “exact” before cross-device, contrast, textual-fidelity, and figure-geometry review.
- Release a scored historical Paper 01 only when all 60 original questions and four choices have been authenticated, original source diagrams are verified, separately evidenced official answer keys are independently reviewed, the answer-key gate passes, and a timed simulation is tested across desktop, tablet, and mobile.
- Correctly transcribed historical Paper 02 examinations use **SPARK-authored reference marking guidance**, not official CXC marking schemes. Do not describe those marking points as official.

## Intake procedure for new PDFs

1. Open the **actual cover**, rotate the image as needed, and read the CXC subject, Paper 01/02, examination session/year, form/test code and time allowance.
2. Check question pages and end-of-test page to confirm sequence/completeness. A bare filename is never subject or year evidence.
3. Hash the supplied source and record a subject-identity decision. Reject wrong-subject or wrong-year sources **before** adding to historical inventory or question banks.
4. Preserve original wording and separate any suspected typographical or scientific issue from what the source actually printed.
5. Commit transcription and figure QA on the dedicated development branch. Keep scored release gated until evidence-based marking and visual QA are complete.
