-- The verified Physics examiner now emits source-specific method provenance,
-- but the production publisher still accepts only the original Physics tags.
-- This patch is deliberately narrow: only these five new Physics method tags
-- are allowed. All mark ceilings, rubric hashes, JWT/service-role checks,
-- response hashes, leases and unresolved-score guards remain unchanged.
begin;
do $physics_provenance$
declare
  definition text;
  old_pattern text := 'coalesce(v_row->>''method'','''')!~ ''^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification)$''';
  new_pattern text := 'coalesce(v_row->>''method'','''')!~ ''^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification|physics-empty-graph-dependent-response|physics-source-explicit-wrong|physics-source-complete-answer|physics-source-canonical-partial)$''';
  old_physics text := '(v_rubric.subject_id=''physics'' and v_method not in (''existing-physics-rubric-checks'',''physics-graph-requires-artifact-verification''))';
  new_physics text := '(v_rubric.subject_id=''physics'' and v_method not in (''existing-physics-rubric-checks'',''physics-graph-requires-artifact-verification'',''physics-empty-graph-dependent-response'',''existing-physics-graph-working-advisory'',''physics-source-explicit-wrong'',''physics-source-complete-answer'',''physics-source-canonical-partial''))';
begin
  select pg_get_functiondef('public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)'::regprocedure)
    into definition;
  if strpos(definition,new_pattern)>0 and strpos(definition,new_physics)>0 then
    return; -- already installed; no other function code changed
  end if;
  if strpos(definition,old_pattern)=0 or strpos(definition,old_physics)=0
     or strpos(definition,new_pattern)>0 or strpos(definition,new_physics)>0 then
    raise exception 'Unexpected Physics score-publisher implementation; refusing unsafe patch';
  end if;
  definition:=replace(definition,old_pattern,new_pattern);
  definition:=replace(definition,old_physics,new_physics);
  execute definition;
end $physics_provenance$;
-- Verify exact acceptance text without invoking a real student result.
do $verify_provenance$
declare definition text;
begin
  select pg_get_functiondef('public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)'::regprocedure)
    into definition;
  if strpos(definition,'''physics-source-canonical-partial''')=0
   or strpos(definition,'''physics-empty-graph-dependent-response''')=0
   or strpos(definition,'''existing-physics-graph-working-advisory''')=0
   or strpos(definition,'''physics-source-complete-answer''')=0
   or strpos(definition,'''physics-source-explicit-wrong''')=0
   or strpos(definition,'''Subject examiner provenance mismatch''')=0
   or strpos(definition,'''Criterion mark exceeds source scheme''')=0
   or strpos(definition,'''Worker lease lost''')=0 then
    raise exception 'Physics provenance guard failed verification';
  end if;
end $verify_provenance$;
commit;
