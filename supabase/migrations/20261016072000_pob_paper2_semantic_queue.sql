-- Opt in Principles of Business to the existing secure, disabled-by-default
-- dual-pass marking queue. Candidate-controlled question/rubric payloads are
-- not accepted. Worker uses the trusted versioned bank only.
begin;
create or replace function public.spark_enqueue_marking(p_attempt_id uuid)
returns public.spark_marking_jobs language plpgsql security definer set search_path=public as $$
declare
  v_attempt public.spark_exam_attempts%rowtype;
  v_config public.spark_marking_config%rowtype;
  v_job public.spark_marking_jobs%rowtype;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into v_attempt from public.spark_exam_attempts where id=p_attempt_id and user_id=auth.uid();
  if not found or v_attempt.status<>'submitted' then raise exception 'Submitted attempt required'; end if;
  if v_attempt.subject_id not in ('english-a','integrated-science','principles-of-business') or v_attempt.paper<>'02' then raise exception 'Unsupported assessment'; end if;
  if v_attempt.subject_id='principles-of-business' and (v_attempt.bank_version is distinct from 'pob-original-paper2-01' or v_attempt.metadata->>'paper_id' is distinct from 'pob-original-paper2-01') then raise exception 'Unsupported POB examination version'; end if;
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


revoke all on function public.spark_enqueue_marking(uuid) from public,anon;
grant execute on function public.spark_enqueue_marking(uuid) to authenticated;
commit;
