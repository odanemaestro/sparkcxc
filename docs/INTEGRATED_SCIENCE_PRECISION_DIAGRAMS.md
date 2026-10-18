# Integrated Science precision SVG update

The existing Integrated Science practice bank now uses precision-refined SVG artwork in **33 placements**, covering **58 questions** (49 Paper 1 and 9 Paper 2). The update includes 30 inline figures and 3 answer-option figures.

## Artwork and assessment compatibility

The refined collection supplies the eye, ear, female reproductive system, flower section, cells, heart, digestive system, molar, germination/soil apparatus, coastal circulation, arm, distillation, rusting, lather, trolley, pulley and flame artwork. Source-exam letters are adapted to each existing SPARK question's required targets. Germination temperatures, soil volumes, masses, speeds, treatment order, sign borders and pulley support counts retain the bank's question conditions and marking expectations.

Only SVG values in the three module JSON files changed. Question IDs, text, options that are not SVGs, answer letters, explanations, numerical tables, response definitions, marks and marking schemes were compared with the pre-update bank and are unchanged. The canonical counts remain 1,561 Paper 1 items and 84 Paper 2 questions.

Figures with different datasets or no suitable refined counterpart retain their existing assessment-specific artwork. This includes the calibrated thermometers, specialist circuits, hibiscus drawing specimen and their original measurement tasks.

## Delivery

The existing inline SVG renderer continues to render the bank. SVG style rules are moved onto their own elements and internal IDs are namespaced per field, keeping definitions and typography local to each diagram. Source title/description metadata is replaced by the bank's existing generic accessible title. A revision query on the bank fetch gives the updated artwork a new browser-cache key.

`public/integrated-science/bank/precision-diagrams.json` records each changed field, affected question IDs, source filenames, SHA-256 hashes, visible labels and adaptation decisions.

## Verification

- All 33 replacements parse as SVG, use vector content only and render successfully.
- Every normalized inline SVG renders pixel-for-pixel identically to its reviewed adapted artwork. There are no global SVG style rules, outside image dependencies or duplicate IDs across the replacement fields.
- Eye, ear, female, heart, arm, pulley and rusting targets received an independent question/rubric cross-check. All replacements received visual inspection.
- Integrated Science regression tests: 14 suites, 200 tests passed. Production build passed.
- Full repository run: 512 suites passed initially; the remaining suite had one Windows checkout CRLF-versus-LF SQL assertion. It passed on rerun with normal LF input; no SQL change is included.
- The bank loader's current-revision fetch and existing request coalescing/cache behavior were checked.

## Existing editorial issue retained

IS-M3-P2-16 uses effort and load distances implying a velocity ratio of four, while its existing illustration has two supporting rope strands. That figure remains unchanged to avoid altering assessment data during an artwork replacement. The separate Paper 1 two-strand and single-fixed-pulley questions receive their correctly matched refined artwork.

## Placements

| Module | Bank field | Questions |
|---|---|---|
| 1 | `sharedStimuli.M1-S-EYE.svg` | IS-M1-P1-144, IS-M1-P1-145, IS-M1-P1-146 |
| 1 | `paper02.7.parts.0.svg` | IS-M1-P2-08 |
| 1 | `sharedStimuli.M1-S-EAR.svg` | IS-M1-P1-157, IS-M1-P1-158, IS-M1-P1-159 |
| 1 | `sharedStimuli.M1-S-FEM.svg` | IS-M1-P1-068, IS-M1-P1-069, IS-M1-P1-070 |
| 1 | `sharedStimuli.M1-S-FLOWER.svg` | IS-M1-P1-031, IS-M1-P1-032, IS-M1-P1-033 |
| 1 | `paper02.0.parts.0.svg` | IS-M1-P2-01 |
| 1 | `sharedStimuli.M1-S-ACELL.svg` | IS-M1-P1-012, IS-M1-P1-013, IS-M1-P1-014 |
| 1 | `sharedStimuli.M1-S-PCELL.svg` | IS-M1-P1-015, IS-M1-P1-016 |
| 1 | `paper02.1.parts.0.svg` | IS-M1-P2-02 |
| 1 | `sharedStimuli.M1-S-GERM.svg` | IS-M1-P1-037, IS-M1-P1-038 |
| 1 | `sharedStimuli.M1-S-FUNNEL.svg` | IS-M1-P1-051, IS-M1-P1-052 |
| 1 | `paper02.2.parts.0.svg` | IS-M1-P2-03 |
| 1 | `sharedStimuli.M1-S-HEART.svg` | IS-M1-P1-113, IS-M1-P1-114, IS-M1-P1-115, IS-M1-P1-116 |
| 2 | `sharedStimuli.M2-S-GUT.svg` | IS-M2-P1-060, IS-M2-P1-061, IS-M2-P1-062, IS-M2-P1-063 |
| 2 | `paper02.1.parts.1.svg` | IS-M2-P2-02 |
| 2 | `sharedStimuli.M2-S-TOOTH.svg` | IS-M2-P1-072, IS-M2-P1-073 |
| 2 | `paper02.3.parts.0.svg` | IS-M2-P2-04 |
| 2 | `paper01.396.stimulus.svg` | IS-M2-P1-177 |
| 2 | `paper01.402.stimulus.svg` | IS-M2-P1-367 |
| 3 | `sharedStimuli.M3-S-ARM.svg` | IS-M3-P1-153, IS-M3-P1-154 |
| 3 | `paper02.7.parts.0.svg` | IS-M3-P2-08 |
| 3 | `sharedStimuli.M3-S-DIST.svg` | IS-M3-P1-092, IS-M3-P1-093 |
| 3 | `sharedStimuli.M3-S-RUST.svg` | IS-M3-P1-188, IS-M3-P1-189, IS-M3-P1-190 |
| 3 | `paper02.4.parts.0.svg` | IS-M3-P2-05 |
| 3 | `sharedStimuli.M3-S-SOAP.svg` | IS-M3-P1-072 |
| 3 | `sharedStimuli.M3-S-TROL.svg` | IS-M3-P1-141 |
| 3 | `sharedStimuli.M3-S-BT.svg` | IS-M3-P1-404 |
| 3 | `paper01.329.stimulus.svg` | IS-M3-P1-146 |
| 3 | `sharedStimuli.M3-S-WC.svg` | IS-M3-P1-319, IS-M3-P1-320 |
| 3 | `paper02.5.parts.1.svg` | IS-M3-P2-06 |
| 3 | `paper01.451.options.B` | IS-M3-P1-202 |
| 3 | `paper01.452.options.B` | IS-M3-P1-203 |
| 3 | `paper01.459.options.A` | IS-M3-P1-457 |
