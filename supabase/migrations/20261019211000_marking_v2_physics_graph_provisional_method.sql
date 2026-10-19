-- Reconcile the stricter Physics graph examiner evidence with the private
-- score-publication validator. Preserve service-only RPC authorization,
-- rubric approval, fingerprint, lease, and source response integrity gates.
-- Graphs with any nonblank unverified drawing NEVER receive final marks.
begin;
do $v2_graph$
declare
  def text;
  old_pattern text := 'coalesce(v_row->>''method'','''')!~ ''^existing-[A-Za-z0-9-]{3,80}$''';
  new_pattern text := 'coalesce(v_row->>''method'','''')!~ ''^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification)$''';
  old_physics text := '(v_rubric.subject_id=''physics'' and v_method<>''existing-physics-rubric-checks'')';
  new_physics text := '(v_rubric.subject_id=''physics'' and v_method not in (''existing-physics-rubric-checks'',''physics-graph-requires-artifact-verification''))';
  old_total text := 'v_total:=v_total+v_mark;';
  new_total text := $validate$
  -- Only a real, manually graded Physics GRAPH part may report unresolved
  -- graph-artefact evidence. Refuse any positive marks or resolved=true.
  if v_method='physics-graph-requires-artifact-verification' then
   if v_rubric.subject_id<>'physics'
    or coalesce(v_part->'sourceMarking'->>'responseType','')<>'graph'
    or jsonb_typeof(v_part->'sourceMarking'->'criteria') is distinct from 'array'
    or v_mark<>0 or (v_row->>'resolved')::boolean is distinct from false
    or not exists (
      select 1 from jsonb_array_elements(v_part->'sourceMarking'->'criteria') sc
      where sc->>'manual'='true'
    ) then
     raise exception 'Unverified Physics graph evidence must stay provisional';
   end if;
  end if;
  v_total:=v_total+v_mark;
$validate$;
begin
 select pg_get_functiondef('public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)'::regprocedure)
 into def;
 if strpos(def,old_pattern)=0 or strpos(def,old_physics)=0
    or strpos(def,old_total)=0 or strpos(def,new_pattern)>0 then
    raise exception 'Unexpected V2 publication implementation. Refusing unsafe patch.';
 end if;
 def:=replace(def,old_pattern,new_pattern);
 def:=replace(def,old_physics,new_physics);
 def:=replace(def,old_total,new_total);
 execute def;
end $v2_graph$;
commit;
