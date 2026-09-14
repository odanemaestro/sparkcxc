# SPARK Physics Paper 1 audit integration V1

## Purpose

This integration connects the Phase 1 to 38 Physics audit work to the current SPARK Paper 1 codebase without copying the full audit archive into the public application repository.

## What is integrated

- Compact audit provenance for Phases 1 to 38.
- Status for all 12 identified Paper 01 sittings.
- The nine source-text-proofed sittings.
- June 2019 and January 2020 source-integrity holds.
- January 2021 source-recovery hold.
- All 13 known answer-adjudication holds.
- Historical section-count benchmarks from the nine source-text-proofed sittings.
- The count of 23 locked gold-standard SVG references from January 2015, June 2015 and June 2016.
- A repeatable local validation command.
- A student-facing quality note in the Paper 1 library.

## What is deliberately not imported

- Source PDFs.
- Source crops.
- Verbatim past-paper question banks.
- Draft SVGs.
- June 2019 and January 2020 reference-only question text.
- Any January 2021 question text or answer key.

The nine current SPARK Paper 1 practice papers remain original SPARK items. This avoids replacing a validated 540-item practice bank with source material that still contains adjudication or source-parity holds.

## Validation command

```powershell
npm run audit:physics-paper1
```

Expected status: `PASS`.

The validator also reports if the current authored section target sits outside any observed historical section range. This is an authoring signal, not an automatic rewrite rule.

## Baseline

- Git commit: `200e89efe75254aa036f8c1fd2e0650c60b8b0c8`
- Baseline archive SHA-256: `2e7aa52295fe61366a1d07744ea296a66e954699fb7cc8c2fb84ac4a320d04ce`
- Audit master SHA-256: `4e5db34672e9512fcae8566ca02b465c7480789207a6974630b423ba0aecc1da`
