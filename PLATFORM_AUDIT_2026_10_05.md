# SPARK grading and platform audit — 5 October 2026

Audited main: `793d38cfb45978b63510fd7df0bb32dc75a50d31`.
Implementation branch: `codex/platform-grading-audit-v3`.
No merge, deployment, or live database migration has been performed. User approval is required before merging.

## Findings and implemented changes

| Priority | Finding | Change |
| --- | --- | --- |
| High | Integrated Science extracted every number in a marking scheme, including `(1)` mark allocations and operands, as answer evidence. | Explicit criteria for the 27 calculation items separate working from numerical answers, check units, and permit curated equivalent units. The drawing-dependent magnification item is explicitly unassessed rather than graded against its example value. |
| High | Table cells were concatenated, so answers in the wrong rows could receive marks. | All six authored tables now have individual blank-cell answer mappings. Multi-part products require all components. |
| High | Graph prose could earn marks without correct coordinates. | Numerical graphs use explicit coordinate pairs or unambiguous source tables. Unique points and axis labels are checked separately. Unsupported construction criteria and series are shown as unassessed, with a score range rather than silently represented as confirmed errors. |
| Medium | Substring and synonym matching accepted scientifically different answers. | Word-boundary matching, conservative negation checks, removal of air/oxygen equivalence, strict structured-answer evidence, and sentence-punctuation handling. |
| High | English timed submission could use an old closure containing stale answers. Integrated Science restarted clock polling on every answer change. | Latest-submit references and stable timer effects. A rendered-component regression proves that expiry saves newly typed answers without extra keystroke polling. |
| Medium | Server timestamps were compared directly with the student's local clock. | Translate the remaining server duration into a client deadline. Duplicate start clicks are guarded. |
| High | Authenticated users could directly update their own attempt deadlines, submitted responses and scores. | Forward SQL migration removes client write policies/privileges, restricts function execution, validates scores and payloads, pins currently integrated timed-paper durations, and adds an owner/time lookup index. Owned, locked, idempotent RPC submission remains available. |
| Medium | Snapshot freezing protected only the top-level record. | Submitted response snapshots are recursively frozen. |
| High | Spreadsheet normalization replaced column X with multiplication; permissive commutation could ignore precedence. | Preserve column X and restrict commutation to simple operands. |
| Medium | Pseudocode branch evidence extended beyond ENDIF; unrelated variable mentions earned input marks. | Bound branch outputs to the conditional, reject contradictory branch outputs, recognize input variables in input statements, accept the assignment arrow, and reject decimal extensions of the expected threshold. |
| High | Benchmark readiness accepted missing numeric marks and could pass despite disagreements. Error rates used the wrong denominators. | Strict mark validation, duplicate-case rejection, class-specific false-award/rejection rates, malformed official-case rejection, and automatic failure on supplied reference-score disagreements. No teacher-review gate. |
| High | Production deployment built without running the regression suite. | Deployment now runs all tests before building and uploading. |
| Medium | Dependency audit reported 80 findings. | Compatible patches in the lockfile reduce this to 65: 58 high, 4 moderate, 3 low. No forced major-version replacement. |

## Synthetic reference data

`src/grading/fixtures/scienceSyntheticBenchmark.json` contains 24 explicit responses and reference marks, covering correct answers, partial working, incorrect units, numeric guessing, alternative units, scientific notation and missing responses. Additional generated tests check every calculation against mark-allocation guesses and verify rubric coverage across the bank.

These are engineering regression cases derived from the local authored bank. They are not anonymised student submissions, independently marked papers, or evidence of examiner-level agreement. Existing cross-subject calibration tests remain in place. The new data is useful for repeatable automated checks without introducing a human marking dependency.

## Scope and important limits

The review covered grading, response provenance, exam timers, attempt permissions, deployment gates, dependency advisories, and inspection of progress-report and push-delivery entry points. Existing regression tests cover the broader application. This is not a penetration test, live-database audit, load test, or exhaustive review of every lesson and screen.

- Written-response grading still uses lexical heuristics. It can miss valid paraphrases or accept explanations that contain the right words with the wrong reasoning. The new conservative negation filter can reject a valid response containing an unrelated negative statement. Structured checks are stronger; prose scores remain estimates.
- Science calculation method matching is deliberately constrained. Some valid rearrangements, working with interleaved unit annotations, error-carried-forward solutions, and equivalent units beyond the curated list still need richer authored rules. No claim of universal numerical equivalence is made.
- The graph editor automatically draws and scales the plot. Those actions cannot demonstrate the candidate's own construction skill. Categorical and multiple-series graph support, independent axis selection, curve fitting and drawing geometry need further online editor and grader development. The review now exposes the unassessed marks. Drawing notes remain low-confidence estimates, not verified geometry.
- The database stores **client practice estimates**, not trusted server-computed marks. The migration protects writes and adds `score_authority` and late-arrival metadata; it does not certify browser-generated grades. Late submissions are preserved for practice and flagged. Other subject exam clocks are not yet wired to these server RPCs.
- The checksum remains non-cryptographic provenance, not a security signature.
- Timer translation corrects clock offset at synchronization; it is not a proctoring system or a guarantee against deliberate browser tampering. Server persistence failures and offline fallbacks still need an explicit retry/status experience.
- Database changes are prepared but unapplied. No local PostgreSQL/Docker executable was available, so migration behavior has not been exercised against a database in this audit. Apply and test ownership, direct-write denial, invalid-payload rejection, duration enforcement and repeated submission in staging before production.
- Remaining dependency findings are concentrated in the older CRA build/development toolchain. Their presence does not establish an exploit in the deployed static application. A maintained build-tool migration needs its own compatibility pass; `npm audit fix --force` proposes an unusable replacement and was not used.

## Recommended next online-only improvements

1. Extend the graph/drawing editor to capture assessable actions: named series, axis bounds, scale intervals, labels attached to objects, and candidate-controlled construction. Feed those structured actions directly into deterministic rubrics.
2. Add a versioned, queued server marking service for responses that require richer semantic or visual assessment. Use bounded concurrency, cached immutable results, per-attempt idempotency and automated disagreement checks; keep deterministic numerical checks first. Teacher marking is not a prerequisite.
3. Expand synthetic adversarial benchmarks across every subject and writing criterion, including contradiction, irrelevant keyword stuffing and acceptable paraphrases. Keep synthetic regression performance separate from claims about real student accuracy.
4. Replace the legacy build toolchain and add load tests for simultaneous exam starts, clock reads and submissions. Use the measured results to set capacity limits.

## Validation

Baseline: 289 suites / 2,009 tests passed.

After the changes and compatible dependency updates: 291 suites / 2,072 tests passed. The final condition-parser and numerical-tolerance refinements added four cases; all 93 tests in the four affected grading suites passed after those refinements. The rendered timer test also passed in the full run. The final production rebuild exited successfully with lint warnings. `git diff --check` passed. Raw command output is retained locally in the ignored `.audit-output/` directory.

The SQL migration has not been applied or database-tested. No live accounts, emails, notifications, or deployments were used for validation.
