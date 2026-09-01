-- CaribPrep: allow the trusted tutor-application RPC to resubmit a rejected application.
--
-- The existing trigger correctly prevents applicants from changing their own
-- status/verified/active flags directly. The secure submission RPC sets a
-- transaction-local marker before making the controlled status change.
-- This trigger honors that marker ONLY for the trusted RPC path.
--
-- IMPORTANT: Do not remove this trigger. Direct client updates remain blocked.

create or replace function public.prevent_self_tutor_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.user_id = auth.uid()
     and (
       new.status is distinct from old.status
       or new.verified is distinct from old.verified
       or new.active is distinct from old.active
     )
     and coalesce(current_setting('caribprep.authorized_tutor_status_change', true), '0') <> '1'
  then
    raise exception
      'The application can only be changed by an authorized administrator.';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_prevent_self_tutor_status_change
  on public.tutors;

create trigger trg_prevent_self_tutor_status_change
before update on public.tutors
for each row
execute function public.prevent_self_tutor_status_change();

-- Re-assert the RPC permission boundary.
revoke all on function public.submit_tutor_application(uuid,text,text,text,text,text[],text[],integer,text,text,text,text) from public;
grant execute on function public.submit_tutor_application(uuid,text,text,text,text,text[],text[],integer,text,text,text,text) to authenticated;
