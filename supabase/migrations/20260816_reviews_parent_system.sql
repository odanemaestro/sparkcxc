-- CaribPrep Reviews + Parent/Guardian system
-- Safe to run once. Uses existing profiles, bookings, tutors and reviews tables.

create table if not exists public.student_family_codes (
  student_id uuid primary key references public.profiles(id) on delete cascade,
  code text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.parent_student_links (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','approved','declined','revoked')),
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  unique(parent_id, student_id),
  check (parent_id <> student_id)
);

create index if not exists parent_student_links_parent_idx on public.parent_student_links(parent_id, status);
create index if not exists parent_student_links_student_idx on public.parent_student_links(student_id, status);

alter table public.student_family_codes enable row level security;
alter table public.parent_student_links enable row level security;

-- Generate codes for existing student accounts.
insert into public.student_family_codes(student_id, code)
select p.id,
       upper('CP-' || substr(md5(p.id::text || ':' || random()::text), 1, 8))
from public.profiles p
where p.role = 'student'
  and not exists (select 1 from public.student_family_codes c where c.student_id = p.id)
on conflict (student_id) do nothing;

-- Student can see their own code. Parents never get direct table-wide code access;
-- they use the SECURITY DEFINER request function below.
drop policy if exists "Students can view own family code" on public.student_family_codes;
create policy "Students can view own family code"
on public.student_family_codes for select
using (auth.uid() = student_id);

drop policy if exists "Parents can view own links" on public.parent_student_links;
create policy "Parents can view own links"
on public.parent_student_links for select
using (auth.uid() = parent_id);

drop policy if exists "Students can view incoming links" on public.parent_student_links;
create policy "Students can view incoming links"
on public.parent_student_links for select
using (auth.uid() = student_id);

drop policy if exists "Parents can request links" on public.parent_student_links;
create policy "Parents can request links"
on public.parent_student_links for insert
with check (
  auth.uid() = parent_id
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'parent')
);

drop policy if exists "Students can respond to parent links" on public.parent_student_links;
create policy "Students can respond to parent links"
on public.parent_student_links for update
using (auth.uid() = student_id and status = 'pending')
with check (auth.uid() = student_id and status in ('approved','declined'));

-- Parent request flow: enter a student's private family code, not their email.
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
  if not exists (select 1 from profiles where id = auth.uid() and role = 'parent') then
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

  insert into parent_student_links(parent_id, student_id, status)
  values (auth.uid(), v_student, 'pending')
  on conflict (parent_id, student_id)
  do update set status = case when parent_student_links.status = 'revoked' then 'pending' else parent_student_links.status end
  returning id into v_link;

  return v_link;
end;
$$;

grant execute on function public.request_parent_link(text) to authenticated;

-- Reviews: one review per completed, confirmed booking, and the reviewer must
-- actually be the student who booked that session.
create unique index if not exists reviews_one_per_booking_idx
on public.reviews(booking_id)
where booking_id is not null;

drop policy if exists "Students can create own reviews" on public.reviews;
create policy "Students can create verified session reviews"
on public.reviews for insert
with check (
  auth.uid() = student_id
  and exists (
    select 1
    from public.bookings b
    where b.id = booking_id
      and b.student_id = auth.uid()
      and b.tutor_id = reviews.tutor_id
      and b.status = 'confirmed'
      and b.session_date < current_date
  )
  and rating between 1 and 5
  and length(trim(body)) between 10 and 1000
);

-- Keep the marketplace's public review display, but allow a student to read
-- their own reviews through the existing public SELECT policy as well.

-- Parents can view only the learning records belonging to approved linked children.
drop policy if exists "Users can read own CSEC skill progress" on public.csec_skill_progress;
create policy "Users and linked parents can read CSEC skill progress"
on public.csec_skill_progress for select
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.parent_student_links l
    where l.parent_id = auth.uid() and l.student_id = csec_skill_progress.user_id and l.status = 'approved'
  )
);

drop policy if exists "Users can read own CSEC attempts" on public.csec_question_attempts;
create policy "Users and linked parents can read CSEC attempts"
on public.csec_question_attempts for select
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.parent_student_links l
    where l.parent_id = auth.uid() and l.student_id = csec_question_attempts.user_id and l.status = 'approved'
  )
);

-- Parent can read a linked child's lesson completion.
drop policy if exists "Users can view own progress" on public.lesson_progress;
create policy "Users and linked parents can view progress"
on public.lesson_progress for select
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.parent_student_links l
    where l.parent_id = auth.uid() and l.student_id = lesson_progress.user_id and l.status = 'approved'
  )
);

-- Parent can see linked child's bookings, while students/tutors retain their existing access.
drop policy if exists "Students can view own bookings" on public.bookings;
create policy "Students and linked parents can view bookings"
on public.bookings for select
using (
  auth.uid() = student_id
  or auth.uid() = (select t.user_id from public.tutors t where t.id = bookings.tutor_id)
  or exists (
    select 1 from public.parent_student_links l
    where l.parent_id = auth.uid() and l.student_id = bookings.student_id and l.status = 'approved'
  )
);

-- Parents can read a linked child's reviews (the marketplace is already public).
drop policy if exists "Anyone can view reviews" on public.reviews;
create policy "Anyone can view reviews"
on public.reviews for select
using (true);

-- Allow an approved parent to see the linked child's safe profile fields.
drop policy if exists "Users can view linked child profiles" on public.profiles;
create policy "Users can view linked child profiles"
on public.profiles for select
using (
  auth.uid() = id
  or exists (
    select 1 from public.parent_student_links l
    where l.parent_id = auth.uid() and l.student_id = profiles.id and l.status = 'approved'
  )
);

-- Automatically provision a private family code for every new student.
create or replace function public.provision_student_family_code()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role = 'student' then
    insert into public.student_family_codes(student_id, code)
    values (new.id, upper('CP-' || substr(md5(new.id::text || ':' || clock_timestamp()::text || ':' || random()::text), 1, 8)))
    on conflict (student_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_provision_student_family_code on public.profiles;
create trigger trg_provision_student_family_code
after insert or update of role on public.profiles
for each row execute function public.provision_student_family_code();

-- Keep tutor marketplace ratings in sync with the actual review records.
create or replace function public.refresh_tutor_rating_from_reviews()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tutor uuid;
  v_rating numeric;
begin
  v_tutor := coalesce(new.tutor_id, old.tutor_id);
  select coalesce(round(avg(rating)::numeric, 1), 5.0) into v_rating
  from public.reviews where tutor_id = v_tutor;
  update public.tutors set rating = v_rating where id = v_tutor;
  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_refresh_tutor_rating_from_reviews on public.reviews;
create trigger trg_refresh_tutor_rating_from_reviews
after insert or update or delete on public.reviews
for each row execute function public.refresh_tutor_rating_from_reviews();

-- Student responses go through a narrow RPC so a student cannot rewrite the
-- parent_id on an existing relationship row.
drop policy if exists "Students can respond to parent links" on public.parent_student_links;
create or replace function public.respond_parent_link(p_link_id uuid, p_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_status not in ('approved','declined') then
    raise exception 'Invalid response';
  end if;
  update public.parent_student_links
  set status = p_status,
      approved_at = case when p_status = 'approved' then now() else null end
  where id = p_link_id
    and student_id = auth.uid()
    and status = 'pending';
  if not found then raise exception 'Family request not found or already handled'; end if;
end;
$$;

grant execute on function public.respond_parent_link(uuid, text) to authenticated;
