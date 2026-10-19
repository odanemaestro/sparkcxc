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
- **Paper assembly:** resolve the FNH 96-mark and Integrated Science 105-mark registered source totals, plus English A 120-mark combinations, against the actual versioned learner paper before attesting.

## Conditions for live authoritative V2 score publication

1. Confirm the actual learner paper assembly, question choice and response IDs, answer variants and mark ceiling, using source editions.
2. For **each criterion**, validate legitimate equivalent answers, wrong answers, incomplete workings, ECF, essay/graph evidence, boundaries and source hashing. Record genuine internal sign-offs in the private review ledger; do not fabricate reviewer identities or rename draft flags.
3. Obtain a distinct internal approver after criterion review. The database requires non-matching verifier and approver identities and immutable approved source hashes.
4. Replay complete, partial, empty, conflicting, adversarial, graphical, and retry submissions against verified source papers. Ensure score totals, revision binding, ownership and lease fencing are correct.
5. Enable only approved paper versions behind a controlled rollout, retain the existing live grader as fallback, monitor false positives, and retain rollback support.

**Never activate unreviewed rubrics simply to meet a launch date.** SPARK is designed to do its grading internally; this requirement does not call for external teachers or examiners.
