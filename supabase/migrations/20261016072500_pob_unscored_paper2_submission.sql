-- Permit an unscored POB Paper 2 submission, rather than storing a
-- misleading client-side zero. Other subjects retain existing score checks.
begin;
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

  if (p_score is null and not (v_row.subject_id='principles-of-business' and v_row.paper='02' and v_row.bank_version='pob-original-paper2-01' and p_max_score=100)) or p_max_score is null
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
      metadata=coalesce(metadata,'{}'::jsonb) || coalesce(p_metadata,'{}'::jsonb)
        || jsonb_build_object('score_authority',case when v_row.subject_id='principles-of-business' and v_row.paper='02' then 'pending-server-marking' else 'client-practice-estimate' end,'received_after_deadline',v_now >= v_row.deadline_at)
  where id=p_attempt_id;

  return query
  select p_attempt_id,v_now,(v_row.deadline_at is not null and v_now >= v_row.deadline_at),clock_timestamp();
end;
$$;


revoke execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) from public,anon;
grant execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) to authenticated;
commit;
