begin;

-- ============================================================================
-- SPARK Study Circles V10
-- Course-scoped Study Circles for every enrolled SPARK subject.
--
-- Keeps all existing safety boundaries:
--   * Student opt-in only
--   * 3-4 students per circle
--   * No exact scores exposed to peers
--   * No private messages
--   * Contact details and external links blocked
--   * Report/moderation flow preserved
--   * Linked parents see only high-level participation
--
-- V10 changes:
--   * Preferences are per student + subject
--   * Students may belong to one active circle PER subject
--   * Matching evidence is subject-specific
--   * Posts/replies/leave/reporting are subject-scoped
-- ============================================================================

-- Normalize the original Mathematics course key before adding subject-scoped
-- membership and preference constraints.
update public.study_circles
set course_key = 'mathematics'
where course_key in ('csec-mathematics','math','csec_math');

alter table public.study_circle_preferences
  add column if not exists subject_id text not null default 'mathematics';

alter table public.study_circle_members
  add column if not exists subject_id text not null default 'mathematics';

update public.study_circle_members m
set subject_id = c.course_key
from public.study_circles c
where c.id = m.circle_id
  and m.subject_id is distinct from c.course_key;

-- Replace the old one-row-per-student preference key with a subject-scoped key.
do $$
declare
  v_pk text;
begin
  select conname into v_pk
  from pg_constraint
  where conrelid = 'public.study_circle_preferences'::regclass
    and contype = 'p'
  limit 1;

  if v_pk is not null then
    execute format('alter table public.study_circle_preferences drop constraint %I', v_pk);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.study_circle_preferences'::regclass
      and contype = 'p'
  ) then
    alter table public.study_circle_preferences
      add primary key (user_id, subject_id);
  end if;
end $$;

drop index if exists public.study_circle_one_active_membership_uidx;

create unique index if not exists study_circle_one_active_membership_subject_uidx
  on public.study_circle_members(user_id, subject_id)
  where left_at is null;

create index if not exists study_circle_preferences_subject_pool_idx
  on public.study_circle_preferences(subject_id, opted_in, updated_at);

create index if not exists study_circles_course_status_idx
  on public.study_circles(course_key, status, created_at desc);

create or replace function public.spark_study_circle_subject_name(p_subject_id text)
returns text
language sql
immutable
as $$
  select case lower(trim(coalesce(p_subject_id,'')))
    when 'mathematics' then 'Mathematics'
    when 'physics' then 'Physics'
    when 'information-technology' then 'Information Technology'
    when 'integrated-science' then 'Integrated Science'
    when 'social-studies' then 'Social Studies'
    when 'english-a' then 'English A'
    else initcap(replace(replace(lower(trim(coalesce(p_subject_id,'Subject'))),'-',' '),'_',' '))
  end;
$$;

create or replace function public.spark_study_circle_validate_subject(
  p_user_id uuid,
  p_subject_id text
)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_subject text := lower(trim(coalesce(p_subject_id,'')));
begin
  if v_subject !~ '^[a-z0-9][a-z0-9_-]{0,39}$' then
    raise exception 'Choose a valid SPARK subject.';
  end if;

  if not exists (
    select 1
    from public.spark_student_subject_enrollments e
    where e.student_id = p_user_id
      and lower(e.subject_id) = v_subject
      and e.status = 'active'
  ) then
    raise exception 'You must be enrolled in this subject before joining its Study Circle.';
  end if;

  return v_subject;
end;
$$;

create or replace function public.spark_study_circle_strengths_v10(
  p_user_id uuid,
  p_subject_id text
)
returns text[]
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_subject text := lower(trim(coalesce(p_subject_id,'')));
  v_result text[] := '{}'::text[];
begin
  if v_subject = 'mathematics' then
    select coalesce(array_agg(skill order by mastery_score desc, attempts desc, skill), '{}'::text[])
    into v_result
    from (
      select skill, mastery_score, attempts
      from public.csec_skill_progress
      where user_id = p_user_id
        and attempts >= 3
        and mastery_score >= 75
      order by mastery_score desc, attempts desc, updated_at desc
      limit 3
    ) ranked;
    return v_result;
  end if;

  select coalesce(array_agg(label order by avg_percent desc, evidence_count desc, label), '{}'::text[])
  into v_result
  from (
    select
      coalesce(
        nullif(trim(sp.topic_id),''),
        nullif(trim(sp.section_id),''),
        nullif(trim(sp.title),''),
        nullif(trim(sp.activity_key),'')
      ) as label,
      avg(sp.percent) filter (where sp.percent is not null) as avg_percent,
      count(*) filter (where sp.percent is not null) as evidence_count
    from public.spark_subject_progress sp
    where sp.user_id = p_user_id
      and lower(sp.subject_id) = v_subject
      and sp.completed = true
      and sp.percent is not null
    group by 1
    having count(*) filter (where sp.percent is not null) >= 2
       and avg(sp.percent) filter (where sp.percent is not null) >= 75
    order by avg_percent desc, evidence_count desc, label
    limit 3
  ) ranked
  where label is not null;

  return v_result;
end;
$$;

create or replace function public.spark_study_circle_focuses_v10(
  p_user_id uuid,
  p_subject_id text
)
returns text[]
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_subject text := lower(trim(coalesce(p_subject_id,'')));
  v_result text[] := '{}'::text[];
begin
  if v_subject = 'mathematics' then
    select coalesce(array_agg(skill order by mastery_score asc, attempts desc, skill), '{}'::text[])
    into v_result
    from (
      select skill, mastery_score, attempts
      from public.csec_skill_progress
      where user_id = p_user_id
        and attempts >= 2
        and mastery_score < 75
      order by mastery_score asc, attempts desc, updated_at desc
      limit 3
    ) ranked;
    return v_result;
  end if;

  select coalesce(array_agg(label order by avg_percent asc, evidence_count desc, label), '{}'::text[])
  into v_result
  from (
    select
      coalesce(
        nullif(trim(sp.topic_id),''),
        nullif(trim(sp.section_id),''),
        nullif(trim(sp.title),''),
        nullif(trim(sp.activity_key),'')
      ) as label,
      avg(sp.percent) filter (where sp.percent is not null) as avg_percent,
      count(*) filter (where sp.percent is not null) as evidence_count
    from public.spark_subject_progress sp
    where sp.user_id = p_user_id
      and lower(sp.subject_id) = v_subject
      and sp.completed = true
      and sp.percent is not null
    group by 1
    having count(*) filter (where sp.percent is not null) >= 1
       and avg(sp.percent) filter (where sp.percent is not null) < 75
    order by avg_percent asc, evidence_count desc, label
    limit 3
  ) ranked
  where label is not null;

  return v_result;
end;
$$;

create or replace function public.spark_set_study_circle_preference_v10(
  p_subject_id text,
  p_opted_in boolean,
  p_preferred_times text[] default '{}'::text[],
  p_accept_guidelines boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_subject text;
  v_times text[] := coalesce(p_preferred_times, '{}'::text[]);
begin
  if v_user is null then
    raise exception 'You must be signed in.';
  end if;
  if not exists (select 1 from public.profiles where id=v_user and role='student') then
    raise exception 'Study Circles are available to student accounts.';
  end if;

  v_subject := public.spark_study_circle_validate_subject(v_user,p_subject_id);

  if exists (
    select 1 from unnest(v_times) value
    where value <> all(array[
      'weekday_morning','weekday_afternoon','weekday_evening','saturday','sunday'
    ]::text[])
  ) then
    raise exception 'One or more availability values are invalid.';
  end if;

  if p_opted_in and not p_accept_guidelines then
    raise exception 'Please agree to the Study Circle guidelines before joining.';
  end if;

  if not p_opted_in and exists (
    select 1
    from public.study_circle_members m
    join public.study_circles c on c.id=m.circle_id and c.status='active'
    where m.user_id=v_user and m.subject_id=v_subject and m.left_at is null
  ) then
    raise exception 'Leave your current Study Circle for this subject before pausing matching.';
  end if;

  insert into public.study_circle_preferences(
    user_id,subject_id,opted_in,preferred_times,guidelines_accepted_at,updated_at
  ) values (
    v_user,v_subject,p_opted_in,v_times,
    case when p_opted_in then now() else null end,
    now()
  )
  on conflict (user_id,subject_id) do update set
    opted_in=excluded.opted_in,
    preferred_times=excluded.preferred_times,
    guidelines_accepted_at=case
      when excluded.opted_in then coalesce(public.study_circle_preferences.guidelines_accepted_at,now())
      else public.study_circle_preferences.guidelines_accepted_at
    end,
    updated_at=now();

  return jsonb_build_object(
    'ok',true,
    'subject_id',v_subject,
    'opted_in',p_opted_in,
    'preferred_times',to_jsonb(v_times)
  );
end;
$$;

create or replace function public.spark_get_study_circle_home_v10(p_subject_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_subject text;
  v_subject_name text;
  v_pref public.study_circle_preferences%rowtype;
  v_circle_id uuid;
  v_joined_at timestamptz;
  v_circle_title text;
  v_strengths text[] := '{}'::text[];
  v_focus text[] := '{}'::text[];
  v_members jsonb := '[]'::jsonb;
  v_agenda jsonb := '[]'::jsonb;
begin
  if v_user is null then raise exception 'You must be signed in.'; end if;
  if not exists (select 1 from public.profiles where id=v_user and role='student') then
    raise exception 'Study Circles are available to student accounts.';
  end if;

  v_subject := public.spark_study_circle_validate_subject(v_user,p_subject_id);
  v_subject_name := public.spark_study_circle_subject_name(v_subject);

  select * into v_pref
  from public.study_circle_preferences
  where user_id=v_user and subject_id=v_subject;

  v_strengths := public.spark_study_circle_strengths_v10(v_user,v_subject);
  v_focus := public.spark_study_circle_focuses_v10(v_user,v_subject);

  select m.circle_id,m.joined_at,c.title
  into v_circle_id,v_joined_at,v_circle_title
  from public.study_circle_members m
  join public.study_circles c on c.id=m.circle_id and c.status='active'
  where m.user_id=v_user
    and m.subject_id=v_subject
    and m.left_at is null
    and c.course_key=v_subject
  order by m.joined_at desc
  limit 1;

  if v_circle_id is null then
    return jsonb_build_object(
      'subject_id',v_subject,
      'subject_name',v_subject_name,
      'status',case when coalesce(v_pref.opted_in,false) then 'waiting' else 'inactive' end,
      'preference',jsonb_build_object(
        'opted_in',coalesce(v_pref.opted_in,false),
        'preferred_times',to_jsonb(coalesce(v_pref.preferred_times,'{}'::text[])),
        'guidelines_accepted',v_pref.guidelines_accepted_at is not null
      ),
      'profile',jsonb_build_object(
        'strengths',to_jsonb(v_strengths),
        'focus',to_jsonb(v_focus),
        'profile_ready',(cardinality(v_strengths)+cardinality(v_focus))>0
      ),
      'circle',null,
      'members','[]'::jsonb,
      'agenda','[]'::jsonb,
      'posts','[]'::jsonb
    );
  end if;

  select coalesce(jsonb_agg(
    jsonb_build_object(
      'name',public.spark_study_circle_display_name(m.user_id),
      'is_self',m.user_id=v_user,
      'strengths',to_jsonb(public.spark_study_circle_strengths_v10(m.user_id,v_subject)),
      'focus',to_jsonb(public.spark_study_circle_focuses_v10(m.user_id,v_subject)),
      'contribution_count',m.contribution_count
    )
    order by (m.user_id=v_user) desc,public.spark_study_circle_display_name(m.user_id)
  ),'[]'::jsonb)
  into v_members
  from public.study_circle_members m
  where m.circle_id=v_circle_id and m.left_at is null;

  select coalesce(jsonb_agg(
    jsonb_build_object(
      'skill',target.matched_focus,
      'focus_for',public.spark_study_circle_display_name(target.user_id),
      'guide',coalesce((
        select public.spark_study_circle_display_name(g.user_id)
        from public.study_circle_members g
        where g.circle_id=v_circle_id
          and g.left_at is null
          and g.user_id<>target.user_id
          and target.matched_focus = any(public.spark_study_circle_strengths_v10(g.user_id,v_subject))
        order by g.joined_at
        limit 1
      ),'Work together')
    )
    order by target.joined_at
  ),'[]'::jsonb)
  into v_agenda
  from public.study_circle_members target
  where target.circle_id=v_circle_id
    and target.left_at is null
    and target.matched_focus is not null;

  return jsonb_build_object(
    'subject_id',v_subject,
    'subject_name',v_subject_name,
    'status','matched',
    'preference',jsonb_build_object(
      'opted_in',true,
      'preferred_times',to_jsonb(coalesce(v_pref.preferred_times,'{}'::text[])),
      'guidelines_accepted',v_pref.guidelines_accepted_at is not null
    ),
    'profile',jsonb_build_object(
      'strengths',to_jsonb(v_strengths),
      'focus',to_jsonb(v_focus),
      'profile_ready',(cardinality(v_strengths)+cardinality(v_focus))>0
    ),
    'circle',jsonb_build_object(
      'id',v_circle_id,
      'title',v_circle_title,
      'subject_id',v_subject,
      'subject_name',v_subject_name,
      'member_count',jsonb_array_length(v_members),
      'joined_at',v_joined_at
    ),
    'members',v_members,
    'agenda',v_agenda,
    'posts','[]'::jsonb
  );
end;
$$;

create or replace function public.spark_get_study_circle_members_v10(p_subject_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid:=auth.uid();
  v_subject text:=lower(trim(coalesce(p_subject_id,'')));
  v_circle_id uuid;
  v_members jsonb:='[]'::jsonb;
begin
  if v_user is null then raise exception 'You must be signed in.'; end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c on c.id=m.circle_id and c.status='active' and c.course_key=v_subject
  where m.user_id=v_user and m.subject_id=v_subject and m.left_at is null
  limit 1;

  if v_circle_id is null then return '[]'::jsonb; end if;

  select coalesce(jsonb_agg(
    jsonb_build_object(
      'name',public.spark_study_circle_display_name(m.user_id),
      'is_self',m.user_id=v_user,
      'strengths',to_jsonb(public.spark_study_circle_strengths_v10(m.user_id,v_subject)),
      'focus',to_jsonb(public.spark_study_circle_focuses_v10(m.user_id,v_subject)),
      'contribution_count',m.contribution_count,
      'avatar_path',p.avatar_path
    )
    order by (m.user_id=v_user) desc,public.spark_study_circle_display_name(m.user_id)
  ),'[]'::jsonb)
  into v_members
  from public.study_circle_members m
  join public.profiles p on p.id=m.user_id
  where m.circle_id=v_circle_id and m.left_at is null;

  return v_members;
end;
$$;

create or replace function public.spark_get_study_circle_posts_v10(p_subject_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid:=auth.uid();
  v_subject text:=lower(trim(coalesce(p_subject_id,'')));
  v_circle_id uuid;
  v_posts jsonb:='[]'::jsonb;
begin
  if v_user is null then raise exception 'You must be signed in.'; end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c on c.id=m.circle_id and c.status='active' and c.course_key=v_subject
  where m.user_id=v_user and m.subject_id=v_subject and m.left_at is null
  limit 1;

  if v_circle_id is null then return '[]'::jsonb; end if;

  select coalesce(jsonb_agg(
    jsonb_build_object(
      'id',p.id,
      'author',public.spark_study_circle_display_name(p.author_user_id),
      'avatar_path',author_profile.avatar_path,
      'body',p.body,
      'created_at',p.created_at,
      'is_mine',p.author_user_id=v_user,
      'reply_to',case when rp.id is null then null else jsonb_build_object(
        'id',rp.id,
        'author',public.spark_study_circle_display_name(rp.author_user_id),
        'body',rp.body
      ) end
    )
    order by p.created_at asc
  ),'[]'::jsonb)
  into v_posts
  from (
    select *
    from public.study_circle_posts
    where circle_id=v_circle_id
    order by created_at desc
    limit 60
  ) p
  join public.profiles author_profile on author_profile.id=p.author_user_id
  left join public.study_circle_posts rp on rp.id=p.reply_to_post_id and rp.circle_id=v_circle_id;

  return v_posts;
end;
$$;

create or replace function public.spark_match_study_circle_v10(p_subject_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid:=auth.uid();
  v_subject text;
  v_subject_name text;
  v_pref public.study_circle_preferences%rowtype;
  v_strengths text[]:='{}'::text[];
  v_focus text[]:='{}'::text[];
  v_candidates uuid[]:='{}'::uuid[];
  v_member_ids uuid[]:='{}'::uuid[];
  v_circle_id uuid;
  v_title text;
  v_member uuid;
  v_member_name text;
begin
  if v_user is null then raise exception 'You must be signed in.'; end if;
  if not exists (select 1 from public.profiles where id=v_user and role='student') then
    raise exception 'Study Circles are available to student accounts.';
  end if;

  v_subject:=public.spark_study_circle_validate_subject(v_user,p_subject_id);
  v_subject_name:=public.spark_study_circle_subject_name(v_subject);

  select * into v_pref
  from public.study_circle_preferences
  where user_id=v_user and subject_id=v_subject;

  if not coalesce(v_pref.opted_in,false) or v_pref.guidelines_accepted_at is null then
    raise exception 'Join this subject''s Study Circle matching pool first.';
  end if;

  if exists (
    select 1 from public.study_circle_members m
    join public.study_circles c on c.id=m.circle_id and c.status='active' and c.course_key=v_subject
    where m.user_id=v_user and m.subject_id=v_subject and m.left_at is null
  ) then
    return public.spark_get_study_circle_home_v10(v_subject);
  end if;

  perform pg_advisory_xact_lock(hashtext('spark-study-circle-match-v10:'||v_subject));

  v_strengths:=public.spark_study_circle_strengths_v10(v_user,v_subject);
  v_focus:=public.spark_study_circle_focuses_v10(v_user,v_subject);

  if cardinality(v_strengths)+cardinality(v_focus)=0 then
    raise exception 'Complete some learning activities in % first so SPARK can identify at least one strength or focus area.',v_subject_name;
  end if;

  select coalesce(array_agg(candidate.user_id order by candidate.match_score desc,candidate.updated_at),'{}'::uuid[])
  into v_candidates
  from (
    select scored.user_id,scored.updated_at,
      scored.availability_overlap*4 + scored.complement_count*8 + least(scored.profile_signal_count,4) as match_score
    from (
      select
        p.user_id,
        p.updated_at,
        case
          when cardinality(coalesce(v_pref.preferred_times,'{}'::text[]))=0
            or cardinality(coalesce(p.preferred_times,'{}'::text[]))=0 then 1
          else (
            select count(*)::integer
            from unnest(v_pref.preferred_times) t
            where t=any(p.preferred_times)
          )
        end as availability_overlap,
        (
          (select count(*)::integer from unnest(v_strengths) s where s=any(public.spark_study_circle_focuses_v10(p.user_id,v_subject)))
          +
          (select count(*)::integer from unnest(v_focus) f where f=any(public.spark_study_circle_strengths_v10(p.user_id,v_subject)))
        ) as complement_count,
        cardinality(public.spark_study_circle_strengths_v10(p.user_id,v_subject))
          + cardinality(public.spark_study_circle_focuses_v10(p.user_id,v_subject)) as profile_signal_count
      from public.study_circle_preferences p
      join public.profiles pr on pr.id=p.user_id and pr.role='student'
      join public.spark_student_subject_enrollments e
        on e.student_id=p.user_id and lower(e.subject_id)=v_subject and e.status='active'
      where p.subject_id=v_subject
        and p.user_id<>v_user
        and p.opted_in=true
        and p.guidelines_accepted_at is not null
        and not exists (
          select 1
          from public.study_circle_members existing
          join public.study_circles circle on circle.id=existing.circle_id and circle.status='active' and circle.course_key=v_subject
          where existing.user_id=p.user_id
            and existing.subject_id=v_subject
            and existing.left_at is null
        )
    ) scored
    where scored.profile_signal_count>0 and scored.complement_count>0
    order by match_score desc,scored.updated_at
    limit 3
  ) candidate;

  if cardinality(v_candidates)<2 then
    return public.spark_get_study_circle_home_v10(v_subject);
  end if;

  v_member_ids:=array_prepend(v_user,v_candidates);

  if cardinality(v_focus)>=2 then
    v_title:=initcap(v_focus[1])||' & '||initcap(v_focus[2])||' · '||v_subject_name;
  elsif cardinality(v_focus)=1 then
    v_title:=initcap(v_focus[1])||' · '||v_subject_name||' Study Circle';
  else
    v_title:=v_subject_name||' Study Circle';
  end if;

  insert into public.study_circles(course_key,title)
  values(v_subject,v_title)
  returning id into v_circle_id;

  insert into public.study_circle_members(circle_id,user_id,subject_id,matched_strength,matched_focus)
  select
    v_circle_id,
    picked.user_id,
    v_subject,
    (public.spark_study_circle_strengths_v10(picked.user_id,v_subject))[1],
    (public.spark_study_circle_focuses_v10(picked.user_id,v_subject))[1]
  from unnest(v_member_ids) picked(user_id);

  for v_member in
    select user_id from public.study_circle_members
    where circle_id=v_circle_id and left_at is null
  loop
    perform public.spark_create_notification(
      v_member,
      'study_circle_ready',
      v_subject_name||' Study Circle is ready',
      'SPARK found a small '||v_subject_name||' group built around complementary strengths and focus areas.',
      'dashboard',
      'Open Study Circle',
      null,null,v_member,
      jsonb_build_object('section','circles','subject_id',v_subject),
      'study-circle:'||v_circle_id::text||':ready:'||v_member::text
    );

    select coalesce(name,'Your child') into v_member_name
    from public.profiles where id=v_member;

    perform public.spark_notify_linked_parents(
      v_member,
      'child_study_circle_joined',
      v_subject_name||' Study Circle joined',
      format('%s joined a small SPARK peer-learning group for %s. Exact scores, member identities and group messages remain private.',v_member_name,v_subject_name),
      'dashboard','View progress',null,
      jsonb_build_object('student_id',v_member,'section','study-circle','subject_id',v_subject),
      'study-circle:'||v_circle_id::text||':parent-joined'
    );
  end loop;

  return public.spark_get_study_circle_home_v10(v_subject);
exception
  when unique_violation then
    return public.spark_get_study_circle_home_v10(v_subject);
end;
$$;

create or replace function public.spark_create_study_circle_post_v10(
  p_subject_id text,
  p_body text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid:=auth.uid();
  v_subject text:=lower(trim(coalesce(p_subject_id,'')));
  v_circle_id uuid;
  v_body text:=trim(coalesce(p_body,''));
  v_post_id uuid;
begin
  if v_user is null then raise exception 'You must be signed in.'; end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c on c.id=m.circle_id and c.status='active' and c.course_key=v_subject
  where m.user_id=v_user and m.subject_id=v_subject and m.left_at is null
  limit 1;

  if v_circle_id is null then raise exception 'You do not have an active Study Circle for this subject.'; end if;
  if char_length(v_body)<1 or char_length(v_body)>700 then raise exception 'Study Circle posts must be between 1 and 700 characters.'; end if;

  if v_body ~* '(https?://|www\.)'
     or v_body ~* '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}'
     or v_body ~* '\+?[0-9][0-9 ()\.-]{6,}[0-9]'
     or v_body ~* '(^|[[:space:]])@[A-Z0-9_.]{3,}'
     or v_body ~* '\m(whatsapp|instagram|snapchat|telegram|discord)\M'
  then
    raise exception 'Keep personal contact details inside SPARK. Phone numbers, email addresses, social handles and external links cannot be posted.';
  end if;

  if exists (
    select 1 from public.study_circle_posts
    where author_user_id=v_user and created_at>now()-interval '4 seconds'
  ) then raise exception 'Please wait a moment before posting again.'; end if;

  insert into public.study_circle_posts(circle_id,author_user_id,body)
  values(v_circle_id,v_user,v_body)
  returning id into v_post_id;

  update public.study_circle_members
  set contribution_count=contribution_count+1
  where circle_id=v_circle_id and user_id=v_user and left_at is null;

  return jsonb_build_object('ok',true,'post_id',v_post_id);
end;
$$;

create or replace function public.spark_create_study_circle_reply_v10(
  p_subject_id text,
  p_body text,
  p_reply_to_post_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid:=auth.uid();
  v_subject text:=lower(trim(coalesce(p_subject_id,'')));
  v_circle_id uuid;
  v_body text:=trim(coalesce(p_body,''));
  v_post_id uuid;
begin
  if v_user is null then raise exception 'You must be signed in.'; end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c on c.id=m.circle_id and c.status='active' and c.course_key=v_subject
  where m.user_id=v_user and m.subject_id=v_subject and m.left_at is null
  limit 1;

  if v_circle_id is null then raise exception 'You do not have an active Study Circle for this subject.'; end if;
  if p_reply_to_post_id is null or not exists (
    select 1 from public.study_circle_posts
    where id=p_reply_to_post_id and circle_id=v_circle_id
  ) then raise exception 'That message is not part of this Study Circle.'; end if;

  if char_length(v_body)<1 or char_length(v_body)>700 then raise exception 'Study Circle posts must be between 1 and 700 characters.'; end if;

  if v_body ~* '(https?://|www\.)'
     or v_body ~* '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}'
     or v_body ~* '\+?[0-9][0-9 ()\.-]{6,}[0-9]'
     or v_body ~* '(^|[[:space:]])@[A-Z0-9_.]{3,}'
     or v_body ~* '\m(whatsapp|instagram|snapchat|telegram|discord)\M'
  then
    raise exception 'Keep personal contact details inside SPARK. Phone numbers, email addresses, social handles and external links cannot be posted.';
  end if;

  insert into public.study_circle_posts(circle_id,author_user_id,body,reply_to_post_id)
  values(v_circle_id,v_user,v_body,p_reply_to_post_id)
  returning id into v_post_id;

  update public.study_circle_members
  set contribution_count=contribution_count+1
  where circle_id=v_circle_id and user_id=v_user and left_at is null;

  return jsonb_build_object('ok',true,'post_id',v_post_id,'reply_to_post_id',p_reply_to_post_id);
end;
$$;

create or replace function public.spark_report_study_circle_post_v10(
  p_subject_id text,
  p_post_id uuid,
  p_reason text,
  p_details text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid:=auth.uid();
  v_subject text:=lower(trim(coalesce(p_subject_id,'')));
  v_circle_id uuid;
  v_reason text:=trim(coalesce(p_reason,''));
  v_details text:=nullif(trim(coalesce(p_details,'')),'');
begin
  if v_user is null then raise exception 'You must be signed in.'; end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c on c.id=m.circle_id and c.status='active' and c.course_key=v_subject
  where m.user_id=v_user and m.subject_id=v_subject and m.left_at is null
  limit 1;

  if v_circle_id is null then raise exception 'You do not have an active Study Circle for this subject.'; end if;
  if not exists(select 1 from public.study_circle_posts where id=p_post_id and circle_id=v_circle_id) then
    raise exception 'That post is not part of this Study Circle.';
  end if;

  if v_reason not in ('Personal information','Unkind or inappropriate','Off-topic or spam','Academic misconduct','Other') then
    raise exception 'Choose a valid report reason.';
  end if;
  if v_details is not null and char_length(v_details)>500 then raise exception 'Report details must be 500 characters or fewer.'; end if;

  if exists (
    select 1 from public.study_circle_reports
    where post_id=p_post_id and reporter_user_id=v_user and status in ('open','reviewing')
  ) then return jsonb_build_object('ok',true,'already_reported',true); end if;

  insert into public.study_circle_reports(circle_id,post_id,reporter_user_id,reason,details)
  values(v_circle_id,p_post_id,v_user,v_reason,v_details);

  return jsonb_build_object('ok',true);
end;
$$;

create or replace function public.spark_leave_study_circle_v10(p_subject_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid:=auth.uid();
  v_subject text:=lower(trim(coalesce(p_subject_id,'')));
  v_subject_name text:=public.spark_study_circle_subject_name(p_subject_id);
  v_circle_id uuid;
  v_remaining integer:=0;
  v_member uuid;
begin
  if v_user is null then raise exception 'You must be signed in.'; end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c on c.id=m.circle_id and c.status='active' and c.course_key=v_subject
  where m.user_id=v_user and m.subject_id=v_subject and m.left_at is null
  limit 1;

  if v_circle_id is null then return jsonb_build_object('ok',true,'left',false); end if;

  update public.study_circle_members
  set left_at=now()
  where circle_id=v_circle_id and user_id=v_user and left_at is null;

  update public.study_circle_preferences
  set opted_in=false,updated_at=now()
  where user_id=v_user and subject_id=v_subject;

  select count(*) into v_remaining
  from public.study_circle_members
  where circle_id=v_circle_id and left_at is null;

  if v_remaining<3 then
    update public.study_circles set status='closed',closed_at=now() where id=v_circle_id;

    for v_member in
      select user_id from public.study_circle_members
      where circle_id=v_circle_id and left_at is null
    loop
      update public.study_circle_members
      set left_at=now()
      where circle_id=v_circle_id and user_id=v_member and left_at is null;

      perform public.spark_create_notification(
        v_member,
        'study_circle_update',
        v_subject_name||' Study Circle has closed',
        'There are not enough active members to keep this Study Circle open. You can look for a new '||v_subject_name||' group.',
        'dashboard','Find a new circle',null,null,v_member,
        jsonb_build_object('section','circles','subject_id',v_subject),
        'study-circle:'||v_circle_id::text||':closed:'||v_member::text
      );
    end loop;
  end if;

  return jsonb_build_object('ok',true,'left',true,'subject_id',v_subject);
end;
$$;

create or replace function public.spark_parent_study_circle_status_v10(p_student_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_parent uuid:=auth.uid();
  v_rows jsonb:='[]'::jsonb;
begin
  if v_parent is null then raise exception 'You must be signed in.'; end if;

  if not exists (
    select 1 from public.parent_student_links
    where parent_id=v_parent and student_id=p_student_id and status='approved'
  ) then raise exception 'You do not have access to this student.'; end if;

  select coalesce(jsonb_agg(jsonb_build_object(
    'active',true,
    'subject_id',c.course_key,
    'subject_name',public.spark_study_circle_subject_name(c.course_key),
    'group_size',(select count(*) from public.study_circle_members x where x.circle_id=c.id and x.left_at is null),
    'joined_at',m.joined_at
  ) order by c.course_key),'[]'::jsonb)
  into v_rows
  from public.study_circle_members m
  join public.study_circles c on c.id=m.circle_id and c.status='active'
  where m.user_id=p_student_id and m.left_at is null;

  return jsonb_build_object(
    'active',jsonb_array_length(v_rows)>0,
    'circles',v_rows
  );
end;
$$;

-- Compatibility wrappers keep old Mathematics-only callers safe while the
-- application moves to V10 subject-scoped RPCs.
create or replace function public.spark_set_study_circle_preference(
  p_opted_in boolean,
  p_preferred_times text[] default '{}'::text[],
  p_accept_guidelines boolean default false
)
returns jsonb language sql security definer set search_path=public
as $$
  select public.spark_set_study_circle_preference_v10(
    'mathematics',p_opted_in,p_preferred_times,p_accept_guidelines
  );
$$;

create or replace function public.spark_get_study_circle_home()
returns jsonb language sql security definer set search_path=public
as $$ select public.spark_get_study_circle_home_v10('mathematics'); $$;

create or replace function public.spark_get_study_circle_posts()
returns jsonb language sql security definer set search_path=public
as $$ select public.spark_get_study_circle_posts_v10('mathematics'); $$;

create or replace function public.spark_get_study_circle_members_with_avatars()
returns jsonb language sql security definer set search_path=public
as $$ select public.spark_get_study_circle_members_v10('mathematics'); $$;

create or replace function public.spark_match_study_circle()
returns jsonb language sql security definer set search_path=public
as $$ select public.spark_match_study_circle_v10('mathematics'); $$;

create or replace function public.spark_create_study_circle_post(p_body text)
returns jsonb language sql security definer set search_path=public
as $$ select public.spark_create_study_circle_post_v10('mathematics',p_body); $$;

create or replace function public.spark_create_study_circle_reply(p_body text,p_reply_to_post_id uuid)
returns jsonb language sql security definer set search_path=public
as $$ select public.spark_create_study_circle_reply_v10('mathematics',p_body,p_reply_to_post_id); $$;

create or replace function public.spark_report_study_circle_post(p_post_id uuid,p_reason text,p_details text default null)
returns jsonb language sql security definer set search_path=public
as $$ select public.spark_report_study_circle_post_v10('mathematics',p_post_id,p_reason,p_details); $$;

create or replace function public.spark_leave_study_circle()
returns jsonb language sql security definer set search_path=public
as $$ select public.spark_leave_study_circle_v10('mathematics'); $$;

create or replace function public.spark_parent_study_circle_status(p_student_id uuid)
returns jsonb language sql stable security definer set search_path=public
as $$
  select coalesce(
    (select elem
     from jsonb_array_elements((public.spark_parent_study_circle_status_v10(p_student_id))->'circles') elem
     where elem->>'subject_id'='mathematics'
     limit 1),
    jsonb_build_object('active',false)
  );
$$;

revoke all on function public.spark_study_circle_subject_name(text) from public,anon,authenticated;
revoke all on function public.spark_study_circle_validate_subject(uuid,text) from public,anon,authenticated;
revoke all on function public.spark_study_circle_strengths_v10(uuid,text) from public,anon,authenticated;
revoke all on function public.spark_study_circle_focuses_v10(uuid,text) from public,anon,authenticated;

revoke all on function public.spark_set_study_circle_preference_v10(text,boolean,text[],boolean) from public,anon;
revoke all on function public.spark_get_study_circle_home_v10(text) from public,anon;
revoke all on function public.spark_get_study_circle_members_v10(text) from public,anon;
revoke all on function public.spark_get_study_circle_posts_v10(text) from public,anon;
revoke all on function public.spark_match_study_circle_v10(text) from public,anon;
revoke all on function public.spark_create_study_circle_post_v10(text,text) from public,anon;
revoke all on function public.spark_create_study_circle_reply_v10(text,text,uuid) from public,anon;
revoke all on function public.spark_report_study_circle_post_v10(text,uuid,text,text) from public,anon;
revoke all on function public.spark_leave_study_circle_v10(text) from public,anon;
revoke all on function public.spark_parent_study_circle_status_v10(uuid) from public,anon;

grant execute on function public.spark_set_study_circle_preference_v10(text,boolean,text[],boolean) to authenticated;
grant execute on function public.spark_get_study_circle_home_v10(text) to authenticated;
grant execute on function public.spark_get_study_circle_members_v10(text) to authenticated;
grant execute on function public.spark_get_study_circle_posts_v10(text) to authenticated;
grant execute on function public.spark_match_study_circle_v10(text) to authenticated;
grant execute on function public.spark_create_study_circle_post_v10(text,text) to authenticated;
grant execute on function public.spark_create_study_circle_reply_v10(text,text,uuid) to authenticated;
grant execute on function public.spark_report_study_circle_post_v10(text,uuid,text,text) to authenticated;
grant execute on function public.spark_leave_study_circle_v10(text) to authenticated;
grant execute on function public.spark_parent_study_circle_status_v10(uuid) to authenticated;

comment on function public.spark_match_study_circle_v10(text) is
  'Forms one 3-4 student Study Circle per enrolled SPARK subject using subject-specific complementary learning evidence and broad availability.';

comment on table public.study_circle_preferences is
  'Student opt-in and broad availability for SPARK Study Circles, scoped independently to each enrolled subject.';

commit;
