-- Dormant until explicitly enabled after worker deployment and calibration.
begin;
create table public.spark_marking_config (
  singleton boolean primary key default true check(singleton),
  enabled boolean not null default false,
  revision text not null default 'online-v1',
  max_concurrency integer not null default 4 check(max_concurrency between 1 and 32),
  daily_user_limit integer not null default 30 check(daily_user_limit between 1 and 1000)
);
insert into public.spark_marking_config(singleton) values(true);
alter table public.spark_marking_config enable row level security;
revoke all on public.spark_marking_config from public,anon,authenticated;
grant all on public.spark_marking_config to service_role;

create table public.spark_marking_jobs (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.spark_exam_attempts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  revision text not null,
  status text not null default 'queued' check(status in ('queued','processing','completed','failed')),
  created_at timestamptz not null default clock_timestamp(),
  available_at timestamptz not null default clock_timestamp(),
  lease_expires_at timestamptz,
  claim_token uuid,
  tries integer not null default 0,
  completed_at timestamptz,
  result jsonb,
  error_code text,
  unique(attempt_id,revision)
);
create index spark_marking_jobs_owner_created on public.spark_marking_jobs(user_id,created_at desc);
create index spark_marking_jobs_pending on public.spark_marking_jobs(available_at,created_at) where status in ('queued','processing');
alter table public.spark_marking_jobs enable row level security;
create policy spark_marking_read_own on public.spark_marking_jobs for select to authenticated using(user_id=auth.uid());
revoke all on public.spark_marking_jobs from public,anon,authenticated;
grant select on public.spark_marking_jobs to authenticated;
grant all on public.spark_marking_jobs to service_role;

create function public.spark_enqueue_marking(p_attempt_id uuid)
returns public.spark_marking_jobs language plpgsql security definer set search_path=public as $$
declare
  v_attempt public.spark_exam_attempts%rowtype;
  v_config public.spark_marking_config%rowtype;
  v_job public.spark_marking_jobs%rowtype;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into v_attempt from public.spark_exam_attempts where id=p_attempt_id and user_id=auth.uid();
  if not found or v_attempt.status<>'submitted' then raise exception 'Submitted attempt required'; end if;
  if v_attempt.subject_id not in ('english-a','integrated-science') or v_attempt.paper<>'02' then raise exception 'Unsupported assessment'; end if;
  select * into v_config from public.spark_marking_config where singleton;
  if not v_config.enabled then raise exception 'Automated marking is not enabled'; end if;
  -- Serialize only this user's enqueue operations, not all users.
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,0));
  select * into v_job from public.spark_marking_jobs where attempt_id=p_attempt_id and revision=v_config.revision;
  if found then return v_job; end if;
  if (select count(*) from public.spark_marking_jobs where user_id=auth.uid() and created_at>clock_timestamp()-interval '24 hours')>=v_config.daily_user_limit then
    raise exception 'Daily automated-marking limit reached';
  end if;
  insert into public.spark_marking_jobs(attempt_id,user_id,revision) values(p_attempt_id,auth.uid(),v_config.revision) returning * into v_job;
  return v_job;
end; $$;

create function public.spark_claim_marking(p_limit integer default 1)
returns setof public.spark_marking_jobs language plpgsql security definer set search_path=public as $$
declare v_capacity integer; v_now timestamptz:=clock_timestamp();
begin
  -- Concurrent worker invocations share one capacity reservation.
  perform pg_advisory_xact_lock(hashtextextended('spark-marking-capacity',0));
  if not (select enabled from public.spark_marking_config where singleton) then return; end if;
  update public.spark_marking_jobs set status='failed',error_code='retry_exhausted',claim_token=null
    where status='processing' and lease_expires_at<v_now and tries>=3;
  select greatest(0,max_concurrency-(select count(*) from public.spark_marking_jobs where status='processing' and lease_expires_at>=v_now))
    into v_capacity from public.spark_marking_config where singleton;
  return query
  with candidates as (
    select id from public.spark_marking_jobs
    where ((status='queued' and available_at<=v_now) or (status='processing' and lease_expires_at<v_now)) and tries<3
    order by created_at for update skip locked limit least(greatest(coalesce(p_limit,1),1),v_capacity)
  )
  update public.spark_marking_jobs j set status='processing',tries=tries+1,claim_token=gen_random_uuid(),lease_expires_at=v_now+interval '180 seconds'
    from candidates c where j.id=c.id returning j.*;
end; $$;

create function public.spark_finish_marking(p_job_id uuid,p_claim_token uuid,p_result jsonb default null,p_error_code text default null)
returns boolean language plpgsql security definer set search_path=public as $$
declare v_job public.spark_marking_jobs%rowtype; v_now timestamptz:=clock_timestamp();
begin
  select * into v_job from public.spark_marking_jobs where id=p_job_id for update;
  if not found or v_job.status<>'processing' or v_job.claim_token is distinct from p_claim_token or v_job.lease_expires_at<v_now then return false; end if;
  if p_error_code is null then
    if jsonb_typeof(p_result) is distinct from 'object' or octet_length(p_result::text)>1048576 then raise exception 'Invalid marking result'; end if;
    update public.spark_marking_jobs set status='completed',result=p_result,completed_at=v_now,claim_token=null,error_code=null where id=p_job_id;
  else
    update public.spark_marking_jobs set status=case when tries>=3 then 'failed' else 'queued' end,
      error_code=left(p_error_code,80),available_at=v_now+make_interval(secs=>least(300,(5*power(2,tries))::integer)),claim_token=null
      where id=p_job_id;
  end if;
  return true;
end; $$;

revoke all on function public.spark_enqueue_marking(uuid) from public,anon;
grant execute on function public.spark_enqueue_marking(uuid) to authenticated;
revoke all on function public.spark_claim_marking(integer) from public,anon,authenticated;
revoke all on function public.spark_finish_marking(uuid,uuid,jsonb,text) from public,anon,authenticated;
grant execute on function public.spark_claim_marking(integer) to service_role;
grant execute on function public.spark_finish_marking(uuid,uuid,jsonb,text) to service_role;
commit;
