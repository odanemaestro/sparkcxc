-- ============================================================================
-- SPARK Study Circles: private student profile photos
--
-- Student photos remain in the PRIVATE profile-photos bucket.
-- An authenticated student may read another student's photo only while both
-- are active members of the same active Study Circle.
-- ============================================================================

begin;

create or replace function public.spark_can_view_study_circle_avatar(
  p_owner_user_id_text text
)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_owner_text text := nullif(trim(coalesce(p_owner_user_id_text, '')), '');
begin
  if v_user is null or v_owner_text is null then
    return false;
  end if;

  if v_user::text = v_owner_text then
    return true;
  end if;

  return exists (
    select 1
    from public.study_circle_members viewer
    join public.study_circles circle
      on circle.id = viewer.circle_id
     and circle.status = 'active'
    join public.study_circle_members owner_member
      on owner_member.circle_id = viewer.circle_id
     and owner_member.left_at is null
     and owner_member.user_id::text = v_owner_text
    where viewer.user_id = v_user
      and viewer.left_at is null
  );
end;
$$;

revoke all on function public.spark_can_view_study_circle_avatar(text)
  from public, anon;
grant execute on function public.spark_can_view_study_circle_avatar(text)
  to authenticated;

drop policy if exists "Study Circle members can view circle profile photos"
  on storage.objects;

create policy "Study Circle members can view circle profile photos"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'profile-photos'
  and public.spark_can_view_study_circle_avatar(
    (storage.foldername(name))[1]
  )
);

create or replace function public.spark_get_study_circle_members_with_avatars()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_circle_id uuid;
  v_members jsonb := '[]'::jsonb;
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
        'name', public.spark_study_circle_display_name(m.user_id),
        'is_self', m.user_id = v_user,
        'strengths', to_jsonb(public.spark_study_circle_strengths(m.user_id)),
        'focus', to_jsonb(public.spark_study_circle_focuses(m.user_id)),
        'contribution_count', m.contribution_count,
        'avatar_path', p.avatar_path
      )
      order by
        (m.user_id = v_user) desc,
        public.spark_study_circle_display_name(m.user_id)
    ),
    '[]'::jsonb
  )
  into v_members
  from public.study_circle_members m
  join public.profiles p
    on p.id = m.user_id
  where m.circle_id = v_circle_id
    and m.left_at is null;

  return v_members;
end;
$$;

-- Preserve the reply-aware board response and add only the avatar path.
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
        'avatar_path', author_profile.avatar_path,
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
  join public.profiles author_profile
    on author_profile.id = p.author_user_id
  left join public.study_circle_posts rp
    on rp.id = p.reply_to_post_id
   and rp.circle_id = v_circle_id;

  return v_posts;
end;
$$;

revoke all on function public.spark_get_study_circle_members_with_avatars()
  from public, anon;
revoke all on function public.spark_get_study_circle_posts()
  from public, anon;

grant execute on function public.spark_get_study_circle_members_with_avatars()
  to authenticated;
grant execute on function public.spark_get_study_circle_posts()
  to authenticated;

comment on function public.spark_can_view_study_circle_avatar(text) is
  'Allows a private student profile-photo read only for the owner or another active member of the same active Study Circle.';

comment on function public.spark_get_study_circle_members_with_avatars() is
  'Returns active Study Circle members with broad learning profile data and private avatar storage paths for the signed-in member.';

comment on function public.spark_get_study_circle_posts() is
  'Returns the latest shared Study Circle board posts, replies and author avatar storage paths for the signed-in active member.';

commit;
