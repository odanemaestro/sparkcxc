# SPARK Physics Comprehensive Integration V2

This integration combines the controlled Physics Paper 1 audit layer with the study-content and practical-lab upgrades identified during Physics audit Phases 1 through 38.

## What this changes

### Paper 1 audit integration

- Keeps all nine existing SPARK Physics Paper 1 practice papers unchanged.
- Keeps the existing 540 authored practice items unchanged.
- Adds the Phase 1 to 38 audit reference and validator.
- Preserves every answer-adjudication hold.
- Preserves the January 2021 source hold. No January 2021 source question is released to students by this patch.
- Records the locked gold-standard SVG inventory without replacing current student assets automatically.

### Study content upgrade

Every one of the 25 Physics topics now receives a dedicated CSEC study toolkit beside the existing lesson content.

Each toolkit adds:

- examination focus points;
- worked examples with calculation steps;
- a data, graph or evidence-handling task;
- short self-check questions with answers;
- examination-technique guidance.

The existing scientifically hardened lesson content stays in place. The toolkit adds the shorter definition, explanation, example and question pattern recommended by the audit instead of bulk-replacing the original lessons.

Coverage totals:

- 25 of 25 topics;
- 31 worked examples;
- 25 data or graph skills;
- 51 quick checks.

### Practical and lab upgrade

The existing simulations remain available. A shared CSEC practical notebook now appears beside supported simulations.

Practical notebooks include, where appropriate:

- aim;
- apparatus;
- variables;
- method;
- editable results table;
- live graph;
- automatic best-fit gradient and intercept guide;
- analysis and calculations;
- accuracy and improvements;
- safety;
- student conclusion and evaluation fields;
- CSEC follow-up questions.

Notebook entries are stored locally in the browser for the active user and interactive model.

Coverage totals:

- 22 full practical workflows;
- 17 Physics topics represented;
- all five syllabus sections represented;
- 15 graph-enabled practicals.

The five explicit production blueprints from the audit are implemented:

- A3 force-extension and Hooke law;
- B3 specific heat capacity;
- B3 specific latent heat of fusion;
- C2 speed of sound using echo measurements;
- D4 potential difference, current and resistance.

Additional workflows cover pendulum work, density by displacement, centre of gravity, motion graphs, power, pressure-depth, gas laws, cooling and radiation, wave graphs, refraction, focal length, magnetic fields, motor effect, induction, random decay and half-life.

### New Thermal B3 simulator

A specific latent heat of fusion simulator is added to B3. Students vary voltage, current, heating time, measured melted mass and background melting. SPARK calculates electrical energy, corrected melted mass and the measured specific latent heat.

## Quality gates

The patch includes two dependency-free validators:

```text
npm run audit:physics-paper1
npm run audit:physics-upgrade
```

The Physics upgrade validator checks all 25 topic toolkits, practical structure, graph column mappings, section coverage, required audit blueprints and the B3 latent-heat interactive.

After applying the patch, also run the normal SPARK regression suite and production build:

```text
npm test -- --watchAll=false
npm run build
```

## Production safety

This patch does not release source-held January 2021 Paper 1 content. It does not silently resolve held answer-key disputes. It does not replace existing approved content with raw source material. The audit source remains evidence and production guidance, while student-facing changes are integrated through SPARK's existing Physics architecture.
