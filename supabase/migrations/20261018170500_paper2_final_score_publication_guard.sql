-- Paper 2 submissions must remain saved even when the client grader is
-- provisional. A provisional result is never stored in the final score column.
--
-- English A long-form writing and Integrated Science mixed-response papers
-- cannot be server-certified merely from a browser-calculated number. This
-- function deliberately sets their server attempt score to NULL. A separate
-- trusted, source-verified scorer can publish a final grade later.
--
-- Keeps the existing owner-only POB Paper 2 unscored exception and all prior
-- snapshot/payload limits. No AI-based grade is required.
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
set search_path = ''
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_row public.spark_exam_attempts%rowtype;
  v_nullable_written boolean;
  v_owner_pob boolean;
  v_recorded_score numeric;
begin
  select * into v_row from public.spark_exam_attempts
  where id=p_attempt_id and user_id=auth.uid()
  for update;

  if not found then raise exception 'Attempt not found'; end if;

  if v_row.status='submitted' then
    return query select v_row.id,v_row.submitted_at,v_row.timed_out,v_now;
    return;
  end if;

  v_nullable_written:=v_row.paper='02' and v_row.subject_id in
    ('english-a','integrated-science');
  v_owner_pob:=v_row.paper='02' and v_row.subject_id='principles-of-business'
    and v_row.bank_version='pob-original-paper2-01' and p_max_score=100;

  if (v_row.subject_id='principles-of-business' and v_row.paper='02' and p_score is not null)
     or (p_score is null and not (v_owner_pob or v_nullable_written))
     or p_max_score is null
     or coalesce(p_score::text,'') in ('NaN','Infinity','-Infinity')
     or p_max_score::text in ('NaN','Infinity','-Infinity')
     or p_score < 0 or p_max_score <= 0 or p_score > p_max_score
     or p_max_score > 10000 then
    raise exception 'Invalid practice score';
  end if;

  if jsonb_typeof(p_response_snapshot) is distinct from 'object'
     or octet_length(p_response_snapshot::text) > 2097152
     or jsonb_typeof(coalesce(p_metadata,'{}'::jsonb)) <> 'object'
     or octet_length(coalesce(p_metadata,'{}'::jsonb)::text) > 16384
     or length(coalesce(p_response_snapshot_hash,'')) > 128 then
    raise exception 'Invalid submission payload';
  end if;

  -- Never trust a client-declared verified status as server certification.
  v_recorded_score:=case when v_nullable_written then null else p_score end;

  update public.spark_exam_attempts
  set submitted_at=v_now,
      status='submitted',
      timed_out=(deadline_at is not null and v_now >= deadline_at),
      response_snapshot=coalesce(p_response_snapshot,'{}'::jsonb),
      response_snapshot_hash=p_response_snapshot_hash,
      score=v_recorded_score,
      max_score=p_max_score,
      metadata=coalesce(metadata,'{}'::jsonb)||coalesce(p_metadata,'{}'::jsonb)
        ||jsonb_build_object(
          'score_authority',case
            when v_nullable_written then 'server-unverified-written-practice'
            when v_owner_pob then 'pending-server-marking'
            else 'client-practice-estimate' end,
          'paper_release_status',case
            when v_nullable_written or v_owner_pob then 'requires-review'
            else coalesce(nullif(p_metadata->>'paper_release_status',''),'requires-review') end,
          'received_after_deadline',v_now>=v_row.deadline_at
        )
  where id=p_attempt_id;

  return query select p_attempt_id,v_now,
    (v_row.deadline_at is not null and v_now>=v_row.deadline_at),
    clock_timestamp();
end;
$$;

revoke execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) from public,anon;
grant execute on function public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb) to authenticated;
commit;
