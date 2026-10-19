-- Mathematics original-v1 Q1: four internally authored draft criterion arrays.
-- Based on the exact saved question wording and worked solutions.
-- This is NOT an approval, an examiner identity, or an activation.
-- Some fraction workings still require manual review.
begin;
do $calibrate$
declare
 v_schemes jsonb := '{"p2-q1-v1::a":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"profile":"algorithmic","description":"Converts the mixed numbers and finds the sum as 49/12","check":{"type":"anyOf","options":[{"type":"method","any":["7/3 + 7/4","28/12 + 21/12","49/12"]},{"type":"reachesValue","values":[4.083333333333333]}]}},{"code":"M2","kind":"M","marks":1,"field":"working","depends":["M1"],"profile":"algorithmic","description":"Finds denominator 7/12 and correctly divides by its reciprocal","check":{"type":"manual-verification","evidence":"Verify the subtraction 5/6 - 1/4 = 7/12 and multiplication by the reciprocal 12/7, accepting equivalent fraction methods"}},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M2"],"profile":"accuracy","description":"Gives exact value 7 in lowest terms","check":{"type":"fraction","value":7,"requireFraction":false,"simplified":true}}],"p2-q1-v1::b1":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"profile":"algorithmic","description":"Reverses the 25 percent cost-price markup on selling price 4500","check":{"type":"anyOf","options":[{"type":"calculation","values":[4500,125]},{"type":"calculation","values":[4500,1.25]},{"type":"calculation","values":[4500,100,125]}]}},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M1"],"profile":"accuracy","description":"Obtains cost price 3600","check":{"type":"sparkAnswer","answer":"3600.00","accepted":["3600"]}}],"p2-q1-v1::b2":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"profile":"algorithmic","description":"Applies 40 percent profit to the cost price, including valid follow-through","check":{"type":"anyOf","options":[{"type":"calculation","values":[3600,140]},{"type":"calculation","values":[3600,1.4]},{"type":"calculation","values":[3600,0.4]}]},"followThroughUses":["b1"],"followThroughFormula":"1.4*b1"},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M1"],"profile":"accuracy","description":"Obtains selling price 5040 or valid error-carried-forward result","check":{"type":"sparkAnswer","answer":"5040.00","accepted":["5040"]},"ecf":{"uses":["b1"],"formula":"1.4*b1"}}],"p2-q1-v1::b3":[{"code":"M1","kind":"M","marks":1,"field":"working","depends":[],"profile":"algorithmic","description":"Calculates percentage change relative to original selling price 4500","check":{"type":"anyOf","options":[{"type":"calculation","values":[5040,4500]},{"type":"calculation","values":[540,4500]}]},"followThroughUses":["b2"],"followThroughFormula":"100*(b2-4500)/4500"},{"code":"A1","kind":"A","marks":1,"field":"answer","depends":["M1"],"profile":"accuracy","description":"Obtains 12 percent or a valid carried-forward percentage","check":{"type":"sparkAnswer","answer":"12","accepted":["12%"]},"ecf":{"uses":["b2"],"formula":"100*(b2-4500)/4500"}}]}'::jsonb;
 v_old spark_grading_private.rubrics_v2%rowtype;
 v_criteria jsonb;
 v_count integer;
 v_bad integer;
begin
 select * into v_old from spark_grading_private.rubrics_v2
 where subject_id='mathematics' and paper_id='original-v1'
   and rubric_version='source-scheme-draft-v2' for update;
 if not found or v_old.active or v_old.verification_status<>'draft'
   or v_old.verified_by is not null or v_old.verified_at is not null
   or v_old.source_sha256 is distinct from
    encode(pg_catalog.sha256(convert_to(v_old.criteria::text,'UTF8')),'hex') then
  raise exception 'Mathematics original-v1 source revision or activation changed';
 end if;
 select count(*),count(*) filter(where
  jsonb_typeof(c->'sourceMarking'->'criteria') is distinct from 'null'
  or c->>'id'<>c->>'sourcePartId'
  or (c->>'maxMarks')::integer <>
   (select sum((k->>'marks')::integer)
    from jsonb_array_elements(v_schemes->(c->>'id'))k)
  or c->'sourceMarking'->>'answer' is distinct from
   (case c->>'id'
    when 'p2-q1-v1::a' then '7'
    when 'p2-q1-v1::b1' then '3600.00'
    when 'p2-q1-v1::b2' then '5040.00'
    when 'p2-q1-v1::b3' then '12'
    else null end)
 ) into v_count,v_bad
 from jsonb_array_elements(v_old.criteria)c
 where v_schemes ? (c->>'id');
 if v_count<>4 or v_bad<>0 then
  raise exception 'Mathematics Q1 criteria source/marks mismatch: % of four, % invalid',v_count,v_bad;
 end if;
 select jsonb_agg(
  case when v_schemes ? (c.part->>'id')
   then jsonb_set(c.part,'{sourceMarking,criteria}',v_schemes->(c.part->>'id'))
   else c.part end
  order by c.ordinal
 ) into v_criteria
 from jsonb_array_elements(v_old.criteria) with ordinality c(part,ordinal);
 if jsonb_array_length(v_criteria)<>jsonb_array_length(v_old.criteria) then
  raise exception 'Mathematics source paper changed during calibration';
 end if;
 update spark_grading_private.rubrics_v2
 set criteria=v_criteria,
     source_sha256=encode(pg_catalog.sha256(convert_to(v_criteria::text,'UTF8')),'hex')
 where subject_id='mathematics' and paper_id='original-v1'
   and rubric_version='source-scheme-draft-v2'
   and active=false and verification_status='draft';
 if not found then raise exception 'Draft-only Mathematics Q1 update failed'; end if;
end
$calibrate$;
commit;
