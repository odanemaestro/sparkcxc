-- SPARK V2: independent, criterion-by-criterion rubric approval.
-- Draft-only installation. No rubrics are approved and no scores are published.
begin;

alter table spark_grading_private.rubrics_v2
  add column if not exists expected_total_marks integer
  check (expected_total_marks between 1 and 1000);

create table if not exists spark_grading_private.rubric_criterion_reviews_v2 (
 subject_id text not null,
 rubric_version text not null,
 paper_id text not null,
 criterion_id text not null check (length(trim(criterion_id)) between 1 and 256),
 criterion_sha256 text not null check (criterion_sha256 ~ '^[0-9a-f]{64}$'),
 verified_by text not null check (length(trim(verified_by)) >= 3),
 verified_at timestamptz not null,
 review_note text not null check (length(trim(review_note)) >= 10),
 primary key (subject_id,rubric_version,paper_id,criterion_id),
 foreign key (subject_id,rubric_version,paper_id)
 references spark_grading_private.rubrics_v2(subject_id,rubric_version,paper_id)
 on delete restrict
);
alter table spark_grading_private.rubric_criterion_reviews_v2 enable row level security;
revoke all on spark_grading_private.rubric_criterion_reviews_v2
 from public,anon,authenticated,service_role;
grant select on spark_grading_private.rubric_criterion_reviews_v2 to service_role;
-- Inserting a review is deliberately reserved for the database operator, not worker.

create or replace function spark_grading_private.guard_criterion_review_changes_v2()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if exists(select 1 from spark_grading_private.rubrics_v2 r
   where r.subject_id=old.subject_id and r.paper_id=old.paper_id
    and r.rubric_version=old.rubric_version
    and r.verification_status='verified') then
   raise exception 'Verified rubric reviews are immutable; register a new rubric version';
 end if;
 if tg_op='DELETE' then return old; end if;
 return new;
end $$;
drop trigger if exists rubric_criterion_review_immutable_v2
 on spark_grading_private.rubric_criterion_reviews_v2;
create trigger rubric_criterion_review_immutable_v2
 before update or delete on spark_grading_private.rubric_criterion_reviews_v2
 for each row execute function spark_grading_private.guard_criterion_review_changes_v2();

create or replace function spark_grading_private.guard_rubric_activation_v2()
returns trigger language plpgsql security invoker set search_path='' as $$
declare v_total bigint;
declare v_invalid integer;
declare v_missing integer;
begin
 if tg_op='UPDATE' and old.verification_status='verified' and (
    new.subject_id is distinct from old.subject_id or
    new.paper_id is distinct from old.paper_id or
    new.rubric_version is distinct from old.rubric_version or
    new.criteria is distinct from old.criteria or
    new.source_sha256 is distinct from old.source_sha256 or
    new.expected_total_marks is distinct from old.expected_total_marks or
    new.verified_by is distinct from old.verified_by or
    new.verified_at is distinct from old.verified_at or
    new.verification_status is distinct from old.verification_status
 ) then
   raise exception 'Verified V2 rubric is immutable; use a new version';
 end if;
 if new.verification_status<>'verified' and not new.active then return new; end if;
 if new.verification_status<>'verified' or
    new.source_sha256 is null or new.source_sha256 !~ '^[0-9a-f]{64}$' or
    new.verified_by is null or length(trim(new.verified_by))<3 or
    new.verified_at is null or new.expected_total_marks is null then
   raise exception 'Independent source attestation and total marks required';
 end if;
 select sum(case when (c->>'maxMarks') ~ '^[0-9]+$' then (c->>'maxMarks')::bigint else 0 end),
        count(*) filter(where jsonb_typeof(c)<>'object' or
          coalesce(c->>'id','')='' or
          coalesce(c->>'sourcePartId','')='' or
          c->>'id' is distinct from c->>'sourcePartId' or
          coalesce(c->>'maxMarks','') !~ '^[0-9]+$')
 into v_total,v_invalid
 from jsonb_array_elements(new.criteria) c;
 if v_invalid>0 or v_total is distinct from new.expected_total_marks or
   (select count(distinct c->>'id') from jsonb_array_elements(new.criteria) c)
     <> jsonb_array_length(new.criteria) then
   raise exception 'Rubric criterion identity or marks mismatch';
 end if;
 select count(*) into v_missing
 from jsonb_array_elements(new.criteria) c
 where not exists(
   select 1 from spark_grading_private.rubric_criterion_reviews_v2 x
   where x.subject_id=new.subject_id and x.paper_id=new.paper_id
     and x.rubric_version=new.rubric_version
     and x.criterion_id=c->>'id'
     and x.criterion_sha256=encode(pg_catalog.sha256(convert_to(c::text,'UTF8')),'hex')
     and x.verified_by<>new.verified_by
     and x.verified_at<=new.verified_at
 );
 if v_missing>0 then
   raise exception 'Missing independent criterion-level approvals: %',v_missing;
 end if;
 return new;
end $$;
drop trigger if exists rubrics_v2_requires_criterion_approval
 on spark_grading_private.rubrics_v2;
create trigger rubrics_v2_requires_criterion_approval
 before insert or update on spark_grading_private.rubrics_v2
 for each row execute function spark_grading_private.guard_rubric_activation_v2();

-- Review progress available to operators. The private schema is not exposed publicly.
create or replace view spark_grading_private.rubric_review_progress_v2
with (security_invoker=true) as
select r.subject_id,r.paper_id,r.rubric_version,r.verification_status,
       r.active,jsonb_array_length(r.criteria) as total_criteria,
       count(v.criterion_id) as matching_criterion_reviews,
       r.expected_total_marks,
       (select sum((c->>'maxMarks')::integer)
         from jsonb_array_elements(r.criteria) c) as registered_total_marks
from spark_grading_private.rubrics_v2 r
left join lateral jsonb_array_elements(r.criteria) c on true
left join spark_grading_private.rubric_criterion_reviews_v2 v
 on v.subject_id=r.subject_id and v.paper_id=r.paper_id
  and v.rubric_version=r.rubric_version
  and v.criterion_id=c->>'id'
  and v.criterion_sha256=encode(pg_catalog.sha256(convert_to(c::text,'UTF8')),'hex')
group by r.subject_id,r.paper_id,r.rubric_version,r.verification_status,
         r.active,r.criteria,r.expected_total_marks;
revoke all on spark_grading_private.rubric_review_progress_v2
 from public,anon,authenticated;
grant select on spark_grading_private.rubric_review_progress_v2 to service_role;
commit;
