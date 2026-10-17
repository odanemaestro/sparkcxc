# SPARK Principles of Business: historical live-scoring certification audit

**Requested action:** release all historical POB papers for scored student practice.

**Decision: 0 of 46 historical PDFs can be certified from the evidence presently stored in SPARK.** No historical-grade release flags have been switched on. There is no substitute for accurate questions, correct marks and production-tested secure grading.

## What is complete

- All 46 archive PDFs have source SHA-256 fingerprints and a corresponding SPARK-authored answer or rubric record.
- There are 20 genuine Paper 01 sources, with 1,195 source-present answer proposals for 1,200 expected MCQs. Q53–Q57 from the supplied May/June 2018 PDF are physically missing and remain blocked.
- There are 26 Paper 02 sources, with internally authored model responses and per-part criteria. They are *not* published CXC marking schemes.
- Original examination-format differences are represented, including the 2005–2007 six-answer/100-mark pattern, 2008 five-answer/100-mark pattern and more recent five-compulsory/100-mark pattern.
- Source inventory and authoring structure pass GitHub regression tests. **This does not certify academic accuracy or reliable automatic grading.**

## Six release gates required per historical sitting

1. **Source-complete student exam**: exact historic question stems, all four multiple-choice options, diagrams, case materials, 60 genuine MCQ questions or the full Paper 02 prompts and the original question-selection rule.
2. **Academic answers**: SPARK internally checks correct options, interpretations and specific alternatives against printed question language and syllabus objectives, documents evidence, and resolves every academic dispute. No independent examiner or student self-marking is required. SPARK must not pretend that a hypothetical answer is established fact.
3. **Criterion-level grading**: each Paper 02 part has an accurate maximum, correct alternatives, understanding-based partial credit, and explicit penalties for contradicting evidence without awarding marks for mere keyword presence.
4. **Trusted versioned server bank**: the grading server recognises the exact historical bank and uses *only* server-bundled rubric resources, with authenticated attempts, immutable version snapshots and no client-supplied mark scheme. As currently implemented, `buildTrustedAssessment` supports the original SPARK POB Paper 02 bank (`pob-original-paper2-01`) and deliberately rejects historic source IDs.
5. **Real calibration**: benchmark full, partial, blank, correct rephrasings, regional alternatives, calculations, wrong/contradictory statements, paper-specific question grouping and malicious prompt injections against internally adjudicated reference answers. Record false-credit/missed-credit error rates, uncertainty and score bounds using a deployed, production-equivalent scorer. Unit tests on the rubric's *shape* are not equivalent.
6. **End-to-end production checks**: confirm Supabase migrations, secure `mark-paper2` deployment, authenticated marking worker, disabled-on-failure behaviour, persisted response snapshots, idempotent retries, timers, feedback, progress reports and responsive client QA.

### Known source-specific blockers

- **POB-P1-2018-MJ:** original supplied scan omits Questions **53, 54, 55, 56 and 57**. A 60-question historic simulation may not silently grade the missing entries or invent choices. Recover the original complete matching paper or keep this specific sitting entirely unscored.
- **POB-P2-2024-JAN:** two-page derivative transcript, not independently verified original printed question booklet. Source-authenticity review remains necessary.
- **POB-P2-2019-MJ-ALT:** original archive file is mislabeled `P1_2019_MJ`, but the printed cover identifies Paper 02. Keep the reclassification and cross-source comparisons.
- **2020–2024 Paper 01 sources:** multiple items explicitly flagged disputed in the source-authored proposals, including alleged missing/unanswerable options. Those are still provisional.
- **All 26 Paper 02 sources:** authenticated scoring infrastructure and semantic grading calibration are outstanding. A 100-mark internally drafted scheme is insufficient to return trustworthy live marks.

## Changes made for this release request

`pobHistoricalLiveScoringReadiness.js` uses the **canonical repository source inventory** and four-batch authoring audit, never an untrusted candidate's paper metadata, to return a per-sitting blocked/eligible result with machine-readable reasons. `pobHistoricalLiveScoringReadiness.test.js` verifies 46 unique source identities, no accidental release, the missing 2018 questions and derivative 2024 scan, and ensures the trusted grading server rejects historical bank IDs even if an attempt spoofs the original bank version.

These checks **do not** declare anything calibrated or verified simply because the product owner requested activation. They create an auditable, fail-closed checklist so each paper can be released later only after there is real supporting evidence.

**Production action:** None. No historical scoring settings, subject publication flags, secrets, migrations, Supabase jobs or secure server bundles were changed. SPARK's existing original Paper 2 marking and CXC specimen workflows remain separate.
