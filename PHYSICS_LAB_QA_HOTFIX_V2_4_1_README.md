# SPARK Physics Lab QA Hotfix V2.4.1

This hotfix is applied on top of V2.4.

It addresses the two failures reported by the new V2.4 comprehensive lab test suite and strengthens the wave graph teaching experience.

## Changes

- Range controls now listen to the browser's continuous input event as well as change, so slider movement updates the visual model immediately.
- Wave graph tests use the same input event emitted by real range sliders.
- The displacement-position and displacement-time graphs now include clearer tick marks, labelled axes and mode-specific guidance.
- The interface explicitly explains which quantities alter each graph. On a displacement-position graph, wavelength and amplitude alter the plotted shape. On a displacement-time graph, frequency and amplitude alter the plotted shape.
- Electromagnetic-spectrum test assertions no longer depend on the internal HTML produced by MathText for superscripts.
- Electromagnetic-spectrum output remains learner-friendly, including values such as 1 pm and 3 × 10²⁰ Hz rather than raw programming notation.
- No Paper 1 question content, answer key, source hold or adjudication decision is changed.

## After applying

Run:

npm run audit:physics-paper1
npm run audit:physics-upgrade
npm test -- --watchAll=false --detectOpenHandles
npm run build
git diff --check
git status
