-- SPARK Maths original-v1 Q6: nine source mark allocations for cylinder.
-- Method/accuracy and error carried forward. No approval or activation.
begin;
do $calibrate$
declare
 v_new jsonb := '{"p2-q6-v1::a":[{"code":"M1","kind":"M","marks":1,"description":"Selects area of circle πr² and substitutes r=3.5 m","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Verify area A=(22/7)×3.5² in m². Accept equivalent exact fraction or decimal substitution."}},{"code":"A1","kind":"A","marks":1,"description":"Obtains base area 38.5 m²","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"numeric","value":38.5,"tolerance":0.011}}],"p2-q6-v1::b":[{"code":"M1","kind":"M","marks":1,"description":"Uses cylinder volume formula πr²h or base area multiplied by height","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Accept V=πr²h with r=3.5 and h=4, or earlier base area multiplied by 4."}},{"code":"M2","kind":"M","marks":1,"description":"Correctly computes area × 4 or an equivalent volume substitution","field":"working","depends":["M1"],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Check 38.5×4 or (22/7)×3.5²×4. Accept correct follow-through from earlier base-area answer, if the method is valid."}},{"code":"A1","kind":"A","marks":1,"description":"Obtains 154 m³ or a valid carried-forward volume","field":"answer","depends":["M2"],"profile":"accuracy","check":{"type":"numeric","value":154,"tolerance":0.011},"ecf":{"uses":["a"],"formula":"4*a"}}],"p2-q6-v1::c":[{"code":"M1","kind":"M","marks":1,"description":"Uses curved surface area 2πrh, not the total closed-cylinder surface","field":"working","depends":[],"profile":"algorithmic","check":{"type":"manual-verification","evidence":"Check 2×(22/7)×3.5×4, or a correct equivalent circumference×height calculation."}},{"code":"A1","kind":"A","marks":1,"description":"Obtains curved surface area 88 m²","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"numeric","value":88,"tolerance":0.011}}],"p2-q6-v1::d":[{"code":"M1","kind":"M","marks":1,"description":"Divides volume by 5.5 m³ per hour","field":"all","depends":[],"profile":"algorithmic","check":{"type":"calculation","values":[154,5.5]},"followThroughUses":["b"],"followThroughFormula":"b/5.5"},{"code":"A1","kind":"A","marks":1,"description":"Obtains 28 hours or valid ECF using previous volume","field":"answer","depends":["M1"],"profile":"accuracy","check":{"type":"numeric","value":28,"tolerance":0.011},"ecf":{"uses":["b"],"formula":"b/5.5"}}]}'::jsonb;
 v_expected jsonb := '{"p2-q6-v1::a":"38.5","p2-q6-v1::b":"154","p2-q6-v1::c":"88","p2-q6-v1::d":"28"}'::jsonb;
 v_rubric spark_grading_private.rubrics_v2%rowtype;
 v_updated jsonb;
 v_count integer;
 v_bad integer;
begin
 select * into v_rubric from spark_grading_private.rubrics_v2
 where subject_id='mathematics' and paper_id='original-v1'
 and rubric_version='source-scheme-draft-v2' for update;
 if not found or v_rubric.active or v_rubric.verification_status<>'draft'
  or v_rubric.verified_by is not null or v_rubric.verified_at is not null
  or v_rubric.source_sha256 is distinct from
    encode(pg_catalog.sha256(convert_to(v_rubric.criteria::text,'UTF8')),'hex') then
  raise exception 'Math original-v1 Q6 draft or source changed';
 end if;
 select count(*),count(*) filter(where
  c->>'id' is distinct from c->>'sourcePartId'
  or c->'sourceMarking'->>'answer' is distinct from v_expected->>(c->>'id')
  or jsonb_typeof(c->'sourceMarking'->'criteria') is distinct from 'null'
  or (c->>'maxMarks')::integer is distinct from
   (select sum((k->>'marks')::integer) from jsonb_array_elements(v_new->(c->>'id'))k)
 ) into v_count,v_bad
 from jsonb_array_elements(v_rubric.criteria)c
 where v_new ? (c->>'id');
 if v_count<>4 or v_bad<>0 then
  raise exception 'Math original-v1 Q6 source mismatch (% of four, % invalid)',v_count,v_bad;
 end if;
 select jsonb_agg(case when v_new ? (c.part->>'id')
   then jsonb_set(c.part,'{sourceMarking,criteria}',v_new->(c.part->>'id'))
   else c.part end order by c.ordinal) into v_updated
 from jsonb_array_elements(v_rubric.criteria) with ordinality c(part,ordinal);
 if jsonb_array_length(v_updated)<>jsonb_array_length(v_rubric.criteria) then
  raise exception 'Math original-v1 parts drifted';
 end if;
 update spark_grading_private.rubrics_v2 set
  criteria=v_updated,
  source_sha256=encode(pg_catalog.sha256(convert_to(v_updated::text,'UTF8')),'hex')
 where subject_id='mathematics' and paper_id='original-v1'
 and rubric_version='source-scheme-draft-v2'
 and active=false and verification_status='draft';
 if not found then raise exception 'Math draft-only Q6 update failed'; end if;
end $calibrate$;
commit;
