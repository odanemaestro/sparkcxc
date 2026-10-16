# SPARK CSEC Principles of Business: Implementation and Source Audit

Date: 15 October 2026
Branch: feat/principles-of-business-course-v1
Status: **Phase 1 implementation, draft subject. Not complete and not published.**

## Authoritative syllabus and exam structure

The uploaded \`POB.zip\` includes CXC 08/G/SYLL 17, *Principles of Business*, effective for examinations from May/June 2019, and 46 historical source PDFs. This source supersedes assumptions derived from older question papers. Official copy: https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Principles-of-Business-Syllabus-.pdf

- Ten syllabus sections, 119 numbered specific objectives. SPARK's initial 42 lessons each group up to three numbered objectives with Caribbean teacher explanations, applications, objective guides, original worked cases and revision prompts.
- Paper 01: 60 MCQ, 1 hour 15 minutes, one mark each. Section distribution: \`5, 6, 5, 4, 7, 7, 6, 7, 7, 6\` across Sections 1–10 (20 per broad profile).
- Paper 02: 5 compulsory structured questions of 20 marks, 100 marks, 2 hours; two questions from profile 1, two from profile 2 and one from profile 3.
- Paper 031 SBA: 40 marks, maximum 1,000 report words. The official criterion allocation is \`1,2,2,4,10,10,4,4,1,2\`; different cognitive profiles total 10 knowledge, 20 application and 10 analysis. The syllabus specifies a 10% deduction of the achieved score when the 1,000-word maximum is exceeded by **more than 10%**.
- Paper 032: private-candidate alternative, 40 marks, 75 minutes. **Not implemented as an exam yet.**

## Source paper inventory

The supplied archive contains 21 Paper 01 PDFs (193 pages) and 25 Paper 02 PDFs (275 pages), 46 historical PDFs (468 pages) in total, plus the syllabus. Some are scanned/image-only; some older papers predate the revised syllabus. The original PDF titles, years and sitting labels are recorded in \`pobHistoricalInventory.js\`.

**Publication guard:** No archive item is presented as a verified, scored original exam until the exact questions, diagrams, objective mapping, correct answers and marking rubric are reviewed. All 46 are currently \`simulatorReady:false\`. Historical transcription and QA are **not complete**.

## Phase 1 implemented

| Area | Status | Notes |
| --- | --- | --- |
| Syllabus coverage | First pass | 119 objectives in 42 lessons, 10 sections. Explains terms with original Caribbean applications. Requires editorial comparison to all official syllabus wording before release. |
| Exam Paper 1 | Implemented original set | 60 original MCQ, exact 75-minute limit and per-section allocation, saved answers, navigator, flags, score and explanations. These are not CXC historical transcriptions. |
| Exam Paper 2 | Implemented original set, partial | Five 20-mark structured scenarios, 120-minute timer, persisted draft answers and detailed rubric display. **No reliable automatic free-text grading yet**. |
| SBA | Initial guided workspace | 10 reporting areas, 40-mark official allocation, evidence ethics warning, draft editor, word count, text export. **Drafts are not cloud-backed and do not receive automatic CXC grades**. |
| Flashcards | 119 authored prompts | Embedded per topic for SPARK's generic lesson deck. Review loading, history and learning-loop integration still need end-to-end verification. |
| Learning tools | Initial | Variable-driven output/productivity, price/contribution/profit/break-even and short subject-specific objective practice. |
| Learning media | Initial | CC-licensed organisational structure, circular flow, marketing mix and supply-chain SVG references with source/creator/licence credit and failure fallback. Other topics will receive media only when useful. |
| Platform | Draft registered | Shared study loader, routing, subject registry, practice hub, enrolled-student practice protection. **Subject is \`enabled:false,status:"draft"\`** pending published content and approval. |
| Marking | Incomplete | Paper 1 is scored; Paper 2 free text has rubric examples only. Need subject-specific semantic evaluation, partial credit, misconceptions, alternative correct phrasing, calibrated tests and uncertain-mark handling. |
| Database and notifications | Pending | Publishing migration, notification rules, detailed Learning Intelligence integration and verified server-side saving. |
| Browser QA | Pending | Manual Windows, macOS, mobile/iPad, dark/light/glass and screenreader checks. Automated unit and build checks must pass before review. |

## Sourced diagram attribution

The following four visual assets come from their Wikimedia Commons description pages and remain externally hosted:

1. \`CircularFlowEN-SVG.svg\`, creator Niyumard, CC0 1.0, https://commons.wikimedia.org/wiki/File:CircularFlowEN-SVG.svg . Teaches the conceptual flow of the five-sector economy, not measured Jamaican data.
2. \`Organization Structure.svg\`, creator MovGP0, public domain, https://commons.wikimedia.org/wiki/File:Organization_Structure.svg . Example organisation chart, not an exact Caribbean company hierarchy.
3. \`Marketing Mix 4P.svg\`, creator Jorgetarlea, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Marketing_Mix_4P.svg . Product, price, place and promotion.
4. \`Supply chain.svg\`, creator Maly LOLek, CC BY-SA 3.0, https://commons.wikimedia.org/wiki/File:Supply_chain.svg . General flows of materials, information and funds, not a promise that every business uses this exact chain.

Original images, their author and licence links are preserved in \`pobReferenceMedia.js\`. Students see useful instructional prompts, enlarge links, alt text and graceful fallback. Real asset loading must be visually checked before final release.

## Non-negotiable next batches

1. **Historical P1 transcription and answer-key QA**: process the PDFs in dated batches, cross-check layout, all options and diagrams against original scans; hold back uncertain or incomplete keys.
2. **Historical P2 transcription, scoring and acceptable responses**: preserve paper variants, research authoritative mark schemes, document uncertainty. Build a subject-aware marking system with tested alternative answer forms and partial-credit logic.
3. **More comprehensive explanations and visual/practical labs**: deepen lesson notes and additional original cases, entrepreneur planning tools, invoice/receipt simulator, business planning, organisation chart construction, market research, real supply chain decisions, insurance, credit and economic indicators.
4. **SBA quality and integrity**: survey instrument builder, ethical data collection, charts and analysis, evidence checking, correctly labelled automated feedback, secure progress persistence and export.
5. **Platform launch integration**: subject publishing and Supabase migration, permissions, email and app notifications, dashboard/parent reports, Study Circles, recommendations, flashcard progress and accessibility.
6. **QA**: React tests, full CI, production build, browser test of all routes/modes on Windows and mobile, manual review of imported references; user reviews before merge.

**Release gate:** Never mark this new course complete because 119 objectives are linked, one original exam set exists, or an automated build succeeds. A complete course must meet the full 15-part user specification. Do not merge without explicit approval.
