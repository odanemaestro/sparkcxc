# POB Historical Batch 05: final six Paper 1-labelled source PDFs

**Date:** 16 October 2026. **PR:** #67 (feature branch only).  
**Status:** Original-source recovery completed; academic and answer-key verification **not** completed.

This final archive batch includes **six source PDFs, 57 PDF pages, 57 rendered JPEG source pages, six full JSON review drafts and 360 question verification slots**. These slots are placeholders for question-by-question QA, NOT validated MCQs.

| Supplied Paper 1 file | PDF pages | Source text-layer heading cues | Source-specific finding |
| --- | ---: | ---: | --- |
| 2020 January | 8 | 58/60 | Missing text-layer cues **Q22 on PDF page 4** and **Q41 on page 6** are visually present. One extra false Q1 cue also appears; wording/options still need checking |
| 2020 May/June | 9 | 0 | Image-only scanned PDF; manual visual transcription required |
| 2021 May/June | 11 | 0 | Image-backed pages; text layer primarily a redistribution watermark |
| 2022 January | 9 | 0 | Image-backed CamScanner copy, text layer contains scanner labels, not questions |
| 2023 January | 9 | 60/60 | Sequential numbered headings found in two-column text. Only 57 of 60 provisional fragments show all four labelled options in the text layer. No keys verified |
| 2024 May/June | 11 | 0 | Image-only copy with some handwritten markings; needs clean source comparison |
| **Total** | **57** | **118 heading-number cues** | **No verified MCQ answers** |

## Evidence and precautions

- All six PDF files were opened directly from the original user-provided `POB.zip`, and byte-level SHA-256 fingerprints are retained. Their first three source pages were rendered for visual identification; all **57 pages** are available as JPG references in the download bundle.
- The six cover pages identify **Paper 01**. This confirms the supplied covers' paper numbers, **not** that the documents are authenticated original CXC copies.
- January 2020: Questions 22 and 41 are visible on pages 4 and 6 respectively, notwithstanding absent regex matches. Preserve exact original source pages, not guessed answer keys.
- January 2023: 60 sequential number cues make this a promising transcription candidate, but line wrapping, missing option-label cues, diagrams and answer-key evidence prevent graded publication.
- Watermarked, scan-derived and written-on copies need additional source provenance review; the extracted text is never substituted for a verified scan or answer key.
- **No answer-key or marking-scheme PDF is present in the supplied ZIP.** No official grades can be inferred from the question booklets.

## Five-batch source-accounting reconciliation

| Batch | Original PDF files checked | Original exam pages |
| --- | ---: | ---: |
| 01: historical Paper 2 | 10 | 136 |
| 02: historical Paper 2 | 10 | 78 |
| 03: five Paper 2, five Paper 1 | 10 | 104 |
| 04: ten Paper 1-labelled PDFs | 10 | 93 |
| 05: six remaining Paper 1 PDFs | 6 | 57 |
| **Archive total** | **46/46** | **468/468** |

**Important archive identification correction:** `CSEC_Principles_of_Business_P1_2019_MJ.pdf` is actually a **Paper 02** according to the visible cover (test code **01240020**). Therefore, although the ZIP includes 21 files labelled P1 and 25 labelled P2, it contains only **20 cover-confirmed Paper 1 source copies** and **26 Paper 2 source copies**. The actual May/June 2019 Paper 1 must be obtained separately. Do not present 21/21 as historically accurate P1 availability.

The full source inventory is now accounted for. **This is NOT equivalent to full question-bank implementation:** complete transcription, visual reproduction of diagrams, four-choice verification, authoritative answer keys, per-criterion historical Paper 2 marking schemes, semantic grading calibration, syllabus-era exam configuration and device/browser QA are still blocked.

## Reproduction and release protection

```bash
python -m pip install pymupdf
python tools/build-pob-historical-batch05.py /path/to/POB.zip \
  --out-dir /tmp/pob-batch05 --render-pages
```

The batch produces six source-linked JSON drafts and a manifest, with 60 explicit ungraded QA slots in each draft. `data/pobHistoricalMcqReleaseGate.js` additionally requires 60 distinct verified question stems, four verified choices per question, correct options with documentary evidence, matching page references and diagram QA, as well as the established historical academic release gate. No automatic promotion of extracted content is allowed.

**Release decision: blocked.** Course remains unpublished, PR #67 remains open, and `main` must stay untouched until user approval.
