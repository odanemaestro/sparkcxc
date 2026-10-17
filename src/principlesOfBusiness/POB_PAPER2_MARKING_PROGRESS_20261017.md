# SPARK POB Paper 2 marking: criterion-level upgrade and official specimen source

## Completed in this implementation batch

**SPARK original Paper 02 (five 20-mark questions, 100 marks, 25 parts)**

- Keeps the established strict, distinct-term marking for three simple listing parts.
- Four verified calculation results can now each earn **one automatic rubric mark** when an expected arithmetic operation, correct explicitly labelled final result, and unit/context are present. The awarded mark is tied to the correct numeric-result criterion; other explanation/method marks remain unresolved.
- Rejects insufficient working, wrong results, missing units/context, contradictory numeric claims, explicit negation or false assertions. This is a deliberately conservative positive-evidence rule, not a full natural-language maths examiner.
- Marking review shows verified partial credit separately from unfinished parts. No complete 100-mark grade is invented when explanations remain uncertain.
- Trusted server grader removes the already verified result criterion from its dual-pass semantic rubric and decreases the remaining max marks, preventing duplicate credit. All student answers remain untrusted inputs; grading criteria originate only from the trusted bank. Two semantic passes must agree and cite exact candidate text. Unresolved criteria remain uncertain.
- The server marking queue is disabled by default and requires explicit server-side configuration and deployed database/worker. Passing frontend tests does not assert live secure grading is enabled.

**2019 CXC specimen Paper 02**

- The user-provided CXC syllabus PDF contains the five compulsory specimen Paper 02 questions on **PDF pp. 90–102**, plus **CXC's Paper 02 marking scheme on PDF pp. 109–120** (test code `01240020/SPEC 2019`).
- `pobCxc2019SpecimenPaper2Draft.js` maps **five 20-mark questions and 25 subparts**, with *100/100* criterion marks and alternative-answer concepts summarised from the published CXC scheme. This is a **source-linked rubric dataset**, not a standalone graded release or the actual May/June sitting. Its original source document is `CSEC-Principles-of-Business-Syllabus-.pdf`, SHA-256 `08b3bf375a720abf8098d53fb9f6394597d8b576f7b863afd7408ecba913d0e6`.
- The specimen P2 bank is kept `simulatorReady:false` and `semanticAssessmentCalibrated:false` until every criterion, accepted alternative and sample response is adjudicated and tested. The script tests 100 marks, 25 parts, source links and blocked publication.

## Still required for complete automatic paper marking

1. Calibrate the dual-pass server grader on a balanced, independently adjudicated benchmark: short answers, complete explanations, valid alternatives, contradiction, negation, copying the rubric, diagrams, calculations and partial marks. Verify per-criterion false-credit and missed-credit rates. **Do not substitute guessed model scores for evidence.**
2. Convert the 2019 specimen Paper 2 draft into the complete SPARK Paper 2 simulator only after checking the answer layout, alternatives and question-criterion mapping against all rendered source pages. Certify mark scheme provenance and course-era format.
3. Historical Paper 1: authoritative answer keys for all applicable actual exam sittings and all visually correct stems/options. Historical Paper 2: complete rubric source authentication, transcription and two-pass calibration by sitting. In the 46 supplied exam PDFs, official full answer-key PDFs are missing; examiner reports support topical interpretations but **are not equivalent to complete individual answer keys**.
4. Cross-device *rendered* browser QA and server deployment/configuration tests; a passing `jsdom` run alone cannot certify pixel layouts or live worker operation.
5. Keep Principles of Business `enabled:false,status:"draft"` and keep unverified historical sources out of scored practice. A code merge must not silently publish the subject.

This change deliberately increases **verified partial-credit coverage** while keeping the high-risk free-text and historical grading gates closed until strong evidence supports release.
