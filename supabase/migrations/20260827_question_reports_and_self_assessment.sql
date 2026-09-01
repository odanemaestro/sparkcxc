-- ============================================================================
-- Done by: Odane Robinson
-- Run this against your Supabase project (SQL editor, or `supabase db push`
-- if you use the CLI) before using the "report a problem with this
-- question" feature or the adaptive-practice self-assessment flow.
-- ============================================================================

-- ── 1) "Report a problem with this question" ────────────────────────────────
-- One row per report. question_id/question_source/topic are denormalized
-- (not foreign keys) because questions live in static JSON files, not a
-- database table, so there's nothing to reference.
create table if not exists public.question_reports (
  id uuid primary key default gen_random_uuid(),
  question_id text not null,
  question_source text not null check (question_source in ('lesson_bank', 'adaptive_bank')),
  topic text,
  area text,
  question_text text,
  message text not null check (char_length(trim(message)) between 5 and 2000),
  reported_by uuid references auth.users(id) on delete set null,
  status text not null default 'open' check (status in ('open', 'reviewing', 'resolved', 'dismissed')),
  created_at timestamptz not null default now()
);

create index if not exists question_reports_question_id_idx on public.question_reports (question_id);
create index if not exists question_reports_status_idx on public.question_reports (status);

alter table public.question_reports enable row level security;

-- Anyone signed in can file a report, and can only ever set reported_by to
-- their own user id (never on someone else's behalf).
drop policy if exists "Authenticated users can file question reports" on public.question_reports;
create policy "Authenticated users can file question reports"
  on public.question_reports for insert
  to authenticated
  with check (reported_by = auth.uid());

-- A reporter can see their own reports (e.g. to know it went through);
-- reviewing/resolving all reports is left to an admin dashboard querying
-- with the service role, not covered by a client-facing policy here.
drop policy if exists "Users can view their own question reports" on public.question_reports;
create policy "Users can view their own question reports"
  on public.question_reports for select
  to authenticated
  using (reported_by = auth.uid());


-- ── 2) self_assessed column on csec_question_attempts ───────────────────────
-- The adaptive-practice grading fix (src/lib/answerCheck.js) falls back to
-- asking the student to self-assess when an answer's format can't be
-- confidently auto-checked (free text, proofs, constructions). This column
-- records which attempts were graded that way, so mastery analytics can
-- distinguish "the system checked this" from "the student marked this."
alter table public.csec_question_attempts
  add column if not exists self_assessed boolean not null default false;
