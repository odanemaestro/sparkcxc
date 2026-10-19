begin;
do $v2$
declare definition_text text;
begin
 select pg_get_functiondef('public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)'::regprocedure)
 into definition_text;
 definition_text:=replace(definition_text,chr(92)||chr(92)||'.','[.]');
 execute definition_text;
end $v2$;
commit;