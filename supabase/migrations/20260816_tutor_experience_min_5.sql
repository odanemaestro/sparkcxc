-- CaribPrep: tutor application experience minimum length update
-- Experience may be as short as 5 characters. This replaces the existing
-- submit_tutor_application function without changing its security model.

create or replace function public.submit_tutor_application(
  p_tutor_id uuid default null,
  p_name text default null,
  p_initials text default null,
  p_bio text default null,
  p_phone text default null,
  p_subjects text[] default null,
  p_subject_keys text[] default null,
  p_rate_jmd integer default null,
  p_quals text default null,
  p_experience text default null,
  p_availability text default null,
  p_avatar_color text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_existing public.tutors%rowtype;
  v_id uuid;
  v_name text := regexp_replace(trim(coalesce(p_name,'')), '\\s+', ' ', 'g');
  v_phone text := trim(coalesce(p_phone,''));
  v_bio text := trim(coalesce(p_bio,''));
  v_quals text := trim(coalesce(p_quals,''));
  v_experience text := trim(coalesce(p_experience,''));
  v_availability text := trim(coalesce(p_availability,''));
  v_initials text := upper(trim(coalesce(p_initials,'')));
  v_subjects text[] := coalesce(p_subjects, '{}'::text[]);
  v_subject_keys text[] := coalesce(p_subject_keys, '{}'::text[]);
  v_avatar_color text := trim(coalesce(p_avatar_color,''));
begin
  if auth.uid() is null then
    raise exception 'You must be signed in to submit a tutor application.';
  end if;

  if length(v_name) < 2 or length(v_name) > 100
     or v_name !~ '^[A-Za-zÀ-ÖØ-öø-ÿ''’.-]+( [A-Za-zÀ-ÖØ-öø-ÿ''’.-]+)+$' then
    raise exception 'Please enter a valid first and last name.';
  end if;

  -- Accept Jamaica local 10-digit numbers (876/658), +1 Jamaica numbers,
  -- and standard international + numbers. Strip presentation characters first.
  if v_phone !~ '^[+0-9[:space:]().-]+$' then
    raise exception 'Please enter a valid phone number.';
  end if;
  if not (
    regexp_replace(v_phone, '[^0-9]', '', 'g') ~ '^(876|658)[0-9]{7}$'
    or regexp_replace(v_phone, '[^0-9]', '', 'g') ~ '^1(876|658)[0-9]{7}$'
    or (left(v_phone, 1) = '+' and regexp_replace(v_phone, '[^0-9]', '', 'g') ~ '^[0-9]{10,15}$')
  ) then
    raise exception 'Please enter a valid phone number.';
  end if;

  if length(v_bio) < 80 or length(v_bio) > 2000 then
    raise exception 'Your tutor bio must be between 80 and 2,000 characters.';
  end if;

  if cardinality(v_subjects) < 1 or cardinality(v_subjects) > 8 then
    raise exception 'Select between 1 and 8 subjects.';
  end if;

  if cardinality(v_subject_keys) <> cardinality(v_subjects) then
    raise exception 'Subject information is invalid.';
  end if;

  if p_rate_jmd is null or p_rate_jmd < 800 or p_rate_jmd > 5000 or mod(p_rate_jmd,100) <> 0 then
    raise exception 'Choose an hourly rate between J$800 and J$5,000 in J$100 increments.';
  end if;

  if length(v_quals) < 10 or length(v_quals) > 2000 then
    raise exception 'Qualifications must be between 10 and 2,000 characters.';
  end if;

  if length(v_experience) < 5 or length(v_experience) > 2000 then
    raise exception 'Teaching experience must be between 5 and 2,000 characters.';
  end if;

  if length(v_availability) < 5 or length(v_availability) > 1000 then
    raise exception 'Availability must be between 5 and 1,000 characters.';
  end if;

  if v_initials !~ '^[A-Z]{1,3}$' then
    v_initials := upper(left(regexp_replace(v_name, '[^A-Za-zÀ-ÖØ-öø-ÿ]', '', 'g'), 2));
  end if;

  select * into v_existing
  from public.tutors
  where id = p_tutor_id
  for update;

  if p_tutor_id is not null then
    if not found then
      raise exception 'Tutor application not found.';
    end if;
    if v_existing.user_id <> auth.uid() then
      raise exception 'You can only submit your own tutor application.';
    end if;
    if v_existing.status <> 'rejected' then
      raise exception 'Only a rejected tutor application can be resubmitted.';
    end if;

    -- This marker is transaction-local and is consumed by the existing
    -- tutor-status protection trigger used by the secure migration.
    perform set_config('caribprep.authorized_tutor_status_change', '1', true);

    update public.tutors
    set name = v_name,
        initials = v_initials,
        bio = v_bio,
        phone = v_phone,
        subjects = v_subjects,
        subject_keys = v_subject_keys,
        rate_jmd = p_rate_jmd,
        quals = v_quals,
        experience = v_experience,
        availability = v_availability,
        avatar_color = case when v_avatar_color <> '' then v_avatar_color else avatar_color end,
        status = 'pending',
        verified = false,
        active = false
    where id = p_tutor_id;

    perform set_config('caribprep.authorized_tutor_status_change', '0', true);
    return p_tutor_id;
  end if;

  select * into v_existing
  from public.tutors
  where user_id = auth.uid()
  order by created_at desc nulls last
  limit 1
  for update;

  if found then
    if v_existing.status = 'rejected' then
      perform set_config('caribprep.authorized_tutor_status_change', '1', true);
      update public.tutors
      set name = v_name,
          initials = v_initials,
          bio = v_bio,
          phone = v_phone,
          subjects = v_subjects,
          subject_keys = v_subject_keys,
          rate_jmd = p_rate_jmd,
          quals = v_quals,
          experience = v_experience,
          availability = v_availability,
          avatar_color = case when v_avatar_color <> '' then v_avatar_color else avatar_color end,
          status = 'pending',
          verified = false,
          active = false
      where id = v_existing.id;
      perform set_config('caribprep.authorized_tutor_status_change', '0', true);
      return v_existing.id;
    end if;
    raise exception 'You already have a tutor application. Current status: %.', v_existing.status;
  end if;

  insert into public.tutors (
    user_id, name, initials, bio, phone, subjects, subject_keys,
    rate_jmd, quals, experience, availability, avatar_color,
    verified, active, status
  ) values (
    auth.uid(), v_name, v_initials, v_bio, v_phone, v_subjects, v_subject_keys,
    p_rate_jmd, v_quals, v_experience, v_availability,
    case when v_avatar_color <> '' then v_avatar_color else '#0D9488' end,
    false, false, 'pending'
  ) returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.submit_tutor_application(uuid,text,text,text,text,text[],text[],integer,text,text,text,text) from public;
grant execute on function public.submit_tutor_application(uuid,text,text,text,text,text[],text[],integer,text,text,text,text) to authenticated;
