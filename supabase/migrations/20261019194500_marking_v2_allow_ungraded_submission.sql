-- Preserve historical and POB restrictions while permitting any Paper 2
-- to save a null practice score pending trusted server evaluation.
begin;
do $patch$
declare definition_text text;
declare old_clause text :=
 'v_row.paper=''02'' and v_row.subject_id in (''english-a'',''integrated-science'')';
declare new_clause text :=
 'v_row.paper=''02'' and (v_row.subject_id in (''english-a'',''integrated-science'') or p_score is null)';
begin
 select pg_get_functiondef('public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb)'::regprocedure)
 into definition_text;
 if strpos(definition_text,old_clause)=0 then
  raise exception 'Expected written submission policy changed; do not overwrite';
 end if;
 definition_text:=replace(definition_text,old_clause,new_clause);
 execute definition_text;
end $patch$;
commit;