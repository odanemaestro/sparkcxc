begin;

-- All authoring stays draft. This migration adds guards and integration only;
-- it neither activates rubrics nor publishes the Office Administration course.
create or replace function spark_grading_private.oa_student_can_learn_v2(p_student_id uuid)
returns boolean language plpgsql security definer set search_path='' as $$
begin
  if p_student_id is null or to_regclass('public.spark_subjects') is null
     or to_regclass('public.spark_student_subject_enrollments') is null
     or to_regclass('public.profiles') is null then return false; end if;
  return exists(select 1 from public.spark_student_subject_enrollments e
    join public.spark_subjects s on s.id=e.subject_id
    join public.profiles p on p.id=e.student_id and p.role='student'
    where e.student_id=p_student_id and e.subject_id='office-administration'
      and e.status='active' and s.enabled and s.status='live');
end $$;
revoke all on function spark_grading_private.oa_student_can_learn_v2(uuid)
from public,anon,authenticated,service_role;

do $oa_rpc_guards$
declare
  def text;
  anchor text;
  replacement text;
  method_pattern text := 'coalesce(v_row->>''method'','''')!~ ''^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification|physics-empty-graph-dependent-response|physics-source-explicit-wrong|physics-source-complete-answer|physics-source-canonical-partial)$''';
begin
  select pg_get_functiondef('public.spark_start_exam_attempt(text,text,text,integer,text,text,text,jsonb)'::regprocedure) into def;
  if strpos(def,'Office Administration timed durations are server-owned')=0 then
    anchor:='-- Durations for the two clients currently using these RPCs are server-owned.';
    replacement:=$duration$
  -- Office Administration timed durations are server-owned.
  if p_subject_id='office-administration'
     and coalesce(nullif(p_session_mode,''),'timed')='timed'
     and ((p_paper='01' and p_duration_seconds<>4500)
       or (p_paper='02' and p_duration_seconds<>7200)) then
    raise exception 'Duration does not match this Office Administration timed paper';
  end if;
  -- Durations for the two clients currently using these RPCs are server-owned.
$duration$;
    if length(def)-length(replace(def,anchor,''))<>length(anchor) then
      raise exception 'Unexpected exam start implementation; refusing Office Administration patch';
    end if;
    execute replace(def,anchor,replacement);
  end if;

  select pg_get_functiondef('public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb)'::regprocedure) into def;
  if strpos(def,'Office Administration source Paper 1 may save unscored answers')=0 then
    -- Accounts already permits its own source Paper 1. Append this subject
    -- to that known clause, without changing any other course's null policy.
    anchor:='v_row.subject_id=''principles-of-accounts'' and v_row.paper=''01''';
    replacement:=$nullable$(/* Office Administration source Paper 1 may save unscored answers */
      v_row.subject_id in ('principles-of-accounts','office-administration') and v_row.paper='01')$nullable$;
    if length(def)-length(replace(def,anchor,''))<>length(anchor) then
      raise exception 'Unexpected nullable-score implementation; refusing Office Administration patch';
    end if;
    execute replace(def,anchor,replacement);
  end if;

  select pg_get_functiondef('spark_grading_private.guard_rubric_activation_v2()'::regprocedure) into def;
  if strpos(def,'Office Administration canonical composite identity')=0 then
    anchor:='c->>''id'' is distinct from c->>''sourcePartId''';
    replacement:=$identity$(c->>'id' is distinct from c->>'sourcePartId'
      and not ((/* Office Administration canonical composite identity */
        new.subject_id='office-administration'
        and new.paper_id in ('OA-ORIGINAL-02-01','OA-ORIGINAL-02-02','OA-ORIGINAL-02-03')
        and new.rubric_version='oa-source-rubric-v2-2026-10-26'
        and c->>'sourceFormat'='oa-original-paper2'
        and c->>'sourceVersion'='oa-paper2-original-2026-10-26-v1'
        and c->>'sourcePaperId'=new.paper_id
        and c->>'sourceQuestion' ~ '^[1-6]$'
        and c->>'id'=new.paper_id||'-Q'||(c->>'sourceQuestion')||'::'||(c->>'sourcePartId')) is true))$identity$;
    if length(def)-length(replace(def,anchor,''))<>length(anchor) then
      raise exception 'Unexpected activation identity validator; refusing Office Administration patch';
    end if;
    execute replace(def,anchor,replacement);
  end if;

  select pg_get_functiondef('public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)'::regprocedure) into def;
  if strpos(def,'Office Administration source provenance v1')=0 then
    if length(def)-length(replace(def,method_pattern,''))<>length(method_pattern) then
      -- Accept the exact known original staging validator as well as the
      -- current validator, preserving all other method policies.
      method_pattern:='coalesce(v_row->>''method'','''')!~ ''^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification)$''';
      if length(def)-length(replace(def,method_pattern,''))<>length(method_pattern) then
        raise exception 'Unexpected V2 method validator; refusing Office Administration patch';
      end if;
    end if;
    def:=replace(def,method_pattern,replace(method_pattern,')$''','|office-administration-source-evidence-v2)$'''));
    anchor:='v_total:=v_total+v_mark;';
    replacement:=$provenance$
  -- Office Administration source provenance v1. The method belongs only to
  -- these three source-bound structured papers and their canonical criteria.
  if v_rubric.subject_id='office-administration' then
    if v_rubric.paper_id not in ('OA-ORIGINAL-02-01','OA-ORIGINAL-02-02','OA-ORIGINAL-02-03')
       or v_rubric.rubric_version<>'oa-source-rubric-v2-2026-10-26'
       or v_rubric.expected_total_marks<>90
       or v_method<>'office-administration-source-evidence-v2'
       or not exists(select 1 from spark_grading_private.paper_verifications_v2 evidence
         where evidence.subject_id=v_rubric.subject_id and evidence.paper_id=v_rubric.paper_id
           and evidence.rubric_version=v_rubric.rubric_version
           and evidence.source_sha256=v_rubric.source_sha256 and evidence.outcome='verified'
           and evidence.provenance->>'bundleSha256'=p_bundle_sha256)
       or v_part->>'sourceFormat' is distinct from 'oa-original-paper2'
       or v_part->>'sourceVersion' is distinct from 'oa-paper2-original-2026-10-26-v1'
       or v_part->>'sourcePaperId' is distinct from v_rubric.paper_id
       or v_part->>'kind' is distinct from 'structured'
       or coalesce(v_part->>'sourceQuestion','') !~ '^[1-6]$'
       or v_part->>'id' is distinct from
         v_rubric.paper_id||'-Q'||(v_part->>'sourceQuestion')||'::'||(v_part->>'sourcePartId') then
      raise exception 'Office Administration examiner provenance mismatch';
    end if;
  elsif v_method='office-administration-source-evidence-v2' then
    raise exception 'Office Administration examiner provenance mismatch';
  end if;
  v_total:=v_total+v_mark;
$provenance$;
    if length(def)-length(replace(def,anchor,''))<>length(anchor) then
      raise exception 'Unexpected V2 mark accumulation; refusing Office Administration patch';
    end if;
    execute replace(def,anchor,replacement);
  end if;
end $oa_rpc_guards$;

create or replace function spark_grading_private.oa_client_attempt_guard_v2()
returns trigger language plpgsql security definer set search_path='' as $$
begin
  if new.subject_id<>'office-administration'
     or coalesce(auth.jwt()->>'role','')='service_role' then return new; end if;
  if auth.uid() is distinct from new.user_id
     or not spark_grading_private.oa_student_can_learn_v2(new.user_id) then
    raise exception 'Office Administration requires an owned active enrollment in a live course' using errcode='42501';
  end if;
  if new.paper not in ('01','02') or new.session_mode not in ('timed','practice') then
    raise exception 'Invalid Office Administration paper or session mode';
  end if;
  new.metadata:=coalesce(new.metadata,'{}'::jsonb) - array[
    'score_authority','v2_source_sha256','v2_marker_sha256','v2_rubric_version',
    'v2_verified_at','v2_confirmed_marks','v2_unresolved_marks','finalScore',
    'confirmedMarks','canPublishFinalScore','scorePublicationAllowed','serverVerified',
    'verified','v2_result_phase'
  ];
  if new.paper='02' then
    new.score:=null;
    if new.status='submitted' then new.max_score:=90; end if;
    new.metadata:=new.metadata||jsonb_build_object('score_authority','pending-server-marking',
      'provisional',true,'scorePublicationAllowed',false);
  else
    new.metadata:=new.metadata||jsonb_build_object('score_authority','client-practice-estimate');
  end if;
  return new;
end $$;
revoke all on function spark_grading_private.oa_client_attempt_guard_v2()
from public,anon,authenticated,service_role;
drop trigger if exists spark_oa_client_attempt_guard_v2 on public.spark_exam_attempts;
create trigger spark_oa_client_attempt_guard_v2 before insert or update on public.spark_exam_attempts
for each row execute function spark_grading_private.oa_client_attempt_guard_v2();

create or replace function spark_grading_private.oa_client_progress_guard_v2()
returns trigger language plpgsql security definer set search_path='' as $$
declare
  v_paper1 boolean;
  v_paper2 boolean;
  v_key_attempt uuid;
  v_meta_attempt uuid;
  v_has_reference boolean;
  v_owned_paper1 boolean;
  v_owned_paper2 boolean;
  v_attempt public.spark_exam_attempts%rowtype;
begin
  if new.subject_id<>'office-administration'
     or coalesce(auth.jwt()->>'role','')='service_role' then return new; end if;
  if auth.uid() is distinct from new.user_id
     or not spark_grading_private.oa_student_can_learn_v2(new.user_id) then
    raise exception 'Office Administration requires an owned active enrollment in a live course' using errcode='42501';
  end if;
  if tg_op='UPDATE' and old.metadata->>'score_authority'='server-v2-deterministic' then
    -- Preserve a private examiner's final result against later browser sync.
    return old;
  end if;

  new.metadata:=coalesce(new.metadata,'{}'::jsonb);
  if new.activity_key ~* '^exam:oa-v2:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    v_key_attempt:=substring(new.activity_key from 12)::uuid;
  end if;
  v_has_reference:=coalesce(new.metadata->>'server_attempt_id','')<>'';
  if new.metadata->>'server_attempt_id' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    v_meta_attempt:=(new.metadata->>'server_attempt_id')::uuid;
  end if;
  select * into v_attempt from public.spark_exam_attempts a
    where a.user_id=new.user_id and a.subject_id='office-administration'
      and a.paper='02' and (a.id=v_key_attempt or a.id=v_meta_attempt)
    order by case when a.id=v_key_attempt then 0 else 1 end limit 1;
  v_owned_paper2:=found;
  if (v_key_attempt is not null and not exists (select 1 from public.spark_exam_attempts a
      where a.id=v_key_attempt and a.user_id=new.user_id and a.subject_id='office-administration' and a.paper='02'))
     or (v_meta_attempt is not null and not exists (select 1 from public.spark_exam_attempts a
      where a.id=v_meta_attempt and a.user_id=new.user_id and a.subject_id='office-administration'))
     or (v_key_attempt is not null and v_meta_attempt is not null and v_key_attempt<>v_meta_attempt) then
    raise exception 'Office Administration attempt reference does not belong to this student' using errcode='42501';
  end if;
  select exists(select 1 from public.spark_exam_attempts a
    where a.id=v_meta_attempt and a.user_id=new.user_id
      and a.subject_id='office-administration' and a.paper='01') into v_owned_paper1;

  -- The V2 key namespace is reserved for written exams, including malformed
  -- or foreign references. Invalid references cannot grant a Paper 1 exemption.
  -- Explicit Paper 2 evidence wins whenever the browser supplies mixed labels.
  v_paper2:=lower(new.activity_key) like 'exam:oa-v2:%'
    or v_owned_paper2
    or (v_has_reference and not v_owned_paper1)
    or lower(coalesce(new.metadata->>'paper','')) in ('02','2','paper2','paper 2')
    or lower(coalesce(new.metadata->>'paper_type',''))='paper2'
    or lower(coalesce(new.metadata->>'paper_id','')) ~ '^(oa-original-02-|oa-2-|oa-specimen-2-)';
  v_paper1:=not v_paper2 and (
    lower(coalesce(new.metadata->>'paper','')) in ('01','1','paper1','paper 1')
    or lower(coalesce(new.metadata->>'paper_type',''))='paper1');
  if v_paper2 then
    new.activity_type:='exam';
    new.title:='Office Administration Paper 02';
    new.metadata:=new.metadata||jsonb_build_object('paper','02','paper_type','paper2');
    if v_owned_paper2 then
      new.metadata:=new.metadata||jsonb_strip_nulls(jsonb_build_object(
        'server_attempt_id',v_attempt.id,
        'paper_id',coalesce(v_attempt.v2_paper_id,v_attempt.metadata->>'paper_id')));
    end if;
  end if;

  if tg_table_name='spark_subject_activity_events' and exists (
    select 1 from public.spark_subject_progress p
    where p.user_id=new.user_id and p.subject_id=new.subject_id
      and (p.activity_key=new.activity_key
        or (v_owned_paper2 and p.activity_key='exam:oa-v2:'||v_attempt.id::text))
      and p.metadata->>'score_authority'='server-v2-deterministic'
  ) then
    -- The worker may finish before a delayed pending event, including an old
    -- client activity key whose server_attempt_id identifies the same paper.
    return null;
  end if;
  new.metadata:=new.metadata - array[
    'score_authority','v2_source_sha256','v2_marker_sha256','v2_rubric_version',
    'v2_verified_at','v2_confirmed_marks','v2_unresolved_marks','finalScore',
    'confirmedMarks','canPublishFinalScore','scorePublicationAllowed','serverVerified',
    'verified','v2_result_phase'
  ];
  if v_paper2 or (new.activity_type in ('exam','practice') and not v_paper1) then
    new.score:=null; new.percent:=null;
    if tg_table_name='spark_subject_progress' then new.best_percent:=null; end if;
    new.metadata:=new.metadata||jsonb_build_object('score_authority','pending-server-marking',
      'provisional',true,'scorePublicationAllowed',false);
  else
    new.metadata:=new.metadata||jsonb_build_object('score_authority','client-practice-estimate');
  end if;
  return new;
end $$;
revoke all on function spark_grading_private.oa_client_progress_guard_v2()
from public,anon,authenticated,service_role;


do $oa_progress_hooks$
begin
  if to_regclass('public.spark_subject_progress') is not null then
    execute 'drop trigger if exists spark_oa_client_progress_guard_v2 on public.spark_subject_progress';
    execute 'create trigger spark_oa_client_progress_guard_v2 before insert or update on public.spark_subject_progress for each row execute function spark_grading_private.oa_client_progress_guard_v2()';
  end if;
  if to_regclass('public.spark_subject_activity_events') is not null then
    execute 'drop trigger if exists spark_oa_client_activity_guard_v2 on public.spark_subject_activity_events';
    execute 'create trigger spark_oa_client_activity_guard_v2 before insert or update on public.spark_subject_activity_events for each row execute function spark_grading_private.oa_client_progress_guard_v2()';
  end if;
end $oa_progress_hooks$;
create table if not exists spark_grading_private.oa_published_results_v2 (
  attempt_id uuid primary key references public.spark_exam_attempts(id) on delete cascade,
  rubric_version text not null,
  published_at timestamptz not null default clock_timestamp()
);
alter table spark_grading_private.oa_published_results_v2 enable row level security;
revoke all on spark_grading_private.oa_published_results_v2 from public,anon,authenticated,service_role;
grant select on spark_grading_private.oa_published_results_v2 to service_role;

create or replace function spark_grading_private.publish_oa_verified_progress_v2()
returns trigger language plpgsql security definer set search_path='' as $$
declare
  v_job spark_grading_private.marking_jobs_v2%rowtype;
  v_rubric spark_grading_private.rubrics_v2%rowtype;
  v_key text;
  v_percent numeric(6,2);
  v_metadata jsonb;
  v_inserted uuid;
begin
  if new.subject_id<>'office-administration' or new.paper<>'02'
     or new.status<>'submitted'
     or new.metadata->>'score_authority' is distinct from 'server-v2-deterministic'
     or new.score is null then return new; end if;
  select * into v_job from spark_grading_private.marking_jobs_v2
    where attempt_id=new.id and rubric_version=new.v2_rubric_version and status='verified';
  if not found then raise exception 'Office Administration final result requires its verified private examiner job'; end if;
  select * into v_rubric from spark_grading_private.rubrics_v2
    where subject_id=new.subject_id and paper_id=new.v2_paper_id
      and rubric_version=new.v2_rubric_version and active and verification_status='verified';
  if not found or new.grader_version<>'spark-paper2-v2'
     or new.max_score is distinct from v_rubric.expected_total_marks
     or new.score<0 or new.score>new.max_score
     or new.v2_response_sha256 is distinct from encode(pg_catalog.sha256(convert_to(new.response_snapshot::text,'UTF8')),'hex')
     or new.metadata->>'v2_source_sha256' is distinct from v_rubric.source_sha256
     or v_job.result->>'sourceSha256' is distinct from v_rubric.source_sha256
     or v_job.result->>'paperId' is distinct from new.v2_paper_id
     or v_job.result->>'rubricVersion' is distinct from new.v2_rubric_version
     or v_job.result->>'bundleSha256' is distinct from new.metadata->>'v2_marker_sha256'
     or (v_job.result->>'finalScore')::numeric is distinct from new.score
     or (v_job.result->>'confirmedMarks')::numeric is distinct from new.score
     or (v_job.result->>'maxMarks')::numeric is distinct from new.max_score
     or (v_job.result->>'unresolvedMarks')::numeric is distinct from 0
     or v_job.result->>'canPublishFinalScore' is distinct from 'true'
     or not exists(select 1 from spark_grading_private.paper_verifications_v2 evidence
       where evidence.subject_id=new.subject_id and evidence.paper_id=new.v2_paper_id
         and evidence.rubric_version=new.v2_rubric_version
         and evidence.source_sha256=v_rubric.source_sha256 and evidence.outcome='verified'
         and evidence.provenance->>'bundleSha256'=new.metadata->>'v2_marker_sha256') then
    raise exception 'Office Administration final result failed source and score reconciliation';
  end if;
  if not spark_grading_private.oa_student_can_learn_v2(new.user_id) then
    raise exception 'Office Administration final publication requires active enrollment in a live course';
  end if;
  if to_regclass('public.spark_subject_progress') is null
     or to_regclass('public.spark_subject_activity_events') is null then
    raise exception 'Office Administration final progress publication requires the canonical progress schema';
  end if;
  insert into spark_grading_private.oa_published_results_v2(attempt_id,rubric_version)
    values(new.id,new.v2_rubric_version) on conflict(attempt_id) do nothing returning attempt_id into v_inserted;
  if v_inserted is null then return new; end if;
  v_key:='exam:oa-v2:'||new.id::text;
  v_percent:=round(new.score/new.max_score*100,2);
  v_metadata:=jsonb_build_object('subject_id',new.subject_id,'paper','02','paper_type','paper2',
    'paper_id',new.v2_paper_id,'server_attempt_id',new.id,
    'score_authority','server-v2-deterministic','provisional',false,
    'scorePublicationAllowed',true,'v2_result_phase','verified',
    'v2_source_sha256',v_rubric.source_sha256,'v2_rubric_version',new.v2_rubric_version,
    'v2_marker_sha256',new.metadata->>'v2_marker_sha256','v2_verified_at',new.metadata->>'v2_verified_at',
    'v2_confirmed_marks',new.score,'v2_unresolved_marks',0);
  insert into public.spark_subject_progress(user_id,subject_id,activity_key,activity_type,title,
      completed,score,max_score,percent,best_percent,attempt_count,metadata,completed_at,first_recorded_at,updated_at)
    values(new.user_id,new.subject_id,v_key,'exam','Office Administration Paper 02',
      true,new.score,new.max_score,v_percent,v_percent,1,v_metadata,
      coalesce(new.submitted_at,clock_timestamp()),new.started_at,clock_timestamp())
    on conflict(user_id,subject_id,activity_key) do update set
      completed=true,score=excluded.score,max_score=excluded.max_score,
      percent=excluded.percent,best_percent=excluded.percent,
      attempt_count=greatest(public.spark_subject_progress.attempt_count,1),
      metadata=excluded.metadata,updated_at=excluded.updated_at;
  -- The existing Office Administration notification trigger sends one student notification
  -- and one per approved linked parent. A private attempt receipt makes worker
  -- retries and repeated attempt updates idempotent without a teacher workflow.
  insert into public.spark_subject_activity_events(user_id,subject_id,activity_key,activity_type,
      title,completed,score,max_score,percent,metadata,occurred_at,created_at)
    values(new.user_id,new.subject_id,v_key,'exam','Office Administration Paper 02',
      true,new.score,new.max_score,v_percent,v_metadata,clock_timestamp(),clock_timestamp());
  return new;
end $$;
revoke all on function spark_grading_private.publish_oa_verified_progress_v2()
from public,anon,authenticated,service_role;
drop trigger if exists spark_oa_verified_progress_v2 on public.spark_exam_attempts;
create trigger spark_oa_verified_progress_v2 after update on public.spark_exam_attempts
  for each row execute function spark_grading_private.publish_oa_verified_progress_v2();

commit;
