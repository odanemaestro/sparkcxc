# SPARK V2 Paper 2 production release audit, 19 October 2026

## Release result

**Worker authentication and dispatch are live and verified. Authoritative V2 score publication is NOT enabled.** Keep the existing deterministic SPARK grader in production until the real-paper criterion approval and score-parity requirements below are satisfied.

Production evidence:
- Private Edge Function version 6 and scheduler requests returned HTTP 200 with signed `service_role` JWTs; unauthenticated calls returned HTTP 401. JWT signature verification stays on, private RPC grants stay server-only.
- **67 registered draft paper definitions** from nine subjects have 67 matching SHA-256 source fingerprints and zero mismatches.
- Exactly **2,118 top-level criterion records**, not 2,217. The previous 2,217 statement was inaccurate for the current production registration. An independent PostgreSQL count and isolated migrations confirm 2,118.
- **Zero recorded criterion-level reviews, zero verified paper rubrics, zero active V2 rubrics**. SHA-256 matches and unit-test passes do not constitute grading approval.

## Registered source inventory

| Subject | Papers | Top-level criteria | Nominal aggregate marks |
| --- | ---: | ---: | ---: |
| Chemistry | 6 | 241 | 600 |
| English A | 12 | 72 | 1,440 |
| Food, Nutrition and Health | 2 | 48 | 192 |
| Information Technology | 9 | 252 | 810 |
| Integrated Science | 14 | 645 | 1,470 |
| Mathematics | 16 | 640 | 1,600 |
| Physics | 4 | 135 | 400 |
| Principles of Business | 1 | 25 | 100 |
| Social Studies | 3 | 60 | 300 |
| **Total** | **67** | **2,118** | **6,912** |

These are *registered source/paper combinations*, not evidence that every available historical examination in the site is supported by V2. English A nominal totals include source tasks that require administered choice-rule verification; do not treat a 120-mark source combination as a verified learner examination.

## Defects identified by a fresh 67-paper adversarial replay

1. Social Studies B and C essay routes were not recognizing `ss-p2-b-q5` / `ss-p2-c-q5`. The V2 examiner now keys essay routing to explicit `content` / `organisation` source components and recognizes all three original series.
2. Short unrelated English A text previously earned 10 to 12 speculative suggestion marks per 120-mark source. The V2 server path now suppresses suggested marks from short or low-confidence responses, while leaving the response unresolved.
3. Each original Physics paper previously credited three graph-plotting marks for plain unrelated text. The source schemes describe these as **manual graph criteria**. The V2 server path no longer awards graph marks based on text; nonblank graph entries remain unresolved pending verifiable graph artefact evaluation.
4. The original grader remains unchanged for students; these are conservative improvements to the private V2 pipeline. An adversarial sentinel is a regression test, not full proof of equivalent-answer fairness.

## Remaining genuine grading calibration

- **Mathematics:** 237 of 640 registered parts have populated detailed M/A/B criterion arrays. The remaining 403 lack populated arrays. Some original-paper model answers yield 84–100 suggested marks; several remain partially unresolved, so model-answer replay is not equivalent-answer verification.
- **Physics:** 135 parts carry source criterion arrays, but manual graph evidence must be interpreted from actual plotted artefacts, including axes, scale, points and lines. Check equivalent numeric methods and carried-forward errors.
- **Chemistry, IT, FNH, Integrated Science, POB, Social Studies:** registered source structures contain subject-specific schemes, but real-paper alternatives, negative and contradictory submissions, written evidence thresholds, drawings, calculations and optional-question rules still need detailed checking. The current registry is not the entire historical archive.
- **English A:** essay, summary, persuasion, composition and choice-rule marking are not fully deterministic. Do not convert low-confidence heuristic scores into authoritative final grades.
- **Paper assembly:** FNH Paper 02 is **96 marks**, comprising six compulsory 16-mark questions under the CXC Food, Nutrition and Health syllabus (source: https://ascothigh.edu.jm/uploads/dcentre/Syllabus/9780230482005.pdf). Integrated Science Paper 02 is **105 marks** (35 marks for each of three modules) under the revised syllabus (source: https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Integrated-Science-Syllabus_EffectiveforExamsfrom2027.pdf). These two totals are **not defects**. English A's 120-mark staged source combination requires exact learner question-choice mapping. The revised 2025 CXC specimen makes Q1, Q2, Q3, Q6 and Q7 mandatory, with **either Q4 or Q5**, never both (source: https://www.cxc.org/wp-content/uploads/2018/11/CSEC-English-Syllabus-Revised-2025.pdf). Verify the active source edition for each learner before paper approval.

## Conditions for live authoritative V2 score publication

1. Confirm the actual learner paper assembly, question choice and response IDs, answer variants and mark ceiling, using source editions.
2. For **each criterion**, validate legitimate equivalent answers, wrong answers, incomplete workings, ECF, essay/graph evidence, boundaries and source hashing. Record genuine internal sign-offs in the private review ledger; do not fabricate reviewer identities or rename draft flags.
3. Obtain a distinct internal approver after criterion review. The database requires non-matching verifier and approver identities and immutable approved source hashes.
4. Replay complete, partial, empty, conflicting, adversarial, graphical, and retry submissions against verified source papers. Ensure score totals, revision binding, ownership and lease fencing are correct.
5. Enable only approved paper versions behind a controlled rollout, retain the existing live grader as fallback, monitor false positives, and retain rollback support.

**Never activate unreviewed rubrics simply to meet a launch date.** SPARK is designed to do its grading internally; this requirement does not call for external teachers or examiners.


## Internal calibration batch 2, 19 October

- GitHub Actions **#2436 passed** (https://github.com/odanemaestro/sparkcxc/actions/runs/39309119416), including isolated database release-gate tests and synthetic Physics graph provisional/forged-mark rejection.
- Deployed private `mark-paper2-v2-shadow` **version 8** using checked examiner bundle SHA-256 `33a23e82c9e3c1f34f9b2930e51bb4f00a04f2ef073243c595fbbb585d7c402d`. Edge JWT signature verification remains **enabled**.
- Applied SQL migrations `marking_v2_physics_graph_provisional_method` and `marking_v2_internal_calibration_queue`. The score publication RPC now recognises the exact unresolved-graph evidence method **only for a source-marked manual Physics graph**, with zero marks and `resolved=false`. Forged positive marks or resolved graph evidence are rejected.
- The private, source-hash-bound `spark_grading_private.v2_calibration_queue` contains **2,118 criterion rows**, **0 recorded reviews**, **4 graph-artefact criteria** and **403 Mathematics parts missing detailed allocation arrays**. `anon` and `authenticated` have no SELECT permission; `service_role` has SELECT permission.
- No rubric or student score was approved or activated. Only genuine criterion calibration evidence and a separate actual internal release approval may advance an individual paper to authoritative scoring.

Example operator-only status query:

```sql
SELECT subject_id, review_focus, COUNT(*) AS pending
FROM spark_grading_private.v2_calibration_queue
WHERE NOT source_matched_review
GROUP BY subject_id,review_focus
ORDER BY subject_id,review_focus;
```

This is an audit and release-preparation milestone, not the completed V2 grading replacement.
