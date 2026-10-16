# POB Historical Archive: PDF Text Extraction Audit

Source: user-provided `POB.zip` (46 historical Paper 01/02 PDFs + CXC 08/G/SYLL 17 syllabus). Audited with PyMuPDF using the original PDF pages, without OCR.

**46 historical PDFs, 468 total pages, 192 pages with fewer than 50 extractable text characters.** This does not mean 192 pages are blank; many are image-only scans.

## Document-level source readiness

| Source PDF stem | Pages | Extractable characters | Pages requiring image-level review* |
| --- | ---: | ---: | ---: |
| `P1_2002_MJ` | 9 | 16,734 | 0 |
| `P1_2003_MJ` | 8 | 16,841 | 0 |
| `P1_2004_MJ` | 8 | 13,640 | 0 |
| `P1_2005_MJ` | 10 | 18,620 | 0 |
| `P1_2006_MJ` | 8 | 17,204 | 0 |
| `P1_2007_MJ` | 8 | 14,909 | 0 |
| `P1_2008_MJ` | 8 | 16,170 | 0 |
| `P1_2011_MJ` | 8 | 15,192 | 0 |
| `P1_2012_MJ` | 9 | 15,438 | 0 |
| `P1_2014_MJ` | 9 | 16,045 | 0 |
| `P1_2015_MJ` | 9 | 14,157 | 0 |
| `P1_2016_MJ` | 8 | 0 | 8 |
| `P1_2017_MJ` | 10 | 15,895 | 0 |
| `P1_2018_MJ` | 9 | 0 | 9 |
| `P1_2019_MJ` | 15 | 0 | 15 |
| `P1_2020_JAN` | 8 | 15,013 | 0 |
| `P1_2020_MJ` | 9 | 0 | 9 |
| `P1_2021_MJ` | 11 | 385 | 4 |
| `P1_2022_JAN` | 9 | 207 | 9 |
| `P1_2023_JAN` | 9 | 15,606 | 0 |
| `P1_2024_MJ` | 11 | 0 | 11 |
| `P2_2005_MJ` | 5 | 0 | 5 |
| `P2_2006_MJ` | 6 | 977 | 5 |
| `P2_2007_MJ` | 6 | 0 | 6 |
| `P2_2008_MJ` | 4 | 0 | 4 |
| `P2_2009_MJ` | 4 | 4,778 | 0 |
| `P2_2010_MJ` | 4 | 4,693 | 0 |
| `P2_2011_MJ` | 4 | 4,095 | 0 |
| `P2_2012_MJ` | 5 | 5,570 | 0 |
| `P2_2013_MJ` | 5 | 5,509 | 0 |
| `P2_2014_MJ` | 5 | 5,428 | 0 |
| `P2_2015_MJ` | 16 | 40,233 | 0 |
| `P2_2016_MJ` | 18 | 38,926 | 0 |
| `P2_2017_MJ` | 16 | 39,733 | 0 |
| `P2_2018_MJ` | 14 | 32,062 | 0 |
| `P2_2019_JAN` | 14 | 1,143 | 13 |
| `P2_2019_MJ` | 15 | 0 | 15 |
| `P2_2021_MJ` | 16 | 0 | 16 |
| `P2_2022_JAN` | 20 | 41,997 | 2 |
| `P2_2022_MJ` | 13 | 33,533 | 0 |
| `P2_2023_JAN` | 24 | 58,330 | 2 |
| `P2_2023_MJ` | 17 | 0 | 17 |
| `P2_2024_JAN` | 2 | 3,219 | 0 |
| `P2_2024_MJ` | 16 | 0 | 16 |
| `P2_2025_JAN` | 20 | 0 | 20 |
| `P2_2026_JAN` | 6 | 0 | 6 |

*The threshold flags pages with fewer than 50 characters of extractable text, not proven absence of content. Any historic question with complex tables/diagrams or suspicious parsed layout requires visual review even when text extraction succeeds.*

## Historical ingestion policy

1. **Prioritise reliable text** for initial question and marking-scheme review, but compare the original rendered PDF page before marking a paper as verified.
2. **Visually review image-only PDF pages** (particularly Paper 1 MJ 2016, 2018, 2019, MJ 2020, MJ 2024 and many recent Paper 2 scans); do not assume automated PDF text extraction yielded real questions.
3. **Distinguish exam eras**. Original 2002–2018 documents are valuable historic study resources but can have examination arrangements that differ from the supplied effective-2019 syllabus.
4. **No guessed answer keys.** An unclear answer, illustration or marking instruction remains unverified until cross-checked with credible sources and independent internal calculations, not a guessed likely option.
5. **Source identity** must include paper number, year, January/May–June sitting, provenance, page, transcribed status, verified answers and reviewed artwork.
6. **Paper 2** requires a valid mark-by-mark rubric. Original past-paper questions must never be described as automatically graded before scoring and feedback have been calibrated.
7. These PDFs are supplied for private course development, not automatically cleared for public distribution; respect source copyrights and permissions before exposing full reproductions.

## Prioritised review batches

- **Batch A, extractable Paper 1:** 2002–2008, 2011–2015, 2017, January 2020 and January 2023.
- **Batch B, scanned Paper 1:** May/June 2016, 2018–2019, May/June 2020–2021, January 2022 and May/June 2024.
- **Batch C, text-rich Paper 2:** May/June 2009–2018; January 2022, May/June 2022 and January 2023.
- **Batch D, scanned Paper 2:** May/June 2005–2008, January/May–June 2019, 2021, 2023, 2024 and January 2025/2026.

### Release requirement

The current `pobHistoricalInventory.js` intentionally keeps the 46 source papers `simulatorReady:false`. Do not change that status until the corresponding entire paper passes formatting, text, diagram, key, explanations, marking and syllabus-era QA.
