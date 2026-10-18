begin;

-- Announces a new course once, when it first becomes live and enabled.
-- Existing live courses are not backfilled by installing this trigger.
create or replace function public.spark_announce_new_course()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user record;
  v_title text;
  v_course_name text;
  v_key text;
begin
  if not (new.enabled is true and lower(coalesce(new.status,'')) = 'live') then
    return new;
  end if;
  if tg_op = 'UPDATE' and
    (old.enabled is true and lower(coalesce(old.status,'')) = 'live') then
    return new;
  end if;

  v_course_name := coalesce(nullif(btrim(new.name),''),new.id);
  v_title := 'New SPARK course: ' || v_course_name;
  for v_user in select id from public.profiles loop
    v_key := 'course-launch:' || new.id || ':' || v_user.id::text;
    perform public.spark_create_notification(
      v_user.id,
      'new_course_added',
      v_title,
      v_course_name || ' is now available on SPARK. Explore the lessons and practise at your own pace.',
      'subjects',
      'Explore course',
      null,null,null,
      jsonb_build_object('subject_id',new.id,'subject_name',v_course_name,'announcement','new-course'),
      v_key
    );
  end loop;
  return new;
end;
$$;

revoke all on function public.spark_announce_new_course()
from public, anon, authenticated;

drop trigger if exists spark_announce_new_course_trg on public.spark_subjects;
create trigger spark_announce_new_course_trg
after insert or update of enabled,status on public.spark_subjects
for each row
execute function public.spark_announce_new_course();

comment on function public.spark_announce_new_course() is
  'Announces a newly enabled live SPARK course to existing profiles exactly once per course and recipient.';
commit;
