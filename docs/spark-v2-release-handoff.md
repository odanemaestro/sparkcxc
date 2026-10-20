# SPARK V2 automated marking: status and roadmap (updated 2026-10-20)

Where the "complete all 2,063 grading approvals and release" work stands, what
is live, and what to do next.

## Current state

| | |
|---|---|
| main | `20139752` (PR #127, Physics) on top of the V2 release and the IT live fixes. Site deployed from main. |
| Approved criteria (production) | **1,338 / 2,118**, each with evidence in `spark_grading_private.criterion_verifications_v2` |
| Active, verified papers | **23 / 67**: IT P2-A..P2-I, Chemistry CHEM-P2-PRACTICE-1..6, FNH practice-01/02, IS is-fixed-source-pair-01/02/05/09/10/12 |
| Worker | `mark-paper2-v2-shadow` v24, bundle `a443b3f7…` built from main `20139752`, `verify_jwt=true` |
| Migrations applied | `20261021010000_marking_v2_automated_evidence_release_gate`, `20261021020000_marking_v2_paper_released_rpc` |
| Live results | Students now get server-marked results on the 23 active papers. First live job (IT P2-F) published 90/90 verified. |
| Evidence artifact | `artifacts/v2-verification/` from a clean run on main `20139752`, registered in production. Committed on branch `chore/v2-evidence-physics` (PR to merge). |
| End-to-end checks on the deployed code | Passed for IT P2-F, Chemistry practice 2, FNH practice-02, IS pair 05 |

## By subject

| Subject | Approved | Papers active | What blocks the rest |
|---|---|---|---|
| Information Technology | 252/252 | 9/9 | — |
| Chemistry | 241/241 | 6/6 | — |
| Food, Nutrition & Health | 48/48 | 2/2 | — |
| Integrated Science | 626/645 | 6/14 | 11 free-hand drawings (visual judgement); 5 scheme points below the item maximum; 1 label scheme without keys; 1 calculation without a specification; 1 error/improvement pairing (IS-M2-P2-05 (a)(iii)) |
| Mathematics | 114/640 | 0/16 | 387 manual/visual criteria (plots, constructions, positional tables); 139 fixable failures (weak `method` keyword checks, mislabelled generated fixtures); maths exam not wired to V2 |
| Physics | 57/135 | 0/4 | Gradient "triangle drawn on the line" and "read off the line" method marks cannot be evidenced from text; 8 answer tables need curated fixtures; ~40 partial-credit cases need aligned fixtures; exam not wired to V2 |
| Principles of Business | 0/25 | 0/1 | Descriptor-only criteria ("Explains …") |
| Social Studies | 0/60 | 0/3 | Essays |
| English A | 0/72 | 0/12 | Essays need judgement; not deterministically verifiable |

## What is live for students

- IT, Chemistry (non-historical), FNH original sets and the released IS fixed
  papers start a server attempt and submit unscored, criterion-keyed responses
  (`src/grading/v2SubmissionResponses.js`); `V2VerifiedScore` shows the server
  result: a verified score, or "provisional" with the marks still in review.
- IS asks `spark_v2_paper_released` before routing; unreleased papers keep the
  existing grader's score.
- Physics marking fixes (reversed claims, model-match over-credit, category
  lines, stated formulae) also improve the on-screen Physics estimate.

## Roadmap, in recommended order

1. **Monitor live results (quick, highest value).** Real students are now
   receiving server-marked results. Check how many attempts publish as
   verified versus provisional, and why. Each recurring provisional cause is a
   targeted grading fix, as the IT P2-F fixes were.
2. **Physics to activation (recommended main job).** Three pieces:
   - Fixtures: curated cases for the 8 answer tables and the ~40 partial-credit
     cases, to bring the remaining criteria through verification.
   - A small product change: let students mark the triangle used for a
     gradient (or the point read off the line) on the existing graph tool, so
     those method marks have evidence. Without it every Physics paper stays
     blocked.
   - Wire the Physics Paper 2 exam to server marking, as Chemistry and IS are,
     gated by `isV2PaperReleased`.
3. **Mathematics: the 139 non-visual failures.** Adds criterion approvals, but
   no maths paper can go live until the maths exam has structured input for
   plots, constructions and table cells and is wired to V2 (a larger build).
   Strengthening a source check changes the registered rubric and needs a new
   rubric-version migration.
4. **Owner decisions.**
   - English A, Social Studies and POB are essays or descriptor rubrics that
     deterministic grading cannot verify. Activating them needs a policy
     choice, e.g. AI marking with human sampling, or keeping them on the
     existing grader.
   - The 11 IS free-hand drawing items block 8 IS papers: accept them as
     provisionally marked, redesign them as structured input, or swap them out
     of the fixed papers.
5. **Housekeeping.** Merge the evidence PR from `chore/v2-evidence-physics`
   (record files only; production already holds the evidence).

## Release procedure for any grading change

1. Fix grader/engine/fixtures; never change expected marks to match wrong grading.
2. `npx jest src/grading src/physics src/chemistry src/fnh src/integratedScience src/informationTechnology src/practice`
   (one known Windows-only CRLF failure: `chemistryNavigationNotifications.test.js`).
3. `node tools/build-server-marker-v2.mjs && node tools/test-v2-registered-paper-replay.mjs` (CI runs this).
4. Commit on a branch; open a PR (no `gh` CLI here; use the GitHub link the push prints) and merge after CI.
5. On updated main, before deploying: `git fetch` and check the worker version
   (`npx supabase functions list --project-ref ymnfexzyjtvjkufcefmf`), so another
   person's deployment is not overwritten.
6. `node tools/v2-verify-all.mjs --out <dir>` on the clean tree; diff against
   `artifacts/v2-verification/evidence.json` (nothing previously verified may be lost).
7. `node tools/deploy-v2-worker.mjs --project-ref ymnfexzyjtvjkufcefmf`.
8. `node tools/test-v2-release-e2e.mjs <dir> --subject <s> --paper <p>` for affected papers.
9. Copy the run into `artifacts/v2-verification/`, then
   `node tools/v2-register-evidence.mjs --project-ref ymnfexzyjtvjkufcefmf --dir artifacts/v2-verification --release`.
10. Commit the artifacts on a branch and open a PR.

Direct pushes to main from the agent are blocked by its permission check;
the owner merges PRs.

## Rules carried from the brief

No falsified reviews, no untested criterion marked accurate, no bypass of
score-integrity checks, no overwrite of historic scores, no provisional score
published as authoritative, no spoofed reviewer identity. Blocked criteria
stay explicitly unapproved with their precise blocker.
