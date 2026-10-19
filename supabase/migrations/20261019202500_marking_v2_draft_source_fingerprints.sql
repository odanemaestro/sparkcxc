-- Fingerprint exact registered V2 draft source payloads after structural QA.
-- A fingerprint is provenance evidence, not approval of marking correctness.
begin;
do $v2$
declare invalid_count bigint;
declare draft_count bigint;
begin
  select count(*) into draft_count from spark_grading_private.rubrics_v2
    where verification_status='draft' and active=false;
  if draft_count<>67 then
    raise exception 'Expected 67 inactive V2 drafts; found %',draft_count;
  end if;
  select count(*) into invalid_count from
    spark_grading_private.rubrics_v2 r,
    jsonb_array_elements(r.criteria)c
  where coalesce(c->>'id','')='' or coalesce(c->>'sourcePartId','')=''
    or c->>'sourcePartId' is distinct from c->>'id'
    or coalesce(c->>'maxMarks','') !~ '^[1-9][0-9]*$'
    or jsonb_typeof(c->'sourceMarking') is distinct from 'object';
  if invalid_count<>0 then
    raise exception 'V2 source-structure preflight failed: % invalid parts', invalid_count;
  end if;
  update spark_grading_private.rubrics_v2
    set source_sha256=encode(pg_catalog.sha256(convert_to(criteria::text,'UTF8')),'hex')
  where verification_status='draft' and active=false
    and source_sha256 is null;
end $v2$;
commit;
