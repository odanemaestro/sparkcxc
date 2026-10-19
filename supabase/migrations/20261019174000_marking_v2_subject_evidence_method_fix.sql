-- Idempotent production hotfix for same-day V2 staging function.
-- The base migration on the branch already includes these corrections.
do $v2$
declare ddl text;
begin
 select pg_get_functiondef('public.spark_v2_finish_shadow_subject_job(uuid,uuid,integer,jsonb)'::regprocedure) into ddl;
 ddl:=replace(ddl,'^existing-[a-z0-9-]{3,80}$','^existing-[A-Za-z0-9-]{3,80}$');
 ddl:=replace(ddl,'''existing-social-studies-essay'', ''blank-response''',
                '''existing-social-studies-essay'', ''existing-social-studies-blank''');
 execute ddl;
end $v2$;
