-- Full Paper 1 / Paper 2 practice exam history for student and linked-parent dashboards.

create table if not exists public.practice_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  attempt_key text not null,
  paper_type text not null check (paper_type in ('paper1','paper2')),
  score integer not null check (score >= 0),
  max_score integer not null check (max_score > 0),
  percent numeric(5,2) not null check (percent >= 0 and percent <= 100),
  completed_at timestamptz not null,
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  timed_out boolean not null default false,
  answered_count integer check (answered_count >= 0),
  total_questions integer not null check (total_questions > 0),
  correct_count integer not null default 0 check (correct_count >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(user_id, attempt_key)
);

create index if not exists practice_exam_attempts_user_completed_idx
on public.practice_exam_attempts(user_id, completed_at desc);

create index if not exists practice_exam_attempts_user_paper_idx
on public.practice_exam_attempts(user_id, paper_type, completed_at desc);

alter table public.practice_exam_attempts enable row level security;

drop policy if exists "Students can insert own practice exam attempts" on public.practice_exam_attempts;
create policy "Students can insert own practice exam attempts"
on public.practice_exam_attempts for insert
with check (auth.uid() = user_id);

drop policy if exists "Students can update own practice exam attempts" on public.practice_exam_attempts;
create policy "Students can update own practice exam attempts"
on public.practice_exam_attempts for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Students and linked parents can read practice exam attempts" on public.practice_exam_attempts;
create policy "Students and linked parents can read practice exam attempts"
on public.practice_exam_attempts for select
using (
  auth.uid() = user_id
  or exists (
    select 1
    from public.parent_student_links l
    where l.parent_id = auth.uid()
      and l.student_id = practice_exam_attempts.user_id
      and l.status = 'approved'
  )
);


-- Publish new exam attempts so an open parent dashboard receives a submitted exam immediately.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'practice_exam_attempts'
  ) then
    alter publication supabase_realtime add table public.practice_exam_attempts;
  end if;
exception
  when undefined_object then
    null;
end $$;
