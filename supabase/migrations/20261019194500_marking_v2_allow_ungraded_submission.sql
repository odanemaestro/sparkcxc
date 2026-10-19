-- Paper 2 responses must submit before a trusted grade exists.
-- Paper 1 retains the legacy required-score validation.
begin;
do $patch$
declare definition_text text;
declare old_clause text := 'if p_score is null or p_max_score is null';
declare new_clause text :=
 'if (p_score is null and v_row.paper<>''02'') or p_max_score is null';
begin
 select pg_get_functiondef('public.spark_submit_exam_attempt(uuid,jsonb,text,numeric,numeric,jsonb)'::regprocedure)
 into definition_text;
 if strpos(definition_text,old_clause)=0 then
  raise exception 'Expected exam score validation was changed';
 end if;
 definition_text:=replace(definition_text,old_clause,new_clause);
 execute definition_text;
end $patch$;
commit;