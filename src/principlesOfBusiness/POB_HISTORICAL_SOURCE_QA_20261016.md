# POB historical source QA: first source-backed pass (16 October 2026)

Input: user-supplied `POB.zip` from the ChatGPT file library. Exam PDFs were opened directly with PyMuPDF and counted; filenames were matched against the historical inventory. **This audit establishes source presence and machine-text readiness, not answer correctness.**

| Paper | Files | Pages | Substantial extractable text (at least 1,000 characters) | Needs visual transcription or text-layer repair |
| --- | ---: | ---: | ---: | ---: |
| Paper 1 | 21 | 193 | 14 | 7 |
| Paper 2 | 25 | 275 | 15 | 10 |
| **Historical total** | **46** | **468** | **29** | **17** |

The archive also contains one 138-page syllabus PDF with a substantial text layer, for **47 PDFs total**.

## Important findings

- The original archive is now located and its PDF files are accessible. This is a stronger basis than the previous filename-only inventory.
- Low-text Paper 1 sources: 2016 MJ, 2018 MJ, 2019 MJ, 2020 MJ, 2021 MJ, 2022 JAN, 2024 MJ.
- Low-text Paper 2 sources: 2005 MJ, 2006 MJ (977 extracted characters, below threshold), 2007 MJ, 2008 MJ, 2019 MJ, 2021 MJ, 2023 MJ, 2024 MJ, 2025 JAN, 2026 JAN.
- `CSEC_Principles_of_Business_P2_2024_JAN.pdf` has five sequential question headings and a machine-readable text layer, making it a candidate for first draft extraction, **not yet for release**.
- Historical sitting formats and later syllabus formats must not be silently conflated.
- No verified official answer keys or marking schemes were established in this pass. The historical simulator release count remains **zero**.

## How to continue safely

Run `python tools/audit-pob-archive.py /path/to/POB.zip --out pob-source-manifest.json` to record file hashes and text-layer status. Run `python tools/draft-pob-paper2-transcription.py /path/to/POB.zip CSEC_Principles_of_Business_P2_2024_JAN.pdf --out draft-p2-2024-jan.json` to prepare unverified question text. Both outputs must be checked against rendered original pages, including diagrams and mark allocations. Verify provenance, question text, official marking guidance, expected answers, and syllabus-era mapping before changing `simulatorReady`.

**Release decision:** blocked. Do not generate or label answers as official when the archive contains no verified marking key.
