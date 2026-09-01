create table if not exists public.csec_skill_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  skill text not null,
  mastery_score numeric(5,2) not null default 0,
  mastery_level text not null default 'Not started',
  attempts integer not null default 0,
  correct_attempts integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id, skill)
);

create table if not exists public.csec_question_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  curriculum_area text,
  topic text,
  skill text,
  difficulty text,
  correct boolean not null default false,
  marks numeric(6,2) not null default 1,
  marks_earned numeric(6,2) not null default 0,
  time_seconds integer,
  selected_answer text,
  hint_used boolean not null default false,
  attempted_at timestamptz not null default now()
);

create index if not exists csec_attempts_user_skill_idx
on public.csec_question_attempts(user_id, skill, attempted_at desc);

alter table public.csec_skill_progress enable row level security;
alter table public.csec_question_attempts enable row level security;

drop policy if exists "Users can read own CSEC skill progress" on public.csec_skill_progress;
create policy "Users can read own CSEC skill progress"
on public.csec_skill_progress for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own CSEC skill progress" on public.csec_skill_progress;
create policy "Users can insert own CSEC skill progress"
on public.csec_skill_progress for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own CSEC skill progress" on public.csec_skill_progress;
create policy "Users can update own CSEC skill progress"
on public.csec_skill_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can read own CSEC attempts" on public.csec_question_attempts;
create policy "Users can read own CSEC attempts"
on public.csec_question_attempts for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own CSEC attempts" on public.csec_question_attempts;
create policy "Users can insert own CSEC attempts"
on public.csec_question_attempts for insert
with check (auth.uid() = user_id);
