# Chemistry diagram review, 13 October 2026

Scope: the Chemistry course data, Paper 02 practice and historical model/source figures, interactive labs, and the locally installed Paper 01 diagram assets. This review concerns diagrams; it does not approve historical question wording or authored mark schemes.

## Inventory and evidence

- Initially 154 distinct SVGs exported by Chemistry data modules; 156 after introducing separate electrode-material and gas-collection variants. All were rendered and visually examined for scientific meaning, bond connectivity, apparatus connections, labels, scale direction and units. The repeatable inventory command is `node tools/audit-chemistry-diagrams.cjs`.
- The inventory parser checks SVG XML, finite viewBoxes and text anchor coordinates. The new regression suite also checks organic atom valences from the rendered bond geometry, as well as question/diagram agreement for electrodes and collection methods.
- The 161 SVG traces in the user's locally installed `public/chemistry-paper1` bank were rasterised at native size and compared with their matching supplied PNG crops. All 161 have identical binary ink masks at a tested threshold. These files are untracked in the user's other checkout and are not added to this PR. This comparison confirms tracing fidelity to the supplied crops; it is not independent approval of the questions or answer keys. Incorrect multiple-choice diagrams must remain as distractors.
- Original source scans were opened for the numerical figures in 2007, 2015–2019 May/June, January 2019–2021, May/June 2022, January 2023 and January/May–June 2025. Compared burette/thermometer/dial/syringe scale direction, plotted/unplotted requirements, units, the unusual 2016 graph orientation, and the 2018/2025 axis breaks.
- Historical figures retain their existing provisional/source-approximation metadata. A visual/structural review does not supply the five independent approvals required by the historical publication gate. Exact pixel overlays of every historical source figure and independent marking review are **not** certified by this review. No publication approvals were fabricated or changed.

## Corrections

1. Practice-paper electrolysis now depicts inert electrodes for the inert-electrode question and copper electrodes for the copper-electrode investigation.
2. Gas preparation now has a connected delivery route and an appropriate collector/drying agent: upright jar and calcium chloride for carbon dioxide; inverted dry jar and calcium oxide for ammonia.
3. The oxygen-over-water model now immerses the inverted jar mouth and brings the delivery tube through the submerged opening.
4. Gas-syringe model answers now show an airtight stopper, graduations and a movable piston rather than a closed rectangular chamber.
5. Distillation shows a separate inner vapour tube/water jacket, coolant entering at the low end and leaving at the high end, a thermometer bulb at the side arm, an open receiver and an electrically heated bath for the ethanol-water mixture.
6. The corrected conductivity circuit has continuous connections to the lamp and visible immersed electrodes; the deliberately incomplete printed source circuit is retained separately.
7. The triglyceride figure connects its three glycerol carbons with two bonds.
8. The amino-acid model explicitly shows the alpha carbon and side chain. The starch model uses labelled glucose-residue boxes rather than misleading four-sided skeletal rings, and identifies the alpha-1,4 links.
9. A zero-length C–H bond in the 2-methylpropene model is now visible. Geometry-based valence tests cover the standalone displayed organic models; composite panels reuse those models.
10. Titration leader lines and the 2025 copper-graph time labels no longer run through their text/axis.
11. Lab hydrogen shells overlap with the shared pair inside; monovalent-metal ion/electron counts balance; the electrolytic cell shows a distinct DC supply and distinguishes lead/bromine from copper/oxygen visually.

## Chemistry references

- Royal Society of Chemistry: [covalent bonding](https://edu.rsc.org/cpd/how-to-teach-covalent-bonding/4016381.article), [molten lead(II) bromide electrolysis](https://edu.rsc.org/experiments/electrolysis-of-molten-leadii-bromide/1725.article), and [copper(II)/ammonia observations](https://edu.rsc.org/experiments/an-equilibrium-using-copperii-and-ammonia/1711.article).
- User-supplied original CSEC Paper 02 archive and supplied Paper 01 PNG crops, reviewed locally. Source misprints and deliberately incomplete apparatus remain distinct from corrected model answers.

## Validation

The Chemistry suite passed 131 tests across 11 suites after the corrections. Local full-app compilation passed with the alternate Vite/Oxc verification configuration used for this Windows sandbox. GitHub's standard full regression, marking-database/worker and production-build workflow must pass on the final PR commit before merge.
