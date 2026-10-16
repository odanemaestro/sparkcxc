# Historical POB Paper 2 — batch 01 of 10 source PDFs

**Status:** source-backed page-linked transcription drafts, **NOT** verified simulator papers.
**Input:** original user-provided `POB.zip`. All source file hashes are in
`data/pobHistoricalP2Batch01.js`; reproducible full-text drafts come from
`tools/build-pob-historical-batch01.py`.

| Sitting | PDF pages | Source question bodies | Real sitting rule | Text mark QA |
| --- | ---: | ---: | --- | --- |
| 2012 May/June | 5 | 7 | Q1–Q3 compulsory; Q4 or Q5; Q6 or Q7 | All 7 show 20 marks |
| 2013 May/June | 5 | 7 | Three compulsory + two choices | All 7 show 20 marks |
| 2014 May/June | 5 | 7 | Three compulsory + two choices | All 7 show 20 marks |
| 2015 May/June | 16 | 7 | Three compulsory + two choices | All 7 show 20 marks |
| 2016 May/June | 18 | 7 | Three compulsory + two choices | All 7 show 20 marks |
| 2017 May/June | 16 | 5 | All five compulsory | Question 2 text layer misses one 4-mark token |
| 2018 May/June | 14 | 5 | All five compulsory | All 5 show 20 marks |
| 2022 January | 20 | 5 | All five compulsory | All 5 show 20 marks |
| 2022 May/June | 13 | 5 | All five compulsory | All 5 show 20 marks |
| 2023 January | 24 | 5 | All five compulsory | All 5 show 20 marks |
| **Batch total** | **136** | **60** | 50 candidate answers under each year's rules | 59/60 plain-text mark sums show 20 |

Each seven-question older paper requires only five answers, because two
question pairs are alternatives. **Do not** sum all seven questions into
a candidate's maximum score.

## Verification completed

1. All ten original PDF filenames were found in the supplied ZIP and SHA-256
   fingerprints calculated from their actual bytes.
2. Each PDF was opened and its page count recorded, not inferred from its name.
3. A source-position parser isolated sequentially numbered question bodies and
   preserved each question's source page references and raw extracted text.
4. The first question page of each PDF was rendered to a visual contact sheet
   to confirm the starting location and format.
5. **2017 Question 2:** the PDF text layer concatenates a 4-mark label into
   another word, leaving only 16 readable marks in regex extraction. Source
   page 5 was rendered and visually checked. It visibly includes **two
   distinct 4-mark allocations**, so the missing 4 marks are recorded as a
   visual mark recovery while the original text-layer anomaly stays flagged.

## Not yet verified

- The **complete wording** and all figure/table positions across every page.
  Extraction can retain writing-area lines, page headers and layer artifacts.
- The authenticity of each supplied copy against an official CXC original.
- Official answer keys, criterion-level marking schemes, alternative correct
  responses, and fair simulated automatic marks.
- Digital redraw and labelling of any figures, tables or diagrams.
- End-to-end browser practice, review and result accuracy for each year.

These ten drafts are deliberately **not imported into scored student practice**.
The existing historical release gate requires all the above checks, including
answer correctness and marking scheme QA. The student-visible historical
simulator count remains **zero**.

## Reproduce the batch

```bash
python -m pip install pymupdf
python tools/build-pob-historical-batch01.py /path/to/POB.zip --out-dir /tmp/pob-batch01
```

Produces ten `POB-P2-YYYY-SITTING.json` records with full unverified
question text, page links, hashes and source QA flags, plus a manifest.
The input ZIP is not committed to the source repository. Do not call these
outputs official answer keys or mark them simulator-ready.

**Next ten-paper batch:** proceed with remaining P2 sources or the first ten
Paper 1 sources, keeping the same source/hash/visual/answer-key release gates.
