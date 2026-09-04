-- Read-only verification for SPARK Study Circle replies.
select
  exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'study_circle_posts'
      and column_name = 'reply_to_post_id'
  ) as reply_column_exists,
  to_regprocedure('public.spark_get_study_circle_posts()') as posts_function,
  to_regprocedure('public.spark_create_study_circle_reply(text,uuid)') as reply_function;

select
  conname,
  pg_get_constraintdef(oid) as definition
from pg_constraint
where conrelid = 'public.study_circle_posts'::regclass
  and conname = 'study_circle_posts_reply_to_post_fkey';
