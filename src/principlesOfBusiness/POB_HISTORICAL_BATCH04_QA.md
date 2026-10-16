# Historical POB Paper 1 Batch 04: ten PDF source audit

**Scope:** ten PDF files from user-supplied `POB.zip`, labelled May/June 2007, 2008, 2011, 2012, and 2014–2019.

**Release status:** page-linked extraction drafts only. **None** of these files is a validated MCQ question bank or an answer key; **none** is available for scored practice.

## Source-backed findings

| PDF named as Paper 1 | Source pages | Extractable text | Distinct numbered text cues | Source review finding |
| --- | ---: | --- | ---: | --- |
| 2007 MJ | 8 | Yes | 47 | Two-column reading-order and option verification needed |
| 2008 MJ | 8 | Yes | 42 | Two-column reading-order and option verification needed |
| 2011 MJ | 8 | Yes | 46 | Source contains redistribution watermark; verify provenance |
| 2012 MJ | 9 | Yes | 56 | Text layer contains noisy spacing and reading-order artifacts |
| 2014 MJ | 9 | Yes | 0 | PDF content uses 180° page rotation; line cues do not parse reliably |
| 2015 MJ | 9 | Yes | 54 | Option layout and missing headings require visual checking |
| 2016 MJ | 8 | No | 0 | Scanned pages and mixed rotation; visual transcription required |
| 2017 MJ | 10 | Yes | 37 | Third-party watermark visible; source/option QA required |
| 2018 MJ | 9 | No | 0 | Scanned image pages; visual transcription required |
| **2019 MJ** | **15** | **No** | **0** | **WRONG PAPER: supplied PDF cover reads Paper 02, test code 01240020** |
| **Total** | **93** | **Seven usable text layers** | **282 unverified cues** | **Only nine sources are Paper 1 by observed content** |

**Critical identification correction:** `CSEC_Principles_of_Business_P1_2019_MJ.pdf` is mislabelled. The rendered source cover clearly identifies **Principles of Business Paper 02**, May/June 2019, test code **01240020**, two-hour duration, five compulsory questions. It must never be treated as a historical Paper 01 question bank. A separate `CSEC_Principles_of_Business_P2_2019_MJ.pdf` is already inventoried and has a **different SHA-256 fingerprint**; they are distinct supplied files for the same exam sitting, not bit-for-bit duplicates.

The 282 detected question-number cues are merely text-layer hints. They do **not** establish 282 accurate MCQs. Some source copies omit text, place columns out of reading order or have numbered instructions that can be mistaken for questions. No new answers or option letters were inferred.

## Delivery and reproduction

Run `python tools/build-pob-historical-batch04.py /path/to/POB.zip --out-dir /tmp/pob-batch04 --render-pages`.

The script recreates ten full source-linked JSON review drafts (including page/column text, source SHA-256, rotation metadata and uncertain heading cues) plus an inventory manifest and, optionally, JPEG images of all **93 source pages**. The user-facing review archive includes those resources and contact sheets. The raw PDF binaries are not checked into GitHub.

## Cumulative source processing

| Batch | PDFs | Source pages | Notes |
| --- | ---: | ---: | --- |
| 01 | 10 | 136 | P2, draft question segmentation |
| 02 | 10 | 78 | P2, 7 scans/partial text sources |
| 03 | 10 | 104 | 5 P2 + 5 P1 source-labelled files |
| 04 | 10 | 93 | 10 P1-labelled files, **one actually P2** |
| **Total** | **40/46** | **411/468** | **Zero historical papers released** |

Six historical Paper 1-labelled PDFs remain for source processing (57 PDF pages). The 2019 mislabeled source creates an additional **Paper 1 content gap**, which must be resolved by obtaining the actual Paper 01 copy rather than converting the supplied Paper 02 into an MCQ test.

## Remaining verification gates

Each historical paper requires an authenticated source, complete page-by-page question and figure transcription, four verified options per Paper 1 MCQ, authoritative answer-key checks, original sitting rules, and calibrated browser grading. Do not mark `simulatorReady` true or provide official-scored results merely because extraction or tests pass. The CXC source has not been independently authenticated and no full official marking key has been supplied.
