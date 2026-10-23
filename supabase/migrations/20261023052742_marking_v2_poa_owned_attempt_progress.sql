begin;

-- A browser's Paper 1 / quiz label is not authority to publish an Accounts
-- Paper 2 score. Bind pending-result policy to the owned attempt first, then
-- normalize the public progress/event fields consumed by notifications.
create or replace function spark_grading_private.poa_client_progress_guard_v2()
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
  if new.subject_id<>'principles-of-accounts'
     or coalesce(auth.jwt()->>'role','')='service_role' then return new; end if;
  if tg_op='UPDATE' and old.metadata->>'score_authority'='server-v2-deterministic' then
    -- Preserve a private examiner's final result against later browser sync.
    return old;
  end if;

  new.metadata:=coalesce(new.metadata,'{}'::jsonb);
  if new.activity_key ~* '^exam:poa-v2:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    v_key_attempt:=substring(new.activity_key from 13)::uuid;
  end if;
  v_has_reference:=coalesce(new.metadata->>'server_attempt_id','')<>'';
  if new.metadata->>'server_attempt_id' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    v_meta_attempt:=(new.metadata->>'server_attempt_id')::uuid;
  end if;
  select * into v_attempt from public.spark_exam_attempts a
    where a.user_id=new.user_id and a.subject_id='principles-of-accounts'
      and a.paper='02' and (a.id=v_key_attempt or a.id=v_meta_attempt)
    order by case when a.id=v_key_attempt then 0 else 1 end limit 1;
  v_owned_paper2:=found;
  select exists(select 1 from public.spark_exam_attempts a
    where a.id=v_meta_attempt and a.user_id=new.user_id
      and a.subject_id='principles-of-accounts' and a.paper='01') into v_owned_paper1;

  -- The V2 key namespace is reserved for written exams, including malformed
  -- or foreign references. Invalid references cannot grant a Paper 1 exemption.
  -- Explicit Paper 2 evidence wins whenever the browser supplies mixed labels.
  v_paper2:=lower(new.activity_key) like 'exam:poa-v2:%'
    or v_owned_paper2
    or (v_has_reference and not v_owned_paper1)
    or lower(coalesce(new.metadata->>'paper','')) in ('02','2','paper2','paper 2')
    or lower(coalesce(new.metadata->>'paper_type',''))='paper2'
    or lower(coalesce(new.metadata->>'paper_id','')) ~ '^(poa-original-02-|poa-2-|poa-specimen-2-)';
  v_paper1:=not v_paper2 and (
    lower(coalesce(new.metadata->>'paper','')) in ('01','1','paper1','paper 1')
    or lower(coalesce(new.metadata->>'paper_type',''))='paper1');
  if v_paper2 then
    new.activity_type:='exam';
    new.title:='Principles of Accounts Paper 02';
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
        or (v_owned_paper2 and p.activity_key='exam:poa-v2:'||v_attempt.id::text))
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
revoke all on function spark_grading_private.poa_client_progress_guard_v2()
from public,anon,authenticated,service_role;

-- The Accounts notifier predates this source guard and also infers the paper
-- from titles/activity keys. Explicit normalized Paper 2 identity must win
-- over a stale Paper 1 hint in a legacy key; no other subject is changed.
do $poa_notification_identity$
declare
  def text;
  anchor text := E'v_paper := case\n      when lower(coalesce(new.metadata->>''paper'', '''')) in (''01'',''1'',''paper1'',''paper 1'')';
  replacement text := E'v_paper := case\n      -- Server-normalized Accounts Paper 2 identity wins legacy Paper 1 hints.\n      when lower(coalesce(new.metadata->>''paper'', '''')) in (''02'',''2'',''paper2'',''paper 2'')\n        or lower(coalesce(new.metadata->>''paper_type'', '''')) = ''paper2'' then ''Paper 02''\n      when lower(coalesce(new.metadata->>''paper'', '''')) in (''01'',''1'',''paper1'',''paper 1'')';
begin
  if to_regprocedure('public.spark_poa_subject_activity_notifications()') is null then return; end if;
  select replace(pg_get_functiondef('public.spark_poa_subject_activity_notifications()'::regprocedure),E'\r\n',E'\n') into def;
  if strpos(def,'Server-normalized Accounts Paper 2 identity wins legacy Paper 1 hints.')=0 then
    if length(def)-length(replace(def,anchor,''))<>length(anchor) then
      raise exception 'Unexpected Accounts notification classifier; refusing identity patch';
    end if;
    execute replace(def,anchor,replacement);
  end if;
end $poa_notification_identity$;

commit;
