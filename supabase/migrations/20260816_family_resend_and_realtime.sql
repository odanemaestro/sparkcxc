-- CaribPrep family-request resend + realtime hardening
-- Safe to run after 20260816_reviews_parent_system.sql.

-- A declined request is not a permanent block. The same parent may send a
-- fresh request later, and the student must see it as pending again.
create or replace function public.request_parent_link(p_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student uuid;
  v_link uuid;
begin
  if not exists (
    select 1 from profiles
    where id = auth.uid() and role = 'parent'
  ) then
    raise exception 'Only parent accounts can request a student link';
  end if;

  select student_id into v_student
  from student_family_codes
  where upper(code) = upper(trim(p_code));

  if v_student is null then
    raise exception 'That family code is not valid';
  end if;

  if v_student = auth.uid() then
    raise exception 'A parent cannot link to their own account';
  end if;

  insert into parent_student_links(parent_id, student_id, status, created_at, approved_at)
  values (auth.uid(), v_student, 'pending', now(), null)
  on conflict (parent_id, student_id)
  do update set
    status = case
      when parent_student_links.status in ('declined', 'revoked') then 'pending'
      when parent_student_links.status = 'pending' then 'pending'
      else parent_student_links.status
    end,
    created_at = case
      when parent_student_links.status in ('declined', 'revoked') then now()
      else parent_student_links.created_at
    end,
    approved_at = case
      when parent_student_links.status in ('declined', 'revoked') then null
      else parent_student_links.approved_at
    end
  returning id into v_link;

  return v_link;
end;
$$;

grant execute on function public.request_parent_link(text) to authenticated;

-- Make parent_student_links available to Supabase Realtime so an open
-- student dashboard receives a newly-created or re-sent request immediately.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'parent_student_links'
  ) then
    alter publication supabase_realtime add table public.parent_student_links;
  end if;
exception
  when undefined_object then
    -- Local/test environments may not expose the Supabase realtime
    -- publication. The application still works through normal reloads.
    null;
end $$;
