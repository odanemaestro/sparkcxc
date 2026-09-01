# SPARK Paper 1 Practice Exam

## What was added

The Practice area now has two modes:

1. Paper 1 Simulator
2. Adaptive Practice

The Paper 1 Simulator uses the supplied CSEC Mathematics Paper 1 bank and diagram assets.

## Exam rules

- 60 multiple-choice questions
- 1 hour 30 minutes
- 1 mark per question
- no correctness feedback until submission
- automatic submission when time reaches zero
- answers and flags are saved locally during an active paper
- students can resume an unfinished paper on the same browser

## Exam structure engine

A simulated paper is not a simple random sample.

The engine first chooses one complete historical 60-question paper as the blueprint. For each question position from 1 to 60, it selects another eligible question from the same historical position and scores candidates by:

- matching subtopic
- matching topic
- matching diagram or non-diagram question type
- matching diagram type where available
- source verification confidence
- balanced use of source papers
- whether the student has already seen the exact question

This keeps the generated exam close to the way actual Paper 1 papers are structured.

## Duplicate protection

Every generated paper blocks:

- duplicate question IDs
- duplicate known repeat-group IDs
- structurally repeated question variants based on normalized topic, subtopic and stem fingerprints

The structural fingerprint removes changing numeric values before comparison. This prevents two questions that are effectively the same problem with different numbers from appearing in one simulated paper.

The browser also records questions used in earlier simulated papers and prefers unseen questions on future papers.

## Question bank used

The final supplied `questions-data.js` was converted to lazy-loaded JSON for the React application.

- 1,678 final records supplied
- 1,675 exam-ready records after excluding source-gap records
- 28 historical papers represented
- 27 complete 60-question papers available as blueprints
- diagram SVG assets load only when the Paper 1 simulator is opened

## Mathematical rendering

The simulator uses a mathematics-first font stack and formatting for:

- exponents
- square roots
- numeric fractions
- vectors
- matrices
- inequalities
- degree symbols
- Greek symbols already present in the source data

SVG diagrams and SVG answer choices render directly inside the exam interface.

## UX added

- exam instructions screen
- sticky countdown timer
- answered progress bar
- responsive question navigator
- answered, current and flagged states
- keyboard shortcuts using A, B, C and D
- left and right arrow navigation
- flag for review
- submission confirmation showing unanswered count
- score and percentage after submission
- topic performance breakdown
- full answer review with source year, sitting and original question number
- worked solutions after submission
- responsive desktop and mobile layouts

## Validation

Automated tests cover uniqueness, historical question positions, previous-question avoidance and real-bank generation.

A 100-paper generation test passed with every paper containing 60 unique valid questions in positions 1 through 60.

A separate 200-paper structure probe produced:

- minimum topic-position match: 52 of 60
- average topic-position match: 59.32 of 60
- minimum subtopic-position match: 46 of 60
- average subtopic-position match: 57.805 of 60

The production React build completes successfully. Existing lint warnings elsewhere in the original application remain unchanged.

## Main files added

- `src/practice/PracticeHub.jsx`
- `src/practice/Paper1Exam.jsx`
- `src/practice/paper1Engine.js`
- `src/practice/MathText.jsx`
- `src/practice/practiceExam.css`
- `src/practice/paper1Engine.test.js`
- `public/practice-exam/questions.json`
- `public/practice-exam/diagrams.json`

`src/App.js` now routes the existing Practice tab through `PracticeHub`.
