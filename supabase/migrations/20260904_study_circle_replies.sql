-- ============================================================================
-- SPARK Study Circles: direct replies on the shared study board
-- Replies remain public to the whole Study Circle. This does NOT add private
-- or one-to-one messaging.
-- ============================================================================

begin;

alter table public.study_circle_posts
  add column if not exists reply_to_post_id uuid;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'study_circle_posts_reply_to_post_fkey'
      and conrelid = 'public.study_circle_posts'::regclass
  ) then
    alter table public.study_circle_posts
      add constraint study_circle_posts_reply_to_post_fkey
      foreign key (reply_to_post_id)
      references public.study_circle_posts(id)
      on delete set null;
  end if;
end
$$;

create index if not exists study_circle_posts_reply_to_idx
  on public.study_circle_posts(reply_to_post_id)
  where reply_to_post_id is not null;

create or replace function public.spark_get_study_circle_posts()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_circle_id uuid;
  v_posts jsonb := '[]'::jsonb;
begin
  if v_user is null then
    raise exception 'You must be signed in.';
  end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c
    on c.id = m.circle_id
   and c.status = 'active'
  where m.user_id = v_user
    and m.left_at is null
  limit 1;

  if v_circle_id is null then
    return '[]'::jsonb;
  end if;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', p.id,
        'author', public.spark_study_circle_display_name(p.author_user_id),
        'body', p.body,
        'created_at', p.created_at,
        'is_mine', p.author_user_id = v_user,
        'reply_to',
          case
            when rp.id is null then null
            else jsonb_build_object(
              'id', rp.id,
              'author', public.spark_study_circle_display_name(rp.author_user_id),
              'body', rp.body
            )
          end
      )
      order by p.created_at asc
    ),
    '[]'::jsonb
  )
  into v_posts
  from (
    select *
    from public.study_circle_posts
    where circle_id = v_circle_id
    order by created_at desc
    limit 60
  ) p
  left join public.study_circle_posts rp
    on rp.id = p.reply_to_post_id
   and rp.circle_id = v_circle_id;

  return v_posts;
end;
$$;

create or replace function public.spark_create_study_circle_reply(
  p_body text,
  p_reply_to_post_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_circle_id uuid;
  v_body text := trim(coalesce(p_body, ''));
  v_post_id uuid;
begin
  if v_user is null then
    raise exception 'You must be signed in.';
  end if;

  select m.circle_id into v_circle_id
  from public.study_circle_members m
  join public.study_circles c
    on c.id = m.circle_id
   and c.status = 'active'
  where m.user_id = v_user
    and m.left_at is null
  limit 1;

  if v_circle_id is null then
    raise exception 'You do not have an active Study Circle.';
  end if;

  if p_reply_to_post_id is null or not exists (
    select 1
    from public.study_circle_posts p
    where p.id = p_reply_to_post_id
      and p.circle_id = v_circle_id
  ) then
    raise exception 'That message is not part of your Study Circle.';
  end if;

  if char_length(v_body) < 1 or char_length(v_body) > 700 then
    raise exception 'Study Circle posts must be between 1 and 700 characters.';
  end if;

  -- Preserve the same safety boundary as ordinary Study Circle posts.
  if v_body ~* '(https?://|www\.)'
     or v_body ~* '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}'
     or v_body ~* '\+?[0-9][0-9 ()\.-]{6,}[0-9]'
     or v_body ~* '(^|[[:space:]])@[A-Z0-9_.]{3,}'
     or v_body ~* '\m(whatsapp|instagram|snapchat|telegram|discord)\M'
  then
    raise exception 'Keep personal contact details inside SPARK. Phone numbers, email addresses, social handles and external links cannot be posted.';
  end if;

  if exists (
    select 1
    from public.study_circle_posts
    where author_user_id = v_user
      and created_at > now() - interval '4 seconds'
  ) then
    raise exception 'Please wait a moment before posting again.';
  end if;

  insert into public.study_circle_posts(
    circle_id,
    author_user_id,
    body,
    reply_to_post_id
  )
  values (
    v_circle_id,
    v_user,
    v_body,
    p_reply_to_post_id
  )
  returning id into v_post_id;

  update public.study_circle_members
  set contribution_count = contribution_count + 1
  where circle_id = v_circle_id
    and user_id = v_user
    and left_at is null;

  return jsonb_build_object(
    'ok', true,
    'post_id', v_post_id,
    'reply_to_post_id', p_reply_to_post_id
  );
end;
$$;

revoke all on function public.spark_get_study_circle_posts() from public, anon;
revoke all on function public.spark_create_study_circle_reply(text,uuid) from public, anon;

grant execute on function public.spark_get_study_circle_posts() to authenticated;
grant execute on function public.spark_create_study_circle_reply(text,uuid) to authenticated;

comment on function public.spark_get_study_circle_posts() is
  'Returns the latest shared Study Circle board posts, including safe reply previews, for the signed-in active member.';

comment on function public.spark_create_study_circle_reply(text,uuid) is
  'Creates a reply to an existing message in the signed-in student''s active Study Circle. Replies remain visible to the whole circle.';

commit;
