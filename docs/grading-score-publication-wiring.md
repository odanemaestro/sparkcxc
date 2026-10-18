# SPARK Paper 2 score publication, October 2026

The score is calculated **before** the release audit; this layer does not re-mark answers. The release audit determines whether an attempt's current numeric score is eligible to appear in final-score fields.

## Publication endpoints

- **Subject progress**: `recordSubjectActivity` runs `preparePaper2SubjectActivity` before `spark_record_subject_progress`. The RPC receives a numeric `p_score`/`p_percent` only when the release audit passes. For unresolved results the RPC receives both as `NULL`, but the metadata contains `confirmed_marks`, `unresolved_marks`, audit issues and a provisional state. This works for Chemistry, English A, FNH, Integrated Science, Social Studies, Physics and IT.
- **Server exam attempts**: `submitServerExamAttempt` runs the same adapter on Paper 02. It sends the response snapshot and a hash separately, without duplicating long essays in metadata. The migration `20261018170500_paper2_final_score_publication_guard.sql` allows null scored written submissions for English A and Integrated Science and **forces** these subjects' server attempt scores to remain null, regardless of a browser-provided claim of verification.
- **Practice result uploads**: `paper2ResultToAttempt`, `savePracticeExamAttempt`, and `syncLocalPracticeResults` use the release audit on Mathematics Paper 02 records. Old local results without provenance remain as confirmed-only audit evidence, not an invented zero or final grade.
- **Local IT and Physics results**: the release gate is applied before local result histories and progress events. The adapter preserves a null final score through physics/IT progress mapping.
- **POB**: historical owner-only grading, archive source/hash restrictions, and pending-server-marking controls remain exactly as before. Do not turn historical/semantic pending marks into browser-certified totals.

## Rollout order and safety

1. **Apply the migration to the SPARK Supabase database before releasing the frontend.** Its existing function is based on the latest protected owner-pilot migration, not the older baseline.
2. Verify that the current POB owner-pilot and archive canaries still pass and that an English A / Integrated Science unscored Paper 2 submission can be recorded.
3. Deploy the frontend after the full build and grading regression suite passes.
4. Confirm that a fully graded Mathematics Paper 2 persists as a number, while a partially graded FNH or English A Paper 2 persists a null final score with confirmed evidence and review status.
5. Observe the progress dashboard for any legacy UI component that treats null as zero. The analytics must distinguish ungraded/provisional from incorrect.

## Limitations

- Browser-run deterministic checks and their snapshot hashes are **not** cryptographic server authority. The server explicitly refuses to certify English A and Integrated Science written scores merely because a browser has claimed verification.
- Server `spark_record_subject_progress` still accepts values from clients with authenticated permissions. Further hardening of the database's *direct* progress RPC (to prevent deliberate bypass of the frontend adapter) must be scheduled as a separate authorization/attestation design, not solved by trusting client metadata.
- A fully supported SPARK marking scheme is not proof of exact equivalence with an official examiner for every possible candidate response.
