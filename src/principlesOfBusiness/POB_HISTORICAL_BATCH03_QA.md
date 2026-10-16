# POB historical Batch 03: remaining five Paper 2 + first five Paper 1 PDFs

**Status:** original user-provided `POB.zip` inspected, ten SHA-256 source identities recorded, 104 source pages rendered into a downloadable review bundle. **No historical source is approved for scored simulation.**

| Historical PDF | Pages | Extraction evidence | Required next check |
| --- | ---: | --- | --- |
| 2023 May/June Paper 2 | 17 | Image-only, zero readable question text | Visual transcription of every question, figure and printed mark |
| 2024 January Paper 2 | 2 | Five headings in a compiled source; previous structured draft available | Verify authentic source, model answers and marking scheme |
| 2024 May/June Paper 2 | 16 | Image-only | Visual transcription, figures, answer-key QA |
| 2025 January Paper 2 | 20 | Image-only | Visual transcription, figures, answer-key QA |
| 2026 January Paper 2 | 6 | Image-only; front cover says **HYBRID** | Preserve this special sitting format and visually verify all questions |
| 2002 May/June Paper 1 | 9 | Two-column draft; 45 distinct heading-number candidates | Recover text-order gaps, options and diagrams by page comparison |
| 2003 May/June Paper 1 | 8 | Two-column draft; 51 distinct heading-number candidates | Recover text-order gaps, options and diagrams |
| 2004 May/June Paper 1 | 8 | Two-column draft; 40 distinct heading-number candidates | Repair imperfect first-page text and column order |
| 2005 May/June Paper 1 | 10 | Two-column draft; 52 distinct heading-number candidates | Remove exam-instruction false matches, recover omitted headings |
| 2006 May/June Paper 1 | 8 | Two-column draft; 49 distinct heading-number candidates | Recover missing/garbled headings, options and images |
| **Total** | **104** | **Five P1 page-column drafts, four scanned P2 records, one prior P2 compiled draft** | **Full transcription and answer-key QA** |

## What was actually inspected

- PDFs were opened from the original supplied archive. Each PDF's bytes were hashed using SHA-256 and its page count checked.
- All ten opening pages were rendered into a visual contact sheet to check document identity and layout. The **January 2026 Paper 2** supplied cover identifies it as **Hybrid**. Do not silently map it to a standard-year simulator.
- The five older Paper 1 papers use two-column layouts and visibly contain original objective questions. PyMuPDF's raw reading order is not dependable enough to reconstruct all 60 questions accurately. A page-and-column extraction keeps the source text and conservative candidate headings. **237 distinct heading-number signals across these five papers are not 237 verified questions** and may include false positives, particularly on instruction pages.
- All 104 pages were rendered in the external review bundle, but complete page-by-page human/visual transcription QA is **not** claimed.
- Four Paper 2 copies have no question-bearing text layer. No missing content has been inferred or generated. January 2024 Paper 2 retains the previously visually checked but ungraded draft, not an authenticated official examination.

## Reproducible source extraction

```bash
python -m pip install pymupdf
python tools/build-pob-historical-batch03.py /path/to/POB.zip --out-dir /tmp/pob-batch03 --render-pages
```

The tool emits ten `POB-P1/P2-YYYY-SITTING.json` page-attributed drafts, a batch manifest, and optional per-page JPEG source references. Do not commit user-supplied PDF binaries or treat unverified extraction as official CXC material.

## Cumulative tracking, not a release certificate

**Batch 1:** 10 P2 sources, 136 pages, 60 provisional numbered question blocks.

**Batch 2:** 10 P2 sources, 78 pages, 21 provisional numbered question blocks.

**Batch 3:** 5 P2 and 5 P1 sources, 104 pages. The already-created January 2024 P2 draft has five question headings; Paper 1 remains column/text-cue review material, **not** a complete MCQ bank.

**Total inventoried through batches:** 30 historical PDFs (all 25 Paper 2 and five of 21 Paper 1), 318 historical exam pages. Still to process: 16 Paper 1 PDFs, 150 pages. Verified historical answer keys and published historical scored simulators: **zero**.

Verification cannot be completed by guessing missing mark schemes, writing new answers without comparison, or treating the filename alone as official source authentication. Continue the remaining P1 sources in groups of 10 then six, then complete diagram, accepted-answer, official-paper identity and rubric review across all batches.
