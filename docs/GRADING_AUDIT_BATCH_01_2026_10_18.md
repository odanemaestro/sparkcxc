# SPARK grading audit: Batch 01 (2026-10-18)

## Scope and approach
Read the shared Paper 1 selection/scoring engine and sampled subject-specific Paper 2 graders in Mathematics, Physics, Chemistry, Integrated Science, English A, Information Technology, Food Nutrition and Health, and Principles of Business. This is a **source review**, not a complete proof that every question bank and examination is calibrated. Do not mark an entire subject fully verified based on this audit.

## Corrected in this batch
- Shared Mathematics-style `src/practice/paper1Engine.js` used case-sensitive `selected === correct_option` despite validating lowercase keys as usable. Normalize option letters and surrounding whitespace before grading. Add a regression for mixed case, blank answers, overall score, and topic percentages.

## Risks found requiring separate bounded batches
1. **Chemistry Paper 2:** `chemistryPaper2Grader.js` treats matching numeric values found anywhere in a response as potential evidence for individual marks, and uses a 52% token-coverage fallback for some prose. Test whether wrong labelled quantities, contradictory conclusions, and repeated common tokens cause false credits. Keep unverified free-text marks provisional until criterion-specific evidence is proven.
2. **Integrated Science Paper 2:** `integratedSciencePaper2Grader.js` also uses token-overlap thresholds for free text, with graph and structured calculation marking separated. Stress-test negation, unsupported causal links, alternative valid scientific phrasing, units, and graph coordinates.
3. **English A Paper 2:** `englishAPaper2Grader.js` computes features such as lexical variety, connectors and source-term overlap for extensive writing. Verify that superficial length/keyword stuffing cannot substitute for relevance, accuracy, coherence, or original evidence. Review genre-specific rubrics against CXC requirements.
4. **FNH Paper 2:** `fnhPaper2Marking.js` still exports named self-assessment scoring functions. Audit the live entry points to verify candidate scores originate from SPARK's own assessed evidence, never unchecked candidate-selected criteria. Do not silently remove this path without understanding historical dependencies.
5. **IT Paper 2:** `itPaper2Marking.js` supports formulas, queries and structured answers; investigate semantic equivalence and false positives in prose and formula/SQL acceptance, with exact-mark regression fixtures.
6. **Physics Paper 2:** `physicsPaper2Marking.js` has quantity and unit parsing, but needs cross-quantity, precision, significant-figure, wrong-unit and equivalent-working adversarial tests across real papers.
7. **POB Paper 2:** `pobHistoricalPaper2RubricReview.js` conservatively distinguishes verified and unresolved written evidence and diagram structures. Stress-test exact model text, repeated evidence, contradictory statements and rubrics whose criterion totals do not match part marks.
8. **Paper 1 across subjects:** The shared engine fix applies only to callers of `scorePaper1`. Audit each subject's own Paper 1 code paths for malformed keys, answer-key conflicts, duplicate questions, shuffled-option correctness, missing diagrams and score-review parity.

## Batch acceptance criteria
- Each new marking rule has explicit positive, negative, partial-credit, paraphrase, contradiction and blank-response cases.
- Non-AI grading is the default. AI is optional and must not invent scores for unresolved evidence.
- Distinct marking points cannot reuse one answer fragment for duplicated credit.
- Source rubric mark caps and examination totals must reconcile.
- A zero means confirmed incorrect or unanswered, not merely unsupported by the checker.
- CI must pass and mobile, tablet, desktop, light and dark views must be inspected before production promotion.
- Record precisely which course, paper and task are covered. Avoid claiming whole-course calibration from a fixture-only pass.

## Next batches
- Batch 02: Chemistry and Integrated Science written/calc/graph adversarial calibration.
- Batch 03: Physics and Mathematics method, error-carried-forward, unit and graph calibration.
- Batch 04: English A evidence-based extended writing and summary rubrics.
- Batch 05: FNH, POB and Social Studies source-linked written evidence and score provenance.
- Batch 06: IT Paper 2 structured artefacts and all-course Paper 1 canonical answer/option/shuffle integrity.
- Batch 07: cross-course historic-paper benchmark, examiner-agreement rates, release gates and UI review.
