# SPARK Paper 2 CXC calibration benchmark

## Purpose

SPARK validates Paper 2 marking against official CXC evidence translated into permanent gold-standard calibration cases.

The benchmark uses:
- official CXC syllabuses;
- official specimen papers and mark schemes;
- CXC subject/examiner reports;
- historical CXC marking patterns where useful;
- candidate-style responses authored by the SPARK calibration team to isolate difficult marking decisions.

These responses are not represented as real candidate scripts. They are controlled calibration cases used to test whether SPARK applies CXC marking rules consistently.

## Validation model

SPARK uses one CXC-grounded calibration system.

1. **Official-rule cases** test deterministic rules taken directly from CXC material.
2. **Adjudicated gold cases** are candidate-style responses reviewed by the SPARK calibration team and assigned a gold-standard mark using the relevant CXC evidence.
3. SPARK's production grader marks the same response.
4. Any disagreement is investigated. The benchmark is not weakened simply to make it pass.
5. Once resolved, the case remains in the permanent regression suite.

This is an ongoing quality system. We are not waiting for outside examiners.

## Evidence hierarchy

1. Current official CXC specimen mark scheme for the syllabus version used by SPARK.
2. Official CXC subject/examiner report.
3. Official syllabus assessment guidance and profile descriptions.
4. Older official specimen material where the current syllabus does not provide an equivalent rule.
5. Historical CXC marking patterns used only where they remain compatible with the current syllabus.

## Gold-standard case requirements

Every adjudicated case must include:
- a unique case ID;
- subject and paper;
- the candidate-style response;
- the expected gold mark;
- criterion-level gold decisions where applicable;
- the official CXC source or sources used;
- a short rationale for any judgement that is not obvious;
- adjudicatedBy = spark-calibration-team;
- adjudicated = true.

The gold mark is the expected SPARK mark until stronger official CXC evidence requires the case to be revised.

## Subjects

### English A
Current source: CXC 01/G/SYLL 25 specimen Paper 02 mark scheme, effective May-June 2027.
Checks include the 50-word summary requirement, three-point summary structure, 7/7/16 extended-response profiles, short-response caps, paraphrasing, organisation and mechanics.

### Mathematics
Current source: Mathematics specimen Paper 02 mark scheme effective May-June 2027.
Checks distinguish method/process credit from correct-answer-only credit, including questions where working is explicitly required.

### Physics
Sources: official Physics specimen Paper 02 mark scheme and current CXC subject reports.
Checks include numerical value and unit handling, compatible unit conversion, ambiguous alternatives, graph criteria and follow-through behaviour.

### Information Technology
Source: official IT specimen Paper 02 mark scheme.
Checks cover spreadsheet formulas, equivalent formula forms and algorithm/branch logic while rejecting changed operators and reversed logic.

### Social Studies
Sources: current official specimen mark scheme and CXC subject reports.
Checks include multi-part definitions, distinct points, linked development and the difference between stating and properly developing an answer.

### Integrated Science
Source: current official specimen Paper 02 mark scheme.
Checks criterion-by-criterion marking, partial credit, calculations, labels, tables and full/partial/limited explanations.

## Release gate

The CXC calibration system is ready only when:
- all six Paper 2 subjects are represented;
- each subject has multiple CXC-grounded cases;
- all official-rule cases pass;
- all adjudicated gold cases in the active benchmark agree with SPARK;
- the full SPARK regression suite passes;
- the production build passes.

## Metrics

For adjudicated gold cases SPARK measures:
- exact mark agreement;
- within-one-mark agreement;
- mean error;
- mean absolute error;
- maximum absolute error;
- false criterion awards;
- false criterion rejections.

These metrics compare SPARK with the adjudicated CXC gold standard created by the SPARK calibration team.

## Maintenance rule

Whenever a grading defect is found, or a new CXC source reveals a stronger marking rule:
1. add or update a calibration case;
2. document the CXC evidence;
3. correct the grader if needed;
4. keep the case permanently so the defect cannot return.

The benchmark should grow as SPARK grows.
