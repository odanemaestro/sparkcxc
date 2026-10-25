-- Audit-preserving retirement of the superseded 2017 POA specimen draft.
-- NO criterion is approved here. NO rubric or historic attempt is deleted.
-- Existing raw views keep all historic records; new operational views exclude
-- only a digest-checked, inactive draft with a verified live replacement.
begin;

create table if not exists spark_grading_private.rubric_retirements_v2 (
  subject_id text not null,
  rubric_version text not null,
  paper_id text not null,
  source_sha256 text not null check (source_sha256 ~ '^[a-f0-9]{64}$'),
  retired_criteria integer not null check (retired_criteria > 0),
  replacement_subject_id text not null,
  replacement_rubric_version text not null,
  replacement_paper_id text not null,
  replacement_source_sha256 text not null
    check (replacement_source_sha256 ~ '^[a-f0-9]{64}$'),
  reason text not null check (reason = 'superseded-by-verified-source-methods'),
  retired_at timestamptz not null default now(),
  retired_by text not null default 'SPARK V2 source retirement',
  primary key (subject_id,rubric_version,paper_id),
  foreign key (subject_id,rubric_version,paper_id)
    references spark_grading_private.rubrics_v2(subject_id,rubric_version,paper_id)
    on delete restrict,
  foreign key (replacement_subject_id,replacement_rubric_version,replacement_paper_id)
    references spark_grading_private.rubrics_v2(subject_id,rubric_version,paper_id)
    on delete restrict,
  check (
    (subject_id,rubric_version,paper_id) <>
    (replacement_subject_id,replacement_rubric_version,replacement_paper_id)
  )
);
alter table spark_grading_private.rubric_retirements_v2 enable row level security;
revoke all on spark_grading_private.rubric_retirements_v2
  from public,anon,authenticated,service_role;
grant select on spark_grading_private.rubric_retirements_v2 to service_role;

do $retire_legacy_specimen$
declare
  historical spark_grading_private.rubrics_v2%rowtype;
  replacement spark_grading_private.rubrics_v2%rowtype;
  previous spark_grading_private.rubric_retirements_v2%rowtype;
begin
  select * into strict historical
  from spark_grading_private.rubrics_v2
  where subject_id='principles-of-accounts'
    and rubric_version='poa-historical-worked-v1:poa-specimen-2-2017'
    and paper_id='poa-specimen-2-2017'
  for update;

  select * into strict replacement
  from spark_grading_private.rubrics_v2
  where subject_id='principles-of-accounts'
    and rubric_version='poa-source-methods-v1'
    and paper_id='poa-specimen-2-2017--q-1-2-3-4-5'
  for share;

  if historical.active is distinct from false
    or historical.verification_status is distinct from 'draft'
    or historical.expected_total_marks is distinct from 100
    or jsonb_array_length(historical.criteria) <> 22
    or historical.source_sha256 is distinct from
       '8eb9472775142ebb38e4db7d2137590ff03bf04d1779efe00b1a12614045b18b'
    or historical.source_sha256 is distinct from
       encode(sha256(convert_to(historical.criteria::text,'UTF8')),'hex')
    or replacement.active is distinct from true
    or replacement.verification_status is distinct from 'verified'
    or replacement.expected_total_marks is distinct from 100
    or jsonb_array_length(replacement.criteria) <> 5
    or replacement.source_sha256 is distinct from
       '344d4d84bb5188e111e58866c690d6dc0a2af02e488746ea2c2db336150950c9'
    or replacement.source_sha256 is distinct from
       encode(sha256(convert_to(replacement.criteria::text,'UTF8')),'hex')
  then
    raise exception 'POA specimen retirement refused: old or replacement source state differs from approved source';
  end if;

  if exists(select 1 from spark_grading_private.criterion_verifications_v2 v
     where v.subject_id=historical.subject_id and v.paper_id=historical.paper_id
       and v.rubric_version=historical.rubric_version)
  or exists(select 1 from spark_grading_private.paper_verifications_v2 v
     where v.subject_id=historical.subject_id and v.paper_id=historical.paper_id
       and v.rubric_version=historical.rubric_version)
  or exists(select 1 from spark_grading_private.rubric_criterion_reviews_v2 v
     where v.subject_id=historical.subject_id and v.paper_id=historical.paper_id
       and v.rubric_version=historical.rubric_version)
  then
    raise exception 'POA specimen retirement refused: evidence exists under original rubric';
  end if;

  insert into spark_grading_private.rubric_retirements_v2
   (subject_id,rubric_version,paper_id,source_sha256,retired_criteria,
    replacement_subject_id,replacement_rubric_version,replacement_paper_id,
    replacement_source_sha256,reason)
  values
   (historical.subject_id,historical.rubric_version,historical.paper_id,
    historical.source_sha256,22,replacement.subject_id,replacement.rubric_version,
    replacement.paper_id,replacement.source_sha256,
    'superseded-by-verified-source-methods')
  on conflict (subject_id,rubric_version,paper_id) do nothing;

  select * into strict previous from spark_grading_private.rubric_retirements_v2
   where subject_id=historical.subject_id and rubric_version=historical.rubric_version
     and paper_id=historical.paper_id;
  if previous.source_sha256 is distinct from historical.source_sha256
    or previous.retired_criteria<>22
    or previous.replacement_paper_id is distinct from replacement.paper_id
    or previous.replacement_rubric_version is distinct from replacement.rubric_version
    or previous.replacement_source_sha256 is distinct from replacement.source_sha256
    or previous.reason is distinct from 'superseded-by-verified-source-methods'
  then
    raise exception 'POA specimen retirement audit mismatch';
  end if;
end $retire_legacy_specimen$;

-- Keep rubric_review_progress_v2 as the complete historical source of truth.
-- Operational totals are explicitly scoped, never falsified approvals.
create or replace view spark_grading_private.rubric_operational_review_progress_v2
 with (security_invoker = true) as
select p.*
from spark_grading_private.rubric_review_progress_v2 p
where not exists (
  select 1 from spark_grading_private.rubric_retirements_v2 a
  where a.subject_id=p.subject_id and a.paper_id=p.paper_id
    and a.rubric_version=p.rubric_version
);

-- The original calibration queue stays audit-complete and unchanged.
create or replace view spark_grading_private.v2_operational_calibration_queue
 with (security_invoker = true) as
select q.*
from spark_grading_private.v2_calibration_queue q
where not exists (
  select 1 from spark_grading_private.rubric_retirements_v2 a
  where a.subject_id=q.subject_id and a.paper_id=q.paper_id
    and a.rubric_version=q.rubric_version
);

revoke all on spark_grading_private.rubric_operational_review_progress_v2,
  spark_grading_private.v2_operational_calibration_queue
  from public,anon,authenticated,service_role;
grant select on spark_grading_private.rubric_operational_review_progress_v2,
  spark_grading_private.v2_operational_calibration_queue
  to service_role;

commit;
