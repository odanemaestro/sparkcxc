# Principles of Business release checklist (15 sections)

Source: user-provided SPARK Master Checklist for Adding a New Course, 16 October 2026.
Branch: `feat/principles-of-business-course-v1`.
Rule: an implemented first pass is not proof of completion. Keep `enabled:false`, `status:"draft"` and do not merge or publish without approval.

| Checklist section | Evidence on feature branch | Release status |
| --- | --- | --- |
| 1. Syllabus and course structure | 10 sections, 119 mapped objectives and 42 lessons | IN PROGRESS: compare each objective against authoritative wording; check prerequisites and depth |
| 2. Comprehensive study notes | Original Caribbean examples and revision prompts | IN PROGRESS: proofread and deepen all lessons, worked examples and misconceptions |
| 3. Diagrams, illustrations, animations and videos | Four attributed external diagrams, fallback descriptions | IN PROGRESS: verify licence, external loading, relevance, dark-mode readability, useful additional media |
| 4. Interactive learning activities | Six initial business decision/calculation tools | IN PROGRESS: strengthen accessible controls, feedback, completion persistence and graph/data tools |
| 5. Paper 1 bank | One original 60-question/75-minute paper with answer review | IN PROGRESS: verify every key and explanation, build and validate historical bank, diversify originals |
| 6. Paper 2 bank and marking | One original five-question, 100-mark paper with rubrics; four non-scoring numerical checks | BLOCKED FOR RELEASE: subject-aware reliable grading, alternate credit, tested partial marks, historical paper verification |
| 7. Flashcards | 119 first-pass prompts | IN PROGRESS: topic accuracy, application depth, swipe/flip navigation and progress persistence |
| 8. Learning Intelligence | Baseline activity tracking | IN PROGRESS: recommendation precision, completed-course behavior, Learning Loop integration |
| 9. Platform integration | Native draft registration, routes, initial enrollment gating | IN PROGRESS: dashboard, parent/admin reports, notifications, tutoring, Study Circles, DB and safe publication |
| 10. Navigation and page behaviour | Exam instructions, timer, navigator, back and scroll-to-top basics | IN PROGRESS: use shared icons and Back, Next/Previous lesson rules, saved tab, no extra floating button |
| 11. Design, CSS and UX | Initial POB styles | IN PROGRESS: SPARK Apple-inspired design, navy dark theme, contrast, all supported devices and modes |
| 12. SBA support | Initial 40-mark research workspace | IN PROGRESS: source-version eligibility, evidence and charts, secure saving, accurate rubric feedback |
| 13. QA and accuracy | Unit and component tests; repeatable structural audit in `data/pobReleaseAudit.js` covering all 119 objectives, 42 lessons, exam-bank links, historical-release flags and draft state | IN PROGRESS: full suite, new CI, production build, browser/device tests, calculation QA, diagrams and content |
| 14. GitHub delivery | Open PR #67, feature branch and scoped commits | IN PROGRESS: inspect latest main, resolve drift, ensure CI, document setup, preserve main |
| 15. Final course completion audit | No release certification yet | NOT COMPLETE: all 14 preceding sections must pass before approval |

## Assessment safety

- Historical P1 and P2 files remain inventoried but unverified, never presented as scored official papers.
- Correct numerical values alone do not establish full Paper 2 marks. The calculation checker supplies feedback but not a grade.
- SPARK's marking system is responsible for feedback. Do not insert compulsory teacher evaluation, external examiner review or student self-marking.
- Preserve CXC 08/G/SYLL 17 historical rules. A future exam configuration must be explicitly tied to a verified examination year, not inferred from a general reform announcement.
- Neither an automatically passing test nor the presence of 119 objective IDs certifies the quality of the underlying lesson explanations.

## Batch sequencing

1. Source and objective verification with detailed lesson content, examples, misconceptions and visual guides.
2. Paper 1 historical transcription/key QA and expanded original practice.
3. Paper 2 alternative responses, rubric-linked partial credit, subject-aware feedback, calibration tests and secure result integration.
4. Flashcards, business investigations and SBA research tools.
5. Dashboards, Learning Intelligence, permissions, notifications and Study Circles.
6. Responsive Apple-style/navy theme audit, accessibility and browser QA.
7. Final syllabus/assessment audit, regression run, production build and user review.

## Current evidence limits

GitHub Actions reported a successful workflow for commit `e8dea3b706168fd1317de7872ad84f5122de3b3c`. Later commits must have their own checks confirmed. Browser, tablet, touch and keyboard QA have not been demonstrated in this document.

## Repeatable pre-release structural gate

Run `pobReleaseAudit.test.js` with the project's normal test command. The audit checks objective-to-lesson links, first-pass enriched teaching, 119 flashcards, Paper 1 item structure and objective references, Paper 2 rubric totals, historical verification flags and draft-only status. Its negative tests deliberately corrupt these inputs to confirm failures are detected.

A clean result means **structural checks passed**, not that POB is ready for publication. Real historical past-paper transcription, reliable automated Paper 2 marking, human-readable academic review, accessibility and multi-device browser QA still remain release blockers. Never automatically publish from this audit alone.
