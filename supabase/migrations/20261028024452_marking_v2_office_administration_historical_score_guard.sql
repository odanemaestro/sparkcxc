begin;
-- Historical/specimen Paper 2 identities must also override spoofed Paper 1
-- labels. This changes no other subject and activates no course or rubric.
do $oa_historical_identity$
declare
  definition text;
  old_pattern text := $pattern$'^(oa-original-02-|oa-2-|oa-specimen-2-)'$pattern$;
  new_pattern text := $pattern$'^(oa-original-02-|oa-p2-|oa-2-|oa-specimen-2-)'$pattern$;
begin
  select pg_catalog.pg_get_functiondef('spark_grading_private.oa_client_progress_guard_v2()'::regprocedure) into definition;
  if strpos(definition,new_pattern)>0 then return; end if;
  if length(definition)-length(replace(definition,old_pattern,''))<>length(old_pattern) then
    raise exception 'Unexpected Office Administration paper identity guard';
  end if;
  execute replace(definition,old_pattern,new_pattern);
end $oa_historical_identity$;
commit;
