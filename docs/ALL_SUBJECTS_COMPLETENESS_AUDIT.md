# SPARK All-Subject Completeness Audit V1

## Scope

This audit covers every current SPARK course:

- Mathematics
- Physics
- Information Technology
- Integrated Science
- Social Studies
- English A

The release gate checks study content, practice, Paper 1, Paper 2, graphs, diagrams, practical/lab experiences, interactive activities, grading surfaces, routing and course-level capability wiring.

## What was already complete

### Mathematics
- Full lesson bank is already authored rather than using generated placeholder lessons.
- Paper 2 already has a rich graph workspace with axis setup, scale selection, point plotting, curve/line tools, best-fit-line support, undo/clear and review rendering.
- Construction questions already use ruler/compass/protractor-aware interactive workspaces where permitted.
- Existing Paper 1, Adaptive Practice and Paper 2 grading suites remain release-gated.

### Physics
- The A1 Gradient Tool is live and recalculates from the student's selected coordinates.
- The Instrument Explorer is live for both vernier caliper and micrometer settings. The visual position and reading change with the controls.
- The course includes a practical notebook and a broad practical blueprint bank covering apparatus, variables, methods, tables, graphs, analysis, errors, accuracy, safety and follow-up questions.
- Physics keeps 15 full Paper 1 practice papers and 4 Paper 2 practice papers, alongside its simulations and section practice.

### Social Studies
- Every interactive activity type currently used by the four course units is implemented by the shared activity renderer.
- This includes source checks, research questions, questionnaire design, observation, comparisons, election/budget activities, sorting, fact/opinion, rate calculation, population pyramids, timelines, map work, family trees, problem/solution matching and action planning.
- Paper 1, Paper 2, short-answer grading and SBA tools remain available.

### English A
- All 29 lessons have worked examples and an interactive four-option quick check.
- Paper 1 and Paper 2 practice/grading remain release-gated.
- The completed-course navigation edge case is fixed so a fully completed generic course reopens from the beginning rather than a stale topic deep link.

## Gaps found and fixed

### Integrated Science practical work
Integrated Science had practical and investigative questions in the exam bank, but no first-class practical-lab experience in the Practice hub.

Added a Practical Skills Lab with four checked stations:

1. Plot and label an experimental graph.
2. Identify independent, dependent and controlled variables.
3. Process repeat measurements and calculate a rate.
4. Evaluate experimental limitations and reliability improvements.

Completion is saved through the shared subject-progress system.

### Integrated Science graph workspaces
Two graph surfaces were incomplete:

- Topic-practice Paper 2 graph responses were previously only a blank grid.
- Full Paper 2 graph responses accepted typed points but did not provide a complete graph-building experience for bar charts, multi-series graphs and keyed data.

The upgraded graph tools now support:

- live line/curve plotting;
- categorical bar charts;
- axis labels;
- configurable axis ranges in the full exam;
- click-to-plot in the full exam;
- typed coordinate correction;
- multi-series data;
- series labels and graph keys;
- visual evidence passed into automatic grading.

### Information Technology spreadsheet charts
The Spreadsheet Studio allowed Column, Bar, Line and Pie selections, but all four choices previously used the same vertical mini-bar preview.

The lab now renders a real chart matching the chosen type. Each chart still uses the live worksheet calculations, so changing the sheet changes the chart.

### Subject registry resilience
Integrated Science is now present in the built-in subject registry as a full SPARK subject. This prevents it from disappearing from the fallback manifest if the dynamic catalog is temporarily unavailable.

A corrupted fallback bullet character in the registry was also corrected.

## Permanent audit gates

The all-subject regression suite now checks:

- all six current subjects are registered;
- every subject has Study, Practice, Progress, Paper 1 and Paper 2 wiring;
- graph-capable subjects expose real graph tools;
- Physics measurement and gradient tools remain dynamic;
- Physics practical blueprints remain substantial;
- all six IT practical studios remain available;
- Integrated Science retains graphing, variables, measurement and evaluation practical stations;
- Integrated Science topic and exam graph workspaces retain line, bar, key, multi-series and click-plot support;
- English A keeps interactive examples for all 29 lessons;
- Social Studies keeps support for every activity type used by its course data;
- core question-bank depth does not silently collapse;
- the known generic-course completed-route bug stays fixed;
- known mojibake fallback text cannot return.

## Deployment note

The code release adds the Integrated Science practical experience immediately. To keep the Supabase subject catalog metadata aligned with the UI, also apply:

`supabase/migrations/20261005070000_integrated_science_practical_labs_v1.sql`

The migration enables the Integrated Science `labs` capability and updates its practical/question-bank statistics without changing the subject's current publication status.
