# Mathematics V2 calibration batches

Baseline: 347 of 640 source parts have detailed criteria. Remaining: 293.
Batch 1: original-v3,v4,v5 (111 parts).
Batch 2: original-v6,v7,v8 (112 parts).
Batch 3: original-v9,v10 (70 parts).

Draft criterion completion does not authorize V2 grading.

## Three-batch production deployment

All three private SQL migrations were committed and successfully applied to SPARK production:

- `20261020030000_marking_v2_math_original_v3_v5_source_drafts.sql`: 111 newly detailed parts.
- `20261020040000_marking_v2_math_original_v6_v8_source_drafts.sql`: 112 newly detailed parts.
- `20261020050000_marking_v2_math_original_v9_v10_source_drafts.sql`: 70 newly detailed parts.

Post-deployment production SQL: Mathematics 640/640 parts with nonempty detailed source arrays; zero nested criterion allocation mismatches; all 67 registered rubric content hashes match; zero verified and zero active rubric versions. The newly allocated M/A marks are manual-verification evidence requirements referencing the source answer and worked solution; they are **not** comprehensive validated machine-checkable answer rules or reviewer sign-offs. Source-specific alternative-answer verification, method/ECF validation and graph/construction artifact marking are still required to authorize final V2 grades. Existing live scoring untouched.

## Authoritative V2 live-release audit

The 293 previously missing parts have full *structural* source-based manual allocations, not automated evidence evaluators. Production audit now finds **969 Mathematics manual-verification criterion entries**, spread across all 16 registered Mathematics paper versions. The latest production read finds **67 total rubrics, zero verified, zero active**. Do not enable V2 final publication by bypassing those controls.

Original v3-v10 have 773 manual-verification entries: v3 98, v4 96, v5 100, v6 96, v7 96, v8 97, v9 95, v10 95. The remaining 196 are spread across original v1/v2 and Practices E-J. These entries lack independently trusted evidence evaluators, so a matched model answer cannot automatically prove method, written justification or graphical evidence.

Release completion checklist: implement source-specific deterministic equivalence and arithmetic-step evaluators; implement typed graph and construction artifacts and their validations; review alternate correct methods and error-carried-forward cases; run adversarial, negative and positive-answer score parity tests for all 16 source versions; record genuine criterion reviews and independent version verification; exercise server worker and atomic publication on isolated authenticated attempts; then separately authorize a controlled rollout and rollback. **No paper should be marked verified simply because all parts have criterion arrays.**
