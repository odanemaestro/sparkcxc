-- Expose experimental scoring for 25 historical POB Paper 2 authored banks.
-- Rubrics remain SPARK-internally-authored and uncalibrated.
-- Existing per-user, global daily and token limits are preserved unchanged.
begin;
alter table public.spark_marking_config add column if not exists
 pob_historical_archive_pilot_enabled boolean not null default false;
-- Academic source ledger: service-owned IDs and immutable PDF hashes.
-- No unverified CXC examiner certification implied by access to these entries.
create table if not exists public.spark_pob_historical_archive_banks(
 paper_id text primary key,
 bank_version text unique not null,
 source_sha256 text not null,
 rubric_version text not null default 'pob-historical-archive-rubric-v1',
 enabled boolean not null default true
);
alter table public.spark_pob_historical_archive_banks enable row level security;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2005-MJ','pob-archive-v1-pob-p2-2005-mj','61d9462cc76071a2456395ef5e5fe347c8e345d3265092af06d40b1108f7e3d2')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2006-MJ','pob-archive-v1-pob-p2-2006-mj','a3ea8ac2739000ee6d6637ccc5620ee941684f7400985e53ff933d61437f713e')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2007-MJ','pob-archive-v1-pob-p2-2007-mj','261496a8749d2729734c6897bc8ffce176db974254d95e900bfdaf4b12510e65')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2008-MJ','pob-archive-v1-pob-p2-2008-mj','c1ef9a099b0edb2cf82fac344ebe011cfce418e26bf2caa05ecf9ebdc5a6531f')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2009-MJ','pob-archive-v1-pob-p2-2009-mj','4bc6ceb120bb5e9d9080b079724afaa3e788bc555370efc81b37856ec8531038')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2010-MJ','pob-archive-v1-pob-p2-2010-mj','da79e8f4c4a794b28eb9dc4d5e4c52ffe0b9e9a9034b539a740c01abfb551544')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2011-MJ','pob-archive-v1-pob-p2-2011-mj','d057339896f60e8f5d98fd25d3cd9cc82cb082e127509b73a109ed87cbb6c7b7')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2012-MJ','pob-archive-v1-pob-p2-2012-mj','9db83447de400716d5072299cefeea620d4166e853312028f15098611f297eeb')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2013-MJ','pob-archive-v1-pob-p2-2013-mj','bce8c32334373b83a73b92018f50721b3491854ac8e7d207bdb724723a8dd9d7')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2014-MJ','pob-archive-v1-pob-p2-2014-mj','5aa3ba2677ded0446daa97abb11a3d9f55e9df34418ec85ebd13a31a1bc928f6')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2015-MJ','pob-archive-v1-pob-p2-2015-mj','d47560a3966c538be5dd507da23d8d13eb3b9e2cb08c1ff9339867f446c108bf')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2016-MJ','pob-archive-v1-pob-p2-2016-mj','c74094f508db33d2a25b3c9ac89cb148fec331dce2f84b6ca11ffcc4c52f180f')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2017-MJ','pob-archive-v1-pob-p2-2017-mj','b36bbd04dc4fb1a3982763eaf10d0a22fd44cfe6ed36594f69caca6eee47bb9a')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2018-MJ','pob-archive-v1-pob-p2-2018-mj','d93ccbf4102186426f7326f789db4e8d3ca1b9a3a73aed63e5a360d0546f956f')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2019-JAN','pob-archive-v1-pob-p2-2019-jan','cdcdfdbb46cb5faff3867c42eb26e382ed10c3db36c4a5cd6d29d6f2ec50d5e1')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2019-MJ','pob-archive-v1-pob-p2-2019-mj','ce3455f587b74d669f3b446e21c96b98f51e28f891160d570d16896a0f27ae16')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2019-MJ-ALT','pob-archive-v1-pob-p2-2019-mj-alt','5b95df8eaf522bad7684b01bad41b367f8652967715b3983f8c836c5ec93b4bc')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2021-MJ','pob-archive-v1-pob-p2-2021-mj','62420537307ee53ba37c879f2d9b920645d65aa4bcf8c28cbe22453387e09a6c')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2022-JAN','pob-archive-v1-pob-p2-2022-jan','3f83fa985f2dbddc332abb627c85f3eceaf73c4a25dcdb7c3d834a2ff8ceff62')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2022-MJ','pob-archive-v1-pob-p2-2022-mj','2c2e6223ffe0f1473f068485db00ad2a240df9e4407e4235bb4ecf9e58a71982')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2023-JAN','pob-archive-v1-pob-p2-2023-jan','c9803bd124e97f4208f5317de9494f04412727c6dfdb6c0bf4447a42deaa4ace')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2023-MJ','pob-archive-v1-pob-p2-2023-mj','79ed3fa6c2ad12d802a4bfe5ddcd558a5c109980f398bba18f2ff3b1b3277049')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2024-JAN','pob-archive-v1-pob-p2-2024-jan','1bab67360b3d83e7c22c39ccb24318dd2320b156d6347f75980cba0c8d4968f3')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2024-MJ','pob-archive-v1-pob-p2-2024-mj','c70368e4d1beff0eeece2495db1ff2a657a4e9d3efdca74e8b6bbf7a5119d0f2')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
insert into public.spark_pob_historical_archive_banks(paper_id,bank_version,source_sha256)
values('POB-P2-2025-JAN','pob-archive-v1-pob-p2-2025-jan','3bf50ed41965c7f84efa8b321d235c38a5425b45216ed528ca7d6a1bf6f571cf')
on conflict (paper_id) do update set
 bank_version=excluded.bank_version,source_sha256=excluded.source_sha256,enabled=true;
create or replace function public.spark_enqueue_marking(p_attempt_id uuid)
returns public.spark_marking_jobs
language plpgsql
security definer
set search_path=public
as $function$
declare
  v_attempt public.spark_exam_attempts%rowtype;
  v_config public.spark_marking_config%rowtype;
  v_job public.spark_marking_jobs%rowtype;

  v_day_start timestamptz := date_trunc('day', clock_timestamp());
  v_global_jobs integer;
  v_reserved bigint;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select *
  into v_attempt
  from public.spark_exam_attempts
  where id = p_attempt_id
    and user_id = auth.uid();

  if not found or v_attempt.status <> 'submitted' then
    raise exception 'Submitted attempt required';
  end if;

  if v_attempt.paper <> '02'
     or v_attempt.subject_id not in (
       'english-a','integrated-science','principles-of-business'
     ) then
    raise exception 'Unsupported assessment';
  end if;

  -- The original and historical banks have different, service-controlled
  -- authorization. Browser metadata never grants an examination release.
  if v_attempt.subject_id = 'principles-of-business' then
    if v_attempt.bank_version = 'pob-historical-2026-jan-p2-v1' then
      if v_attempt.metadata->>'paper_id' is distinct from 'POB-P2-2026-JAN'
        or v_attempt.metadata->>'source_sha256' is distinct from '0183bfa029cf71f60882ad8ad99295725006f00b429dc52ac57cb3e40e3d2581'
        or v_attempt.rubric_version is distinct from 'pob-historical-2026-jan-p2-rubric-v1'
        or v_attempt.grader_version is distinct from 'online-v1'
        or v_attempt.score is not null
        or v_attempt.max_score is distinct from 100
      then
        raise exception 'Unsupported historical POB examination version';
      end if;
    elsif v_attempt.bank_version like 'pob-archive-v1-%' then
      if not exists (
        select 1 from public.spark_pob_historical_archive_banks b
        where b.enabled and b.bank_version=v_attempt.bank_version
          and b.paper_id=v_attempt.metadata->>'paper_id'
          and b.source_sha256=v_attempt.metadata->>'source_sha256'
          and b.rubric_version=v_attempt.rubric_version
      ) or v_attempt.grader_version is distinct from 'online-v1'
        or v_attempt.score is not null or v_attempt.max_score is distinct from 100
        or jsonb_typeof(v_attempt.metadata->'selected_questions') is distinct from 'array'
      then
        raise exception 'Unsupported POB archive examination version';
      end if;
    elsif v_attempt.bank_version is distinct from 'pob-original-paper2-01'
       or v_attempt.metadata->>'paper_id' is distinct from 'pob-original-paper2-01'
       or v_attempt.score is not null
       or v_attempt.max_score is distinct from 100
    then
      raise exception 'Unsupported POB examination version';
    end if;
  end if;

  select *
  into v_config
  from public.spark_marking_config
  where singleton;

  if v_attempt.subject_id='principles-of-business'
    and v_attempt.bank_version like 'pob-archive-v1-%'
    and not coalesce(v_config.pob_historical_archive_pilot_enabled,false) then
    raise exception 'Historical archive POB practice marking not enabled';
  end if;

  -- Historical bank has its own, independent fail-closed approval.
  -- Canaries require the one configured tester. Public requires a separate
  -- operator-approved calibration flag. Neither is enabled by migration.
  if v_attempt.subject_id = 'principles-of-business'
     and v_attempt.bank_version = 'pob-historical-2026-jan-p2-v1'
     and not (
       (coalesce(v_config.pob_historical_jan26_public_enabled,false)
        and coalesce(v_config.pob_historical_jan26_calibrated,false))
       or coalesce(v_config.pob_historical_jan26_owner_pilot_enabled,false)
       or
       (coalesce(v_config.pob_historical_jan26_canary_enabled,false)
        and v_config.pob_historical_jan26_tester_id is not null
        and auth.uid() = v_config.pob_historical_jan26_tester_id)
     )
  then
    raise exception 'Historical POB marking not enabled';
  end if;

  -- Explicit operator-controlled canary. A disabled draft does not
  -- become public just because the global English A / IS queue is on.
  if v_attempt.subject_id = 'principles-of-business'
     and v_attempt.bank_version = 'pob-original-paper2-01'
     and (
       not coalesce(v_config.pob_original_enabled,false)
       or v_config.pob_internal_tester_user_id is null
       or auth.uid() is distinct from v_config.pob_internal_tester_user_id
     ) then
    raise exception 'POB internal marking not enabled';
  end if;

  -- Existing global queue switch (applies to EVERY subject).
  if not coalesce(v_config.enabled, false) then
    return null;
  end if;

  -- Serialize attempts for this student to protect rolling quota.
  perform pg_advisory_xact_lock(
    hashtextextended(auth.uid()::text, 0)
  );

  -- Idempotent marking for exactly this attempt and rubric revision.
  select *
  into v_job
  from public.spark_marking_jobs
  where attempt_id = p_attempt_id
    and revision = v_config.revision;
  if found then
    return v_job;
  end if;

  if (
    select count(*)
    from public.spark_marking_jobs
    where user_id = auth.uid()
      and created_at > clock_timestamp() - interval '24 hours'
  ) >= v_config.daily_user_limit then
    return null;
  end if;

  -- Global concurrency-safe reservations protect all other subjects.
  perform pg_advisory_xact_lock(
    hashtextextended('spark-marking-daily-budget', 0)
  );

  select
    count(*),
    coalesce(sum(reserved_tokens), 0)
  into
    v_global_jobs,
    v_reserved
  from public.spark_marking_jobs
  where created_at >= v_day_start;

  if v_global_jobs >= v_config.daily_global_limit then
    return null;
  end if;

  if
    v_reserved + v_config.per_job_token_reservation
      > v_config.daily_token_budget
  then
    return null;
  end if;

  insert into public.spark_marking_jobs (
    attempt_id,
    user_id,
    revision,
    reserved_tokens
  )
  values (
    p_attempt_id,
    auth.uid(),
    v_config.revision,
    v_config.per_job_token_reservation
  )
  returning *
  into v_job;

  return v_job;
end;
$function$;

revoke all on function public.spark_enqueue_marking(uuid) from public,anon;
grant execute on function public.spark_enqueue_marking(uuid) to authenticated;


create or replace function public.spark_submit_exam_attempt(
  p_attempt_id uuid,
  p_response_snapshot jsonb,
  p_response_snapshot_hash text,
  p_score numeric,
  p_max_score numeric,
  p_metadata jsonb default '{}'::jsonb
)
returns table (
  attempt_id uuid,
  submitted_at timestamptz,
  timed_out boolean,
  server_now timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_row public.spark_exam_attempts%rowtype;
  v_config public.spark_marking_config%rowtype;
  v_historical boolean := false;
  v_archive boolean := false;
begin
  select * into v_row
  from public.spark_exam_attempts
  where id=p_attempt_id and user_id=auth.uid()
  for update;

  if not found then
    raise exception 'Attempt not found';
  end if;

  if v_row.status='submitted' then
    return query select v_row.id,v_row.submitted_at,v_row.timed_out,v_now;
    return;
  end if;

  v_historical :=
      v_row.subject_id='principles-of-business'
      and v_row.paper='02'
      and v_row.bank_version='pob-historical-2026-jan-p2-v1'
      and v_row.rubric_version='pob-historical-2026-jan-p2-rubric-v1'
      and v_row.grader_version='online-v1'
      and v_row.metadata->>'paper_id'='POB-P2-2026-JAN'
      and v_row.metadata->>'source_sha256'='0183bfa029cf71f60882ad8ad99295725006f00b429dc52ac57cb3e40e3d2581';
  if v_row.subject_id='principles-of-business'
    and v_row.bank_version like 'pob-archive-v1-%' then
    select * into v_config from public.spark_marking_config where singleton;
    select exists (
      select 1 from public.spark_pob_historical_archive_banks b
      where b.enabled and b.bank_version=v_row.bank_version
        and b.paper_id=v_row.metadata->>'paper_id'
        and b.source_sha256=v_row.metadata->>'source_sha256'
        and b.rubric_version=v_row.rubric_version
    ) and v_row.paper='02' and v_row.grader_version='online-v1'
      and jsonb_typeof(v_row.metadata->'selected_questions')='array'
    into v_archive;
    if not coalesce(v_archive,false)
      or not coalesce(v_config.pob_historical_archive_pilot_enabled,false)
    then raise exception 'Historical archive POB submission not enabled';
    end if;
  end if;
  if v_row.subject_id='principles-of-business'
    and v_row.bank_version='pob-historical-2026-jan-p2-v1'
  then
    select * into v_config from public.spark_marking_config where singleton;
    if not v_historical
       or not ((v_config.pob_historical_jan26_public_enabled and v_config.pob_historical_jan26_calibrated)
        or v_config.pob_historical_jan26_owner_pilot_enabled
        or (v_config.pob_historical_jan26_canary_enabled
            and auth.uid()=v_config.pob_historical_jan26_tester_id))
    then
      raise exception 'Historical POB submission not enabled';
    end if;
  end if;
  if (v_row.subject_id='principles-of-business' and v_row.paper='02' and p_score is not null)
     or (p_score is null and not (
        (v_row.subject_id='principles-of-business' and v_row.paper='02'
         and v_row.bank_version='pob-original-paper2-01' and p_max_score=100)
         or ((v_historical or v_archive) and p_max_score=100)
        )) or p_max_score is null
     or coalesce(p_score::text,'') in ('NaN','Infinity','-Infinity')
     or p_max_score::text in ('NaN','Infinity','-Infinity')
     or p_score < 0 or p_max_score <= 0 or p_score > p_max_score or p_max_score > 10000 then
    raise exception 'Invalid practice score';
  end if;
  if jsonb_typeof(p_response_snapshot) is distinct from 'object'
     or octet_length(p_response_snapshot::text) > 2097152
     or jsonb_typeof(coalesce(p_metadata,'{}'::jsonb)) <> 'object'
     or octet_length(coalesce(p_metadata,'{}'::jsonb)::text) > 16384
     or length(coalesce(p_response_snapshot_hash,'')) > 128 then
    raise exception 'Invalid submission payload';
  end if;

  update public.spark_exam_attempts
  set submitted_at=v_now,
      status='submitted',
      timed_out=(deadline_at is not null and v_now >= deadline_at),
      response_snapshot=coalesce(p_response_snapshot,'{}'::jsonb),
      response_snapshot_hash=p_response_snapshot_hash,
      score=p_score,
      max_score=p_max_score,
      metadata=coalesce(metadata,'{}'::jsonb)
        || (case when v_historical or v_archive then
             coalesce(p_metadata,'{}'::jsonb) - 'paper_id' - 'source_sha256'
                - 'bank_version' - 'rubric_version' - 'grader_version'
                - 'selected_questions'
           else coalesce(p_metadata,'{}'::jsonb) end)
        || jsonb_build_object('score_authority',case when v_row.subject_id='principles-of-business' and v_row.paper='02' then 'pending-server-marking' else 'client-practice-estimate' end,'received_after_deadline',v_now >= v_row.deadline_at)
  where id=p_attempt_id;

  return query
  select p_attempt_id,v_now,(v_row.deadline_at is not null and v_now >= v_row.deadline_at),clock_timestamp();
end;
$$;


revoke execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) from public,anon;
grant execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) to authenticated;


commit;
