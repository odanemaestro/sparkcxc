# SPARK CSEC Principles of Business: Paper marking v2 QA and release gates

**Branch:** `feat/pob-paper-marking-v2`, **PR:** #68 (draft), **baseline:** merged POB draft from PR #67.
**Academic objective:** mark only defensible evidence, award criterion-level partial credit, recognise equivalent answers, and never fabricate a full Paper 2 result.

## 1. Original SPARK Paper 2 (five questions, 25 parts, 100 marks)

**Eight parts have bounded deterministic rules covering at most 23 available rubric marks:**

| Part | Type | Maximum | Evidence gates |
| --- | --- | ---: | --- |
| Q1(b) | Three pre-business research factors | 3 | Demand/competition; finance/costs; legal/supplier/health requirements; distinct criterion alignment |
| Q2(a) | Two different management functions | 2 | Recognised distinct, non-negated terms |
| Q3(a) | Labour productivity | 3 | Definition, 300÷10 method, correct result **with labour-hour unit** |
| Q3(b) | Two different marketing-mix elements, not price | 2 | Product / place / promotion |
| Q3(c) | Contribution per bottle | 4 | Price J$250, variable cost J$130, correct subtraction and J$120 result, link to fixed costs |
| Q4(b) | Three relevant shipping/delivery documents | 3 | Three unique valid documents |
| Q5(a) | Gross profit | 3 | Revenue J$850,000, cost of sales J$470,000, correctly calculated J$380,000 |
| Q5(b) | Simplified net profit | 3 | Gross profit J$380,000, expenses J$260,000, correctly calculated J$120,000 |
| **Total** | **8 distinct parts** | **23** | Other responses are NOT silently graded by keywords |

The remaining **17 written-response parts, up to 77 marks**, are preserved for the secure server-owned **two independent semantic marking passes**. Each rubric criterion must be supported by a quote from the actual candidate answer; contradictory/unsupported scores must stay uncertain, with score bounds instead of an invented total. The marking config and worker credentials are required for that service.

The client displays **confirmed marks** for deterministic parts only and reports unresolved parts separately. Server-side trusted bank application is in `src/grading/serverAssessment.js`; the marker never trusts candidate-provided question, key, or rubric data. No arithmetic answer gets full credit from a matching number alone.

## 2. Official CXC 2019 specimen Paper 2 (not a historical sitting)

The supplied `POB.zip` includes the official CXC syllabus `CSEC-Principles-of-Business-Syllabus-.pdf` (CXC 08/G/SYLL 17). The CXC **2019 specimen Paper 02** is in PDF pages **89–102** and its **official keys and mark scheme** in PDF pages **108–120**. PDF pages 90–102 contain the five examinable questions; scheme pages 109–120 contain the question-level marking rules.

**Exact source SHA-256:** `08b3bf375a720abf8098d53fb9f6394597d8b576f7b863afd7408ecba913d0e6`.

`pobCxcSpecimenP2.js` records all **five 20-mark questions, 25 answer parts, 100 total marks**, each part's original prompt, label, mark allocation, answer criteria, acceptable illustrated responses, source question page and source scheme page(s). It is marked **official specimen**, not falsely described as a May/June 2019 historical sitting. The explanatory criterion wording in SPARK is **paraphrased from the official scheme**; it does not imply CXC individually validated SPARK's grading engine.

Rubric allocation by question:

| Question | Parts | Mark allocation | Total |
| --- | --- | --- | ---: |
| Q1 Janice / entrepreneurship | (a)(i), (a)(ii), (b), (c), (d) | 2 + 4 + 4 + 4 + 6 | 20 |
| Q2 management / leadership | (a)(i), (a)(ii), (b)(i), (b)(ii), (c) | 4 + 3 + 3 + 4 + 6 | 20 |
| Q3 market structures / branding | (a)(i), (a)(ii), (b), (c), (d) | 3 + 3 + 4 + 4 + 6 | 20 |
| Q4 contracts | (a), (b)(i), (b)(ii), (c)(i), (c)(ii), (d) | 2 + 2 + 2 + 6 + 2 + 6 | 20 |
| Q5 government and development | (a)(i), (a)(ii), (b), (c) | 4 + 4 + 6 + 6 | 20 |
| **Total** | **25 parts** | | **100** |

`PobPracticeHub.jsx` exposes a separate **2019 CXC specimen Paper 2** option in the still-disabled POB course. The CXC bank is processed only by the trusted server marker's two independent passes (no speculative local auto-awards), and only when its secure marking queue is enabled. In the meantime candidate responses are saved and each original CXC marking criterion is visible for review, with final scores withheld.

## 3. Database and deployment safeguards

The new migrations, in order:

1. `20261016230500_pob_specimen_paper2_marking_bank.sql`: whitelist exactly `pob-original-paper2-01` and `pob-cxc-specimen-paper2-2019-v1` for authenticated owner-submitted Paper 2 attempts. No arbitrary bank or rubric uploads.
2. `20261016231000_pob_specimen_paper2_unscored_submission.sql`: allow **null client scores** and 100-mark snapshots for the two trusted POB banks; never allow client-provided Paper 2 marks.

**Neither migration is applied automatically by pushing to GitHub Pages.** Supabase deployment of migrations, server-marker bundle deployment, `OPENAI_API_KEY`, marking model, secret scheduler and an explicit calibration-based enable decision are all needed before live server grading works. The global marking config remains **disabled by default** in this PR; do NOT flip it merely because unit tests pass.

## 4. Historical examinations and future acceptance

The **46 archived exam PDFs** are inventoried, but the supplied sitting papers do **not** provide authenticated complete CXC Paper 1 answer keys or CXC Paper 2 marking schemes. None of those historical papers is approved for scored playback. January 2023 P1 Q1–10 were visually transcribed, but do **not** have verified official keys.

Before permitting high-confidence live scores for either complete Paper 2:

- Run rubric-level calibration on **correct, partially correct, alternate-wording, contradictory, vague and blank responses** for every part, preferably with source-backed expected mark allocations reviewed by the SPARK academic team.
- Confirm deterministic and server scores cannot double-count the same criterion or lose partial-credit marks.
- Confirm the user cannot spoof a rubric, change the bank ID, submit a client-assigned score or interfere with another student's marking job.
- Deploy/test actual Supabase migrations, marking worker, auth permissions, token limits, job retry/uncertain outcomes and score provenance in staging.
- Review fully in browser at mobile/tablet/desktop screen sizes, including persisted responses, dark mode, timer expiry, and alternative approaches.
- Keep POB `enabled:false`, `status:"draft"` until completion of the separate syllabus/study/flashcard/SBA and historical-paper QA.

**Interpretation:** complete 100-mark marking *rubrics and secure processing pathways* are implemented for the original and official-specimen P2 banks. **Complete trustworthy production auto-grading of every possible narrative response is not established yet.** Historic sitting paper grading is still blocked pending authoritative keys/schemes.
