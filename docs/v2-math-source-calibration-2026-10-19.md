# Mathematics V2 source calibration, batches 3 and 4
19 October 2026

## Source-specific changes deployed

The private service-role worker is on **version 9**, with JWT signature verification enabled. Its marker bundle SHA-256 is `143ac812cbd31560acceb52def6d9edae27118dd3be2ead194a509dde2d3541d`.

The Mathematics V2 grader now evaluates registered, versioned and hash-bound criterion arrays, not an unrelated, automatically derived set from the assembled source bank. Missing arrays, unsupported checker types, provisional checks and nested manual verification do **not** qualify for authoritative scoring. Zero-weight source checks remain valid.

Two draft-only source migrations were applied to production:

| Registered paper | Parts newly calibrated | Source marks | Result |
| --- | ---: | ---: | --- |
| Mathematics original-v1, Q1 | 4 | 9 | Fraction workings, cost-price method, 40% profit and percentage change, with ECF rules and unsimplified-fraction rejection |
| Mathematics p2f, construction/table/graph | 5 | 13 | Exact drawing, plotting and table-cell allocations. All unverified visual/structured work stays manual and unresolved |
| **Total** | **9** | **22** | No rubric or criterion approval asserted |

The original-v1 question now contains 13 detailed criteria-bearing parts out of 45; p2f now contains 42 of 42, including the five marked-rich artefacts. A complete *allocation* is not equivalent to proof that every possible answer is automatically graded.

## Test evidence

- [CI #2445](https://github.com/odanemaestro/sparkcxc/actions/runs/39313708604) passed the registered-criterion examiner binding and source migration. Source-correct examples included a wrong cost price with no method (0), a wrong cost price with valid method (1), a valid follow-through on an earlier wrong value (2), and an unsimplified fraction (0 accuracy).
- [CI #2448](https://github.com/odanemaestro/sparkcxc/actions/runs/39314851977) passed the complete 67-paper adversarial replay with **zero false positive candidates** for the deliberately unrelated sample responses. The 20 model-answer paper replays included Mathematics original-v1 and p2f. The original-v1 model paper returned provisional suggestions of 96 marks with 85 marks unresolved. p2f returned 87 provisional suggestions with **13 marks unresolved** for structured artefacts.
- Production Postgres confirmed **67 registered papers**, **zero digest mismatches**, **zero active verified rubrics**, **zero criterion-level approvals**, **zero V2 marking jobs**.
- Mathematics draft calibration coverage changed from **237 / 640** to **246 / 640** source parts with explicit detailed arrays. There are **394** parts with no detailed source arrays, down from 403.

## Blockers before a student-facing paper receives V2 final scoring

1. Calibrate or explicitly resolve every scored criterion in the full registered paper, including Mathematics's remaining 394 parts.
2. Validate actual construction arcs and ruled lines, table-cell positions, graph points, scales and curves from a server-owned response snapshot. Plain text or unverified object structure cannot satisfy a visual marking criterion.
3. Run approved examples and counterexamples for equivalent answers, wrong arithmetic, alternate methods, source/version mismatch and ECF. Reconcile the learner paper's selected questions and exact 100-mark ceiling.
4. Record genuine, independent criterion-level review evidence in the existing private ledger, followed by the separate rubric approval required by the database. A CI success or a source digest is not a substitute for genuine approval.
5. Release only approved paper versions through the production queue, with canary checks for final score publication and rollback support.

**Release status:** private worker live and protected; student-facing authoritative V2 scores are not active. The existing student grader is preserved.
