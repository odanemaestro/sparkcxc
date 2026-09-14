# SPARK Physics Lab and Paper 1 Quality Audit V2.4

## Scope

This pass responds to the manual browser QA of the Physics Paper 1 simulator and Physics Labs & Practicals area. It treats clarity, interactivity, spacing, graph behaviour and CSEC-style practical structure as production requirements rather than cosmetic extras.

## Paper 1

SPARK continues to carry 11 original 60-item Physics Paper 1 practice papers. The Phase 1 to 38 source audit is a quality benchmark and evidence record, not a one-to-one source for 38 simulator papers. New simulator papers are only added when a full 60-item paper can be authored without weakening topic balance, answer balance, source safeguards or duplicate control.

Papers J and K now meet the same visual-question expectation as the earlier papers. Paper J contains 10 diagram-dependent items and Paper K contains 12. Every runtime Paper 1 paper now contains at least 8 diagram items. The new figures use accessible inline SVG geometry with currentColor so they remain readable in light and dark themes.

## Complete interactive audit

All 73 registered Physics interactives are mapped to a real implementation:

| Section | Registered | Implemented |
| --- | ---: | ---: |
| Mechanics | 26 | 26 |
| Thermal Physics | 9 | 9 |
| Waves and Optics | 11 | 11 |
| Electricity and Magnetism | 17 | 17 |
| Atomic Physics | 10 | 10 |
| Total | 73 | 73 |

Six Electricity entries that previously fell through to a generic information-only panel now have proper interactive implementations: charge transfer, electrostatic induction, cell recharge, diode rectification, technology impact and current around a conductor/solenoid.

## Waves and Optics corrections

The Wave Graph Explorer now redraws the wave when frequency, wavelength or amplitude changes. It supports displacement-position and displacement-time views and explicitly labels the vertical and horizontal axes with their quantities and units.

The electromagnetic spectrum explorer now presents extreme quantities in learner-friendly units. For example, gamma wavelength is displayed as 1 pm, with the SI equivalent 1 × 10⁻¹² m available in the teaching note, instead of raw programming notation such as 1.00e-12 m.

Young's double-slit remains an interactive interference model and now also has a complete CSEC practical workflow. The practical includes aim, apparatus, variables, method, results table, graph, calculation, conclusion, sources of error, precautions, laser safety and follow-up questions.

The double-slit fringe display, pitch waveform and lens-ray model now respond to their controls rather than remaining visually fixed.

## Thermal and Atomic corrections

The Kelvin-temperature extrapolation activity now has a responsive graph with labelled axes and a visible -273 °C intercept.

Atomic controls now protect physically invalid mass-number and atomic-number combinations. Nuclear notation and mass-energy outputs use readable mathematical scientific notation rather than raw e notation.

## Practical coverage

The practical library now contains 26 full practical workflows. Seventeen include graph work. The required audit priorities include Hooke's law, moments, Archimedes' principle, specific heat capacity, specific latent heat, speed of sound, Young's double-slit interference, Ohm's law and transformers.

Every practical retains the CSEC-oriented sequence used throughout the Physics upgrade: Aim, Apparatus, Variables where relevant, Method, Results, Graph or Calculation, Conclusion, Sources of Error, Precautions and follow-up questions.

## Layout and language

Shared lab headings, descriptions, metric cards, controls, notes and practical notebook sections use consistent vertical spacing and line height. Mobile layouts collapse metric and control grids to prevent cramped text.

Student-facing wording follows the supplied Physics source voice standard: direct definitions and laws, concise explanation, formulas and diagrams where useful, worked reasoning and CSEC-style tasks. Internal audit language is kept out of the student experience.

## Automated gates

The V2.4 validators enforce:

- 11 Paper 1 papers and 660 questions;
- at least 8 diagram items in every Paper 1 paper;
- valid SVG colour and accessibility rules;
- 73 of 73 registered interactives mapped to implementations;
- no generic Electricity fallback for the six corrected models;
- learner-friendly electromagnetic-spectrum notation;
- dynamic wave graph and labelled axes;
- a Young's double-slit practical workflow;
- at least 26 practicals and 17 graph workflows;
- the existing source and adjudication holds.

Full Jest and production-build regression tests should still be run after the patch is applied to the local SPARK repository.
