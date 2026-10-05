# SPARK Paper 2 CXC calibration benchmark

## Purpose

This benchmark checks SPARK Paper 2 marking behaviour against external CXC evidence. It is deliberately separate from the independent-examiner benchmark.

The official-rule benchmark uses:
- official CXC specimen mark schemes and keys;
- current/recent CXC subject reports where they state how responses were assessed or where candidates commonly lost marks;
- synthetic SPARK-authored responses designed to isolate one marking rule at a time.

It does not copy complete examination questions into the repository and it does not label synthetic responses as candidate scripts.

## Evidence hierarchy

1. Current official specimen mark scheme for the syllabus version used by SPARK.
2. Official CXC subject report/examiner commentary.
3. Older official specimen material where the current syllabus does not provide a newer equivalent rule.
4. Independent double-marked anonymised candidate scripts, when legitimately available, remain a separate validation layer.

## Subjects

### English A
Current source: CXC 01/G/SYLL 25 specimen Paper 02 mark scheme, effective May-June 2027.
Checks include the 50-word summary requirement, three-point summary structure, 7/7/16 extended-response profiles, the under-150-word persuasive cap and under-200-word literary cap. The May-June 2026 subject report is used as secondary evidence for main-point selection, paraphrasing, organisation and mechanics.

### Mathematics
Current source: Mathematics specimen Paper 02 mark scheme effective May-June 2027.
Checks distinguish computation/method/process credit from correct-answer-only credit and ensure items that explicitly require working do not silently receive method credit from an answer alone.

### Physics
Sources: official Physics specimen Paper 02 mark scheme and January 2026 subject report.
Checks include numerical value plus unit handling, compatible unit conversion, missing units and ambiguous competing numerical alternatives. The 2026 report specifically notes graph criteria and lost gradient marks from incorrect or omitted units.

### Information Technology
Source: official IT specimen Paper 02 mark scheme.
Checks cover exact/equivalent spreadsheet formula forms and algorithm branch/output structure while rejecting changed operators or reversed logic.

### Social Studies
Sources: 2023 official specimen mark scheme and January 2026 subject report.
Checks cover multi-element definitions and the official distinction between a partial point and a clearly developed point.

### Integrated Science
Source: official specimen Paper 02 mark scheme effective May-June 2027.
Checks criterion-by-criterion structured marking and partial-credit behaviour. The source explicitly uses full/partial/limited explanation bands on several items.

## Release gate

The CXC official-rule benchmark is considered ready only when:
- all six subjects are represented;
- each subject has multiple external-rule cases;
- the full official-rule suite passes;
- the regular SPARK regression suite passes;
- the production build passes.

This validates implemented marking rules against CXC evidence. It does not prove that SPARK will reproduce a trained examiner's holistic judgement on unrestricted prose.

## Independent examiner layer

The existing independent benchmark schema remains in place for anonymised scripts marked independently by two qualified markers and adjudicated. That layer measures exact agreement, within-one-mark agreement, mean absolute error, false awards and false rejections.

SPARK must never infer or fabricate examiner identities, marks or adjudication status to populate that dataset.
