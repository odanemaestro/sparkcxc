# SPARK IT Studio and SBA improvement plan

## Scope and evidence
The uploaded REA skill is a reverse-engineering workflow, not a Microsoft Office library or a compiler. No Microsoft application binaries or runtime traces were supplied. Build original SPARK interfaces modelled on familiar productivity workflows, and verify behaviour using accessible specifications and our own tests. Do not represent teaching simulations as general-purpose compilers or claim Microsoft compatibility without end-to-end round-trip tests.

## Existing tools
SPARK already has word processing, spreadsheet, database, presentation, web-design and programming labs with supporting models, an SBA Centre and simulated historical examinations. Its programming model supports specific selection, iteration and tax exercises in VB-, Pascal- and C-style syntax, not arbitrary source compilation.

## Delivery phases
1. Programming: source-aware step debugging, conditional and line breakpoints, variable watches, line/column diagnostics, expression parser, typed AST, input/output and bounded interpreter. Consider audited WASM compilers only after a security and licensing review.
2. Word: document structure, styles, tables, mail merge, page layout, headers/footers, print view, reliable DOCX export and tested import fidelity.
3. Spreadsheet: multi-sheet references, fill handles, complex formulas, dependency checks, circular-reference warnings, charts, filters, validation and XLSX interoperability.
4. Database: relationship canvas, constraints, forms, report designer, queries, schema inspection, import and export; do not claim native Access ACCDB interoperability without implementation.
5. Presentations: layouts, slide masters, editable graphics, speaker notes, charts and presentation/export views.
6. Web design: multi-file HTML/CSS projects, live isolated preview, validation, accessibility checks and file exports.
7. Integrated SBA: connect a chosen fictional project to each tool, with saved work, rubric-specific evidence, version history and exports. Distinguish skills that can be objectively auto-checked from those needing qualitative review without requiring external teachers to operate the platform.
8. Other subjects: share secure portfolio, task and progress components, but use each subject's actual SBA syllabus and marking requirements.

## Quality gates
Preserve exam/scoring safeguards; test keyboard, screen-reader, mobile, tablet, desktop, navy/light/dark modes; bound all user-executed programs; validate exported files and saved versions; run complete CI before main merge. No auto-generated marks without evidence that the marking system can evaluate the task.
