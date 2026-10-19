-- Source fingerprint is verified by PostgreSQL, not a caller-supplied flag.
-- A published rubric's cryptographic digest must bind the exact canonical
-- server-owned criterion payload; a random 64-character string is not proof.
begin;
create or replace function spark_grading_private.enforce_rubric_digest_v2()
returns trigger language plpgsql security invoker set search_path='' as $$
declare expected text;
begin
 if new.active or new.verification_status='verified' then
  expected:=encode(pg_catalog.sha256(convert_to(new.criteria::text,'UTF8')),'hex');
  if new.source_sha256 is distinct from expected then
   raise exception 'V2 source checksum must match registered criterion content';
  end if;
 end if;
 return new;
end $$;
drop trigger if exists rubric_digest_must_match_v2
 on spark_grading_private.rubrics_v2;
create trigger rubric_digest_must_match_v2
 before insert or update on spark_grading_private.rubrics_v2
 for each row execute function spark_grading_private.enforce_rubric_digest_v2();
commit;