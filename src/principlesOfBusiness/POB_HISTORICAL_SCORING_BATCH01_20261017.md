# POB historical automatic scoring: batch 1 of 4 (15 PDFs)

Date: 2026-10-17. Branch: `feat/pob-historical-scoring-batch-01-15-v1`.

## Scope and evidence

Owner approval in merged PR #70 covers **46 supplied PDF source files**, not the validity of their keys or rubrics. This pass opened the original bytes in the user-supplied `POB.zip`, calculated source SHA-256, extracted text diagnostics and compared selected original covers and instructions to rendered pages. Archive totals: **46 files, 468 pages**, with 192 pages below 50 characters in the initial extraction pass. These are *flags*, not automatically lost question pages.

The 46 source files are divided deterministically into four working batches of **15, 15, 15, 1**. Actual paper types: 20 genuine Paper 1 and 26 Paper 2, including the 2019 MJ P1-named source that is actually P2. Existing historical release gates remain in force.

### Batch 1 source records

| Sitting | Original PDF pages | Low-text pages | Exam rules indicated by source | Key and complete rubric |
| --- | ---: | ---: | --- | --- |
| P1 Jan 2023 | 9 | 0 | 60 objective items / 75 minutes | Not verified |
| P2 MJ 2009 | 4 | 0 | Q1–3, one of Q4/5, one of Q6/7 | Not verified |
| P2 MJ 2010 | 4 | 0 | Q1–3, one of Q4/5, one of Q6/7 | Not verified |
| P2 MJ 2011 | 4 | 0 | Q1–3, one of Q4/5, one of Q6/7 | Not verified |
| P2 MJ 2012 | 5 | 0 | Q1–3, one of Q4/5, one of Q6/7 | Not verified |
| P2 MJ 2013 | 5 | 0 | Q1–3, one of Q4/5, one of Q6/7 | Not verified |
| P2 MJ 2014 | 5 | 0 | Q1–3, one of Q4/5, one of Q6/7 | Not verified |
| P2 MJ 2015 | 16 | 0 | Q1–3, one of Q4/5, one of Q6/7 | Not verified |
| P2 MJ 2016 | 18 | 0 | Q1–3, one of Q4/5, one of Q6/7 | Not verified |
| P2 MJ 2017 | 16 | 0 | Q1–5 compulsory | Not verified |
| P2 MJ 2018 | 14 | 0 | Q1–5 compulsory | Not verified |
| P2 Jan 2022 | 20 | 2 | Q1–5 compulsory | Not verified |
| P2 MJ 2022 | 13 | 0 | Q1–5 compulsory | Not verified |
| P2 Jan 2023 | 24 | 2 | Q1–5 compulsory | Not verified |
| P2 Jan 2024 | 2 | 0 | **Derivative typed transcription, NOT the original examination booklet** | Not verified |
| **Total** | **159** | **4** | **100-mark Paper 2 candidate maximum** | **0 ready** |

### Source findings

1. Original printed Paper 2 cover rules vary by year. The marking candidate maximum is five 20-mark questions (100), **not all seven selectable questions** for older sittings. `validatePobHistoricalP2Selection` tests both original selection patterns, repeated choices, wrong question numbers, and unsupported records.
2. Rendered and checked the four low-text PDF pages: January 2022 pages 2 and 19, January 2023 pages 2 and 23. Each is a **DO NOT WRITE ON THIS PAGE** sheet. All four extraction flags are resolved as non-question sheets. This does **not** certify the remaining 155 pages as visually transcribed.
3. The supplied January 2024 Paper 2 is a **two-page typed reconstruction**, without the original CXC paper cover and source formatting. It is unsafe to authenticate the source or scoring scheme as a complete historical official booklet using this file alone. It is blocked by the source-aware scoring gate. The prior five-question draft remains a learning reference only.
4. The May/June 2017 text extraction has a previously documented missing 4-mark token in Question 2; rendered source confirms the allocation. Do not build a rubric from regex mark totals alone.
5. The 2019 official **specimen** Paper 2 marking scheme in the syllabus is valid for that specimen, not a substitute for any of these historical sittings' marking schemes.

### What remains for genuine live scoring

- Complete, verified, page-checked questions and diagrams for **each paper**.
- Individual **Paper 1 answers** supported by an official key or internally documented academic adjudication with source and review evidence. MCQ scoring must not infer answers from missing historical keys.
- Paper 2 **part-by-part criteria and exact mark caps**, alternative correct responses, and validated answer/mark-source evidence per sitting. Subject reports are useful cross-checks, not complete official marking schemes.
- Calibration of the secure two-pass written-answer marker against adjudicated candidate responses with false-credit and missed-credit metrics; worker/database, permissions, UI, mobile/tablet, navy-dark and result persistence checks.
- Exact source proof, any copyright/public distribution permissions, version-safe exam instructions, and explicit production activation after academic QA.

Status after batch: **15/15 source files inspected for text extraction, 4/4 low-text pages visually resolved, 0/15 historical exam files approved for scored publication.** No unverified answer keys were invented. The POB subject remains `enabled:false,status:"draft"` on `main`.

## Reproduction

```bash
python -m pip install pymupdf
python tools/audit-pob-scoring-batches.py /path/to/POB.zip --out /tmp/pob-sources.json
npx jest pobHistoricalScoringBatches.test.js --runInBand
```

The source audit compares all 46 supplied PDFs against the trusted SHA-256 approval manifest. The script **reports** readiness, not exam results. The historical marking endpoint must continue resolving trusted bank IDs and verified server-side rubrics.
