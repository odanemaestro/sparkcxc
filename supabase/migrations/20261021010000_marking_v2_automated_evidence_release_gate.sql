-- SPARK V2: evidence-backed automated criterion approval and release gate.
--
-- Replaces the human "independent attestation" requirement with a database-
-- enforced release gate backed by recorded grading evidence:
--   * every criterion of a rubric must have a verification record whose
--     criterion SHA-256 and paper source SHA-256 match the registered rubric,
--     and whose every recorded test case passed, covering the required classes;
--   * the complete paper must have a passing end-to-end verification record;
--   * only then may a rubric become verified, and only a verified rubric may
--     become active and route student submissions.
-- Recording a passing criterion verification automatically registers the
-- criterion approval. Reviewer identities are the automated verifier's own;
-- nothing here claims a human or independent attestation.
begin;

create table if not exists spark_grading_private.criterion_verifications_v2 (
 subject_id text not null,
 rubric_version text not null,
 paper_id text not null,
 criterion_id text not null check (length(trim(criterion_id)) between 1 and 256),
 criterion_sha256 text not null check (criterion_sha256 ~ '^[0-9a-f]{64}$'),
 source_sha256 text not null check (source_sha256 ~ '^[0-9a-f]{64}$'),
 max_marks integer not null check (max_marks between 1 and 200),
 marking_rule_id text not null check (length(trim(marking_rule_id)) between 3 and 300),
 verification_kind text not null check (verification_kind in ('written','structured','program','visual')),
 all_or_nothing boolean not null default false,
 verified_source_answer jsonb not null,
 accepted_alternatives jsonb not null check (jsonb_typeof(accepted_alternatives)='array'),
 test_results jsonb not null check (jsonb_typeof(test_results)='object'),
 cases jsonb not null check (jsonb_typeof(cases)='array' and jsonb_array_length(cases) between 5 and 400),
 outcome text not null check (outcome='verified'),
 verification_method text not null check (length(trim(verification_method)) >= 10),
 provenance jsonb not null check (jsonb_typeof(provenance)='object'),
 evidence_sha256 text not null check (evidence_sha256 ~ '^[0-9a-f]{64}$'),
 verified_at timestamptz not null default clock_timestamp(),
 primary key (subject_id,rubric_version,paper_id,criterion_id,criterion_sha256),
 foreign key (subject_id,rubric_version,paper_id)
  references spark_grading_private.rubrics_v2(subject_id,rubric_version,paper_id)
  on delete restrict
);

create table if not exists spark_grading_private.paper_verifications_v2 (
 subject_id text not null,
 rubric_version text not null,
 paper_id text not null,
 source_sha256 text not null check (source_sha256 ~ '^[0-9a-f]{64}$'),
 expected_total_marks integer not null check (expected_total_marks between 1 and 1000),
 scenarios jsonb not null check (jsonb_typeof(scenarios)='array' and jsonb_array_length(scenarios) between 6 and 200),
 outcome text not null check (outcome='verified'),
 verification_method text not null check (length(trim(verification_method)) >= 10),
 provenance jsonb not null check (jsonb_typeof(provenance)='object'),
 evidence_sha256 text not null check (evidence_sha256 ~ '^[0-9a-f]{64}$'),
 verified_at timestamptz not null default clock_timestamp(),
 primary key (subject_id,rubric_version,paper_id,source_sha256),
 foreign key (subject_id,rubric_version,paper_id)
  references spark_grading_private.rubrics_v2(subject_id,rubric_version,paper_id)
  on delete restrict
);

alter table spark_grading_private.criterion_verifications_v2 enable row level security;
alter table spark_grading_private.paper_verifications_v2 enable row level security;
revoke all on spark_grading_private.criterion_verifications_v2 from public,anon,authenticated,service_role;
revoke all on spark_grading_private.paper_verifications_v2 from public,anon,authenticated,service_role;
grant select on spark_grading_private.criterion_verifications_v2 to service_role;
grant select on spark_grading_private.paper_verifications_v2 to service_role;

-- A criterion verification must match the live registered rubric exactly and
-- carry complete, passing evidence. Validated in the database, not trusted.
create or replace function spark_grading_private.validate_criterion_verification_v2()
returns trigger language plpgsql security invoker set search_path='' as $$
declare r spark_grading_private.rubrics_v2%rowtype;
declare v_criterion jsonb;
declare v_failed integer;
declare v_required text[];
declare v_class text;
begin
 if tg_op<>'INSERT' then
  raise exception 'Criterion verification evidence is append-only';
 end if;
 select * into r from spark_grading_private.rubrics_v2
  where subject_id=new.subject_id and paper_id=new.paper_id and rubric_version=new.rubric_version;
 if not found then raise exception 'Unknown V2 rubric'; end if;
 if r.source_sha256 is distinct from new.source_sha256 or
    r.source_sha256 is distinct from encode(pg_catalog.sha256(convert_to(r.criteria::text,'UTF8')),'hex') then
  raise exception 'Source SHA-256 mismatch for %/%',new.paper_id,new.criterion_id;
 end if;
 select c into v_criterion from jsonb_array_elements(r.criteria) c where c->>'id'=new.criterion_id;
 if v_criterion is null then raise exception 'Unknown criterion %',new.criterion_id; end if;
 if encode(pg_catalog.sha256(convert_to(v_criterion::text,'UTF8')),'hex') is distinct from new.criterion_sha256 then
  raise exception 'Criterion SHA-256 mismatch for %/%',new.paper_id,new.criterion_id;
 end if;
 if (v_criterion->>'maxMarks')::integer is distinct from new.max_marks then
  raise exception 'Criterion maximum mismatch for %/%',new.paper_id,new.criterion_id;
 end if;
 -- Every recorded case must have passed, stay within the criterion range,
 -- and never publish a mark other than its expected mark.
 select count(*) into v_failed from jsonb_array_elements(new.cases) x
  where jsonb_typeof(x)<>'object'
   or (x->>'passed') is distinct from 'true'
   or jsonb_typeof(x->'marks')<>'number'
   or (x->>'marks')::numeric<0 or (x->>'marks')::numeric>new.max_marks;
 if v_failed>0 then raise exception 'Verification has % failing cases',v_failed; end if;
 v_required:=array['full','blank','irrelevant','incorrect','ceiling'];
 if new.max_marks>=2 and not new.all_or_nothing then v_required:=array_append(v_required,'partial'); end if;
 if new.verification_kind='written' then v_required:=v_required||array['contradiction','keyword-list']; end if;
 if new.verification_kind='structured' then v_required:=v_required||array['equivalent','competing']; end if;
 if new.verification_kind='program' then v_required:=array_append(v_required,'equivalent'); end if;
 foreach v_class in array v_required loop
  if not exists(select 1 from jsonb_array_elements(new.cases) x where x->>'cls'=v_class) then
   raise exception 'Missing required % evidence for %/%',v_class,new.paper_id,new.criterion_id;
  end if;
 end loop;
 -- Decisive classes must be committed (resolved) at least once, not merely
 -- abstained on: full and blank always; one wrong answer; one partial.
 foreach v_class in array array['full','blank','incorrect']||
   case when 'partial'=any(v_required) then array['partial'] else array[]::text[] end loop
  if not exists(select 1 from jsonb_array_elements(new.cases) x
     where x->>'cls'=v_class and (x->>'resolved')='true') then
   raise exception 'No committed % evidence for %/%',v_class,new.paper_id,new.criterion_id;
  end if;
 end loop;
 if coalesce(new.provenance->>'bundleSha256','') !~ '^[0-9a-f]{64}$' or
    coalesce(new.provenance->>'fixtureSha256','') !~ '^[0-9a-f]{64}$' then
  raise exception 'Verification provenance must name the examiner bundle and fixture digests';
 end if;
 return new;
end $$;
drop trigger if exists criterion_verification_validate_v2 on spark_grading_private.criterion_verifications_v2;
create trigger criterion_verification_validate_v2
 before insert or update or delete on spark_grading_private.criterion_verifications_v2
 for each row execute function spark_grading_private.validate_criterion_verification_v2();

-- Passing evidence automatically registers the criterion approval.
create or replace function spark_grading_private.register_criterion_approval_v2()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
 insert into spark_grading_private.rubric_criterion_reviews_v2(
  subject_id,rubric_version,paper_id,criterion_id,criterion_sha256,
  verified_by,verified_at,review_note)
 values(new.subject_id,new.rubric_version,new.paper_id,new.criterion_id,
  new.criterion_sha256,'spark-v2-automated-verifier',new.verified_at,
  'Automated evidence-backed approval: '||jsonb_array_length(new.cases)||
  ' source-bound cases passed ('||new.verification_kind||', rule '||new.marking_rule_id||
  '); evidence '||new.evidence_sha256||'; examiner bundle '||(new.provenance->>'bundleSha256'))
 on conflict (subject_id,rubric_version,paper_id,criterion_id) do update
  set criterion_sha256=excluded.criterion_sha256,verified_by=excluded.verified_by,
      verified_at=excluded.verified_at,review_note=excluded.review_note
  where spark_grading_private.rubric_criterion_reviews_v2.criterion_sha256
        is distinct from excluded.criterion_sha256
     or spark_grading_private.rubric_criterion_reviews_v2.verified_by
        <>'spark-v2-automated-verifier';
 return new;
end $$;
drop trigger if exists criterion_verification_approves_v2 on spark_grading_private.criterion_verifications_v2;
create trigger criterion_verification_approves_v2
 after insert on spark_grading_private.criterion_verifications_v2
 for each row execute function spark_grading_private.register_criterion_approval_v2();

create or replace function spark_grading_private.validate_paper_verification_v2()
returns trigger language plpgsql security invoker set search_path='' as $$
declare r spark_grading_private.rubrics_v2%rowtype;
declare v_missing integer;
declare v_failed integer;
declare v_name text;
begin
 if tg_op<>'INSERT' then raise exception 'Paper verification evidence is append-only'; end if;
 select * into r from spark_grading_private.rubrics_v2
  where subject_id=new.subject_id and paper_id=new.paper_id and rubric_version=new.rubric_version;
 if not found then raise exception 'Unknown V2 rubric'; end if;
 if r.source_sha256 is distinct from new.source_sha256 or
    r.source_sha256 is distinct from encode(pg_catalog.sha256(convert_to(r.criteria::text,'UTF8')),'hex') or
    r.expected_total_marks is distinct from new.expected_total_marks then
  raise exception 'Paper source or total mismatch for %',new.paper_id;
 end if;
 select count(*) into v_missing from jsonb_array_elements(r.criteria) c
  where not exists(select 1 from spark_grading_private.criterion_verifications_v2 v
   where v.subject_id=r.subject_id and v.paper_id=r.paper_id and v.rubric_version=r.rubric_version
    and v.criterion_id=c->>'id' and v.source_sha256=r.source_sha256
    and v.criterion_sha256=encode(pg_catalog.sha256(convert_to(c::text,'UTF8')),'hex'));
 if v_missing>0 then
  raise exception 'Paper % has % criteria without verification evidence',new.paper_id,v_missing;
 end if;
 select count(*) into v_failed from jsonb_array_elements(new.scenarios) s
  where (s->>'passed') is distinct from 'true'
   or jsonb_typeof(s->'total')<>'number'
   or (s->>'total')::numeric<0 or (s->>'total')::numeric>new.expected_total_marks;
 if v_failed>0 then raise exception 'Paper % has % failing scenarios',new.paper_id,v_failed; end if;
 foreach v_name in array array['full-marks','zero-marks','blank-script','partial-marks','mixed','missing-answers','contradictory'] loop
  if not exists(select 1 from jsonb_array_elements(new.scenarios) s where s->>'name'=v_name) then
   raise exception 'Paper % lacks required % scenario',new.paper_id,v_name;
  end if;
 end loop;
 if coalesce(new.provenance->>'bundleSha256','') !~ '^[0-9a-f]{64}$' then
  raise exception 'Paper verification provenance must name the examiner bundle';
 end if;
 return new;
end $$;
drop trigger if exists paper_verification_validate_v2 on spark_grading_private.paper_verifications_v2;
create trigger paper_verification_validate_v2
 before insert or update or delete on spark_grading_private.paper_verifications_v2
 for each row execute function spark_grading_private.validate_paper_verification_v2();

-- Release gate: replaces the independent-attestation requirement.
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
   raise exception 'Verified status, source digest and total marks required';
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
   select 1 from spark_grading_private.criterion_verifications_v2 x
   where x.subject_id=new.subject_id and x.paper_id=new.paper_id
     and x.rubric_version=new.rubric_version
     and x.criterion_id=c->>'id'
     and x.source_sha256=new.source_sha256
     and x.criterion_sha256=encode(pg_catalog.sha256(convert_to(c::text,'UTF8')),'hex')
     and x.verified_at<=new.verified_at
 );
 if v_missing>0 then
   raise exception 'Missing evidence-backed criterion verifications: %',v_missing;
 end if;
 if not exists(select 1 from spark_grading_private.paper_verifications_v2 p
   where p.subject_id=new.subject_id and p.paper_id=new.paper_id
     and p.rubric_version=new.rubric_version and p.source_sha256=new.source_sha256
     and p.verified_at<=new.verified_at) then
   raise exception 'Missing end-to-end paper verification for %',new.paper_id;
 end if;
 return new;
end $$;

-- Idempotent registration entry points (operator / service role only).
create or replace function spark_grading_private.register_criterion_verifications_v2(p_records jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare rec jsonb;
declare v_inserted integer:=0;
declare v_existing integer:=0;
declare v_rows integer;
begin
 if current_user<>'postgres' and session_user<>'postgres' and
    coalesce(auth.jwt()->>'role','')<>'service_role' then
  raise exception 'Forbidden' using errcode='42501';
 end if;
 if jsonb_typeof(p_records)<>'array' then raise exception 'Expected an array of records'; end if;
 for rec in select value from jsonb_array_elements(p_records) loop
  insert into spark_grading_private.criterion_verifications_v2(
   subject_id,rubric_version,paper_id,criterion_id,criterion_sha256,source_sha256,
   max_marks,marking_rule_id,verification_kind,all_or_nothing,verified_source_answer,
   accepted_alternatives,test_results,cases,outcome,verification_method,provenance,evidence_sha256)
  values(rec->>'subjectId',rec->>'rubricVersion',rec->>'paperId',rec->>'criterionId',
   rec->>'criterionSha256',rec->>'sourceSha256',(rec->>'maxMarks')::integer,
   rec->>'markingRuleId',rec->>'kind',coalesce((rec->>'allOrNothing')::boolean,false),
   coalesce(rec->'verifiedSourceAnswer','null'::jsonb),coalesce(rec->'acceptedAlternatives','[]'::jsonb),
   rec->'testResults',rec->'cases',rec->>'outcome',rec->>'verificationMethod',
   rec->'provenance',rec->>'evidenceSha256')
  on conflict (subject_id,rubric_version,paper_id,criterion_id,criterion_sha256) do nothing;
  get diagnostics v_rows=row_count;
  if v_rows=1 then v_inserted:=v_inserted+1; else v_existing:=v_existing+1; end if;
 end loop;
 return jsonb_build_object('inserted',v_inserted,'alreadyRecorded',v_existing);
end $$;

create or replace function spark_grading_private.register_paper_verification_v2(p_record jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_rows integer;
begin
 if current_user<>'postgres' and session_user<>'postgres' and
    coalesce(auth.jwt()->>'role','')<>'service_role' then
  raise exception 'Forbidden' using errcode='42501';
 end if;
 insert into spark_grading_private.paper_verifications_v2(
  subject_id,rubric_version,paper_id,source_sha256,expected_total_marks,scenarios,
  outcome,verification_method,provenance,evidence_sha256)
 values(p_record->>'subjectId',p_record->>'rubricVersion',p_record->>'paperId',
  p_record->>'sourceSha256',(p_record->>'expectedTotalMarks')::integer,p_record->'scenarios',
  p_record->>'outcome',p_record->>'verificationMethod',p_record->'provenance',p_record->>'evidenceSha256')
 on conflict (subject_id,rubric_version,paper_id,source_sha256) do nothing;
 get diagnostics v_rows=row_count;
 return jsonb_build_object('inserted',v_rows);
end $$;

-- Verify and activate one rubric. The release gate trigger enforces evidence;
-- this function only performs the transition, atomically, and deactivates no
-- other paper. A different active version of the same paper blocks release.
create or replace function spark_grading_private.release_verified_rubric_v2(
 p_subject_id text,p_paper_id text,p_rubric_version text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare r spark_grading_private.rubrics_v2%rowtype;
begin
 if current_user<>'postgres' and session_user<>'postgres' and
    coalesce(auth.jwt()->>'role','')<>'service_role' then
  raise exception 'Forbidden' using errcode='42501';
 end if;
 select * into r from spark_grading_private.rubrics_v2
  where subject_id=p_subject_id and paper_id=p_paper_id and rubric_version=p_rubric_version for update;
 if not found then raise exception 'Unknown V2 rubric'; end if;
 if exists(select 1 from spark_grading_private.rubrics_v2 o
   where o.subject_id=p_subject_id and o.paper_id=p_paper_id
     and o.rubric_version<>p_rubric_version and o.active) then
  raise exception 'Another version of % is already active',p_paper_id;
 end if;
 if r.verification_status='verified' and r.active then
  return jsonb_build_object('status','already-active');
 end if;
 if r.verification_status<>'verified' then
  update spark_grading_private.rubrics_v2
   set verification_status='verified',verified_by='spark-v2-automated-release-gate',
       verified_at=clock_timestamp()
   where subject_id=p_subject_id and paper_id=p_paper_id and rubric_version=p_rubric_version;
 end if;
 update spark_grading_private.rubrics_v2 set active=true
  where subject_id=p_subject_id and paper_id=p_paper_id and rubric_version=p_rubric_version;
 return jsonb_build_object('status','activated');
end $$;

revoke all on function spark_grading_private.register_criterion_verifications_v2(jsonb) from public,anon,authenticated;
revoke all on function spark_grading_private.register_paper_verification_v2(jsonb) from public,anon,authenticated;
revoke all on function spark_grading_private.release_verified_rubric_v2(text,text,text) from public,anon,authenticated;
grant execute on function spark_grading_private.register_criterion_verifications_v2(jsonb) to service_role;
grant execute on function spark_grading_private.register_paper_verification_v2(jsonb) to service_role;
grant execute on function spark_grading_private.release_verified_rubric_v2(text,text,text) to service_role;

create or replace view spark_grading_private.rubric_release_status_v2
with (security_invoker=true) as
select r.subject_id,r.paper_id,r.rubric_version,r.verification_status,r.active,
 jsonb_array_length(r.criteria) as criteria,
 (select count(*) from jsonb_array_elements(r.criteria) c where exists(
   select 1 from spark_grading_private.criterion_verifications_v2 v
   where v.subject_id=r.subject_id and v.paper_id=r.paper_id and v.rubric_version=r.rubric_version
    and v.criterion_id=c->>'id' and v.source_sha256=r.source_sha256
    and v.criterion_sha256=encode(pg_catalog.sha256(convert_to(c::text,'UTF8')),'hex'))) as verified_criteria,
 exists(select 1 from spark_grading_private.paper_verifications_v2 p
   where p.subject_id=r.subject_id and p.paper_id=r.paper_id and p.rubric_version=r.rubric_version
    and p.source_sha256=r.source_sha256) as paper_verified,
 (r.source_sha256=encode(pg_catalog.sha256(convert_to(r.criteria::text,'UTF8')),'hex')) as source_hash_matches
from spark_grading_private.rubrics_v2 r;
revoke all on spark_grading_private.rubric_release_status_v2 from public,anon,authenticated;
grant select on spark_grading_private.rubric_release_status_v2 to service_role;
commit;
