-- Read-only verification for SPARK Study Circle profile photos.

select
  to_regprocedure('public.spark_can_view_study_circle_avatar(text)') as avatar_access_function,
  to_regprocedure('public.spark_get_study_circle_members_with_avatars()') as member_avatar_function,
  to_regprocedure('public.spark_get_study_circle_posts()') as posts_function;

select
  id as bucket_id,
  public
from storage.buckets
where id = 'profile-photos';

select
  policyname,
  permissive,
  roles,
  cmd
from pg_policies
where schemaname = 'storage'
  and tablename = 'objects'
  and policyname = 'Study Circle members can view circle profile photos';

select
  proname,
  prosecdef as security_definer
from pg_proc
where oid in (
  'public.spark_can_view_study_circle_avatar(text)'::regprocedure,
  'public.spark_get_study_circle_members_with_avatars()'::regprocedure,
  'public.spark_get_study_circle_posts()'::regprocedure
)
order by proname;
