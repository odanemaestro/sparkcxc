# Accounts source-paper grading

The 28 historical Paper 2 papers and the syllabus specimen use `poa-source-methods-v1`. Each question retains its printed 20-mark ceiling. Atomic method, accuracy, presentation and follow-through allocations are SPARK-authored practice rules. They are separate from the unchanged CXC source PDFs and from the original SPARK numerical exercise.

The 171 question policies produce 94 valid five-question combinations. Older seven-question papers require questions 1–3 and two of questions 4–7; newer papers require all five. Each submission is out of 100. The private database derives the combination from the stored paper identity, source PDF digest, bank version and selected questions. Duplicate, missing, unselected and out-of-source questions cannot enter the marking queue.

`marking/poaMethodRegistry.js` binds the canonical policy to its source and rejects altered criteria or unknown answer cells. `marking/poaMethodEvaluator.js` reads typed account cells and labelled working. Accuracy comes from a claimed result; method credit requires the applicable operation. Consistent own figures use a unique earlier claim within the same question. Another question's amount, a printed fixed figure, a negated entry or a matching operand cannot supply that evidence.

Conditional interpretations are explicit and versioned. A declared alternative replaces the affected default figures and must be followed consistently. The specimen revenue-unit erratum is documented in [poa-specimen-method-policy.md](poa-specimen-method-policy.md).

The recognizers support bounded assertions and accounting notation. Unrecognized prose, conflicting answers and unreadable drawings remain provisional. That prevents unsupported automatic final scores; it also means some valid prose will not receive an automatic final result. Supported alternatives can be expanded with new calibration evidence and a new policy version.

Calibration distinguishes independently recomputed scenario arithmetic from examples that define the authored policy contract. `tools/calibrate-poa-methods.mjs` checks all 171 question policies, 2,223 historical numerical reconstructions, source-reading alternatives, follow-through, negative examples and held-out semantic claims. `tools/v2-verify-all.mjs` exercises the actual server examiner and private release gates for all 94 combinations. `tools/test-poa-method-release.mjs` checks full, zero and provisional scripts through real PostgreSQL queue, progress and notification functions for every combination.

Both new migrations seed inactive drafts. Verified staging evidence may release them in the disposable Accounts project. Production course visibility and deployment remain controlled by the existing release process. The obsolete 22-subpart specimen draft stays inactive; its replacement is the five-question, source-bound method policy.
