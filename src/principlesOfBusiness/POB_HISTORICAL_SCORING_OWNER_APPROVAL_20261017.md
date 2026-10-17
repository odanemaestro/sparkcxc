# POB historical examination automatic-scoring authorization
Date: 17 October 2026
Authorized by: SPARK product owner in conversation
Source: owner-supplied POB.zip, 46 historical examination PDFs

## Decision
The owner expressly authorizes SPARK to prepare and eventually automatically score answers for **all 46 supplied historical examination source PDFs**, without teacher assessment or student self-marking.

This authorization applies to the original archive objects identified by the immutable SHA-256 fingerprints in `data/pobHistoricalScoringApproval.js`, not arbitrary future replacement PDFs. The archive is an input corpus, not a completed set of marking banks.

**Owner authorized: 46 / 46. Verified and active scored historical simulators: 0 / 46.**
The course itself is still an unpublished, disabled draft.

## Inventory correction
The archive contains 21 files *named* Paper 01 and 25 files *named* Paper 02. The file `CSEC_Principles_of_Business_P1_2019_MJ.pdf` is actually Paper 02 according to its cover and code 01240020. Thus there are **20 genuine Paper 01 sources** and **26 Paper 02 sources**, including two distinct 2019 MJ Paper 02 PDF copies. Do not merge those distinct files into one source or assume matching sitting means matching content.

The original archive contains 468 pages. Its extraction audit flags 192 pages with fewer than 50 extractable characters, many of them scans; page-image review is needed. Source hashes establish continuity with the user upload, **not** endorsement/authenticity by CXC.

## Distinct gates
1. **Owner authorization:** granted for all 46 source file fingerprints, effective 17 October 2026. This is a product requirement, not an answer key.
2. **Paper identity and provenance:** confirm cover/test code, year, sitting, source hash and syllabus-era instructions, including older 7-question choice arrangements.
3. **Paper 1 grading:** verify complete 60-question stems, all A-D choices, diagrams, per-question CXC/corroborated answer evidence, score and explanations. No invented answer letters.
4. **Paper 2 grading:** verify every compulsory and optional question, each item and criterion, mark totals, accepted alternatives and partial credit. Benchmark the trusted two-pass server evaluator against internally adjudicated answers and misconceptions. Evidence of accuracy must precede grade release.
5. **Server activation:** require trusted server-owned rubrics, passed calibration, deployment and end-to-end tests before returning automated scored results. Student-supplied metadata is not trusted.
6. **Presentation:** keep provisional/unverified scoring visibly distinguished from confirmed awards. Preserve audit trails and no double-marking.

## Implementation in this branch
- `pobHistoricalScoringApproval.js` holds the explicit approval record and source fingerprints for all 46 original PDF bytes.
- `pobHistoricalInventory.js` links each paper to its fingerprint and owner authorization while retaining `simulatorReady:false` and `answerKeyStatus:"not-verified"`.
- `pobHistoricalAutoScoringGate.js` fails closed for source substitution, missing keys, incomplete Paper 2 criteria, absent calibration or inactive secure marking.
- `pobReleasedHistoricalPapers()` is protected against a bare `simulatorReady:true` switch.
- Automated Jest regression checks cover all 46 source IDs/fingerprints, the 2019 source reclassification and blocked unverified scored release.

## Remaining examination-work backlog
- Complete source-image transcription and authenticated answer verification for the 20 genuine Paper 01 files.
- Complete scheme sourcing or fully internally adjudicated, criterion-by-criterion marks for the 26 Paper 02 files.
- Calibrate semantic scoring with correct, partly correct, off-topic and adversarial student answers; retain unresolved credit when evidence is insufficient.
- Integrate only verified sitting banks into the actual Paper 1 and Paper 2 simulator and perform end-to-end browser, phone, iPad, light/dark and live marking-server QA.
- Enable scored release individually by sitting once the evidence checks pass, without publishing the wider subject automatically.

The official 2019 CXC **specimen** Paper 02 marking scheme is a separate verified source and does not certify the actual May/June 2019 sitting or any other historical PDF.
