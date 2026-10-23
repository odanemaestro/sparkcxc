-- Accounts was seeded after the global V2 draft-fingerprint backfill.
-- Bind its exact committed original/specimen sources to PostgreSQL JSONB
-- digests. A fingerprint is provenance only: both rubrics stay inactive and
-- draft, and the existing evidence-backed release gates remain unchanged.
begin;
do $poa_fingerprints$
declare
  target record;
  rubric spark_grading_private.rubrics_v2%rowtype;
  actual_digest text;
begin
  for target in select * from (values
    ('POA-ORIGINAL-02-01', 'poa-original-criteria-v1', 100,
     'dd855fecbe8ec3ee9c61f86c5b3f424d91a45112e07e5dc84fa3782df435a6f8'),
    ('poa-specimen-2-2017', 'poa-historical-worked-v1:poa-specimen-2-2017', 22,
     '8eb9472775142ebb38e4db7d2137590ff03bf04d1779efe00b1a12614045b18b')
  ) as targets(paper_id, rubric_version, criterion_count, source_digest)
  loop
    select * into strict rubric from spark_grading_private.rubrics_v2
      where subject_id='principles-of-accounts'
        and paper_id=target.paper_id and rubric_version=target.rubric_version;
    actual_digest := encode(pg_catalog.sha256(convert_to(rubric.criteria::text,'UTF8')),'hex');
    if actual_digest <> target.source_digest
       or rubric.expected_total_marks <> 100
       or jsonb_array_length(rubric.criteria) <> target.criterion_count then
      raise exception 'Accounts canonical draft source mismatch for %', target.paper_id;
    end if;
    if rubric.source_sha256 is not null and rubric.source_sha256 <> actual_digest then
      raise exception 'Accounts source fingerprint mismatch for %', target.paper_id;
    end if;
    if rubric.source_sha256 is null then
      if rubric.active or rubric.verification_status <> 'draft' then
        raise exception 'Accounts fingerprint backfill requires inactive draft %', target.paper_id;
      end if;
      update spark_grading_private.rubrics_v2 set source_sha256=actual_digest
        where subject_id='principles-of-accounts'
          and paper_id=target.paper_id and rubric_version=target.rubric_version;
    end if;
  end loop;
end
$poa_fingerprints$;
commit;
