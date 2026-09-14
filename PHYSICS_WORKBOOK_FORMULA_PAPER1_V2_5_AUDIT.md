# SPARK Physics Workbook, Formula List and Paper 1 Expansion V2.5

## Scope

V2.5 expands the current Physics release without importing verbatim historical Paper 01 material into the student simulator.

Student-facing additions:

- SPARK Physics Workbook covering all five sections, 25 topics and 189 syllabus objectives.
- Physics Formula List with 64 equations, relationships and direction rules.
- Practice Papers L, M, N and O.
- 15 total Physics Paper 1 simulator papers.
- 900 total original SPARK Paper 1 questions.

## Workbook standard

The Workbook uses the audited SPARK Physics study material as its content base so the Workbook and existing Study experience do not drift into competing versions of the course.

Each topic brings together:

- Study notes
- Exam focus
- Formulae and relationships
- Worked examples
- Data skills
- Objective-by-objective guidance
- Practical work
- Common mistakes
- Quick checks
- Exam language

The Workbook follows the direct classroom and examination-preparation style established by the supplied Physics material. Objective-level KC, UK and XS labels are not displayed because those labels are internal/inferred rather than official CXC labels attached to each syllabus objective.

## Formula List standard

The Formula List is explicitly labelled as a revision aid. It does not imply that students receive a Physics formula sheet in the examination.

Each entry includes:

- Topic code
- Quantity or rule
- Equation or directional relationship
- Symbol meanings or condition
- Units

The 64 entries span Mechanics, Thermal Physics and Kinetic Theory, Waves and Optics, Electricity and Magnetism and The Physics of the Atom. Magnetic direction rules are included beside numerical relationships because students must apply them in motor, generator and magnetic-field questions.

## Paper 1 copyright and authorship policy

Historical Paper 01 sources remain a private reference corpus for structure, objective selection, difficulty, distractor design, diagram archetypes and examination tone.

The student simulator does not import historical questions verbatim. Papers L to O use original SPARK wording, values, scenarios, distractors and SVG figures.

Every new item records original-item provenance. The release audit rejects:

- exact repeated stems
- repeated item identifiers
- numerical stem clones against earlier SPARK papers
- strong stem similarity against earlier SPARK papers and between L to O
- missing answer explanations
- answer-line and answer-key mismatches
- missing or generic misconception feedback
- invalid objective codes
- malformed A-D options
- SVGs without dark-mode inheritance or alt text
- SVG ids or marker definitions that can collide at runtime
- programmer-style scientific notation such as `1e-12`
- em/en dashes in the new student-facing Paper 1 copy
- generic generated-sounding question constructions

## CXC-style language and format gate

Papers L to O are written to resemble the tone and construction of CSEC Physics Paper 01 without reproducing source questions.

The gate requires:

- short, direct stems
- four parallel A-D choices
- one unambiguously best answer
- plausible distractors based on genuine misconceptions or calculation errors
- British/CXC spelling and conventional Physics terminology
- clean SI symbols and units
- completion stems that read grammatically with every option
- figures that supply information needed by the item rather than decorate it
- calculations and interpretations appropriate to a 75-minute, 60-item paper
- no tutoring/editorial phrases such as “A student is revising” or “Which statement is scientifically correct?”

## Paper L to O blueprint

Each new paper contains:

- 60 questions
- 75 minutes
- 50 Knowledge and Comprehension items
- 10 Use of Knowledge items selected by actual item demand, not simply the verb in the syllabus objective
- Section A: 17 items
- Section B: 8 items
- Section C: 9 items
- Section D: 19 items
- Section E: 7 items
- at least 8 original diagram-based items
- 60 distinct objective codes within the paper

The answer positions in each of Papers L to O are balanced at 15 A, 15 B, 15 C and 15 D. Across L to O, 153 distinct syllabus objectives are used. Across the full A to O bank, all 189 objectives remain represented.

## V2.5 validation commands

```powershell
npm run audit:physics-paper1
npm run audit:physics-upgrade
npm run audit:physics-resources
npm test -- --watchAll=false --detectOpenHandles
npm run build
git diff --check
```

V2.5 should not be committed until all checks pass in the target SPARK checkout.

## Pre-package validation result

The final pre-package audit reconstructed the complete 15-paper bank and checked Papers L to O against Papers A to K.

Results:

- 15 papers loaded successfully.
- 900 unique item identifiers.
- 900 unique normalized stems.
- All 189 syllabus objectives represented across the full bank.
- Papers L to O each retain 60 different objective codes.
- Papers L to O each retain 50 KC and 10 UK items.
- Papers L to O each retain 15 A, 15 B, 15 C and 15 D keyed answers.
- Papers L to O contain 9, 10, 8 and 8 diagram-based items respectively.
- No exact repeated stem remains between Papers L to O and the reconstructed A to K bank.
- No numerical stem clone remains between Papers L to O and the reconstructed A to K bank.
- No new-to-old stem pair reached 0.60 Jaccard token similarity after the final editorial rewrite pass.
- The Physics resource validator passes with 5 sections, 25 topics, 189 objectives and 64 formula or relationship entries.

The final validator must still be run in the target SPARK checkout after installation. The installer performs this check and rolls back if it fails.
