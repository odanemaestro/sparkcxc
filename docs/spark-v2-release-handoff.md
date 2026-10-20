# SPARK V2 automated marking: release handoff (2026-10-20)

Where the "complete all 2,063 grading approvals and release" work stands, and
how to resume it. Branch `feat/automated-marking-verification-v2`, PR #124.

## State at handoff

| | |
|---|---|
| Branch head | `ec8872ed` (main merged in), pushed; CI green ([run 39437762845](https://github.com/odanemaestro/sparkcxc/actions/runs/39437762845)) |
| Merge to main | **Not done.** The agent's fast-forward push was blocked by its permission check ("merge without review"). The owner must merge PR #124, or run `git push origin ec8872ed:refs/heads/main` (main is an ancestor; deploy.yml reruns tests then deploys Pages). |
| Approved criteria (production) | 1,281 / 2,118, each with evidence in `spark_grading_private.criterion_verifications_v2` |
| Active, verified papers | 23 / 67: IT P2-A..P2-I, Chemistry CHEM-P2-PRACTICE-1..6, FNH practice-01/02, IS is-fixed-source-pair-01/02/05/09/10/12 |
| Worker | `mark-paper2-v2-shadow`, bundle `0e305426…` from `b55bbaf9`, `verify_jwt=true` |
| Migrations applied | `20261021010000_marking_v2_automated_evidence_release_gate`, `20261021020000_marking_v2_paper_released_rpc` (both recorded in schema_migrations) |
| Published student grades | None yet: production has no V2 jobs. The new exam wiring reaches students only after the merge to main. |
| Evidence artifact | `artifacts/v2-verification/{evidence,papers,summary}.json` (clean run on `b55bbaf9`) |

## By subject

| Subject | Criteria | Papers active | Remaining blocker |
|---|---|---|---|
| Information Technology | 252/252 | 9/9 | — |
| Chemistry | 241/241 | 6/6 | — |
| Food, Nutrition & Health | 48/48 | 2/2 | — |
| Integrated Science | 626/645 | 6/14 | 11 free-hand drawings (visual judgement), 5 scheme-points-below-maximum, 1 label scheme without keys, 1 calculation without spec, 1 error/improvement pairing (IS-M2-P2-05 (a)(iii)) |
| Mathematics | 114/640 | 0/16 | 387 manual/visual criteria (plots, constructions, positional tables); 139 fixable failures (weak `method` keyword checks, mislabelled generated fixtures); maths exam UI not wired to V2 |
| Physics | 0/135 | 0/4 | No resolution policy or fixtures yet; exam not wired |
| Principles of Business | 0/25 | 0/1 | Descriptor-only criteria ("Explains …") |
| Social Studies | 0/60 | 0/3 | Not started; essays |
| English A | 0/72 | 0/12 | Essays need judgement; not deterministically verifiable |

## Frontend wiring (in the branch, live after merge)

- IT, Chemistry (non-historical), FNH original sets and IS fixed papers start a
  server attempt and submit unscored, criterion-keyed responses
  (`src/grading/v2SubmissionResponses.js`); `V2VerifiedScore` shows the server
  result.
- IS asks `spark_v2_paper_released` before routing (only released fixed papers
  go to V2; others keep the existing grader's score).
- UI exercised on desktop/tablet/mobile with a local harness (mock Supabase,
  real examiner): `.v2work/harness/` (git-excluded), open
  `/sparkcxc/.v2work/harness/index.html?exam=chemistry|fnh|is|it` under `npm start`.

## Release procedure for any grading change

1. Fix grader/engine/fixtures; never change expected marks to match wrong grading.
2. `npx jest src/grading src/chemistry src/fnh src/integratedScience src/informationTechnology src/practice`
   (one known Windows-only CRLF failure: `chemistryNavigationNotifications.test.js`).
3. `node tools/build-server-marker-v2.mjs && node tools/test-v2-registered-paper-replay.mjs` (CI runs this).
4. Commit, then `node tools/v2-verify-all.mjs --out <dir>` on the clean tree; diff against
   `artifacts/v2-verification/evidence.json` (nothing previously verified may be lost).
5. `node tools/deploy-v2-worker.mjs --project-ref ymnfexzyjtvjkufcefmf`.
6. `node tools/test-v2-release-e2e.mjs <dir> --subject <s> --paper <p>` for affected papers.
7. Copy the run into `artifacts/v2-verification/`, then
   `node tools/v2-register-evidence.mjs --project-ref ymnfexzyjtvjkufcefmf --dir artifacts/v2-verification --release`.
8. Commit the artifacts and push; check CI via the GitHub REST API (no `gh` CLI).

## Next work, in order of value

1. Merge PR #124 to main (owner action).
2. Physics: add `physics` to `resolutionPolicySubjects` with a per-mark certainty
   policy, fixtures in `src/grading/v2Fixtures/physics.js`, verify, then wire the
   Physics Paper 2 exam (gate with `isV2PaperReleased`).
3. Mathematics: fix the 139 non-visual failures; strengthening a source check
   changes the registered rubric and needs a new rubric-version migration.
4. IS remaining items, then POB concrete items (calculations, named lists).

## Rules carried from the brief

No falsified reviews, no untested criterion marked accurate, no bypass of
score-integrity checks, no overwrite of historic scores, no provisional score
published as authoritative, no spoofed reviewer identity. Blocked criteria
stay explicitly unapproved with their precise blocker.
