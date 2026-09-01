# SPARK CSEC Mathematics Question Bank QA

Updated: 2026-08-26

## Changes

- Added 38 original CSEC Paper 1-style review questions to the lesson question bank.
- Mapped every new question to an existing lesson.
- Added the same 38 questions to the adaptive JSON question bank.
- Corrected ordinal wording such as `21th`, `22th`, and `23th` to `21st`, `22nd`, and `23rd`.
- Corrected malformed generated wording such as `n² + 1n` to `n² + n`.
- Corrected duplicate answer choices and incorrect answer indexes found in the existing lesson bank.
- Corrected several worked solutions in the existing geometry and algebra questions.
- Corrected the circle-sector area and perimeter calculations in the play-area question.
- Corrected the bearing question solution, including the numerical values for GF and GH.
- Corrected the circle theorem angles in the tangent and diameter question.
- Removed internal checking language such as `Wait` from student-facing explanations.

## Validation

- 38 new questions added across 38 lesson topics.
- 1,718 base questions now exist in the adaptive question bank.
- All 1,718 base questions have lesson mappings.
- All MCQ answer indexes are valid.
- All MCQ answer values match their selected option.
- No duplicate answer choices remain in the lesson MCQs checked.
- No remaining `21th`, `22th`, or `23th` wording remains in the adaptive question bank.
- No remaining `n² + 1n` wording remains.
- The React production build succeeds with `CI=false`.
- The build reports existing ESLint warnings in unrelated pre-existing code. No new build error came from the question-bank changes.

## Diagram review

The existing CXC-style lesson diagrams were rendered and visually checked for labels, proportions, line placement, and readability. The diagram assets remain in `public/cxc2025/` and continue to load through the quiz renderer.

The new Paper 1-style questions use text-based presentation unless a diagram is required. No new diagram was added where a diagram was not necessary.
