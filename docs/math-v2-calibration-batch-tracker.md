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
