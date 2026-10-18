# SPARK grading improvement cycle: final audit (October 2026)

## Scope and release standard

Batch 14 closes the **planned 14-batch engineering review** of SPARK Paper 1 and Paper 2 marking. It is **not** a certification that every possible student script is marked exactly as a CXC examiner would mark it. SPARK's own authored rubric fixtures, source-linked practice cases, and CXC-syllabus-anchored regression rules are not independently verified official candidate scripts.

## Deterministic grading rules

- Paper 1: exactly 60 unique, ordered questions; valid single-letter A–D answer keys; non-empty and distinct source options; missing or invalid keys are explicitly reported and must not be labelled fully graded. Original question text is not changed by the audit.
- Paper 2: confirmed credit must be within paper and part maxima. Correct method credit survives an incorrect final answer wherever supported by the source rubric. Conflicting answers and unsupported evidence cannot earn invented points.
- Written marking: **unresolved** is not **incorrect**. A partially supported response retains confirmed marks, but is not marked final if a known rubric criterion remains unresolved.
- Source verification: historical question transcription, rubric and answer validation remain explicit independent checks. A passing synthetic benchmark does not verify an unverified historical source.
- Provenance: a final result must identify the paper, subject, grading/bank/rubric versions and an unchanged snapshot of the submitted answers. A mismatched snapshot hash fails the release audit.
- AI: optional enhancements may exist, but none are needed for the deterministic marking and release gates.

## Technical coverage

The final gate resides in `src/grading/finalExamReleaseAudit.js`. Regression coverage is in `src/grading/finalExamReleaseAudit.test.js`. Existing end-to-end subject suites, official-rule calibrations, source-bank structural audits, CI build and isolated PostgreSQL marking checks remain required.

The Paper 2 scoring interface differs between subjects (for example, `score` vs. `confirmedMarks`). The final audit consumes explicitly reconciled evidence, instead of guessing unprovided status fields and silently announcing a final score. Integrating this release gate into every possible publishing path is a separate deployment concern; this batch's tests prove only the paths and fixtures exercised.

## What remains after this cycle

Further cases should be **defect-driven** rather than another unbounded series of implementation batches. Unresolved valid synonyms, incomplete historical source verification, image/drawing evidence and nuanced essay assessment can still require rubric-specific updates. Reports and dashboards must preserve these caveats; do not claim universal examiner-equivalent marking without independently verified reference cases.

### Merge acceptance

Before merging Batch 14, require the complete GitHub PR workflow to pass: historical POB canary, regression suites, marking database/worker, production application build, and the final gate's adversarial cases. Record the merge and CI run in the PR review history.
