# POB historical Paper 2 — Batch 02 (10 source PDFs)

**Scope:** User-supplied `POB.zip`, historical Paper 2 PDFs, May/June 2005–2011, January/May–June 2019 and May/June 2021.

**Release state:** Transcription review only, **zero** released to scored practice. The 78 source pages have been rendered for page-by-page review; paper identity is protected by SHA-256. Reproduce the source-linked drafts using `tools/build-pob-historical-batch02.py`.

| Source sitting | PDF pages | Complete numbered question blocks isolated | Source limitation |
| --- | ---: | ---: | --- |
| 2005 May/June | 5 | 0 | Image-only; visual transcription required |
| 2006 May/June | 6 | 0 | Partial/noisy text layer; cannot reliably isolate full questions |
| 2007 May/June | 6 | 0 | Image-only; visual transcription required |
| 2008 May/June | 4 | 0 | Image-only; visual transcription required |
| 2009 May/June | 4 | 7 | Seven text-layer questions; 20 mark tokens each after spacing normalisation |
| 2010 May/June | 4 | 7 | Seven text-layer questions; 20 mark tokens each |
| 2011 May/June | 4 | 7 | Seven text-layer questions; 20 mark tokens each |
| 2019 January | 14 | 0 | Cover text present, question content mostly scanned |
| 2019 May/June | 15 | 0 | Image-only; visual transcription required |
| 2021 May/June | 16 | 0 | Image-only; visual transcription required |
| **Total** | **78** | **21** | **Seven require full visual transcription** |

## Source-specific QA notes

1. Source cover pages were rendered to verify the stated sitting and original exam directions. Earlier papers did **not** all follow the five-compulsory-question pattern. The 2005–07 covers direct candidates to answer all Section I questions plus three Section II questions; 2008–09 cover instructions require three Section I and two Section II; 2010–11 direct three Section I, one Section II and one Section III. From 2019 the covers state five compulsory questions.
2. The text-readable 2009–11 papers each contain seven sequential numbered question blocks with source-page attribution. The PDF extraction for **2009 Question 1** splits a printed `(6 marks)` token into `(6 mar ks)`. This is normalised **only for the token-sum check**. The original draft text remains unchanged, and a source page render confirms the six-mark allocation.
3. The 2006 PDF contains fragments of source text but does not expose enough to verify any **complete** question. It is not falsely counted as transcribed.
4. The seven incomplete sources are preserved as per-page draft text records with full rendered page images in the external review bundle. Image rendering is not equivalent to transcription, answer-key verification or syllabus-era review.
5. The raw image-backed PDFs are **not** committed to GitHub. The source files are in the user-supplied ZIP, and the reproduction script checks each input by exact filename and source bytes.

## What is not complete

- Full visual wording and diagram QA on all ten sources.
- Transcription of the seven scanned or partial-text papers.
- Authenticated official CXC question copies, accepted answers and mark schemes.
- Alternative valid answer calibration, exam scoring and end-to-end multi-device simulator QA.

**Batch counts:** Batch 01 and Batch 02 together cover **20 distinct historical Paper 2 source PDFs**, but only **81 numbered question bodies** have text-layer structures extracted. Do not confuse extracted text with verified content or show any of these in live scored practice.

## How to reproduce

```bash
python -m pip install pymupdf
python tools/build-pob-historical-batch02.py /path/to/POB.zip --out-dir /tmp/pob-batch02
```

The output contains ten `POB-P2-YYYY-SITTING.json` draft records, each with source SHA-256, page counts, source text and release-status flags, plus `manifest.json`. It is intentionally not a working paper bank until each paper passes the historical release gate.
