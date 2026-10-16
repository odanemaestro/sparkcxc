# Principles of Business: guarded merge acceptance record (16 October 2026)

**Requested by product owner:** review academic answer-key issues, test the implementation, then integrate into `main`.

## What is safe to integrate

- CSEC Principles of Business draft course architecture, its ten-section study content, 119 mapped objectives and initial tools.
- Original SPARK 60-item Paper 1, original Paper 2 learning/response workspace, SBA draft workspace, and specimen 2019 Paper 1.
- All **60** 2019 CXC specimen Paper 1 questions, the published key, six independent ten-item checkpoints and one full **75-minute 60-item** practice.
- Two-score academic review: **published CXC-key comparison** and **uncontested learning score excluding specimen questions 38, 51 and 53**. Retain the original printed answers, do not invent official corrections.
- Original filename-based 46-PDF historical archive accounting. Reclassified May/June 2019 alternative **Paper 02** (original filename mistakenly says P1).
- First **ten January 2023 P1 MCQs visually transcribed** with all four choices, original page provenance and **null answer keys**. No unsupported grading or simulator publication.
- Automated course/source release audit: must preserve `enabled:false`, `status:"draft"`, and `releaseApproved:false`.

## QA performed and its precise limits

- Repository GitHub Actions: full Jest regression suite, database marker verification and SPARK build (required to pass on this exact head SHA before merge).
- React DOM smoke tests exercised the POB exam navigator and practice selections at virtual viewport sizes **320 × 720**, **390 × 844**, **768 × 1024**, **1366 × 768**, **1920 × 1080**. The CSS audit checks two responsive breakpoints, 44px navigation targets, mobile scroll containment, focus visibility, dark theme tokens and reduced-motion rules.
- Specimen scoring and source protection tested the printed 60-letter CXC key, source fingerprints, the three disputes, actual question submission and local saved-attempt behavior.
- **Limit:** jsdom viewport smoke tests do not render pixels or replace actual screenshots, assistive technology checks, browser engine tests, dark-mode contrast measurement, or physical iPad/phone QA. Do not claim complete device certification.
- **Limit:** a source-key-verified CXC specimen is not an officially corrected key or a real May/June historical exam sitting.

## Unresolved and disabled

- Historical Paper 1 source copies lack authenticated CXC answer keys; historical Paper 2 lacks complete verified marking schemes. All **46 supplied PDF files** remain **blocked from live scored playback**.
- Specimen items **38, 51, 53** have unresolved academic conflicts, disclosed rather than silently changed.
- Comprehensive course material, SBA, subject-aware free-response partial-credit marking, integration, security, accessibility and visual responsive checks require more work before any public POB publication.
- The POB registry continues to specify `enabled:false,status:"draft"`. Merging source code to `main` does **not** approve launch or enrollment.

## Merge decision rule

Do not merge until the **latest feature head** has a passing test/build workflow and PR is mergeable. Merge to `main` as a **gated development foundation**, not a release announcement. Verify the final merge SHA and `main` reference after integration. Keep POB unavailable to students until its outstanding release gates are separately resolved and approved.
