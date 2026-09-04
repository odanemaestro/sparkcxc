-- ============================================================================
-- SPARK Study Circles V9.0
-- Small, reciprocal peer-learning groups for CSEC Mathematics students.
--
-- Privacy / safety principles:
--   * Opt-in only.
--   * Exact mastery scores are never exposed to peers.
--   * Peer display names are reduced to first name + last initial.
--   * No direct table access from the browser. Student-facing reads/writes use
--     security-definer RPCs that validate the signed-in user.
--   * Study-board posts reject contact details, social handles and URLs.
--   * No private/direct messages are provided.
--   * Parents can see only high-level participation for an approved linked child.
--   * Any peer post can be reported for moderation.
-- ============================================================================

create extension if not exists pgcrypto;

create table if not exists public.study_circle_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  opted_in boolean not null default false,
  preferred_times text[] not null default '{}'::text[],
  max_group_size integer not null default 4 check (max_group_size between 3 and 4),
  guidelines_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint study_circle_preferred_times_allowed check (
    preferred_times <@ array[
      'weekday_morning',
      'weekday_afternoon',
      'weekday_evening',
      'saturday',
      'sunday'
    ]::text[]
  )
);

create table if not exists public.study_circles (
  id uuid primary key default gen_random_uuid(),
  course_key text not null default 'csec-mathematics',
  title text not null default 'CSEC Mathematics Study Circle',
  status text not null default 'active' check (status in ('active','closed')),
  created_by_system boolean not null default true,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists public.study_circle_members (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.study_circles(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  matched_strength text,
  matched_focus text,
  contribution_count integer not null default 0 check (contribution_count >= 0),
  joined_at timestamptz not null default now(),
  left_at timestamptz
);

create unique index if not exists study_circle_one_active_membership_uidx
  on public.study_circle_members(user_id)
  where left_at is null;

create index if not exists study_circle_members_circle_idx
  on public.study_circle_members(circle_id, left_at, joined_at);

create table if not exists public.study_circle_posts (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.study_circles(id) on delete cascade,
  author_user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 700),
  created_at timestamptz not null default now()
);

create index if not exists study_circle_posts_circle_created_idx
  on public.study_circle_posts(circle_id, created_at desc);

create table if not exists public.study_circle_reports (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.study_circles(id) on delete cascade,
  post_id uuid references public.study_circle_posts(id) on delete set null,
  reporter_user_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null check (char_length(reason) between 2 and 80),
  details text check (details is null or char_length(details) <= 500),
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists study_circle_reports_status_created_idx
  on public.study_circle_reports(status, created_at desc);

alter table public.study_circle_preferences enable row level security;
alter table public.study_circles enable row level security;
alter table public.study_circle_members enable row level security;
alter table public.study_circle_posts enable row level security;
alter table public.study_circle_reports enable row level security;

-- Browser clients never query these tables directly. RPCs below return only the
-- minimum sanitized fields needed by the interface.
revoke all on public.study_circle_preferences from anon, authenticated;
revoke all on public.study_circles from anon, authenticated;
revoke all on public.study_circle_members from anon, authenticated;
revoke all on public.study_circle_posts from anon, authenticated;
revoke all on public.study_circle_reports from anon, authenticated;

create or replace function public.spark_study_circle_display_name(p_user_id uuid)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_name text;
  v_parts text[];
  v_last_index integer;
begin
  select nullif(trim(name), '') into v_name
  from public.profiles
  where id = p_user_id;

  if v_name is null then
    return 'Student';
  end if;

  v_parts := regexp_split_to_array(v_name, '\s+');
  v_last_index := coalesce(array_length(v_parts, 1), 1);

  if v_last_index <= 1 then
    return v_parts[1];
  end if;

  return v_parts[1] || ' ' || upper(left(v_parts[v_last_index], 1)) || '.';
end;
$$;

create or replace function public.spark_study_circle_strengths(p_user_id uuid)
returns text[]
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(array_agg(skill order by mastery_score desc, attempts desc, skill), '{}'::text[])
  from (
    select skill, mastery_score, attempts
    from public.csec_skill_progress
    where user_id = p_user_id
      and attempts >= 3
      and mastery_score >= 75
    order by mastery_score desc, attempts desc, updated_at desc
    limit 3
  ) ranked;
$$;

create or replace function public.spark_study_circle_focuses(p_user_id uuid)
returns text[]
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(array_agg(skill order by mastery_score asc, attempts desc, skill), '{}'::text[])
  from (
    select skill, mastery_score, attempts
    from public.csec_skill_progress
    where user_id = p_user_id
      and attempts >= 2
      and mastery_score < 75
    order by mastery_score asc, attempts desc, updated_at desc
    limit 3
  ) ranked;
$$;

revoke all on function public.spark_study_circle_display_name(uuid) from public, anon, authenticated;
revoke all on function public.spark_study_circle_strengths(uuid) from public, anon, authenticated;
revoke all on function public.spark_study_circle_focuses(uuid) from public, anon, authenticated;

create or replace function public.spark_set_study_circle_preference(
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
  v_role text;
  v_times text[] := coalesce(p_preferred_times, '{}'::text[]);
begin
  if v_user is null then
    raise exception 'You must be signed in.';
  end if;

  select role into v_role from public.profiles where id = v_user;
  if v_role is distinct from 'student' then
    raise exception 'Study Circles are available to student accounts.';
  end if;

  if exists (
    select 1
    from unnest(v_times) value
    where value <> all(array[
      'weekday_morning',
      'weekday_afternoon',
      'weekday_evening',
      'saturday',
      'sunday'
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
    join public.study_circles c on c.id = m.circle_id and c.status = 'active'
    where m.user_id = v_user and m.left_at is null
  ) then
    raise exception 'Leave your current Study Circle before pausing matching.';
  end if;

  insert into public.study_circle_preferences (
    user_id, opted_in, preferred_times, guidelines_accepted_at, updated_at
  )
  values (
    v_user,
    p_opted_in,
    v_times,
    case when p_opted_in then now() else null end,
    now()
  )
  on conflict (user_id) do update set
    opted_in = excluded.opted_in,
    preferred_times = excluded.preferred_times,
    guidelines_accepted_at = case
      when excluded.opted_in then coalesce(public.study_circle_preferences.guidelines_accepted_at, now())
      else public.study_circle_preferences.guidelines_accepted_at
    end,
    updated_at = now();

  return jsonb_build_object(
    'ok', true,
    'opted_in', p_opted_in,
    'preferred_times', to_jsonb(v_times)
  );
end;
$$;

create or replace function public.spark_get_study_circle_home()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_role text;
  v_pref public.study_circle_preferences%rowtype;
  v_circle_id uuid;
  v_joined_at timestamptz;
  v_circle_title text;
  v_members jsonb := '[]'::jsonb;
  v_posts jsonb := '[]'::jsonb;
  v_agenda jsonb := '[]'::jsonb;
  v_strengths text[] := '{}'::text[];
  v_focus text[] := '{}'::text[];
begin
  if v_user is null then
    raise exception 'You must be signed in.';
  end if;

  select role into v_role from public.profiles where id = v_user;
  if v_role is distinct from 'student' then
    raise exception 'Study Circles are available to student accounts.';
  end if;

  select * into v_pref
  from public.study_circle_preferences
  where user_id = v_user;

  v_strengths := public.spark_study_circle_strengths(v_user);
  v_focus := public.spark_study_circle_focuses(v_user);

  select m.circle_id, m.joined_at, c.title
    into v_circle_id, v_joined_at, v_circle_title
  from public.study_circle_members m
  join public.study_circles c on c.id = m.circle_id
  where m.user_id = v_user
    and m.left_at is null
    and c.status = 'active'
  order by m.joined_at desc
  limit 1;

  if v_circle_id is null then
    return jsonb_build_object(
      'status', case when coalesce(v_pref.opted_in, false) then 'waiting' else 'inactive' end,
      'preference', jsonb_build_object(
        'opted_in', coalesce(v_pref.opted_in, false),
        'preferred_times', to_jsonb(coalesce(v_pref.preferred_times, '{}'::text[])),
        'guidelines_accepted', v_pref.guidelines_accepted_at is not null
      ),
      'profile', jsonb_build_object(
        'strengths', to_jsonb(v_strengths),
        'focus', to_jsonb(v_focus),
        'profile_ready', (cardinality(v_strengths) + cardinality(v_focus)) > 0
      ),
      'circle', null,
      'members', '[]'::jsonb,
      'agenda', '[]'::jsonb,
      'posts', '[]'::jsonb
    );
  end if;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'name', public.spark_study_circle_display_name(m.user_id),
        'is_self', m.user_id = v_user,
        'strengths', to_jsonb(public.spark_study_circle_strengths(m.user_id)),
        'focus', to_jsonb(public.spark_study_circle_focuses(m.user_id)),
        'contribution_count', m.contribution_count
      )
      order by (m.user_id = v_user) desc, public.spark_study_circle_display_name(m.user_id)
    ),
    '[]'::jsonb
  )
  into v_members
  from public.study_circle_members m
  where m.circle_id = v_circle_id and m.left_at is null;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', p.id,
        'author', public.spark_study_circle_display_name(p.author_user_id),
        'body', p.body,
        'created_at', p.created_at,
        'is_mine', p.author_user_id = v_user
      )
      order by p.created_at asc
    ),
    '[]'::jsonb
  )
  into v_posts
  from (
    select *
    from public.study_circle_posts
    where circle_id = v_circle_id
    order by created_at desc
    limit 60
  ) p;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'skill', agenda_row.skill,
        'focus_for', public.spark_study_circle_display_name(agenda_row.focus_user),
        'guide', case
          when agenda_row.guide_user is null then 'Work together'
          else public.spark_study_circle_display_name(agenda_row.guide_user)
        end
      )
      order by agenda_row.row_order
    ),
    '[]'::jsonb
  )
  into v_agenda
  from (
    select
      row_number() over(order by target.joined_at) as row_order,
      target.user_id as focus_user,
      target.matched_focus as skill,
      (
        select guide.user_id
        from public.study_circle_members guide
        left join public.csec_skill_progress guide_progress
          on guide_progress.user_id = guide.user_id
         and guide_progress.skill = target.matched_focus
        where guide.circle_id = v_circle_id
          and guide.left_at is null
          and guide.user_id <> target.user_id
        order by coalesce(guide_progress.mastery_score, 0) desc,
                 coalesce(guide_progress.attempts, 0) desc,
                 guide.joined_at
        limit 1
      ) as guide_user
    from public.study_circle_members target
    where target.circle_id = v_circle_id
      and target.left_at is null
      and target.matched_focus is not null
    order by target.joined_at
    limit 4
  ) agenda_row;

  return jsonb_build_object(
    'status', 'matched',
    'preference', jsonb_build_object(
      'opted_in', true,
      'preferred_times', to_jsonb(coalesce(v_pref.preferred_times, '{}'::text[])),
      'guidelines_accepted', v_pref.guidelines_accepted_at is not null
    ),
    'profile', jsonb_build_object(
      'strengths', to_jsonb(v_strengths),
      'focus', to_jsonb(v_focus),
      'profile_ready', (cardinality(v_strengths) + cardinality(v_focus)) > 0
    ),
    'circle', jsonb_build_object(
      'title', v_circle_title,
      'member_count', jsonb_array_length(v_members),
      'joined_at', v_joined_at
    ),
    'members', v_members,
    'agenda', v_agenda,
    'posts', v_posts
  );
end;
$$;

create or replace function public.spark_match_study_circle()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_role text;
  v_pref public.study_circle_preferences%rowtype;
  v_my_strengths text[] := '{}'::text[];
  v_my_focus text[] := '{}'::text[];
  v_candidates uuid[] := '{}'::uuid[];
  v_member_ids uuid[] := '{}'::uuid[];
  v_circle_id uuid;
  v_title text := 'CSEC Mathematics Study Circle';
  v_member uuid;
  v_member_name text;
begin
  if v_user is null then
    raise exception 'You must be signed in.';
  end if;

  select role into v_role from public.profiles where id = v_user;
  if v_role is distinct from 'student' then
    raise exception 'Study Circles are available to student accounts.';
  end if;

  select * into v_pref
  from public.study_circle_preferences
  where user_id = v_user;

  if not coalesce(v_pref.opted_in, false) or v_pref.guidelines_accepted_at is null then
    raise exception 'Join the Study Circle matching pool first.';
  end if;

  if exists (
    select 1
    from public.study_circle_members m
    join public.study_circles c on c.id = m.circle_id and c.status = 'active'
    where m.user_id = v_user and m.left_at is null
  ) then
    return public.spark_get_study_circle_home();
  end if;

  -- Serialize group formation so two students cannot be assigned to different
  -- circles by concurrent match requests.
  perform pg_advisory_xact_lock(hashtext('spark-study-circle-match-v1'));

  if exists (
    select 1
    from public.study_circle_members m
    join public.study_circles c on c.id = m.circle_id and c.status = 'active'
    where m.user_id = v_user and m.left_at is null
  ) then
    return public.spark_get_study_circle_home();
  end if;

  v_my_strengths := public.spark_study_circle_strengths(v_user);
  v_my_focus := public.spark_study_circle_focuses(v_user);

  if cardinality(v_my_strengths) + cardinality(v_my_focus) = 0 then
    raise exception 'Complete some Adaptive Practice first so SPARK can identify at least one strength or focus area.';
  end if;

  select coalesce(array_agg(candidate.user_id order by candidate.match_score desc, candidate.updated_at), '{}'::uuid[])
    into v_candidates
  from (
    select scored.user_id, scored.updated_at,
      (
        scored.availability_overlap * 4
        + scored.complement_count * 8
        + least(scored.profile_signal_count, 4)
      ) as match_score
    from (
      select
        p.user_id,
        p.updated_at,
        case
          when cardinality(coalesce(v_pref.preferred_times, '{}'::text[])) = 0
            or cardinality(coalesce(p.preferred_times, '{}'::text[])) = 0
          then 1
          else (
            select count(*)::integer
            from unnest(v_pref.preferred_times) my_time
            where my_time = any(p.preferred_times)
          )
        end as availability_overlap,
        (
          (
            select count(*)::integer
            from unnest(v_my_strengths) my_strength
            where my_strength = any(public.spark_study_circle_focuses(p.user_id))
          )
          +
          (
            select count(*)::integer
            from unnest(v_my_focus) my_focus
            where my_focus = any(public.spark_study_circle_strengths(p.user_id))
          )
        ) as complement_count,
        (
          cardinality(public.spark_study_circle_strengths(p.user_id))
          + cardinality(public.spark_study_circle_focuses(p.user_id))
        ) as profile_signal_count
      from public.study_circle_preferences p
      join public.profiles pr on pr.id = p.user_id and pr.role = 'student'
      where p.user_id <> v_user
        and p.opted_in = true
        and p.guidelines_accepted_at is not null
        and not exists (
          select 1
          from public.study_circle_members existing
          join public.study_circles circle on circle.id = existing.circle_id and circle.status = 'active'
          where existing.user_id = p.user_id and existing.left_at is null
        )
    ) scored
    where scored.profile_signal_count > 0
      and scored.complement_count > 0
    order by match_score desc, scored.updated_at
    limit 3
  ) candidate;

  if cardinality(v_candidates) < 2 then
    return public.spark_get_study_circle_home();
  end if;

  v_member_ids := array_prepend(v_user, v_candidates);

  if cardinality(v_my_focus) >= 2 then
    v_title := initcap(v_my_focus[1]) || ' & ' || initcap(v_my_focus[2]) || ' Circle';
  elsif cardinality(v_my_focus) = 1 then
    v_title := initcap(v_my_focus[1]) || ' Study Circle';
  elsif cardinality(v_my_strengths) >= 1 then
    v_title := initcap(v_my_strengths[1]) || ' Study Circle';
  end if;

  insert into public.study_circles(title)
  values (v_title)
  returning id into v_circle_id;

  insert into public.study_circle_members (
    circle_id, user_id, matched_strength, matched_focus
  )
  select
    v_circle_id,
    picked.user_id,
    (public.spark_study_circle_strengths(picked.user_id))[1],
    (public.spark_study_circle_focuses(picked.user_id))[1]
  from unnest(v_member_ids) as picked(user_id);

  for v_member in
    select m.user_id
    from public.study_circle_members m
    where m.circle_id = v_circle_id and m.left_at is null
  loop
    perform public.spark_create_notification(
      v_member,
      'study_circle_ready',
      'Your Study Circle is ready',
      'SPARK found a small CSEC Mathematics group built around complementary strengths and focus areas.',
      'dashboard',
      'Open Study Circle',
      null,
      null,
      v_member,
      jsonb_build_object('section', 'circles'),
      'study-circle:' || v_circle_id::text || ':ready:' || v_member::text
    );

    select coalesce(name, 'Your child') into v_member_name
    from public.profiles where id = v_member;

    perform public.spark_notify_linked_parents(
      v_member,
      'child_study_circle_joined',
      'Study Circle joined',
      format('%s joined a small SPARK peer-learning group for CSEC Mathematics. Exact scores, member identities and group messages remain private.', v_member_name),
      'dashboard',
      'View progress',
      null,
      jsonb_build_object('student_id', v_member, 'section', 'study-circle'),
      'study-circle:' || v_circle_id::text || ':parent-joined'
    );
  end loop;

  return public.spark_get_study_circle_home();
exception
  when unique_violation then
    -- Another serialized request may have claimed a candidate at the edge of
    -- the transaction. Do not create a partial/duplicate group.
    return public.spark_get_study_circle_home();
end;
$$;

create or replace function public.spark_create_study_circle_post(p_body text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_circle_id uuid;
  v_body text := trim(coalesce(p_body, ''));
  v_post_id uuid;
begin
  if v_user is null then
    raise exception 'You must be signed in.';
  end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c on c.id = m.circle_id and c.status = 'active'
  where m.user_id = v_user and m.left_at is null
  limit 1;

  if v_circle_id is null then
    raise exception 'You do not have an active Study Circle.';
  end if;

  if char_length(v_body) < 1 or char_length(v_body) > 700 then
    raise exception 'Study Circle posts must be between 1 and 700 characters.';
  end if;

  -- Contact exchange is intentionally blocked. Study Circles are for
  -- academic collaboration inside SPARK, not moving minors into private
  -- external channels.
  if v_body ~* '(https?://|www\.)'
     or v_body ~* '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}'
     or v_body ~* '\+?[0-9][0-9 ()\.-]{6,}[0-9]'
     or v_body ~* '(^|[[:space:]])@[A-Z0-9_.]{3,}'
     or v_body ~* '\m(whatsapp|instagram|snapchat|telegram|discord)\M'
  then
    raise exception 'Keep personal contact details inside SPARK. Phone numbers, email addresses, social handles and external links cannot be posted.';
  end if;

  if exists (
    select 1
    from public.study_circle_posts
    where author_user_id = v_user
      and created_at > now() - interval '4 seconds'
  ) then
    raise exception 'Please wait a moment before posting again.';
  end if;

  insert into public.study_circle_posts(circle_id, author_user_id, body)
  values (v_circle_id, v_user, v_body)
  returning id into v_post_id;

  update public.study_circle_members
  set contribution_count = contribution_count + 1
  where circle_id = v_circle_id and user_id = v_user and left_at is null;

  return jsonb_build_object('ok', true, 'post_id', v_post_id);
end;
$$;

create or replace function public.spark_report_study_circle_post(
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
  v_user uuid := auth.uid();
  v_circle_id uuid;
  v_reason text := trim(coalesce(p_reason, ''));
  v_details text := nullif(trim(coalesce(p_details, '')), '');
begin
  if v_user is null then
    raise exception 'You must be signed in.';
  end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c on c.id = m.circle_id and c.status = 'active'
  where m.user_id = v_user and m.left_at is null
  limit 1;

  if v_circle_id is null then
    raise exception 'You do not have an active Study Circle.';
  end if;

  if not exists (
    select 1
    from public.study_circle_posts p
    where p.id = p_post_id and p.circle_id = v_circle_id
  ) then
    raise exception 'That post is not part of your Study Circle.';
  end if;

  if v_reason not in (
    'Personal information',
    'Unkind or inappropriate',
    'Off-topic or spam',
    'Academic misconduct',
    'Other'
  ) then
    raise exception 'Choose a valid report reason.';
  end if;

  if v_details is not null and char_length(v_details) > 500 then
    raise exception 'Report details must be 500 characters or fewer.';
  end if;

  if exists (
    select 1
    from public.study_circle_reports
    where post_id = p_post_id
      and reporter_user_id = v_user
      and status in ('open','reviewing')
  ) then
    return jsonb_build_object('ok', true, 'already_reported', true);
  end if;

  insert into public.study_circle_reports (
    circle_id, post_id, reporter_user_id, reason, details
  )
  values (v_circle_id, p_post_id, v_user, v_reason, v_details);

  return jsonb_build_object('ok', true);
end;
$$;

create or replace function public.spark_leave_study_circle()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_circle_id uuid;
  v_remaining integer := 0;
  v_member uuid;
begin
  if v_user is null then
    raise exception 'You must be signed in.';
  end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c on c.id = m.circle_id and c.status = 'active'
  where m.user_id = v_user and m.left_at is null
  limit 1;

  if v_circle_id is null then
    return jsonb_build_object('ok', true, 'left', false);
  end if;

  update public.study_circle_members
  set left_at = now()
  where circle_id = v_circle_id and user_id = v_user and left_at is null;

  update public.study_circle_preferences
  set opted_in = false, updated_at = now()
  where user_id = v_user;

  select count(*) into v_remaining
  from public.study_circle_members
  where circle_id = v_circle_id and left_at is null;

  if v_remaining < 3 then
    update public.study_circles
    set status = 'closed', closed_at = now()
    where id = v_circle_id;

    for v_member in
      select user_id
      from public.study_circle_members
      where circle_id = v_circle_id and left_at is null
    loop
      update public.study_circle_members
      set left_at = now()
      where circle_id = v_circle_id and user_id = v_member and left_at is null;

      perform public.spark_create_notification(
        v_member,
        'study_circle_update',
        'Your Study Circle has closed',
        'There are not enough active members to keep this Study Circle open. You are back in the matching pool and can look for a new group.',
        'dashboard',
        'Find a new circle',
        null,
        null,
        v_member,
        jsonb_build_object('section', 'circles'),
        'study-circle:' || v_circle_id::text || ':closed:' || v_member::text
      );
    end loop;
  end if;

  return jsonb_build_object('ok', true, 'left', true);
end;
$$;

create or replace function public.spark_parent_study_circle_status(p_student_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_parent uuid := auth.uid();
  v_circle_id uuid;
  v_joined_at timestamptz;
  v_group_size integer := 0;
begin
  if v_parent is null then
    raise exception 'You must be signed in.';
  end if;

  if not exists (
    select 1
    from public.parent_student_links
    where parent_id = v_parent
      and student_id = p_student_id
      and status = 'approved'
  ) then
    raise exception 'You do not have access to this student.';
  end if;

  select m.circle_id, m.joined_at
    into v_circle_id, v_joined_at
  from public.study_circle_members m
  join public.study_circles c on c.id = m.circle_id and c.status = 'active'
  where m.user_id = p_student_id and m.left_at is null
  limit 1;

  if v_circle_id is null then
    return jsonb_build_object('active', false);
  end if;

  select count(*) into v_group_size
  from public.study_circle_members
  where circle_id = v_circle_id and left_at is null;

  return jsonb_build_object(
    'active', true,
    'group_size', v_group_size,
    'joined_at', v_joined_at
  );
end;
$$;


create or replace function public.admin_get_study_circle_reports()
returns table (
  report_id uuid,
  circle_id uuid,
  circle_title text,
  post_id uuid,
  post_body text,
  author_user_id uuid,
  author_name text,
  reporter_user_id uuid,
  reporter_name text,
  reason text,
  details text,
  status text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.profiles
    where id = auth.uid() and is_admin = true
  ) then
    raise exception 'Admin access required.';
  end if;

  return query
  select
    r.id,
    r.circle_id,
    c.title,
    r.post_id,
    p.body,
    p.author_user_id,
    coalesce(author_profile.name, 'Student'),
    r.reporter_user_id,
    coalesce(reporter_profile.name, 'Student'),
    r.reason,
    r.details,
    r.status,
    r.created_at
  from public.study_circle_reports r
  join public.study_circles c on c.id = r.circle_id
  left join public.study_circle_posts p on p.id = r.post_id
  left join public.profiles author_profile on author_profile.id = p.author_user_id
  left join public.profiles reporter_profile on reporter_profile.id = r.reporter_user_id
  where r.status in ('open','reviewing')
  order by r.created_at asc;
end;
$$;

create or replace function public.admin_resolve_study_circle_report(
  p_report_id uuid,
  p_status text,
  p_remove_post boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin uuid := auth.uid();
  v_report public.study_circle_reports%rowtype;
  v_author uuid;
begin
  if not exists (
    select 1 from public.profiles
    where id = v_admin and is_admin = true
  ) then
    raise exception 'Admin access required.';
  end if;

  if p_status not in ('resolved','dismissed') then
    raise exception 'Report status must be resolved or dismissed.';
  end if;

  select * into v_report
  from public.study_circle_reports
  where id = p_report_id
  for update;

  if v_report.id is null then
    raise exception 'Study Circle report not found.';
  end if;

  if v_report.post_id is not null then
    select author_user_id into v_author
    from public.study_circle_posts
    where id = v_report.post_id;
  end if;

  if p_remove_post and v_report.post_id is not null then
    update public.study_circle_reports
    set status = 'resolved', reviewed_at = now(), reviewed_by = v_admin
    where post_id = v_report.post_id and status in ('open','reviewing');

    delete from public.study_circle_posts
    where id = v_report.post_id;
  else
    update public.study_circle_reports
    set status = p_status, reviewed_at = now(), reviewed_by = v_admin
    where id = p_report_id;
  end if;

  perform public.spark_create_notification(
    v_report.reporter_user_id,
    'study_circle_report_update',
    'Study Circle report reviewed',
    case when p_remove_post
      then 'Thanks for reporting the post. It was reviewed and removed.'
      else 'Thanks for reporting the post. The review is complete.'
    end,
    'dashboard',
    'Open Study Circle',
    null,
    null,
    v_report.reporter_user_id,
    jsonb_build_object('section','circles'),
    'study-circle-report:' || p_report_id::text || ':reporter'
  );

  if p_remove_post and v_author is not null and v_author <> v_report.reporter_user_id then
    perform public.spark_create_notification(
      v_author,
      'study_circle_moderation',
      'Study Circle post removed',
      'A post in your Study Circle was removed after a safety review. Please keep Study Circle conversations respectful, academic and inside SPARK.',
      'dashboard',
      'Open Study Circle',
      null,
      null,
      v_author,
      jsonb_build_object('section','circles'),
      'study-circle-report:' || p_report_id::text || ':author'
    );
  end if;

  return jsonb_build_object('ok', true, 'removed', p_remove_post, 'status', p_status);
end;
$$;

revoke all on function public.spark_set_study_circle_preference(boolean,text[],boolean) from public, anon;
revoke all on function public.spark_get_study_circle_home() from public, anon;
revoke all on function public.spark_match_study_circle() from public, anon;
revoke all on function public.spark_create_study_circle_post(text) from public, anon;
revoke all on function public.spark_report_study_circle_post(uuid,text,text) from public, anon;
revoke all on function public.spark_leave_study_circle() from public, anon;
revoke all on function public.spark_parent_study_circle_status(uuid) from public, anon;
revoke all on function public.admin_get_study_circle_reports() from public, anon;
revoke all on function public.admin_resolve_study_circle_report(uuid,text,boolean) from public, anon;

grant execute on function public.spark_set_study_circle_preference(boolean,text[],boolean) to authenticated;
grant execute on function public.spark_get_study_circle_home() to authenticated;
grant execute on function public.spark_match_study_circle() to authenticated;
grant execute on function public.spark_create_study_circle_post(text) to authenticated;
grant execute on function public.spark_report_study_circle_post(uuid,text,text) to authenticated;
grant execute on function public.spark_leave_study_circle() to authenticated;
grant execute on function public.spark_parent_study_circle_status(uuid) to authenticated;
grant execute on function public.admin_get_study_circle_reports() to authenticated;
grant execute on function public.admin_resolve_study_circle_report(uuid,text,boolean) to authenticated;

comment on table public.study_circle_preferences is
  'Student opt-in and broad availability for SPARK reciprocal Study Circle matching.';
comment on table public.study_circle_reports is
  'Moderation queue for Study Circle posts reported by participating students.';
comment on function public.spark_match_study_circle() is
  'Forms 3-4 student CSEC Mathematics Study Circles using complementary mastery/focus patterns and broad availability.';
