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


## Full original-v1 source allocation milestone: Q3 and Q7–Q10

The private source registry now includes all **45 of 45 parts** of Mathematics original Paper 2 version 1, totalling **100 marks**. The previously missing 17 parts worth 44 marks were assigned source-specific draft criteria:

| Question | New parts | Marks | Source evidence |
| --- | ---: | ---: | --- |
| Q3(a) | 1 | 3 | Correctly identifies a reflection and its mirror line, y = 0 |
| Q7 | 4 | 10 | Correct shaded/unshaded tile counts, nth-term expressions, algebraic equation, design number and unshaded count |
| Q8 | 5 | 12 | Completing the square, minimum, turning point, symmetry axis and ordered y-intercept |
| Q9 | 4 | 9 | Central/inscribed-angle theorem, isosceles radii, Pythagoras and three-figure bearing |
| Q10 | 3 | 10 | Ordered matrix product, inverse matrix and ordered simultaneous-equation solution |
| **Total** | **17** | **44** | Registered draft marking structures, not grading approvals |

The original 45-part paper contains two previously detailed Q9/Q10 reasoning/determinant parts, which were preserved unchanged. New criteria retain actual student-response identities and source hashes.

**Passing CI:** [SPARK PR checks #2458](https://github.com/odanemaestro/sparkcxc/actions/runs/39321261132) verified the complete 45-part / 100-mark structure, empty responses, swapped coordinate and matrix-solution values, invalid negative design numbers and wrong bearings. The complete 67-paper adversarial suite again found **zero positive awards** for deliberately irrelevant answers.

The model-answer replay for original-v1 now reports **75 suggested marks and 74 unresolved marks**. Those measurements are independent dimensions: suggested marks are not validated final credit, and unresolved marks are the maximum mark weight awaiting authoritative evidence, rather than marks that should be added to suggestions. This demonstrates why a complete structural scheme alone is **not** a release-ready automated examiner.

Applied production migration: `20261019234500_marking_v2_math_original_v1_q3_q7_q10_drafts.sql`. It refuses changed source hashes, approved papers, mismatched official source answers or unexpected part counts. Its production database audit confirmed:
- **278 / 640** Mathematics source parts have detailed arrays, **362** still lack them.
- Original-v1 has **45 / 45** source parts and the correct **100-mark ceiling**.
- All **67** draft paper hashes agree with their registered criterion content.
- **Zero** verified papers, real criterion reviews, active V2 papers or V2 grading jobs.

This milestone is a fully allocated **draft** of SPARK's *original practice* Mathematics Paper 2 version 1, not proof that every legitimate student answer or drawing is graded reliably. Genuine source-specific alternative-answer, typed-artefact and method verification is still needed before authoritatively publishing V2 scores. It is also not the complete historical Mathematics Paper 2 archive.


## Original-v2 Q1/Q2 and verified-answer accuracy hardening

The CI-verified draft calibration of Mathematics original Paper 2 version 2 is now registered in production. It adds **9 source parts worth 18 marks** in two questions:

- **Q1 (4 parts, 9 marks):** exact fraction calculations, reverse 20% markup, 35% profit, and percentage change. Method/accuracy and source-bound error-carried-forward rules are explicit. The requested fraction in lowest terms accepts `9/5` and `1 4/5` but **not** the decimal `1.8` or unreduced `18/10`.
- **Q2 (5 parts, 9 marks):** index laws, two fully factorised expressions, rectangle perimeter, and labelled width/length. Ambiguous paired dimensions remain unresolved pending positional evidence.

The source-registered inverse matrix `M⁻¹=(1/7)[[5,-3],[-1,2]]` on original-v1 Q10(c) now has a strictly positional matrix accuracy rule. Both `(1/7)[[5,-3],[-1,2]]` and `[[5/7,-3/7],[-1/7,2/7]]` earn the same provisional **B1** accuracy mark. Changing the scalar or reversing entries earns zero. The two inverse method marks **M1/M2 remain manual**.

### Critical grading-engine behaviour fixed

The previous shared marker convention, *a correct answer implies the method*, was leaking into the V2 provisional scorer even when specific criteria were deliberately `manual-verification`. The **private V2 path now disables inferred method credit** for unresolved/manual and fallback criteria while preserving genuinely deterministic equivalent answers and ECF. The existing live student grader remains unchanged.

CI discovered and fixed mismatched expectations in the source replay as this stricter policy was introduced; **[CI #2471 passed](https://github.com/odanemaestro/sparkcxc/actions/runs/39325104538)**. It includes the full regression suite, source-replay and database release guards, nine-subject bundle, and SPARK build.

The full **67-paper** unrelated-response replay finished with **zero false-credit paper candidates** for the tested nonsense responses. Model-answer diagnostic replays were **51 provisional suggested marks / 74 unresolved mark weight** for original-v1 and **96 suggested / 84 unresolved** for original-v2. These two metrics are not additive; neither is a verified final grade.

The following guarded inactive-draft migrations were applied to production after CI:
- `20261020001000_marking_v2_math_original_v2_q1_q2_source_drafts.sql`
- `20261020002500_marking_v2_math_inverse_matrix_accuracy_draft.sql`

The updated compiled examiner bundle is deployed in the private Supabase `mark-paper2-v2-shadow` **version 10**, with `verify_jwt=true`. Its bundle SHA-256 is `d288e4e68a1e63cc71058d84978f6b6bbe5cacd9f874869e85b231ecbeb8f73e`. Production canaries returned **HTTP 200** with a service-role JWT and **HTTP 401** without authentication.

**Verified production status:** Mathematics detailed source coverage **287/640** parts, **353** remaining. Original-v2 is **10/42** parts detailed; original-v1 retains **45/45**. Source hashes across **67** registered papers match; **zero** criterion approvals, verified/active V2 rubrics, or V2 worker jobs exist. Original-v1 currently retains **49 mark weights** in manual evidence criteria, after converting the single inverse accuracy mark to safe deterministic checking.

**Not a student-facing grading release:** all source versions remain inactive drafts. A matching source hash, a correct known-answer test, or a generated provisional suggestion is not a substitute for real source-by-source calibration and distinct internal reviewer approval. Continue with original-v2 Q3 and remaining papers, alternative answer review, and verified graphical/tabular artefacts.
