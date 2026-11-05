# Office Administration backend integration verification

Run from the repository root:

```powershell
$env:PATH='C:/Users/odane/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin;'+$env:PATH
& 'C:/Users/odane/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' tools/test-oa-release-integration.mjs
```

The disposable PGlite database replays the actual V2 migrations and Office Administration rubrics, the canonical subject-progress RPCs, and the canonical notification functions. Minimal auth, profile, enrollment and parent-link records model signed-in users. The two Office Administration integration migrations are replayed twice to check repeatability. The fixture evidence must match the current worker bundle checksum.

The test covers draft and enrollment restrictions, 75/120 minute timed papers, source Paper 1 with no score, non-OA null-score behavior, all 54 criteria and three 90-mark papers, missing provenance rejection, direct write/private function restrictions, cross-user RLS and attempt ownership, authoritative score spoofing, final score reconciliation, wrong bundle/method/lease rejection, revoked enrollment and reverted drafts, retry/offline-sync deduplication, zero scores, unpublished provisional results, and student/approved-parent/pending-parent/anonymous visibility. Lessons retain existing parent-only notification parity; labs and exams notify the student and approved parents.

This is a local SQL and marker test. It does not exercise a deployed HTTP worker, real JWT issuance, Realtime delivery, Web Push, cron, or network infrastructure. Neither integration migration publishes the course or releases its rubrics. No staging or production actions are performed by the script.

## Read-only staging gates

Run these after the migrations and before changing course or rubric release state.

1. Confirm the course remains disabled/draft and the three rubrics remain inactive/draft, with 54 total criteria and 90 marks per paper.

```sql
select id, enabled, status
from public.spark_subjects where id='office-administration';

select r.paper_id, r.active, r.verification_status,
       jsonb_array_length(r.criteria) as criteria,
       r.expected_total_marks,
       (select sum((c->>'maxMarks')::integer)
        from jsonb_array_elements(r.criteria) c) as criterion_marks,
       s.source_hash_matches, s.verified_criteria, s.paper_verified
from spark_grading_private.rubrics_v2 r
join spark_grading_private.rubric_release_status_v2 s
  using (subject_id, paper_id, rubric_version)
where r.subject_id='office-administration'
order by r.paper_id;
```

2. Confirm all five OA triggers exist and are enabled.

```sql
select c.relname, t.tgname, t.tgenabled
from pg_catalog.pg_trigger t
join pg_catalog.pg_class c on c.oid=t.tgrelid
join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and not t.tgisinternal
  and t.tgname in (
    'spark_oa_subject_activity_notifications_trg',
    'spark_oa_client_attempt_guard_v2',
    'spark_oa_client_progress_guard_v2',
    'spark_oa_client_activity_guard_v2',
    'spark_oa_verified_progress_v2'
  )
order by t.tgname;
```

3. Confirm no anonymous/authenticated caller can execute any private OA helper or the notification trigger function, or read the publication receipt table. Every privilege below must be false; receipt RLS must be true.

```sql
select r.role_name, f.function_name,
       has_function_privilege(r.role_name,f.function_name,'EXECUTE') as executable
from (values ('anon'),('authenticated')) r(role_name)
cross join (values
  ('spark_grading_private.oa_student_can_learn_v2(uuid)'),
  ('spark_grading_private.oa_client_attempt_guard_v2()'),
  ('spark_grading_private.oa_client_progress_guard_v2()'),
  ('spark_grading_private.publish_oa_verified_progress_v2()'),
  ('public.spark_oa_subject_activity_notifications()')
) f(function_name);

select has_table_privilege('anon','spark_grading_private.oa_published_results_v2','SELECT') as anon_read,
       has_table_privilege('authenticated','spark_grading_private.oa_published_results_v2','SELECT') as student_read,
       (select relrowsecurity from pg_catalog.pg_class
        where oid='spark_grading_private.oa_published_results_v2'::regclass) as receipt_rls;
```

4. When registering evidence later, recheck the release-status query: all 54 criterion records must match their source hashes, all three paper records must be verified, and their provenance must name the current deployed marker bundle. Releasing evidence remains a separate operator action.

```sql
select paper_id, rubric_version, source_sha256, outcome,
       provenance->>'bundleSha256' as bundle_sha256
from spark_grading_private.paper_verifications_v2
where subject_id='office-administration'
order by paper_id;
```

5. After an authorized signed-in staging canary, reconcile its private job, exam attempt, canonical progress/event and notification rows: exactly one final canonical activity event and publication receipt per attempt, one final notification for the student and each approved parent, and no final score/event/receipt for a provisional result. Repeat owner/non-owner/parent/pending-parent reads through the application RPCs to exercise staging JWT/RLS, then separately verify HTTP worker execution and actual notification transport.

## Staging compatibility and read-only checks — 27 October 2026

The disposable staging method validator was the original two-method form. The new integration migration now accepts that exact known baseline or the current canonical validator, appends only the OA method, and refuses unknown implementations. `tools/test-oa-known-validator.mjs` verifies both known shapes, replay idempotency and unknown-shape rejection. The migration was then applied successfully to staging. All five OA triggers are enabled; source hashes match all three 18-criterion/90-mark draft rubrics; receipt RLS is enabled; private receipt reads/private helper execution are denied to anonymous and authenticated roles. A rolled-back role-switch audit confirmed that the draft course is invisible to both ordinary catalogue readers.

## Completed hosted rehearsal — 28 October 2026

The separate live run now passes all 19 HTTP checks. Its complete script publishes 90/90; the incorrect script publishes 0/90; unresolved input remains provisional with no final score. Real Auth/RPC ownership, canonical progress, duplicate suppression and student/approved-parent notification rows were checked. Cleanup restored the hidden draft course, deleted the three fixture accounts and left zero Office attempts/progress; verified rubrics were made inactive. Both temporary functions returned 403 after retirement. See `live-staging-verification.md` for source digests and the stage-only opaque-key adapter.
