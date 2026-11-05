# Hosted Office Administration staging verification

Completed 28 October 2026 on disposable project `cfqetgozfxmavwexhrxz`. Production was not modified.

All **19 HTTP checks passed** for `OA-ORIGINAL-02-01`. The three original papers also passed all 54 source-bound criterion checks and all three hosted rubric release gates.

| Scenario | Published result |
|---|---|
| Complete source-bound script | Verified, 90 / 90 |
| Incorrect script | Verified, 0 / 90 |
| Competing or unresolved answer | Provisional; score withheld |

The hosted run exercised real Auth sessions and PostgREST/RPC calls: draft visibility, student/parent enrollment rules, learning structure, lesson and practice progress, notification deduplication, Paper 1 unscored source answers, timed deadlines, foreign ownership denial, private-worker denial to students and anonymous users, canonical response identity, saved results, late-sync protection and student/approved-parent notifications.

The grader bundle was `0ec570bb1513ba99c14e6d093ecab9ea4abcf3f9912df12a27314081071f45cd`; fixture digest was `efa801953bb5946834937c78aa2b438dddd5186da296c5e86e23d5a2fb7a093e`. Live execution ran from 2026-10-28T16:34:22.756Z to 2026-10-28T16:35:09.476Z.

The stage uses Supabase opaque service keys, so the disposable worker used the existing fixed-stage service-key adapter, with constant-time comparison. It rejects other projects, user keys and anonymous keys. Its examiner bytes and queue/completion protocol are unchanged. The production JWT worker was not altered. `tools/build-oa-staging-worker.mjs` reproduces that packaging; its boundary checks and the existing service-key authenticator tests pass.

After verification, all three fixture accounts were deleted. Hosted queries confirmed zero Office Administration attempts or progress rows, the Office Administration catalog remained disabled/draft, and all three verified Office rubrics were made inactive. Both temporary endpoints were replaced with disabled handlers and independently returned **403** over HTTP. Private verification evidence remains in staging; no student or anonymous access was granted.

This validates the representative live grading flow. It does not approve unreviewed historical transcriptions or create official answer keys. Those source-review gates remain separate.
