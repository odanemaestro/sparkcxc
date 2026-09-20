begin;

-- ============================================================================
-- SPARK Dynamic Subject Platform V1
--
-- Foundation:
--   * dedicated admin account classification
--   * database-backed subject catalog
--   * sections, topics, prerequisites and activity catalog
--   * safe admin-only subject configuration RPCs
--   * public live-subject discovery
--
-- Subject sync is data/configuration provisioning. It cannot execute arbitrary
-- SQL and does not expose any service-role credential to the browser.
-- ============================================================================

alter table public.profiles
  add column if not exists account_type text not null default 'standard';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_account_type_check'
  ) then
    alter table public.profiles
      add constraint profiles_account_type_check
      check (account_type in ('standard','admin'));
  end if;
end $$;

create index if not exists profiles_account_type_idx
  on public.profiles(account_type)
  where account_type = 'admin';

create or replace function public.spark_current_user_is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $function$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and coalesce(p.is_admin,false) = true
  );
$function$;

revoke all on function public.spark_current_user_is_admin() from public;
grant execute on function public.spark_current_user_is_admin() to authenticated;

create or replace function public.spark_current_user_is_dedicated_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $function$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and coalesce(p.is_admin,false) = true
      and p.account_type = 'admin'
  );
$function$;

revoke all on function public.spark_current_user_is_dedicated_admin() from public;
grant execute on function public.spark_current_user_is_dedicated_admin() to authenticated;

create or replace function public.spark_admin_make_dedicated_admin(
  p_email text
)
returns uuid
language plpgsql
security definer
set search_path = public, auth
as $function$
declare
  v_user_id uuid;
  v_email text := lower(trim(coalesce(p_email,'')));
begin
  if not public.spark_current_user_is_admin() then
    raise exception 'Admin access required';
  end if;

  if v_email = '' then
    raise exception 'Email is required';
  end if;

  select u.id
  into v_user_id
  from auth.users u
  where lower(u.email) = v_email
  limit 1;

  if v_user_id is null then
    raise exception 'No SPARK account exists with that email';
  end if;

  if not exists (select 1 from public.profiles p where p.id = v_user_id) then
    raise exception 'The account exists but its SPARK profile is not ready yet';
  end if;

  update public.profiles
  set
    is_admin = true,
    account_type = 'admin'
  where id = v_user_id;

  return v_user_id;
end;
$function$;

revoke all on function public.spark_admin_make_dedicated_admin(text) from public;
grant execute on function public.spark_admin_make_dedicated_admin(text) to authenticated;

create or replace function public.spark_admin_list_dedicated_admins()
returns table(
  user_id uuid,
  email text,
  name text,
  account_type text,
  is_admin boolean,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, auth
as $function$
begin
  if not public.spark_current_user_is_admin() then
    raise exception 'Admin access required';
  end if;

  return query
  select
    p.id,
    u.email::text,
    p.name::text,
    p.account_type,
    coalesce(p.is_admin,false),
    u.created_at
  from public.profiles p
  join auth.users u on u.id = p.id
  where p.account_type = 'admin'
    and coalesce(p.is_admin,false) = true
  order by u.created_at asc;
end;
$function$;

revoke all on function public.spark_admin_list_dedicated_admins() from public;
grant execute on function public.spark_admin_list_dedicated_admins() to authenticated;

create or replace function public.spark_admin_revoke_dedicated_admin(
  p_user_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_count integer;
begin
  if not public.spark_current_user_is_admin() then
    raise exception 'Admin access required';
  end if;

  if p_user_id = auth.uid() then
    raise exception 'You cannot revoke your own admin account';
  end if;

  select count(*)
  into v_count
  from public.profiles p
  where p.account_type = 'admin'
    and coalesce(p.is_admin,false) = true;

  if v_count <= 1 then
    raise exception 'SPARK must keep at least one dedicated admin';
  end if;

  update public.profiles
  set
    account_type = 'standard',
    is_admin = false
  where id = p_user_id
    and account_type = 'admin';

  return found;
end;
$function$;

revoke all on function public.spark_admin_revoke_dedicated_admin(uuid) from public;
grant execute on function public.spark_admin_revoke_dedicated_admin(uuid) to authenticated;


-- ============================================================================
-- Dynamic subject catalog
-- ============================================================================

create table if not exists public.spark_subjects (
  id text primary key
    check (id ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null,
  short_name text not null,
  qualification text not null default 'CSEC',
  mark text not null default '',
  description text not null default '',
  enabled boolean not null default false,
  status text not null default 'draft'
    check (status in ('draft','live','archived')),
  sort_order integer not null default 100,
  implementation text not null default 'generic'
    check (implementation in ('builtin','generic','custom')),
  study_view text not null default 'study',
  capabilities jsonb not null default '{"progress":true}'::jsonb,
  routes jsonb not null default '{}'::jsonb,
  stats jsonb not null default '{}'::jsonb,
  learning_config jsonb not null default '{}'::jsonb,
  manifest_version integer not null default 1
    check (manifest_version >= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists spark_subjects_live_sort_idx
  on public.spark_subjects(status, enabled, sort_order, name);

create table if not exists public.spark_subject_sections (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.spark_subjects(id) on delete cascade,
  section_id text not null,
  title text not null,
  description text not null default '',
  sort_order integer not null default 100,
  enabled boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(subject_id, section_id)
);

create table if not exists public.spark_subject_topics (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.spark_subjects(id) on delete cascade,
  topic_id text not null,
  section_id text,
  title text not null,
  description text not null default '',
  sort_order integer not null default 100,
  enabled boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(subject_id, topic_id)
);

create table if not exists public.spark_subject_prerequisites (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.spark_subjects(id) on delete cascade,
  skill_key text not null,
  prerequisite_subject_id text not null references public.spark_subjects(id) on delete cascade,
  prerequisite_skill_key text not null,
  strength numeric not null default 1
    check (strength >= 0 and strength <= 1),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(subject_id, skill_key, prerequisite_subject_id, prerequisite_skill_key)
);

create table if not exists public.spark_subject_activity_catalog (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.spark_subjects(id) on delete cascade,
  activity_key text not null,
  activity_type text not null,
  section_id text,
  topic_id text,
  title text not null,
  route text,
  evidence_weight numeric,
  enabled boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(subject_id, activity_key)
);

alter table public.spark_subjects enable row level security;
alter table public.spark_subject_sections enable row level security;
alter table public.spark_subject_topics enable row level security;
alter table public.spark_subject_prerequisites enable row level security;
alter table public.spark_subject_activity_catalog enable row level security;

drop policy if exists spark_subjects_read on public.spark_subjects;
create policy spark_subjects_read
on public.spark_subjects
for select
to anon, authenticated
using (
  (enabled = true and status = 'live')
  or public.spark_current_user_is_admin()
);

drop policy if exists spark_subject_sections_read on public.spark_subject_sections;
create policy spark_subject_sections_read
on public.spark_subject_sections
for select
to anon, authenticated
using (
  public.spark_current_user_is_admin()
  or exists (
    select 1 from public.spark_subjects s
    where s.id = subject_id
      and s.enabled = true
      and s.status = 'live'
  )
);

drop policy if exists spark_subject_topics_read on public.spark_subject_topics;
create policy spark_subject_topics_read
on public.spark_subject_topics
for select
to anon, authenticated
using (
  public.spark_current_user_is_admin()
  or exists (
    select 1 from public.spark_subjects s
    where s.id = subject_id
      and s.enabled = true
      and s.status = 'live'
  )
);

drop policy if exists spark_subject_prerequisites_read on public.spark_subject_prerequisites;
create policy spark_subject_prerequisites_read
on public.spark_subject_prerequisites
for select
to authenticated
using (
  public.spark_current_user_is_admin()
  or exists (
    select 1 from public.spark_subjects s
    where s.id = subject_id
      and s.enabled = true
      and s.status = 'live'
  )
);

drop policy if exists spark_subject_activity_catalog_read on public.spark_subject_activity_catalog;
create policy spark_subject_activity_catalog_read
on public.spark_subject_activity_catalog
for select
to authenticated
using (
  public.spark_current_user_is_admin()
  or exists (
    select 1 from public.spark_subjects s
    where s.id = subject_id
      and s.enabled = true
      and s.status = 'live'
  )
);

grant select on public.spark_subjects to anon, authenticated;
grant select on public.spark_subject_sections to anon, authenticated;
grant select on public.spark_subject_topics to anon, authenticated;
grant select on public.spark_subject_prerequisites to authenticated;
grant select on public.spark_subject_activity_catalog to authenticated;


-- Seed existing production subjects. The catalog does not replace specialist
-- content implementations yet. It becomes their shared discovery/config layer.

insert into public.spark_subjects(
  id,name,short_name,qualification,mark,description,enabled,status,sort_order,
  implementation,study_view,capabilities,routes,stats,learning_config,manifest_version
)
values
(
  'mathematics',
  'CSEC Mathematics',
  'Mathematics',
  'CSEC',
  '∑',
  'Study the full CSEC Mathematics syllabus, practise by topic and sit full examination simulations.',
  true,
  'live',
  10,
  'builtin',
  'lesson',
  '{
    "study":true,"practice":true,"flashcards":true,"progress":true,
    "paper1":true,"paper2":true,"adaptive":true,"structured":true,
    "labs":false,"sba":false
  }'::jsonb,
  '{
    "study":"/study/mathematics",
    "practice":"/practice/mathematics",
    "flashcards":"/dashboard/flashcards/mathematics",
    "progress":"/dashboard/progress"
  }'::jsonb,
  '{}'::jsonb,
  '{}'::jsonb,
  1
),
(
  'physics',
  'CSEC Physics',
  'Physics',
  'CSEC',
  'Φ',
  'Study the CSEC Physics syllabus with audited lessons, practical tools and examination practice.',
  true,
  'live',
  20,
  'builtin',
  'physics',
  '{
    "study":true,"practice":true,"flashcards":true,"progress":true,
    "paper1":true,"paper2":true,"adaptive":false,"structured":true,
    "labs":true,"sba":false
  }'::jsonb,
  '{
    "study":"/study/physics",
    "practice":"/practice/physics",
    "flashcards":"/dashboard/flashcards/physics",
    "progress":"/dashboard/progress"
  }'::jsonb,
  '{}'::jsonb,
  '{}'::jsonb,
  1
),
(
  'information-technology',
  'CSEC Information Technology',
  'Information Technology',
  'CSEC',
  'IT',
  'Study the current CSEC Information Technology syllabus, use interactive SPARK tools and sit full Paper 1 and Paper 2 simulations.',
  true,
  'live',
  30,
  'builtin',
  'information-technology',
  '{
    "study":true,"practice":true,"flashcards":true,"progress":true,
    "paper1":true,"paper2":true,"adaptive":false,"structured":true,
    "labs":true,"sba":true
  }'::jsonb,
  '{
    "study":"/study/information-technology",
    "practice":"/practice/information-technology",
    "flashcards":"/dashboard/flashcards/information-technology",
    "progress":"/dashboard/progress"
  }'::jsonb,
  '{}'::jsonb,
  '{}'::jsonb,
  1
)
on conflict (id) do update set
  name = excluded.name,
  short_name = excluded.short_name,
  qualification = excluded.qualification,
  mark = excluded.mark,
  description = excluded.description,
  implementation = excluded.implementation,
  study_view = excluded.study_view,
  capabilities = excluded.capabilities,
  routes = excluded.routes,
  manifest_version = greatest(public.spark_subjects.manifest_version, excluded.manifest_version),
  updated_at = now();


create or replace function public.spark_get_subject_catalog()
returns setof public.spark_subjects
language sql
security definer
stable
set search_path = public
as $function$
  select s.*
  from public.spark_subjects s
  where s.enabled = true
    and s.status = 'live'
  order by s.sort_order, s.name;
$function$;

revoke all on function public.spark_get_subject_catalog() from public;
grant execute on function public.spark_get_subject_catalog() to anon, authenticated;


create or replace function public.spark_admin_list_subject_catalog()
returns setof public.spark_subjects
language plpgsql
security definer
set search_path = public
as $function$
begin
  if not public.spark_current_user_is_admin() then
    raise exception 'Admin access required';
  end if;

  return query
  select s.*
  from public.spark_subjects s
  order by s.sort_order, s.name;
end;
$function$;

revoke all on function public.spark_admin_list_subject_catalog() from public;
grant execute on function public.spark_admin_list_subject_catalog() to authenticated;


create or replace function public.spark_admin_sync_subject_catalog(
  p_subjects jsonb
)
returns integer
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_item jsonb;
  v_count integer := 0;
  v_id text;
begin
  if not public.spark_current_user_is_admin() then
    raise exception 'Admin access required';
  end if;

  if jsonb_typeof(coalesce(p_subjects,'[]'::jsonb)) <> 'array' then
    raise exception 'Subject manifest must be a JSON array';
  end if;

  for v_item in
    select value from jsonb_array_elements(coalesce(p_subjects,'[]'::jsonb))
  loop
    v_id := lower(trim(coalesce(v_item->>'id','')));
    if v_id = '' or v_id !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' then
      raise exception 'Invalid subject id: %', v_id;
    end if;

    insert into public.spark_subjects(
      id,name,short_name,qualification,mark,description,enabled,status,sort_order,
      implementation,study_view,capabilities,routes,stats,learning_config,manifest_version,
      created_at,updated_at
    )
    values (
      v_id,
      coalesce(nullif(trim(v_item->>'name'),''),v_id),
      coalesce(nullif(trim(v_item->>'short_name'),''),coalesce(nullif(trim(v_item->>'name'),''),v_id)),
      coalesce(nullif(trim(v_item->>'qualification'),''),'CSEC'),
      coalesce(v_item->>'mark',''),
      coalesce(v_item->>'description',''),
      coalesce((v_item->>'enabled')::boolean,false),
      case
        when lower(coalesce(v_item->>'status','draft')) in ('draft','live','archived')
          then lower(coalesce(v_item->>'status','draft'))
        else 'draft'
      end,
      coalesce((v_item->>'sort_order')::integer,100),
      case
        when lower(coalesce(v_item->>'implementation','generic')) in ('builtin','generic','custom')
          then lower(coalesce(v_item->>'implementation','generic'))
        else 'generic'
      end,
      coalesce(nullif(v_item->>'study_view',''),'study'),
      coalesce(v_item->'capabilities','{"progress":true}'::jsonb),
      coalesce(v_item->'routes','{}'::jsonb),
      coalesce(v_item->'stats','{}'::jsonb),
      coalesce(v_item->'learning_config','{}'::jsonb),
      greatest(1,coalesce((v_item->>'manifest_version')::integer,1)),
      now(),
      now()
    )
    on conflict (id) do update set
      name = excluded.name,
      short_name = excluded.short_name,
      qualification = excluded.qualification,
      mark = excluded.mark,
      description = excluded.description,
      enabled = excluded.enabled,
      status = excluded.status,
      sort_order = excluded.sort_order,
      implementation = excluded.implementation,
      study_view = excluded.study_view,
      capabilities = excluded.capabilities,
      routes = excluded.routes,
      stats = excluded.stats,
      learning_config = excluded.learning_config,
      manifest_version = excluded.manifest_version,
      updated_at = now();

    v_count := v_count + 1;
  end loop;

  return v_count;
end;
$function$;

revoke all on function public.spark_admin_sync_subject_catalog(jsonb) from public;
grant execute on function public.spark_admin_sync_subject_catalog(jsonb) to authenticated;


create or replace function public.spark_admin_upsert_subject(
  p_subject jsonb
)
returns text
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_id text := lower(trim(coalesce(p_subject->>'id','')));
  v_status text := lower(trim(coalesce(p_subject->>'status','draft')));
begin
  if not public.spark_current_user_is_admin() then
    raise exception 'Admin access required';
  end if;

  if v_id = '' or v_id !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' then
    raise exception 'Use a lowercase subject id such as chemistry or social-studies';
  end if;

  if v_status not in ('draft','live','archived') then
    raise exception 'Invalid subject status';
  end if;

  if v_status = 'live' then
    if coalesce((p_subject->'capabilities'->>'progress')::boolean,false) <> true then
      raise exception 'A live subject must support progress tracking';
    end if;

    if coalesce((p_subject->'capabilities'->>'study')::boolean,false)
       and nullif(trim(coalesce(p_subject->'routes'->>'study','')),'') is null then
      raise exception 'A Study route is required before publishing this subject';
    end if;

    if coalesce((p_subject->'capabilities'->>'practice')::boolean,false)
       and nullif(trim(coalesce(p_subject->'routes'->>'practice','')),'') is null then
      raise exception 'A Practice route is required before publishing this subject';
    end if;
  end if;

  insert into public.spark_subjects(
    id,name,short_name,qualification,mark,description,enabled,status,sort_order,
    implementation,study_view,capabilities,routes,stats,learning_config,manifest_version,
    created_at,updated_at
  )
  values (
    v_id,
    coalesce(nullif(trim(p_subject->>'name'),''),v_id),
    coalesce(nullif(trim(p_subject->>'short_name'),''),coalesce(nullif(trim(p_subject->>'name'),''),v_id)),
    coalesce(nullif(trim(p_subject->>'qualification'),''),'CSEC'),
    coalesce(p_subject->>'mark',''),
    coalesce(p_subject->>'description',''),
    coalesce((p_subject->>'enabled')::boolean,false),
    v_status,
    coalesce((p_subject->>'sort_order')::integer,100),
    coalesce(nullif(lower(trim(p_subject->>'implementation')),''),'generic'),
    coalesce(nullif(trim(p_subject->>'study_view'),''),'study'),
    coalesce(p_subject->'capabilities','{"progress":true}'::jsonb),
    coalesce(p_subject->'routes','{}'::jsonb),
    coalesce(p_subject->'stats','{}'::jsonb),
    coalesce(p_subject->'learning_config','{}'::jsonb),
    greatest(1,coalesce((p_subject->>'manifest_version')::integer,1)),
    now(),
    now()
  )
  on conflict (id) do update set
    name = excluded.name,
    short_name = excluded.short_name,
    qualification = excluded.qualification,
    mark = excluded.mark,
    description = excluded.description,
    enabled = excluded.enabled,
    status = excluded.status,
    sort_order = excluded.sort_order,
    implementation = excluded.implementation,
    study_view = excluded.study_view,
    capabilities = excluded.capabilities,
    routes = excluded.routes,
    stats = excluded.stats,
    learning_config = excluded.learning_config,
    manifest_version = excluded.manifest_version,
    updated_at = now();

  return v_id;
end;
$function$;

revoke all on function public.spark_admin_upsert_subject(jsonb) from public;
grant execute on function public.spark_admin_upsert_subject(jsonb) to authenticated;


comment on column public.profiles.account_type is
'SPARK account class. admin means dedicated admin-only UX; is_admin remains the server-side authority flag.';

comment on table public.spark_subjects is
'Database-backed subject discovery and configuration catalog for SPARK Dynamic Subject Platform V1.';

comment on function public.spark_admin_sync_subject_catalog(jsonb) is
'Admin-only one-click subject manifest sync. Upserts configuration data only and cannot execute arbitrary SQL.';

commit;