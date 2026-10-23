begin;

-- Accounts joins the existing V2 worker without changing another subject's
-- examiner, duration, browser practice score, or publication policy.
do $poa_guards$
declare
  def text;
  anchor text;
  replacement text;
  old_pattern text := 'coalesce(v_row->>''method'','''')!~ ''^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification)$''';
  physics_pattern text := 'coalesce(v_row->>''method'','''')!~ ''^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification|physics-empty-graph-dependent-response|physics-source-explicit-wrong|physics-source-complete-answer|physics-source-canonical-partial)$''';
begin
  select pg_get_functiondef('public.spark_start_exam_attempt(text,text,text,integer,text,text,text,jsonb)'::regprocedure) into def;
  if strpos(def,'Accounts timed durations are server-owned')=0 then
    anchor := '-- Durations for the two clients currently using these RPCs are server-owned.';
    if length(def)-length(replace(def,anchor,''))<>length(anchor) then
      raise exception 'Unexpected exam start implementation; refusing Accounts duration patch';
    end if;
    replacement := $duration$
  -- Accounts timed durations are server-owned. Untimed practice remains flexible.
  if p_subject_id='principles-of-accounts' and coalesce(p_session_mode,'timed')='timed'
     and ((p_paper='01' and p_duration_seconds<>5400)
       or (p_paper='02' and p_duration_seconds<>10800)) then
    raise exception 'Duration does not match this Accounts timed paper';
  end if;
  -- Durations for the two clients currently using these RPCs are server-owned.
$duration$;
    execute replace(def,anchor,replacement);
  elsif strpos(def,'p_duration_seconds<>5400')=0 or strpos(def,'p_duration_seconds<>10800')=0 then
    raise exception 'Accounts duration guard marker has unexpected implementation';
  end if;

  select pg_get_functiondef('public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb)'::regprocedure) into def;
  if strpos(def,'Accounts Paper 2 never accepts a browser final score')=0 then
    -- The full live function and the isolated registry fixture have different
    -- existing nullable-score expressions. Preserve either exact implementation.
    if strpos(def,'score=case when v_nullable_written then null else p_score end,')>0 then
      anchor := 'score=case when v_nullable_written then null else p_score end,';
      replacement := $score$-- Accounts Paper 2 never accepts a browser final score.
      score=case when v_nullable_written or (v_row.subject_id='principles-of-accounts' and v_row.paper='02') then null else p_score end,$score$;
    elsif strpos(def,'score=p_score,')>0 then
      anchor := 'score=p_score,';
      replacement := $score$-- Accounts Paper 2 never accepts a browser final score.
      score=case when v_row.subject_id='principles-of-accounts' and v_row.paper='02' then null else p_score end,$score$;
    else
      raise exception 'Unexpected submission implementation; refusing Accounts score patch';
    end if;
    if length(def)-length(replace(def,anchor,''))<>length(anchor) then
      raise exception 'Ambiguous submission score assignment';
    end if;
    execute replace(def,anchor,replacement);
  end if;

  select pg_get_functiondef('public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb)'::regprocedure) into def;
  if strpos(def,'Accounts source Paper 1 may save unscored answers')=0 then
    anchor:='if (p_score is null and v_row.paper<>''02'') or p_max_score is null';
    if strpos(def,anchor)>0 then
      replacement:=$nullable$if /* Accounts source Paper 1 may save unscored answers */
      (p_score is null and v_row.paper<>'02'
        and not (v_row.subject_id='principles-of-accounts' and v_row.paper='01'))
      or p_max_score is null$nullable$;
    else
      anchor:='or v_nullable_written';
      replacement:=$nullable$or /* Accounts source Paper 1 may save unscored answers */
         v_nullable_written or (v_row.subject_id='principles-of-accounts' and v_row.paper='01')$nullable$;
    end if;
    if length(def)-length(replace(def,anchor,''))<>length(anchor) then
      raise exception 'Unexpected null-score validation; refusing Accounts Paper 1 patch';
    end if;
    execute replace(def,anchor,replacement);
  end if;

  select pg_get_functiondef('public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)'::regprocedure) into def;
  if strpos(def,'Accounts examiner provenance is paper-specific')=0 then
    -- Fresh installs reach this migration before the Physics provenance patch;
    -- existing production already has that exact patch. Accept either known
    -- validator and leave its Physics method allowlist unchanged.
    if strpos(def,old_pattern)=0 and strpos(def,physics_pattern)=0 then
      raise exception 'Unexpected V2 method validator; refusing Accounts provenance patch';
    end if;
    anchor:='v_total:=v_total+v_mark;';
    if length(def)-length(replace(def,anchor,''))<>length(anchor) then
      raise exception 'Unexpected V2 mark accumulation; refusing Accounts provenance patch';
    end if;
    replacement:=$provenance$
  -- Accounts examiner provenance is paper-specific. Only the calibrated
  -- original numerical paper can publish through this policy. The specimen's
  -- method/presentation criteria remain draft and cannot borrow this release.
  if (v_rubric.subject_id='principles-of-accounts' and (
       v_rubric.paper_id<>'POA-ORIGINAL-02-01'
       or v_rubric.rubric_version<>'poa-original-criteria-v1'
       or v_rubric.source_sha256<>'dd855fecbe8ec3ee9c61f86c5b3f424d91a45112e07e5dc84fa3782df435a6f8'
       or v_method<>'existing-POA-original-numeric-v2'
       or v_part->>'sourceFormat' is distinct from 'poa-original-paper2'
       or v_part->>'kind' is distinct from 'numeric'
       or (v_part->>'maxMarks')::integer<>1
     )) or (v_rubric.subject_id<>'principles-of-accounts'
       and v_method='existing-POA-original-numeric-v2') then
    raise exception 'Accounts examiner provenance mismatch';
  end if;
  v_total:=v_total+v_mark;
$provenance$;
    execute replace(def,anchor,replacement);
  elsif strpos(def,'existing-POA-original-numeric-v2')=0 then
    raise exception 'Accounts provenance guard marker has unexpected implementation';
  end if;
end $poa_guards$;

-- These guards cover both progress RPCs and silent sync. Browser metadata is
-- never a grading credential, even when a client copies a real result's keys.
create or replace function spark_grading_private.poa_client_progress_guard_v2()
returns trigger language plpgsql security definer set search_path='' as $$
declare
  v_paper1 boolean;
begin
  if new.subject_id<>'principles-of-accounts'
     or coalesce(auth.jwt()->>'role','')='service_role' then return new; end if;
  if tg_op='UPDATE' and old.metadata->>'score_authority'='server-v2-deterministic' then
    -- A late offline sync/pending event cannot erase a privately verified grade.
    return old;
  end if;
  if tg_table_name='spark_subject_activity_events' and exists (
    select 1 from public.spark_subject_progress p
    where p.user_id=new.user_id and p.subject_id=new.subject_id
      and p.activity_key=new.activity_key
      and p.metadata->>'score_authority'='server-v2-deterministic'
  ) then
    -- The worker may finish before the browser's pending-progress request.
    -- Do not emit a second pending notification after the final result.
    return null;
  end if;
  new.metadata:=coalesce(new.metadata,'{}'::jsonb) - array[
    'score_authority','v2_source_sha256','v2_marker_sha256','v2_rubric_version',
    'v2_verified_at','v2_confirmed_marks','v2_unresolved_marks','finalScore',
    'confirmedMarks','canPublishFinalScore','scorePublicationAllowed','serverVerified',
    'verified','v2_result_phase'
  ];
  v_paper1:=lower(coalesce(new.metadata->>'paper','')) in ('01','1','paper1','paper 1')
    or lower(coalesce(new.metadata->>'paper_type',''))='paper1';
  if new.activity_type in ('exam','practice') and not v_paper1 then
    new.score:=null; new.percent:=null;
    if tg_table_name='spark_subject_progress' then new.best_percent:=null; end if;
    new.metadata:=new.metadata||jsonb_build_object('score_authority','pending-server-marking',
      'provisional',true,'scorePublicationAllowed',false);
  else
    new.metadata:=new.metadata||jsonb_build_object('score_authority','client-practice-estimate');
  end if;
  return new;
end $$;
revoke all on function spark_grading_private.poa_client_progress_guard_v2()
from public,anon,authenticated,service_role;

-- The generic V2 registry tests intentionally omit catalog/progress tables.
-- Install their hooks when those app prerequisites are present; the same
-- migration is safe to reapply after a minimal test schema has been loaded.
do $progress_hooks$
begin
  if to_regclass('public.spark_subject_progress') is not null then
    execute 'drop trigger if exists spark_poa_client_progress_guard_v2 on public.spark_subject_progress';
    execute 'create trigger spark_poa_client_progress_guard_v2 before insert or update on public.spark_subject_progress for each row execute function spark_grading_private.poa_client_progress_guard_v2()';
  end if;
  if to_regclass('public.spark_subject_activity_events') is not null then
    execute 'drop trigger if exists spark_poa_client_activity_guard_v2 on public.spark_subject_activity_events';
    execute 'create trigger spark_poa_client_activity_guard_v2 before insert or update on public.spark_subject_activity_events for each row execute function spark_grading_private.poa_client_progress_guard_v2()';
  end if;
end $progress_hooks$;

create table if not exists spark_grading_private.poa_published_results_v2 (
  attempt_id uuid primary key references public.spark_exam_attempts(id) on delete cascade,
  rubric_version text not null,
  published_at timestamptz not null default clock_timestamp()
);
alter table spark_grading_private.poa_published_results_v2 enable row level security;
revoke all on spark_grading_private.poa_published_results_v2 from public,anon,authenticated,service_role;
grant select on spark_grading_private.poa_published_results_v2 to service_role;

create or replace function spark_grading_private.publish_poa_verified_progress_v2()
returns trigger language plpgsql security definer set search_path='' as $$
declare
  v_job spark_grading_private.marking_jobs_v2%rowtype;
  v_rubric spark_grading_private.rubrics_v2%rowtype;
  v_key text;
  v_percent numeric(6,2);
  v_metadata jsonb;
  v_inserted uuid;
begin
  if new.subject_id<>'principles-of-accounts' or new.paper<>'02'
     or new.status<>'submitted'
     or new.metadata->>'score_authority' is distinct from 'server-v2-deterministic'
     or new.score is null then return new; end if;
  select * into v_job from spark_grading_private.marking_jobs_v2
    where attempt_id=new.id and rubric_version=new.v2_rubric_version and status='verified';
  if not found then raise exception 'Accounts final result requires its verified private examiner job'; end if;
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
     or v_job.result->>'canPublishFinalScore' is distinct from 'true' then
    raise exception 'Accounts final result failed source and score reconciliation';
  end if;
  if to_regclass('public.spark_subject_progress') is null
     or to_regclass('public.spark_subject_activity_events') is null then
    raise exception 'Accounts final progress publication requires the canonical progress schema';
  end if;
  insert into spark_grading_private.poa_published_results_v2(attempt_id,rubric_version)
    values(new.id,new.v2_rubric_version) on conflict(attempt_id) do nothing returning attempt_id into v_inserted;
  if v_inserted is null then return new; end if;
  v_key:='exam:poa-v2:'||new.id::text;
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
    values(new.user_id,new.subject_id,v_key,'exam','Principles of Accounts Paper 02',
      true,new.score,new.max_score,v_percent,v_percent,1,v_metadata,
      coalesce(new.submitted_at,clock_timestamp()),new.started_at,clock_timestamp())
    on conflict(user_id,subject_id,activity_key) do update set
      completed=true,score=excluded.score,max_score=excluded.max_score,
      percent=excluded.percent,best_percent=excluded.percent,
      attempt_count=greatest(public.spark_subject_progress.attempt_count,1),
      metadata=excluded.metadata,updated_at=excluded.updated_at;
  -- The existing Accounts notification trigger sends one student notification
  -- and one per approved linked parent. A private attempt receipt makes worker
  -- retries and repeated attempt updates idempotent without a teacher workflow.
  insert into public.spark_subject_activity_events(user_id,subject_id,activity_key,activity_type,
      title,completed,score,max_score,percent,metadata,occurred_at,created_at)
    values(new.user_id,new.subject_id,v_key,'exam','Principles of Accounts Paper 02',
      true,new.score,new.max_score,v_percent,v_metadata,clock_timestamp(),clock_timestamp());
  return new;
end $$;
revoke all on function spark_grading_private.publish_poa_verified_progress_v2()
from public,anon,authenticated,service_role;
drop trigger if exists spark_poa_verified_progress_v2 on public.spark_exam_attempts;
create trigger spark_poa_verified_progress_v2 after update on public.spark_exam_attempts
  for each row execute function spark_grading_private.publish_poa_verified_progress_v2();

commit;
