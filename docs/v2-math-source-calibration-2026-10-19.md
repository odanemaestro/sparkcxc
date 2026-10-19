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


## Continued batches, original-v1 Questions 2, 4, 5 and 6

Verified against the saved SPARK original-v1 question parts and versioned model solutions, then registered on the production database as **drafts only**:

| Question | New source parts | New source marks | Main evidence |
| --- | ---: | ---: | --- |
| 2, algebra and rectangle | 5 | 9 | Indices, fully factorised expressions, perimeter, paired length/width |
| 4, functions | 2 | 3 | f(4), paired roots of g(x)=13 |
| 5, statistics | 4 | 9 | Modal class, weighted mean, three cumulative-frequency entries, simplified probability |
| 6, cylinder and filling time | 4 | 9 | Area, volume, curved surface area, time=volume/rate, valid ECF |
| **Total added** | **15** | **30** | Correct method/accuracy allotments; uncertain methods remain unresolved |

**CI evidence:** [SPARK PR checks #2452](https://github.com/odanemaestro/sparkcxc/actions/runs/39317377788) and [#2455](https://github.com/odanemaestro/sparkcxc/actions/runs/39318092272) passed. A test-count issue exposed by the assembled Question 4's extra reasoning part was corrected before #2452 passed. The new tests confirm wrong algebra earns no credit, correct perimeter/function values earn bounded marks, cumulative-frequency free-text answers are not falsely treated as verified table artefacts, and a correct cylinder filling-time calculation receives ECF marks from an earlier wrong volume.

**Production SQL migrations applied:**
- `20261019225500_marking_v2_math_original_v1_q2_q4_q5_drafts.sql`
- `20261019233000_marking_v2_math_original_v1_q6_cylinder_drafts.sql`

**Current production count:** 261/640 Mathematics parts with detailed draft source criteria, 379 without; original-v1 has 28/45 source parts detailed. The 67 registered paper versions have **zero fingerprint mismatches**, **zero verified or active rubrics**, **zero recorded criterion approvals** and **zero V2 marking jobs**.

This is ongoing internal source-calibration work, not final independent approval or activation. Existing live grading remains untouched. The private authenticated worker v9 continues processing its scheduled empty-queue health calls.
