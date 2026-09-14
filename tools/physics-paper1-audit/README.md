# Physics Paper 1 audit integration

This folder validates the compact Physics Paper 1 audit reference stored in the SPARK repository.

The large Phase 1 to 38 audit archive stays outside the public application repository. The runtime does not receive source scans, source crops, verbatim past-paper banks or draft SVG reconstructions.

Run:

```powershell
npm run audit:physics-paper1
```

The validation checks:

- Phase 1 to 38 provenance is recorded.
- January 2021 remains on source hold.
- No audited source sitting is enabled for direct student import.
- All nine current SPARK Paper 1 practice papers remain complete.
- All 540 current practice items remain unique.
- Every current Physics objective is represented across the nine practice papers.
- Current answer keys remain internally consistent.
- Original SPARK item provenance remains present.
- The 13 source-question adjudication holds remain recorded.

The script reports section-distribution differences against the audited source benchmark without rewriting the current practice papers.
